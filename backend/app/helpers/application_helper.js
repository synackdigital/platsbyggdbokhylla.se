var dateFormat = require('dateformat');

module.exports = {
	bool_string: function(bool,iftrue,iffalse) {
		return bool ? iftrue : iffalse;
	},
	link_to_site: function(path) {
		path = path ? path : "";
		return "http://www.platsbyggdbokhylla.se/" + path;
	},
	date_format: function (dateStr,format) {
		var theDate = new Date(dateStr);
		theDate.setHours(theDate.getHours()+2);
		var format = format ? format : "yyyy-mm-dd HH:MM";
		return dateFormat(theDate, format);
	},
	status_selector:function(status,name){
		var selector = '<select name="'+name+'">';
		var statusValues = this.getStatusValues();
		for(var i = 0; i < statusValues.length; i++){
			selector+='<option value='+statusValues[i].id+'>'+statusValues[i].name+'</option>';
		}
		selector+='</select>';
		return selector;
	},
	getStatusValues:function(){
		return [
		{id:"new",name:"New"},
		{id:"contacted",name:"Contacted"},
		{id:"ordered",name:"Ordered"}
		];
	},
	status_selector_value:function(status){
		var statusValues = this.getStatusValues();
		for(var i = 0; i< statusValues.length; i++){
			if(status == statusValues[i].id){
				return statusValues[i].name;
			}
		}
		return "Unknown";
	}
};