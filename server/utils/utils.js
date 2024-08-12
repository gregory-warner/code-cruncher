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