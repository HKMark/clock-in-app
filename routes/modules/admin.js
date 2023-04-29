const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')
const { authenticatedAdmin } = require('../../middleware/auth')
const { generalErrorHandler } = require('../../middleware/error-handler')

router.get('/signup', adminController.signUpPage)
router.post('/signup', adminController.signUp)

router.get('/attendances', authenticatedAdmin, adminController.getAttendances)
router.get('/', (req, res) => res.redirect('/admin/attendances'))

router.use('/', generalErrorHandler)

module.exports = router
