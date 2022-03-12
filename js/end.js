const username = document.getElementById('username');
const saveBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const highestScores = JSON.parse(localStorage.getItem('highestScores')) || [];

finalScore.innerText = mostRecentScore;

const MAX_HIGH_SCORES = 5;

username.addEventListener('keyup', () => {
    saveBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highestScores.push(score);
    highestScores.sort((a, b) => a - b).splice(MAX_HIGH_SCORES)

    localStorage.setItem('highestScores', JSON.stringify(highestScores));

    window.location.assign('../index.html');
}