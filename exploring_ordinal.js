var h = 400,
    w = 1250,
    margin = {left:20,right:20,top:10,bottom:40};
d3.json("word_comparison.json", function (data) create_bars(data))

function create_bars (incoming){
    my_dat = incoming

    xScale = d3.scale.ordinal()

    brushed = function () {
        var ex= d3.event.target.extent()
        var selected = xScale.domain().filter( function (d) {
            return ex[0] <= xScale(d) && xScale(d) <= ex[1]
        } )
        console.log(selected)
    }
    brush = d3.svg.brush().x(xScale).on("brush",brushed)

    xScale.domain(d3.range(incoming.length).map( function (d) { return incoming[d].word  } ))
    xScale.rangePoints([margin.left,(w-margin.right)])
    xAxis = d3.svg.axis().scale(xScale)
    d3.select("body").append("svg")
        .attr({
        height: h,
        width: w,})
    .append("g")
        .attr("transform","translate (0,"+(h/2)+")")
        .call(xAxis)
    .selectAll("text")
        .attr({
            dx: "-.8em",
            dy: ".15em",
            transform: "rotate(-65)",
        })
        .style("text-anchor","end")
        .style("font-size","8px")
    d3.select("svg").append("g")
        .classed("brush",true)
        .call(brush)
      .selectAll("rect")
        .attr("height",h)
}
