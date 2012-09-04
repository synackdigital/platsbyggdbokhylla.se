var TEMPLATES = {
	standard:[{
		type:"std",
		w:1800,
		h:2400,
		col:4,
		row:4,
		sockel:60
	}],
	onewin:[
		{
			type:"std",
			w:1800,
			h:2400,
			col:4,
			row:4,
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
	onewinmiddle:[
		{
			type:"std",
			w:1800,
			h:2400,
			col:4,
			row:4,
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
			row:4,
			sockel:60
		}
	],
	threewin:[
		{
			type:"std",
			w:1800,
			h:2400,
			col:4,
			row:8,
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
			row:8,
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
			row:8,
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
			row:8,
			sockel:60
		}
	],
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
		h:735,
		skiva:32,
		gavel:16,

	},
	sockel_davidshall:10,
	overlay:{minw:300,maxw:2010,minh:200,maxh:1000},
	bottom:{h:22,b:60},
	side:{w:22},
	side_davidhall:{w:32},
	plane:{h:22,minamount:1},
	kol:{w:22,minw:350,maxw:750},
	kol_davidhall:{w:32,minw:350,maxw:750},
	dvd:{h:190,w:18,name:"DVD",image:"dvd"},
	dvdopen:{h:190,w:136,name:"DVD",image:"dvd-open"},
	blueray:{h:172,w:16,name:"Blueray",image:"blueray"},
	cd:{h:120,w:12,name:"CD-skiva",image:"cd"},
	cdopen:{h:120,w:120,name:"CD-skiva",image:"cd-open"},
	cdopen2:{h:120,w:120,name:"CD-skiva",image:"cd-open2"},
	pocket:{h:180,w:30,name:"Pocket",image:"pocket"},
	bok:{h:220,w:13,name:"Inbunden bok",image:"pocket"}
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
	doors_closed:{},
	doors_open:{},
	settings:{
		margin:100
	},
	templates:TEMPLATES,
	baseOrder:{
		modell:null,
		template:null,
		height:0,
		width:0
	},
	order:[],
	orderDetails:{
		price:0,
	},
	validate:{
		item:function(theForm,item){
			trace("validate.item");
			trace(item.name)
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
			if(valid) {
				itemElement.removeClassName("error");
			} else {
					if(item.val>max){
					var newval = max;
				} else if(item.val < min){
					var newval = min;
				}
				itemElement.addClassName("error");
				setTimeout(function(){
					this.value=newval;
				}.bind(itemElement),1000);
			}

			var input = itemElement.down('input');
			trace("itemElement");
			trace(itemElement);
			input.value = item.val;
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
				trace("col min");
				trace(min);
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
	updateOrder:function(form){
		var order = form.serialize(true);
		trace(order);
		var oneFail = false;
		Object.keys(order).each(function(item){
			trace("order key:"+item);
			if(item!="type"){
				if(item=="modell"){
					trace("key:modell");
					trace(item);
					trace(order[item]);
					trace(k.order[order.id]);
					k.order[order.id][item]=order[item];
					trace(k.order[order.id]);
				} else {
					var val = parseInt(order[item]);
					if(k.validate.item(form,{val:val,name:item,order:order})){
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
			this.redraw();
		}

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
				k.nextGuideStep();
			})
		});
		$$("#rita_start .choice").each(function(choice){
			choice.observe("click",function(){
				k.baseOrder.template = this.readAttribute("template");
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

		k.nextGuideStep();






	},
	startUp:function(modell, template){
		k.order = this.templates[template];
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
		setTimeout(function(){
			$$("#controls form").each(function(aForm){
				if(aForm.identify()!="orderForm" && aForm.identify()!="fillwithform"){
					k.updateOrder(aForm);
				}
			});
			this.resizePaper();
		}.bind(this),100);
	},
	addForm:function(id,data,counter,modell){
		var newForm = $("orderForm").clone(true);
		newForm.writeAttribute("id","form_"+id);
		newForm.writeAttribute("type",data.type);
		trace("addForm");
		trace(modell);
		trace(arguments);

		newForm.down('input[name=modell]').value = modell;
		newForm.down('input[name=id]').value=id;
		newForm.down('input[name=type]').value=data.type;

		trace(newForm.down('input[name=modell]').value);
		trace(newForm.down('input[name=id]').value);
		trace(newForm.down('input[name=type]').value);

		newForm.down('strong').update("Sektion "+(counter));

		if(counter>1 && data.type=="std"){
			newForm.select(".item.slave").each(function(slave){
				slave.hide();
			});
		}
		if(data.type=="over"){
			newForm.select(".item.slave.sockel").each(function(slave){
				slave.hide();
			});
		}

		if(data.type=="over"){
			newForm.down('strong').update("Överbyggnad "+(counter));
		}
		var sliders = newForm.getInputs();
		sliders.each(function(item){
			trace(item);
			if(item.name!="id" && item.name != "modell"){
				item.value = data[item.name];
			}
			var eventName = "change";
			item.observe("change",function(e){
				this.up().down(".value").update(this.value);
				k.updateInterval = clearInterval(k.updateInterval);
				k.updateInterval = setInterval(function(){
					k.updateInterval = clearInterval(k.updateInterval);
					k.updateOrder(this.up('form'));
				}.bind(this),200);
			});
		});
		newForm.show();
		newForm.observe("submit",function(e){
			e.stop();
			k.updateOrder(this);
		});
		$("controls").insert(newForm);
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

var hylla = function(p, x, y, w, h, kol, plan, sockel, options){
	trace("new hylla");
	trace(options);
	if(!options) options = {position:3, type:"std", modell:"ribersborg",singledoor:false};
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
	this._singledoor = options.singledoor;
	trace("######single door??");
	trace(this._singledoor);
	this.lines = [];

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

		var pathstr = "M" + boxArr.join(",L") + ",Z"

		var line = this._p.path(pathstr);

		if(options.open){
			var openboxArr = [
				x+","+y,
				((x+w)-80)+","+(y+50),
				((x+w)-80)+","+((y-h)+50),
				x+","+(y-h),
				x+","+y
			];
			if(options.side=="right"){
				openboxArr = [
				(x+80)+","+(y+50),
				(x+w)+","+y,
				(x+w)+","+(y-h),
				(x+80)+","+((y-h)+50),
				(x+80)+","+(y+50)
			];
			}
			line.attr("cursor","pointer");
			k.doors_closed[line.id] = pathstr;
			k.doors_open[line.id] = "M" + openboxArr.join(",L") + ",Z"
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
		var el = this.drawBox(w,h,x,y,{
			fillcolor:k.style.doorfill,
			open:true,
			side:side
		});
		trace(el);
		trace(el.id);
		el.mouseover(function(e){
			var openDoor = k.doors_open[e.srcElement.raphaelid];
			if(openDoor){
				var el = k.paper.getById(e.srcElement.raphaelid);
				el.animate({"path":openDoor},300,"ease-out",function(){
					trace("door open done");
				});
			}
		});
		el.mouseout(function(e){
			var closedDoor = k.doors_closed[e.srcElement.raphaelid];
			if(closedDoor){
				var el = k.paper.getById(e.srcElement.raphaelid);
				el.animate({"path":closedDoor},300,"ease-out",function(){
					trace("door open done");
				});
			}
		});
	}
	this.fillWith = function(thing,theX,theY,width){
		if(thing){
			var p = k.parts;
			var thingY  = (theY-p.plane.h)-thing.h;
			for(var x = 0; x < Math.floor(width/thing.w); x++){
				this._p.image("../images/"+thing.image+".png",theX+(x*thing.w),thingY,thing.w,thing.h);
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


		if(options.position==1){
			innerWidth = (this._w + this._x);
		} else if (options.position==2){
			this.drawBox(p.side.w , this._h , innerWidth, kolBottom,{
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

		if(options.position==2){
			perKol = (this._w - ((p.kol.w * (this._kol-1)) + sideWidth)) / this._kol;
		}
		if(options.position==1){
			perKol = (this._w - (p.kol.w * (this._kol-1))) / this._kol;
		}

		var whatFits = function(w,h){
			var stuff = ["dvd","dvdopen","blueray","cd","pocket","cdopen","cdopen2"];

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
			if(options.position==2){
				colX = this._x + (i * perKol);
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
				var fits = whatFits(perKol,(perPlan-(this._sockel+p.plane.h)));
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
			if(options.position==2){
				startX = this._x;
				planWidth = (this._w - sideWidth);
			}
			if(options.position	== 1){
				startX = this._x;
				planWidth = (this._w);
			}

			for(var i = 0; i < this._kol; i++){
				var colX = startX + (i * perKol);
				if(options.position==2){
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
			this.drawBox(planWidth,p.plane.h,startX,((kolBottom-this._h)+p.plane.h),{
				fillcolor:k.style.planefill

			});
			planY  = planY - ((u-1) * p.plane.h);
			this.drawBox(planWidth,p.plane.h,startX,(kolBottom),{
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

var trace = function(str){
	console.log(str);
}
