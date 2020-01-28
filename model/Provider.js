const Sequelize = require('sequelize');
const db = require('../db');
module.exports = db.sequelize.define(
    'amin_service_provider',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.TEXT,
        },
        info: {
            type: Sequelize.TEXT,
        },
        availability: {
            type: Sequelize.TEXT,
        },
        profile_headline: {
            type: Sequelize.TEXT,
        },
        experience: {
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