/**
 * Removes the property in an object and returns the properties value
 *
 * @param object
 * @param property
 * @returns {*}
 */
export const removeProperty = (object, property) => {
    const p = object[property];
    delete object[property];
    return p;
};

export const messengerTypeIds = {
    system: 0,
    user: 1,
    assistant: 2,
};

export const messengerTypes = Object.entries(messengerTypeIds).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
}, {});