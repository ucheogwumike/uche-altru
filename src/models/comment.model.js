module.exports = (sequelize, dataType) => {
  const comment = sequelize.define('comment', {
    id: {
      type: dataType.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    message: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
  });

  return comment;
};
