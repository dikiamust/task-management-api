const mongoose = require("mongoose");
// const validator = require("validator");

// const today = new Date().toISOString();
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    product_name: {
      type: String,
    },
    stock: {
      type: Number,
    },
    purchase_price: {
      type: Number,
    },
    selling_price: {
      type: Number,
    },
    UOM: {
      type: String,
    },
    deleted_by: {
      type: String,
    },
    updated_by: {
      type: String,
    },
    deleted: {type: Boolean, default: false},
    deleted_at: {type: Date},
  },
  {timestamps: true}
);

const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
