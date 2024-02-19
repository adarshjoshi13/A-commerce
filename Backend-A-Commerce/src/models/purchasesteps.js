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
        stepName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        stepForm: {
            type: DataTypes.JSON,
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