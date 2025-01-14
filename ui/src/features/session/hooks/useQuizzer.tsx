import {Message} from "../../../types";
import {MessageEventDetailsRequest} from "../../../services/server/types";
import {
    useAddMessageEventDetailsMutation,
    useAddMessageQuestionTypesMutation
} from "../../../services/server/serverApi";
import useScore from "./useScore";
import {useAppSelector} from "../../../store/hooks";
import {selectSessionId} from "../sessionSlice";

interface QuestionResult {
    questionId: number;
    resultId: number;
}

export const useQuizzer = () => {
    const sessionId = useAppSelector(selectSessionId);

    const quizzerResponseScores = {
        'INCORRECT!': -1,
        'CORRECT!': 1,
    };

    const [addEvent] = useAddMessageEventDetailsMutation();
    const [addQuestionTypes] = useAddMessageQuestionTypesMutation();

    const { updateScore } = useScore();

    const isQuizQuestion = (message: Message): boolean => {
        return /CODE CRUNCHER - QUESTION \d+/.test(message.content);
    };

    const isQuizzerResponse = (message: Message): boolean => {
        const regexResponse = new RegExp(`^QUESTION (\\d+):\\s(${Object.keys(quizzerResponseScores).join('|')})`);
        return regexResponse.test(message.content);
    };

    const handleQuizQuestion = async (message: Message): Promise<Message> => {
        const eventDetails = await addEvent(getQuizQuestionEventDetails(message)).unwrap();

        const questionTypes = getQuestionTypes(message);

        await addQuestionTypes({messageEventId: eventDetails.messageEventId, questionTypes});
        return message;
    };

    const handleQuizzerResponse = async (message: Message): Promise<Message> => {
        const questionResult = getQuestionResult(message);
        await addEvent({ ...questionResult, messageId: message.messageId });
        await updateScore(sessionId);
        return message;
    };

    const getQuestionResult = (message: Message): QuestionResult => {
        const match = message.content.match(/QUESTION (\d+): (.*?)(\n|$)/);
        const questionId = Number(match[1]);
        const response = match[2].trim();
        const resultId = quizzerResponseScores[response as keyof typeof quizzerResponseScores] ?? 0;
        return { questionId, resultId };
    };

    const getQuizQuestionEventDetails = (message: Message): MessageEventDetailsRequest => {
        const questionId =  parseInt(/CODE CRUNCHER - QUESTION (\d+)/.exec(message.content)?.[1] ?? '0');

        return {
            messageId: message.messageId,
            questionId,
        };
    };

    const getQuestionTypes = (message: Message): string[] => {
        const dataTypesMatch = message.content.match(/Datatype:(.*?)\n/);
        const dataTypes = dataTypesMatch?.[1].trim() ?? '';
        return dataTypes.split(', ');
    };

    return {
        isQuizQuestion,
        handleQuizQuestion,
        isQuizzerResponse,
        handleQuizzerResponse,
    };
};
