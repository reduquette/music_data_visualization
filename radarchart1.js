
// let vlSpec = {
//   "$schema": "https://vega.github.io/schema/vega/v5.json",
//   "width": 300,
//   "height": 300,
//   "padding": 10,
//   "autosize": {"type": "none", "contains": "padding"},

//   "signals": [
//     {"name": "radius", "update": "width / 2"}
//   ],

//   "data": [
//     {
//       "name": "table",
//       "values": [
        // {"key": "acousticness", "value": 0.623, "category": 0},
        // {"key": "danceability", "value": 0.46, "category": 0},
        // {"key": "energy", "value": 0.25, "category": 0},
        // {"key": "acousticness", "value": 0.46, "category": 2},
        // {"key": "danceability", "value": 0.64, "category": 2},
        // {"key": "energy", "value": 0.97, "category": 2}
//       ]
//     },
//     {
//       "name": "keys",
//       "source": "table",
//       "transform": [
//         {
//           "type": "aggregate",
//           "groupby": ["key"]
//         }
//       ]
//     }
//   ],
//   "scales": [
//     {
//       "name": "angular",
//       "type": "point",
//       "range": {"signal": "[-PI, PI]"},
//       "padding": 0.5,
//       "domain": {"data": "table", "field": "key"}
//     },
//     {
//       "name": "radial",
//       "type": "linear",
//       "range": {"signal": "[0, radius]"},
//       "zero": true,
//       "nice": false,
//       "domain": {"data": "table", "field": "value"},
//       "domainMin": 0
//     },
//     {
//       "name": "color",
//       "type": "ordinal",
//       "domain": {"data": "table", "field": "category"},
//       "range": {"scheme": "plasma"}
//     }
//   ],

//   "encode": {
//     "enter": {
//       "x": {"signal": "radius"},
//       "y": {"signal": "radius"}
//     }
//   },

//   "marks": [
//     {
//       "type": "group",
//       "name": "categories",
//       "zindex": 1,
//       "from": {
//         "facet": {"data": "table", "name": "facet", "groupby": ["category"]}
//       },
//       "marks": [
//         {
//           "type": "line",
//           "name": "category-line",
//           "from": {"data": "facet"},
//           "encode": {
//             "enter": {
//               "interpolate": {"value": "linear-closed"},
//               "x": {"signal": "scale('radial', datum.value) * cos(scale('angular', datum.key))"},
//               "y": {"signal": "scale('radial', datum.value) * sin(scale('angular', datum.key))"},
//               "stroke": {"scale": "color", "field": "category"},
//               "strokeWidth": {"value": 1},
//               "fill": {"scale": "color", "field": "category"},
//               "fillOpacity": {"value": 0.1}
//             }
//           }
//         },
//         {
//           "type": "text",
//           "name": "value-text",
//           "from": {"data": "category-line"},
//           "encode": {
//             "enter": {
//               "x": {"signal": "datum.x"},
//               "y": {"signal": "datum.y"},
//               "text": {"signal": "datum.datum.value"},
//               "align": {"value": "left"},
//               "baseline": {"value": "top"},
//               "dx": {"value": -23},
//               "dy": {"value": -7},
//               "fontSize": {"value": 12},
//               "fontWeight": {"value": "bold"},
//               "angle": {"value": 30},
//               "fill": {"value": "#"}
//             }
//           }
//         }
//       ]
//     },
//     {
//       "type": "rule",
//       "name": "radial-grid",
//       "from": {"data": "keys"},
//       "zindex": 0,
//       "encode": {
//         "enter": {
//           "x": {"value": 0},
//           "y": {"value": 0},
//           "x2": {"signal": "radius * cos(scale('angular', datum.key))"},
//           "y2": {"signal": "radius * sin(scale('angular', datum.key))"},
//           "stroke": {"value": "lightgray"},
//           "strokeWidth": {"value": 1}
//         }
//       }
//     },
//     {
//       "type": "text",
//       "name": "key-label",
//       "from": {"data": "keys"},
//       "zindex": 1,
//       "encode": {
//         "enter": {
//           "x": {"signal": "(radius + 5) * cos(scale('angular', datum.key))"},
//           "y": {"signal": "(radius + 5) * sin(scale('angular', datum.key))"},
//           "text": {"field": "key"},
//           "align": [
//             {
//               "test": "abs(scale('angular', datum.key)) > PI / 2",
//               "value": "right"
//             },
//             {
//               "value": "left"
//             }
//           ],
//           "baseline": [
//             {
//               "test": "scale('angular', datum.key) > 0", "value": "top"
//             },
//             {
//               "test": "scale('angular', datum.key) == 0", "value": "middle"
//             },
//             {
//               "value": "bottom"
//             }
//           ],
//           "fill": {"value": "#"},
//           "fontWeight": {"value": "bold"}
//         }
//       }
//     },
//     {
//       "type": "line",
//       "name": "outer-line",
//       "from": {"data": "radial-grid"},
//       "encode": {
//         "enter": {
//           "interpolate": {"value": "linear-closed"},
//           "x": {"field": "x2"},
//           "y": {"field": "y2"},
//           "stroke": {"value": "#"},
//           "strokeWidth": {"value": 1}
//         }
//       }
//     }
//   ]
// }

