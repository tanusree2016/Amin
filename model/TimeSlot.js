const Sequelize = require('sequelize');
const db = require('../db');
module.exports = db.sequelize.define(
    'amin_time_slot',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        slot_from: {
            type: Sequelize.TIME,
        },
        slot_to: {
            type: Sequelize.TIME,
        },
        status: {
            type: Sequelize.INTEGER,
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