const { User } = require('../models')
const bcrypt = require('bcryptjs')

const adminController = {
  getAttendances: (req, res) => {
    return res.render('admin/attendances')
  },
  signUpPage: (req, res) => {
    res.render('admin/signup')
  },
  signUp: (req, res, next) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('密碼與確認密碼不相符!')
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email已被註冊!')
        return bcrypt.hash(req.body.password, 10)
      })
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
        req.flash('success_messages', '成功建立帳號！')
        res.redirect('back')
      })
      .catch(err => next(err))
  }
}

module.exports = adminController
