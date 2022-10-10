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
  console.log(data);
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

  let chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    backgroundColor: "transparent",

    title: {
      text: "Time of Day Results",
      fontColor: "white",
    },
    data: [
      {
        indexLabelFontColor: "white",
        type: "pie",
        startAngle: 240,
        yValueFormatString: '##0.00"%"',
        indexLabel: "{label} {y}",
        dataPoints: [
          { y: morningTotalCount, label: "Morning", color: "#ffff00" },
          { y: afternoonTotalCount, label: "Afternoon", color: "#ffa500" },
          { y: eveningTotalCount, label: "Evening", color: "#0000ff" },
        ],
      },
    ],
  });

  chart.render();

  //wait for chart to render
  setTimeout(function () {}, 3000);

  let divs = document.querySelectorAll("div");
  console.log(divs);

  //check for div with span child
  for (let i = 0; i < divs.length; i++) {
    console.log(divs[i].children);

    //if div has span child
    if (divs[i].children.length > 0) {
      console.log("found", divs[i].children[0].tagName);
      //set parent div background to black!important
      divs[i].style.background = "black!important";
    }
  }
});
