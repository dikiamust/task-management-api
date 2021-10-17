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

    this.router.get(
      "/employees/all",
      authJwt.managerAuthorization,
      managerController.getAllEmployees
    );
  }
}

module.exports = new ManagerRouter().router;
