let open = document.querySelector('.navbar--icon');
let menu = document.querySelector('.nav--open');
let close = document.querySelector('.nav--open-icon');

open.addEventListener('click', function() {
  menu.classList.toggle('close');
});

close.addEventListener('click', function() {
  menu.classList.toggle('close');
})

async function func() {
    const url = "https://api.github.com/users/esther588/repos";
    const response = await fetch(url);
    const result = await response.json();
    var sectionIndex = 0;
    for (let i in result) {
        createElement(result[i].name);
        displaySection(result[i].name, sectionIndex);
        if(sectionIndex == 2) {
            sectionIndex = 0;
        } else {
            sectionIndex++;
        }
    }
}

function createElement(repoName) {
    var divElem = document.createElement("div");
    divElem.id = repoName + "Container";
    document.getElementById("repos").appendChild(divElem);
}

func();

function displaySection(repoName, index) {

    html = '';

    document.getElementById(repoName + "Container").innerHTML = '&nbsp;';

    if(index == 0) {
        html += '<section><h1><a target="_blank" href="https://github.com/esther588/' + repoName + '">' + repoName + '</a></h1></section>';
    } else if(index == 1) {
        html += '<section class="two"><h1><a target="_blank" href="https://github.com/esther588/' + repoName + '">' + repoName + '</a></h1></section>';
    } else if(index == 2) {
        html += '<section class="three"><h1><a target="_blank" href="https://github.com/esther588/' + repoName + '">' + repoName + '</a></h1></section>';
    }

    document.getElementById(repoName + "Container").innerHTML = html;
}