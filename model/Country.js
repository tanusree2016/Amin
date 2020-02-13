const Sequelize = require('sequelize');
const db = require('../db');
module.exports = db.sequelize.define(
    'countries',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sortname: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING,
        },
        phonecode: {
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