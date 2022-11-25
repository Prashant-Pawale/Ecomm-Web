const { Sequelize } = require('sequelize');
const Product = require("./../model/Product")

// This is post call for inserting all products
let insertProducts = async (req, res, next) => {
    await Product.bulkCreate([
      { name: "Adidas Shoes", categoryId: 1, price: 2000 },
      { name: "Raymond Blazer", categoryId: 1, price: 10000 },
      { name: "Titan Watch", categoryId: 1, price: 3000 },
      { name: "Samsung Galaxy Note", categoryId: 2, price: 18000 },
      { name: "Iphone 13", categoryId: 2, price: 60000 },
      { name: "OnePlus 10T", categoryId: 2, price: 45000 },
      { name: "Sony bravia", categoryId: 3, price: 40000 },
      { name: "Boat Rugged", categoryId: 3, price: 4000 },
      { name: "JBL Storm", categoryId: 3, price: 9000 },
      { name: "Samsung Refrigerator", categoryId: 4, price: 24000 },
      { name: "Whirlpool Washing Machine", categoryId: 4, price: 25000 },
      { name: "Voltas AC", categoryId: 4, price: 40900 },
    ]);
    res.status(200).send("All Products added");
    res.end();
}

let getAllProducts = async (req, res, next) => {
    let categoryId = req.query.categoryId;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let getProducts = [];
    if (Object.keys(req.query).length == 0) {
        getProducts = await Product.findAll();
    } else  if (categoryId && !(minPrice || maxPrice)) {
        getProducts = await filterByCategory(categoryId);
    } else if (!categoryId && minPrice && maxPrice) {
        getProducts = await filterByPriceRange(minPrice, maxPrice);
    } else {
        getProducts = await Product.findAll({
          where: {
            categoryId: categoryId,
            price: {
              [Sequelize.Op.gte]: minPrice,
              [Sequelize.Op.lte]: maxPrice,
            },
          },
        });
    }
    // res.writeHead(200, { "Content-Type": "application/json" });
    res.status(200).json(getProducts); 
    res.end();
}
let filterByCategory = async (categoryId) => {
  let filteredProducts = await Product.findAll({
    where: { categoryId: categoryId },
  });
  return filteredProducts;
};
let filterByPriceRange = async (minPrice, maxPrice) => {
    let filteredProductsByPrice = await Product.findAll({
      where: {
        price: {
          [Sequelize.Op.gte]: minPrice,
          [Sequelize.Op.lte]: maxPrice,
        },
      },
    });
    return filteredProductsByPrice;
}


let getProductsById = async (req, res, next) => {
    let id = req.params.productId
    let productById = await Product.findAll({
      where: { id : id },
    });
    // res.writeHead(200, { "Content-Type": "application/json" });
    res.send(productById);
    res.end();
}

let addNewProduct = async (req, res, next) => {
    try {
        let productToAdd = {name : req.body.name,
                            price : req.body.price,
                            categoryId : req.body.categoryId
                            };
        await Product.create({
          name: productToAdd.name,
          price: productToAdd.price,
          categoryId : productToAdd.categoryId
        });
        res.status(201).send("New product added");
        res.end();
    } catch(err) {
        next(err);
    }
}

let deleteProductById = async (req, res, next) => {
    let id = req.params.productId;
    let product = await Product.findByPk(id);
    try {
        if(!product){
            throw new Error('Product not found');
        }
        await Product.destroy({
          where: { id: id },
        });
        res.status(200).send('product deleted');
        res.send();
    } catch(err){
        next(err);
    }
}

let updateByProductId = async (req, res, next) => {
    let id = req.params.productId;
    let productToUpdate = {name : req.body.name,
                           price : req.body.price,
                           categoryId : req.body.categoryId
    }
    await Product.update(productToUpdate, {
      where: { id : id },
    });
    let updatedProduct = await Product.findByPk(id);
    res.status(200).send(updatedProduct);
    res.end();
}


module.exports = {
  getAllProducts,
  getProductsById,
  addNewProduct,
  deleteProductById,
  updateByProductId,
  insertProducts,
};