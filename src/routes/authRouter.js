const {Router} = require("express");
const authController = require("../controllers/authController");

class ManagerRouter {
  router;

  constructor() {
    this.router = Router();
    this.authRouter();
  }

  authRouter() {
    this.router.post("/login", authController.login);
  }
}

module.exports = new ManagerRouter().router;
