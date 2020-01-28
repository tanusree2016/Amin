const Sequelize = require('sequelize');
const db = require('../db');
module.exports = db.sequelize.define(
    'amin_feeback',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        consumer_id: {
            type: Sequelize.NUMBER,
        },
        service_provider_id: {
            type: Sequelize.NUMBER,
        },
        feedback: {
            type: Sequelize.TEXT,
        },
        rating: {
            type: Sequelize.NUMBER,
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