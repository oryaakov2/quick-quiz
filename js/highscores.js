const highestScores = JSON.parse(localStorage.getItem('highestScores')) || [];
const highestScoresList = document.getElementById('highestScoresList');

highestScoresList.innerHTML = highestScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")