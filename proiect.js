var LAST_WORD_FINISH_DELAY = 5000;
var SKIP_TIME;
var MAX_TIME;
var MAX_WORDS;
var MAX_USERS;
var START_AREA_INITIATED = false;

function inRange(value, minValue, maxValue) {
    return (value >= minValue && value <= maxValue);
}

function getElementById(name) {
    return document.getElementById(name);
}

var obj = {};
obj.initDOM = function () {
    obj.gameParametersBlock = getElementById("game-parameters-block");
    obj.maxUsersWarning = getElementById("max-users-warning");
    obj.maxWordsWarning = getElementById("max-words-warning");
    obj.maxTimeWarning = getElementById("max-time-warning");
    obj.skipTimeWarning = getElementById("skip-time-warning");
    obj.maxUsersInput = getElementById("max-users-input");
    obj.maxWordsInput = getElementById("max-words-input");
    obj.maxTimeInput = getElementById("max-time-input");
    obj.skipTimeInput = getElementById("skip-time-input");
    obj.applyButton = getElementById("apply-button");

    obj.addWordsBlock = getElementById("add-words-block");
    obj.addWordsInput = getElementById("add-words-input");
    obj.addWordsButton = getElementById("add-words-button");
    obj.userNameInput = getElementById("user-name-input");
    obj.listDoneButton = getElementById("list-done-button");
    obj.listDoneWarning = getElementById("list-done-warning");
    obj.wordsCountWarning = getElementById("words-count-warning");
    obj.userNameWarning = getElementById("user-name-warning");
    obj.startGameWarning = getElementById("start-game-warning");

    obj.confirmBlock = getElementById("confirm-block");
    obj.confirmList = getElementById("confirm-list");
    obj.confirmButton = getElementById("confirm-button");
    obj.cancelButton = getElementById("cancel-button");

    obj.teamNamesBlock = getElementById("team-names-block");
    obj.team1Input = getElementById("team-1-input");
    obj.team2Input = getElementById("team-2-input");
    obj.createTeamsButton = getElementById("create-teams-button");

    obj.wordsLeftBlock = getElementById("words-left-block");

    obj.startGameBlock = getElementById("start-game-block");
    obj.startGameButton = getElementById("start-game-button");

    obj.teamsScoreBlock = getElementById("teams-score-block");
    obj.team1Points = getElementById("team-1-points");
    obj.team2Points = getElementById("team-2-points");
    obj.team1Name = getElementById("team-1-name");
    obj.team2Name = getElementById("team-2-name");

    obj.guessedWordsBlock = getElementById("guessed-words-block");
    obj.guessedWordsList = getElementById("guessed-words-list");

    obj.currentWordBlock = getElementById("current-word-block");
    obj.currentWord = getElementById("current-word");
    obj.guessButton = getElementById("guess-button");
    obj.skipButton = getElementById("skip-button");
    obj.undoButton = getElementById("undo-button");

    obj.timerBlock = getElementById("timer-block");
    obj.currentTime = getElementById("current-time");

    obj.winnerTeamBlock = getElementById("winner-team-block");
    obj.winnerTeam = getElementById("winner-team");

    obj.allWordsBlock = getElementById("all-words-block");
    obj.allWords = getElementById("all-words");

    obj.soundAlert = getElementById("sound-alert");
};

obj.initLogic = function () {
    obj.words = [];
    obj.roundGuessedWords = [];
    obj.listOfWords = [];
    obj.team = 2;
    obj.team1Score = 0;
    obj.team2Score = 0;
};

obj.init = function () {
    obj.initLogic();
    obj.initDOM();
};

obj.gameParameters = function () {
    function init() {
        initDOM();
        initListeners();
    }

    function initDOM() {
        obj.gameParametersBlock.classList.remove("hidden");
    }

    function initListeners() {
        obj.applyButton.addEventListener("click", function () {
            var valid = true;
            MAX_USERS = parseInt(obj.maxUsersInput.value);
            SKIP_TIME = parseInt(obj.skipTimeInput.value);
            MAX_TIME = parseInt(obj.maxTimeInput.value);
            MAX_WORDS = parseInt(obj.maxWordsInput.value);

            if (!inRange(MAX_USERS, 1, 12)) {
                valid = false;
                obj.maxUsersWarning.classList.remove("hidden");
            } else {
                obj.maxUsersWarning.classList.add("hidden");
            }

            if (!inRange(SKIP_TIME, 0, 10000)) {
                valid = false;
                obj.skipTimeWarning.classList.remove("hidden");
            } else {
                obj.skipTimeWarning.classList.add("hidden");
            }

            if (!inRange(MAX_TIME, 5, 300)) {
                valid = false;
                obj.maxTimeWarning.classList.remove("hidden");
            } else {
                obj.maxTimeWarning.classList.add("hidden");
            }

            if (!inRange(MAX_WORDS, 1, 30)) {
                valid = false;
                obj.maxWordsWarning.classList.remove("hidden");
            } else {
                obj.maxWordsWarning.classList.add("hidden");
            }

            if (valid) {
                proceed();
            }
        })
    }

    function proceed() {
        obj.wordsCountWarning.innerHTML = "You need to insert " + MAX_WORDS + " words";
        obj.gameParametersBlock.classList.add("hidden");
        obj.addWords();
    }

    init();
};

