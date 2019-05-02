/* eslint-disable arrow-parens */
/* eslint-disable strict */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Accounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    account_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'user_id',
      },
    },
    account_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account_status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account_balance: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Accounts'),
};
