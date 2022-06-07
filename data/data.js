func();
async function func() {
    const url = "https://api.github.com/users/esther588/repos";
    const response = await fetch(url);
  const result = await response.json();
  for (let i in result) {
        createElement(result[i].name);
    }
}

function createElement(repoName) {
    var divElem = document.createElement("div");
    divElem.id = repoName + "Container";
    divElem.innerHTML = repoName;
    document.getElementById("graphs").appendChild(divElem);
}

