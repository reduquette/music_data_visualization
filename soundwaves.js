var margin = {top: 50, right: 100, bottom: 30, left: 30},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#soundwaves")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

d3.csv("averages.csv",d3.autoType).then(data => {

    // List of groups (here I have one group per column)
    var allGroup =  ["energy", "danceability", "acousticness"]

    // Reformat the data: we need an array of arrays of {x, y} tuples
    var dataReady = allGroup.map( function(grpName) { // .map allows to do something for each element of the list
      return {
        name: grpName,
        values: data.map(function(d) {
          return {decade: d.decade, value: +d[grpName]};
        })
      };
    });


    // A color scale: one color for each group
    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(["#E4E808", "#E805F6", "#4AE7E3"]);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([1940, d3.max(data, function(d) { return +d.decade })])
      .range([ 0, width ]);

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("stroke", "white")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,1])
      .range([ height, 0 ])
      .nice()
    svg.append("g")
    .attr("stroke", "white")
      .call(d3.axisLeft(y));

    // var curve = d3.line().curve(d3.curveCardinal);
    // var pathData = [curve(d.values)]

    // Add the lines
    var line = d3.line()
      .x(function(d) { return x(+d.decade) })
      .y(function(d) { return y(+d.value) })
      .curve(d3.curveMonotoneX)
      
      


    //Container for the gradients
    var defs = svg.append("defs");

    //Filter for the outside glow
    var filter = defs.append("filter")
        .attr("id","glow");
    filter.append("feGaussianBlur")
        .attr("stdDeviation","4")
        .attr("result","coloredBlur");
    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
        .attr("in","coloredBlur");
    feMerge.append("feMergeNode")
        .attr("in","SourceGraphic");


   //make defs and add the linear gradient
    var lg = svg.append("defs").append("linearGradient")
    .attr("id", "mygrad")//id of the gradient
    .attr("x1", "0%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "100%")//since its a vertical linear gradient 
    ;
    lg.append("stop")
    .attr("offset", "0%")
    .style("stop-color", "red")//end in red
    .style("stop-opacity", 1)

    lg.append("stop")
    .attr("offset", "100%")
    .style("stop-color", "blue")//start in blue
    .style("stop-opacity", 1)


    var path1 = svg.append("path")
    .datum(dataReady)
    .attr("fill", "none")
    .attr("stroke", function(d){ return myColor(d[0].name) })
    .attr("stroke-width", 1.5)
    .attr("d", function(d){ 
              console.log(d[0].values)
              return (line(d[0].values))
          })
          .style("filter", "url(#glow)")
              .style("stroke-width", 4)
              .style("opacity", "0.4")

    var path2 = svg.append("path")
              .datum(dataReady)
              .attr("fill", "none")
              .attr("stroke", function(d){ return myColor(d[1].name) })
              .attr("stroke-width", 1.5)
              .attr("d", function(d){ 
                        console.log(d[1].values)
                        return (line(d[1].values))
                    })
                    .style("filter", "url(#glow)")
                        .style("stroke-width", 4)
                        .style("opacity", "0.4")

    var path3 = svg.append("path")
                        .datum(dataReady)
                        .attr("fill", "none")
                        .attr("stroke", function(d){ return myColor(d[2].name) })
                        .attr("stroke-width", 1.5)
                        .attr("d", function(d){ 
                                  console.log(d[2].values)
                                  return (line(d[2].values))
                              })
                              .style("filter", "url(#glow)")
                                  .style("stroke-width", 4)
                                  .style("opacity", "0.4")
    

var totalLength1 = path1.node().getTotalLength();
var totalLength2 = path2.node().getTotalLength();
var totalLength3 = path3.node().getTotalLength();

path1
    .attr("stroke-dasharray", totalLength1 + " " + totalLength1)
    .attr("stroke-dashoffset", totalLength1)
    .transition() 
    .duration(4000) 
    .ease(d3.easeLinear) 
    .attr("stroke-dashoffset", 0); 

    path2
    .attr("stroke-dasharray", totalLength2 + " " + totalLength2)
    .attr("stroke-dashoffset", totalLength2)
    .transition() 
    .duration(4000) 
    .ease(d3.easeLinear) 
    .attr("stroke-dashoffset", 0); 

    path3
    .attr("stroke-dasharray", totalLength3 + " " + totalLength3)
    .attr("stroke-dashoffset", totalLength3)
    .transition() 
    .duration(4000) 
    .ease(d3.easeLinear) 
    .attr("stroke-dashoffset", 0); 



    var tooltip2 = d3.select("#soundwaves")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip-text")
    .style("background-color", "blue")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

      // A function that change this tooltip when the user hover a point.
// Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var mouseover = function(d) {
    tooltip2
      .style("opacity", 1)
    }

    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var mouseleave = function(d) {
    tooltip2
      .transition()
      .duration(200)
      .style("opacity", 0)
    }

        
    // Add the points
    svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor(d.name) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.decade) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("stroke", "white")
        .on("mouseover", mouseover )
        .on("mousemove", (event, d) => {
          tooltip2
            .html("Level: " + (d.value) + "<br>Decade: " + d.decade)
            .style("left", 90 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
            .style("top", 90 + "px")
          })
        .on("mouseleave", mouseleave )

      svg.selectAll('circle')
        .transition()
              .delay(5000)
        .attr('opacity', 1)


    // Add a legend at the end of each line
    svg
      .selectAll("myLabels")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          .attr("transform", function(d) { return "translate(" + x(d.value.decade) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor(d.name) })
          .style("font-size", 15)
          //tooltip


    svg.append("text")
    .attr('x', 0)
    .attr('y', -5)
    .text("Levels")
    .style("fill", "white")
    .attr('font-size',13)
    .attr('font-family','Lato')
    .attr("transform", "rotate(90)");

  svg.append("text")
    .attr('x', 650)
    .attr('y', 350)
    .text("Decades")
    .style("fill", "white")
    .attr('font-family','Lato')
    .attr('font-size',13)




    // svg.append("path")
    // .datum(data)
    // .attr("class", "area")
    // .attr("d", area)
    //   .style("fill", "url(#mygrad)");//id of the gradient for fill

})



