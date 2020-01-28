require('dotenv').config();
const Sequelize = require("sequelize");
const db = {}

const sequelize = new Sequelize('ds0unknl5es9d','hdwuellzenguat', 'b77bd6081a47badf11de7bf14724fbf2128663c97a1cb1ef213255e25a2bdfb9', {
    host: 'ec2-35-175-170-131.compute-1.amazonaws.com',
    dialect: 'mysql',
    operatorsAliases: false,
    freezeTableName: true, 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
//db.Sequelize = Sequelize

module.exports = db 