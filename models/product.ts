// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   product.init({
//     name: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'product',
//   });
//   return product;
// };


import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class product extends Model {
  id!: number;

  amountAvailable!: number;

  cost!: number;

  productName!: string;

  sellerId!: number;

  createdAt?: Date;

  updatedAt?: Date;
};

export const productModelAttributes: ModelAttributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amountAvailable: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  cost: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  productName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  sellerId: {
    type: DataTypes.INTEGER,
    references:{ model: 'user', key: 'id' },
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}