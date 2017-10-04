
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
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER
    }
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Review);
    User.hasMany(models.Upvote, { foreignKey: 'userId' });
    User.hasMany(models.Favorite, { foreignKey: 'userId' });
    User.hasMany(models.Recipe);
  };
  return User;
};
