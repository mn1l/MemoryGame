/**
 * Memory game logica (samen met de game resetten en win check)
 */

const restartGame = document.getElementById('herstart');
const closeWinMessage = document.getElementById('closeWinMessage');
const finalTimeElement = document.getElementById('finalTime');
const winContainer = document.getElementById('winContainer')

let hasFlippedCard = false;
let firstCard, secondCard;
let timerUnflipCard;
let elapsedTimeInSeconds;

restartGame.addEventListener('click', resetGame);


function flipCard() {
    if (this === firstCard || this.classList.contains('opened') || this.classList.contains('found')) return;

    if (firstCard && secondCard) {
        clearTimeout(timerUnflipCard);
        unflipCards();
        stopCountdown();
    }

    if (!timerStarted) {
        startTimer();
        timerStarted = true;
    }

    this.classList.add('opened');
    this.style.backgroundColor = openKleurInput.value;
    this.querySelector('.image').style.display = 'block';
    this.querySelector('.icon').style.display = 'none';

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    if (!secondCard) {
        secondCard = this;
        checkForMatch();
    }
}


function disableCards() {
    firstCard.classList.add('found');
    secondCard.classList.add('found');
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.style.backgroundColor = gevondenKleurInput.value;
    secondCard.style.backgroundColor = gevondenKleurInput.value;
    resetBoard();
    setTimeout(checkForWin, 50);
}


function unflipCards() {
    firstCard.classList.remove('opened');
    secondCard.classList.remove('opened');
    firstCard.style.backgroundColor = kaartKleurInput.value;
    secondCard.style.backgroundColor = kaartKleurInput.value;
    firstCard.querySelector('.image').style.display = 'none';
    firstCard.querySelector('.icon').style.display = 'block';
    secondCard.querySelector('.image').style.display = 'none';
    secondCard.querySelector('.icon').style.display = 'block';
    stopCountdown();
    resetBoard();
}


function checkForMatch() {
    let isMatch = firstCard.dataset.value === secondCard.dataset.value;
    if (isMatch) {
        counter++;
        countMatches.innerHTML = counter;
        disableCards();
    } else {
        timerUnflipCard = setTimeout(unflipCards, 3000);
        startCountdown();
    }
}


function checkForWin() {
    const allCards = document.querySelectorAll('.grid-container > div');
    let allMatched = true;

    allCards.forEach(card => {
        if (!card.classList.contains('found')) {
            allMatched = false;
        }
    });

    if (allMatched) {
        displayWinMessage();
        stopTimer()

        const score = calculateGameScore(elapsedTimeInSeconds); // Use elapsedTimeInSeconds here
        saveGameData(score);
    }
}


function displayWinMessage() {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    finalTimeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    elapsedTimeInSeconds = minutes * 60 + seconds; // Store the elapsed time in seconds

    winContainer.style.display = 'flex';
}

function showConfetti() {
    setInterval(() => {
        const confetti = document.createElement('div');
        const confettiContainer = document.querySelector('#confetti-container');

        confetti.textContent = '💗';
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * innerWidth + 'px';
        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }, 400);
}


closeWinMessage.addEventListener('click', () => {
    winContainer.style.display = 'none';
    resetGame()
});


function resetBoard() {
    [hasFlippedCard, firstCard, secondCard] = [false, null, null];
}


function resetGame() {
    stopCountdown()
    stopTimer();
    elapsedTimeElement.textContent = '00:00';
    timerStarted = false;

    counter = 0;
    countMatches.innerHTML = counter;
    resetBoard();
    generateBoard();
}