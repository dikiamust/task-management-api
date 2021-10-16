const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthJwt {
  static async authentication(req, res, next) {
    try {
      const access_token = await req.headers.access_token;
      if (!access_token) {
        throw {name: "MISSING_TOKEN"};
      }
      const key = process.env.SECRETKEY;
      jwt.verify(access_token, key, (err, decoded) => {
        if (err) {
          throw {name: "INVALID_TOKEN"};
        }
        req.userID = decoded.id;
        req.userRole = decoded.role;
        next();
      });
    } catch (err) {
      next(err);
    }
  }

  static async managerAuthorization(req, res, next) {
    try {
      if (req.userRole !== "manager") {
        throw {name: "FORBIDDEN"};
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AuthJwt;
