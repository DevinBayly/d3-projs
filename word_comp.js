var h = 400,
    w = 1250,
    margin = {left:20,right:20,top:10,bottom:40};
d3.json("word_comparison.json", function (data) create_bars(data))

function create_bars (incoming){
    my_data = incoming
    xScale = d3.scale.ordinal()
        .domain(d3.range(incoming.length))
        .rangeRoundBands([margin.left,w-margin.right])
    yScale = d3.scale.linear()
    .domain(d3.extent(incoming.map(function(item ) {
        if (item.people.devin > item.people.angela) {
            return item.people.devin
        } else {
            return item.people.angela
        }
    })))
    .range([margin.bottom,(h-margin.top)])

    xAxis = d3.svg.axis().scale(xScale)
        .orient("bottom")
        .tickFormat(function (d){
            return incoming[d].word
        })
    svg = d3.select("body").append("svg")
        .attr({
            "height":h,
            "width":w})


    dev_rects = svg.selectAll(".dev").data(incoming).enter().append("rect")
    .attr({
        "class":"dev",
        width : xScale.rangeBand(),
        x: function (d, i) {return xScale(i)},
        y: function(d) {return ( h -margin.bottom - yScale( d.people.devin ) )},
        height: function (d) {return ( yScale( d.people.devin ) )},
        fill:"red"
    })
    angela_rects = svg.selectAll(".ang").data(incoming).enter().append("rect")
    .attr({
        "class":"ang",
        width : xScale.rangeBand(),
        x: function (d, i) {return xScale(i)},
        y: function(d) {return ( h -margin.bottom - yScale( d.people.angela ) )},
        height: function (d) {return ( yScale( d.people.angela ) )},
        fill:"blue"
    })
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + ( h - margin.bottom )+ ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)"
                });

    d3.selectAll("rect").on("mouseover", function (){
      d3.select(this)
      .attr("fill","gold")
      console.log(d3.select(this).attr("x"))
      d3.selectAll("text").map( function (d,i) {
          console.log("d var",d)
          console.log(" i var",i)
      })
          })
    .on("mouseout", function (){
        if ( d3.select(this).classed("ang") )
            d3.select(this).attr("fill","blue");
        else
            d3.select(this).attr("fill","red")
    })
}

