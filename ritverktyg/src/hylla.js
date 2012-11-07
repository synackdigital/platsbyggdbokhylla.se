var hylla = function(p, x, y, w, h, kol, plan, sockel, bakstycke, singledoor, options){
	if(!options) options = {position:3, type:"std", modell:"ribersborg"};
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
	this._singledoor = (singledoor == 1) ? true : false;
	this._bakstycke = (bakstycke == 1) ? true : false;

	trace("this._bakstycke");
	trace(this._bakstycke);
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
			var masterID = e.srcElement.raphaelid;
			for (var i = 0; i < k.doors_open.length; i++){
				var openDoor = 	k.doors_open[i];
				if(openDoor.parent==masterID){
					var el = k.paper.getById(openDoor.id);
					
					if(openDoor.parent == openDoor.id){
						if(masterID != openDoor.id){
							el.hide();
						}
					} else {
						el.animate({"path":openDoor.path},300,"ease-out",function(){

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
				if(!k.fillCache[thing.id]) k.fillCache[thing.id] = Math.round(Math.random()*(thing.open.length-1));
				var openThing = thing.open[k.fillCache[thing.id]];
				if(width>=openThing.w){
					
					var theX = theX;
					
					var widthLeft = width - openThing.w;
					
					var stepsLeft = Math.floor(widthLeft/thing.w);
					
					var theX = theX + thing.w*Math.round(Math.random()*stepsLeft);
					
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
		if(this._bakstycke){
			this.drawBox(this._w,this._h,this._x,kolBottom,{
				linecolor:"rgba(255,0,0,0.3)",
				fillcolor:k.style.bg,
				id:"bg"
			});
		}

		if(this._modell=="davidhall" && this._type=="std"){
			this.drawBox(this._w,(p.skap.h-10),this._x,this._y-10,{
				linecolor:"rgba(255,0,0,0.3)",
				fillcolor:"90-#efefef-#ddd",
				id:"bgskap"
			});
		
		}

		

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
			perKol = (this._w - ((p.kol.w * (this._kol-1)) + sideWidth)) / this._kol;
		}
		if(options.position==1){
			//for middle overs
			perKol = (this._w - (p.kol.w * (this._kol-1))) / this._kol;
		}

		var whatFits = function(w,h){
			var stuff = ["dvd","blueray","cd","pocket"];

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
				var fits = whatFits(perKol,(perPlan-(p.plane.h)));
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
			if(options.position==2){
				startX = this._x;
				planWidth = (this._w - sideWidth);
			}
			if(options.position==4){
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