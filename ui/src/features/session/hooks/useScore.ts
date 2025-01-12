import {useLazyGetSessionMessageEventDetailsQuery} from "../../../services/server/serverApi";
import { Scores } from "../types";

const useScore = () => {
    const [sessionDetails] = useLazyGetSessionMessageEventDetailsQuery();

    const getScores = async (sessionId: number): Promise<Scores> => {
        if (!sessionId) {
            return { correct: 0, incorrect: 0 };
        }

        const messageDetails = await sessionDetails(sessionId).unwrap();
        
        let correct = 0;
        let incorrect = 0;

        messageDetails.forEach(details => {
            details.forEach(eventDetails => {
                if (Number.isInteger(eventDetails.resultId)) {
                    if (eventDetails.resultId > 0) {
                        correct+=1;
                    }
                    if (eventDetails.resultId < 0) {
                        incorrect+=1;
                    }
                }
            })
        });

        return { correct, incorrect };
    };

    return {
        getScores,
    };

};

export default useScore;