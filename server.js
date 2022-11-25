// UI => routes => controller => model => sqlconnection
let serverConfig = require("./config/server.config");
let express = require("express");
let bodyParser = require("body-parser");
const router = require("./routes/index");
const ErrorHandler = require("./middlewares/ErrorHandler");
let sequelizeInstance = require("./config/db.config");
let Category = require("./model/Category");
let Product = require("./model/Product");
let Roles = require("./model/Roles");

let expressApp = express();
expressApp.use(bodyParser.json());
expressApp.use(router);
expressApp.use(ErrorHandler);

Category.hasMany(Product);

let createTables = async () => {
  await sequelizeInstance.sync({ force: true });
  insertCategories();
  insertRoles();
};

let insertCategories = async () => {
  await Category.bulkCreate([
    { name: "Fashion" },
    { name: "Mobile" },
    { name: "Electronics" },
    { name: "Appliances" },
  ]);
};

let insertRoles = async () => {
  await Roles.bulkCreate([
    {id : 1, name : "user"},
    {id : 2, name : "admin"},
  ]);
}

expressApp.listen(serverConfig.PORT, () => {
  console.log("server listening at port " + serverConfig.PORT);
  createTables();
});
