module.exports = (sequelize, dataType) => {
  const category = sequelize.define('category', {
    name: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      primaryKey: true,
    },
    status: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
  });

  return category;
};
