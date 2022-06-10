async function func() {
    const url = "https://api.github.com/users/esther588/repos";
    const response = await fetch(url);
    const result = await response.json();
    var index = 0;
    for (let i in result) {
        createElement(result[i].name);
        var languagesPercentage = await getLanguagePercentage(result[i].name);
        chooseColors(result[i].name, index);
        displayGraph(result[i].name, languagesPercentage, index);
        if(index == 3) {
            index = 0;
        } else {
            index++;
        }
    }
}

function createElement(repoName) {
    var divElem = document.createElement("div");
    divElem.id = repoName + "Container";
    document.getElementById("graphs").appendChild(divElem);
}

func();

async function getLanguagePercentage(repoName) {
    const ls = await fetch("https://api.github.com/repos/esther588/" + repoName + "/languages");
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

function chooseColors(repoName, index) {
    var colors1 = [
        "#8E3200",
        "#A64B2A",
        "#D7A86E",
        "#FFEBC1"
    ];
    var colors2 = [
        "#4E944F",
        "#83BD75",
        "#B4E197",
        "#E9EFC0"
    ];
    var colors3 = [
        "#1A3C40",
        "#1D5C63",
        "#417D7A",
        "#EDE6DB"
    ];
    var colors4 = [
        "#E9D5DA",
        "#827397",
        "#4D4C7D",
        "#363062"
    ];
    if(index == 0) {
        const jsonArr = JSON.stringify(colors1);
        localStorage.setItem(repoName + " colors", jsonArr);
    } else if(index == 1) {
        const jsonArr = JSON.stringify(colors2);
        localStorage.setItem(repoName + " colors", jsonArr);
    } else if(index == 2) {
        const jsonArr = JSON.stringify(colors3);
        localStorage.setItem(repoName + " colors", jsonArr);
    } else if(index == 3) {
        const jsonArr = JSON.stringify(colors4);
        localStorage.setItem(repoName + " colors", jsonArr);
    }
}

function displayGraph(repoName, percentageObj, index) {
    var xValues = Object.keys(percentageObj);
    var yValues = Object.values(percentageObj);
    const strColors = localStorage.getItem(repoName + " colors");
    var colors = JSON.parse(strColors);
    var title = repoName;

    html = '';

    document.getElementById(repoName + "Container").innerHTML = '&nbsp;';

    if(index == 0 || index == 3) {
        html += '<section><canvas id="' + repoName + 'Pie" style="width:100%;max-width:600px"></canvas></section>';
    } else if(index == 1) {
        html += '<section class="two"><canvas id="' + repoName + 'Pie" style="width:100%;max-width:600px"></canvas></section>';
    } else if(index == 2) {
        html += '<section class="three"><canvas id="' + repoName + 'Pie" style="width:100%;max-width:600px"></canvas></section>';
    }

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