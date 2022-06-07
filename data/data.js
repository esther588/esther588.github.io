async function func() {
    const url = "https://api.github.com/users/esther588/repos";
    const response = await fetch(url);
  const result = await response.json();
  for (let i in result) {
        createElement(result[i].name);
        var languagesPercentage = getLanguagePercentage(repoName);
        displayGraph(repoName, languagesPercentage)
    }
}

function createElement(repoName) {
    var divElem = document.createElement("div");
    divElem.id = repoName + "Container";
    divElem.innerHTML = repoName;
    document.getElementById("graphs").appendChild(divElem);
}

func();

async function getLanguagePercentage(repoName) {
    const ls = await fetch("https://api.github.com/repos/" + repoName + "/languages");
    const languageStats = await ls.json();

    const totalPtsArr = Object.values(languageStats);
    var totalPts = 0;
    totalPtsArr.forEach((pts) => {
        totalPts += pts;
    });

    const languagesPercentage = {};
    Object.keys(languageStats).forEach((language) => {
        languagesPercentage[language] = (languageStats[language] * 100) / totalPts;
    });

    return languagesPercentage;
}

function displayGraph(repoName, percentageObj) {
    var xValues = Object.keys(percentageObj);
    var yValues = Object.values(percentageObj);
    var colors = [
        "#8E3200",
        "#A64B2A",
        "#D7A86E",
        "#FFEBC1"
    ];
    var title = repoName;

    html = '';

    document.getElementById(repoName + "Container").innerHTML = '&nbsp;';

    html += '<canvas id="' + repoName + 'Pie" style="width:100%;max-width:600px"></canvas>';

    document.getElementById(repoName + "Container").innerHTML = html;

    var elem = document.getElementById(repoName + "Pie").getContext("2d");

    const newChart = new Chart(elem, {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: colors,
            data: yValues
            }]
        },
        options: {
            title: {
            display: true,
            text: title
            }
        }
    });
}