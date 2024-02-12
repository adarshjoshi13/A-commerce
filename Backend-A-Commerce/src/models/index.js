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

const GetOtpsModel = require('./getotps')(sequelize, Sequelize);

const Connection = async () => {
    try {
        
        await sequelize.authenticate();
        console.log('PG db connected');

        sequelize.sync().catch((err) => {
            if(err){
                console.error('Error syncing models:', err);
            }
        });

    } catch (error) {
        console.error('PG database connection error:', error);
    }
};

module.exports = { Connection, GetOtpsModel }