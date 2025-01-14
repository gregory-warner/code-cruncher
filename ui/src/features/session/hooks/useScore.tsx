import {useLazyGetSessionMessageEventDetailsQuery} from "../../../services/server/serverApi";
import { Score } from "../types";
import {useAppDispatch} from "../../../store/hooks";
import {updateSessionStatusScore} from "../sessionSlice";

const useScore = () => {
    const dispatch = useAppDispatch();

    const [sessionDetails] = useLazyGetSessionMessageEventDetailsQuery();

    const getScore = async (sessionId: number): Promise<Score> => {
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
            });
        });

        return { correct, incorrect };
    };

    const updateScore = async (sessionId: number|null): Promise<void> => {
        if (!sessionId) {
            return;
        }

        const score = await getScore(sessionId);
        dispatch(updateSessionStatusScore({ sessionId, score }))
    };

    return {
        updateScore,
    };

};

export default useScore;