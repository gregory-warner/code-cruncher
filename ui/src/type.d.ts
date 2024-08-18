interface User {
    userId: number,
    name: string,
    username: string,
    configuration?: {
        avatar?: string,
        colorTheme?: any,
    },
    timeCreated?: EpochTimeStamp,
}

interface Message {
    id?: number,
    dialogId?: number,
    messengerId?: number,
    messengerTypeId?: number,
    content: string,
    timestamp?: EpochTimeStamp,
    data?: {
        imageLinks?: string[],
    },
    isLocked?: boolean,
}

interface MessageCardColorTheme {
    nameColor: string,
    contentsColor: string,
    backgroundColor: string,
    borderColor: string,
    borderRadius?: string,
    boxShadow?: string,
    textColor?: string,
}

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

interface ActorModel {
    actorId: number,
    model: string,
}

interface TtsParams {
    model: string,
    text: string,
}

