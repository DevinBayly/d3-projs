var svg = d3.select("body").append("svg")
.attr({height:200,width:600,})

var my_data = d3.range(5).map(function(d) {return ~~(Math.random()*100)})

var circles = d3.select("svg").selectAll("circle").data(my_data).enter()

circles.append("circle").attr({
    r:40,
    cy:100,
    cx:function(d,i) {return i*100 + 50}
})
circles.style({stroke: "gray", fill:"aliceblue", })

