import Sequelize from 'sequelize'
import connect from '../connect/connect'
export default connect.define('user', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    username: {
      type: Sequelize.STRING,
    },
    password:{
      type:Sequelize.STRING
    }
  }, {
    tableName: 'user',
    timestamp: true
  })