const db = require("./../model/index");
const Roles = db.Roles; // this is the array which we've created in index file of model

let checkDuplicateUserName = async (req, res, next) => {
    let isUserExist = await db.user.findOne({
        where : {username : req.body.username}
    });

    if(isUserExist){
        res.status(400).json({
            message : "User already exist"
        });
        return;
    }

    next();
}

let checkIfRolesExist = (req, res, next) => {
    if(req.body.roles){ // which is array
        for(let i=0; i<req.body.roles.length; i++){
            if(!Roles.includes(req.body.roles[i])){
                res.status(400).send({
                    message : req.body.roles[i] + " role doesn't exist"
                });
                return;
            }
        }
    }
    next();
}

module.exports = { checkDuplicateUserName, checkIfRolesExist };