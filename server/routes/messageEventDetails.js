import express from 'express';
import {addDetails} from "../services/messageEventDetailsService.js";
const router = express.Router();

router.post("/add", async (req, res, next) => {
    try {
        const details = await addDetails(req.body);
        return res.json(details.get({plain: true}));
    } catch (error) {
        next(`Unable to add message: ${error}`);
    }
});

export default router;