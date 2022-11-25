let sequelizeInstance = require("./../config/db.config");
const sequelize = require("sequelize");

let Role = sequelizeInstance.define("roles",
    {
        id : {
            type : sequelize.INTEGER,
            primaryKey : true
        },
        name : {
            type : sequelize.STRING
        }
    },
    {
        timestamps : false
    }
);

module.exports = Role;