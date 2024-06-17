interface ChatApiModel {
    created: number,
    id: string,
    object: string,
    owned_by: string,
}

interface GetModelResponse {
    object: 'list',
    data: ChatApiModel[],
}