const validator = require('validator');

module.exports = (sequelize, dataType) => {
  const user = sequelize.define('user', {
    firstName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    lastName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    gender: {
      type: dataType.STRING,
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
    password: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    phonenumber: {
      type: dataType.INTEGER,
      trim: true,
    },
    isEmailVerified: {
      type: dataType.BOOLEAN,
      trim: true,
      defaultValue: false,
      allowNull: false,
    },
    dateOfBirth: {
      type: dataType.STRING,
      trim: true,
    },
    address: {
      type: dataType.STRING,
      trim: true,
    },
    country: {
      type: dataType.STRING,
      trim: true,
    },
    city: {
      type: dataType.STRING,
      trim: true,
    },
    profileImage: {
      type: dataType.STRING,
      trim: true,
    },
    validIdNumber: {
      type: dataType.STRING,
      trim: true,
    },
    status: {
      type: dataType.STRING,
      trim: true,
      defaultValue: 'active',
    },
    googleId: {
      type: dataType.STRING,
      trim: true,
    },
    roleName: {
      type: dataType.STRING,
      defaultValue: 'user',
      allowNull: false,
      trim: true,
    },
  });

  return user;
};
