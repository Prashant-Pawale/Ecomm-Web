module.exports = (sequelize, sequelizeInstance) => {
    let User = sequelizeInstance.define("users",
      {
        username: {
          type: sequelize.DataTypes.STRING,
        },
        email: {
          type: sequelize.STRING,
        },
        password: {
          type: sequelize.STRING,
        },
      },
      {
        timestamps: false,
      }
    );
    return User;
}