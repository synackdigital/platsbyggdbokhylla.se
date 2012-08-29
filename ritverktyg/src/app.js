Event.observe(window,"load",function(){
	k.setup();
});

var k = {
	updateInterval:null,
	paper:null,
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
	validate:{
		item:function(theForm,item){
			trace("validate.item");
			trace(item.name)
			if(item.name=="id") return true;
			if(item.name=="type") return true;
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
					//this.removeClassName("error")
					this.value=newval;
					//k.updateOrder(this.up('form'));
					
				}.bind(itemElement),1000);
			}
			
			var input = itemElement.down('input');
			input.writeAttribute("max",max);
			input.writeAttribute("min",min);

			itemElement.down('.value').update(item.val);
			itemElement.down('.max').update(max);
			itemElement.down('.min').update(min);

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
		var oneFail = false;
		Object.keys(order).each(function(item){
			if(item!="type"){
			var val = parseInt(order[item]);
			if(k.validate.item(form,{val:val,name:item,order:order})){
				k.order[order.id][item] = val;
			} else {
				oneFail = true;
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
			k.startUp(k.baseOrder.template);
		});

		$("fillwithform").getInputs("checkbox").each(function(box){
			box.observe("change",function(e){
				k.redraw();
			});
		});
		
		k.nextGuideStep();
		
		

		
	},
	startUp:function(template){
		k.order = this.templates[template];
		var orderCount = k.order.length;
		var sectionCount = 1;
		var overCount = 1;
		k.order.each(function(order,index){
			if(order.type=="over"){
				count = overCount++;
			} else {
				count = sectionCount++;
			}
			k.addForm(index,order,count);
		});
		$$("#controls form").each(function(aForm){
			if(aForm.identify()!="orderForm" && aForm.identify()!="fillwithform"){
				k.updateOrder(aForm);
			}
		});
		this.resizePaper();
	},
	addForm:function(id,data,counter){
		var newForm = $("orderForm").clone(true);
		newForm.writeAttribute("id","form_"+id);
		newForm.writeAttribute("type",data.type);
		newForm.down('input[name=id]').value=id;
		newForm.down('input[name=type]').value=data.type;
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
		var exactVals = newForm.select("span[contenteditable=true]");
		var all = sliders.concat(exactVals);
		all.each(function(item){
			if(item.name!="id"){
				item.value = data[item.name];
			}
			var eventName = "change";
			if(item.readAttribute("contenteditable")){
				item.observe("blur",function(e){
					this.up().down("input").value=parseInt(this.innerHTML);
					k.updateOrder(this.up('form'));
				});
				item.observe("click",function(){
					this.down(".control").show();
				});
				item.observe("keypress",function(e){
					if(e.keyCode == Event.KEY_RETURN) {
						this.blur();
						k.updateOrder(this.up('form'));				
					}
				});
			} else {
				item.observe("change",function(e){
					this.up().down(".value").update(this.value);
					k.updateInterval = clearInterval(k.updateInterval);
					k.updateInterval = setInterval(function(){
						k.updateInterval = clearInterval(k.updateInterval);
						k.updateOrder(this.up('form'));				
					}.bind(this),200);
				});
				

			}
			
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
			overbig:0
		};		
		for(var i = 0; i < this.order.length; i++){
			var hyllprice = this.order[i].hylla.price;
			total.gavel+=hyllprice.gavel;
			total.bakstycke+=hyllprice.bakstycke;
			total.hyllplan+=hyllprice.hyllplan;
			total.oversmall+=hyllprice.oversmall;
			total.overbig+=hyllprice.overbig;
		}
		trace("TOTAL PRICE");
		trace(total);

		var totalprice = 0;
		totalprice = total.gavel*PRICELIST.gavel;
		totalprice += total.bakstycke*PRICELIST.bakstycke;
		totalprice += total.hyllplan*PRICELIST.hyllplan;
		totalprice += total.oversmall*PRICELIST.oversmall;
		totalprice += total.overbig*PRICELIST.overbig;

		$("pricevalue").update(totalprice+":-");

		pricevalue

	},
	redraw:function(){

		if($("ritar").hasClassName("show")) return;
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
				var position = 3;
				//position = 3;
				if(o.type=="over"){
					if(i==this.order.length-1){
						//over is last
						position = 2;
 					} else {
 						//over is middle
 						position = 1;
 					}
				}
				trace("new hylla, position:"+position+", type:"+type);
				this.order[i].hylla = new hylla(this.paper,lastX,(o.h+s.margin),o.w,o.h,o.col,o.row,{
					position:position, type:type
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

var hylla = function(p, x, y, w, h, kol, plan,options){
	if(!options) options = {position:3, type:"std"};
	this._type=options.type;
	this._p = p;
	this._x = x;
	this._y = y;
	this._w = w;
	this._h = h;
	this._kol = kol;
	this._plan = plan;
	this.lines = [];

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
		
	};
	this.fillWith = function(thing,theX,theY,width){
		if(thing){
			var p = k.parts;
			var thingY  = (theY-p.plane.h)-thing.h;
			for(var x = 0; x < Math.floor(width/thing.w); x++){
				this._p.image("/images/"+thing.image+".png",theX+(x*thing.w),thingY,thing.w,thing.h);
			}
		}
	};
	this.redraw = function(){

		var price = {
				gavel:0,
				bakstycke:0,
				hyllplan:0,
				oversmall:0,
				overbig:0
			};		
		//basics
		var borderSize = 1;

		var maxX = this._x + this._w;
		var maxY = this._y -this._h;

		
		this.drawBox(this._w,this._h,this._x,this._y,{
			linecolor:"rgba(255,0,0,0.3)",
			fillcolor:k.style.bg,
			id:"bg"
		});
		
		

		var p = k.parts;
				
		var innerHeight = this._h;
		var innerWidth = (this._w + this._x) - (p.side.w);
		var kolBottom = this._y;
		if(options.position==1){
			//middle section
			innerWidth = (this._w + this._x);
			//right position
		} else if (options.position==2){
			//right
			this.drawBox(p.side.w , innerHeight , innerWidth, kolBottom,{
				fillcolor:k.style.sidefill
			});
			price.gavel++;
			
		} else {			
			//single hylla or left or right side			
			this.drawBox(p.side.w , innerHeight ,this._x, kolBottom,{
				fillcolor:k.style.sidefill
			});
			price.gavel++;
			
			//right
			this.drawBox(p.side.w , innerHeight , innerWidth, kolBottom,{
				fillcolor:k.style.sidefill
			});
			price.gavel++;
		}


		//kols)
		var sideWidth = p.side.w;
		var perKol = (this._w - ((p.kol.w * (this._kol-1)) + (sideWidth * 2))) / this._kol;
		var perPlan = (this._h - ((p.plane.h * (this._plan-1)))) / this._plan;

		if(options.position==2){
			//for single overs on the sides
			perKol = (this._w - ((p.kol.w * (this._kol-1)) + sideWidth)) / this._kol;
		}
		if(options.position==1){
			//for middle overs
			perKol = (this._w - (p.kol.w * (this._kol-1))) / this._kol;
		}

		var whatFits = function(w,h){
			var stuff = ["dvd","dvdopen","blueray","cd","pocket","cdopen","cdopen2"];

			var stuff = [];
			$("fillwithform").getInputs("checkbox").each(function(box){if(box.checked){stuff.push(box.getValue());}});

			//$("#fillwith");

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
				//standard hyllor
				if(i>0){
					this.drawBox(p.kol.w,innerHeight,(colX-p.kol.w) ,kolBottom,{
						fillcolor:k.style.kolfill
					})
					price.gavel++;
				}
				for(var u = 1; u < this._plan; u++){
					var planY = kolBottom - (u * perPlan);
					planY  = planY - ((u-1) * p.plane.h);
					this.drawBox(perKol,p.plane.h,(colX),planY,{
						fillcolor:k.style.planefill
					});
					price.hyllplan++;

					//fill the plane up
					var fits = whatFits(perKol,perPlan);
					if(fits.length>0){
						var thing = fits[Math.round(Math.random()*(fits.length-1))];
						this.fillWith(thing,colX,planY,perKol);
					}
					
				}
			}
			

			//bottom
			//differs from over and std hyllor,  no sockel on over hyllor, creating more 
			

			//sockel
			if(this._type=="std"){
				//top
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,p.plane.h,(colX),((kolBottom-this._h)+p.plane.h),{
					fillcolor:k.style.planefill
				});
				//sockelplan
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,p.plane.h,(colX),(kolBottom-p.bottom.b),{
					fillcolor:k.style.planefill
				});
				price.hyllplan++;
				//sockelbackgrund
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,p.bottom.b,(colX),(kolBottom),{
					fillcolor:k.style.sockelfill
				});
				//fill the bottom plane up
				var fits = whatFits(perKol,(perPlan-(p.bottom.b+p.plane.h)));
				var thing = fits[Math.round(Math.random()*(fits.length-1))];
				this.fillWith(thing,colX,(kolBottom-p.bottom.b),perKol);
			} else {
				

			}

			

			//sockel

		}

		//


		if(this._type=="over"){

			price.gavel = 0;
			if(this._w<=1450){
				price.oversmall = 1;
			} else {
				price.overbig = 1;
			}

			//over hyllor
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
			for(var u = 0; u < this._plan; u++){
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				
				for(var i = 0; i < this._kol; i++){
					var colX = startX + (i * perKol);
					if(options.position==2){
						colX = this._x + (i * perKol);
					}
					colX  = colX + (i * p.kol.w);
					if(i>0){
						this.drawBox(p.kol.w,(perPlan-p.plane.h),(colX-p.kol.w) ,(planY-(p.plane.h*(2-u))),{
							fillcolor:k.style.kolfill
						})

					}
					var fits = whatFits(perKol,perPlan);
					if(fits.length>0){
						var thing = fits[Math.round(Math.random()*(fits.length-1))];
						this.fillWith(thing,colX,(planY-(p.plane.h*(2-u)))+p.plane.h,perKol);
					}
					
				}

				if(u>0){
				this.drawBox(planWidth,p.plane.h,startX,planY,{
					fillcolor:k.style.planefill
				});
				}

				//fill the plane up
				/**
				var fits = whatFits(perKol,perPlan);
				if(fits.length>0){
					var thing = fits[Math.round(Math.random()*(fits.length-1))];
					this.fillWith(thing,startX,planY,planWidth);
				}
				**/
			}
			
			/**
			
			**/
			//top
			
			
			
			this.drawBox(planWidth,p.plane.h,startX,((kolBottom-this._h)+p.plane.h),{
				fillcolor:k.style.planefill
				
			});
			//sockelplan
			planY  = planY - ((u-1) * p.plane.h);
			this.drawBox(planWidth,p.plane.h,startX,(kolBottom),{
				fillcolor:k.style.planefill
			});
			//fill the bottom plane up
			//var thing = fits[Math.round(Math.random()*(fits.length-1))];
			//this.fillWith(thing,startX,(kolBottom),planWidth);
		}

		price.bakstycke = (price.gavel>0) ? (price.gavel - 1) : 0;

		this.price = price;
		trace(price);
		return price;


		/**
		//stomme
		var pathstr = 'M'+this._x+','+this._y+',L'+width+','+this._y+',L'+width+','+height+',L'+this._x+','+height+',L'+this._x+','+this._y+',Z';
		var line = this._p.path(pathstr);
		line.attr("stroke", "rgba(0,0,0,0.4)");	
		line.attr("stroke-width", "1");	

		//kols
		var perKol = this._w / this._kol;
		
		for(var i = 1; i < this._kol; i++){
			var colX = (i * perKol);
			
			var pathstr = 'M'+(colX)+','+(this._y-borderSize)+',L'+(colX)+','+(height+borderSize);
			var line = this._p.path(pathstr);
			line.attr("stroke", "rgba(0,0,0,0.4)");	
			line.attr("stroke-width", "1");		
		}

		//plan
		var perPlan = this._h / (this._plan+1);
		for(var u = 0; u < this._kol; u++){
			for(var i = 0; i < this._plan; i++){

				var planX = (u * perKol);
				var planY = (i * perPlan) + perPlan;
				var planXend = planX + perKol;
				planY = height + planY;
				var pathstr = 'M'+(planX+borderSize)+','+(planY)+',L'+(planXend-borderSize)+','+(planY);
				var line = this._p.path(pathstr);
				line.attr("stroke", "rgba(0,0,0,0.4)");	
				line.attr("stroke-width", "1");		
			}
		}
		**/
		
		
		



	}
	this.redraw();
}

var trace = function(str){
	console.log(str);
}