Event.observe(window,"load",function(){
	k.setup();
});

var k = {
	updateInterval:null,
	paper:null,
	settings:{
		margin:100
	},
	templates:{
		standard:[{
			w:1800,
			h:2400,
			col:4,
			row:4
		}],
		onewin:[
			{
				w:1800,
				h:2400,
				col:4,
				row:4
			},
			{
				w:1200,
				h:500,
				col:2,
				row:2
			},
			{
				w:1800,
				h:2400,
				col:4,
				row:4
			}
		],
		twowin:[
			{
				w:1800,
				h:2400,
				col:4,
				row:8
			},
			{
				w:1200,
				h:500,
				col:2,
				row:2
			},
			{
				w:1800,
				h:2400,
				col:4,
				row:8
			},
			{
				w:1200,
				h:500,
				col:2,
				row:2
			},
			{
				w:1800,
				h:2400,
				col:4,
				row:8
			}
		],
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
					this.removeClassName("error")
					this.value=newval;
					k.updateOrder(this.up('form'));

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
			min:function(order) {return 1000;},
			max:function(order) {return 3050;}
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
	parts:{
		bottom:{h:22,b:0},
		side:{w:22},
		plane:{h:22,minamount:1},
		kol:{w:22,minw:350,maxw:750},
		dvd:{h:190,w:18,name:"DVD",image:"dvd"},
		blueray:{h:172,w:16,name:"Blueray",image:"blueray"}
	},
	styleback:{
		bg:"135-#fff-#eee",
		linecolor:"rgba(102,102,102,1)",
		planefill:null,
		kolfill:null,
		sidefill:null,
		topfill:null,
		bottomfill:null,
	},
	styleback2:{
		bg:"135-#fff-#eee",
		linecolor:"rgba(102,102,102,1)",
		planefill:"90-#eee-#fff",
		kolfill:"0-#eee-#fff",
		sidefill:"0-#eee-#fff",
		topfill:"90-#eee-#fff",
		bottomfill:"90-#eee-#fff",
	},
	style:{
		bg:"135-#fff-#eee",
		linecolor:"rgba(30,30,30,1)",
		planefill:"90-#F5F5F5-#fff",
		kolfill:"0-#F5F5F5-#fff",
		sidefill:"0-#F5F5F5-#fff",
		topfill:"90-#F5F5F5-#fff",
		bottomfill:"90-#F5F5F5-#fff",
	},
	updateOrder:function(form){
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
			this.redraw();
		}

	},
	setup:function(){
		var windowAddEvent = window.attachEvent || window.addEventListener;

		Event.observe(window,"resize", function(){
			k.resizePaper();
		});

		$$(".choice").each(function(choice){
			choice.observe("click",function(){

				$("rita_start").addClassName("hide");
				setTimeout(function(){
					$("rita_start").remove();
					k.startUp(this.readAttribute("template"));
				}.bind(this),1100);
			})
		});


	},
	startUp:function(template){
		k.order = this.templates[template];
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
		var newForm = $("orderForm").clone(true);
		newForm.writeAttribute("id","form_"+id);
		newForm.down('input[name=id]').value=id;
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
					trace(this.up(1));
					trace(this.up(1).down("input"));
					trace(this.up(1).down("input").value);
					this.up(1).down("input").value=parseInt(this.innerHTML);
					k.updateOrder(this.up('form'));
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
		this.redraw();
	},
	redraw:function(){
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
			var position = 3;
			if(this.order.length>1){
				if(i==0){
					position=0;
				} else if(i>0 && i<(this.order.length-1)){
					position=1;
				} else {
					position=2;
				}
			}
			this.order[i].hylla = new hylla(this.paper,lastX,(o.h+s.margin),o.w,o.h,o.col,o.row,{
				position:position
			});
			lastX = lastX + (o.w);
		}

		this.resizePaper();


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
	}


}

var hylla = function(p, x, y, w, h, kol, plan,options){
	if(!options) options = {position:3};
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
			innerWidth = (this._w + this._x);
		} else {
			this.drawBox(p.side.w , innerHeight ,this._x, kolBottom,{
				fillcolor:k.style.sidefill
			});

			this.drawBox(p.side.w , innerHeight , innerWidth, kolBottom,{
				fillcolor:k.style.sidefill
			});
		}


		var sideWidth = p.side.w;
		if(options.position==1){
			sideWidth = 0;
		}

		var perKol = (this._w - ((p.kol.w * (this._kol-1)) + (sideWidth * 2))) / this._kol;
		var perPlan = (this._h - ((p.plane.h * (this._plan-1)))) / this._plan;

		var whatFits = function(w,h){
			var stuff = ["dvd","blueray"];
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
			colX  = colX + (i * p.kol.w);
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

				var fits = whatFits(perKol,perPlan);
				if(fits.length>0){
					var thing = fits[Math.round(Math.random()*(fits.length-1))];
					this.fillWith(thing,colX,planY,perKol);
				}

			}

			var planY = kolBottom - (u * perPlan);
			planY  = planY - ((u-1) * p.plane.h);
			this.drawBox(perKol,p.plane.h,(colX),(kolBottom-p.bottom.b),{
				fillcolor:k.style.planefill
			});

			var thing = fits[Math.round(Math.random()*(fits.length-1))];
			this.fillWith(thing,colX,(kolBottom-p.bottom.b),perKol);



			var planY = kolBottom - (u * perPlan);
			planY  = planY - ((u-1) * p.plane.h);
			this.drawBox(perKol,p.plane.h,(colX),((kolBottom-this._h)+p.plane.h),{
				fillcolor:k.style.planefill
			});
		}

		return;








	}

	this.redraw();
}

var trace = function(str){
	console.log(str);
}
