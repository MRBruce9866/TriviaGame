$(document).ready(function () {

    $('.startBtn').on("click", function () {
        game.startGame();
    });

});


var game = {
    totalQuestions: 10,
    rightAnswers: 0,
    timePerQuestion: 2, //time in seconds
    timeLeft: 2,
    currentQuestionIndex: 0,
    questionIndex: 0,
    timerIntervalID: 0,
    correctAnswer: false,
    isRunning: false,

    questionBank: [ //the correct answer is stored in the index 0 position of the answers array.
        new Question("What color do the ghost enemies turn when Pacman eats a power pellet?", ["Blue", "Red", "Yellow", "Green"], ""),
        new Question("How long did it take Markus Persson to create the first version of Minecraft?", ["1 week", "3 days", "1 month", "2 weeks"], ""),
        new Question("In every Mario Kart title, what is the name of the last track of the Special Cup?", ["Rainbow Road", "Bowser Castle", "Mario Circuit", "Bowser's Keep"], ""),
        new Question("Crash Bandicoot was released in what year?", ["1996", "1994", "1999", "1998"], ""),
        new Question("Which Mario character has appeared in all of the Mario Party games EXCEPT one?", ["Wario", "Waluigi", "Bowser", "Peach"], ""),
        new Question("Solid Snake is a hero in what video game series?", ["Metal Gear", "Red Dead Redemption", "Castlevania", "Fallout"], ""),
        // new Question("", ["", "", "", ""],""),
        // new Question("", ["", "", "", ""],""),
        // new Question("", ["", "", "", ""],""),

    ],


    startGame: function () {
        $('.startBtn').hide();
        this.shuffleQuestions();
        this.displayQuestion(this.questionBank[this.questionIndex]);

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
        } else {
            console.log(this)
            this.displayQuestion(this.questionBank[this.questionIndex]);
        }

    },

    checkAnswer: function (answer) {

        if (answer === this.questionBank[this.questionIndex].answers[0]) {
            this.correctAnswer = true;
        } else {
            this.correctAnswer = false;
        }

        this.displayAnswer();

    },

    displayQuestion: function (quest) {
        //show Timer Display
        $('.gameTimer').append($('<div>').addClass('timerDisplay mx-auto').text(this.timeLeft));

        //show question
        $('.gameQuestion').text(quest.question);

        $('.gameAnswerBox').show();

        for (let i = 0; i < quest.answers.length; i++) {
            $('#gameAnswer' + i).text(this.questionBank[this.questionIndex].answers[i]);
        }
        this.timeLeft = this.timePerQuestion;
        this.startTimer();

    },

    displayAnswer: function () {
        if (this.correctAnswer) {

        } else {

        }

        setTimeout(this.nextQuestion, 5000);
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
        console.log(this)

        var obj = this;

        if (!this.isRunning) {
            this.isRunning = true;
            this.timerIntervalID = setInterval(function(){
                obj.countDown(obj);
            }, 1000);
        }
    },

    clearTimer: function () {
        this.isRunning = false;
        clearInterval(this.timerIntervalID);
    },

    countDown: function (obj) {
        console.log(this);
        obj.timeLeft--;
        console.log(obj.timeLeft);
        if (obj.timeLeft <= 0) {
            obj.timesUp();
        } else {
            $('.timerDisplay').text(obj.timeLeft);
        }

    },

    timesUp: function () {
        this.clearTimer();

        this.displayTimesUp();

        setTimeout(this.nextQuestion, 5000);

    }

};


function showText(element, text) {
    element.text(text);
}

function showHTML(element, html) {
    element.html(html);
}

function Question(quest, answerArray, img, desc) {
    this.question = quest;
    this.answers = answerArray;
    this.image = img;
}