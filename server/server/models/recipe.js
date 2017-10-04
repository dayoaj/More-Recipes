
export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instruction: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.hasMany(models.Review);
    Recipe.hasMany(models.Upvote, { foreignKey: 'recipeId' });
    Recipe.hasMany(models.Favorite, { foreignKey: 'recipeId' });
    Recipe.hasMany(models.Favorite);
    Recipe.belongsTo(models.User);
  };

  return Recipe;
};
