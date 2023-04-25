const Handlebars = require('handlebars')
const dayjs = require('dayjs')

Handlebars.registerHelper('isEqual', function (value1, value2, options) {
  if (value1 === value2) {
    return options.fn(this)
  }
  return options.inverse(this)
})

module.exports = {
  currentYear: () => dayjs().year(),
  ifCond: function (a, b, options) {
    return a === b ? options.fn(this) : options.inverse(this)
  }
}
