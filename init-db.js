import sequelize from './db.js';
import logger from './log/logger.js';
import opean from './actors/opean.js';
import eagleBonnet from './actors/eagleBonnet.js';

import {
    Actor,
    ActorConfiguration,
    Prompt,
    User,
    UserConfiguration,
} from './models/models.js';

const initDb = async () => {
    try {
        await sequelize.sync();

        await addDefaultActors();
        await addDefaultUsers();

        logger.info("Database initiated successfully");
    } catch(e) {
        logger.error(`Unable to initiate database: ${e}`);
    }
};

const addDefaultActors = async () => {
    const defaultActors = [opean];

    for (const defaultActor of defaultActors) {
        const actor = await Actor.findOne({
            where: {
                username: defaultActor.username
            }
        });

        if (actor instanceof Actor) {
            continue;
        }

        const newActor = await Actor.create({name: defaultActor.name, username: defaultActor.username});
        const actorId = newActor.actor_id ?? 0;

        if (!actorId) {
            logger.error(`Unable to create user: ${defaultActor.username}`);
            continue;
        }

        const config = await ActorConfiguration.create({
            ...defaultActor.configuration,
            actor_id: actorId,
            color_theme: defaultActor.configuration.colorTheme,
            chat_model: defaultActor.configuration.chatModel,
        });

        const actor_configuration_id = config.dataValues.actor_configuration_id;

        await Prompt.create({
            actor_configuration_id,
            prompt: defaultActor.configuration.prompt,
        });
    }
};

const addDefaultUsers = async () => {
    const defaultUsers = [eagleBonnet];

    for (const defaultUser of defaultUsers) {
        const user = await User.findOne({
            where: {
                username: defaultUser.username
            }
        });

        if (user instanceof User) {
            continue;
        }

        const newUser = await User.create({name: defaultUser.name, username: defaultUser.username});
        const userId = newUser.user_id ?? 0;

        if (!userId) {
            logger.error(`Unable to create user: ${defaultUser.username}`);
            continue;
        }

        UserConfiguration.create({
            ...defaultUser.configuration,
            user_id: userId,
            color_theme: defaultUser.configuration.colorTheme,
        });
    }
};

initDb();