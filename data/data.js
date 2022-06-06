const url = "https://api.github.com/users/esther588/repos";
const response = await fetch(url);
const result = await response.json();
for (let i in result) {
    languagesPercentage = getLanguagePercentage(result[i].name);
}

function getLanguagePercentage(repoName) {
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