obj.addWords = function () {
    function init() {
        initDOM();
        initListeners();
    }

    function initDOM() {
        obj.addWordsBlock.classList.remove("hidden");
        obj.wordsLeftBlock.classList.remove("hidden");
        updateWords();
    }

    function initListeners() {
        var wordsList;
        var countOfUsers = 0;

        obj.listDoneButton.addEventListener("click", function () {
            if (countOfUsers !== MAX_USERS) {
                obj.listDoneWarning.classList.remove("hidden");
                return;
            } else {
                obj.listDoneWarning.classList.add("hidden");
            }
            proceed();
        });

        obj.addWordsButton.addEventListener("click", function () {
            var wordsCount = 0;
            var confirmString = "";
            var valid = true;

            if (countOfUsers === MAX_USERS) {
                obj.startGameWarning.classList.remove("hidden");
                return;
            } else {
                obj.startGameWarning.classList.add("hidden");
            }

            wordsList = [];
            obj.addWordsInput.value.split(/\s+/).forEach(function (word) {
                word = word.toLowerCase().trim();
                if (word !== "") {
                    wordsList.push(word);
                    wordsCount += 1;
                }
            });

            if (wordsCount !== MAX_WORDS) {
                obj.wordsCountWarning.classList.remove("hidden");
                valid = false;
            } else {
                obj.wordsCountWarning.classList.add("hidden");
            }

            if (obj.userNameInput.value.trim() === "") {
                obj.userNameWarning.classList.remove("hidden");
                valid = false;
            } else {
                obj.userNameWarning.classList.add("hidden");
            }

            if (!valid) {
                return;
            }

            wordsList.forEach(function (word) {
                confirmString += "<h4> " + word + " </h4>";
            });
            obj.confirmList.innerHTML = confirmString;
            obj.confirmBlock.classList.remove("hidden");
        });

        obj.confirmButton.addEventListener("click", function () {
            wordsList.forEach(function (word) {
                addWord(word, obj.userNameInput.value.trim());
            });
            obj.addWordsInput.value = "";
            obj.userNameInput.value = "";
            obj.confirmBlock.classList.add("hidden");
            updateWords();
            countOfUsers += 1;
        });

        obj.cancelButton.addEventListener("click", function () {
            obj.confirmBlock.classList.add("hidden");
        });
    }

    function proceed() {
        obj.addWordsBlock.classList.add("hidden");
        obj.wordsLeftBlock.classList.add("hidden");
        obj.createTeams();
    }

    function addWord(word, user) {
        obj.words.push({
            word: word.toLowerCase(),
            user: user,
            time: 0
        });
    }

    function updateWords() {
        obj.wordsLeftBlock.innerHTML = "<h3>There are " + obj.words.length + " words inserted so far. </h3>";
    }

    init();
};

obj.createTeams = function () {
    function init() {
        initDOM();
        initListeners();
    }

    function initDOM() {
        obj.teamNamesBlock.classList.remove("hidden");
    }

    function initListeners() {
        obj.createTeamsButton.addEventListener("click", function () {
            obj.team1Name.innerHTML = obj.team1Input.value;
            obj.team2Name.innerHTML = obj.team2Input.value;
            obj.updateScore();
            proceed();
        });
    }

    function proceed() {
        obj.teamNamesBlock.classList.add("hidden");
        obj.startArea();
    }

    init();
};

obj.updateScore = function () {
    obj.team1Points.innerHTML = obj.team1Score;
    obj.team2Points.innerHTML = obj.team2Score;
    obj.wordsLeftBlock.innerHTML = "<h3>There are " + obj.words.length + " words left. </h3>";
};

