const Sequelize = require('sequelize');
const db = require('../db');
module.exports = db.sequelize.define(
    'amin_consumer',
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
        social_image: {
            type: Sequelize.STRING,
        },
        social_id: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.STRING,
        },
        landmark: {
            type: Sequelize.STRING,
        },
        is_deleted: {
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