const db = require("./../model/index");
const Product = db.product;
const Cart = db.cart;

let createCart = async (req,res,next) => {
    try {
        await Cart.create({cost: 0});
        res.status(200).json({
            message : "Cart created"
        });
    }catch(err) {
        res.status(401).json({
            message : "Some Internal error happened"
        });
    }
};

let updateCart = async (req,res,next) => {
    const cartId = req.params.cartId;
    let cartToUpdate = await Cart.findByPk(cartId);
    if(cartToUpdate){
        let productsToAdd = await Product.findAll({
            where : {id : req.body.productIds} // productIds will be an array
        });

        if(productsToAdd){
            await cartToUpdate.setProducts(productsToAdd);
            console.log("Products added");

            let totalCost = 0;
            let productsSelected = [];
            let products = await cartToUpdate.getProducts();
            for(let i=0; i<products.length; i++){
                totalCost += products[i].price;
                productsSelected.push({
                    id : products[i].id,
                    name : products[i].name,
                    price : products[i].price
                })
            }
            res.status(200).json({
                id : cartToUpdate.id,
                productsSelected,
                totalCost
            });
        }
    }
};

let getCart = async (req,res,next) => {
    let cart = await Cart.findByPk(req.body.cartId);
    let totalCost = 0;
    let productsSelected = [];
    let products = await cart.getProducts();
    for (let i = 0; i < products.length; i++) {
      totalCost += products[i].price;
      productsSelected.push({
        id: products[i].id,
        name: products[i].name,
        price: products[i].price,
      });
    }
    res.status(200).json({
      id: cartToUpdate.id,
      productsSelected,
      totalCost,
    });
}


module.exports = { createCart, updateCart, getCart };