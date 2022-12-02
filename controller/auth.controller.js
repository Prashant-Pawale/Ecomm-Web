let bcrypt = require("bcryptjs");
const config = require("./../config/auth.config");
let jwt = require("jsonwebtoken");
let db = require("./../model/index");


let signup = async (req, res, next) => {
  let user = await db.user.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  // req.body.roles will be an array like ['admin','user']
  if (req.body.roles) {
    let roles = await db.roles.findAll({
      where: { name: { [db.sequelize.Op.or]: req.body.roles } },
    });
    // console.log(roles) // roles is an obj with id(we wanted id cuase name is already provided in body)
    // and name as key
    await user.setRoles(roles); // setting role with id
    res.status(200).json({
      message: "User registered successfully",
    });
  }else{
    // if body doesn't has role then set the role as 'user' by default
    await user.setRoles([1]) // 1 is the id of user role
    res.status(200).json({
      message : "User registared with role as 'user'"
    })
  }
};

let signin = async (req, res, next) => {
  let userName = await db.user.findOne({
    where: { username: req.body.username },
  });
//   console.log(userName); // it prints an object having username same as provided in req.body

  if (!userName) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  let isValidPassword = bcrypt.compareSync(
    req.body.password,
    userName.password
  );
  if (!isValidPassword) {
    res.status(401).json({
      message: "Password is Incorrect",
    });
    return;
  }
  // if password is valid
  let token = jwt.sign({ id: userName.id }, config.secret, {
    expiresIn: 86400,
  });
  let authorities = [];
  let roles = await userName.getRoles();
//   console.log(roles); // roles is array of objects with id and name as key
  for (let i = 0; i < roles.length; i++) {
    authorities.push("ROLE_" + roles[i].name.toUpperCase());
  }

  res.status(200).send({
    id: userName.id,
    username: userName.username,
    email: userName.email,
    roles: authorities,
    accessToken: token,
  });
};

module.exports = { signup, signin };
