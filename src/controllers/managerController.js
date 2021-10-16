const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

class ManagerController {
  static async addEmployee(req, res, next) {
    const selectRole = req.body.role;
    try {
      if (
        !req.body.username ||
        !req.body.email ||
        !req.body.password ||
        !req.body.role
      ) {
        throw {name: "REQUIRED"};
      }

      const emailExist = await UserModel.findOne({email: req.body.email});
      if (emailExist) {
        throw {name: "EMAIL_EXIST"};
      }

      if (selectRole !== "inventory") {
        throw {name: "INVALID_ROLE"};
      }
      const addEmployee = await UserModel.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role: selectRole,
      });
      res.status(201).json({
        success: true,
        message: "Employee was added successfully!",
        data: addEmployee,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ManagerController;
