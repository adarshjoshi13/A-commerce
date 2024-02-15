const sequelize = require("sequelize")

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
      name: {
         type: DataTypes.STRING(50),
         allowNull: false,
         vallidate: {
            notEmpty: true
         }
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false,
         vallidate: {
            notEmpty: true
         }
      },
      price: {
         type: DataTypes.INTEGER(5),
         allowNull: false,
         vallidate: {
            notEmpty: true
         }
      },
      imageId: {
         type: DataTypes.INTEGER(10),
         allowNull: false,
         vallidate: {
            notEmpty: true
         }
      },
      categoryId: {
         type: DataTypes.INTEGER(10),
         allowNull: false,
         vallidate: {
            notEmpty: true
         }
      },
      reviewId: {
         type: DataTypes.INTEGER(10),
         allowNull: false,
         vallidate: {
            notEmpty: true
         }
      }
   }, {
      sequelize,
      tableName: 'products',
      timestamps: false
   })
}