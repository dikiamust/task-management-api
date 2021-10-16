module.exports = (err, req, res, next) => {
  let code;
  let name = err.name;
  let message;

  switch (name) {
    case "REQUIRED":
      code = 401;
      message = "Please fill out all fields ";
      break;

    case "INVALID_ROLE":
      code = 401;
      message = "Invalid Role!";
      break;

    case "FAILED_REGISTER":
      code = 401;
      message = "failed to register!";
      break;

    case "EMAIL_EXIST":
      code = 401;
      message = "Email already exist!";
      break;

    case "FALSE_LOGIN":
      code = 401;
      message = "email or password invalid!";
      break;

    case "INVALID_TOKEN":
      code = 401;
      message = "Invalid access_token";
      break;

    case "MISSING_TOKEN":
      code = 401;
      message = "missing access token!";
      break;

    case "FORBIDDEN":
      code = 403;
      message = "forbidden access!";
      break;

    case "USER_NOT_FOUND":
      code = 404;
      message = "User not found!";
      break;

    case "PRODUCT_NOT_FOUND":
      code = 404;
      message = "Product not found!";
      break;

    case "NOT_EDITED":
      code = 400;
      message = "failed to update! ";
      break;
    case "DELETED":
      code = 400;
      message = "This user already deleted!";
      break;

    default:
      code = 500;
      message = " internal server error!";
  }
  res.status(code).json({success: false, message});
};
