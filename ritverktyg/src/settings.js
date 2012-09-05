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
			row:4,
			sockel:60
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
	sockel_davidshall:20,
	overlay:{minw:300,maxw:2010,minh:200,maxh:1000},
	bottom:{h:22,b:60},
	side:{w:22},
	side_davidhall:{w:32},
	plane:{h:22,minamount:1},
	kol:{w:22,minw:350,maxw:750},
	kol_davidhall:{w:32,minw:350,maxw:750},
	dvd:{
		h:190,w:18,name:"DVD",image:"dvd",
		open:[{h:190,w:136,name:"DVD",image:"dvd-open"}]
	},
	blueray:{h:172,w:16,name:"Blueray",image:"blueray"},
	cd:{
		h:120,w:12,name:"CD-skiva",image:"cd",
		open:[
			{h:120,w:120,name:"CD-skiva",image:"cd-open"},
			{h:120,w:120,name:"CD-skiva",image:"cd-open2"}
		]
	},
	pocket:{h:180,w:30,name:"Pocket",image:"pocket"},
	bok:{h:220,w:13,name:"Inbunden bok",image:"bok"}
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