obj.startArea = function () {
    if (!obj.words.length) {
        obj.gameOver();
        return;
    }

    function init() {
        initDOM();
        initListeners();
    }

    function initDOM() {
        obj.wordsLeftBlock.classList.remove("hidden");
        obj.teamsScoreBlock.classList.remove("hidden");
        obj.startGameBlock.classList.remove("hidden");
        obj.wordsLeftBlock.innerHTML = "<h3>There are " + obj.words.length + " words left. </h3>";

        if (obj.roundGuessedWords.length !== 0) {
            obj.guessedWordsList.innerHTML = "";
            obj.roundGuessedWords.forEach(function (element) {
                obj.guessedWordsList.innerHTML += "<h3>" + element.word + "</h3>";
            });
            obj.guessedWordsBlock.classList.remove("hidden");
        }
        else {
            obj.guessedWordsBlock.classList.add("hidden");
        }
    }

    function initListeners() {
        if (!START_AREA_INITIATED) {
            obj.startGameButton.addEventListener("click", function () {
                proceed();
            });
            START_AREA_INITIATED = true;
        }
    }

    function proceed() {
        obj.guessedWordsBlock.classList.add("hidden");
        obj.startGameBlock.classList.add("hidden");
        obj.guessedWordsList.innerHTML = "";
        obj.roundSession();
    }

    init();
};

obj.roundSession = function () {
    var wordsRoundCounter;
    var lastChange;
    var lastGuess;
    var lastSkip;
    var skipInterval;
    var int;

    if (!obj.words.length) {
        obj.gameOver();
        return;
    }

    function initLogic() {
        lastChange = Date.now();
        lastGuess = 0;
        lastSkip = 0;
        wordsRoundCounter = 0;
        int = setInterval(timer, 100);
        obj.team = 3 - obj.team;
        obj.startTime = Date.now() / 1000;
        obj.roundGuessedWords = [];
        obj.wordIndex = Math.floor(Math.random() * obj.words.length);
    }

    function init() {
        initLogic();
        initDOM();
        initListeners();
    }

    function initDOM() {
        obj.currentWordBlock.classList.remove("hidden");
        obj.timerBlock.classList.remove("hidden");
        obj.guessButton.removeAttribute("disabled");
        obj.skipButton.removeAttribute("disabled");
        obj.undoButton.removeAttribute("disabled");
        obj.currentWord.innerHTML = obj.words[obj.wordIndex].word;
    }

    var windowListener = function (e) {
        if (e.keyCode === 13) { // Enter
            e.preventDefault();
            if (!obj.guessButton.getAttribute("disabled"))
                obj.guessButton.click();
        }
        else if (e.keyCode === 8) { // Backspace
            e.preventDefault();
            if (!obj.undoButton.getAttribute("disabled"))
                obj.undoButton.click();
        } else if (e.keyCode === 32) { // Space
            e.preventDefault();
            if (!obj.skipButton.getAttribute("disabled"))
                obj.skipButton.click();
        }
    }

    var guessListener = function () {
        if (obj.words.length === 0) {
            return;
        }
        obj.words[obj.wordIndex].time += Date.now() - lastChange;
        lastGuess = Date.now();
        lastChange = lastGuess;
        wordsRoundCounter += 1;
        obj.roundGuessedWords.push(obj.words[obj.wordIndex]);
        obj.words.splice(obj.wordIndex, 1);

        if (obj.team === 1) {
            obj.team1Score += 1;
        } else {
            obj.team2Score += 1;
        }

        obj.updateScore();
        enableSkipButton();

        obj.wordIndex = Math.floor(Math.random() * obj.words.length);
        if (!obj.words.length) {
            obj.currentWord.innerHTML = " ";
        } else {
            obj.currentWord.innerHTML = obj.words[obj.wordIndex].word;
        }
    }

    var skipListener = function () {
        if (obj.words.length === 0) {
            return;
        }
        obj.words[obj.wordIndex].time += Date.now() - lastChange;
        var index = Math.floor(Math.random() * obj.words.length);
        while (index === obj.wordIndex && obj.words.length !== 1) {
            index = Math.floor(Math.random() * obj.words.length);
        }
        obj.wordIndex = index;
        obj.currentWord.innerHTML = obj.words[obj.wordIndex].word;
        lastSkip = Date.now();
        lastChange = lastSkip;
        disableSkipButton();
    }

    var undoListener = function () {
        if (!wordsRoundCounter) {
            return;
        }
        if (obj.words.length !== 0) {
            obj.words[obj.wordIndex].time += Date.now() - lastChange;
        }
        lastChange = Date.now();
        disableSkipButton();
        var lastWord = obj.roundGuessedWords[obj.roundGuessedWords.length - 1];
        wordsRoundCounter -= 1;
        if (obj.team === 1) {
            obj.team1Score -= 1;
        } else {
            obj.team2Score -= 1;
        }
        obj.words.push(lastWord);
        obj.roundGuessedWords.pop();
        obj.wordIndex = obj.words.length - 1;
        obj.currentWord.innerHTML = lastWord.word;
        obj.updateScore();
    }

    function initListeners() {
        window.addEventListener("keydown", windowListener);

        obj.guessButton.addEventListener("click", guessListener);

        obj.skipButton.addEventListener("click", skipListener);

        obj.undoButton.addEventListener("click", undoListener);
    }

    function proceed() {
        clearInterval(int);
        obj.guessButton.removeEventListener("click", endRound);
        obj.skipButton.removeEventListener("click", endRound);
        obj.guessButton.removeEventListener("click", guessListener);
        obj.skipButton.removeEventListener("click", skipListener);
        obj.undoButton.removeEventListener("click", undoListener);
        window.removeEventListener("keydown", windowListener);
        obj.timerBlock.classList.add("hidden");
        obj.currentWordBlock.classList.add("hidden");
        obj.roundGuessedWords.forEach(function (word) {
            obj.listOfWords.push(word);
        });
        if (obj.words.length === 0) {
            obj.gameOver();
        } else {
            obj.startArea();
        }
    }

    function enableSkipButton() {
        clearTimeout(skipInterval);
        obj.skipButton.removeAttribute("disabled");
    }

    function disableSkipButton() {
        obj.skipButton.setAttribute("disabled", true);
        clearTimeout(skipInterval);
        skipInterval = setTimeout(function () {
            obj.skipButton.removeAttribute("disabled");
        }, SKIP_TIME);
    }

    function timeIsUp() {
        obj.soundAlert.play();
        obj.undoButton.classList.add("hidden");
        obj.guessButton.innerHTML = "Guessed";
        obj.guessButton.addEventListener("click", endRound);
        obj.skipButton.innerHTML = "Not guessed";
        obj.skipButton.addEventListener("click", endRound);
    }

    function endRound() {
        obj.undoButton.classList.remove("hidden");
        obj.guessButton.innerHTML = "Guess";
        obj.skipButton.innerHTML = "Skip";
        proceed();
    }

    function timer() {
        var currentTime = Date.now() / 1000 - obj.startTime;
        if (currentTime > MAX_TIME) {
            if (obj.words.length === 0) {
                proceed();
                return;
            }
            timeIsUp();
            clearInterval(int);
        } else {
            if (obj.words.length === 0 && Date.now() - lastGuess > LAST_WORD_FINISH_DELAY) {
                proceed();
                return;
            }
            obj.currentTime.innerHTML = parseInt(MAX_TIME - currentTime) + "." + parseInt((MAX_TIME - currentTime) * 10) % 10;
        }
    }

    init();
};

