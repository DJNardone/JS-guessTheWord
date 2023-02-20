// unordered list - guessed letters
const guessedList = document.querySelector(".guessed-letters");
// Guess button
const guessButton = document.querySelector(".guess");
// guess a letter input box
const inputLetter = document.querySelector(".letter");
// word in play - to be guessed
const wordPlay = document.querySelector(".word-in-progress");
// display guesses remaining
const remaining = document.querySelector(".reminaing");
// guesses remaining span section
const span = document.querySelector(".remaining span");
// display message after letter guesses
const message = document.querySelector(".message");
// "play again" button
const playAgain = document.querySelector(".play-again");
// test word
const word = "farming";
// array to store guessed letters
const guessedLetters = [];

// hides the word/letters in play with dots.
const hideLetter = function (word) {
    const letterArray = [];
    for (let letter of word) {
        //console.log(letter);
        letterArray.push("●")
    }
    wordPlay.innerText = letterArray.join("");
};

hideLetter(word);

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
    //console.log(goodInput);
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
    }
};


