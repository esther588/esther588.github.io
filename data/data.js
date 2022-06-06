const url = "https://api.github.com/users/esther588/repos";
const response = await fetch(url);
const result = await response.json();
for (let i in result) {
    languagesPercentage = getLanguagePercentage(result[i].name);
    displayGraph(result[i].name, languagesPercentage);
}

function getLanguagePercentage(repoName) {
    const ls = await fetch("https://api.github.com/repos/" + repoName + "/languages");
    const languageStats = await ls.json();

    const totalPtsArr = Object.values(languageStats);
    var totalPts = 0;
    totalPtsArr.forEach((pts) => {
        totalPts += pts;
    });

    const languagesPercentage = [];
    Object.keys(languageStats).forEach((language) => {
        languagesPercentage[language] = (languageStats[language] * 100) / totalPts;
    });

    return languagesPercentage;
}

function displayGraph(repoName, percentageArr) {
    html = '';

    document.getElementById("graphContainer").innerHTML = '&nbsp;';

    html += '<canvas id="' + repoName + 'Line" style="width:100%;max-width:600px"></canvas>';
    html += '<canvas id="' + repoName + 'Bar" style="width:100%;max-width:600px"></canvas>';
    html += '<canvas id="' + repoName + 'Pie" style="width:100%;max-width:600px"></canvas>';

    document.getElementById("acneContainer").innerHTML = html;

    var elem = document.getElementById(repoName + "Line").getContext("2d");
    var elem1 = document.getElementById(repoName + "Bar").getContext("2d");
    var elem2 = document.getElementById(repoName + "Pie").getContext("2d");

    const newChart = new Chart(elem, {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: acneColors,
            data: acneValues
            }]
        },
        options: {
            title: {
            display: true,
            text: acneTitle
            }
        }
    });

    const newChart1 = new Chart(elem1, {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: acneColors,
            data: acneValues
            }]
        },
        options: {
            title: {
            display: true,
            text: acneTitle
            }
        }
    });

    const newChart2 = new Chart(elem2, {
        type: "pie",
        data: {
            labels: xValues,
            datasets: [{
            backgroundColor: acneColors,
            data: acneValues
            }]
        },
        options: {
            title: {
            display: true,
            text: acneTitle
            }
        }
    });
}