obj.gameOver = function () {
    var wordsListString = "<h2> Words list </h2>";

    function init() {
        initLogic();
        initDOM();
    }

    function initLogic() {
        var aux;
        var i;
        var j;
        for (i = 0; i < obj.listOfWords.length; i += 1) {
            for (j = i + 1; j < obj.listOfWords.length; j += 1) {
                if (obj.listOfWords[i].word > obj.listOfWords[j].word) {
                    aux = obj.listOfWords[i];
                    obj.listOfWords[i] = obj.listOfWords[j];
                    obj.listOfWords[j] = aux;
                }
            }
        }
        obj.listOfWords.forEach(function (element) {
            wordsListString += "<h3>" + element.word + " #" + element.user + " time: " + element.time +
                " ms</h3>";
        });
    }

    function initDOM() {
        if (obj.team1Score === obj.team2Score) {
            obj.winnerTeam.innerHTML = "It's a tie!"
        } else if (obj.team1Score > obj.team2Score) {
            obj.winnerTeam.innerHTML = obj.team1Name.innerHTML + " has won!";
        } else {
            obj.winnerTeam.innerHTML = obj.team2Name.innerHTML + " has won!";
        }

        obj.allWords.innerHTML = wordsListString;
        obj.winnerTeamBlock.classList.remove("hidden");
        obj.allWordsBlock.classList.remove("hidden");
    }

    init();
};

obj.init();
obj.gameParameters();