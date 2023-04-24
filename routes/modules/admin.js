const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/clock-ins', adminController.getClockIns)
router.use('/', (req, res) => res.redirect('/admin/clock-ins'))

module.exports = router
