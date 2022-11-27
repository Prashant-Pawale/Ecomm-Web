const express = require("express");
const authController = require("./../controller/auth.controller");
const verifySignUp = require("./../middlewares/VerifySignUp");
const expressApp = express();
const authRouter = express.Router();

expressApp.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

authRouter.post(
  "/signup",
  [verifySignUp.checkDuplicateUserName,
    verifySignUp.checkIfRolesExist],
  authController.signup
);
authRouter.post("/signin", authController.signin);

module.exports = authRouter;
