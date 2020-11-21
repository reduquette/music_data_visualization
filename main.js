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
    var Hist = histogram('.histogram');
    Hist.update(data);
    // document.getElementById("group-by").onchange = Hist.update(data)
    d3.select("#group-by")
        .on('change', (event,d)=>{
            Hist.update(data)
        })
});

function update(){
    console.log(document.getElementById("group-by").value)
}


//make intro histogram

//make record pie chart

//make soundwave chart 

//make dancers chart