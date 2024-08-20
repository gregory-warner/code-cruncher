
/* ChatGPT Message */
interface ChatMessage {
    content: string,
    role: string,
    data?: {
        imageLinks?: string[],
    }
}

interface Messenger {
    name: string,
    username: string,
    configuration?: {
        avatar?: string,
        colorTheme?: any,
    },
    timeCreated?: EpochTimeStamp,
}

type MessageCardStyle = {
    nameColor: string,
    contentsColor: string,
    backgroundColor: string,
    borderColor: string,
    borderRadius: string,
    border?: string,
    width?: string,
    transition?: string,
    boxShadow: string,
    textColor: string,
    "&:hover"?: {
        boxShadow: string,
        transform: string,
    },
}

/* Model */
type Model = {
    id: string,
}
