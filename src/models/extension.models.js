module.exports = (sequelize, DataTypes) => {
  const extension = sequelize.define('extension', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    newDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    oldDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  });
  return extension;
};
