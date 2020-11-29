export function pieChartText(){
    var margin = {top: 30, right: 30, bottom: 30, left: 30};
    var width = 400 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;

    var svg_container = d3.select("#piechart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
    var svg = svg_container
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg_container.append("g")
        .append("text")
        .text("Top Ten Producers")
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('width', 50)
        .attr('height', 20)
        .attr('fill', 'white');
    var _data;

    function update(data, decade){

        console.log("updating producer text to " + decade);
        //filter data to get decade
        _data = Object.values(data[decade]);
        //_data is now an array, so we fan sort
        _data.sort((a,b)=>  b.num_hits - a.num_hits);
        //extract the top ten-- this gives all their info
        var topten = _data.slice(0,10);
        console.log(topten);

        var list_items = svg.selectAll("text")
            .data(topten);
        
        list_items.enter()
            .append("text")
            .merge(list_items)
            .transition()
            .delay(1000)
            .text((d,i)=>i+1 + ". "+ d.producer)
            .attr("x", 0)
            .attr('y', (d,i)=>30 + i*30)
            .attr('width', 50)
            .attr('height', 10)
            .attr('fill', 'white')
            .style('color', 'black')
            .style('fontsize', 10);
        
        list_items.exit().remove();
            

    }
    return {update}
}