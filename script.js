"use strict";
let rndNumber = Math.floor(Math.random() * 100) + 1;
let attempt = 0;
let timer = 60;
let timeInterval;
const msg = document.getElementById("msg");
const input = document.getElementById("numberInput");
const submitBtn = document.getElementById("submitBtn")
const rstBtn = document.getElementById("rstBtn");
const timeLeft = document.getElementById("timeLeft");
const attempts = document.getElementById("attempts");
const hintGenerateBtn = document.getElementById("hintGenerateBtn");
const hintInfoBox = document.getElementById("hintInfo")

const winLose = (msgText) => {
    msg.innerText = msgText;
    submitBtn.disabled = true;
    input.readOnly = true;
    rstBtn.classList.toggle("inactive");
    clearInterval(timeInterval);
}

let checkGuess = () => {
    if (input.value == rndNumber && attempt < 60 && timer > 0) {
        winLose(`🏆 Congratulations! you guessed the correct number!`);
    }
    else if (input.value > rndNumber && attempt < 60 && timer > 0) {
        msg.innerText = `📈 Oops! Your guess is a bit high.`;
    }
    else if (input.value < rndNumber && attempt < 60 && timer > 0) {
        msg.innerText = `📉 Oops! Your guess is a bit low.`;
    }

    if (attempt == 0) {
        timeInterval = setInterval(() => {
            timeLeft.innerHTML = `${timer}s`;
            if (timer == 0) {
                winLose(`Time ups! you lose the game.`);
            }
            timer--;
        }, 1000)
    }

    attempt++;
    if (attempt == 60) {
        winLose(`No more attempts left. You lose!`);
    }
    attempts.innerHTML = `Attempts lefts: ${60 - attempt}`;
    hintGenerateBtn.addEventListener("click", hintGenerateFunc, { once: true })
}

let resetGame = () => {
    attempt = 0;
    timer = 60;
    msg.innerText = ``;
    input.value = "";
    timeLeft.innerHTML = `${timer}s`;
    attempts.innerHTML = `Attempts lefts: ${60 - attempt}`;
    hintInfoBox.innerHTML = ``;
    submitBtn.disabled = false;
    input.readOnly = false;
    rndNumber = Math.floor(Math.random() * 100) + 1;
    rstBtn.classList.toggle("inactive");
    hintGenerateBtn.removeEventListener("click", hintGenerateFunc)
}


let hintGenerateFunc = () => {
    if (rndNumber < 10) {
        hintInfoBox.innerHTML = `I am single digit number`
    }

    else if (rndNumber >= 10 && rndNumber < 100) {
        const x = Math.floor(rndNumber / 10);
        const y = rndNumber % 10;
        const ratio = y / x;
        const diff = rndNumber - (10 * y + x);

        hintInfoBox.innerHTML = `I am a two-digit number. My ones digit is ${ratio.toFixed(3)} times my tens digit. If you reverse my digits, the original number is ${(diff > 0) ? diff + " more" : (-diff) + " less"} than reverse. What number am I? (note: take round off x and y in some case)`
    }

    else {
        hintInfoBox.innerHTML = `I am three digit number`
    }
}