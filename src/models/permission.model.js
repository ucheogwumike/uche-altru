module.exports = (sequelize, dataType) => {
  const permission = sequelize.define('permission', {
    id: {
      type: dataType.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
  });

  return permission;
};
