const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.sequelize.define(
    'amin_booking_details',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: Sequelize.INTEGER,
        },
        status: {
            type: Sequelize.INTEGER,
        },
        payment_id:{
            
            type: Sequelize.INTEGER,
        },
        timeslot_id:{
            
            type: Sequelize.INTEGER,
        },
        custom_time:{
            
            type: Sequelize.INTEGER,
        },
        user_id:{
            
            type: Sequelize.INTEGER,
        },
        provider_id:{
            
            type: Sequelize.INTEGER,
        },
        address:{
            
            type: Sequelize.STRING,
        },
        booking_date:{
            type: Sequelize.DATEONLY,
        },
        service_status:{
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