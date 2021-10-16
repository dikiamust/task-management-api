const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    deleted_by: {
      type: String,
    },
    deleted: {type: Boolean, default: false},
    deleted_at: {type: Date},
  },
  {timestamps: true}
);

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
