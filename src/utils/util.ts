export const getTimestamp = () => Math.floor(Date.now()/1000);

export const isFile = (file: unknown): file is File => {
    return file instanceof File;
}

export const isActor = (actor: Actor | null): actor is Actor => {
    return actor && typeof actor !== 'undefined';
};