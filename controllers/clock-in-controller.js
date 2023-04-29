const { ClockRecord } = require('../models')
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
  getClockIns: (req, res) => {
    return res.render('clock-ins')
  },
  addClockIn: async (req, res) => {
    const currentTime = dayjs().add(8, 'hour')
    const today = currentTime.startOf('day')

    try {
      if (await isWorkingDay(today)) {
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
      } else {
        req.flash('error_messages', '非工作日無法打卡')
        res.redirect('back')
      }
    } catch (error) {
      console.log('error')
    }
  }
}

module.exports = clockInController
