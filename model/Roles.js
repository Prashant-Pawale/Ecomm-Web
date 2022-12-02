module.exports = (sequelize, sequelizeInstance) => {
    let Role = sequelizeInstance.define("roles",
      {
        id: {
          type: sequelize.INTEGER,
          primaryKey: true,
        },
        name: {
          type: sequelize.STRING,
        },
      },
      {
        timestamps: false,
      }
    );
    return Role;
};