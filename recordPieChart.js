
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
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var decade = "1950s";
// var color = d3.scaleOrdinal()
//     .range(d3.schemeDark2);

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

var background = svg.append("image")
    .attr("xlink:href", "./record.png")
    .attr("x", -width/2)
    .attr("y", -height/2)
    .attr("width", radius * 2)
    .attr("height", radius * 2)

var data = d3.json('data_by_decade.json', d3.autoType).then(data => {
    console.log("reached data loading for producers")
    console.log(data);

    //filter data to get decade
    var _data = Object.values(data[decade]);

    // color.domain(Object.values(data[decade]).map(d=>d.producer));

    function update(data){

        // Compute the position of each group on the pie:
        var pie = d3.pie()
          .value(function(d) {return d.num_hits; });
          //.sort(function(a, b) { console.log(a) ; return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
        var data_ready = pie(data)
            .sort(function(a, b) { console.log(a) ; return d3.ascending(a.index, b.index);} )
        
        console.log(data_ready);

        // map to data

        var u = svg.selectAll("path")
          .data(data_ready)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        u
          .enter()
          .append('path')
          .merge(u)
          .transition()
          .delay(1000)
        //   .duration(1000)
          .attr('d', d3.arc()
                .innerRadius(.33 * radius)
                .outerRadius(radius -10)
          )
          .attr('fill', function(d){ return(color(d)) })
          .attr("stroke", "grey")
          .style("stroke-width", "1px")
          .style("opacity", .5)

        // remove the group that is not present anymore
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
                // .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 90 + ")")
                // .duration(500)
                // .transition()
                .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 120 + ")")
                .duration(500)
                .ease(d3.easeQuadInOut)

                .transition()
                .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 240 + ")")
                .duration(500)
                // .transition()
                // .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 300 + ")")
                // .duration(200)
                .transition()
                .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 360 + ")")
                .duration(500);

            console.log(event.target.value);
            _data = Object.values(data[event.target.value]);
            console.log(_data);
            update(_data);
        })
});
