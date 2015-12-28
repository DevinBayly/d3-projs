var my_vals = d3.range(50).map(function(d,i) {return {index:i,value:~~(Math.random()*100)}})

    /* so things involved in a scatter plot are, values, axis, canvas(svg), scales, circles, possibly tooltips*/
var h = 700
var w = 1000
var canvas = d3.select("body").append("svg")
canvas.attr({
    height: h,
    width: w,
})
var xScale = d3.scale.linear()
var yScale = d3.scale.linear()
xScale.domain(d3.extent(my_vals, function (d) {return d.index}))
xScale.range([0,w])
yScale.domain(d3.extent(my_vals, function(d) {return d.value}))
yScale.range([0,h])

var xAxis = d3.svg.axis().scale(xScale)
canvas.append("g").call(xAxis)
var yAxis = d3.svg.axis().scale(yScale).orient("left")
canvas.append("g")
    .attr("transform","translate ("+ 20 +",0)")
    .call(yAxis)
