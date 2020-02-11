var moment = require('moment')

export default {
  filters: {
    dateToWords: function (value) {
      return value ? moment(value).format('MMM DD YYYY') : ''
    },
    localTime: function (value) {
      return value ? moment(value).format('LT') : ''
    },
    dateOnly: function (value) {
      return value ? moment(value).format('MMM') : ''
    },
    dayOnly: function (value) {
      return value ? moment(value).format('DD') : ''
    }
  }
}
