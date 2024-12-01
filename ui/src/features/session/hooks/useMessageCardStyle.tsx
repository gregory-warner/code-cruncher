import {Message, MessageCard, MessengerType} from "../../../types";

const disabledCardStyle: MessageCard = {
    nameColor: 'gray',
    contentsColor: 'gray',
    backgroundColor: 'gray',
    borderColor: 'gray',
    textColor: 'gray',
    borderRadius: "5px",
    border: "4px solid #000",
    transition: "all 0.3s ease-in-out",
    boxShadow: "",
    width: "100%",
    "&:hover": {
        boxShadow: 'darkGray',
        transform: "translateY(-5px)",
    },
};

const useMessageCardStyles = ({ message }: { message: Message }) => {

    const messenger: MessengerType = message.messenger;

    if (!messenger || messenger.deletedAt) {
        return {
            cardStyle: disabledCardStyle,
        };
    }

    return {
        cardStyle: messenger.colorTheme.messageCard,
    }
};

export default useMessageCardStyles;