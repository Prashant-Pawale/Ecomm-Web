let db = {};

db.user = require("./User");
db.roles = require("./Roles");
db.product = require("./Product");
db.cart = require("./Cart")

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