// Read the data - code to figure out decade averages 
d3.csv("comboSongs.csv", d3.autoType).then(data =>  {

    // List of groups (here I have one group per column)
    var allGroup = ["acousticness", "energy", "danceability"]

    let average40s = {}; //decade: 40s, avg_energy: , avg_dance:, avg_ac
    let average50s = {};
    let average60s = {};
    let average70s = {};
    let average80s = {};
    let average90s = {};
    let average2000s = {};

    let years = data.columns.slice(4,5)

    console.log(years)

    data.forEach(function(d) {
        var year = d.release_yr;
        if (year >= 1940 && year < 1950){
          let sum_energy = 0
          let sum_dance = 0
          let sum_acousticness = 0
          let count = 0
          average40s["decade"] = "40s"
          count += 1
          sum_energy += d.energy
          sum_dance += d.danceability
          sum_acousticness += d.acousticness
          let avg_energy = sum_energy/count
          let avg_dance = sum_dance/count
          let avg_acousticness = sum_acousticness/count
          average40s["avg_energy"] = avg_energy
          average40s["avg_dance"] = avg_dance
          average40s["avg_acousticness"] = avg_acousticness
        } else if (year >= 1950 && year < 1960) {
          let sum_energy = 0
          let sum_dance = 0
          let sum_acousticness = 0
          let count = 0
          average50s["decade"] = "50s"
          count += 1
          sum_energy += d.energy
          sum_dance += d.danceability
          sum_acousticness += d.acousticness
          let avg_energy = sum_energy/count
          let avg_dance = sum_dance/count
          let avg_acousticness = sum_acousticness/count
          average50s["avg_energy"] = avg_energy
          average50s["avg_dance"] = avg_dance
          average50s["avg_acousticness"] = avg_acousticness

        } else if (year >= 1960 && year < 1970) {
          let sum_energy = 0
          let sum_dance = 0
          let sum_acousticness = 0
          let count = 0
          average60s["decade"] = "60s"
          count += 1
          sum_energy += d.energy
          sum_dance += d.danceability
          sum_acousticness += d.acousticness
          let avg_energy = sum_energy/count
          let avg_dance = sum_dance/count
          let avg_acousticness = sum_acousticness/count
          average60s["avg_energy"] = avg_energy
          average60s["avg_dance"] = avg_dance
          average60s["avg_acousticness"] = avg_acousticness

        } else if (year >= 1970 && year < 1980) {
          let sum_energy = 0
          let sum_dance = 0
          let sum_acousticness = 0
          let count = 0

          average70s["decade"] = "70s"
          count += 1
          sum_energy += d.energy
          sum_dance += d.danceability
          sum_acousticness += d.acousticness
          let avg_energy = sum_energy/count
          let avg_dance = sum_dance/count
          let avg_acousticness = sum_acousticness/count
          average70s["avg_energy"] = avg_energy
          average70s["avg_dance"] = avg_dance
          average70s["avg_acousticness"] = avg_acousticness

        } else if (year >= 1980 && year < 1990) {
          let sum_energy = 0
          let sum_dance = 0
          let sum_acousticness = 0
          let count = 0
          average80s["decade"] = "80s"
          count += 1
          sum_energy += d.energy
          sum_dance += d.danceability
          sum_acousticness += d.acousticness
          let avg_energy = sum_energy/count
          let avg_dance = sum_dance/count
          let avg_acousticness = sum_acousticness/count
          average80s["avg_energy"] = avg_energy
          average80s["avg_dance"] = avg_dance
          average80s["avg_acousticness"] = avg_acousticness
        } else if (year >= 1990 && year < 2000) {
          let sum_energy = 0
          let sum_dance = 0
          let sum_acousticness = 0
          let count = 0
          average90s["decade"] = "90s"
          count += 1
          sum_energy += d.energy
          sum_dance += d.danceability
          sum_acousticness += d.acousticness
          let avg_energy = sum_energy/count
          let avg_dance = sum_dance/count
          let avg_acousticness = sum_acousticness/count
          average90s["avg_energy"] = avg_energy
          average90s["avg_dance"] = avg_dance
          average90s["avg_acousticness"] = avg_acousticness

        } else if (year >= 2000 && year < 2010) {
          let sum_energy = 0
          let sum_dance = 0
          let sum_acousticness = 0
          let count = 0
          average2000s["decade"] = "2000s"
          count += 1
          sum_energy += d.energy
          sum_dance += d.danceability
          sum_acousticness += d.acousticness
          let avg_energy = sum_energy/count
          let avg_dance = sum_dance/count
          let avg_acousticness = sum_acousticness/count
          average2000s["avg_energy"] = avg_energy
          average2000s["avg_dance"] = avg_dance
          average2000s["avg_acousticness"] = avg_acousticness
        }
    });


    console.log(average40s)
    console.log(average50s)
    console.log(average60s)
    console.log(average70s)
    console.log(average80s)
    console.log(average90s)
    console.log(average2000s)

})
