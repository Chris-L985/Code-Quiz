const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const startScreenElements = document.getElementById('start-cont');
const questionContainerElement = document.getElementById('question-wrap-cont');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answers-buttons');
const endScreen = document.getElementById('end-screen');

var submitButton = document.querySelector('#submit');
var userInitials = document.querySelector('#initials');

let shuffledQuestions, currentQuestionIndex

// timer code
$(document).ready(() => {
    const timeLeftDisplay = document.querySelector('#timer')
    let  timeLeft = 60
 
    let count;

    const countDown = (action) => {
        if (action === "start") {
            count = setInterval(() => {
                console.log("count interval")
                if(timeLeft <= 0 ) {
                    clearInterval(timeLeft = 0)
                }
                 
                timeLeftDisplay.innerHTML = timeLeft
                timeLeft -=1
            }, 1000);
        }
        if (action === 'stop') {
            console.log('count stop');
            clearInterval(count);  
        }
    };

    startButton.addEventListener('click', countDown("start"));

    // start game
    startButton.addEventListener('click', startGame);
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        setNextQuestion()
    })
    
    function startGame() {
        startButton.classList.add('hide')
        startScreenElements.classList.add('hide')
        questionContainerElement.classList.remove('hide')
        shuffledQuestions = question.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        setNextQuestion()
        timeLeft = 60;
    }
    // end start game
    
    // end game function
    function endGame() {
        clearStatusClass(document.body)
        endScreen.classList.remove('hide')
        questionContainerElement.classList.add('hide')
        countDown('stop');
        $('#final-score').text(timeLeft + 1);
    }
    
    function showHighscorePage() {
        window.location.href="highscores.html";
    };

    const localStorageUtility = (action, value) => {
        if (action === 'set') {
            const highscores = JSON.parse(localStorage.getItem('highscores') ?? "[]");
            highscores.push(value);
            localStorage.setItem('highscores', JSON.stringify(highscores));
        } else if (action === 'get') {
            return JSON.parse(localStorage.getItem('highscores') ?? "[]");
        }
    };
    
    // enter initials to highscore
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
    
        var userInit = $('#initials').val();
        var userTime = $('#final-score').text();
    
        if (userInit === '') {
            alert('error', 'Initials cannot be blank');
        } else {
            alert('success', 'Registered successfully');
    
            const prettyValue = `${userInit} - ${userTime}`;
            localStorageUtility("set", prettyValue);
            showHighscorePage();
        }
    });
    
    // randomize and set questions
    function setNextQuestion() {
        resetState()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }
    
    // return text to questions
    function showQuestion(question) {

        questionElement.innerText = question.question
        question.answers.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btn')
            if (answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener('click', selectAnswer)
            answerButtonsElement.appendChild(button)
        })
    }
    
    // reset bg color after every clicking next 
    function resetState() {
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
        }
    }
    
    // allows answer to be selected and cycles questions
    function selectAnswer(e) {

        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        setStatusClass(document.body, correct)
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
        } else {
            endGame();
        }
    }
    
    // Highscore placeholder
    // let placeHolderScores = 
    //     JSON.parse(localStorage.getItem('highscores')) ?? [];
    // let olEl = placeHolderScores.map(function(highscore, index) {
    //     return `<li>${highscore.initials} - ${highscore.score}</li>`;
    // });
    
    // determines whether answer is correct or not changes background color
    function setStatusClass(element, correct) {
        clearStatusClass(element)
      
        if (correct) {
            element.classList.add('correct')
        } else if (!correct) {
            element.classList.add('wrong')
            if (question.length - 1 !== currentQuestionIndex) {
                timeLeft = timeLeft - 10;
            }
        }
    }
    
    // resets background color before next question
    function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }
    
    // array for questions
    const question = [
        {
            question: 'What are the two possible values of a boolean type?',
            answers: [
                { text: 'True and False', correct: true },
                { text: 'Array and String', correct: false}
            ]
        },
        {
            question: 'Which web browser implements Document.attachEvent()?',
            answers: [
                { text: 'Google Chrome', correct: false },
                { text: 'Mozilla Firefox', correct: false},
                { text: 'Internet Explorer 8 and Below', correct: true },
                { text: 'Opera', correct: false }
            ]
        },
        {
            question: 'How do you create a DIV element using JavaScript?',
            answers: [
                { text: 'documentItem.createElement(???div???)', correct: false },
                { text: 'document.createElement(???div???)', correct: true },
                { text: 'document.Element(???div???)', correct: false },
                { text: 'document = Element(div)', correct: false}
            ]
        },
        {
            question: 'What is the one and only way to control variable scope in JavaScript?',
            answers: [
                { text: 'Functions', correct: true },
                { text: 'Arrays', correct: false},
                { text: 'Numbers', correct: false},
                { text: 'Elements', correct: false}
            ]
        },
        {
            question: 'What is a prompt box?',
            answers: [
                { text: 'A prompt box is a box that allows the user to enter input by providing a text box.', correct: true },
                { text: 'A keyword that refers to a keyword to the object from where it is called.', correct: false},
                { text: 'A box used to store data.', correct: false},
                { text: 'A box that provides information to the user.', correct: false}
            ]
        }
    ]
    
    // Highscore code 
    
    
    // sumbitting highscore input to highscore page
});


