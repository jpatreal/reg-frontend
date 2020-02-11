var moment = require('moment')

export default {
  filters: {
    localTime: function (value) {
      return value ? moment(value).format('LT') : ''
    }
  }
}
