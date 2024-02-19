const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('purchaseStepper', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                notEmpty: true
            }
        },
        stepName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        stepForm: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        sequelize,
        tableName: 'purchaseStepper',
        timestamps: false
    })
}