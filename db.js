require('dotenv').config();
const Sequelize = require("sequelize");
const db = {}

const sequelize = new Sequelize('amin_vvs', 'aminVvsDb', '%MgEBkq3j;}~', {
    host: 'arystonwebsolution.com',
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