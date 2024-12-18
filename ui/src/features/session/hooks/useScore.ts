import {useLazyGetMessagesQuery} from "../../../services/server/serverApi";

interface Scores {
    correct: number;
    incorrect: number;
}

const useScore = () => {
    const [messages] = useLazyGetMessagesQuery();


    // const getScores: Scores = () => {
    //
    // };
};

export default useScore;