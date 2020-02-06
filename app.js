const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn')
const showResults = document.getElementById('score-btn')
const restartButton = document.getElementById('restart-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons')
const displayScore = document.getElementById('score')

let shuffleQuestions, currentQuestionIndex

var correctAnswers = 0;



startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

restartButton.addEventListener('click', () => {
    resetScore();
})

showResults.addEventListener('click', () => {
    showScore()
})

function startGame() {
    startButton.classList.add('hide')
    shuffleQuestions = myQuestions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function resetScore() {
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
    correctAnswers = 0;
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {   
            button.dataset.correct = answer.correct
        } else {

        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.append(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild)
        
    }
}

// work on editing this to see if can get score updated

function setScore(score) {
    if (score === 'true') {
        correctAnswers++
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    //setStatusClass(document.body, correct)
    setScore(correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        restartButton.classList.remove('hide')
        showResults.classList.remove('hide')
    }
}

function showScore() {
    alert("you got " + correctAnswers + "/" + myQuestions.length);
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct === 'true') {
        element.classList.add('correct')    
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const myQuestions = [
    {
        question: 'Who are the 5 best friends in HIMYM?',
            answers: [
                { text: 'Ted, Robin, Barney, Lily, & Marshall', correct: true},
                { text: 'Rachel, Ross, Monica, Chandler, and Joey', correct: false},
                { text: 'Tim, Rachel, Barry, Lily, & Micahel', correct: false},
                { text: 'Eric, Kelso, Donna, Jackie, Fez, & Hyde', correct: false}

            ]
    },
    {
        question: "Who is the girl that both Ted and Barney fall in love with?",
        answers: [
            { text: 'Rachel', correct: true},
            { text: 'Robin', correct: false},
            { text: 'Lily', correct: false},
            { text: 'Stella', correct: false}

        ]
    }
]

   /* if (correct = true) {
        score++
    }


/*
for (var i = 0; i < myQuestions.length; i++) {
    if (score === myQuestions[i].answer) {
        score++;
    }
}
*/


