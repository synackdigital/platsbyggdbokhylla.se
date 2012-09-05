var dateFormat = require('dateformat');

module.exports = {
	link_to_site: function(path) {
		path = path ? path : "";
		return "http://platsbyggdbokhylla.talkative.se" + path;
	},
	date_format: function (dateStr,format) {
		var theDate = new Date(dateStr);
		var format = format ? format : "yyyy-mm-dd HH:MM";
		return dateFormat(theDate, format);
	}
};