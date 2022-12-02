module.exports = (sequelize,sequelizeInstance) => {
    let Product = sequelizeInstance.define("products",
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
        price: {
          type: sequelize.DataTypes.BIGINT,
          notNull: true,
        },
      },
      {
        timestamps: false,
      }
    );
    return Product;
}