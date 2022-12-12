const validator = require('validator');

module.exports = (sequelize, dataType) => {
  const complaint = sequelize.define('complaint', {
    id: {
      type: dataType.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    description: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    firstname: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    lastname: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    status: {
      type: dataType.STRING,
      allowNull: false,
      defaultValue: 'pending',
      trim: true,
    },
  });

  return complaint;
};
