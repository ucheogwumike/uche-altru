/* eslint-disable prettier/prettier */
module.exports = (sequelize, DataTypes) => {
  const campaignImage = sequelize.define('campaignImages', {
    url: {
      type: DataTypes.STRING,
    },
  });
  return campaignImage;
};
