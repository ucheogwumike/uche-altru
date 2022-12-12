const Sequelize = require('sequelize');
const { sequelize } = require('../config/config');
const logger = require('../config/logger');

const sequelizeInstance = new Sequelize(sequelize.url);
const db = {};

sequelizeInstance
  .authenticate()
  .then(() => logger.info('DB connected'))
  .catch((err) => {
    logger.error(err);
  });

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

db.users = require('./user.model')(sequelizeInstance, Sequelize);
db.tokens = require('./token.model')(sequelizeInstance, Sequelize);

db.comments = require('./comment.model')(sequelizeInstance, Sequelize);
db.complaints = require('./complaint.model')(sequelizeInstance, Sequelize);
db.roles = require('./role.model')(sequelizeInstance, Sequelize);
db.permissions = require('./permission.model')(sequelizeInstance, Sequelize);
db.rolePermissions = require('./rolepermission.model')(sequelizeInstance, Sequelize);

db.campaigns = require('./campaign.model')(sequelizeInstance, Sequelize);
db.donations = require('./donation.models')(sequelizeInstance, Sequelize);
db.extensions = require('./extension.models')(sequelizeInstance, Sequelize);
db.feedbacks = require('./feedback.model')(sequelizeInstance, Sequelize);
db.categories = require('./category.model')(sequelizeInstance, Sequelize);

db.withdrawal_history = require('./withdrawal-history.model')(sequelizeInstance, Sequelize);
db.activity_logs = require('./user-logs.model')(sequelizeInstance, Sequelize);

db.campaignImages = require('./campaignImages.model')(sequelizeInstance, Sequelize);

// relationships for models

//= ==============================
// Define all relationships here below
//= ==============================
// db.User.hasMany(db.Role);
// db.Role.belongsTo(db.User);

db.roles.hasMany(db.users);
db.users.belongsTo(db.roles);

// db.roles.belongsToMany(db.permissions, { through: db.rolePermissions });
// db.permissions.belongsToMany(db.roles, { through: db.rolePermissions });
// db.roles.hasMany(db.rolePermissions);
// db.permissions.hasMany(db.rolePermissions);

db.campaigns.hasMany(db.comments);
db.comments.belongsTo(db.campaigns);

db.users.hasMany(db.campaigns);
db.campaigns.belongsTo(db.users);

db.users.hasMany(db.comments);
db.comments.belongsTo(db.users);

db.campaigns.hasMany(db.donations);
db.donations.belongsTo(db.campaigns);

db.campaigns.hasMany(db.extensions);
db.extensions.belongsTo(db.campaigns);

db.users.hasMany(db.extensions);
db.extensions.belongsTo(db.users);

db.campaigns.hasMany(db.campaignImages);
db.campaignImages.belongsTo(db.campaigns);

db.users.hasMany(db.activity_logs);
db.activity_logs.belongsTo(db.users);

db.users.hasMany(db.withdrawal_history);
db.withdrawal_history.belongsTo(db.users);

db.campaigns.hasMany(db.withdrawal_history);
db.withdrawal_history.belongsTo(db.campaigns);

db.categories.hasMany(db.campaigns);
db.campaigns.belongsTo(db.categories);

db.campaigns.hasMany(db.feedbacks);
db.feedbacks.belongsTo(db.campaigns);

module.exports = {
  db,
};
