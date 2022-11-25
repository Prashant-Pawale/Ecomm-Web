let express = require("express");
let categoryRouter = express.Router();
let categoryController = require("./../controller/category.controller");
let requestValidator = require("./../middlewares/RequestValidator");


// here '/' means '/categories' as we have mentioned '/categories' in index file.
categoryRouter.get("/", categoryController.getAllCategories);

categoryRouter.get(
    "/:categoryId", 
    [requestValidator.validateReqForCategoryId],
    categoryController.getCategoryById
);

categoryRouter.post(
    "/", 
    [requestValidator.validateReqForCategoryName],
     categoryController.addNewCategory
);

categoryRouter.delete(
  "/:categoryId",
  [requestValidator.validateReqForCategoryId],
  categoryController.deleteCategoryById
);

// put is for updating the values
categoryRouter.put(
  "/:categoryId",
  [requestValidator.validateReqForCategoryName,
   requestValidator.validateReqForCategoryId
  ],
  categoryController.updateCategoryById
);

module.exports = categoryRouter;
