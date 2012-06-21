Event.observe(window,"load",function(){
	trace("hEJ!");
	k.setup();
});

var k = {
	paper:null,
	settings:{
		margin:100,
	},
	order:{
		w:3800,
		h:4200,
		col:7,
		row:7
	},
	validate:{
		w:{
			min:function(order) {return k.parts.side*2;},
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
		plane:{
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
			var val = parseInt(order[item]);;
			if(val>=1){
				k.order[item] = val;
			} else {
				oneFail = true;
			}

		});
		if(oneFail){

		} else {
			this.redraw();	
		}
		
	},
	setup:function(){
		var windowAddEvent = window.attachEvent || window.addEventListener;
		
		Event.observe(window,"resize", function(){
			trace("on resize");
			k.resizePaper();
		});
		$("orderForm").getInputs().each(function(item){
			item.observe("keyup",function(e){
				k.updateOrder($("orderForm"));
			});
		});
		$("orderForm").observe("submit",function(e){
			e.stop();
			k.updateOrder($("orderForm"));
		});
	},
	redraw:function(){
		var s = this.settings;
		var o = this.order;

		var w = o.w+(s.margin*2);
		var h = o.h+(s.margin*2);

		trace("paper w:"+w);
		trace("paper h:"+h);

		this.paper = new ScaleRaphael("stageinner", o.w+(s.margin*2),o.h+(s.margin*2));
		this.hylla = new hylla(this.paper,s.margin,(o.h+s.margin),o.w,o.h,o.col,o.row);

		this.resizePaper();
		

	},
	resizePaper:function(){
		if(!this.paper){
			return;
		}
		trace("resize paper");
		var s = this.settings;
	   var w = 0, h = 0;
	   var dim = $("stage").getDimensions();
	   w = dim.width;
	   h = dim.height;
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
	}


}

var hylla = function(p, x, y, w, h, kol, plan){
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
		trace("Drawbox: W:"+w+" H:"+h+" x:"+x+" y:"+y);
		var boxArr = [
			x+","+y,
			(x+w)+","+y,
			(x+w)+","+(y-h),
			x+","+(y-h),
			x+","+y
		];

		var pathstr = "M" + boxArr.join(",L") + ",Z"
		trace(pathstr);
		
		var line = this._p.path(pathstr);
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
		$A(this.lines).each(function(line){

		})
		//this.drawBox(2000,1000,100,100);
		
		//basics
		var borderSize = 1;

		var maxX = this._x + this._w;
		var maxY = this._y -this._h;

		this.drawBox(this._w,this._h,this._x,this._y,{
			linecolor:"rgba(255,0,0,0.3)",
			fillcolor:k.style.bg,
		});
		

		var p = k.parts;
		
		
		//bottomfill
		/**
		trace("bottom");
		this.drawBox(this._w ,p.bottom.h, this._x, this._y,{
			fillcolor:k.style.bottomfill
		});

		//top
		trace("top");
		this.drawBox(this._w, p.top.h, this._x, maxY+p.top.h,{
			fillcolor:k.style.topfill
		});
		**/
		
		var innerHeight = this._h;
		var innerWidth = (this._w + this._x) - (p.side.w);
		var kolBottom = this._y;
		
		//left
		trace("left");
		this.drawBox(p.side.w , innerHeight ,this._x, kolBottom,{
			fillcolor:k.style.sidefill
		});
		
		//right
		trace("right");
		this.drawBox(p.side.w , innerHeight , innerWidth, kolBottom,{
			fillcolor:k.style.sidefill
		});


		//kols)
		var perKol = (this._w - ((p.kol.w * (this._kol-1)) + (p.side.w * 2))) / this._kol;
		trace("inner:"+(this._w-(p.side.w*2)));
		trace("perKol:"+perKol);
		var perPlan = (this._h - ((p.plane.h * (this._plan-1)))) / this._plan;
		trace("perPlan:"+perPlan);

		trace(this._kol);
		for(var i = 1; i < this._kol; i++){
			var colX = this._x + p.side.w + (i * perKol);
			//this.drawBox(p.kol.w,innerHeight,colX ,kolBottom)
		}

		for(var i = 0; i < this._kol; i++){
			var colX = this._x + p.side.w + (i * perKol);
			colX  = colX + (i * p.kol.w);
			trace("col:"+i);
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

			//bottom
			var planY = kolBottom - (u * perPlan);
			planY  = planY - ((u-1) * p.plane.h);
			this.drawBox(perKol,p.plane.h,(colX),(kolBottom-p.bottom.b),{
				fillcolor:k.style.planefill
			});
			//top
			var planY = kolBottom - (u * perPlan);
			planY  = planY - ((u-1) * p.plane.h);
			this.drawBox(perKol,p.plane.h,(colX),((kolBottom-this._h)+p.plane.h),{
				fillcolor:k.style.planefill
			});
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
		trace(this._kol);
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
				trace("a plan");
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