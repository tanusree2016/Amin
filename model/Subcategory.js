const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.sequelize.define(
    'amin_service_subcategories',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category_id: {
            type: Sequelize.INTEGER,
        },
        subcategory: {
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