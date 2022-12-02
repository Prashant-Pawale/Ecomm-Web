const { mockRequest, mockResponse } = require("./../interceptor");
const db = require("./../../../model");
const categoryController = require("./../../../controller/category.controller");

describe("Category Controller", () => {
  let req, res;
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  let allCategories = [
    {id : 1, name : "Fashion"}, {id : 2, name: "Mobiles"}
  ];

  let getSingleCategory = {id : 1, name : "Fashion"};
  let categoryToAdd = {name : "Books"};
  let deleteCategory = {id : 5, name : "Books"};

  test("should test getAllCategories method" ,async () => {
    const spy = jest.spyOn(db.category, "findAll").mockImplementation(
        () => {
            return new Promise((resolve, reject) => {
                resolve(allCategories);
            })
        }
    );
    await categoryController.getAllCategories(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(allCategories); // it just check the pattern not the values
  });

  test("should test the error for getAllCategories method", async () => {
    const spy = jest.spyOn(db.category, "findAll").mockImplementation(
        () => {
            return new Promise((resolve, reject) => {
                reject("some error");
            });
    });

    await categoryController.getAllCategories(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Some internal error occured",
    });
  });

  test("should test getCategoryById method", async () => {
    const spy = jest.spyOn(db.category, "findOne").mockImplementation(
        () => {
            return new Promise((resolve, reject) => {
                resolve(getSingleCategory);
            })
        }
    );
    req.params.categoryId = 1
    await categoryController.getCategoryById(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(getSingleCategory);
  });

  test("should test addNewCategory method", async () => {
    const spy = jest.spyOn(db.category, "create").mockImplementation(
        () => {
            return new Promise((resolve, reject) => {
                resolve(categoryToAdd);
            })
        }
    );
    req.body = categoryToAdd;
    await categoryController.addNewCategory(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: "New Category Added",
      addedCategory: categoryToAdd,
    });
  });

  test("should test deleteCategoryById method", async () => {
    const spy = jest.spyOn(db.category, "destroy").mockImplementation(
        () => {
            return new Promise((resolve, reject) => {
                resolve(deleteCategory);
            })
        }
    );
      const spy1 = jest.spyOn(db.category, "findOne").mockImplementation(() => {
        return new Promise((resolve, reject) => {
          resolve(deleteCategory);
        });
      });
    req.params.categoryId = 5;
    await categoryController.deleteCategoryById(req, res);
    expect(spy).toHaveBeenCalled();
    expect(spy1).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
        message : "category deleted",
        deleted_Category : deleteCategory,
    })
  });

  test("should test updateCategoryById method", async () => {
    const spy = jest.spyOn(db.category, "update").mockImplementation(
        () => {
            return new Promise((resolve,reject) => {
                resolve(updatedCategory);
            })
        }
    );
     const spy1 = jest.spyOn(db.category, "findByPk").mockImplementation(() => {
       return new Promise((resolve, reject) => {
         resolve(updatedCategory);
       });
     });
    req.params.categoryId = 2;
    req.body.name = "Smartphones";
    let updatedCategory = { id: 2, name: "Smartphones" };
    await categoryController.updateCategoryById(req, res);
    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(updatedCategory);
  });
});
