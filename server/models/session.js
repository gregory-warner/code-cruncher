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
    sessionTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: 'session_type_id',
        comment: 'Used to distinguish the session type e.g. code, chat'
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
});

export default Session;