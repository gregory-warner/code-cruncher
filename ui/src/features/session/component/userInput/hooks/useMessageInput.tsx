import {useState} from "react";
import {AddMessageRequest} from "../../../../../services/server/types";
import {MessageTypeId, MessengerTypeId} from "../../../../../types";
import {setSnackbar} from "../../../../../app/store/appSlice";
import {
    incrementCurrentSequenceId,
    selectCurrentSpeaker,
    selectSessionId,
    updateSessionStatus
} from "../../../sessionSlice";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectUser} from "../../../../user/userSlice";
import {useAddMessageMutation} from "../../../../../services/server/serverApi";
import useCurrentSpeaker from "../../../hooks/useCurrentSpeaker";
import {PartialSessionStatus} from "../../../types";

const useMessageInput = () => {
    const dispatch = useAppDispatch();
    const sessionId = useAppSelector(selectSessionId);
    const currentSpeaker = useAppSelector(selectCurrentSpeaker);
    const user = useAppSelector(selectUser);

    const [addMessage] = useAddMessageMutation();

    const { getCurrentSpeaker, getLastParticipantIndex } = useCurrentSpeaker();

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

        // if (!isUserCurrentSpeaker) {
        //     dispatch(setSnackbar({message: 'Please wait for the response.'}))
        //     return;
        // }

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

        // dispatch(incrementCurrentSequenceId());

        const sessionStatus: PartialSessionStatus = {
            isUserRequestingResponse: true,
        }
        dispatch(updateSessionStatus({ sessionId, sessionStatus }));

        setInput("");
    };

    return { input, onInputChange, addMessageToSession };
}

export default useMessageInput;