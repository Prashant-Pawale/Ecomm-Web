let sequelizeInstance = require("./../config/db.config");
const sequelize = require("sequelize");

let User = sequelizeInstance.define('users',
    {
        username : {
            type : sequelize.DataTypes.STRING
        },
        email : {
            type : sequelize.STRING
        },
        password : {
            type : sequelize.STRING
        }
    },
    {
        timestamps : false
    }
);

module.exports = User;