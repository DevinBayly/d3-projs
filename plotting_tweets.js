d3.json("tweets.json",function(error,data) {datavis(data.tweets)})
d3.select("body").append("svg")
.attr({
    height:460,
    width: 500,
})
function datavis(incomingData) {
    incomingData.forEach(function (e1) {
        e1.impact = e1.favorites.length + e1.retweets,length
        e1.tweetTime = new Date(e1.timestamp)
    })

    var maxImpact = d3.max(incomingData, function(e1) {return e1.impact})
    var startEnd = d3.extent(incomingData, function(e1) {return e1.tweetTime})
    var timeRamp = d3.time.scale().domain(startEnd).range([20,480])
    var yScale = d3.scale.linear().domain([0,maxImpact]).range([0,460])
    var radiusScale = d3.scale.linear().domain([0,maxImpact]).range([1,20])
    var colorScale = d3.scale.linear().domain([0,maxImpact]).range(["white","#990000"]) /*this number represents red */

    d3.select("svg").selectAll("circle")
        .data(incomingData)
        .enter()
        .append("circle")
        .attr({
            r: function(d){return radiusScale(d.impact)},
            cx: function (d) {return timeRamp(d.tweetTime)},
            cy: function(d) {return 480-yScale(d.impact)},
            fill: function(d) {return colorScale (d.impact)},
})

var gEls =d3.select("svg").selectAll("g")
    .data(incomingData)
    .enter()
    .append("g")
    .attr("transform", function(d) {
        return "translate(" + timeRamp(d.tweetTime)+ "," + (480 - yScale(d.impact)) + ")"
    })
gEls.append("circle")
    .attr({
        r: function(d) {return radiusScale(d.impact)}
    })
}

