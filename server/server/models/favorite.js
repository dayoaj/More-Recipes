
export default (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Favorite.associate = (models) => {
    // associations can be defined here
    Favorite.belongsTo(models.User);
    Favorite.belongsTo(models.Recipe);
  };

  return Favorite;
};
