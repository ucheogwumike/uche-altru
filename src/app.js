const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const { db } = require('./models');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// const whitelist = ['http://localhost:3001/'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error());
//     }
//   },
// };

// enable cors
// app.use(
//   cors({
//     origin: '*',
//   })
// );
app.use(cors());
app.options('*', cors());
// app.options(corsOptions, cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints in production
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// intit DB
db.sequelize.sync().then(async () => {
  await db.roles.findOrCreate({
    where: { name: 'user' },
    defaults: {
      name: 'user',
      description: 'self permission',
    },
  });

  await db.roles.findOrCreate({
    where: { name: 'admin' },
    defaults: {
      name: 'admin',
      description: 'all permission',
    },
  });

  await db.categories.findOrCreate({
    where: { name: 'Health' },
    defaults: {
      name: 'Health',
      status: 'enabled',
    },
  });

  await db.categories.findOrCreate({
    where: { name: 'Education' },
    defaults: {
      name: 'Education',
      status: 'enabled',
    },
  });

  await db.categories.findOrCreate({
    where: { name: 'Business' },
    defaults: {
      name: 'Business',
      status: 'enabled',
    },
  });

  await db.categories.findOrCreate({
    where: { name: 'Physiological' },
    defaults: {
      name: 'Physiological',
      status: 'enabled',
    },
  });
});

module.exports = app;
