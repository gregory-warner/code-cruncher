import sequelize from './db.js';
import logger from './log/logger.js';
import crunchicusCodex from "./users/crunchicusCodex.js";

import {
    User,
} from './models/models.js';
import spam from "./actors/spam.js";
import Actor from "./models/actor.js";
import {createActor} from "./services/actorService.js";

const initDb = async () => {
    try {
        await sequelize.sync();
        await addDefaultUsers();
        await addDefaultActors();
        logger.info("Database initiated successfully");
    } catch(e) {
        logger.error(`Unable to initiate database: ${e}`);
    }
};

const addDefaultUsers = async () => {
    const defaultUsers = [crunchicusCodex];

    for (const defaultUser of defaultUsers) {
        const user = await User.findOne({
            where: {
                username: defaultUser.username
            }
        });

        if (user instanceof User) {
            continue;
        }

        const newUser = await User.create(defaultUser);

        if (!newUser.userId) {
            logger.error(`Unable to create user: ${defaultUser.username}`);
        }
    }
};

const addDefaultActors = async () => {
    const defaultActors = [spam];

    for (const defaultActor of defaultActors) {
        const actor = await Actor.findOne({
            where: { username: defaultActor.username }
        });

        if (actor instanceof Actor) {
            continue;
        }

        const newActor = await createActor(defaultActor);

        if (!newActor) {
            logger.error(`Unable to create actor: ${defaultActor.username}`);
        }
    }
};

initDb();