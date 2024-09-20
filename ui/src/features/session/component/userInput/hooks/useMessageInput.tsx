import {useState} from "react";
import {AddMessageRequest} from "../../../../../services/server/types";
import {MessageTypeId, MessengerTypeId} from "../../../../../types";
import {setSnackbar} from "../../../../../app/store/appSlice";
import {
    selectSessionId,
    selectSessionStatus,
} from "../../../sessionSlice";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectUser} from "../../../../user/userSlice";
import {useAddMessageMutation} from "../../../../../services/server/serverApi";

const useMessageInput = () => {
    const dispatch = useAppDispatch();

    const sessionId = useAppSelector(selectSessionId);
    const user = useAppSelector(selectUser);
    const sessionStatus = useAppSelector(state => (
        sessionId ? selectSessionStatus(state, sessionId) : null
    ));

    const [addMessage] = useAddMessageMutation();

    const [input, setInput] = useState('');

    const onInputChange = (content: string) => setInput(content);

    const addMessageToSession = async (content: string) => {
        if (!content.trim() || sessionId <= 0 || user.userId <= 0) {
            return;
        }

        if (sessionStatus?.isLoading) {
            dispatch(setSnackbar({message: 'Please wait for the response.'}))
            return;
        }

        const message: AddMessageRequest = {
            sessionId,
            messengerId: user.userId,
            messageTypeId: MessageTypeId.general,
            messengerTypeId: MessengerTypeId.user,
            content,
        };

        const newMessage = await addMessage(message).unwrap();

        if (!newMessage.messageId) {
            dispatch(setSnackbar({message: `Unable to send message`}));
            return;
        }

        setInput("");
    };

    return { input, onInputChange, addMessageToSession };
}

export default useMessageInput;