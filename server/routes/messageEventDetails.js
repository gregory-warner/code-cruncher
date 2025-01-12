import express from 'express';
import {addDetails, addQuestionTypes, getSessionMessageEventDetails} from "../services/messageEventDetailsService.js";
const router = express.Router();

router.post("/add", async (req, res, next) => {
    try {
        const details = await addDetails(req.body);
        return res.json(details.get({plain: true}));
    } catch (error) {
        next(`Unable to add event details: ${error}`);
    }
});

router.post("/add-types", async (req, res, next) => {
    try {
        const { messageEventId, questionTypes } = req.body;
        await addQuestionTypes(messageEventId, questionTypes);
        return res.json({});
    } catch (error) {
        next(`Unable to add event question types: ${error}`);
    }
}); //types

router.get("/session/:sessionId", async (req, res, next) => {
    try {
        const eventDetails = await getSessionMessageEventDetails(req.params.sessionId);
        return res.json(eventDetails);
    } catch (error) {
        next(`Unable to get message event details with session id ${req.params.sessionId}`);
    }
});

export default router;