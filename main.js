//Page Body
let body = document.getElementById("body");

let apiEndPoint =
  "https://62c85d578c90491c2cb47da3.mockapi.io/Promineo_Tech_API/users"; // api endpoint

// async await
let getData = async () => {
  let response = await fetch(apiEndPoint);

  body.innerHTML = "Loading..."; // while waiting on data displays a loading status in body
  let data = await response.json();
  //when data is returned remove loading from body

  //insert code here
  return data;
};

getData().then((data) => {
  body.innerHTML = `<div id="chartData"></div>`; // when data is returned displays div with chartData id required by d3
  let morningTotal = [];
  let afternoonTotal = [];
  let eveningTotal = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].timeOfDay === "morning") {
      morningTotal.push(data[i].timeOfDay); //pushes the time of day into the morningTotal array
    } else if (data[i].timeOfDay === "afternoon") {
      afternoonTotal.push(data[i].timeOfDay); //pushes the time of day into the afternoonTotal array
    } else if (data[i].timeOfDay === "evening") {
      eveningTotal.push(data[i].timeOfDay); //pushes the time of day into the eveningTotal array
    }
  }

  let morningTotalCount = morningTotal.length; //counts the number of items in the morningTotal array
  let morningTotalLabel = `Morning: ${morningTotalCount}`; //creates a label for the morningTotalCount
  let afternoonTotalCount = afternoonTotal.length; //counts the number of items in the afternoonTotal array
  let afternoonTotalLabel = `Afternoon: ${afternoonTotalCount}`; //creates a label for the afternoonTotalCount
  let eveningTotalCount = eveningTotal.length; //counts the number of items in the eveningTotal array
  let eveningTotalLabel = `Evening: ${eveningTotalCount}`; //creates a label for the eveningTotalCount

  //d3 Pie Chart - Begin
  var width = 500,
    height = 500;
  radius = Math.min(width, height) / 2;

  var color = d3.scaleOrdinal().range(["#ffff00", "#ffa500", "#0000ff"]);

  var arc = d3
    .arc()
    .outerRadius(radius - 2)
    .innerRadius(radius - 150);

  var pie = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d.count;
    });

  var svg = d3
    .select("#chartData")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  //data for the pie chart
  var data = [
    // {label of data, count from data}
    { timeOfDay: morningTotalLabel, count: morningTotalCount },
    { timeOfDay: afternoonTotalLabel, count: afternoonTotalCount },
    { timeOfDay: eveningTotalLabel, count: eveningTotalCount },
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
  //d3 Pie Chart - End

  //d3 chart animation
  var chart = d3.selectAll("path");
  chart
    .transition() // Call Transition Method
    .duration(1500) //duration of animation
    .attrTween("d", function (d) {
      var i = d3.interpolate(d.startAngle + 0.1, d.endAngle); //interpolate the start and end angles
      return function (t) {
        d.endAngle = i(t); //set the end angle to the interpolated value
        return arc(d); //return the arc
      };
    });

  //end of function
});
