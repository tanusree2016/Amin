const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.sequelize.define(
    'amin_service_sub_subcategories',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subcategoryid: {
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },

        color_code: {
            type: Sequelize.STRING,
        },
        image: {
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