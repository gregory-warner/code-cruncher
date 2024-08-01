const isUsername = (username) => username && typeof username === "string" && /^[a-zA-Z0-9\._-]+$/.test(username);
const isNumber = (n, min=Number.MIN_SAFE_INTEGER, max=Number.MAX_SAFE_INTEGER) => {
    const num = Number.parseInt(n);
    return Number.isInteger(num) && num >= min && num <= max;
}
const isContent = (content) => content && typeof content === "string" && /^[\w\s\d.,!?;:\\'"-]+$/.test(content);

export default {
    isUsername: isUsername,
    isNumber: isNumber,
    isContent: isContent,
};