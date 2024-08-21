import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../store/store';
import {Actor, Message, SessionParticipant, User} from "../../../types";



export interface SessionState {
    sessionId: number|null,
    participants: (Actor | User)[]
    currentSpeaker: User | Actor | null,
}

const initialState: SessionState = {
    sessionId: null,
    participants: [],
    currentSpeaker: null,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSessionId: (state, action: PayloadAction<number>) => {
            state.sessionId = action.payload;
        },
        setParticipants: (state, action: PayloadAction<(Actor | User)[]>) => {
            state.participants = action.payload;
        },
        addSessionParticipant: (state, action: PayloadAction<(Actor | User)>) => {
            state.participants = [
                ...state.participants,
                action.payload,
            ];
        }
    },
});

export const {
    setSessionId,
    setParticipants,
    addSessionParticipant,
} = sessionSlice.actions;

export const selectSessionId = (state: RootState): number => state.session.sessionId;
export const selectParticipants = (state: RootState): (Actor | User)[] => state.session.participants;
export const selectCurrentSpeaker = (state: RootState): User | Actor | null => state.session.currentSpeaker;


/* Message */
// export const getChatMessages = (messages: Message[], assistant: Actor): ChatMessage[] => {
//     // const prompt: ChatMessage = {
//     //     role: "system",
//     //     content: assistant.configuration.prompt ?? '',
//     // };
//     // let chatMessages: ChatMessage[] = [prompt];
//     //
//     // for (const message of messages) {
//     //     chatMessages.push({
//     //         content: message.content,
//     //         role: messengerTypes[message.messengerTypeId],
//     //     } as ChatMessage);
//     // }
//
//     // return chatMessages;
// };
//
// export const sendChatMessage = createAsyncThunk<void, Message>(
//     "message/sendChatMessage",
//     async (message: Message, { dispatch, getState }) => {
//
//         // const state = getState() as RootState;
//         //
//         // const dialogId = message.dialogId;
//         // const assistant = selectActor(state);
//         //
//         // const messages = await dispatch(serverApi.endpoints.getMessages.initiate(dialogId)).unwrap();
//         // const chatMessages = getChatMessages([...messages, message], assistant);
//         //
//         // await dispatch(serverApi.endpoints.addMessage.initiate(message)).unwrap();
//         //
//         // const chatResponse = await dispatch(ollamaApi.endpoints.chat.initiate({
//         //     model: 'codegeex-v2:latest',
//         //     messages: [{role: 'system', content: 'speak like a pirate'}, {role: 'user', content: 'what are the first 5 digits of PI?'}],
//         //     stream: false,
//         // })).unwrap();
//         //
//         // // const chatResponse: ChatMessage = await sendChatRequest({chatMessages, chatModel: assistant.configuration?.chatModel});
//         //
//         // // if (assistant.configuration.ttsModel) {
//         // //     sayText({text: chatResponse.content, model: assistant.configuration.ttsModel});
//         // // }
//         //
//         // const messageResponse: Message = {
//         //     messengerId: assistant.actorId,
//         //     // messengerTypeId: messengerTypeIds.assistant,
//         //     // dialogId: dialogId,
//         //     content: chatResponse.message.content,
//         //     // timestamp: getTimestamp(),
//         // };
//         //
//         // await dispatch(serverApi.endpoints.addMessage.initiate(messageResponse)).unwrap();
//     }
// );

/* Dialog */

// interface UpdateDialogPayload {
//     user: User;
//     actor: Actor;
// }
//
// export const updateDialogId = createAsyncThunk<number, UpdateDialogPayload>(
//     'dialog/updateDialogId',
//     async (payload: UpdateDialogPayload) => {
//         const { user, actor } = payload;
//         return await getCurrentDialogId(actor.actorId, user.userId);
//     });
//
// const getCurrentDialogId = async (actorId: number, userId: number): Promise<number> => {
//     if (actorId <= 0 || userId <= 0) {
//         console.log('Unable to get dialog ID: ', actorId, ': ', userId);
//         return -1;
//     }
//     const currentDialog = await getDialogId(actorId, userId);
//     let currentDialogId = currentDialog.data ?? -1;
//
//     if (currentDialogId > 0) {
//         return currentDialogId;
//     }
//
//     const dialog = await createDialog(actorId, userId);
//     return dialog.data.dialogId ?? -1;
// };

// export const selectDialogId = (state: RootState): number => state.session.dialogId;
// export const selectActor = (state: RootState): Actor => state.session.actor;
// export const selectUser = (state: RootState): User => state.session.user;

export default sessionSlice.reducer;