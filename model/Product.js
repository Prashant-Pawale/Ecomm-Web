let sequelize = require('sequelize');
let sequelizeInstance = require('./../config/db.config');

let Product = sequelizeInstance.define('products',
    {
        id : {
            type : sequelize.DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : sequelize.DataTypes.STRING,
            notNull : true
        },
        price : {
            type : sequelize.DataTypes.BIGINT,
            notNull : true
        }
    },
    {
        timestamps : false
    }
);

module.exports = Product;