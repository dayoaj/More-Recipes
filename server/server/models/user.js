
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING
    }
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Review, { foreignKey: 'userId' });
    User.hasOne(models.Upvote, { foreignKey: 'userId' });
    User.hasMany(models.Favorite, { foreignKey: 'userId' });
    User.hasMany(models.Recipe, { foreignKey: 'userId' });
  };
  return User;
};
