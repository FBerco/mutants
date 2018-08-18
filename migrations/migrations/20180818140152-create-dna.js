module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('dna', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      dna: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      is_mutant: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dna');
  }
};