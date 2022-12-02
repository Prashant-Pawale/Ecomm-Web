const { mockRequest, mockResponse } = require("./../interceptor");
const db = require("./../../../model/index")
const productController = require("./../../../controller/product.controller");

describe("Product Controller", () => {
  let req, res;
  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  let testNewProductAdded = {
      name: "Raymond Blazer",
      categoryId: 1,
      price: 10000,
    };
  let testPayload = {
    message: "New product added",
    addedProduct: testNewProductAdded,
  }; // this structure should match with res.json in product controller

  test('should test the addNewProduct method with payload', async () => {
    const spy = jest.spyOn(db.product, "create").mockImplementation(
        () => {
            return new Promise((resolve, reject) => {
                resolve(testPayload);
            })
        }
    );
    req.body = testNewProductAdded;
    await productController.addNewProduct(req, res);

    expect(spy).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    // expect(res.json).toHaveBeenCalledWith(testPayload);
  });
});
