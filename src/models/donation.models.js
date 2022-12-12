module.exports = (sequelize, DataTypes) => {
  const donation = sequelize.define('donation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    donorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
  });
  return donation;
};
