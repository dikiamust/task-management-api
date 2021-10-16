const {Router} = require("express");
const managerRouter = require("./managerRouter");
const authRouter = require("./authRouter");
const inventoryRouter = require("./inventoryRouter");
const authJwt = require("../middlewares/authJwt");
const errorHandler = require("../middlewares/errorHandler");

class IndexRoutes {
  router;
  constructor() {
    this.router = Router();
    this.routes();
    this.authRouter();
    this.authJwt();
    this.managerRouter();
    this.inventoryRouter();
    this.errorHandler();
  }

  routes() {
    this.router.get("/", (req, res) => {
      res.status(200).json({message: "Wellcome to Task-Management API!"});
    });
  }

  authRouter() {
    this.router.use("/auth", authRouter);
  }

  authJwt() {
    this.router.use(authJwt.authentication);
  }

  managerRouter() {
    this.router.use(managerRouter);
  }

  inventoryRouter() {
    this.router.use("/inventory", inventoryRouter);
  }

  errorHandler() {
    this.router.use(errorHandler);
  }
}

module.exports = new IndexRoutes().router;
