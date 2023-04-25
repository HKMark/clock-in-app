const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const { authenticatedAdmin } = require('../../middleware/auth')
const { generalErrorHandler } = require('../../middleware/error-handler')

router.get('/signup', authenticatedAdmin, adminController.signUpPage)
router.post('/signup', authenticatedAdmin, adminController.signUp)

router.get('/clock-ins', authenticatedAdmin, adminController.getClockIns)
router.get('/', (req, res) => res.redirect('/admin/clock-ins'))

router.use('/', generalErrorHandler)

module.exports = router
