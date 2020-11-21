export function histogram(container){

var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#histogram")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

function update(_data){
    // console.log(_data)

    // svg.selectAll("#histogram")
    //             .remove()
    //             .exit()
    //             .data(_data)
    // svg.selectAll("rect")
    //             .remove()
    //             .exit()
    //             .data(_data)
    // svg.selectAll("g")
    //             .remove()
    //             .exit()
    //             .data(_data)

   //var ticks = document.getElementById("group-by").value
    // var ticks = 6
    //console.log("TICKS", ticks)
    
    var x = d3.scaleLinear()
      .domain([1948, d3.max(_data, function(d) { return +d.release_yr })])
      .range([0, width])

    var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

      var y = d3.scaleLinear()
      .range([height, 0]);
      var yAxis = svg.append("g")

    // svg.append("g")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(d3.axisBottom(x))
      // .ticks(ticks))
      // .selectAll("text")
      //   .attr('font-size', 9)
      //   .attr('y', -4)
      //   .attr('x', -18)
      //   .attr("transform", "rotate(-90)")

function updateBins(nBin){

    var histogram = d3.histogram()
      .value(function(d) { return d.release_yr; }) 
      .domain(x.domain()) 
      .thresholds(x.ticks(nBin)); 

    var bins = histogram(_data);

    x.domain([1948, d3.max(_data, function(d) { return +d.release_yr })])
    xAxis
        .transition()
        .duration(1000)
        .call(d3.axisBottom(x)
        .ticks(nBin))
        .selectAll("text")
        .attr('font-size', 9)
        .attr('y', -4)
        .attr('x', -18)
        .attr("transform", "rotate(-90)")

    y.domain([0, d3.max(bins, function(d) { return d.length; })]);  
    yAxis
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y)); 
  
    var u = svg.selectAll("rect")
        .data(bins)

        var myColor = d3.scaleLinear().domain([0,200])
  .range(["white", "blue"])

        console.log(myColor(10), myColor(50))


    u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) ; })
          .attr("height", function(d) { return height - y(d.length); })
          .attr("fill", function(d){ console.log("Y",height - y(d.length)); return myColor(height - y(d.length)) })


    // If less bar in the new histogram, I delete the ones not in use anymore
    u
        .exit()
        .remove()


    // svg.append("g")
    //   .call(d3.axisLeft(y));

    // svg.selectAll("rect")
    //   .data(bins)
    //   .enter()
    //   .append("rect")
    //     .attr("x", 1)
    //     .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
    //     .attr("width", function(d) { return x(d.x1) - x(d.x0); })
    //     .attr("height", function(d) { return height - y(d.length); })
    //     .style("fill", "#69b3a2")

}
updateBins(20)

d3.select("#nBin").on("input", function() {
  updateBins(+this.value);
});

}



return{
  update
}

}
