
export default (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'composite',
      references: {
        model: 'User',
        key: 'id'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'composite',
      references: {
        model: 'Recipe',
        key: 'id'
      }
    }
  });

  Favorite.associate = (models) => {
    // associations can be defined here
    Favorite.belongsTo(models.User);
    Favorite.belongsTo(models.Recipe);
  };

  return Favorite;
};
