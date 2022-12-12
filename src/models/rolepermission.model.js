module.exports = (sequelize, dataType) => {
  const rolePermission = sequelize.define('rolePermission', {
    id: {
      type: dataType.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    roleId: {
      type: dataType.INTEGER,
      allowNull: false,
      trim: true,
    },
    permissionId: {
      type: dataType.INTEGER,
      allowNull: false,
      trim: true,
    },
  });

  return rolePermission;
};
