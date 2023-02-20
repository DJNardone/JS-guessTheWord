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
const word = "magnolia";

const hideLetter = function (word) {
    const letterArray = [];
    for (let letter of word) {
        console.log(letter);
        letterArray.push("●")
    }
    wordPlay.innerText = letterArray.join("");
};

hideLetter(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const inputValue = inputLetter.value;
    console.log(inputValue);
    inputLetter.value = "";
});