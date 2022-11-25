const { Sequelize } = require("sequelize");
const Category = require("./../model/Category");

let getAllCategories = async (req, res, next) => {
  let getCategories = await Category.findAll();
  // res.writeHead(200, { "Content-Type": "application/json" });
  res.send(getCategories);
  res.end();
};

let getCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  let dataById = await Category.findAll({
    where: { id : id },
  });
  res.send(dataById);
  res.end();
};

let addNewCategory = async (req, res, next) => {
  try {
    let categoryToAdd = req.body;
    if (categoryToAdd.name) {
      await Category.create(categoryToAdd);
      res.status(201).send("New Category Added");
      res.end();
    }
  } catch (err) {
    next(err);
  }
};

let deleteCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  try {
    await Category.destroy({
      where: { id : id },
    });
    res.status(200).send("category deleted");
    res.end();
  } catch (err) {
    next(err);
  }
};

let updateCategoryById = async (req, res, next) => {
  try {
    let id = req.params.categoryId;
    let categoryToUpdate = { name: req.body.name };
    await Category.update(categoryToUpdate, {
      where: { id : id },
    });
    let updatedCategory = await Category.findByPk(id);
    res.status(200).send(updatedCategory);
    res.end();
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getAllCategories,
  getCategoryById,
  addNewCategory,
  deleteCategoryById,
  updateCategoryById,
};
