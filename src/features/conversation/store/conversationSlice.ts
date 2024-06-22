import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../store/store';
import {postChatRequest} from '../../../api/chat';
import {createDialog, deleteDialog, getDialogId, getMessagesByDialogId} from '../../../api/server';
import {selectActor} from '../../actor/actorSlice';
import {getTimestamp} from '../../../utils/util';
import {serverApi} from "../../../services/server/serverApi";

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

export const { addMessage, addMessages, setMessages, setDialogId
} = conversationSlice.actions;

/* Message */

export const getChatMessages = (messages: Message[], assistant: Actor): ChatMessage[] => {
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

    const dialogId = message.dialogId;

    const state = getState() as RootState;

    // Add the new message
    const newMessage = await dispatch(serverApi.endpoints.addMessage.initiate(message)).unwrap();

    // Get the updated messages
    const messages = await pollForLatestMessages(dispatch, newMessage);

    const assistant = selectActor(state);
    const chatMessages = getChatMessages(messages, assistant);

    const chatResponse: ChatMessage = await postChatRequest({chatMessages, chatModel: assistant.configuration?.chatModel});
    debugger;
    // if (assistant.configuration.ttsModel) {
    //     sayText({text: chatResponse.content, model: assistant.configuration.ttsModel});
    // }

    const messageResponse: Message = {
        messengerId: assistant.actorId,
        messengerTypeId: messengerTypeIds.assistant,
        dialogId: dialogId,
        content: chatResponse.content,
        timestamp: getTimestamp(),
        data: chatResponse.data,
    };

    await dispatch(serverApi.endpoints.addMessage.initiate(messageResponse)).unwrap();
});

const pollForLatestMessages = async (dispatch, message: {dialog_id: number, message_id: number}): Promise<Message[]> => {
    let messages = [];
    let attempts = 5;

    while (attempts > 0) {
        messages = await dispatch(serverApi.endpoints.getMessages.initiate(message.dialog_id)).unwrap();

        if (messages.find(m => m.id === message.message_id)) {
            break;
        }

        attempts -= 1;
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    return messages;
}

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