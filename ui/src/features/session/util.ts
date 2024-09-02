import {MessageContentTypes, ParsedMessage} from "../../types";

/**
 * Parses a Message to an array of parsed messages based on content type using ``` triple backticks as code blocks
 * e.g. code block
 * ```js
 * const noop = () => {};
 * ```
 *
 * @param contents
 */
export const getParsedMessageSections = (contents: string): ParsedMessage[] => {
    const codeBlockPattern = /```(\w+)?\n([\s\S]*?)```/g;

    const result: ParsedMessage[] = [];
    let currentIndex = 0;

    for (const match of contents.matchAll(codeBlockPattern)) {
        const [fullMatch, lang, message] = match;

        if (match.index > currentIndex) {
            result.push({ type: MessageContentTypes.general, content: contents.slice(currentIndex, match.index).trim() });
        }

        result.push({ lang, type: MessageContentTypes.code, content: message.trim() });

        currentIndex = match.index + fullMatch.length;
    }

    if (currentIndex < contents.length) {
        result.push({ type: MessageContentTypes.general, content: contents.slice(currentIndex).trim() });
    }

    return result;
};