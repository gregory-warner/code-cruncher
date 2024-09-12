import express from 'express';
import {updateActorModel} from "../services/aiModelService.js";

const router = express.Router();


router.patch("/update", async (req, res, next) => {
    try {
        const { actorId, aiModel } = req.body;
        console.log(req.body)
        const actor = await updateActorModel(actorId, aiModel);
        return res.json({actor});
    } catch (err) {
        next(err);
    }
});

export default router;