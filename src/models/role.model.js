module.exports = (sequelize, dataType) => {
  const role = sequelize.define('role', {
    name: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      primaryKey: true,
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
  });

  return role;
};
