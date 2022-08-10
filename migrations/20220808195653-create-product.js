'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amountAvailable: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      cost: {
        allowNull: false,
        type: Sequelize.NUMBER
      },
      productName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sellerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};