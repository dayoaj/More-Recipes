
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        unique: 'composite',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      recipeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        unique: 'composite',
        references: {
          model: 'Recipes',
          key: 'id'
        }
      }
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Users'),
};
