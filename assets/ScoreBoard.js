var scoreBoard = document.querySelector("#scoreBoard");
var clear = document.querySelector("#clear");
var Back = document.querySelector("#Back");


Back.addEventListener("click", function () {
    window.location.replace("./index.html");
});
var highScores = localStorage.getItem("highScores");
highScores = JSON.parse(highScores);
if (highScores !== null) {
    for (var i = 0; i < highScores.length; i++) {
        var newLi = document.createElement("li");
        newLi.textContent = highScores[i].AlphaBeta + " " + highScores[i].score;
        scoreBoard.appendChild(newLi);
    }
}

clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});