let express = require("express");
let bodyParser = require("body-parser");
const router = require("./routes/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
const db = require("./model/index");

let expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(router);
expressApp.use(ErrorHandler);

db.category.hasMany(db.product);

db.sequelizeInstance.sync({ force: true }).then(() => {
    createTables();
});

let createTables = async () => {
  insertCategories();
  insertRoles();
};

let insertCategories = async () => {
  await db.category.bulkCreate([
    { name: "Fashion" },
    { name: "Mobile" },
    { name: "Electronics" },
    { name: "Appliances" },
  ]);
};

let insertRoles = async () => {
  await db.roles.bulkCreate([
    { id: 1, name: "user" },
    { id: 2, name: "admin" },
  ]);
};

module.exports = expressApp;