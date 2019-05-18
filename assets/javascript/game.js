$(document).ready(function () {

    var temp = $('.gameQuestion');
    game.shuffleQuestions();
    console.log(game.questionBank);


});


var game = {
    totalQuestions: 10,
    rightAnswers: 0,
    timePerQuestion: 20, //time in seconds
    timeLeft: this.timePerQuestion,
    currentQuestionIndex: 0,
    questionIndex: 0,
    timerIntervalID: 0,
    correctAnswer: false,

    questionBank: [ //the correct answer is stored in the index 0 position of the answers array.
        new Question("A", ["", "", "", ""]),
        new Question("B", ["", "", "", ""]),
        new Question("C", ["", "", "", ""]),
        new Question("D", ["", "", "", ""]),
        new Question("E", ["", "", "", ""]),
        new Question("F", ["", "", "", ""]),
        new Question("G", ["", "", "", ""]),
        new Question("H", ["", "", "", ""]),
        new Question("I", ["", "", "", ""]),
        new Question("J", ["", "", "", ""]),
        new Question("K", ["", "", "", ""]),
        new Question("L", ["", "", "", ""]),
        new Question("M", ["", "", "", ""]),
        new Question("N", ["", "", "", ""]),
        new Question("O", ["", "", "", ""]),
        new Question("P", ["", "", "", ""]),
        new Question("Q", ["", "", "", ""]),
        new Question("R", ["", "", "", ""]),
        new Question("S", ["", "", "", ""]),
        new Question("T", ["", "", "", ""]),
    ],


    startGame: function () {

    },

    resetGame: function () {
        this.rightAnswers = 0;
        this.timeLeft = this.timePerQuestion;
        this.currentQuestionIndex = 0;
        this.questionIndex = 0;
    },


    nextQuestion: function () {
        this.questionIndex++;

        if (this.questionIndex >= this.totalQuestions - 1) {
            this.displayResults();
        }else{
            this.displayQuestion(this.questionBank[this.questionIndex]);
        }

    },

    checkAnswer: function(answer){

        if(answer === this.questionBank[this.questionIndex].answers[0]){
            this.correctAnswer = true;
        }else{
            this.correctAnswer = false;
        }

        this.displayAnswer();

    },

    displayQuestion: function (question) {


    },

    displayAnswer: function () {
        if(correctAnswer){

        }else{

        }

        setTimeout(nextQuestion, 5000);
    },

    displayResults: function () {

    },

    displayTimesUp: function () {
        this.displayAnswer();
    },

    //Fisher-Yates shuffle function
    shuffleQuestions: function (array) {

        var temp = null,
            randomIndex = 0;

        for (let i = this.questionBank.length - 1; i > 0; i--) {

            randomIndex = Math.floor(Math.random() * (i + 1));
            temp = this.questionBank[i];
            this.questionBank[i] = this.questionBank[randomIndex];
            this.questionBank[randomIndex] = temp;
        }

    },

    startTimer: function () {
        this.timerIntervalID = setInterval(countDown, 1000);
    },

    clearTimer: function () {
        clearInterval(this.timerIntervalID);
    },

    countDown: function () {
        this.timeLeft--;
        if (this.timeLeft <= 0) this.timesUp();
    },

    timesUp: function () {

        this.displayTimesUp();

        setTimeout(nextQuestion, 5000);

    }

};


function showText(element, text) {
    element.text(text);
}

function showHTML(element, html) {
    element.html(html);
}

function selectRandomQuestion(questionArray) {
    return Math.floor(Math.random() * questionArray.length);
}

function Question(quest, answerArray) {
    this.question = quest;
    this.answers = answerArray;
}