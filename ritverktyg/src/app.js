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
			if(item.name=="id") return true;
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
					trace("set to max");
					var newval = max;
				} else if(item.val < min){
					trace("set to min");
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

			trace(input);
			return true;
		},
		w:{
			min:function(order) {return k.parts.side.w*2;},
			max:function(order) {return 10000;}
		},
		h:{
			min:function(order) {
				trace("h.min");
				trace(order);
				return 1000;
			},
			max:function(order) {
				trace("h.max");
				trace(order);
				return 3050;
			}
		},
		col:{
			min:function(order) {
				var min = Math.ceil((order.w-k.parts.side.w) / (k.parts.kol.maxw+k.parts.kol.w)); 
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
		trace("updateOrder");
		var order = form.serialize(true);
		var oneFail = false;
		Object.keys(order).each(function(item){
			var val = parseInt(order[item]);
			if(k.validate.item(form,{val:val,name:item,order:order})){
				k.order[order.id][item] = val;
			} else {
				oneFail = true;
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
			trace("adding hide to active guidestep");
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
		trace("setup");
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
		k.nextGuideStep();

		
	},
	startUp:function(template){
		k.order = this.templates[template];
		var orderCount = k.order.length;
		k.order.each(function(order,index){
			k.addForm(index,order);
		});
		$$("#controls form").each(function(aForm){
			if(aForm.identify()!="orderForm"){
				k.updateOrder(aForm);
			}
		});
		this.resizePaper();
	},
	addForm:function(id,data){
		trace("addForm")
		var newForm = $("orderForm").clone(true);
		newForm.writeAttribute("id","form_"+id);
		newForm.writeAttribute("type",data.type);
		newForm.down('input[name=id]').value=id;
		newForm.down('strong').update("Sektion "+(id+1));
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
					trace("keyyo");
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
						trace("update now!");
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
		trace("remove form redraw");
		this.redraw();
	},
	redraw:function(){
		trace("redrawar");
		if($("ritar").hasClassName("show")) return;
		$("ritar").addClassName("show");
		setTimeout(function(){
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

			

			trace("paper w:"+w);
			trace("paper h:"+h);

			this.paper = new ScaleRaphael("stageinner", w,h);
			var lastX = s.margin;
			for(var i = 0; i < this.order.length; i++){
				var o = this.order[i];
				var type = o.type;
				trace("type:"+type);
				var position = 3;
				if(this.order.length>1){
					if(this.order.length>2){
						//en hylla med en sektion till höger eller vänster
					} else {
						trace("hej");
					}
					if(i==0){
						position=0;
					} else if(i>0 && i<(this.order.length-1)){
						position=1;
					} else {
						position=2;
					}
					if((position==1) && (this.order.length==5) && (i==2)){
						position = 3;
					}
				}
				this.order[i].hylla = new hylla(this.paper,lastX,(o.h+s.margin),o.w,o.h,o.col,o.row,{
					position:position, type:type
				});
				lastX = lastX + (o.w);
			}

			
			setTimeout(function(){
				k.resizePaper();
			},100);
			setTimeout(function(){
				k.resizePaper();
			},200);
			setTimeout(function(){
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
		trace("type:"+this._type);
		trace("position:"+options.position);
		if(options.position==1){
			//middle section
			innerWidth = (this._w + this._x);
			//right position
		} else if (options.position==2){
			//right

			this.drawBox(p.side.w , innerHeight , innerWidth, kolBottom,{
				fillcolor:k.style.sidefill
			});
			
		} else {			
			//single hylla or left or right side			
			this.drawBox(p.side.w , innerHeight ,this._x, kolBottom,{
				fillcolor:k.style.sidefill
			});
			
			//right
			this.drawBox(p.side.w , innerHeight , innerWidth, kolBottom,{
				fillcolor:k.style.sidefill
			});
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
			var stuff = ["dvd","blueray","cd","pocket"];
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
				}
				for(var u = 1; u < this._plan; u++){
					var planY = kolBottom - (u * perPlan);
					planY  = planY - ((u-1) * p.plane.h);
					this.drawBox(perKol,p.plane.h,(colX),planY,{
						fillcolor:k.style.planefill
					});

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
				//sockelbackgrund
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,p.bottom.b,(colX),(kolBottom),{
					fillcolor:k.style.sockelfill
				});
				//fill the bottom plane up
				var thing = fits[Math.round(Math.random()*(fits.length-1))];
				this.fillWith(thing,colX,(kolBottom-p.bottom.b),perKol);
			} else {
				

			}

			

			//sockel

		}

		//


		if(this._type=="over"){
			//over hyllor
			var planWidth = (this._w - (sideWidth * 2));
			var startX = this._x + p.side.w;
			if(options.position==2){
				startX = this._x;
				planWidth = (this._w - sideWidth);
			}
			for(var u = 0; u < this._plan; u++){
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				
				for(var i = 0; i < this._kol; i++){
					var colX = this._x + sideWidth + (i * perKol);
					if(options.position==2){
						colX = this._x + (i * perKol);
					}
					colX  = colX + (i * p.kol.w);
					if(i>0){
						trace("U");
						trace(u);
						this.drawBox(p.kol.w,(perPlan-p.plane.h),(colX-p.kol.w) ,(planY-(p.plane.h*(2-u))),{
							fillcolor:k.style.kolfill
						})
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
		return;


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
	trace("call redraw 1");
	this.redraw();
}

var trace = function(str){
	console.log(str);
}