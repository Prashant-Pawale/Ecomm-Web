let config = require("./../config/auth.config");
let jwt = require("jsonwebtoken")
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        res.status(401).json({
            message : "Invalid token"
        });
        return; 
    }
    
    jwt.verify(token, config.secret, (err,decoded) => {
        if(err){
            res.status(401).json({
                message : "Unauthorized"
            });
            return;
        }
        // client is not passing the userid but it is passing token from
        // which we are getting userid
        req.userId = decoded.id;
        next();
    });
};

module.exports = { verifyToken };
