const { ClockRecord } = require('../models')
const { Op } = require('sequelize')
const dayjs = require('dayjs')

const userController = {
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/clock-ins')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },
  getClockIns: (req, res) => {
    return res.render('clock-ins')
  },
  addClockIn: async (req, res) => {
    const currentTime = dayjs()
    try {
      const today = currentTime.startOf('day')
      const tomorrow = today.add(1, 'day')

      const existingRecords = await ClockRecord.findAll({
        where: {
          userId: req.user.id,
          time: {
            [Op.between]: [today.toISOString(), tomorrow.toISOString()]
          }
        },
        order: [['time', 'ASC']]
      })

      let recordType

      if (existingRecords.length === 0) {
        recordType = '上班打卡'
      } else {
        recordType = '下班打卡'
      }

      await ClockRecord.create({
        userId: req.user.id,
        time: currentTime.toISOString(),
        recordType: recordType
      })

      req.flash('success_messages', '打卡成功')
      res.redirect('back')
    } catch (error) {
      console.log('error')
    }
  }
}

module.exports = userController
