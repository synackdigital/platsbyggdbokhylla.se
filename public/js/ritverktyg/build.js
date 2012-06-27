Event.observe(window,"load",function(){
	k.setup();
});

var k = {
	paper:null,
	settings:{
		margin:100
	},
	order:[
		{
			w:1800,
			h:2400,
			col:4,
			row:4
		},
		{
			w:1200,
			h:1000,
			col:4,
			row:4
		},
		{
			w:1800,
			h:2400,
			col:4,
			row:4
		}
	],
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
				itemElement.addClassName("error");
			}
			itemElement.down('.value').update(item.val);
			itemElement.down('.max').update(max);
			itemElement.down('.min').update(min);
			var input = itemElement.down('input');
			input.writeAttribute("max",max);
			input.writeAttribute("min",min);

			return valid;
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
				var min = Math.ceil((order.w-k.parts.side.w) / (k.parts.kol.maxw+k.parts.kol.w));
				return min;
			},
			max:function(order) {
				var max = Math.ceil((order.w-k.parts.side.w) / (k.parts.kol.minw+k.parts.kol.w));
				(2300-(22))/(350+22)
				return max;
			}
		}
	},
	parts:{
		bottom:{h:22,b:0},
		side:{w:22},
		plane:{h:22},
		kol:{w:22,minw:350,maxw:750}
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

		k.order.each(function(order,index){
			k.addForm(index,order);
		});
		$$("#controls form").each(function(aForm){
			k.updateOrder(aForm);
		});
	},
	addForm:function(id,data){
		var newForm = $("orderForm").clone(true);
		newForm.down('input[name=id]').value=id;
		newForm.getInputs().each(function(item){
			if(item.name!="id"){
				item.value = data[item.name];
			}
			item.observe("change",function(e){
					k.updateOrder(this.up('form'));
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
	   trace(this.paper);
	   trace(scale);

	   var innerHeight = Math.ceil(this.paper.h * scale);
	   var outerHeight = $("stageinner").getDimensions().height;
	   if(innerHeight>outerHeight){
	   	outerHeight = innerHeight;
	   }
	   var floorHeight = ((outerHeight - innerHeight)/2)+50;

	   trace("outerHeight:"+outerHeight);
	   trace("innerHeight:"+innerHeight);
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
	trace("hylla:");
	trace("w:"+w+" h:"+h);
	trace("x:"+x+" y:"+y);
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
		line.attr("stroke-width", "1");

	}
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
			}

			var planY = kolBottom - (u * perPlan);
			planY  = planY - ((u-1) * p.plane.h);
			this.drawBox(perKol,p.plane.h,(colX),(kolBottom-p.bottom.b),{
				fillcolor:k.style.planefill
			});
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
