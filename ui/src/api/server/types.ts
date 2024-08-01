interface ResponseChoice {
    message: Message,
    finish_reason: string,
    index: number,
}

export interface ApiResponse {
    status: number,
    choices: ResponseChoice[],
}