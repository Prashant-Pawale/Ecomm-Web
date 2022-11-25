let sequelize = require('sequelize');
let sequelizeInstance = require('./../config/db.config');

let categoryModel = sequelizeInstance.define('categories',
    {
        id : {
            type : sequelize.DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : sequelize.DataTypes.STRING,
            notNull : true
        }
    },
    {
        timestamps : false
    }
);

module.exports = categoryModel;