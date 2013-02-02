var dateFormat = require('dateformat');

module.exports = {
	bool_string: function(bool,iftrue,iffalse) {
		return bool ? iftrue : iffalse;
	},
	link_to_site: function(path) {
		path = path ? path : "";
		return "http://www.platsbyggdbokhylla.se/" + path;
	},
	link_to_site_admin: function(path) {
		return "http://www.platsbyggdbokhylla.se/" + path + "?admin=true";
	},
	date_format: function (dateStr,format) {
		var theDate = new Date(dateStr);
		theDate.setHours(theDate.getHours()+2);
		var format = format ? format : "yyyy-mm-dd HH:MM";
		return dateFormat(theDate, format);
	},
	int_to_satisfied:function(int){
		if(int==0) return "Inte alls nöjd";
		if(int==1) return "Mindre nöjd";
		if(int==3) return "Nöjd";
		if(int==4) return "Mycket nöjd";
		return "Varken eller";
	},
	status_selector:function(status,name,id){
		var selector = '<select name="'+name+'" id="'+id+'">';
		var statusValues = this.getStatusValues();
		for(var i = 0; i < statusValues.length; i++){
			var selected = ""
			if(status==statusValues[i].id){
				selected = "selected";
			}
			selector+='<option '+selected+' value='+statusValues[i].id+'>'+statusValues[i].name+'</option>';
		}
		selector+='</select>';
		return selector;
	},
	getStatusValues:function(){
		return [
		{id:"new",name:"Nyinkommen"},
		{id:"answered",name:"Svarat"},
		{id:"offer_sent",name:"Offert skickad"},
		{id:"offer_confirmed",name:"Beställning bekräftad"},
		{id:"paid",name:"Betald"},
		{id:"underconstruction",name:"Under tillverkning"},
		{id:"painted",name:"Sprutlackerad"},
		{id:"postal_assembly",name:"Frakt och montering bokad"},
		{id:"sent",name:"Skickad till kund"},
		{id:"customer_happy",name:"Kund nöjd"}
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