let db = {};

db.user = require("./User");
db.roles = require("./Roles");

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

db.Roles = ["user", "admin"];

module.exports = db;