// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');
// const User = require('../../src/models/user.model');
const { db } = require('../../src/models');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  firstName: faker.name.findName(),
  lastName: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  isEmailVerified: false,
};

const userTwo = {
  firstName: faker.name.findName(),
  lastName: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  isEmailVerified: false,
};

const admin = {
  firstName: faker.name.findName(),
  lastName: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password,
  isEmailVerified: false,
};

const insertUsers = async (users) => {
  await db.users.bulkCreate(users.map((user) => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
};
