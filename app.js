const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn')
const showResults = document.getElementById('score-btn')
const restartButton = document.getElementById('restart-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons')
// modals //

const modal = document.getElementById('modal')
const modal2 = document.getElementById('modal-2')
const modal3 = document.getElementById('modal-3')
const modal4 = document.getElementById('modal-4')
const modal5 = document.getElementById('modal-5')

let modalBtn = document.querySelector('modal-btn')
// let modalBtn2 = document.querySelector('modal-btn-2')
// let modalBtn3 = document.querySelector('modal-btn-3')
// let modalBtn4 = document.querySelector('modal-btn-4')
// let modalBtn5 = document.querySelector('modal-btn-5')

// modalBtn.addEventListener('click', () => {
//     modal.style.display = 'none'
// })

// modalBtn2.addEventListener('click', () => {
//     modal.style.display = 'none'
// })

// modalBtn3.addEventListener('click', () => {
//     modal.style.display = 'none'
// })

// modalBtn4.addEventListener('click', () => {
//     modal.style.display = 'none'
// })

// modalBtn5.addEventListener('click', () => {
//     modal.style.display = 'none'
// })

// modals close//

let randomQuestions, currentQuestionIndex

var correctAnswers = 0;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

restartButton.addEventListener('click', () => {
    resetScore();
    restartButton.classList.add('hide');
    questionContainerElement.classList.add('hide')
    showResults.classList.add('hide')
    startButton.classList.remove('hide');
})

showResults.addEventListener('click', () => {
    showScore()
})

function startGame() {
    startButton.classList.add('hide')
    randomQuestions = myQuestions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()

}

function setNextQuestion() {
    resetState()
    showQuestion(randomQuestions[currentQuestionIndex])
}

function resetScore() {
    resetState()
    showQuestion(randomQuestions[currentQuestionIndex])
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
    setStatusClass(document.body, correct)
    setScore(correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (randomQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        restartButton.classList.remove('hide')
        showResults.classList.remove('hide')
    }
}



function showScore() {
    var scorePercentage = (correctAnswers*100)/myQuestions.length
    if (scorePercentage > 90) {
    alert("Congratulations! You scored " + scorePercentage + "%!")
    } else {
    alert("Nice job! You scored " + scorePercentage + "%!" );
    }
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
            { text: 'Rachel', correct: false},
            { text: 'Robin', correct: true},
            { text: 'Lily', correct: false},
            { text: 'Stella', correct: false}

        ]
    },
    {
        question: "Why did Lily break-up with Marshall?",
        answers: [
            { text: 'To pursue a career in acting', correct: false},
            { text: 'In order to move to San Francisco to pursue art', correct: true},
            { text: 'Marshall is the worst', correct: false},
            { text: 'Ted lied to Lily about Marshall cheating', correct: false}

        ]
    },
    // {
    //     question: "What does Ted present to Robin in the ending of the series finale?",
    //     answers: [
    //         { text: 'Her cherished necklase', correct: false},
    //         { text: 'The Pineapple', correct: false},
    //         { text: 'Another new dog', correct: false},
    //         { text: 'Blue French Horn', correct: true}

    //     ]
    // },

    // {
    //     question: "What is the name of the pub that the gang always hangs out in?",
    //     answers: [
    //         { text: 'MacLarens Pub', correct: true},
    //         { text: 'Roanoake Pub', correct: false},
    //         { text: 'McMenamins', correct: false},
    //         { text: 'Central Perk', correct: false}

    //     ]
    // },
    // {
    //     question: "In what year is Ted telling his story to his kids?",
    //     answers: [
    //         { text: '2020', correct: false},
    //         { text: '2025', correct: false},
    //         { text: '2030', correct: true},
    //         { text: '2040', correct: false}

    //     ]
    // },
    // {
    //     question: "In what other popular sitcom did the narrator of Ted play in during the 90's?",
    //     answers: [
    //         { text: 'Fresh Prince of Bel-Air', correct: false},
    //         { text: 'Friends', correct: false},
    //         { text: 'Seinfeld', correct: false},
    //         { text: 'Full House', correct: true}

    //     ]
    // },
    // {
    //     question: "What was the name of the alter-ego popstar Robin Scherbatsky had in Canada?",
    //     answers: [
    //         { text: 'Robin Sparkles', correct: true},
    //         { text: 'Jessica Sparkles', correct: false},
    //         { text: 'Hannah Montana', correct: false},
    //         { text: 'Robin Glitter', correct: false}

    //     ]
    // },
    // {
    //     question: "How successful is the Naked Man move?",
    //     answers: [
    //         { text: '3 out of 4', correct: false},
    //         { text: '4 out of 5', correct: false},
    //         { text: '1 out of 3', correct: false},
    //         { text: '2 out of 3', correct: true}

    //     ]
    // },
    // {
    //     question: "What happens to the mother in the series finale?",
    //     answers: [
    //         { text: 'She and Ted get a divorce', correct: false},
    //         { text: 'Ted proposes and she says yes', correct: false},
    //         { text: 'She dies of an illness', correct: true},
    //         { text: 'She finally returns the yellow umbrella', correct: false}

    //     ]
    // }
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


