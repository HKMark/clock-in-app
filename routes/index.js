const express = require('express')
const router = express.Router()
const passport = require('../config/passport')
const admin = require('./modules/admin')
const userController = require('../controllers/user-controller')
const clockInController = require('../controllers/clock-in-controller')
const { authenticated } = require('../middleware/auth')
const { generalErrorHandler } = require('../middleware/error-handler')

router.use('/admin', admin)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/clock-ins', authenticated, clockInController.getClockIns)
router.post('/users/:id/clock-in', authenticated, clockInController.addClockIn)

router.get('/', (req, res) => res.redirect('/clock-ins'))

router.use('/', generalErrorHandler)

module.exports = router
