// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= =================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
    console.log(`Width: ${width}`);

var height = svgHeight - margin.top - margin.bottom;
    console.log(`Height:  ${height}`);

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// ==================================================
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Step 3:
// Import data from the donuts.csv file
// Parse the data
// =================================
d3.csv("assets/data/data.csv").then(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    console.log(data)


  // Step 5: Create the scales for the chart
  // =================================
   var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(data, d => d.poverty)])
      .range([0, width]);

   var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.healthcare)])
      .range([height, 0]);
   


    // Step 6: Set up the y-axis domain
  // ==============================================
  // @NEW! determine the max y value
  // find the max of the morning data
  
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

// Step 8: Append Axes to the chartgroup
    // ===================================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

// Step 9:  Create Circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("class", "stateCircle");

//Step 10:  Add Tooltips
    var tooltip = d3.tip()
        .attr("class", "d3-tip")
        .html(function(d){
            return(`${d.state}<br>Poverty: ${d.poverty}<br> Without Healthcare ${d.healthcare}`);
    });
    
// Step 11:  Create Tooltip in Chart
chartGroup.call(tooltip);

// Step 12:  Create event listener
circlesGroup.on("click", function (data) {
    tooltip.show(data, this);
  })
    // onmouseout event
    .on("mouseout", function(data, index) {
      tooltip.hide(data);
    

// Step 13:  Create axes labels
// Create bottom axis
    chartGroup
      .append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("In Poverty(%)");
  }).catch(function(error) {
    console.log(error);

    chartGroup
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("No Access to Healthcare");

});
});