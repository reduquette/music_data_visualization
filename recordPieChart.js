
export function recordPieChart(){
    //make record pie chart
    var margin = {top: 5, right: 5, bottom: 5, left: 5};
    var width = 500 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    var radius = Math.min(width/2, height/2)

    var svg_container = d3.select("#piechart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
    var svg = svg_container.append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 90 + ")");



    var background = svg.append("image")
        .attr("xlink:href", "./record.png")
        .attr("x", -width/2)
        .attr("y", -height/2)
        .attr("width", radius * 2)
        .attr("height", radius * 2)
        
    function color(d){

        if (d.index == 0){
            return '#f17e67'
        }
        else{
            return 'black'
        }

    }
    function opacity(d){

        if (d.index == 0){
            return 1
        }
        else{
            return .5
        }

    }
    function html_text(d, total_hits, decade){	
        console.log(decade)	
        var line1 =  '<b>' + d.data.producer +'</b>'+ " produced " + '<b>' + parseFloat(d.data.num_hits / total_hits * 100).toFixed(2) +'</b>'+ "% of hit songs in the " + decade;	
        var line2 = '<b> Hit Songs:</b> <br>'	
        var i;	
        for (i = 0; i <d.data.hit_songs.length;i++){	
            line2 += '🎤 ' + d.data.hit_songs[i] + "<br>"	
        }	
        return line1 + '<br>' + line2	
    }	
    
    var tooltip = d3.select("#piechart_container .tooltip")
        .style("color", 'black');

    let data, decade, num_hits_decade;

    function update(_data, _decade){
        decade=_decade
        data = Object.values(_data[decade]);

        svg.transition()
                .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 150 + ")")
                .duration(300)
                .ease(d3.easeLinear)

                .transition()
                .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 310 + ")")
                .duration(300)
                .ease(d3.easeLinear)

                .transition()
                .attr("transform",  "translate(" + width / 2 + "," + height / 2 + ") rotate(" + 70 + ")")
                .duration(300)
                .ease(d3.easeLinear);

        // Compute the position of each group on the pie:
        var pie = d3.pie()
            .value(function(d) {return d.num_hits; });
        var data_ready = pie(data)
            .sort(function(a, b) { return d3.ascending(a.index, b.index);} );

        num_hits_decade = d3.sum(data_ready, d=>d.data.num_hits);

        // map to data

        var u = svg.selectAll("path")
            .data(data_ready)
        // Build the pie chart
        u
            .enter()
            .append('path')
            .on("mouseenter",(event,d)=>{
            tooltip
                .style('display', 'block')
                .html(html_text(d, num_hits_decade, decade))
                .style('top', event.clientY + "px")
                .style('left', event.clientX + "px");
            })
            .on("mouseout",(event,d)=>{
            tooltip
                .style('display', 'none');
            })
            .merge(u)
            .transition()
            .delay(500)
            .duration(100)
            .attr('d', d3.arc()
                .innerRadius(.33 * radius)
                .outerRadius(radius -10)
            )
            .attr('fill', function(d){ return(color(d)) })
            .attr("stroke", "grey")
            .style("stroke-width", "1px")
            .style("opacity", d=>opacity(d))



        // remove the exiting group
        u
            .exit()
            .transition()
            .delay(1000)
            .remove()


    }

    return {
        update	}
}

// var title = svg_container.append("rect")
//     .attr("color", "white")
//     .text("test")
//     .attr("x", 0)
//     .attr("y", 0)
//     .attr("width", 10)
//     .attr("height", 10)
//     .attr("fill", "white")
//     .attr("stroke", "white");


