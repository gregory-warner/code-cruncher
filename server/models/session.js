import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../db.js';

const Session = sequelize.define('session', {
    sessionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'session_id',
    },
    sessionName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Untitled',
        field: 'session_name'
    },
    modelId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'model_id',
    },
    createdDate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: Sequelize.literal('extract(epoch from now())'),
        field: 'created_date',
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'created_by',
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: 'is_deleted',
    }
}, {
    indexes: [

    ]
});

export default Session;