import express from 'express';
import { Actor, ActorConfiguration } from '../models/models.js';
import inputValidator from './validator.js';
import logger from '../log/logger.js';
import Prompt from '../models/prompt.js';
import {Sequelize} from "sequelize";
import multer from "multer";
import path from 'path';

const router = express.Router();

router.get("/getActiveActors", async (_, res) => {
    const actors = await Actor.findAll({
        attributes: [["actor_id", "actorId"], "username", "name"],
        include: [
            {
                model: ActorConfiguration,
                as: "configuration",
                attributes: ["avatar", "title", ["color_theme", "colorTheme"], ["chat_model", "chatModel"], ["tts_model", "ttsModel"]],
                include: [
                    {
                        model: Prompt,
                        as: "prompts",
                        attributes: ['prompt'],
                        where: {
                            is_deleted: false,
                        },
                    }
                ]
            },
        ],
        nest: true,
        where: {
            is_deleted: false,
        }
    });

    const promptActors = actors.map(actor => {
        const actorData = actor.get({plain: true});
        actorData.configuration.prompt = actorData.configuration?.prompts[0].prompt?? '';
        delete actorData.configuration?.prompts;
        return actorData;
    });

    res.json(promptActors);
});

export const getActorById = async (actorId) => {
    return await Actor.findOne({
        attributes: [["actor_id", "actorId"], "name", "username"],
        where: {
            is_deleted: false,
            actor_id: actorId
        },
        include: [
            {
                model: ActorConfiguration,
                as: "configuration",
                attributes: ["avatar", "title", ["color_theme", "colorTheme"], ["chat_model", "chatModel"], ["tts_model", "ttsModel"]],
                include: [
                    {
                        model: Prompt,
                        as: "prompts",
                        attributes: ['prompt'],
                        where: {
                            is_deleted: false,
                        },
                    }
                ]
            },
        ],
        nest: true,
    });
};

router.get("/getActor/:username", async (req, res, next) => {
    const username = req.params.username ?? null;

    if (!inputValidator.isUsername(username)) { 
        next("Invalid username"); 
        return;
    }

    const actor = await Actor.findOne({
        attributes: [["actor_id", "actorId"], "name", "username"],
        where: {
            is_deleted: false,
            username: username
        },
        include: [
            {
                model: ActorConfiguration,
                as: "configuration",
                attributes: ["avatar", "title", ["color_theme", "colorTheme"], ["chat_model", "chatModel"], ["tts_model", "ttsModel"]],
                include: [
                    {
                        model: Prompt,
                        as: "prompts",
                        attributes: ['prompt'],
                        where: {
                            is_deleted: false,
                        },
                    }
                ]
            },
        ],
        nest: true,
    });

    res.json(actor);
});

// needs rework with prompt
router.post("/addActor", async (req, res) => {
    const actor = await Actor.create(req.body.actor ?? {});
    if (!(actor instanceof Actor)) { 
        next("Unable to create actor"); 
        return;
    }

    const actorId = actor.actor_id ?? -1;
    if (actorId <= 0) { 
        next("Unable to set actor configuration for actor ID: "+actorId); 
        return;
    }

    const configuration = await ActorConfiguration.create(req.body.configuration ?? {});
    if (!(configuration instanceof ActorConfiguration)) { 
        next("Unable to set actor configuration for actor ID: "+actorId); 
        return;
    }

    res.json({response: "Actor successfully created"});
});

const getActor = async (username) => {
    if (!inputValidator.isUsername(username)) {
        logger.error("Unable to get actor");
        return null;
    }

    return await Actor.findOne({
        attributes: [["actor_id", "actorId"], "name", "username"],
        where: {
            is_deleted: false,
            username: username,
        },
        include: [
            {
                model: ActorConfiguration,
                as: "configuration",
                attributes: ["avatar", "title", "prompt", ["color_theme", "colorTheme"], ["chat_model", "chatModel"], ["tts_model", "ttsModel"]],
                include: [
                    {
                        model: Prompt,
                        as: "prompts",
                        attributes: ['prompt'],
                        where: {
                            is_deleted: false,
                        },
                    }
                ]
            },
        ],
    });
};

/* Assistant */
router.get("/getAssistant/:username", async (req, res) => {
    const username = req.params.username ?? null;
    console.log(username);
    const actor = await getActor(username);

    if (actor instanceof Actor) {
        res.json(actor);
        return;
    }
    res.json(null);
});

router.get("/getActiveAssistants", async (_, res, next) => {
    const assistants = await Actor.findAll({
        attributes: [
            ["actor_id", "actorId"],
            "username",
            "name",
        ],
        include: [
            {
                model: ActorConfiguration,
                as: "configuration",
                attributes: [
                    "avatar",
                    "title",
                    "prompt",
                    ["color_theme", "colorTheme"],
                    ["chat_model", "chatModel"],
                    ["tts_model", "ttsModel"],
                ],
                include: [
                    {
                        model: Prompt,
                        as: "prompts",
                        attributes: ['prompt'],
                        where: {
                            is_deleted: false,
                        },
                    }
                ]
            },
        ],
        nest: true,
        where: {
            is_deleted: false,
        },
        order: [["actor_id", "ASC"]],
    });

    const transformedAssistants = assistants.map(assistant => {
        if (!assistant.configuration) {
            return assistant;
        }

        const { configuration } = assistant;

        // Get the first prompt
        const [firstPrompt] = configuration.prompts ?? [];

        // Replace the prompts array with the first prompt
        configuration.prompt = firstPrompt.prompt;

        // Remove the prompts property
        delete assistant.configuration.dataValues.prompts;

        return assistant;
    });

    res.json(transformedAssistants);
});

// Configure multer to save files to the 'uploads' folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/img');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    },
});

const upload = multer({ storage: storage });

router.post('/create', upload.single('avatar'), async (req, res) => {
    const { name, title, prompt, messageCard, avatar, ttsModel, chatModel } = req.body;

    // const username = name.toLowerCase().split(' ').join('_');
    // const actor = await Actor.create({ name, username });
    //
    // const fileName = req.file.filename;
    // let color = JSON.parse(messageCard);
    // color.transform = "translateY(-5px)";
    // color.borderRadius = "5px";
    // color.border = "4px solid #ccc";
    // color.transition = "all 0.3s ease-in-out";
    // color.width = "100%";
    // color["&:hover"] = {
    //     boxShadow: "0px 0px 8px 3px rgba(255,255,0,0.5)",
    // };
    //
    // console.log(JSON.stringify(color));
    // console.log(username);
    // const config = await ActorConfiguration.create({
    //     actor_id: actor.actor_id,
    //     avatar: fileName,
    //     color_theme: { messageCard: color },
    //     title,
    //     chat_model: chatModel,
    //     tts_model: ttsModel
    //     },
    // );
    //
    // const actorPrompt = await Prompt.create({actor_configuration_id: config.actor_configuration_id, prompt });

    res.json({ msg: 'The actor was successfully created' });
});

export default router;