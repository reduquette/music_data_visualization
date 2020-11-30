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
        .attr('fill', 'white')
        .attr('font-size', 20);

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
            .attr('fill', "white")
            .style('font-size', 20)
            .merge(list_items)
            .transition()
            .delay(1000)
            .text((d,i)=>i+1 + ". "+ d.producer)
            .attr("x", 0)
            .attr('y', (d,i)=>30 + i*30)
            .attr('width', 50)
            .attr('height', 10);
        
        list_items.exit().remove();
            

    }
    return {update}
}

export function get_producer_commentary(decade){
    var captions = {"1950s": "In the 1950s, Leonard and Phil Chess dominated production of top hits, each producing about 15% of songs. The top 10 producers account for almost three-fourths of all tracks.",
    "1960s": "There was a dramatic increase in the diversity of producers from the 1950s to the 1960s. There are far more producers featured on only one song (thin slices). At just under 8%, the largest single share is much smaller; the top 10 producers account for less than a third of songs.",
    "1970s": "Like the 60s, the 1970s were characterized by substantial diversity of production. In the 70s, over half of the pie chart is producers who worked on only one hit song. The largest share is miniscule, at less than 3%.",
    "1980s": "The 1980s show similar patterns to the 70s, with the majority of producers working on only one hit song. Prince is the top producer in the 80s, by virtue of working on many of his own songs.",
    "1990s":"In the 1990s, the number of producers dropped once again. All producers have equal shares, with the exception of Butch Vig, whose success is attributable to his role as producer on Nirvana's platinum album Nevermind. "}
    return captions[decade]
}