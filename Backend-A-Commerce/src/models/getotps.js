const { sequelize } = require('sequelize')

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('getotps', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                notEmpty: true
            }
        },
        mobile: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        generate_otp: {
            type: DataTypes.STRING(6),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        is_verify: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notEmpty: true
            }
        },
        of_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                notEmpty: true
            }
        }
    }, {
        sequelize,
        tableName: 'getotps',
        timestamps: true,
    });
}