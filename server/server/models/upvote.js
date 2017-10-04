
export default (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flag: {
      type: DataTypes.BOOLEAN
    }
  });

  Upvote.associate = (models) => {
    // associations can be defined here
  };

  return Upvote;
};
