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

const Connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('PG database connected successfully');
    } catch (error) {
        console.error('PG database connection error:', error);
    }
};

module.exports = { Connection };
