
export default (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'compositeIndex',
      references: {
        model: 'User',
        key: 'id'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'compositeIndex',
      references: {
        model: 'Recipe',
        key: 'id'
      }
    }
  });

  Upvote.associate = (models) => {
    // associations can be defined here
    Upvote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Upvote.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Upvote;
};
