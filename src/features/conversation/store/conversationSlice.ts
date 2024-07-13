import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../store/store';
import {postChatRequest} from '../../../api/chat';
import {createDialog, getDialogId, getMessagesByDialogId} from '../../../api/server';
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
    dialogId: number|null,
    user: User|null,
    actor: Actor|null,
}

const initialState: ConversationState = {
    dialogId: null,
    user: null,
    actor: null,
};

export const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setDialogId: (state, action: PayloadAction<number>) => {
            state.dialogId = action.payload;
        },
        setActor: (state, action: PayloadAction<Actor>) => {
            state.actor = action.payload ?? initialState.actor;
        },
    },
    extraReducers: builder => {
        builder.addCase(updateDialogId.fulfilled, (state, action) => {
            state.dialogId = action.payload;
        });
    }
});

export const { setDialogId, setActor} = conversationSlice.actions;

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

    const state = getState() as RootState;

    const dialogId = message.dialogId;
    const assistant = selectActor(state);

    const messages = await dispatch(serverApi.endpoints.getMessages.initiate(dialogId)).unwrap();
    const chatMessages = getChatMessages([...messages, message], assistant);

    await dispatch(serverApi.endpoints.addMessage.initiate(message)).unwrap();
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

export const updateDialogId = createAsyncThunk<number, UpdateDialogPayload>(
    'dialog/updateDialogId',
    async (payload: UpdateDialogPayload) => {
        const { user, actor } = payload;
        return await getCurrentDialogId(actor.actorId, user.userId);
    });

export const updateDialog = createAsyncThunk<UpdateDialogResponse, UpdateDialogPayload>("dialog/updateDialog", async (payload: UpdateDialogPayload) => {
    const { user, actor } = payload;
    const actorId = actor.actorId ?? -1;
    const userId = user.userId ?? -1;

    if (actorId <= 0 || userId <= 0) {
        throw Error('Actor and User IDs must be greater than 0');
    }

    const dialogId = await getCurrentDialogId(actorId, userId);
    if (dialogId <= 0) {
        return;
    }

    const response = await getMessagesByDialogId(dialogId);
    const messages = response.data;

    return { user, actor, dialogId, messages };
});

const getCurrentDialogId = async (actorId: number, userId: number): Promise<number> => {
    if (actorId <= 0 || userId <= 0) {
        console.log('Unable to get dialog ID: ', actorId, ': ', userId);
        return -1;
    }
    const currentDialog = await getDialogId(actorId, userId);
    let currentDialogId = currentDialog.data ?? -1;

    if (currentDialogId > 0) {
        return currentDialogId;
    }

    const dialog = await createDialog(actorId, userId);
    return dialog.data.dialogId ?? -1;
};


export const selectDialogId = (state: RootState): number => state.conversation.dialogId;
export const selectActor = (state: RootState): Actor => state.conversation.actor;

export default conversationSlice.reducer;