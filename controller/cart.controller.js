const db = require("./../model/index");

let createCart = async (req,res,next) => {
    try {
        await db.cart.create({ cost: 0 });
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
    let cartToUpdate = await db.cart.findByPk(cartId);
    if(cartToUpdate){
        let productsToAdd = await db.product.findAll({
          where: { id: req.body.productIds }, // productIds will be an array
        });

        if(productsToAdd){
            await cartToUpdate.setProducts(productsToAdd);
            console.log("Products added");

            let totalCost = 0;
            let productsSelected = [];
            // products is an array of object
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
    let cart = await db.cart.findByPk(req.params.cartId);
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
      id: cart.id,
      productsSelected,
      totalCost,
    });
}


module.exports = { createCart, updateCart, getCart };