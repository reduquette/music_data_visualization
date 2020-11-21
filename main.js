import {histogram} from "./histogram.js"
import {} from "./recordPieChart.js"
import {} from "./soundwave.js"
import {} from "./dancers.js"


var csvdata;
//load data
var data = d3.csv('comboSongs.csv', d3.autoType).then(data => {
    console.log("reached data loading")
    csvdata = data;
    console.log(data);
    //make intro histogram
    var Hist = histogram('.histogram');
    Hist.update(data);
    d3.select("#group-by")
        .on('change', (event,d)=>{
            Hist.update(data)
        })
    //make record pie chart

    //make soundwave chart 

    //make dancers chart
});




