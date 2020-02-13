const Sequelize = require('sequelize');
const db = require('../db');
module.exports = db.sequelize.define(
    'amin_provider_files',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        provider_id: {
            type: Sequelize.INTEGER,
        },
        filename: {
            type: Sequelize.STRING,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    })