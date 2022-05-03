'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messes', {
     
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          
          model: "Auths",
          key: "email",
        },
        unquie:true
        
      },
      messAdvance: {
        type: Sequelize.INTEGER
      },
      manDay: {
        type: Sequelize.INTEGER
      },
      dietPerDay: {
        type: Sequelize.INTEGER
      },
      specialLunch: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messes');
  }
};