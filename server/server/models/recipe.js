
export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ingredient: {
      type: DataTypes.STRING
    },
    instruction: {
      type: DataTypes.STRING
    }
  });

  Recipe.associate = (models) => {
    // associations can be defined here
  };

  return Recipe;
};
