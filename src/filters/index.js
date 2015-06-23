let moment = require('moment');

export default angular.module('Filters', [])
	.filter('calendar', () => {
		return (value) => moment(moment.utc(value).toDate()).calendar();
	});