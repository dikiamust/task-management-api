const ProductModel = require("../models/ProductModel");

class InventoryController {
  static async addProduct(req, res, next) {
    try {
      const {product_name, stock, purchase_price, selling_price, UOM} =
        req.body;

      if (
        !req.body.product_name ||
        !req.body.stock ||
        !req.body.purchase_price ||
        !req.body.selling_price ||
        !req.body.UOM
      ) {
        throw {name: "REQUIRED"};
      }

      const findProduct = await ProductModel.findOne({
        product_name: req.body.product_name,
      })
        .where({deleted: false})
        .where({UOM: req.body.UOM});

      if (!findProduct) {
        const addProduct = await ProductModel.create(req.body);
        res.status(201).json({
          success: true,
          message: "Product was added succesfully!",
          data: addProduct,
        });
      }
      const addStock = await ProductModel.findByIdAndUpdate(
        findProduct.id,
        {$inc: {stock: req.body.stock}},
        {new: true}
      );
      res.status(201).json({
        success: true,
        message: "Product already exist, stock added succesfully!",
        data: addStock,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    const {id} = req.params;
    const {product_name, stock, purchase_price, selling_price, UOM} = req.body;

    let updatedData = req.body;

    for (let key in updatedData) {
      if (!updatedData[key]) {
        delete updatedData[key];
      }
    }

    updatedData.updated_by = req.userID;

    try {
      const edit = await ProductModel.findByIdAndUpdate(id, updatedData, {
        new: true,
      }).where({deleted: false});

      res.status(200).json({
        success: true,
        message: "Product was successfully updated!",
        data: edit,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    const {id} = req.params;
    const today = new Date().toISOString();
    const deleted = {deleted: true, deleted_at: today, deteted_by: req.userID};

    try {
      const edit = await ProductModel.findByIdAndUpdate(id, deleted, {
        new: true,
      }).where({deleted: false});
      if (!edit) {
        throw {name: "DELETED"};
      }
      res.status(200).json({
        success: true,
        message: "Product was deleted successfully",
        data: edit,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getDetailProduct(req, res, next) {
    const {id} = req.params;
    try {
      const detail = await ProductModel.findById(id).where({
        deleted: false,
      });

      if (!detail) {
        throw {name: "PRODUCT_NOT_FOUND"};
      }
      res.status(200).json({
        success: true,
        message: "Product shown successfully",
        data: detail,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getAllProducts(req, res, next) {
    try {
      const result = await ProductModel.find().where({deleted: false});
      if (result.length > 0) {
        res.status(200).json({
          success: true,
          message: "All products was successfully shown",
          data: result,
        });
      } else {
        res.status(200).json({message: "No product created ", data: 0});
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = InventoryController;
