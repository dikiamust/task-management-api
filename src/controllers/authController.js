const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

class AuthController {
  static async login(req, res, next) {
    try {
      const reqEmail = await UserModel.findOne({email: req.body.email}).where({
        deleted: false,
      });
      if (!reqEmail) {
        throw {name: "USER_NOT_FOUND"};
      }

      const reqPassword = bcrypt.compareSync(
        req.body.password,
        reqEmail.password
      );
      if (!reqPassword) {
        throw {name: "FALSE_LOGIN"};
      }

      const key = process.env.SECRETKEY;
      let token = jwt.sign({id: reqEmail.id, role: reqEmail.role}, key, {
        expiresIn: "1h",
      });

      res.status(200).json({
        message: "Login successfully!",
        data: reqEmail,
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthController;
