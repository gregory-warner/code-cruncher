interface EditableActorConfiguration extends Partial<ActorConfiguration> {
    colorTheme: {
        messageCard: MessageCardColorTheme;
    };
}

export interface EditableActor extends Partial<Actor> {
    avatar?: string|File,
    configuration?: EditableActorConfiguration,
}