import express from 'express';
import {addDetails, addQuestionTypes} from "../services/messageEventDetailsService.js";
const router = express.Router();

router.post("/add", async (req, res, next) => {
    try {
        const details = await addDetails(req.body);
        return res.json(details.get({plain: true}));
    } catch (error) {
        next(`Unable to add message: ${error}`);
    }
});

router.post("/add-types", async (req, res, next) => {
    try {
        const { messageEventId, questionTypes } = req.body;
        await addQuestionTypes(messageEventId, questionTypes);
        return res.json({});
    } catch (error) {
        next(`Unable to add message: ${error}`);
    }
}); //types

export default router;