/* eslint-disable strict */
/* eslint-disable camelcase */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Requests = sequelize.define('Requests', {
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    request_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    account_id: {
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
  }, {});
  Requests.associate = (models) => {
    Requests.belongsTo(models.Accounts, {
      foreignKey: 'account_id',
      onDelete: 'CASCADE',
    });
    Requests.belongsTo(models.Users, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };
  return Requests;
};
