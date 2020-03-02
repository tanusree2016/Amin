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
        dob: {
            type: Sequelize.DATE,
        },
        password: {
            type: Sequelize.STRING,
        },
        city: {
            type: Sequelize.STRING,
        },
        state: {
            type: Sequelize.STRING,
        },
        country: {
            type: Sequelize.STRING,
        },
        postal_code: {
            type: Sequelize.STRING,
        },
        address: {
            type: Sequelize.TEXT,
        },
        service: {
            type: Sequelize.INTEGER,
        },
        sub_category: {
            type: Sequelize.INTEGER,
        },
        final_category: {
            type: Sequelize.INTEGER,
        },
        
        profile_headline: {
            type: Sequelize.TEXT,
        },
        id_proof: {
            type: Sequelize.STRING,
        },
        experience: {
            type: Sequelize.STRING,
        },
        salary_hr: {
            type: Sequelize.STRING,
        },
       
        info: {
            type: Sequelize.STRING,
        },
        availability: {
            type: Sequelize.STRING,
        },
        is_verified: {
            type: Sequelize.STRING,
        },
        
        otp: {
            type: Sequelize.STRING,
        },

        online_offline: {

            type: Sequelize.INTEGER
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