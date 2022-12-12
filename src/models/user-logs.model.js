module.exports = (sequelize, dataType) => {
  const activityLogs = sequelize.define('activity_logs', {
    action: {
      type: dataType.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Field Name Cannot be empty',
        },
      },
    },
    ip: {
      type: dataType.DECIMAL,
    },
    cookies: {
      type: dataType.STRING,
    },
  });

  return activityLogs;
};
