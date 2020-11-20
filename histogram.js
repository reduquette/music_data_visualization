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

d3.csv('comboSongs.csv', d3.autoType).then(data => {
    console.log(data)
    var ticks = document.getElementById("group-by").value
  var x = d3.scaleLinear()
      .domain([1948, d3.max(data, function(d) { return +d.release_yr })])
      .range([0, width])

  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
      .ticks(ticks))
      .selectAll("text")
        .attr('font-size', 9)
        .attr('y', 10)
        .attr('x', -17)
        .attr("transform", "rotate(-90)")

  var histogram = d3.histogram()
      .value(function(d) { return d.release_yr; }) 
      .domain(x.domain()) 
      .thresholds(x.ticks(ticks)); 

  var bins = histogram(data);

  var y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([1948, d3.max(bins, function(d) { return d.length; })]);   
  svg.append("g")
      .call(d3.axisLeft(y));

  svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0); })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#69b3a2")
    

});