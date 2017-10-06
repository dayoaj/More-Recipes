
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
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
        onDelete: 'CASCADE',
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      recipeId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        unique: 'compositeIndex',
        references: {
          model: 'Recipes',
          key: 'id'
        }
      }
    }),
  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Reviews'),
};
