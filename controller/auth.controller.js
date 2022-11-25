let bcrypt = require("bcryptjs");
const config  = require("./../config/auth.config");
let jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
let db = require("./../model/index");   
let User = db.user; // user model which we imported in index file of model.
let Roles = db.roles // roles model 

let signup = async (req, res, next) => {
    let user = await User.create({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 8)
    });
    // req.body.roles will be an array like ['admin','user']
    if(req.body.roles){
        let roles = await Roles.findAll({
            where : {name : {[Sequelize.Op.or] : req.body.roles}}
        });

        await user.setRoles(roles);
        res.status(200).json({
            message : "User registered successfully"
        });
    }
}

let signin = async (req, res, next) => {
    let userName = await User.findOne({
        where : {username : req.body.username}
    });

    if(!userName) {
        res.status(404).json({
            message : "User not found"
        });
        return;
    }

    let isValidPassword = bcrypt.compareSync(
                            re.body.password, 
                            userName.password);
    if(!isValidPassword){
        res.status(401).json({
            message : "Password is Incorrect"
        });
        return;
    }
    // if password is valid 
    let token = jwt.sign({id : userName.id}, config.secret, {
        expiresIn : 86400,
    });
}

module.exports = { signup, signin }