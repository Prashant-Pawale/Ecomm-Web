const sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const dbConfig = require("./../config/db.config")[env];
let db = {};

db.sequelizeInstance = new sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
db.sequelize = sequelize;
db.user = require("./User")(sequelize,db.sequelizeInstance);
db.roles = require("./Roles")(sequelize, db.sequelizeInstance);
db.product = require("./Product")(sequelize, db.sequelizeInstance);
db.cart = require("./Cart")(sequelize, db.sequelizeInstance);
db.category = require("./Category")(sequelize, db.sequelizeInstance);

db.roles.belongsToMany(db.user,
    {
        through : "user_roles",
        foreinKey : "roleId",
        otherKey : "userId"
    }
);

db.user.belongsToMany(db.roles,
    {
        through : "user_roles",
        foreinKey : "userId",
        otherKey : "roleId",
    }
);

db.product.belongsToMany(db.cart,
    {
        through : "cart_products",
        foreinKey : "productId",
        otherKey : "cartId"
    }
);

db.cart.belongsToMany(db.product,
    {
        through : "cart_products",
        foreinKey : "cartId",
        otherKey : "productId"
    }
);

db.Roles = ["user", "admin"];

module.exports = db;