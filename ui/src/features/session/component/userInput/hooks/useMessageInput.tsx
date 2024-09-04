import {useState} from "react";
import {AddMessageRequest} from "../../../../../services/server/types";
import {MessageTypeIds, MessengerTypeIds} from "../../../../../types";
import {setSnackbar} from "../../../../../app/store/appSlice";
import {incrementCurrentSequenceId, selectCurrentSpeaker, selectSessionId} from "../../../store/sessionSlice";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectUser} from "../../../../user/userSlice";
import {useAddMessageMutation} from "../../../../../services/server/serverApi";

const useMessageInput = () => {
    const dispatch = useAppDispatch();
    const sessionId = useAppSelector(selectSessionId);
    const currentSpeaker = useAppSelector(selectCurrentSpeaker);
    const user = useAppSelector(selectUser);

    const [addMessage] = useAddMessageMutation();

    const [input, setInput] = useState('');

    const isUserCurrentSpeaker = (
        user &&
        currentSpeaker &&
        'userId' in currentSpeaker &&
        'userId' in user &&
        user.userId === currentSpeaker.userId
    );

    const onInputChange = (content: string) => setInput(content);

    const addMessageToSession = async (content: string) => {
        if (!content.trim() || sessionId <= 0 || user.userId <= 0) {
            return;
        }

        if (!isUserCurrentSpeaker) {
            dispatch(setSnackbar({message: 'Please wait for the response.'}))
            return;
        }

        const message: AddMessageRequest = {
            sessionId,
            messengerId: user.userId,
            messageTypeId: MessageTypeIds.general,
            messengerTypeId: MessengerTypeIds.user,
            content,
        };

        const newMessage = await addMessage(message).unwrap();

        if (!newMessage.messageId) {
            dispatch(setSnackbar({message: `Unable to send message`}));
            return;
        }

        dispatch(incrementCurrentSequenceId());

        setInput("");
    };

    return { input, onInputChange, addMessageToSession };
}

export default useMessageInput;