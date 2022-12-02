let express = require("express");
let cartRouter = express.Router();
let cartController = require("./../controller/cart.controller")
let authJwt = require("./../middlewares/authJwt");

cartRouter.post("/", [authJwt.verifyToken], cartController.createCart)

cartRouter.put("/:cartId", [authJwt.verifyToken], cartController.updateCart);

cartRouter.get("/:cartId", [authJwt.verifyToken], cartController.getCart);

module.exports = cartRouter;