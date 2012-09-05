var dateFormat = require('dateformat');

module.exports = {
	date_format: function (dateStr,format) {
		var theDate = new Date(dateStr);
		var format = format ? format : "yyyy-mm-dd HH:MM";
		return dateFormat(theDate, format);
	}
};