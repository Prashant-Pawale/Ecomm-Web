let express = require('express');
let productRouter = express.Router();
let productController = require('./../controller/product.controller');
let authJwt = require("./../middlewares/authJwt");

productRouter.get("/", [authJwt.verifyToken] ,productController.getAllProducts);

productRouter.get("/:productId", productController.getProductsById);

productRouter.post("/" , productController.addNewProduct);
productRouter.post("/insertAll", productController.insertProducts);

productRouter.delete("/:productId" , productController.deleteProductById);

productRouter.put("/:productId" , productController.updateByProductId);

module.exports = productRouter;
