let sequelizeInstance = require("./../config/db.config");
let sequelize = require("sequelize");

let Cart = sequelizeInstance.define("cart",
    {
        id : {
            type : sequelize.DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        cost : {
            type : sequelize.DataTypes.DECIMAL
        }
    },
    {
        timestamps : false
    }
);

module.exports = Cart