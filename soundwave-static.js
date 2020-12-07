var margin = {top: 50, right: 100, bottom: 30, left: 30},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var COUNTER = 0;


function soundwaveStatic(){
  console.log("HERE")
  if (COUNTER == 0){
    console.log("HII")
// append the svg object to the body of the page
var svgStatic = d3.select("#soundwave-static")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")


// var svgContainer = d3.select("#soundwave-static").append("svg")
//           .attr("width", 200)
//           .attr("height", 200);


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

    console.log(dataReady)

        // A color scale: one color for each group
    var myColor2 = d3.scaleOrdinal()
      .domain(allGroup)
      .range(["#E4E808", "#E805F6", "#4AE7E3"]);

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([1940, d3.max(data, function(d) { return +d.decade })])
      .range([ 0, width ]);

    svgStatic.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("stroke", "white")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,1])
      .range([ height, 0 ]);
      svgStatic.append("g")
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
    var defs2 = svgStatic.append("defs");

    //Filter for the outside glow
    var filter2 = defs2.append("filter")
        .attr("id","glow2");
    filter2.append("feGaussianBlur")
        .attr("stdDeviation","4")
        .attr("result","coloredBlur");
    var feMerge2 = filter2.append("feMerge");
    feMerge2.append("feMergeNode")
        .attr("in","coloredBlur");
    feMerge2.append("feMergeNode")
        .attr("in","SourceGraphic");


    // svgStatic.selectAll("myLines2")
    //   .data(dataReady)
    //   .enter()
    //   .append("path")
    //     .attr("d", function(d){ 
    //         console.log("LINE", d.values)
    //         return (line(d.values))
    //     })
    //     .attr("stroke", function(d){ console.log(myColor(d.name)); return myColor(d.name) })
    //     .style("filter", "url(#glow)")
    //     .style("stroke-width", 4)
    //     .style("opacity", "0.4")

        
       //make defs and add the linear gradient
      //  var lg2 = svgStatic.append("defs").append("linearGradient")
      //  .attr("id", "mygrad")//id of the gradient
      //  .attr("x1", "0%")
      //  .attr("x2", "0%")
      //  .attr("y1", "0%")
      //  .attr("y2", "100%")//since its a vertical linear gradient 
      //  ;
      //  lg2.append("stop")
      //  .attr("offset", "0%")
      //  .style("stop-color", "red")//end in red
      //  .style("stop-opacity", 1)
   
      //  lg2.append("stop")
      //  .attr("offset", "100%")
      //  .style("stop-color", "blue")//start in blue
      //  .style("stop-opacity", 1)
   
   
       var path21 = svgStatic.append("path")
       .datum(dataReady)
       .attr("fill", "none")
       .attr("stroke", function(d){ return myColor2(d[0].name) })
       .attr("stroke-width", 1.5)
       .attr("d", function(d){ 
                 console.log(d[0].values)
                 return (line(d[0].values))
             })
             .style("filter", "url(#glow2)")
                 .style("stroke-width", 4)
                 .style("opacity", "0.4")
   
       var path22 = svgStatic.append("path")
                 .datum(dataReady)
                 .attr("fill", "none")
                 .attr("stroke", function(d){ return myColor2(d[1].name) })
                 .attr("stroke-width", 1.5)
                 .attr("d", function(d){ 
                           console.log(d[1].values)
                           return (line(d[1].values))
                       })
                       .style("filter", "url(#glow2)")
                           .style("stroke-width", 4)
                           .style("opacity", "0.4")
   
       var path23 = svgStatic.append("path")
                           .datum(dataReady)
                           .attr("fill", "none")
                           .attr("stroke", function(d){ return myColor2(d[2].name) })
                           .attr("stroke-width", 1.5)
                           .attr("d", function(d){ 
                                     console.log(d[2].values)
                                     return (line(d[2].values))
                                 })
                                 .style("filter", "url(#glow2)")
                                     .style("stroke-width", 4)
                                     .style("opacity", "0.4")
       
   
   var totalLength21 = path21.node().getTotalLength();
   var totalLength22 = path22.node().getTotalLength();
   var totalLength23 = path23.node().getTotalLength();
   
   
   
   path21
       .attr("stroke-dasharray", totalLength21 + " " + totalLength21)
       .attr("stroke-dashoffset", totalLength21)
       .transition() 
       .duration(2000) 
       .ease(d3.easeLinear) 
       .attr("stroke-dashoffset", 0); 
   
       path22
       .attr("stroke-dasharray", totalLength22 + " " + totalLength22)
       .attr("stroke-dashoffset", totalLength22)
       .transition() 
       .duration(2000) 
       .ease(d3.easeLinear) 
       .attr("stroke-dashoffset", 0); 
   
       path23
       .attr("stroke-dasharray", totalLength23 + " " + totalLength23)
       .attr("stroke-dashoffset", totalLength23)
       .transition() 
       .duration(2000) 
       .ease(d3.easeLinear) 
       .attr("stroke-dashoffset", 0); 
    
    // Add the points
    svgStatic
      // First we need to enter in a group
      .selectAll("myDots2")
      .data(dataReady)
      .enter()
        .append('g')
        .style("fill", function(d){ return myColor2(d.name) })
      // Second we need to enter in the 'values' part of this group
      .selectAll("myPoints2")
      .data(function(d){ return d.values })
      .enter()
      .append("circle")
        .attr("cx", function(d) { return x(d.decade) } )
        .attr("cy", function(d) { return y(d.value) } )
        .attr("r", 5)
        .attr("stroke", "white")

    // Add a legend at the end of each line
    svgStatic
      .selectAll("myLabels")
      .data(dataReady)
      .enter()
        .append('g')
        .append("text")
          .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; }) // keep only the last value of each time series
          .attr("transform", function(d) { return "translate(" + x(d.value.decade) + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
          .attr("x", 12) // shift the text a bit more right
          .text(function(d) { return d.name; })
          .style("fill", function(d){ return myColor2(d.name) })
          .style("font-size", 15)
          //tooltip

    //Draw the Rectangle
      var rectangle = svgStatic.append("rect")
      .attr("rx", 8)
      .attr("ry", 8)
      .attr("x", 10)
      .attr("y", 10000)
      .attr("width", 50)
      .attr("height", 1000);

                      

    d3.select("#highlight1")
           .attr("height", 0)
          .transition()
          .delay(1000)
          .duration(2000)
          .attr("height", 1000)
                      
    


    svgStatic.append("text")
    .attr('x', 0)
    .attr('y', -5)
    .text("Levels")
    .style("fill", "white")
    .attr('font-size',13)
    .attr('font-family','Lato')
    .attr("transform", "rotate(90)");

    svgStatic.append("text")
    .attr('x', 650)
    .attr('y', 350)
    .text("Decades")
    .style("fill", "white")
    .attr('font-family','Lato')
    .attr('font-size',13)


})




  }
COUNTER = 1;
  }

