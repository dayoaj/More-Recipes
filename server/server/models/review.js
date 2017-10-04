

export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING
    }
  });

  Review.associate = (models) => {
    // associations can be defined here
  };

  return Review;
};
