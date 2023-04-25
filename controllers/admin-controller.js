const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

const adminController = {
  getClockIns: (req, res) => {
    return res.render('admin/clock-ins')
  },
  signUpPage: (req, res) => {
    res.render('admin/signup')
  },
  signUp: (req, res) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        accountRole: req.body.accountRole,
        employeeId: req.body.employeeId,
        jobTitle: req.body.jobTitle,
        department: req.body.department,
        workAddress: req.body.workAddress
      }))
      .then(() => {
        res.redirect('admin/clock-ins')
      })
  }
}

module.exports = adminController
