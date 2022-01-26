var score = 0;
var questionConsole = 0;

// questions

var questions = [
    {
        title: 'To figure out how many items there are in an Array, I should use:',
        choices: ['length', 'length()', 'size', 'count()'],
        answer: 'length'
    }, 
    
    {
        title: 'What are the JavaScript statements that define the function enclosed in?',
        choices: ['parenthesis', 'script brackets', 'dashes', 'curly brackets'],
        answer: 'curly brackets'
    },

    {
        title: 'What is JSONs primary use case?',
        choices: ['Writing Frontend code', 'To use and store data', 'Writing API code', 'To connect Javascript to java'],
        answer: 'To use and store data'
    }, 
    
    {
        title: 'Which of the following is NOT a valid way to create an Array?',
        choices: ['var arr = new Array(1,2,3)', 'var arr = [1,2,3]', 'var arr =(1,2,3)'],
        answer: 'var arr =(1,2,3)'
    },

    {
        title: 'Arrays in Javascript can be used to store what?',
        choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
        answer: 'all of the above'
    },
];

// starting code

var timer = document.querySelector('#timer');
var start = document.querySelector('#Start');
var questionsli = document.querySelector('#questionsli');
var wrapper = document.querySelector('#wrapper');
var timeLeft = 75;
var penalty =  15;
var holdInterval = 0;
var ulCreate = document.createElement('ul');

start.addEventListener('click', function() {
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            timeLeft--;
            timer.textContent = 'Time: ' + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(holdInterval);
                Buzzer();
                timer.textContent = 'Beep! Mouses down, time is up!';
            }
        }, 1000);
    }
    render(questionConsole);
});

function render(questionConsole) {
    questionsli.innerHTML = '';
    ulCreate.innerHTML = '';
    for (var i = 0; i < questions.length; i++) {
        var usrQuestion = questions[questionConsole].title;
        var usrChoices = questions[questionConsole].choices;
        questionsli.textContent = usrQuestion;
    }
    usrChoices.forEach(function (newItem) {
        var listItem = document.createElement('li');
        listItem.textContent = newItem;
        questionsli.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener('click', (compare));
    })
}

function compare(event) {
    var element = event.target;
    if (element.matches('li')) {
        var newDiv = document.createElement('div');
        newDiv.setAttribute('id', 'newDiv');
        if (element.textContent == questions[questionConsole].answer) {
            score++;
            newDiv.textContent = 'Bingo!! the correct answer is: ' + questions[questionConsole].answer;
        } else {
            timeLeft = timeLeft - penalty;
            newDiv.textContent = 'Wrong :^( the right answer is: ' + questions[questionConsole].answer;
        }
    }
    questionConsole++;
    if (questionConsole >= questions.length) {
        Buzzer();
        newDiv.textContent = 'Times up!' + '' + 'you got ' + score + '/' + questions.length + ' right!';
    } else {
        render(questionConsole);
    }
    questionsli.appendChild(newDiv);
}

function Buzzer() {
    questionsli.innerHTML = '';
    timer.innerHTML = '';
    var newH1 = document.createElement('h1');
    newH1.setAttribute('id', 'newH1');
    newH1.textContent = 'Bzzz! All Done!';
    questionsli.appendChild(newH1);
    var newP = document.createElement('p');
    newP.setAttribute('id', 'newP');
    questionsli.appendChild(newP);
    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var secondP = document.createElement('p');
        clearInterval(holdInterval);
        newP.textContent = 'Your score is: ' + timeRemaining;
        questionsli.appendChild(secondP);
    }

    var newLabel = document.createElement('label');
    newLabel.setAttribute('id', 'newLabel');
    newLabel.textContent = 'Enter name: ';
    questionsli.appendChild(newLabel);

    var usrInput = document.createElement('input');
    usrInput.setAttribute('type', 'text');
    usrInput.setAttribute('id', 'AlphaBeta');
    usrInput.textContent = '';
    questionsli.appendChild(usrInput);

    var newSubmit = document.createElement('button');
    newSubmit.setAttribute('type', 'submit');
    newSubmit.setAttribute('id', 'Submit');
    newSubmit.textContent = 'Submit';
    questionsli.appendChild(newSubmit);
    questionsli.addEventListener('click', function() {
        var AlphaBeta = usrInput.value;
        if (AlphaBeta === null) {
            console.log('I get you want to be mysterious, but you have to put something in');
        } else {
            var finalScore = {
                AlphaBeta: AlphaBeta,
                score: timeRemaining
            }
            console.log(finalScore);
            var scoreBoard = localStorage.getItem('scoreBoard');
            if (scoreBoard === null) {
                scoreBoard = [];
            } else {
                scoreBoard = JSON.parse(scoreBoard);
            }
            scoreBoard.push(finalScore);
            var newScore = JSON.stringify(scoreBoard);
            localStorage.setItem('highScores', newScore);
            window.location.replace('./ScoreBoard.html');
        }
    });



}