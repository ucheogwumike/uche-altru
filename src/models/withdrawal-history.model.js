module.exports = (sequelize, dataType) => {
  const withdrawalHistory = sequelize.define('withdrawal_history', {
    amount: {
      type: dataType.DECIMAL,
      allowNull: false,
      trim: true,
    },
    status: {
      type: dataType.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
  });

  return withdrawalHistory;
};
