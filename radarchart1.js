// let data = [];
// let features = ["Acousticness","Energy", "Dance"];
// //generate the data
// for (var i = 0; i < 3; i++){
//     var point = {}
//     //each feature will be a random number from 1-9
//     features.forEach(f => point[f] = 1 + Math.random() * 8);
//     data.push(point);
// }
// console.log(data);


// let svg = d3.select("body").append("svg")
//     .attr("width", 600)
//     .attr("height", 600)
//     .style("padding-left", "25%")
//     .style("padding-right", "25%;")


// let radialScale = d3.scaleLinear()
//     .domain([0,10])
//     .range([0,250]);
// let ticks = [2,4,6,8,10];


// ticks.forEach(t =>
//     svg.append("circle")
//     .attr("cx", 300)
//     .attr("cy", 300)
//     .attr("fill", "none")
//     .attr("stroke", "white")
//     .attr("r", radialScale(t))
// );


// function angleToCoordinate(angle, value){
//     let x = Math.cos(angle) * radialScale(value);
//     let y = Math.sin(angle) * radialScale(value);
//     return {"x": 300 + x, "y": 300 - y};
// }


// for (var i = 0; i < features.length; i++) {
//     let ft_name = features[i];
//     let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
//     let line_coordinate = angleToCoordinate(angle, 10);
//     let label_coordinate = angleToCoordinate(angle, 10.5);

//     //draw axis line
//     svg.append("line")
//     .attr("x1", 300)
//     .attr("y1", 300)
//     .attr("x2", line_coordinate.x)
//     .attr("y2", line_coordinate.y)
//     .attr("stroke","white");

//     //draw axis label
//     svg.append("text")
//     .attr("x", label_coordinate.x)
//     .attr("y", label_coordinate.y)
//     .text(ft_name);
// }

// let line = d3.line()
//     .x(d => d.x)
//     .y(d => d.y);
// let colors = ["darkorange", "gray", "navy"];


// function getPathCoordinates(data_point){
//     let coordinates = [];
//     for (var i = 0; i < features.length; i++){
//         let ft_name = features[i];
//         let angle = (Math.PI / 2) + (2 * Math.PI * i / features.length);
//         coordinates.push(angleToCoordinate(angle, data_point[ft_name]));
//     }
//     return coordinates;
// }


// for (var i = 0; i < data.length; i ++){
//     let d = data[i];
//     let color = colors[i];
//     let coordinates = getPathCoordinates(d);

//     //draw the path element
//     svg.append("path")
//     .datum(coordinates)
//     .attr("d",line)
//     .attr("stroke-width", 3)
//     .attr("stroke", color)
//     .attr("fill", color)
//     .attr("stroke-opacity", 1)
//     .attr("opacity", 0.5);
// }


// //Song longest on the charts
// // Since U Been Gone, 46 weeks 2004
// // The Twist 39 weeks 1960 
// // How Deep Is Your Love 33 weeks 1977 
// // Hey Ya 32 weeks 2003

// d3.csv('comboSongs.csv', d3.autoType).then(data => {

//   data.forEach(function(d) {
//     var title = d.title 
//     if (title == "The Twist") {

//     } else if (title == "How Deep Is Your Love") {

//     } else if (title == "Hey Ya") {

//     } else if (title == "Since U Been Gone") {

//     } 
//   })


// })

