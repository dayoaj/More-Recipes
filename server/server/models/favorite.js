
export default (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  Favorite.associate = (models) => {
    // associations can be defined here
  };

  return Favorite;
};
