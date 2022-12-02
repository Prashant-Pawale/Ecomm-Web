module.exports = (sequelize,sequelizeInstance) => {
    let Category = sequelizeInstance.define("categories",
      {
        id: {
          type: sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: sequelize.DataTypes.STRING,
          notNull: true,
        },
      },
      {
        timestamps: false,
      }
    );
    return Category;
}