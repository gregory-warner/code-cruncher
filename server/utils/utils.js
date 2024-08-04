const toCamelCase = (str) => {
    return str.replace(/_([a-z])/g, (match, group1) => group1.toUpperCase());
};

/**
 * Transform an objects snake_case keys to camelCase
 *
 * @param obj
 * @returns {{}}
 */
export const transformKeys = (obj) => {
    return Object.keys(obj).reduce((newObj, key) => {
        const newKey = toCamelCase(key);
        newObj[newKey] = obj[key];
        return newObj
    }, {});
};