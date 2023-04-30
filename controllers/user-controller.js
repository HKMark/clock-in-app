const { User } = require('../models')
const bcrypt = require('bcryptjs')

const userController = {
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入！')
    res.redirect('/clock-ins')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功！')
    req.logout()
    res.redirect('/signin')
  },
  editUser: (req, res, next) => {
    return User.findByPk(req.params.id, { raw: true })
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        return res.render('users/edit', { user })
      })
      .catch(err => next(err))
  },
  putUser: (req, res, next) => {
    const { password, passwordCheck } = req.body
    if (!password.trim() || !passwordCheck.trim()) throw new Error('欄位不得為空白!')
    if (password !== passwordCheck) throw new Error('密碼與確認密碼不相符!')
    return bcrypt.genSalt(10)
      .then(salt => {
        return Promise.all([bcrypt.hash(password, salt), User.findByPk(req.user.id)])
      })
      .then(([hash, user]) => {
        return user.update({ password: hash })
      })
      .then(() => {
        req.flash('success_messages', '更換密碼成功！')
        res.redirect('back')
      })
      .catch(err => next(err))
  }
}

module.exports = userController
