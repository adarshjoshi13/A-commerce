const sequelize = require("sequelize")

module.exports = function (sequelize, DataTypes) {
   return sequelize.define('products', {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
         validate: {
            notEmpty: true
         }
      },
      catId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      reviewId: {
         type: DataTypes.INTEGER(),
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      name: {
         type: DataTypes.STRING(50),
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false,
         validate: {
            notEmpty: true
         }
      },
      price: {
         type: DataTypes.BIGINT,
         allowNull: false,
         validate: {
           notEmpty: true
         }
       },
      images: {
         type: DataTypes.ARRAY(DataTypes.STRING),
         allowNull: false,
         validate: {
            notEmpty: true
         }
      }
   }, {
      sequelize,
      tableName: 'products',
      timestamps: true
   })
}