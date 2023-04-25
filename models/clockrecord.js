'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ClockRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      ClockRecord.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  ClockRecord.init({
    userId: DataTypes.INTEGER,
    time: DataTypes.DATE,
    recordType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ClockRecord',
    tableName: 'Clock_records',
    underscored: true
  })
  return ClockRecord
}
