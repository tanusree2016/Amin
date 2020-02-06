const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.sequelize.define(
    'admin',
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
        password:{
            
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