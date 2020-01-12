'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return  queryInterface.createTable('user',{
      id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
      username:Sequelize.STRING,
      password:Sequelize.STRING,
      createdAt:Sequelize.DATE ,
      updatedAt:Sequelize.DATE
    })
  },
  down: (queryInterface, Sequelize) => {
  return  queryInterface.dropTable('user')
  }
};
