const Handlebars = require('handlebars')
const dayjs = require('dayjs')

Handlebars.registerHelper('isEqual', function (value1, value2, options) {
  if (value1 === value2) {
    return options.fn(this)
  }
  return options.inverse(this)
})

module.exports = {
  currentYear: () => dayjs().year()
}
