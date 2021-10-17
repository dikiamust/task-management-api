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

    this.router.get("/products", inventoryController.getAllProducts);

    this.router.get("/products/:id", inventoryController.getDetailProduct);

    this.router.put("/products/update/:id", inventoryController.updateProduct);

    this.router.delete(
      "/products/delete/:id",
      inventoryController.deleteProduct
    );
  }
}

module.exports = new InventoryRouter().router;
