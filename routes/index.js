const express = require('express')
const router = express.Router()
const clockInController = require('../controllers/clock-in-controller')
const { generalErrorHandler } = require('../middleware/error-handler')
const admin = require('./modules/admin')

router.use('/admin', admin)
router.get('/clock-ins', clockInController.getClockIns)
router.use('/', (req, res) => res.redirect('/clock-ins'))
router.use('/', generalErrorHandler)

module.exports = router
