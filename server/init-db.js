import sequelize from './db.js';
import logger from './log/logger.js';
import crunchicusCodex from "./users/crunchicusCodex.js";

import {
    User,
} from './models/models.js';

const initDb = async () => {
    try {
        await sequelize.sync();
        await addDefaultUsers();
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

initDb();