import {histogram} from "./histogram.js"
import {} from "./recordPieChart.js"
import {} from "./dancers.js"


        

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





