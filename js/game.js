const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const game = document.getElementById("game");
const loader = document.getElementById("loader");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let progressPrecentage = 0;

let questions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    .then(response => response.json())
    .then(randomQuestions => {
        questions = randomQuestions.results.map(randomQuestion => {
            const formattedQuestion = {
                question: randomQuestion.question
            }

            const answerChoices = [...randomQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1;

            answerChoices.splice(formattedQuestion.answer - 1, 0, randomQuestion.correct_answer)

            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice
            })

            return formattedQuestion;
        })

        startGame();
    })

startGame = () => {
    questionCounter = 0;
    score = 0;
    progressPrecentage = 0;
    availableQuestions = [...questions];

    game.classList.remove("hidden");
    loader.classList.add("hidden");

    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    questionCounter++;

    progressPrecentage += 100 / MAX_QUESTIONS
    progressBarFull.style.width = `${progressPrecentage}%`

    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`

    let randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[randomIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(randomIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) {
            return;
        }

        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = parseInt(selectedChoice.dataset['number']);

        const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

        choice.parentElement.classList.add(classToApply);

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS)
        }

        setTimeout(() => {
            choice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)

    })
})

function incrementScore(num) {
    score += num;
    scoreText.innerText = score;
}