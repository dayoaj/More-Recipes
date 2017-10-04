

export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING
    }
  });

  Review.associate = (models) => {
    // associations can be defined here
    Review.belongsTo(models.User);
    Review.belongsTo(models.Recipe);
  };

  return Review;
};
