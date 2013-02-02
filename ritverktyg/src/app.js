Event.observe(window,"load",function(){
	k.setup();
});

var k = {
	updateInterval:null,
	paper:null,
	doors_closed:[],
	doors_open:[],
	settings:{
		margin:100
	},
	templates:TEMPLATES,
	baseOrder:{
		modell:null,
		template:null,
	},
	order:[],
	orderDetails:{
		price:0,
	},
	fillCount:{


	},
	validate:{
		item:function(theForm,item){
			if(item.name=="id") return true;
			if(item.name=="type") return true;
			if(item.name=="modell") return true;
			var min = k.validate[item.name].min(item.order);
			var max = k.validate[item.name].max(item.order);
			var valid = false;
			var color = "#F00";
			if ((item.val>=k.validate[item.name].min(item.order)) && (item.val<=k.validate[item.name].max(item.order))){
				color = "#FFF";
				valid = true;
			} else {
				trace("doesn't validate")
			}



			var itemElement = theForm.down('.item[item='+item.name+']');
			itemElement.down(".minmax").update('<span class="minval">'+min+'</span><span class="maxval">'+max+'</span>');

			if(valid) {
				itemElement.removeClassName("error");
			} else {
				var toHigh = true;
				if(item.val>max){
					var newval = max;
				} else if(item.val < min){
					toHigh = false;
					var newval = min;
				}
				itemElement.addClassName("error");
				var msg = (toHigh) ? "Du har valt ett för högt värde" : "Du har valt ett för lågt värde";
				itemElement.writeAttribute("title",msg);
				setTimeout(function(){
					//this.value=newval;
					//this.fire("mechanical:change");
				}.bind(itemElement.down("input")),1000);
				return false;
			}

			return true;
		},
		sockel:{
			min:function(order) {return 0;},
			max:function(order) {return 300;}
		},
		bakstycke:{
			min:function(order) {return 0;},
			max:function(order) {return 1;}
		},
		singledoor:{
			min:function(order) {return 0;},
			max:function(order) {return 1;}
		},
		w:{
			min:function(order) {return k.parts.side.w*2;},
			max:function(order) {
				if(order.type=="over"){
					return 2000;
				}
				return 10000;
			}
		},
		h:{
			min:function(order) {
				if(order.type=="over"){
					return 100;
				}
				return 1000;
			},
			max:function(order) {
				if(order.type=="over"){
					return 1000;
				}
				return 3050;
			}
		},
		col:{
			min:function(order) {
				var min = Math.ceil((order.w-k.parts.side.w) / (k.parts.kol.maxw+k.parts.kol.w));
				if(order.type=="over" && order.w <=1450){
					return 1;
				}
				return min;
			},
			max:function(order) {
				var max = Math.ceil((order.w-k.parts.side.w) / (k.parts.kol.minw+k.parts.kol.w));

				(2300-(22))/(350+22)
				return max;
			}
		},
		row:{
			min:function(order) {
				var min = k.parts.plane.minamount;
				return min;
			},
			max:function(order) {
				var max = Math.ceil((order.h-k.parts.plane.h) / (k.parts.plane.h));
				return max;
			}
		}
	},
	parts:PARTS,
	style:STYLE,
	updateOrder:function(){
			
		$$("#sektionform form").each(function(aForm){
			if(aForm.identify()!="orderForm" && aForm.identify()!="fillwithform" && aForm.identify()!="general"){
				var order = aForm.serialize(true);
				var oneFail = false;
				Object.keys(order).each(function(item){
					if(item!="type"){
						if(item=="modell"){
							k.order[order.id][item]=order[item];
						} else {
							var val = parseInt(order[item]);
							if(k.validate.item(aForm,{val:val,name:item,order:order})){
								k.order[order.id][item] = val;
							} else {
								oneFail = true;
							}
						}
					}
				});
				var sektionLink = $$("#sektionlist li[target="+aForm.identify()+"]").first();
				if(oneFail){
					trace("one item failed");
					sektionLink.addClassName("error");
				} else {
					k.redraw();
					sektionLink.removeClassName("error");
				}
			}
		});


	},
	nextGuideStep:function(){
		var next = $$(".guidestep.unused").first();
		$$(".guidestep.active").each(function(item){
			item.addClassName("hide");
		});
		if(next){
			next.show();
			setTimeout(function(){
				next.removeClassName("unused");
				next.removeClassName("hide");
				next.addClassName("active");
			},100);
		}
		setTimeout(function(){
			$$(".guidestep.hide").each(function(item){
				item.hide();
			});
		},500);
	},
	setup:function(){
		var windowAddEvent = window.attachEvent || window.addEventListener;

		Event.observe(window,"resize", function(){
			k.resizePaper();
		});

		$$(".guidestep").each(function(guidestep){
			guidestep.hide();
		});

		$$("#rita_modell .choice").each(function(choice){
			choice.observe("click",function(){
				k.baseOrder.modell = this.readAttribute("template");
				$("")
				k.nextGuideStep();
			})
		});
		$$("#rita_start .choice").each(function(choice){
			choice.observe("click",function(){
				k.baseOrder.template = this.readAttribute("template");
				var guideF = $$(".guideform."+k.baseOrder.template).first();
				if(guideF){
					if(k.baseOrder.modell=="davidhall"){
						guideF.down(".ribersborg").hide();
					}
					guideF.addClassName("show");

				}
				k.nextGuideStep();
			})
		});
		$("startRita").observe("click",function(e){
			e.stop();
			k.nextGuideStep();
			var guideF = $$(".guideform."+k.baseOrder.template).first();
			var theForm = guideF.down("form");
			var data = theForm.serialize(true)
			//mechanical:change
			k.startUp({
				modell:k.baseOrder.modell,
				template:k.baseOrder.template,
				partial:data
			});
		});

		$("fillwithform").getInputs("checkbox").each(function(box){
			box.observe("change",function(e){
				k.redraw();
			});
		});

		$("save").observe("click",function(e){
			$$(".saveMessage").invoke("hide");
			e.stop();
			if($("rita_offert").visible()) return;
			k.saveOrder(function(){

				$("rita_saved").show();
			});
		});

		$("intresseAnmalan").observe("click",function(e){
			$$(".saveMessage").invoke("hide");
			e.stop();
			$("rita_offert").show();
		});

		$$(".closeMessage").each(function(closeButton){
			closeButton.observe("click",function(e){
				e.stop();
				$$(".saveMessage").invoke("hide");
			});
		});

		$$(".shareOnFbButton").each(function(shareButton){
			shareButton.observe("click",function(e){
				e.stop();
				k.shareDrawing();
			});
		});


		$("sendIntresseAnmalan").observe("click",function(e){
			e.stop();
			var validateEmail = function (email) {
			    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			    return re.test(email);
			}
			var emailField = $("Order_email");
			if(!validateEmail(emailField.value)){
				emailField.up().addClassName("error");
				return;
			} else {
				emailField.up().removeClassName("error");
			}
			$$(".saveMessage").invoke("hide");
			k.saveOrder(function(drawingID){
				if(drawingID){
					$("Order_drawing").setValue(drawingID);
					$("order_form").request({
						onSuccess: function(transport){
							var resp = transport.responseText.evalJSON();
							$("rita_offert_saved").show();
						}
					});
				}
			});


		});

		$("sektionlink_general").observe("click",k.handleSectionActivated);
		$("sektionlink_general").observe("machine:click",k.handleSectionActivated);

		var handleChange = function(e){


			var name = this.readAttribute("name")
			var firstTime = this.readAttribute("firstTime");
			var target = this.readAttribute("target");

			var val = this.value;
			if(target == "bakstycke" || target == "singledoor"){
				val = (this.checked) ? 1 : 0;
			}
			//use the first order for validation
			var order = {type:"std"};
			if(k.validate.item($("general"),{val:val,name:target,order:order})){
				$$("form .item.slave[item="+target+"]").each(function(slaveItem){
					slaveItem.down("input").value = val;

				});
				if(firstTime=="firstTime"){
					this.writeAttribute("firstTime","");
				} else {
					k.updateInterval = clearInterval(k.updateInterval);
				k.updateInterval = setInterval(function(){
					k.updateInterval = clearInterval(k.updateInterval);
					k.updateOrder();
				},300);
				}
			}


		};
		$$("#general input,#general select").each(function(generalInput){
			generalInput.observe("change",handleChange);
			generalInput.observe("mechanical:change",handleChange);
		});





		if(document.location.hash){
			var id = document.location.hash.substring(1);
			id = id.split("?")[0];
			k.id = id;
			new Ajax.Request("/data/drawings/"+id,{
				method:"get",
				onSuccess:function(transport){
					try{
						$$(".guidestep").invoke("hide");
						var drawing = transport.responseJSON;
						k.baseOrder.modell = drawing.data.modell;
						k.startUp({
							modell:drawing.data.modell,
							order:drawing.data.order
						});
					} catch(e){
						k.nextGuideStep();
					}
				},
				onException:function(e,d){
					trace(e);
					trace(d);
					k.nextGuideStep();
				},
				onError:function(){
					trace("ERROR");
					k.nextGuideStep();
				}
			});
			if(document.location.href.indexOf("admin=true")>-1){
				 new Ajax.JSONRequest('http://platsbyggdbokhylla.talkative.se/login/status', {
				 	callbackParamName:"callback",
				 	parameters:{},
				    onCreate: function(instance) {
				      trace("create", this);
				    },
				    onComplete: function(instance) {
				    	trace("complete", this);
				      	trace(instance);
              			trace(instance.responseJSON);
						if(instance.responseJSON.online) {
			                k.a = true; $("stage").addClassName("ad");
		                	$("intresseAnmalan").hide();
              			}
				    },
				    onFailure: function(instance) {
				      trace("fail", this);
				    }			  
				});
				
			}
			return;
		}


		k.nextGuideStep();
		return;

	},
	setGeneral:function(data){
		$$("#general input[name=general_height]").first().value=data.h;
		$$("#general input[name=general_sockel]").first().value=data.sockel;
		//set model
		var options = $$('#general select[name=general_modell] option');
		var len = options.length;
		for (var i = 0; i < len; i++) {
		    if(data.modell==options[i].value){
		    	options[i].selected=true;
		    } else {
		    	options[i].selected=false;
		    }
		}

		$$("#general input, #general select").each(function(generalInput){
			generalInput.fire("mechanical:change");
		});
		if(data.modell=="davidhall"){
			$$("#general .singledoor").invoke("show");
		} else {
			$$("#general .sockel").invoke("show");
		}
	},
	fbloaded:false,
	shareDrawing:function(){
		if(this.fbloaded){
			var obj = {
	          method: 'feed',
	          link: document.location.href,
	          picture: 'http://www.platsbyggdbokhylla.se/images/brochure.png',
	          name: 'Platsbyggd bokhylla',
	          caption: 'Precis som du vill ha den',
	          description: 'Det här är min platsbyggda bokhylla. Rita din egen på www.platsbyggdbokhylla.se'
	        };
	        FB.ui(obj, function(){

	        });
		} else {
			window.fbAsyncInit = function() {
			    FB.init({
			      appId      : '429742777087819', // App ID
			      status     : true, // check login status
			      cookie     : true, // enable cookies to allow the server to access the session
			      xfbml      : true  // parse XFBML
			    });
			    k.fbloaded = true;
		    	k.shareDrawing();
			};
		  	(function(d){
			  	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
			    if (d.getElementById(id)) {return;}
			    js = d.createElement('script'); js.id = id; js.async = true;
			    js.src = "//connect.facebook.net/en_US/all.js";
			    ref.parentNode.insertBefore(js, ref);
		    }(document));
		}
	},
	saveOrder:function(callback){
		var data = {
			modell:k.baseOrder.modell,
			order:[]
		};
		for(var i = 0; i < this.order.length; i++){
			var dirtyObj = this.order[i];
			var cleanObj = {};
			Object.keys(dirtyObj).each(function(key){
				if(key != "hylla" && key != "id"){
					cleanObj[key] = dirtyObj[key];
				}
			});
			data.order.push(cleanObj);
		}
		var url = "/data/drawings";
	    if(k.a){
	      url = "/data/drawings/";
	    }
		url = k.a ? url + k.id : url;
    	var theMethod = k.a ? "PUT" : "POST";
		new Ajax.Request(url,{
			method: theMethod,
			parameters:{
				"Drawing[data]":Object.toJSON(data)
			},
			onSuccess:function(transport){
				try{
					var drawing = transport.responseJSON;
					if(drawing.id){
						document.location.hash = drawing.id;
						callback(drawing.id);
						$$(".drawingID").each(function(item){
							if(item.readAttribute("type")=="text"){
								item.value = "http://www.platsbyggdbokhylla.se/ritverktyg/#" + drawing.id;
							} else {
								item.update(drawing.id);
							}
						});
					}
				} catch(e){
					trace("something went wrong saving");
					callback();
				}

			},
			onException:function(e,d){
				trace(e);
				trace(d);
				callback();
			},
			onError:function(){
				trace("ERROR saving");
				callback();
			}
		});
	},
	startUp:function(options){
		k.order = options.order ? options.order : this.templates[options.template];
		var orderCount = k.order.length;
		var sectionCount = 1;
		var overCount = 1;

		if(options.partial){
			var ovCoutn = 0;
			var stdCount = 0;
			for(var i = 0; i < k.order.length; i++){
				if(k.order[i].type=="over"){
					ovCoutn++;
				} else {
					stdCount++;
				}
			}
			var overW = 1000;
			var width = Math.ceil((options.partial.w-(ovCoutn*overW))/stdCount);
			var height = options.partial.h;
			var sockel = options.partial.sockel;
			for(var i = 0; i < k.order.length; i++){
				var orderItem = k.order[i];
				if(orderItem.type=="over"){
					orderItem.w=overW;
				} else {
					orderItem.w=width;
					orderItem.h=height;
					if(options.modell=="ribersborg"){
						orderItem.sockel=sockel;
					}
				}
				orderItem.col = k.validate["col"].min(orderItem);
			}
		}


		if(options.modell=="davidhall"){
			k.parts.side = k.parts.side_davidhall;
			k.parts.kol = k.parts.kol_davidhall;
		}

		//k.addForm(0,{h:height, w:width, sockel:60, type:"general"},options.modell);
		var h = 0;
		var sockel = 0;
		k.order.each(function(order,index){
			if(order.type=="over"){
				count = overCount++;
			} else {
				h = order.h;
				sockel = order.sockel;
				count = sectionCount++;
			}
			k.addForm(index,order,count,options.modell);
		});
		k.setGeneral({h:h,sockel:sockel,modell:options.modell});
		$$("#sektionform form.activated").each(function(aForm){
			aForm.hide();
		});
		$("sektionlist").down("li").fire("machine:click");

		setTimeout(function(){
			k.updateOrder();
			this.resizePaper();
			$("stage").addClassName("show");
			$("controls").addClassName("show");

		}.bind(this),100);
	},
	handleSectionActivated:function(){
		this.siblings().each(function(sib){
			sib.removeClassName("active");
		});
		this.addClassName("active");
		$$("#sektionform form.activated").each(function(aForm){
			aForm.hide();
		});
		$(this.readAttribute("target")).show();
	},
	addForm:function(id,data,counter,modell){
		var newForm = $("orderForm").clone(true);
		newForm.writeAttribute("id","form_"+id);
		newForm.writeAttribute("type",data.type);
		newForm.addClassName("activated");
		newForm.addClassName("orderPart");

		if(data.type=="general"){
			newForm.writeAttribute("id","general");
		}


		newForm.down('input[name=modell]').value = modell;
		newForm.down('input[name=id]').value=id;
		newForm.down('input[name=type]').value=data.type;

		var name = "Sektion "+(counter);
		if(data.type=="over"){
			name = "Överbyggnad "+(counter);
		}
		newForm.down('strong').update(name);

		var sektionLink = new Element("li",{"target":"form_"+id}).update(name);
		sektionLink.observe("click",k.handleSectionActivated);
		sektionLink.observe("machine:click",k.handleSectionActivated);
		$("sektionlist").insert(sektionLink);

		if(data.type=="over"){
			newForm.select(".item.slave.sockel, .item.slave.bakstycke, .item.slave.singledoor").each(function(slave){
				slave.hide();
			});
			newForm.select(".item.slave").each(function(slave){
				if(slave.hasClassName("bakstycke") || slave.hasClassName("singledoor")){

				} else {
					slave.removeClassName("slave");
				}
			});
		}
		if(data.type=="std"){
			newForm.select(".item.slave").each(function(slave){
				slave.hide();
			});
		}


		var sliders = newForm.getInputs();
		sliders.each(function(item){
			if(item.name!="id" && item.name != "modell"){
				item.value = data[item.name];
			}
			var eventName = "change";
			if(Prototype.Browser.IE){
				item.observe("keyup",function(e){
					if(e.keyCode==Event.KEY_RETURN){
						trace("has changed");
						if(this.up().hasClassName("slave")){
							var val = this.value;
							$$("form .item.slave[item="+this.readAttribute("name")+"]").each(function(slaveItem){
								slaveItem.down("input").value = val;
							});
						}
						k.updateInterval = clearInterval(k.updateInterval);
						k.updateInterval = setInterval(function(){
							k.updateInterval = clearInterval(k.updateInterval);
							k.updateOrder();				
						}.bind(this),300);	
					}
				});
			} else {
				item.observe("change",function(){
					trace("has changed");
					if(this.up().hasClassName("slave")){
						var val = this.value;
						$$("form .item.slave[item="+this.readAttribute("name")+"]").each(function(slaveItem){
							slaveItem.down("input").value = val;
						});
					}
					k.updateInterval = clearInterval(k.updateInterval);

					k.updateInterval = setInterval(function(){
						k.updateInterval = clearInterval(k.updateInterval);
						k.updateOrder();				
					}.bind(this),300);
				});	
			}					
			item.observe("mechanical:change",function(e){
				k.updateOrder(this.up('form'));
			});
		});
		newForm.show();
		newForm.observe("submit",function(e){
			e.stop();
			k.updateOrder();
		});
		$("sektionform").insert(newForm);
	},
	removeForm:function(form){
		var order = form.serialize(true);
		form.remove();
		var newOrderArr = [];
		for(var i = 0; i < this.order.length; i++){
			if(order.id!=i){
				newOrderArr.push(this.order[i]);
			}
		}
		this.order = newOrderArr;
		this.redraw();
	},
	calculatePrice:function(){
		var total = {
			gavel:0,
			bakstycke:0,
			hyllplan:0,
			oversmall:0,
			overbig:0,
			skap:0
		};
		var modell = "ribersborg";

		for(var i = 0; i < this.order.length; i++){
			modell = this.order[i].modell;
			var hyllprice = this.order[i].hylla.price;
			total.bakstycke+=hyllprice.bakstycke;
			total.hyllplan+=hyllprice.hyllplan;
			total.gavel+=hyllprice.gavel;
			total.oversmall+=hyllprice.oversmall;
			total.overbig+=hyllprice.overbig;
			total.skap+=hyllprice.skap;
		}
		var totalprice = 0;

		if(modell=="davidhall"){
			totalprice = total.gavel*PRICELIST.gavel_davidhall;
			totalprice += total.bakstycke*PRICELIST.bakstycke;
			totalprice += total.hyllplan*PRICELIST.hyllplan;
			totalprice += total.oversmall*PRICELIST.oversmall_davidhall;
			totalprice += total.overbig*PRICELIST.overbig_davidhall;
			totalprice += total.skap*PRICELIST.skap;
		} else {
			totalprice = total.gavel*PRICELIST.gavel;
			totalprice += total.bakstycke*PRICELIST.bakstycke;
			totalprice += total.hyllplan*PRICELIST.hyllplan;
			totalprice += total.oversmall*PRICELIST.oversmall;
			totalprice += total.overbig*PRICELIST.overbig;
		}

		this.orderDetails.priceTotal = totalprice;

		$("pricevalue").update(totalprice+":-");
		var measureCost = Math.round((1000+(totalprice*0.15))/500)*500;
		$("measurecost").update("Mät & Monteringskostnad "+measureCost+":-");




	},
	redraw:function(){

		k.fillCache = {};
		var stuff = ["dvd","blueray","cd","pocket","bok"];
		trace("reset fill cache");
		for(var i = 0; i < stuff.length; i++){
			var thing = k.parts[stuff[i]];
			k.fillCache[thing.id] = [];
			for(var u = 0; u < thing.open.length; u++){
				k.fillCache[thing.id].push({
					thing:thing,
					open:thing.open[u]
				});
			}
		}

		if($("ritar").hasClassName("show")) return;
		$("ritar").show();
		$("ritar").addClassName("show");

		Object.keys(this.fillCount).each(function(key){
			k.fillCount[key]=0;
		});

		setTimeout(function(){
			$("stageinner").hide();
			var s = this.settings;
			var o = this.order;
			var w = 0;
			var h = 0;
			for(var i = 0; i < this.order.length; i++){
				w+=this.order[i].w;
				if(this.order[i].h>h){
					h=this.order[i].h;
				}
			}
			w += (s.margin*2);
			h += (s.margin*2);


			this.paper = new ScaleRaphael("stageinner", w,h);
			var lastX = s.margin;

			for(var i = 0; i < this.order.length; i++){
				var o = this.order[i];
				var type = o.type;
				var modell = o.modell;
				var position = 3;
				//position = 3;
				if(o.type=="over"){
					if(i==this.order.length-1){
						//over is last
						position = 2;
 					} else if(i==0){
 						//over is middle
 						position = 4;
 					} else {
 						position = 1;
 					}
				}
				this.order[i].hylla = new hylla(this.paper,lastX,(o.h+s.margin),o.w,o.h,o.col,o.row,o.sockel,o.bakstycke,o.singledoor,{
					position:position, type:type, modell:modell
				});
				lastX = lastX + (o.w);
			}

			this.calculatePrice();

			Object.keys(this.fillCount).each(function(key){
				var label = $$("#fillwith label[for="+key+"] .max").first();
				if(label){
					label.update(' ('+k.fillCount[key]+')');
				}
			});

			setTimeout(function(){
				k.resizePaper();
			},100);
			setTimeout(function(){
				k.resizePaper();
			},200);
			setTimeout(function(){
				$("stageinner").show();
				$("ritar").removeClassName("show");
				setTimeout(function(){
					$("ritar").hide();
				},500);
			},300);
		}.bind(this),300);


	},
	resizePaper:function(){
		if(!this.paper){
			return;
		}
		var s = this.settings;
	   var w = 0, h = 0;
	   var dim = $("stage").getDimensions();
	   w = dim.width;
	   h = dim.height;
//	   (1147/5000)*(2600-181)
//	   (1111/8600)*2600
	   /**
	   if (window.innerWidth){
	      w = window.innerWidth;
	      h = window.innerHeight;
	   }else if(document.documentElement &&
	           (document.documentElement.clientWidth ||
	            document.documentElement.clientHeight)) {
	            w = document.documentElement.clientWidth;
	            h = document.documentElement.clientHeight;
	   }
	   **/


	   this.paper.changeSize(w-20, h-20, true, false);

	   var scale = this.paper.height / this.paper.h;
	   if(this.paper.w>this.paper.h){
	   	scale = this.paper.width / this.paper.w;
	   }

	   var innerHeight = Math.ceil(this.paper.h * scale);
	   var outerHeight = $("stageinner").getDimensions().height;
	   if(innerHeight>outerHeight){
	   	outerHeight = innerHeight;
	   }
	   var floorHeight = ((outerHeight - innerHeight)/2)+50;

	   $("floor").setStyle({
	   	height:floorHeight+"px"
	   });

	   this.paper.text(200,100,"").attr("font","30px Arial").attr("fill","#ffffff");
	}


}


var trace = function(str){
	//console.log(str);
}