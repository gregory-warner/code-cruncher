import {SessionParticipantType} from "../../../types";
import {useAppSelector} from "../../../store/hooks";
import {selectCurrentSpeaker, selectSelectedParticipant, selectSessionId} from "../sessionSlice";
import {useTheme} from "@mui/material";

interface AvatarStyle {
    width: string;
    height: string;
    border: string;
    borderRadius: number;
}

enum AvatarStyleTypes {
    selectedAvatar = 'selectedAvatar',
    currentAvatar = 'currentAvatar',
    avatar = 'avatar',
    newAvatar = 'newAvatar'
}

const useAvatarStyle = () => {
    const theme = useTheme();

    const sessionId = useAppSelector(selectSessionId);

    const selectedParticipant = useAppSelector(state => (
        sessionId ? selectSelectedParticipant(state, sessionId) : null)
    );

    const currentSpeaker = useAppSelector(state => (
        sessionId ? selectCurrentSpeaker(state, sessionId) : null)
    );

    const style: Record<AvatarStyleTypes, AvatarStyle> = {
        selectedAvatar: {
            width: '40px',
            height: '40px',
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: 1
        },
        currentAvatar: {
            width: '40px',
            height: '40px',
            border: `2px solid ${theme.palette.secondary.main}`,
            borderRadius: 1
        },
        avatar: {
            width: '40px',
            height: '40px',
            border: `2px solid ${theme.palette.grey[300]}`,
            borderRadius: 1
        },
        newAvatar: {
            width: '40px',
            height: '40px',
            border: `2px dashed ${theme.palette.grey[500]}`,
            borderRadius: 1
        }
    };

    const getAvatarStyle = (participant: SessionParticipantType|null): AvatarStyle => {
        if (!participant || !currentSpeaker) {
            if (!selectedParticipant) {
                return style.selectedAvatar;
            }
            return style.newAvatar;
        }

        if (participant === selectedParticipant) {
            return style.selectedAvatar;
        }

        if (participant === currentSpeaker.participant) {
            return style.currentAvatar;
        }

        return style.avatar;
    };

    return {
        getAvatarStyle,
    }
};

export default useAvatarStyle;