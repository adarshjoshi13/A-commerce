const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('purchase_steps', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                notEmpty: true
            }
        },
        stepNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        stepName: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        stepForm: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
              notEmpty: true,
            },        
          },        
    }, {
        sequelize,
        tableName: 'purchase_steps',
        timestamps: false
    })
}