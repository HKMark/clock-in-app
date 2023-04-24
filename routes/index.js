const express = require('express')
const router = express.Router()
const clockInController = require('../controllers/clock-in-controller')

router.get('/clock-ins', clockInController.getClockIns)

router.use('/', (req, res) => res.redirect('/clock-ins'))

module.exports = router
