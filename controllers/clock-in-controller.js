const { ClockRecord, Attendance } = require('../models')
const { Op } = require('sequelize')
const dayjs = require('dayjs')
const axios = require('axios')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

async function isWorkingDay (date) {
  const apiUrl = 'https://data.ntpc.gov.tw/api/datasets/308DCD75-6434-45BC-A95F-584DA4FED251/json?page=1&size=1000'
  const holidaysData = await axios.get(apiUrl)
  const holidays = holidaysData.data.map(holiday => holiday.date)

  return !holidays.includes(dayjs(date).format('YYYY-MM-DD')) && dayjs(date).day() !== 0 && dayjs(date).day() !== 6
}

const clockInController = {
  getClockIns: async (req, res) => {
    const attendances = await Attendance.findAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']]
    })

    const formattedAttendances = attendances.map(attendance => {
      const date = dayjs(attendance.date).format('YYYY年M月D日')
      const clockInTime = dayjs(attendance.clockInTime).subtract(8, 'hour').format('HH:mm:ss')
      const clockOutTime = dayjs(attendance.clockOutTime).subtract(8, 'hour').format('HH:mm:ss')

      return {
        ...attendance.toJSON(),
        date,
        clockInTime,
        clockOutTime
      }
    })

    console.log(formattedAttendances)
    return res.render('clock-ins', { attendances: formattedAttendances })
  },
  addClockIn: async (req, res) => {
    const currentTime = dayjs().add(8, 'hour')

    if (!(await isWorkingDay(currentTime))) {
      req.flash('error_messages', '非工作日無法打卡')
      return res.redirect('back')
    }

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

      if (recordType === '下班打卡') {
        const clockInTime = existingRecords[0].time
        const clockOutTime = currentTime
        const workingHours = clockOutTime.diff(clockInTime, 'hour')

        let status
        if (workingHours >= 8) {
          status = '確認出勤'
        } else {
          status = '缺勤'
        }

        const attendance = await Attendance.findOne({
          where: {
            userId: req.user.id,
            date: today.toISOString()
          }
        })

        if (attendance) {
          await attendance.update({
            clockInTime: clockInTime.toISOString(),
            clockOutTime: clockOutTime.toISOString(),
            workingHours: workingHours,
            status: status
          })
        } else {
          await Attendance.create({
            date: today.toISOString(),
            clockInTime: clockInTime.toISOString(),
            clockOutTime: clockOutTime.toISOString(),
            workingHours: workingHours,
            status: status,
            userId: req.user.id
          })
        }
      }
      req.flash('success_messages', '打卡成功')
      res.redirect('back')
    } catch (error) {
      console.log('error')
    }
  }
}

module.exports = clockInController
