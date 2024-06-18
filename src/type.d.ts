interface Actor {
    actorId: number,
    name: string,
    username: string,
    configuration: ActorConfiguration,
    timeCreated: EpochTimeStamp,
    prompt: string,
}


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

interface Dialog {
    dialogId: number,
    userId: number,
    actorId: number,
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
    }
}

interface Prompts {
    prompts: string,
}

interface ActorConfiguration {
    actorId?: number,
    avatar?: string,
    colorTheme?: ColorTheme,
    title?: string,
    prompt?: string,
    chatModel?: string,
    ttsModel?: string,
    prompts?: Prompts,
}

interface ColorTheme {
    messageCard: MessageCardColorTheme,
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

type MessageAction = {
    type: string,
    message: Message,
};

interface MessengerType {
    id: number,
    type: number,
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

type MessengerCacheType = {
    messengerType: string,
    messengerId: string,
}

interface MessengerCache {
    [messengerType: string]: {
        [messengerId: string]: {
            messenger?: Messenger|Null,
        }
    }
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

