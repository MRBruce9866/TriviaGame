$(document).ready(function () {

    $('.startBtn').on("click", function () {
        startGame();
    });

    $('.answer').on("click", function () {
        var answer = $(this).children('span').attr("data-value");
        checkAnswer(answer);
    });

});



var totalQuestions = 10;
var rightAnswers = 0;
var missedQuestions = 0;
var timePerQuestion = 10; //time in seconds
var timeLeft = 0;
var showAnswerTime = 3;  //time in seconds
var questionIndex = 0;
var timerIntervalID = 0;
var correctAnswer = false;
var gameRunning = false;

var questionBank = [ //the correct answer is stored in the index 0 position of the answers array. We shuffle the answers later for display to the player.
    new Question("What color do the ghost enemies turn when Pacman eats a power pellet?", ["Blue", "Red", "Yellow", "Green"], "assets/images/Pacman.png"),
    new Question("How long did it take Markus Persson to create the first version of Minecraft?", ["1 week", "3 days", "1 month", "2 weeks"], "assets/images/Minecraft.png"),
    new Question("In every Mario Kart title, what is the name of the last track of the Special Cup?", ["Rainbow Road", "Bowser Castle", "Mario Circuit", "Bowser's Keep"], "assets/images/RainbowRoad.png"),
    new Question("Crash Bandicoot was released in what year?", ["1996", "1994", "1999", "1998"], "assets/images/Crash.png"),
    new Question("Which Mario character has appeared in all of the Mario Party games EXCEPT one?", ["Wario", "Waluigi", "Bowser", "Peach"], "assets/images/Wario.png"),
    new Question("Solid Snake is a hero in what video game series?", ["Metal Gear", "Red Dead Redemption", "Castlevania", "Fallout"], "assets/images/SolidSnake.png"),
    new Question("What was Mario's original name?", ["Jumpman", "Redman", "Plumber Man", "Fred"],"assets/images/Jumpman.png"),
    new Question("How many Chaos Emeralds are in the Sonic the Hedgehog universe?", ["7", "9", "5", "10"],"assets/images/Chaos.png"),
    new Question("What codename was used during the developement of the Nintendo Gamecube? ", ["Dolphin", "Rubix", "Nitro", "Atlantis"],"assets/images/GameCube.png"),
    new Question("How many levels are in Super Mario World for the NES?", ["72", "96", "128", "64"],"assets/images/SuperMarioWorld.png")

]


function startGame() {
    if (questionBank.length < totalQuestions) totalQuestions = questionBank.length;
    $('.startBtn').hide();
    $('.mainGame').show()
    shuffle(questionBank);
    displayQuestion(questionBank[questionIndex]);
}

function resetGame() {
    rightAnswers = 0;
    missedQuestions = 0;
    timeLeft = timePerQuestion;
    questionIndex = 0;
    totalQuestions = 10;
    $('.gameResults').remove();
    startGame();
}


function nextQuestion() {
    questionIndex++;

    if (questionIndex > totalQuestions - 1) {
        displayResults();
    } else {
        displayQuestion(questionBank[questionIndex]);
    }

}

function checkAnswer(answer = -1) {

    clearTimer(timerIntervalID);

    console.log(answer)

    answer = parseInt(answer);

    console.log(answer)

    switch (answer) {
        case -1:

            //Missed Question Logic
            missedQuestions++;

            break;
        case 0:

            //Right Answer Logic
            rightAnswers++;

            break;

        default:
            break;
    }

    displayAnswer(answer);
    setTimeout(function () {
        $('.gameAnswer').remove();
        $('.mainGame').show();
        nextQuestion();

    }, showAnswerTime * 1000);

}

function displayQuestion(quest) {
    //show Timer Display
    timeLeft = timePerQuestion;
    $('.gameTimer').empty();
    $('.gameTimer').append($('<div>').addClass('timerDisplay mx-auto').text(timeLeft));

    $('#gameQuestionIndex').text(questionIndex + 1);
    $('#gameQuestionTotal').text(totalQuestions);


    //show question
    $('.gameQuestion').text(quest.question);
    $('.gameAnswerBox').show();


    var answerDisplayArray = shuffle(quest.answers.slice());
    for (let i = 0; i < answerDisplayArray.length; i++) {
        $('#gameAnswer' + i).attr("data-value", quest.answers.indexOf(answerDisplayArray[i])).text(answerDisplayArray[i]);
    }

    startTimer();

}

function displayAnswer(display) {

    $('.mainGame').hide();

    var answerContainer = $('<div>').addClass("col-12 gameAnswer");


    switch (display) {
        case -1:

            answerContainer.append($('<h1>').addClass("my-5").text("You ran out of time!"));

            break;
        case 0:
            answerContainer.append($('<h1>').addClass("my-5").text("Correct!"));

            break;

        default:
            answerContainer.append($('<h1>').addClass("my-5").text("Wrong"));


            break;
    }

    answerContainer.append($('<hr>').addClass("my-5"))
    answerContainer.append($('<h2>').text(questionBank[questionIndex].answers[0]));
    
    if (questionBank[questionIndex].image !== "") {
        answerContainer.append($('<img>').addClass("answerImage mt-5").attr("src", questionBank[questionIndex].image));
    }

    answerContainer.append($('<hr>').addClass("my-5"))

    answerContainer.insertAfter('.gameTitle');


}

function displayResults() {
    $('.mainGame').hide();

    var resultsContainer = $('<div>').addClass("col-12 gameResults");
    resultsContainer.append($('<h1>').addClass("my-5").text("Results"));
    resultsContainer.append($('<h3>').text("Correct Answers: " + rightAnswers));
    resultsContainer.append($('<h3>').text("Incorrect Answers: " + (totalQuestions - rightAnswers - missedQuestions)));
    resultsContainer.append($('<h3>').text("Missed Questions: " + missedQuestions));
    resultsContainer.append($('<h2>').addClass("my-5").text("Score: " + Math.round((rightAnswers / totalQuestions * 100))));
    resultsContainer.append($('<button>').text("Play Again?").bind("click", resetGame));
    resultsContainer.insertAfter('.gameTitle');
}



//Fisher-Yates shuffle function
function shuffle(array) {

    var temp = null,
        randomIndex = 0;

    for (let i = array.length - 1; i > 0; i--) {

        randomIndex = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }

    return array;

}



function countDown() {
    timeLeft--;
    $('.timerDisplay').text(timeLeft);
    if (timeLeft <= 0) {
        checkAnswer(-1);
    }
}


function startTimer() {

    if (!gameRunning) {
        gameRunning = true;
        timerIntervalID = setInterval(function () {
            countDown();
        }, 1000);
    }
}

function clearTimer() {
    gameRunning = false;
    clearInterval(timerIntervalID);
}


function showText(element, text) {
    element.text(text);
}

function showHTML(element, html) {
    element.html(html);
}

function Question(quest, answerArray, img) {
    this.question = quest;
    this.answers = answerArray;
    this.image = img;
}