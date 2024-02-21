const { Sequelize } = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.PG_CONNECTION_URI, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
        },
    },
});

const GetOtps = require('./getotps')(sequelize, Sequelize);
const Customers = require('./customers')(sequelize, Sequelize);
const Products = require('./products')(sequelize, Sequelize);
const Categories = require('./categories')(sequelize, Sequelize);
const PurchaseSteps = require('./purchasesteps')(sequelize, Sequelize);
const Orders = require('./orders')(sequelize, Sequelize);

const Connection = async () => {
    try {

        await sequelize.authenticate();
        console.log('PG db connected');

        sequelize.sync()
            .then(() => {
                console.log('Models synchronized');
            })
            .catch((err) => {
                console.error('Error syncing models:', err);
            });

    } catch (error) {
        console.error('PG database connection error:', error);
    }
};

module.exports = { Connection, GetOtps, Customers, Products, Categories, PurchaseSteps, Orders, sequelize }