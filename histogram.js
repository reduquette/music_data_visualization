

export function histogram(container){

  var margin = {top: 8, right: 40, bottom: 45, left: 40},
      width = 720 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;
  
  var svg = d3.select("#histogram")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
  // console.log("SVG postion", rect.top, rect.right, rect.bottom, rect.left);
  
  var tooltip = d3.select("#histogramText")
    .append("div")
    .attr("class", "songs")
    .style("filter", "url(#glow)")
    
  
  function update(_data){
      
      var x = d3.scaleLinear()
        .domain([1948, d3.max(_data, function(d) { return +d.release_yr })])
        .range([0, width])

  
      var xAxis = svg.append("g")
      
      .attr("stroke", "white")
      .style("fill", "white")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      
  
        var y = d3.scaleLinear()
        .range([height, 0]);
        var yAxis = svg.append("g")
        .attr("stroke", "white")
        .style("fill", "white")
  
  
  function updateBins(nBin){
  
    
      var histogram = d3.histogram()
        .value(function(d) { return d.release_yr; }) 
        .domain(x.domain()) 
        .thresholds(x.ticks(nBin))

  
      var bins = histogram(_data);
  
      x.domain([1948, d3.max(_data, function(d) { return +d.release_yr })])
      xAxis
          .transition()
          .duration(1000)
          .call(d3.axisBottom(x)
          .ticks(nBin).tickFormat(d3.format("d")))
          .selectAll("text")
          .style('font-size', 8)
          .attr('y', -4)
          .attr('x', -22)
          .attr("transform", "rotate(-90)")
  
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);  
      yAxis
          .transition()
          .duration(1000)
          .call(d3.axisLeft(y)); 
    
      var u = svg.selectAll("rect")
          .data(bins)
  
          var myColor = d3.scaleLinear().domain([0,200])
          .range(["#4AE7E3", "#0F01C8"])
  
          // console.log(myColor(10), myColor(50))
  
          tooltip = d3.select(".songs")
          .style('display', 'none')
  
        function songs(year1, year2, _data){
          _data = _data.filter(_data => _data.release_yr >= year1 && _data.release_yr <= year2)
          // console.log("DATA", _data, year1, year2)
          var songList= ''
          
          for (var i = 0; i < _data.length; i++ ){
            // console.log(_data[i].title, "TITLE")
            songList += "<br>" + _data[i].title
          }
          // console.log(songList)
          return songList
        }
  
        u
        .enter()
        .append("rect") 
        .attr("rx", 8)
        .attr("ry", 8)
        .merge(u) 
        .on("mouseenter", (event, d) => {
          const pos = d3.pointer(event, window)
          var elem =document.getElementById("histogram");  
          
          var text = document.getElementById("histogramText");
          text.style.top = elem.offsetTop + "px";
          text.style.height = (elem.offsetHeight - margin.bottom).toString() + "px"
          tooltip
              .style('display', 'block')
              .html("Songs from " + d.x0 + " - " + d.x1 + ":<br>" + songs(d.x0, d.x1, _data));

          d3.select(this).attr("box-shadow", "30px 30px 30px #fff")
      })
      .on("mouseleave", (event, d) => {
          d3.selectAll('.songs')
              // .style('display','none')
      })
        .transition() 
        .duration(1000)
          .attr("x", 1)
          .attr("box-shadow", "30px 30px 30px #fff")
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) - 3; })
          .attr("height", function(d) { return height - y(d.length); })
          .attr("fill", function(d){ console.log("Y",height - y(d.length)); return myColor(height - y(d.length)) })
          
          
          const ele = document.getElementById('histogramText');
  
      ele.style.cursor = 'grab';
  
      let pos = { top: 0, left: 0, x: 0, y: 0 };
  
      const mouseDownHandler = function(e) {
          ele.style.cursor = 'grabbing';
          ele.style.userSelect = 'none';
  
          pos = {
              left: ele.scrollLeft,
              top: ele.scrollTop,
              x: e.clientX,
              y: e.clientY,
          };
  
          document.addEventListener('mousemove', mouseMoveHandler);
          document.addEventListener('mouseup', mouseUpHandler);
      };
  
      const mouseMoveHandler = function(e) {
          const dx = e.clientX - pos.x;
          const dy = e.clientY - pos.y;
          ele.scrollTop = pos.top - dy;
          ele.scrollLeft = pos.left - dx;
      };
  
      const mouseUpHandler = function() {
          ele.style.cursor = 'grab';
          ele.style.removeProperty('user-select');
  
          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);
      };
  
      ele.addEventListener('mousedown', mouseDownHandler);
            
  
      u
          .exit()
          .remove()
  
          
      
  
      svg.append("text")
      .attr('x', 0)
      .attr('y', -5)
      .text("Count of Songs")
      .attr('font-size',13)
      .attr('font-family','Lato')
      .attr('fill', 'white')
      .attr("transform", "rotate(90)");
  
  
  
    svg.append("text")
        .attr('font-family','Lato')
        .attr('fill', 'white')
        .attr('x', 639)
          .attr('y', 556)
              .text("Years")
              .attr('font-size',13)
  
    var w = 300, h = 50;

    d3.select("#legend1").selectAll("svg").remove()
  
    var key = d3.select("#legend1")
      .append("svg")
      .attr("width", w)
      .attr("height", h);
  
    var legend = key.append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");
  
    legend.append("stop")
      .attr("offset", "20%")
      .attr("stop-color", "#0604AA")
      .attr("stop-opacity", 1);
  
    legend.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#44CDE0")
      .attr("stop-opacity", 1);
  
    key.append("rect")
      .attr("width", w)
      .attr("height", h - 30)
      .style("fill", "url(#gradient)")
      .attr("transform", "translate(0,10)");


  
    var yKey = d3.scaleLinear()
      .range([300, 0])
      .domain([68, 12]);
  
    var yAxisKey = d3.axisBottom()
      .scale(y)
      .ticks(5);
  
    key.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,30)")
      .call(yAxisKey)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("yKey", 0)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("axis title");
  
    
      d3.select("#nBin").on("input", function() {
        updateBins(+this.value);
        legend.style("opacity", "0")  });
      


  }
  updateBins(61)

  }
  
  
  return {
    update
  }
  
  }