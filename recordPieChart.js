
//make record pie chart
var margin = {top: 30, right: 30, bottom: 30, left: 30};
var width = 600 - margin.left - margin.right;
var height = 600 - margin.top - margin.bottom;

var radius = Math.min(width/2, height/2)

var svg = d3.select("#piechart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 90 + ")");

var decade = "1950s";


function color(d){
    console.log(d)
    if (d.index == 0){
        return 'blue'
    }
    else{
        return 'black'
    }
    
}

var background = svg.append("image")
    .attr("xlink:href", "./record.png")
    .attr("x", -width/2)
    .attr("y", -height/2)
    .attr("width", radius * 2)
    .attr("height", radius * 2)

var tooltip = d3.select("#piechart_container .tooltip")
    .style('display', 'none')
    .style('position', 'fixed')
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style('pointer-events', 'none');

console.log(tooltip);

var data = d3.json('data_by_decade.json', d3.autoType).then(data => {
    console.log("reached data loading for producers")
    console.log(data);

    //filter data to get decade
    var _data = Object.values(data[decade]);

    function update(data){

        // Compute the position of each group on the pie:
        var pie = d3.pie()
          .value(function(d) {return d.num_hits; });
        var data_ready = pie(data)
            .sort(function(a, b) { console.log(a) ; return d3.ascending(a.index, b.index);} )
        
        console.log(data_ready);


        // map to data

        var u = svg.selectAll("path")
          .data(data_ready)

        // Build the pie chart
        u
          .enter()
          .append('path')
          .on("mouseenter",(event,d)=>{
            console.log("mouse enter");
            console.log(event);
            console.log(d);
            tooltip
                .style('display', 'block')
                .html(d.data.producer)
                .style('top', event.clientY + "px")
                .style('left', event.clientX + "px");
          })
          .on("mouseout",(event,d)=>{
            console.log("mouse out");
            tooltip
                .style('display', 'none');
          })
          .merge(u)
          .transition()
        //   .delay(1000)
        //   .duration(1000)
          .attr('d', d3.arc()
                .innerRadius(.33 * radius)
                .outerRadius(radius -10)
          )
          .attr('fill', function(d){ return(color(d)) })
          .attr("stroke", "grey")
          .style("stroke-width", "1px")
          .style("opacity", .5)
          
        

        // remove the exiting group
        u
          .exit()
          .transition()
          .delay(1000)
          .remove()


    }

    update(_data);


    d3.select('#decade')
        .on('change', (event,d)=>{
            svg.transition()
                .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 150 + ")")
                .duration(500)
                .ease(d3.easeQuadInOut)

                .transition()
                .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 310 + ")")
                .duration(500)
                .ease(d3.easeQuadInOut)

                .transition()
                .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 70 + ")")
                .duration(500)
                .ease(d3.easeQuadInOut);

            console.log(event.target.value);
            _data = Object.values(data[event.target.value]);
            console.log(_data);
            update(_data);
    });

});
