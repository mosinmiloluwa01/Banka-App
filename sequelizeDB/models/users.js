/* eslint-disable strict */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  Users.associate = (models) => {
    Users.hasMany(models.Accounts, {
      foreignKey: 'user_id',
      as: 'owner',
    });
    Users.hasMany(models.Transactions, {
      foreignKey: 'user_id',
      as: 'cashier',
    });
    Users.hasMany(models.Requests, {
      foreignKey: 'user_id',
      as: 'requester',
    });
  };
  return Users;
};
