let moment = require('moment');

module.exports = (value) => moment(moment.utc(value).toDate()).calendar();