/**
 * Verlopen tijd, aantal matches en toontijd informatie
 */

const countMatches = document.getElementById('counter');
const showCardTime = document.getElementById('toontijd');
const elapsedTimeElement = document.getElementById('elapsedTime');

let counter = 0;
let timer;
let downloadTimer;
let reverse_counter;
let startTime;
let timerStarted = false;


function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const minutes = Math.floor(elapsedTime / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        elapsedTimeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}


function startCountdown() {
    reverse_counter = 300;
    downloadTimer = setInterval(function () {
        showCardTime.style.width = --reverse_counter / 3 + "%";
        if (reverse_counter <= 0) {
            clearInterval(downloadTimer);
        }
        showCardTime.innerHTML = Math.round(reverse_counter / 100) + "s";
    }, 10);
}


function stopTimer() {
    clearInterval(timer);
    startTime = null;
}


function stopCountdown() {
    clearInterval(downloadTimer);
    reverse_counter = 300;
    showCardTime.style.width = "100%";
    showCardTime.innerHTML = "3s";
}