import {createAsyncThunk} from "@reduxjs/toolkit";
import {deleteMessage} from "../../../api/server";

export const deleteChatMessage = createAsyncThunk<void, DeleteMessagePayload>("messages/deleteMessage", async (payload: DeleteMessagePayload, { dispatch, getState }) => {
    const { messageId } = payload;
    if (!messageId) {
        return;
    }

    deleteMessage(messageId);
});