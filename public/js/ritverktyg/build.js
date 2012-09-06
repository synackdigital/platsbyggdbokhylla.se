var TEMPLATES = {
	standard:[{
		type:"std",
		w:1800,
		h:2400,
		col:4,
		row:5,
		sockel:60
	}],
	onewin:[
		{
			type:"std",
			w:1800,
			h:2400,
			col:4,
			row:5,
			sockel:60
		},
		{
			type:"over",
			w:1500,
			h:500,
			col:2,
			row:2,
			sockel:0
		}
	],
	onewinleft:[
		{
			type:"over",
			w:1500,
			h:500,
			col:2,
			row:2,
			sockel:0
		},
		{
			type:"std",
			w:1800,
			h:2400,
			col:4,
			row:5,
			sockel:60
		}
	],
	onewinmiddle:[
		{
			type:"std",
			w:1800,
			h:2400,
			col:4,
			row:5,
			sockel:60
		},
		{
			type:"over",
			w:1200,
			h:500,
			col:2,
			row:2,
			sockel:0
		},
		{
			type:"std",
			w:1800,
			h:2400,
			col:4,
			row:5,
			sockel:60
		}
	],
	threewin:[
		{
			type:"std",
			w:1800,
			h:2400,
			col:4,
			row:5,
			sockel:60
		},
		{
			type:"over",
			w:1200,
			h:602,
			col:2,
			row:2,
			sockel:0
		},
		{
			type:"std",
			w:750,
			h:2400,
			col:1,
			row:5,
			sockel:60
		},
		{
			type:"over",
			w:1200,
			h:602,
			col:2,
			row:2,
			sockel:0
		},
		{
			type:"std",
			w:1800,
			h:2400,
			col:4,
			row:5,
			sockel:60
		}
	]
};

var PRICELIST = {
	gavel:1555,
	bakstycke:1120,
	hyllplan:382,
	oversmall:1985,
	overbig:2580,
	gavel_davidhall:2400,
	oversmall_davidhall:2985,
	overbig_davidhall:3580,
	skap:6850
}

var PARTS = {
	skap:{
		dorrh:725,
		h:750,
		skiva:32,
		gavel:16,

	},
	sockel_davidshall:20,
	overlay:{minw:300,maxw:2010,minh:200,maxh:1000},
	bottom:{h:22,b:60},
	side:{w:22},
	side_davidhall:{w:32},
	plane:{h:22,minamount:1},
	kol:{w:22,minw:350,maxw:750},
	kol_davidhall:{w:32,minw:350,maxw:750},
	dvd:{
		id:"dvd", h:190,w:18,name:"DVD",image:"dvd",
		open:[
			{h:190,w:136,name:"DVD",image:"dvd-open"},
			{h:190,w:136,name:"DVD",image:"dvd-open2"},
			{h:190,w:136,name:"DVD",image:"dvd-open3"}
		]
	},
	blueray:{
		id:"blueray", h:172,w:16,name:"Blueray",image:"blueray",
		open:[
			{h:172,w:133,name:"CD-skiva",image:"blueray-open"},
			{h:172,w:133,name:"CD-skiva",image:"blueray-open2"},
			{h:172,w:133,name:"CD-skiva",image:"blueray-open3"},
			{h:172,w:133,name:"CD-skiva",image:"blueray-open4"},
			{h:172,w:133,name:"CD-skiva",image:"blueray-open5"},
			{h:172,w:133,name:"CD-skiva",image:"blueray-open6"}
		]
	},
	cd:{
		id:"cd", h:120,w:12,name:"CD-skiva",image:"cd",
		open:[
			{h:120,w:120,name:"CD-skiva",image:"cd-open"},
			{h:120,w:120,name:"CD-skiva",image:"cd-open2"},
			{h:120,w:120,name:"CD-skiva",image:"cd-open3"},
			{h:120,w:120,name:"CD-skiva",image:"cd-open4"}
		]
	},
	pocket:{
		id:"pocket", h:180,w:30,name:"Pocket",image:"pocket",
		open:[
				{h:180,w:111,name:"CD-skiva",image:"pocket-open"},
				{h:180,w:137,name:"CD-skiva",image:"pocket-open2"},
				{h:180,w:117,name:"CD-skiva",image:"pocket-open3"},
				{h:180,w:117,name:"CD-skiva",image:"pocket-open4"}
		]
	},
	bok:{
		id:"bok", h:220,w:25,name:"Inbunden bok",image:"bok",
		open:[
			{h:220,w:146,name:"CD-skiva",image:"bok-open"},
			{h:220,w:148,name:"CD-skiva",image:"bok-open3"},
			{h:220,w:136,name:"CD-skiva",image:"bok-open2"}
		]
	}
};

