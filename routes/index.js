let express = require('express');
let router = express.Router();

let categoryRoutes = require('./categories.route');
let productRoutes = require("./products.route");
let authRoutes = require("./auth.route");
let cartRoutes = require("./cart.route");


router.get('/', (req, res, next) => {
    res.write('This is the base page');
    res.end();
});

router.use("/ecomm/api/v1/categories", categoryRoutes);
router.use("/ecomm/api/v1/products", productRoutes);
router.use("/ecomm/api/v1/auth", authRoutes);
router.use("/ecomm/api/v1/cart", cartRoutes);


module.exports = router;