const db = require("./../model/index")

let getAllCategories = async (req, res, next) => {
  try{
    let getCategories = await db.category.findAll();
    res.status(200).json(getCategories);
  } catch(err){
    res.status(400).json({
      message : "Some internal error occured"
    })
  }
};

let getCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  let dataById = await db.category.findOne({
    where: { id: id },
  });
  res.status(200).json(dataById);
};

let addNewCategory = async (req, res, next) => {
  try {
    let categoryToAdd = req.body;
    if (categoryToAdd.name) {
      await db.category.create(categoryToAdd);
      res.status(201).send({
        message: "New Category Added",
        addedCategory: categoryToAdd,
      });
      res.end();
    }
  } catch (err) {
    next(err);
  }
};

let deleteCategoryById = async (req, res, next) => {
  let id = req.params.categoryId;
  try {
    await db.category.destroy({
      where: { id: id },
    });
    let deletedCategory = await db.category.findOne({
      where : {id : id}
    });
    res.status(200).send({
      message: "category deleted",
      deleted_Category : deletedCategory,
    });
    res.end();
  } catch (err) {
    next(err);
  }
};

let updateCategoryById = async (req, res, next) => {
  try {
    let id = req.params.categoryId;
    let categoryToUpdate = { name: req.body.name };
    await db.category.update(categoryToUpdate, {
      where: { id: id },
    });
    let updatedCategory = await db.category.findByPk(id);
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
