const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const { generalErrorHandler } = require('../../middleware/error-handler')

router.get('/signup', adminController.signUpPage)
router.post('/signup', adminController.signUp)

router.get('/clock-ins', adminController.getClockIns)
router.use('/', (req, res) => res.redirect('/admin/clock-ins'))
router.use('/', generalErrorHandler)

module.exports = router
