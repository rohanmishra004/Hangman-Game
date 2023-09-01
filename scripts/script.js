const hangManImage = document.querySelector(".hangman-box img")
const wordDisplay = document.querySelector(".word-display")
const guessedText = document.querySelector(".guessed-text b")
const keyBoardDiv = document.querySelector('.keyboard')
const gameModal = document.querySelector('.game-modal')
const playAgainBtn = document.querySelector('.play-again')

let currentWord,correctLetters =[], wrongGuessedCount = 0;
const maxGuesses = 6

const resetGame = () => {
    correctLetters = [];
    wrongGuessedCount = 0;
    hangManImage.src = 'images/hangman-0.svg';
    guessedText.innerText = `${ wrongGuessedCount } / ${ maxGuesses }`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyBoardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    //selecting a random word and hint from the list
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame()
}

//Game Over condition
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was :`;
        gameModal.querySelector('img').src = `images/${ isVictory ? 'victory' : 'lost' }.gif`;
        gameModal.querySelector('h4').innerText = `${ isVictory ? 'Congrats!' : 'Game Over' }`;
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show")
    }, 300)
}

const initGame = (button, clickedLetter) => {
    // console.log(button, clickedLetter)
    if (currentWord.includes(clickedLetter)) {
        // console.log(clickedLetter+' exits in the word')
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")
            }
        })
    } else {
        //Upadinting hangman image as wrongWordCount increases
        wrongGuessedCount++;
        hangManImage.src = `images/hangman-${wrongGuessedCount}.svg`
    }
    button.disabled = true
    guessedText.innerText = `${ wrongGuessedCount } /${ maxGuesses }`
    
    if (wrongGuessedCount === maxGuesses) {
        return gameOver(false)
    }

    if (correctLetters.length === currentWord.length) {
        return gameOver(true)
    }
} 

//Creating Keyboard buttons
for (let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i)
    keyBoardDiv.appendChild(button);
    button.addEventListener('click', e=>initGame(e.target, String.fromCharCode(i)))
}

getRandomWord()
playAgainBtn.addEventListener("click", getRandomWord)













