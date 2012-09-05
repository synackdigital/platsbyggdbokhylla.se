var hylla = function(p, x, y, w, h, kol, plan, sockel, options){
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

		var pathstr = "M" + boxArr.join(",L") + ",Z";
		var line = this._p.path(pathstr);

		if(options.door){
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
			door:true,
			side:side
		});
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
		//basics
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


		//bakstycke
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
			//middle section
			innerWidth = (this._w + this._x);
			//right position
		} else if (options.position==2){
			//right
			this.drawBox(p.side.w , this._h , innerWidth, kolBottom,{
				fillcolor:k.style.sidefill
			});
			price.gavel++;
		} else if (options.position==4){
			//right
			this.drawBox(p.side.w , this._h , this._x, kolBottom,{
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

		if(options.position==2 || options.position==4){
			//for single overs on the sides
			trace("perKol change");
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
			if(options.position==2 && options.position==4){
				colX = this._x + (i * perKol);
				trace("colX fix ");
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
				if(this._modell=="davidhall" && i>0){
					//render gavlar for underskap
					this.drawBox(p.skap.gavel,p.skap.h,(colX-p.kol.w) ,this._y,{
						fillcolor:k.style.kolfill
					})
					this.drawBox(p.skap.gavel,p.skap.h,(colX-p.kol.w)+p.skap.gavel ,this._y,{
						fillcolor:k.style.kolfill
					})
					
				}
				if(this._modell=="davidhall"){
					//render mitten hylla underskap
					this.drawBox(perKol,p.plane.h,colX,(this._y-(p.skap.h/2)),{
						fillcolor:k.style.planefill
					});
					//render botten hylla underskap
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
			

			//sockel & top
			if(this._type=="std" && this._modell=="ribersborg"){
				//top
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,p.plane.h,(colX),((kolBottom-this._h)+p.plane.h),{
					fillcolor:k.style.planefill
				});
				//sockelplan
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,p.plane.h,(colX),(kolBottom-this._sockel),{
					fillcolor:k.style.planefill
				});
				price.hyllplan++;
				//sockelbackgrund
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,this._sockel,(colX),(kolBottom),{
					fillcolor:k.style.sockelfill
				});
				//fill the bottom plane up
				var fits = whatFits(perKol,(perPlan-(this._sockel+p.plane.h)));
				var thing = fits[Math.round(Math.random()*(fits.length-1))];
				this.fillWith(thing,colX,(kolBottom-this._sockel),perKol);
			} else if(this._type=="std" && this._modell=="davidhall"){
				//top
				var planY = kolBottom - (u * perPlan);
				planY  = planY - ((u-1) * p.plane.h);
				this.drawBox(perKol,p.plane.h,(colX),((kolBottom-this._h)+p.plane.h),{
					fillcolor:k.style.planefill
				});
				//fill the bottom plane up
				var fits = whatFits(perKol,(perPlan-(this._sockel+p.plane.h)));
				var thing = fits[Math.round(Math.random()*(fits.length-1))];
				this.fillWith(thing,colX,(kolBottom+p.plane.h),perKol);
			} else {
				

			}

			

			//sockel

		}


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
			//top
			var theWidth = (options.position==2) ? planWidth : planWidth+p.plane.h;
			this.drawBox(theWidth,p.plane.h,startX,((kolBottom-this._h)+p.plane.h),{
				fillcolor:k.style.planefill
				
			});
			//bottom
			this.drawBox(theWidth,p.plane.h,startX,(kolBottom),{
				fillcolor:k.style.planefill
			});
		}

		if(this._type=="std" && this._modell=="davidhall"){
			//draw the skap

			//skiva
			this.drawBox(this._w, p.skap.skiva ,this._x, (this._y-p.skap.h),{
				fillcolor:k.style.skapskiva
			});

			//tacksida left
			this.drawBox(p.skap.gavel, p.skap.h ,this._x, this._y,{
				fillcolor:k.style.sidefill
			});
			this.drawBox(p.skap.gavel, p.skap.h ,this._x+p.skap.gavel, this._y,{
				fillcolor:k.style.sidefill
			});
			//tacksida right
			this.drawBox(p.skap.gavel, p.skap.h ,this._x+(this._w-p.skap.gavel), this._y,{
				fillcolor:k.style.sidefill
			});
			this.drawBox(p.skap.gavel, p.skap.h ,this._x+(this._w-(p.skap.gavel*2)), this._y,{
				fillcolor:k.style.sidefill
			});			

		}

		//doors for davidhall
		
		var doorY = this._y - (p.skap.h-p.skap.dorrh);
		for(var i = 0; i < this._kol; i++){
			var colX = this._x + sideWidth + (i * perKol);
			colX  = colX + (i * p.kol.w);
			if(this._type=="std"){
				if(this._modell=="davidhall"){
					//render dörrar
					var doorW = perKol + (p.skap.gavel*2);
					if(this._singledoor){
					//if(true){
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