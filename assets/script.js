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
var start = document.querySelector('#start');
var questionsli = document.querySelector('#questionsli');
var wrapper = document.querySelector('wrapper');
var timeLeft = 75;
var penalty =  15;
var holdInterval = 0;
var ulCreate = document.createElement('ul');

timer.addEventListener('click', function() {
    if (holdInterval === 0) {
        holdInterval = setInterval(function() {
            timeLeft--;
            timer.textContent = 'Time: ' + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                timer.textContent = 'Beep! Mouses down, time is up!';
            }
        }, 1000)
    }
    render(questionConsole);
});