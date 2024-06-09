import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../app/store';
import {postChatRequest} from '../../../api/chat';
import {addMessageToDialog, createDialog, deleteDialog, getDialogId, getMessagesByDialogId} from '../../../api/server';
import {selectAssistant} from '../../actor/actorSlice';
import {getTimestamp} from '../../chatApp/util';

export const messengerTypeIds = {
    user: 0,
    assistant: 1,
};

export const messengerTypes = Object.entries(messengerTypeIds).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});

export interface ConversationState {
    messages: Message[],
    dialogId: number|null,
}

const initialState: ConversationState = {
    messages: [],
    dialogId: null,
};

export const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<Message>) => {
            const messageCount = state.messages.length;

            state.messages = [
                ...state.messages,
                {id: messageCount, ...action.payload},
            ];
        },
        addMessages: (state, action: PayloadAction<Message[]>) => {
            let messageCount = state.messages.length;
            const messages = action.payload;
            const numOfMessages = messages.length;

            for(let i = 0; i < numOfMessages; ++i) {
                messages[i].id = messageCount;
                messageCount++;
            }

            state.messages = [
                ...state.messages,
                ...messages,
            ];
        }, 
        setMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = [...action.payload];
        },
        clearConversation: (state) => {
            state.messages = [];
        },
        setDialogId: (state, action: PayloadAction<number>) => {
            state.dialogId = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateDialog.fulfilled, (state: ConversationState, action) => {
            state.dialogId = action.payload.dialogId;
            state.messages = action.payload.messages;
        });
    }
});

export const { addMessage, addMessages, setMessages, clearConversation, setDialogId
} = conversationSlice.actions;

/* Message */

const getChatMessages = (messages: Message[], assistant: Actor): ChatMessage[] => {
    const prompt: ChatMessage = {
        role: "user",
        content: assistant.configuration.prompt ?? '',
    };
    let chatMessages: ChatMessage[] = [prompt];

    for (const message of messages) {
        chatMessages.push({
            content: message.content,
            role: messengerTypes[message.messengerTypeId],
        } as ChatMessage);
    }

    return chatMessages;
}

export const sendChatMessage = createAsyncThunk<void, Message>("message/sendChatMessage", async (message: Message, { dispatch, getState }) => {
    if (message.dialogId <= 0 || message.messengerId <= 0) { return; }

    const state = getState() as RootState;
    const messages = [
        ...selectMessages(state),
        message,
    ];              
    
    dispatch(addMessage(message));
    await addMessageToDialog(message);

    const assistant = selectAssistant(state);
    const chatMessages = getChatMessages(messages, assistant);

    const chatResponse: ChatMessage = await postChatRequest({chatMessages, chatModel: assistant.configuration?.chatModel});
    debugger;
    // if (assistant.configuration.ttsModel) {
    //     sayText({text: chatResponse.content, model: assistant.configuration.ttsModel});
    // }

    const dialogId = selectDialogId(state);
    const messageResponse: Message = {
        messengerId: assistant.actorId,
        messengerTypeId: messengerTypeIds.assistant,
        dialogId: dialogId,
        content: chatResponse.content,
        timestamp: getTimestamp(),
        data: chatResponse.data,
    };


    await addMessageToDialog(messageResponse);
    dispatch(addMessage(messageResponse));
});

/* Dialog */

interface UpdateDialogPayload {
    user: User;
    actor: Actor;
}

export interface UpdateDialogResponse {
    user: User,
    actor: Actor,
    dialogId: number,
    messages: Message[],
}

export const updateDialog = createAsyncThunk<UpdateDialogResponse, UpdateDialogPayload>("dialog/updateDialog", async (payload: UpdateDialogPayload) => {
    const { user, actor } = payload;
    const actorId = actor.actorId ?? -1;
    const userId = user.userId ?? -1;

    if (actorId <= 0 || userId <= 0) {
        throw Error('Actor and User IDs must be greater than 0');
    }

    const dialogId = await getCurrentDialogId(actorId, userId);

    const response = await getMessagesByDialogId(dialogId);
    const messages = response.data;

    return { user, actor, dialogId, messages };
});

const getCurrentDialogId = async (actorId: number, userId: number): Promise<number> => {
    const currentDialog = await getDialogId(actorId, userId);
    let currentDialogId = currentDialog.data ?? -1;

    if (currentDialogId > 0) {
        return currentDialogId;
    }

    const dialog = await createDialog(actorId, userId);
    return dialog.data.dialogId ?? -1;
};

export const deleteCurrentDialog = createAsyncThunk<void, number>("dialogs/deleteDialog", async (dialogId: number) => {
    await deleteDialog(dialogId);
});

export const selectMessages = (state: RootState) => state.conversation.messages;

export const selectDialogId = (state: RootState): number => state.conversation.dialogId ?? -1;

export default conversationSlice.reducer;