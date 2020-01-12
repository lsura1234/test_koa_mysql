const Sequelize = require('sequelize');
const Model = Sequelize.Model;


const sequelize = new Sequelize('testjoa', 'allee', '12345678', {
  host: 'localhost',
  dialect:'mysql'
});


  module.exports = sequelize