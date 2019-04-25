/* eslint-disable strict */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    trxn_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    old_balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    new_balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {});
  Transactions.associate = (models) => {
    Transactions.belongsTo(models.Users, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };
  return Transactions;
};
