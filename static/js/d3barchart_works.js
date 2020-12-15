

 // needs some zoom
// https://stackoverflow.com/questions/16236600/d3-js-force-layout-auto-zoom-scale-after-loading
    
function drawBarChart(input) {
     // if (error) throw error;
     //d3.selectAll("svg1111 > *").remove();
     
     
     
/*      var svg111 = d3.select("#barChart"),
     width = +svg111.attr("width"),
     height = +svg111.attr("height"); */
    
var data = input.nodes;
//console.log(data);
//var data = [{"id":"Bob","r":33},{"id":"Robin","r":12},{"id":"Anne","r":41},{"id":"Mark","r":16},{"id":"Joe","r":59},{"id":"Eve","r":38},{"id":"Karen","r":21},{"id":"Kirsty","r":25},{"id":"Chris","r":30},{"id":"Lisa","r":47},{"id":"Tom","r":5},{"id":"Stacy","r":20},{"id":"Charles","r":13},{"id":"Mary","r":29}];

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

var x = d3.scaleLinear()
          .range([0, width]);
          
// append the svg object to the body of the page
// append a 'r' element to 'svg'
// moves the 'r' element to the top left margin
var svg = d3.select("#barChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

  // format the data
  data.forEach(function(d) {
    d.r = +d.r;
  });

  // Scale the range of the data in the domains
  x.domain([0, d3.max(data, function(d){ return d.r; })])
  y.domain(data.map(function(d) { return d.id; }));
  //y.domain([0, d3.max(data, function(d) { return d.r; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      //.attr("x", function(d) { return x(d.r); })
      .attr("width", function(d) {return x(d.r); } )
      .attr("y", function(d) { return y(d.id); })
      .attr("height", y.bandwidth());

/*   // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y)); */

    };
  

