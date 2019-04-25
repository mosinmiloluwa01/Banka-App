/* eslint-disable strict */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Accounts = sequelize.define('Accounts', {
    account_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    account_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {});
  Accounts.associate = (models) => {
    Accounts.belongsTo(models.Users, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };
  return Accounts;
};
