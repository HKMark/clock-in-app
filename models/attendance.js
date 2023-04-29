'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Attendance.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Attendance.init({
    date: DataTypes.DATE,
    clockInTime: DataTypes.DATE,
    clockOutTime: DataTypes.DATE,
    workingHours: DataTypes.INTEGER,
    status: DataTypes.STRING,
    remark: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'Attendances',
    underscored: true
  })
  return Attendance
}
