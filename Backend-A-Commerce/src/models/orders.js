const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                notEmpty: true
            }
        },
        deliveryInfo: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        orderedProduct: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        orderedBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        SellBy: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
    }, {
        sequelize,
        tableName: 'orders',
        timestamps: true,
        updatedAt: false
    })
}