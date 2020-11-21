var margin = {top: 70, right: 30, bottom: 30, left: 70},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#streamgraph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

    //tooltip
    .on('mouseenter', (event, d) => {
      const pos = d3.pointer(event, window)
      d3.selectAll('.tooltip')
          .style('display','block')
          .style('position','fixed')
          .style('color', 'black')
          .style('text-align', 'center')
          .style('background-color', 'lightgrey')
          .style('top', pos[1]+'px')
          .style('left', pos[0]+'px')
          .html(
              d.title + d.artist_name + d.release_yr 
          )
      })
  
    .on('mouseleave', (event, d) => {
      d3.selectAll('.tooltip')
          .style('display','none')
    })

// Parse the Data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv", d3.autoType).then(data => {
  // List of groups = header of the csv files
  var keys = data.columns.slice(1,)
  console.log(keys)

  // Add X axis
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.year; }))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([-100000, 100000])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // color palette
  var color = d3.scaleOrdinal()
    .domain(keys)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf'])

  //stack the data?
  var stackedData = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .keys(keys)
    (data)
  

  // Show the areas
  svg
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
      .style("fill", function(d) { return color(d.key); })
      .attr("d", d3.area()
        .x(function(d, i) { return x(d.data.year); })
        .y0(function(d) { return y(d[0]); })
        .y1(function(d) { return y(d[1]); })
    )


  //Update Function

    function updateLines(Decade){

      var line = d3.line()
        .value(function(d) { return d.release_yr; }) 
        .domain(x.domain()) 
        .thresholds(x.ticks(Decade)); 
  
      var Decade = line(_data);
  
      x.domain([1948, d3.max(_data, function(d) { return +d.release_yr })])
      xAxis
          .transition()
          .duration(1000)
          .call(d3.axisBottom(x)
          .ticks(Decade))
          .selectAll("text")
          .attr('font-size', 9)
          .attr('y', -4)
          .attr('x', -18)
          .attr("transform", "rotate(-90)")
  
      y.domain([0, d3.max(Decade, function(d) { return d.length; })]);  
      yAxis
          .transition()
          .duration(1000)
          .call(d3.axisLeft(y)); 
    
      var u = svg.selectAll("dot")
          .data(Decade)
  
          var myColor = d3.scaleLinear().domain([0,200])
    .range(["white", "lightblue"])
  
          console.log(myColor(10), myColor(50))
  
  
      u
          .enter()
          .append("dot") // Add a new rect for each new elements
          .merge(u) // get the already existing elements as well
          .transition() // and apply changes to all of them
          .duration(1000)
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("x", function(d) { return data. ; })
            .attr("y", function(d) { return height - y(d.length); })
  
            acousticness,danceability,energy,instrumentalness
  
      // If less bar in the new line, I delete the ones not in use anymore
      u
          .exit()
          .remove()
  
      svg.append("text")
      .attr('x', 0)
      .attr('y', -5)
      .text("Count of Songs")
      .attr('font-size',13)
      .attr("transform", "rotate(90)");
    
      svg.append("text")
        .attr('x', 532)
        .attr('y', 368)
        .text("Years")
        .attr('font-size',13)
        
        
        }
  
  }
  updateLines(20)
  
  d3.select("#Decade").on("input", function() {
    updateLines(+this.value);
  });
  
  }
  
  
  return{
    update
  }
  
  }
  
  
})