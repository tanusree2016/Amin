const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.sequelize.define(
    'amin_bank_details',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.INTEGER,
        },
        account_holder_name: {
            type: Sequelize.STRING,
        },
        account_number:{
            
            type: Sequelize.STRING,
        },
        bank_name:{
            
            type: Sequelize.STRING,
        },
        swift_code:{
            
            type: Sequelize.STRING,
        },
        ifsc_code:{
            
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