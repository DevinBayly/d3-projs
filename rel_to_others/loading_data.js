d3.csv("cities.csv", function(error,data) {datavis(data)})
function datavis(incomingdata){
    d3.select("body").selectAll("div.cities")
    .data(incomingdata)
    .enter()
    .append("div")
    .attr("class","cities")
    .html(function(d,i) {return d.label })
}
