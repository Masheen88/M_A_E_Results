//Page Body
let body = document.getElementById("body");

let apiEndPoint =
  "https://62c85d578c90491c2cb47da3.mockapi.io/Promineo_Tech_API/users"; // api endpoint

// async await
let getData = async () => {
  let response = await fetch(apiEndPoint);
  let data = await response.json();

  //insert code here
  return data;
};

getData().then((data) => {
  //beginning of function

  // console.log(data);
  let morningTotal = [];
  let afternoonTotal = [];
  let eveningTotal = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].timeOfDay === "morning") {
      morningTotal.push(data[i].timeOfDay);
    } else if (data[i].timeOfDay === "afternoon") {
      afternoonTotal.push(data[i].timeOfDay);
    } else if (data[i].timeOfDay === "evening") {
      eveningTotal.push(data[i].timeOfDay);
    }
  }

  let morningTotalCount = morningTotal.length;
  let afternoonTotalCount = afternoonTotal.length;
  let eveningTotalCount = eveningTotal.length;

  //d3 Pie Chart using morningTotalCount, afternoonTotalCount, eveningTotalCount

  var width = 500,
    height = 500,
    radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal().range(["#ffff00", "#ffa500", "#0000ff"]);

  var arc = d3
    .arc()
    .outerRadius(radius - 20)
    .innerRadius(radius - 150);

  var pie = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d.count;
    });

  var svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var data = [
    { timeOfDay: "morning", count: morningTotalCount },
    { timeOfDay: "afternoon", count: afternoonTotalCount },
    { timeOfDay: "evening", count: eveningTotalCount },
  ];

  var g = svg
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("fill", function (d) {
      return color(d.data.timeOfDay);
    });

  g.append("text")
    .attr("transform", function (d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .style("text-anchor", "middle")
    .text(function (d) {
      return d.data.timeOfDay;
    });

  //end of d3 donut chart

  //end of function
});