var STYLE_BLACK = {
	bg:"135-#fff-#eee",
	bgskap:"#aaa",
	linecolor:"rgba(255,255,255,1)",
	planefill:"0-#333-#666",
	kolfill:"0-#333-#666",
	sidefill:"0-#333-#666",
	topfill:"0-#333-#666",
	bottomfill:"0-#333-#666",
	sockelfill:"90#333-#666"
};
var STYLE_RED = {
	bg:"135-#fff-#eee",
	linecolor:"rgba(255,200,200,1)",
	planefill:"0-#a90329-#6d0019",
	kolfill:"0-#a90329-#6d0019",
	sidefill:"0-#a90329-#6d0019",
	topfill:"0-#a90329-#6d0019",
	bottomfill:"0-#a90329-#6d0019",
	sockelfill:"90-#a90329-#6d0019",
};
var STYLE_BACK2 = {
	bg:"135-#fff-#eee",
	linecolor:"rgba(102,102,102,1)",
	planefill:"90-#eee-#fff",
	kolfill:"0-#eee-#fff",
	sidefill:"0-#eee-#fff",
	topfill:"90-#eee-#fff",
	bottomfill:"90-#eee-#fff",
};
var STYLE = {
	bg:"135-#fff-#eee",
	linecolor:"rgba(30,30,30,1)",
	planefill:"90-#F5F5F5-#fff",
	kolfill:"0-#F5F5F5-#fff",
	sidefill:"0-#F5F5F5-#fff",
	topfill:"90-#F5F5F5-#fff",
	bottomfill:"90-#F5F5F5-#fff",
	sockelfill:"90#F5F5F5-#fff",
	doorfill:"110-#eee-#fff",
	skapskiva:"90-#e9e9e9-#f0f0f0"
};
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
					this.value=newval;
					this.fire("mechanical:change");
				}.bind(itemElement.down("input")),1000);
				return false;
			}

			return true;
		},
		sockel:{
			min:function(order) {return 0;},
			max:function(order) {return 300;}
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
			if(aForm.identify()!="orderForm" && aForm.identify()!="fillwithform"){
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
				if(oneFail){
					trace("one item failed");
				} else {
					trace("redraw in update order");
					k.redraw();
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
				$("logo").addClassName("small");
				k.baseOrder.modell = this.readAttribute("template");
				k.nextGuideStep();
			})
		});
		$$("#rita_start .choice").each(function(choice){
			choice.observe("click",function(){
				k.baseOrder.template = this.readAttribute("template");
				trace(".guideform ."+k.baseOrder.template);
				var guideF = $$(".guideform."+k.baseOrder.template).first();
				trace(guideF);
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
			k.startUp(k.baseOrder.modell,k.baseOrder.template);
		});

		$("fillwithform").getInputs("checkbox").each(function(box){
			box.observe("change",function(e){
				k.redraw();
			});
		});

		$("save").observe("click",function(e){
			trace("save!");
			e.stop();
			k.saveOrder();
		});

		$("intresseAnmalan").observe("click",function(e){
			trace("offert!");
			e.stop();
			$("rita_offert").show();
		});

		$("closeIntresseAnmalan").observe("click",function(e){
			trace("closeOffert!");
			e.stop();
			$("rita_offert").hide();
		});
		$("sendIntresseAnmalan").observe("click",function(e){
			trace("sendIntresseAnmalan!");
			e.stop();

		});




		if(document.location.hash){
			var id = document.location.hash.substring(1);
			new Ajax.Request("/data/drawings/"+id,{
				method:"get",
				onSuccess:function(transport){
					try{
						$$(".guidestep").invoke("hide");
						var drawing = transport.responseJSON;
						k.startUp(drawing.data.modell,null,drawing.data.order);
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
			return;
		}

		k.nextGuideStep();
		return;

		setTimeout(function(){
			k.nextGuideStep();
			setTimeout(function(){
				k.nextGuideStep();
				setTimeout(function(){
					k.nextGuideStep();
					k.startUp("davidhall","onewinmiddle");
				},100);
			},100);

		},100);






	},
	saveOrder:function(){
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
		new Ajax.Request("/data/drawings",{
			method:"POST",
			parameters:{
				"Drawing[data]":Object.toJSON(data)
			},
			onSuccess:function(transport){
				try{
					var drawing = transport.responseJSON;
					if(drawing.id){
						document.location.hash = drawing.id;
					}
				} catch(e){
					trace("something went wrong saving");
				}
			},
			onException:function(e,d){
				trace(e);
				trace(d);
			},
			onError:function(){
				trace("ERROR saving");
			}
		});
		trace(data);
		trace(Object.toJSON(data));
	},
	startUp:function(modell, template,order){
		k.order = order ? order : this.templates[template];
		var orderCount = k.order.length;
		var sectionCount = 1;
		var overCount = 1;

		if(modell=="davidhall"){
			k.parts.side = k.parts.side_davidhall;
			k.parts.kol = k.parts.kol_davidhall;
		}

		k.order.each(function(order,index){
			if(order.type=="over"){
				count = overCount++;
			} else {
				count = sectionCount++;
			}
			k.addForm(index,order,count,modell);
		});
		$$("#sektionform form.activated").each(function(aForm){
			aForm.hide();
		});

		setTimeout(function(){
			k.updateOrder();
			this.resizePaper();
			$("stage").addClassName("show");
			$("controls").addClassName("show");

		}.bind(this),100);
	},
	addForm:function(id,data,counter,modell){
		var newForm = $("orderForm").clone(true);
		newForm.writeAttribute("id","form_"+id);
		newForm.writeAttribute("type",data.type);
		newForm.addClassName("activated");


		newForm.down('input[name=modell]').value = modell;
		newForm.down('input[name=id]').value=id;
		newForm.down('input[name=type]').value=data.type;

		var name = "Sektion "+(counter);
		if(data.type=="over"){
			name = "Överbyggnad "+(counter);
		}
		newForm.down('strong').update(name);
		trace("hide the FOOOOORM");

		var sektionLink = new Element("li",{"target":"form_"+id}).update(name);
		sektionLink.observe("click",function(){
			this.siblings().each(function(sib){
				sib.removeClassName("active");
			});
			this.addClassName("active");
			$$("#sektionform form.activated").each(function(aForm){
				aForm.hide();
			});
			$(this.readAttribute("target")).show();
		});
		$("sektionlist").insert(sektionLink);

		if(data.type=="over"){
			newForm.select(".item.slave.sockel").each(function(slave){
				slave.hide();
			});
			newForm.select(".item.slave").each(function(slave){
				slave.removeClassName("slave");
			});
		}
		if(counter>1 && data.type=="std"){
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
			item.observe("change",function(e){
				if(this.up().hasClassName("slave")){
					trace("got slaves");
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

		for(var i = 0; i < this.order.length; i++){
			var hyllprice = this.order[i].hylla.price;
			total.bakstycke+=hyllprice.bakstycke;
			total.hyllplan+=hyllprice.hyllplan;
			total.gavel+=hyllprice.gavel;
			total.oversmall+=hyllprice.oversmall;
			total.overbig+=hyllprice.overbig;
			total.skap+=hyllprice.skap;
		}
		var totalprice = 0;

		if(k.baseOrder.modell=="davidhall"){
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



	},
	redraw:function(){

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
				if(o.type=="over"){
					if(i==this.order.length-1){
						position = 2;
 					} else if(i==0){
 						position = 4;
 					} else {
 						position = 1;
 					}
				}
				trace("new hylla, position:"+position+", type:"+type+", modell:"+modell);
				this.order[i].hylla = new hylla(this.paper,lastX,(o.h+s.margin),o.w,o.h,o.col,o.row,o.sockel,{
					position:position, type:type, modell:modell
				});
				lastX = lastX + (o.w);
			}

			this.calculatePrice();

			Object.keys(this.fillCount).each(function(key){
				var label = $$("#fillwith label[for="+key+"] .max").first();
				if(label){
					label.update(k.fillCount[key]);
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
	console.log(str);
}
var hylla = function(p, x, y, w, h, kol, plan, sockel, options){
	if(!options) options = {position:3, type:"std", modell:"ribersborg",singledoor:true};
	this._type=options.type;
	this._p = p;
	this._x = x;
	this._y = y;
	this._w = w;
	this._h = h;
	this._kol = kol;
	this._plan = plan;
	this._sockel = sockel;
	this._modell = options.modell;
	this._singledoor = true;
	this.lines = [];

	if(this._modell=="davidhall"){
		this._plan++;
	}
	if(this._modell=="davidhall" && this._type=="std"){
		this._h = this._h - (k.parts.skap.h + k.parts.skap.skiva)
	}

	this.drawBox = function(w,h,x,y,options){
		if(!options) options = {};

		var boxArr = [
			x+","+y,
			(x+w)+","+y,
			(x+w)+","+(y-h),
			x+","+(y-h),
			x+","+y
		];

		var pathstr = "M" + boxArr.join(",L") + ",Z";
		var line = this._p.path(pathstr);

		if(options.door){
			var move = {x:80,y:50,ix:0,iy:0}

			if(options.inner){
				move = {x:60,y:43,ix:-30,iy:15}
			}

			var openboxArr = [
				(x+move.ix)+","+(y+move.iy),
				((x+w)-move.x)+","+(y+move.y),
				((x+w)-move.x)+","+((y-h)+move.y),
				(x+move.ix)+","+((y-h)+move.iy),
				(x+move.ix)+","+(y+move.iy)
			];
			if(options.side=="right"){
				openboxArr = [
				(x+move.x)+","+(y+move.y),
				((x+w)-move.ix)+","+(y+move.iy),
				((x+w)-move.ix)+","+((y-h)+move.iy),
				(x+move.x)+","+((y-h)+move.y),
				(x+move.x)+","+(y+move.y)
			];
			}
			line.attr("cursor","pointer");
			var masterID = options.parentPath ? options.parentPath : line.id;
			k.doors_closed.push({id:line.id, parent:masterID,path:pathstr});
			k.doors_open.push({id:line.id, parent:masterID,path:"M" + openboxArr.join(",L") + ",Z"});
		}



		if(options.id){
			line.id = options.id;
		}
		if(options.linecolor){
			line.attr("stroke", options.linecolor);
		} else {
			line.attr("stroke", k.style.linecolor);
		}
		if(options.fillcolor){
			line.attr("fill", options.fillcolor);
		}
		if(options.fillimage){
			line.attr("fill", options.fillimage);
		}

		line.attr("stroke-width", "1");

		return line;

	};
	this.drawDoor = function(w,h,x,y,single,side){
		var elHover = this.drawBox(w,h,x,y,{
			fillcolor:"rgba(255,0,0,0)",
			linecolor:"rgba(255,255,0,0)",
			door:true,
			side:side,
		});
		var el = this.drawBox(w,h,x,y,{
			fillcolor:k.style.doorfill,
			door:true,
			side:side,
			parentPath:elHover.id
		});
		var elInner = this.drawBox(w-120,(h-120),x+60,y-60,{
			fillcolor:k.style.doorfill,
			door:true,
			side:side,
			parentPath:elHover.id,
			inner:true
		});
		elHover.toFront();

		elHover.mouseover(function(e){
			trace("mouseover");
			var masterID = e.srcElement.raphaelid;
			trace("masterID:"+masterID);
			for (var i = 0; i < k.doors_open.length; i++){
				var openDoor = 	k.doors_open[i];
				trace("oppenDoor");
				trace(openDoor);
				if(openDoor.parent==masterID){
					trace("got the parent");
					var el = k.paper.getById(openDoor.id);

					if(openDoor.parent == openDoor.id){
						if(masterID != openDoor.id){
							el.hide();
						}
					} else {
						el.animate({"path":openDoor.path},300,"ease-out",function(){
							trace("door open done");
						});
					}
				}
			}
		});
		elHover.mouseout(function(e){
			var masterID = e.srcElement.raphaelid;
			for (var i = 0; i < k.doors_closed.length; i++){
				var openDoor = 	k.doors_closed[i];
				if(openDoor.parent==masterID){
					var el = k.paper.getById(openDoor.id);
					if(openDoor.parent == openDoor.id){
						if(masterID != openDoor.id){
							el.show();
						}
					} else {
						el.animate({"path":openDoor.path},300,"ease-out",function(){
							trace("door open done");
						});
					}

				}
			}
		});
	}
	this.fillWith = function(thing,theX,theY,width){
		if(thing){
			if(!k.fillCount[thing.id]) {
				k.fillCount[thing.id] = 0;
			}

			var p = k.parts;
			var thingY  = (theY-p.plane.h)-thing.h;
			for(var x = 0; x < Math.floor(width/thing.w); x++){
				this._p.image("../images/"+thing.image+".png",theX+(x*thing.w),thingY,thing.w,thing.h);
				k.fillCount[thing.id]++;
			}
			if(thing.open){
				var openThing = thing.open[Math.round(Math.random()*(thing.open.length-1))];
				if(width>=openThing.w){
					trace("open thing");
					var theX = theX;
					trace("thex:"+theX);
					var widthLeft = width - openThing.w;
					trace("widthLeft:"+widthLeft);
					var stepsLeft = Math.floor(widthLeft/thing.w);
					trace("stepsLeft:"+stepsLeft);
					var theX = theX + thing.w*Math.round(Math.random()*stepsLeft);
					trace("theX:"+theX);
					this._p.image("../images/"+openThing.image+".png",theX,thingY,openThing.w,openThing.h);
				}
			}
		}
	};
	this.redraw = function(){

		var price = {
				gavel:0,
				bakstycke:0,
				hyllplan:0,
				oversmall:0,
				overbig:0,
				skap:0
			};
		var borderSize = 1;

		var maxX = this._x + this._w;
		var maxY = this._y -this._h;


		var p = k.parts;

		var innerHeight = this._h;
		var innerWidth = (this._w + this._x) - (p.side.w);
		var kolBottom = this._y;

		if(this._modell=="davidhall" && this._type=="std"){
			kolBottom = this._y - (p.skap.h+p.skap.skiva);
		}


		this.drawBox(this._w,this._h,this._x,kolBottom,{
			linecolor:"rgba(255,0,0,0.3)",
			fillcolor:k.style.bg,
			id:"bg"
		});

		if(this._modell=="davidhall" && this._type=="std"){
			this.drawBox(this._w,(p.skap.h-10),this._x,this._y-10,{
				linecolor:"rgba(255,0,0,0.3)",
				fillcolor:"90-#efefef-#ddd",
				id:"bgskap"
			});

		}

		trace("options.position");
		trace(options.position);

		if(options.position==1){
			innerWidth = (this._w + this._x);
		} else if (options.position==2){
			this.drawBox(p.side.w , this._h , innerWidth, kolBottom,{
				fillcolor:k.style.sidefill
			});
			price.gavel++;
		} else if (options.position==4){
			this.drawBox(p.side.w , this._h , this._x, kolBottom,{
				fillcolor:k.style.sidefill
			});
			price.gavel++;
		} else {
			this.drawBox(p.side.w , innerHeight ,this._x, kolBottom,{
				fillcolor:k.style.sidefill
			});
			price.gavel++;

			this.drawBox(p.side.w , innerHeight , innerWidth, kolBottom,{
				fillcolor:k.style.sidefill
			});
			price.gavel++;
		}


		var sideWidth = p.side.w;
		var perKol = (this._w - ((p.kol.w * (this._kol-1)) + (sideWidth * 2))) / this._kol;

		var perPlan = (this._h - ((p.plane.h * (this._plan-1)))) / this._plan;

		if(options.position==2 || options.position==4){
			trace("perKol change");
			perKol = (this._w - ((p.kol.w * (this._kol-1)) + sideWidth)) / this._kol;
		}
		if(options.position==1){
			perKol = (this._w - (p.kol.w * (this._kol-1))) / this._kol;
		}

		var whatFits = function(w,h){
			var stuff = ["dvd","blueray","cd","pocket"];

			var stuff = [];
			$("fillwithform").getInputs("checkbox").each(function(box){if(box.checked){stuff.push(box.getValue());}});


			var fits = [];
			for(var i = 0; i < stuff.length; i++){
				var thing = stuff[i];
				if(p[thing].w<w && p[thing].h<h){
					fits.push(p[thing]);
				}
			}
			return fits;
		};


		for(var i = 0; i < this._kol; i++){
			var colX = this._x + sideWidth + (i * perKol);
			if(options.position==2 && options.position==4){
				colX = this._x + (i * perKol);
				trace("colX fix ");
			}
			colX  = colX + (i * p.kol.w);
			if(this._type=="std"){
				if(i>0){
					this.drawBox(p.kol.w,innerHeight,(colX-p.kol.w) ,kolBottom,{
						fillcolor:k.style.kolfill
					})
					price.gavel++;
				}
				if(this._modell=="davidhall" && i>0){
					this.drawBox(p.skap.gavel,p.skap.h,(colX-p.kol.w) ,this._y,{
						fillcolor:k.style.kolfill
					})
					this.drawBox(p.skap.gavel,p.skap.h,(colX-p.kol.w)+p.skap.gavel ,this._y,{
						fillcolor:k.style.kolfill
					})

				}
				if(this._modell=="davidhall"){
					this.drawBox(perKol,p.plane.h,colX,(this._y-(p.skap.h/2)),{
						fillcolor:k.style.planefill
					});
					this.drawBox(perKol,p.plane.h,colX,(this._y-p.sockel_davidshall),{
						fillcolor:k.style.planefill
					});
				}
				for(var u = 1; u < this._plan; u++){
					var planY = kolBottom - (u * perPlan);
					planY  = planY - ((u-1) * p.plane.h);
					this.drawBox(perKol,p.plane.h,(colX),planY,{
						fillcolor:k.style.planefill
					});
					price.hyllplan++;

					var fits = whatFits(perKol,perPlan);
					if(fits.length>0){
						var thing = fits[Math.round(Math.random()*(fits.length-1))];
						this.fillWith(thing,colX,planY,perKol);
					}

				}
			}




			if(this._type=="std" && this._modell=="ribersborg"){
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,p.plane.h,(colX),((kolBottom-this._h)+p.plane.h),{
					fillcolor:k.style.planefill
				});
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,p.plane.h,(colX),(kolBottom-this._sockel),{
					fillcolor:k.style.planefill
				});
				price.hyllplan++;
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,this._sockel,(colX),(kolBottom),{
					fillcolor:k.style.sockelfill
				});
				var fits = whatFits(perKol,(perPlan-(this._sockel+p.plane.h)));
				var thing = fits[Math.round(Math.random()*(fits.length-1))];
				this.fillWith(thing,colX,(kolBottom-this._sockel),perKol);
			} else if(this._type=="std" && this._modell=="davidhall"){
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,p.plane.h,(colX),((kolBottom-this._h)+p.plane.h),{
					fillcolor:k.style.planefill
				});
				var fits = whatFits(perKol,(perPlan-(p.plane.h)));
				var thing = fits[Math.round(Math.random()*(fits.length-1))];
				this.fillWith(thing,colX,(kolBottom+p.plane.h),perKol);
			} else {


			}




		}


		if(this._type=="over"){

			price.gavel = 0;
			if(this._w<=1450){
				price.oversmall = 1;
			} else {
				price.overbig = 1;
			}

			var planWidth = (this._w - (sideWidth * 2));
			var startX = this._x + p.side.w;
			if(options.position==2 && options.position==4){
				trace("startX and planWidth");
				startX = this._x;
				planWidth = (this._w - sideWidth);
			}
			if(options.position	== 1){
				startX = this._x;
				planWidth = (this._w);
			}

			for(var i = 0; i < this._kol; i++){
				var colX = startX + (i * perKol);
				if(options.position==2 && options.position==4){
					colX = this._x + (i * perKol);
				}
				colX  = colX + (i * p.kol.w);
				if(i>0){
					this.drawBox(p.kol.w,(this._h-(p.plane.h*2)),(colX-p.kol.w) ,(kolBottom-p.plane.h),{
						fillcolor:k.style.kolfill
					})
				}
				for(var u = 0; u < this._plan; u++){
					var planY = kolBottom - (u * perPlan);
					planY  = planY - ((u-1) * p.plane.h);
					if(u>0){
						this.drawBox(perKol,p.plane.h,colX,planY,{
							fillcolor:k.style.planefill
						});
					}
					var fits = whatFits(perKol,perPlan);
					if(fits.length>0){
						var thing = fits[Math.round(Math.random()*(fits.length-1))];
						this.fillWith(thing,colX,(planY-(p.plane.h*(2-u)))+p.plane.h,perKol);
					}
				}
			}
			var theWidth = (options.position==2) ? planWidth : planWidth+p.plane.h;
			this.drawBox(theWidth,p.plane.h,startX,((kolBottom-this._h)+p.plane.h),{
				fillcolor:k.style.planefill

			});
			this.drawBox(theWidth,p.plane.h,startX,(kolBottom),{
				fillcolor:k.style.planefill
			});
		}

		if(this._type=="std" && this._modell=="davidhall"){

			this.drawBox(this._w, p.skap.skiva ,this._x, (this._y-p.skap.h),{
				fillcolor:k.style.skapskiva
			});

			this.drawBox(p.skap.gavel, p.skap.h ,this._x, this._y,{
				fillcolor:k.style.sidefill
			});
			this.drawBox(p.skap.gavel, p.skap.h ,this._x+p.skap.gavel, this._y,{
				fillcolor:k.style.sidefill
			});
			this.drawBox(p.skap.gavel, p.skap.h ,this._x+(this._w-p.skap.gavel), this._y,{
				fillcolor:k.style.sidefill
			});
			this.drawBox(p.skap.gavel, p.skap.h ,this._x+(this._w-(p.skap.gavel*2)), this._y,{
				fillcolor:k.style.sidefill
			});

		}


		var doorY = this._y - (p.skap.h-p.skap.dorrh);
		for(var i = 0; i < this._kol; i++){
			var colX = this._x + sideWidth + (i * perKol);
			colX  = colX + (i * p.kol.w);
			if(this._type=="std"){
				if(this._modell=="davidhall"){
					var doorW = perKol + (p.skap.gavel*2);
					if(this._singledoor){
						this.drawDoor(doorW,p.skap.dorrh,(colX-p.kol.w)+p.skap.gavel ,doorY,true);
					} else {
						doorW = doorW / 2;
						this.drawDoor(doorW,p.skap.dorrh,(colX-p.kol.w)+p.skap.gavel ,doorY,false,"left");
						this.drawDoor(doorW,p.skap.dorrh,((colX-p.kol.w)+p.skap.gavel)+doorW ,doorY,false,"right");

					}
				}
			}
		}

		price.bakstycke = (price.gavel>0) ? (price.gavel - 1) : 0;
		price.skap = (price.gavel>0) ? (price.gavel - 1) : 0;

		this.price = price;

		return price;

	}
	this.redraw();
}
