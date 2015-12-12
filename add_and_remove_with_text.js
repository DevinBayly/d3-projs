var dataset = []
var h = 400
var w = 1000
for (i =0;i<20;i++){
    dataset.push(Math.floor(Math.random()*100))
}
yScale = d3.scale.linear()
    .domain([0,d3.max(dataset)])
    .range([0,h])
xScale = d3.scale.ordinal()
    .domain(d3.range(dataset.length))
    .rangeRoundBands([0,w],.05)
svg = d3.select("body").append("svg")
svg.attr({
    height:h,
    width:w,
})

rects = svg.selectAll("rect").data(dataset).enter().append("rect")
rects.attr({
    height:function(d) {return yScale(d);},
    x:function(d,i) {return xScale(i);},
    width: xScale.rangeBand(),
    y:function(d) {return h-yScale(d)}
})

text = svg.selectAll("text").data(dataset)
text.enter().append("text").text(String)
text.attr({
    x:function (d,i) {return xScale(i)},
    y:function (d) {return h-yScale(d)},
    fill:"smokewhite"
})

d3.select("#adder")
.on("click",function(){
    dataset.push(50)
    rects = svg.selectAll("rect").data(dataset)
    yScale.domain([0,d3.max(dataset)])
    yScale.range([0,h])
    xScale.domain(d3.range(dataset.length))
    xScale.rangeRoundBands([0,w],.05)
    rects.transition()
        .duration(500)
        .attr({
        height:function(d) {return yScale(d);},
        x:function(d,i) {return xScale(i);},
        width: xScale.rangeBand(),
        y:function(d) {return h-yScale(d)}

    })

    rects.enter()
        .append("rect")
        .attr({
        height:function(d) {return yScale(d);},
        x:function(d,i) {return xScale(i);},
        width: xScale.rangeBand(),
        y:function(d) {return h-yScale(d)}
})
    text = svg.selectAll("text").data(dataset)
    text.enter().append("text").text(String)
    text.data(dataset).attr({
        x:function (d,i) {return xScale(i)},
        y:function (d) {return h-yScale(d)},
        fill:"blue"
    })
    text.attr({
        x:function (d,i) {return xScale(i)},
        y:function (d) {return h-yScale(d)},
        fill:"blue"
    })


})
d3.select("#remover")
.on("click",function(d) {
    dataset.shift()
    rects = svg.selectAll("rect").data(dataset)
    yScale.domain([0,d3.max(dataset)])
    yScale.range([0,h])
    xScale.domain(d3.range(dataset.length))
    xScale.rangeRoundBands([0,w],.05)
    rects.exit().remove()
    rects.attr({
        height:function(d) {return yScale(d);},
        x:function(d,i) {return xScale(i);},
        width: xScale.rangeBand(),
        y:function(d) {return h-yScale(d)}
    })
    text = svg.selectAll("text").data(dataset)
    text.exit().remove()
    text.data(dataset).attr({
        x:function (d,i) {return xScale(i)},
        y:function (d) {return h-yScale(d)},
        fill:"blue"
    })
    text.attr({
        x:function (d,i) {return xScale(i)},
        y:function (d) {return h-yScale(d)},
        fill:"blue"
    })



})