// vegaEmbed('#radar1', vlSpec);

// {"key": "acousticness", "value": 0.625, "category": 0},
// {"key": "danceability", "value": 0.461, "category": 0},
// {"key": "energy", "value": 0.254, "category": 0},
// {"key": "acousticness", "value": 0.0761, "category": 1},
// {"key": "danceability", "value": 0.738, "category": 1},
// {"key": "energy", "value": 0.519, "category": 1},
// {"key": "acousticness", "value": 0.463, "category": 2},
// {"key": "danceability", "value": 0.644, "category": 2},
// {"key": "energy", "value": 0.972, "category": 2},
// {"key": "acousticness", "value": 0.0238, "category": 3},
// {"key": "danceability", "value": 0.804, "category": 3},
// {"key": "energy", "value": 0.682, "category": 3}


const max = Math.max;
const sin = Math.sin;
const cos = Math.cos;
const HALF_PI = Math.PI / 2;

const RadarChart = function RadarChart(parent_selector, data, options) {
	//Wraps SVG text - Taken from http://bl.ocks.org/mbostock/7555321
	const wrap = (text, width) => {
	  text.each(function() {
			var text = d3.select(this),
				words = text.text().split(/\s+/).reverse(),
				word,
				line = [],
				lineNumber = 0,
				lineHeight = 1.4, // ems
				y = text.attr("y"),
				x = text.attr("x"),
				dy = parseFloat(text.attr("dy")),
				tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

			while (word = words.pop()) {
			  line.push(word);
			  tspan.text(line.join(" "));
			  if (tspan.node().getComputedTextLength() > width) {
					line.pop();
					tspan.text(line.join(" "));
					line = [word];
					tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			  }
			}
	  });
	}//wrap

	const cfg = {
	 w: 600,				
	 h: 600,				
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, 
	 levels: 3,			
	 maxValue: 0, 			
	 labelFactor: 1.25, 	
	 wrapWidth: 60, 		
	 opacityArea: 0.35, 	
	 dotRadius: 4, 			
	 opacityCircles: 0.1, 
	 strokeWidth: 2, 		
	 roundStrokes: false,
	 color: d3.scaleOrdinal(d3.interpolatePlasma),	
	 format: '.2%',
	 unit: '',
	 legend: false
	};

	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }
	}


	let maxValue = 0;
	for (let j=0; j < data.length; j++) {
		for (let i = 0; i < data[j].axes.length; i++) {
			data[j].axes[i]['id'] = data[j].name;
			if (data[j].axes[i]['value'] > maxValue) {
				maxValue = data[j].axes[i]['value'];
			}
		}
	}
	maxValue = max(cfg.maxValue, maxValue);

	const allAxis = data[0].axes.map((i, j) => i.axis),	
		total = allAxis.length,					
		radius = Math.min(cfg.w/2, cfg.h/2), 	
		Format = d3.format(cfg.format),			 
		angleSlice = Math.PI * 2 / total;	

	//Scale for the radius
	const rScale = d3.scaleLinear()
		.range([0, radius])
		.domain([0, maxValue]);


	const parent = d3.select(parent_selector);

	//Remove whatever chart with the same id/class was present before
	parent.select("svg").remove();

	//Initiate the radar chart SVG
	let svg = parent.append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar");

	//Append a g element
	let g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

	//Filter for the outside glow
	let filter = g.append('defs').append('filter').attr('id','glowRadar'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');


	//Wrapper for the grid & axes
	let axisGrid = g.append("g").attr("class", "axisWrapper");

	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", d => radius / cfg.levels * d)
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glowRadar)");

	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", (d, i) => rScale(maxValue *1.1) * cos(angleSlice * i - HALF_PI))
		.attr("y2", (d, i) => rScale(maxValue* 1.1) * sin(angleSlice * i - HALF_PI))
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", (d,i) => rScale(maxValue * cfg.labelFactor) * cos(angleSlice * i - HALF_PI))
		.attr("y", (d,i) => rScale(maxValue * cfg.labelFactor) * sin(angleSlice * i - HALF_PI))
		.text(d => d)
		.call(wrap, cfg.wrapWidth);

	//The radial line function
	const radarLine = d3.radialLine()
		.curve(d3.curveLinearClosed)
		.radius(d => rScale(d.value))
		.angle((d,i) => i * angleSlice);

	if(cfg.roundStrokes) {
		radarLine.curve(d3.curveCardinalClosed)
	}

	//Create a wrapper for the blobs
	const blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarWrapper");

	//Append the backgrounds
	blobWrapper
		.append("path")
		.attr("class", "radarArea")
		.attr("d", d => radarLine(d.axes))
		.style("fill", (d,i) => cfg.color(i))
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function(d, i) {
			//Dim all blobs
			parent.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", 0.1);
			//Bring back the hovered over blob
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.7);
		})
		.on('mouseout', () => {
			//Bring back all blobs
			parent.selectAll(".radarArea")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});

	//Create the outlines
	blobWrapper.append("path")
		.attr("class", "radarStroke")
		.attr("d", function(d,i) { return radarLine(d.axes); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", (d,i) => cfg.color(i))
		.style("fill", "none")
		.style("filter" , "url(#glowRadar)");

	blobWrapper.selectAll(".radarCircle")
		.data(d => d.axes)
		.enter()
		.append("circle")
		.attr("class", "radarCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", (d,i) => rScale(d.value) * cos(angleSlice * i - HALF_PI))
		.attr("cy", (d,i) => rScale(d.value) * sin(angleSlice * i - HALF_PI))
		.style("fill", (d) => cfg.color(d.id))
		.style("fill-opacity", 0.8);

	const blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");

	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(d => d.axes)
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius * 1.5)
		.attr("cx", (d,i) => rScale(d.value) * cos(angleSlice*i - HALF_PI))
		.attr("cy", (d,i) => rScale(d.value) * sin(angleSlice*i - HALF_PI))
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(event,d) {
			console.log(d.value)
			tooltip
				.attr('x', this.cx.baseVal.value - 10)
				.attr('y', this.cy.baseVal.value - 10)
				.transition()
				.style('display', 'block')
				.style('fill', 'magenta')
				.style('background-color', '#FFFFF')
				.style('font-weight', 'bold')
				.text((d.value));
		})
		.on("mouseout", function(){
			tooltip.transition()
				.style('display', 'none').text('');
		});

	const tooltip = g.append("text")
		.attr("class", "tooltip")
		.attr('x', 0)
		.attr('y', 0)
		.style("font-size", "12px")
		.style('display', 'none')
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em");

	if (cfg.legend !== false && typeof cfg.legend === "object") {
		let legendZone = svg.append('g');
		let names = data.map(el => el.name);
		if (cfg.legend.title) {
			let title = legendZone.append("text")
				.attr("class", "title")
				.attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY})`)
				.attr("x", cfg.w - 70)
				.attr("y", 10)
				.attr("font-size", "12px")
				.attr("fill", "white")
				.text(cfg.legend.title);
		}
		let legend = legendZone.append("g")
			.attr("class", "legend")
			.attr("height", 100)
			.attr("width", 200)
			.attr('transform', `translate(${cfg.legend.translateX},${cfg.legend.translateY + 20})`);
		// Create rectangles markers
		legend.selectAll('rect')
		  .data(names)
		  .enter()
		  .append("rect")
		  .attr("x", cfg.w - 65)
		  .attr("y", (d,i) => i * 20)
		  .attr("width", 10)
		  .attr("height", 10)
		  .attr("font-family", "Lato")
		  .style("fill", (d,i) => cfg.color(i));
		// Create labels
		legend.selectAll('text')
		  .data(names)
		  .enter()
		  .append("text")
		  .attr("x", cfg.w - 52)
		  .attr("y", (d,i) => i * 20 + 9)
		  .attr("font-size", "11px")
		  .attr("font-family", "Lato")
		  .attr("fill", "white")
		  .text(d => d);
	}
	return svg;
}