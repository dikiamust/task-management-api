const {Router} = require("express");
const inventoryController = require("../controllers/inventoryController");

class InventoryRouter {
  router;

  constructor() {
    this.router = Router();
    this.product();
  }

  product() {
    this.router.post("/products", inventoryController.addProduct);

    this.router.put("/products/update/:id", inventoryController.updateProduct);

    this.router.delete(
      "/products/delete/:id",
      inventoryController.deleteProduct
    );

    this.router.get("/products", inventoryController.getAllProducts);
  }
}

module.exports = new InventoryRouter().router;
