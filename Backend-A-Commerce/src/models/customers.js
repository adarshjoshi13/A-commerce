const sequelize = require('sequelize')

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('customers', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                notEmpty: true
            }
        },
        full_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        mobile: {
            type: DataTypes.BIGINT,
            allowNull: false,
            // unique: true,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: true
        }

    }, {
        sequelize,
        tableName: 'customers',
        timestamps: true,
        updatedAt: false
    });
}

