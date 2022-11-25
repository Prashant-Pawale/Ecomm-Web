const express = require("express");
const expressApp = express();
const authRouter = express.Router();
const authController = require("./../controller/auth.controller");

expressApp.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
})


authRouter.post("/signup", authController.signup);
authRouter.post("/signin", authController.signin);


module.exports = authRouter;