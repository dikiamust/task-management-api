const {Router} = require("express");
const managerController = require("../controllers/managerController");
const authJwt = require("../middlewares/authJwt");

class ManagerRouter {
  router;

  constructor() {
    this.router = Router();
    this.addEmployee();
  }

  addEmployee() {
    this.router.post(
      "/employees/create",
      authJwt.managerAuthorization,
      managerController.addEmployee
    );
  }
}

module.exports = new ManagerRouter().router;
