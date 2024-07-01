export const getTimestamp = () => Math.floor(Date.now()/1000);

export const isFile = (file: unknown): file is File => {
    return file instanceof File;
}

