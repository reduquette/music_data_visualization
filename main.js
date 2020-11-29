import {histogram} from "./histogram.js"
import {recordPieChart} from "./recordPieChart.js"
import {} from "./dancers.js"
import {pieChartText} from"./pieChartText.js"

        

$(function() {
    $.scrollify({
    section : "section"
    })
});


// When the user scrolls the page, execute myFunction 
window.onscroll = function () {
    updateScrollProgress()
  };
  
  function updateScrollProgress() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.height = scrolled + "%";
  }

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
    // d3.select('#decade')
    //     .on('change', (event,d)=>{
    //         console.log(event);
    //         console.log(event.target.value);
    //     })
    //make soundwave chart 

    //make dancers chart
});


var piechart = recordPieChart();
var piecharttext = pieChartText();
var decade, producer_data;
d3.json('data_by_decade.json', d3.autoType).then(data => {
    producer_data = data;
    console.log("reached data loading for producers")
    console.log(data);
    // piechart.update(data, '1950s');

});

d3.select('#decade')
    .on('change', (event,d)=>{

        console.log(event.target.value);
        decade = event.target.value;
        // _data = Object.values(data[event.target.value]);
        // console.log(_data);
        piechart.update(producer_data, decade);
        piecharttext.update(producer_data, decade);
});
