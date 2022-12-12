module.exports = (sequelize, DataTypes) => {
  const campaign = sequelize.define('campaign', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    launchStatus: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      allowNull: false,
    },
    launchDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amountReceived: {
      type: DataTypes.DECIMAL,
    },
    withdrawStatus: {
      type: DataTypes.STRING,
    },
    withdrawDate: {
      type: DataTypes.DATE,
    },
  });
  return campaign;
};
