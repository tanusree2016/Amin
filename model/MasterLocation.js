const Sequelize = require('sequelize');
const db = require('../db');
module.exports = db.sequelize.define(
    'master_locations',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        country_id: {
            type: Sequelize.INTEGER,
        },
        state_id: {
            type: Sequelize.INTEGER,
        },
        city: {
            type: Sequelize.STRING,
        },
        status: {
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