let vlSpec = {
  "$schema": "https://vega.github.io/schema/vega/v5.json",
  "description": "A radar chart example, showing multiple dimensions in a radial layout.",
  "width": 450,
  "height": 500,
  "padding": 20,
  "autosize": {"type": "none", "contains": "padding"},

  "signals": [
    {"name": "radius", "update": "width / 2"}
  ],

  "data": [
    {
      "name": "table",
      "values": [
        {"key": "acousticness", "value": 0.623, "category": 0},
        {"key": "danceability", "value": 0.46, "category": 0},
        {"key": "energy", "value": 0.25, "category": 0},
        {"key": "acousticness", "value": 0.46, "category": 2},
        {"key": "danceability", "value": 0.64, "category": 2},
        {"key": "energy", "value": 0.97, "category": 2}
      ]
    },
    {
      "name": "keys",
      "source": "table",
      "transform": [
        {
          "type": "aggregate",
          "groupby": ["key"]
        }
      ]
    }
  ],
  "mark": {"type": "point", "tooltip": {"content": "data"}}, 
  "scales": [
    {
      "name": "angular",
      "type": "point",
      "range": {"signal": "[-PI, PI]"},
      "padding": 0.5,
      "domain": {"data": "table", "field": "key"}
    },
    {
      "name": "radial",
      "type": "linear",
      "range": {"signal": "[0, radius]"},
      "zero": true,
      "nice": false,
      "domain": {"data": "table", "field": "value"},
      "domainMin": 0
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": {"data": "table", "field": "category"},
      "range": {"scheme": "plasma"}
    }
  ],

  "encode": {
    "enter": {
      "x": {"signal": "radius"},
      "y": {"signal": "radius"}
    }
  },

  "marks": [
    {
      "type": "group",
      "name": "categories",
      "zindex": 1,
      "from": {
        "facet": {"data": "table", "name": "facet", "groupby": ["category"]}
      },
      "marks": [
        {
          "type": "line",
          "name": "category-line",
          "from": {"data": "facet"},
          "encode": {
            "enter": {
              "interpolate": {"value": "linear-closed"},
              "x": {"signal": "scale('radial', datum.value) * cos(scale('angular', datum.key))"},
              "y": {"signal": "scale('radial', datum.value) * sin(scale('angular', datum.key))"},
              "stroke": {"scale": "color", "field": "category"},
              "strokeWidth": {"value": 1},
              "fill": {"scale": "color", "field": "category"},
              "fillOpacity": {"value": 0.1}
            }
          }
        },
        {
          "type": "text",
          "name": "value-text",
          "from": {"data": "category-line"},
          "encode": {
            "enter": {
              "x": {"signal": "datum.x"},
              "y": {"signal": "datum.y"},
              "text": {"signal": "datum.datum.value"},
              "align": {"value": "center"},
              "baseline": {"value": "middle"},
              "fill": {"value": "white"}
            }
          }
        }
      ]
    },
    {
      "type": "rule",
      "name": "radial-grid",
      "from": {"data": "keys"},
      "zindex": 0,
      "encode": {
        "enter": {
          "x": {"value": 0},
          "y": {"value": 0},
          "x2": {"signal": "radius * cos(scale('angular', datum.key))"},
          "y2": {"signal": "radius * sin(scale('angular', datum.key))"},
          "stroke": {"value": "lightgray"},
          "strokeWidth": {"value": 1}
        }
      }
    },
    {
      "type": "text",
      "name": "key-label",
      "from": {"data": "keys"},
      "zindex": 1,
      "encode": {
        "enter": {
          "x": {"signal": "(radius + 5) * cos(scale('angular', datum.key))"},
          "y": {"signal": "(radius + 5) * sin(scale('angular', datum.key))"},
          "text": {"field": "key"},
          "align": [
            {
              "test": "abs(scale('angular', datum.key)) > PI / 2",
              "value": "right"
            },
            {
              "value": "left"
            }
          ],
          "baseline": [
            {
              "test": "scale('angular', datum.key) > 0", "value": "top"
            },
            {
              "test": "scale('angular', datum.key) == 0", "value": "middle"
            },
            {
              "value": "bottom"
            }
          ],
          "fill": {"value": "white"},
          "fontWeight": {"value": "bold"}
        }
      }
    },
    {
      "type": "line",
      "name": "outer-line",
      "from": {"data": "radial-grid"},
      "encode": {
        "enter": {
          "interpolate": {"value": "linear-closed"},
          "x": {"field": "x2"},
          "y": {"field": "y2"},
          "stroke": {"value": "white"},
          "strokeWidth": {"value": 1}
        }
      }
    }
  ]
}

vegaEmbed('#radar1', vlSpec);

//{"key": "acousticness", "value": 0.625, "category": 0},
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