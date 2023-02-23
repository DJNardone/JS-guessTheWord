// unordered list - guessed letters
const guessedList = document.querySelector(".guessed-letters");
// Guess button
const guessButton = document.querySelector(".guess");
// guess a letter input box
const inputLetter = document.querySelector(".letter");
// word in play - to be guessed
const wordPlay = document.querySelector(".word-in-progress");
// display guesses remaining
const remaining = document.querySelector(".remaining");
// guesses remaining span section
const span = document.querySelector(".remaining span");
// display message after letter guesses
const message = document.querySelector(".message");
// "play again" button
const playAgain = document.querySelector(".play-again");
// test word
let word = "magnolia";
// array
let guessedLetters = [];
// max number of guesses
let remainingGuesses = 8;

// data fetch - list of game words to guess 
const getWord = async function () {
    const request = await fetch (
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
    );
    const data = await request.text();
    //console.log(data);
    const wordArray = data.split("\n");
    //console.log(wordArray);
    pickRandomWord(wordArray);
    hideLetter(word);
};

getWord();

// selects a word to play from list
const pickRandomWord = function (wordArray) {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    //console.log(randomIndex);
    word = wordArray[randomIndex].trim();
};

// hides the word/letters in play with dots.
const hideLetter = function (word) {
    const letterArray = [];
    for (let letter of word) {
        //console.log(letter);
        letterArray.push("●")
    }
    wordPlay.innerText = letterArray.join("");
};

// event handler - letter input box
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const inputValue = inputLetter.value;
    //console.log(inputValue);
    // check that input is a single letter
    const goodInput = validGuess(inputValue);
        if (goodInput) {
            makeGuess(inputValue);
        }
    inputLetter.value = "";
});

// validate player's input
const validGuess = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        // no guess entered
        message.innerText = "Please enter a letter from A-Z.";
    }   else if (input.length > 1) {
        // double letter guess entered
        message.innerText = "Enter one letter at a time please.";
    }   else if (!input.match(acceptedLetter)) {
        // non-alphabetical guess entered
        message.innerText = "Please enter a letter from A-Z.";
    }   else {
        return input;
    }
};

// check/prevent duplicate letter guesses
const makeGuess = function (inputValue) {
    inputValue = inputValue.toUpperCase();
    if (guessedLetters.includes(inputValue)) {
        message.innerText = "You already guessed that letter, please try again.";
    }   else {
        guessedLetters.push(inputValue);
        console.log(guessedLetters);
        guessCounter(inputValue);
        showGuesses();
        updateWord(guessedLetters);
        
    }
};

// displays all guessed letters
const showGuesses = function () {
    guessedList.innerHTML = "";
    for (contents of guessedLetters) {
        let li = document.createElement("li");
        li.innerText = contents;
        guessedList.append(li);
    }
};

// changes dots to letters as players guesses correctly
const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showLetter = [];
    for (let letter of wordArray) {
        if (guessedLetters.includes(letter)) {
        showLetter.push(letter.toUpperCase());
        }   else {
            showLetter.push("●");
        }
    }
    wordPlay.innerText = showLetter.join("");
    playerWin();
};

// tracks guesses remaining and ends losing game
const guessCounter = function (inputValue) {
    const upword =  word.toUpperCase();
    if (!upword.includes(inputValue)) {
       message.innerText = `Uh uh, no ${inputValue}'s in this word.`;
       remainingGuesses -= 1;
    }   else {
        message.innerText = `Aww yeah! ${inputValue} is in this word.`;
    }
    
    if (remainingGuesses === 0) {
        message.innerHTML = `Oh no! Better luck next time. The word was <span class="highlight">${word.toUpperCase()}</span>.`;
        startOver();
    }   else if (remainingGuesses === 1) {
        span.innerText = `${remainingGuesses} guess`;
    }   else {
        span.innerText = `${remainingGuesses} guesses`;
    }
};

// checks if player has guessed the word and wins
const playerWin = function () {
    if (word.toUpperCase() === wordPlay.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You got it Winner! Way to Go!</p>`;
        startOver();
    }
};

// change "guess" button to "play again"
const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessedList.classList.add("hide");
    playAgain.classList.remove("hide");
};

// reset messages and guess word to play game again
playAgain.addEventListener("click", function () {
    message.classList.remove("win");
    remainingGuesses = 8;
    guessedLetters = [];
    span.innerText = `${remainingGuesses} guesses`;
    guessedList.innerHTML = "";
    message.innerText = "";
    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    guessedList.classList.remove("hide");
    playAgain.classList.add("hide");
    getWord();
});

