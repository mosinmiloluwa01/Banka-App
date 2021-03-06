/* eslint-disable arrow-parens */
/* eslint-disable strict */

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    created_on: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    trxn_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    account_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Accounts',
        key: 'id',
        as: 'account_id',
      },
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
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    old_balance: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    new_balance: {
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
  down: (queryInterface) => queryInterface.dropTable('Transactions'),
};
