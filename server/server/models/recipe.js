
export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.hasMany(models.Review, { foreignKey: 'recipeId' });
    Recipe.hasMany(models.Upvote, { foreignKey: 'recipeId' });
    Recipe.hasMany(models.Favorite, { foreignKey: 'recipeId' });
    Recipe.hasMany(models.Favorite, { foreignKey: 'recipeId' });
    Recipe.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Recipe;
};
