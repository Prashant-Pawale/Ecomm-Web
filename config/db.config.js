const developmentInstance = {
  DB: "ecomm_db",
  USER: "root",
  PASSWORD: "Prashant@1199",
  HOST: "localhost",
  dialect: "mysql",
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const testInstance = {
  DB: "ecomm_test_db",
  USER: "root",
  PASSWORD: "Prashant@1199",
  HOST: "localhost",
  dialect: "mysql",
  operatorsAliases: 0,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

module.exports = {
    development : developmentInstance,
    test : testInstance
}