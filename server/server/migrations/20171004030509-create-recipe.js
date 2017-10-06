
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      ingredient: {
        type: Sequelize.STRING,
        allowNull: false
      },
      instructions: {
        type: Sequelize.STRING,
        allowNull: false
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
      }
    }),

  down: (queryInterface /* , Sequelize */) =>
    queryInterface.dropTable('Recipes'),
};
