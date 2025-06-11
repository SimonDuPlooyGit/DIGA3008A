let TIME_LIMIT = 60;

const API_URL = 'https://api.api-ninjas.com/v1/quotes' //Free open source quote API from API Ninjas
const API_KEY = 'imu/ddAj8dFGTFWRbIeL6g==HXUmypztP1qZLLcS' //My API key for API Ninjas

let timeLeft = TIME_LIMIT;
let timePassed = 0;
let totalErr = 0;
let err = 0;
let acc = 0;
let character = 0;
let currentTextToType = "";
let textIndex = 0;
let time = null;
let nextQuote = null;

let timeText = document.querySelector(".currentTIME");
let accText = document.querySelector(".currentACC");
let errText = document.querySelector(".currentERR");
let cpmText = document.querySelector(".currentCPM");
let wpmText = document.querySelector(".currentWPM");
let textToType = document.querySelector(".textToType");
let input = document.querySelector(".input");
let restart = document.querySelector(".restart");
let cpmStuff = document.querySelector(".cpm");
let wpmStuff = document.querySelector(".wpm");
let errStuff = document.querySelector(".err");
let accStuff = document.querySelector(".acc");

async function randomQuote() {
    const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      'X-Api-Key': API_KEY
    }
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const quote = data[0].quote;

  return quote;
}

async function preloadNextQuote() {
    nextQuote = await randomQuote()
}

document.addEventListener('DOMContentLoaded', async () => {
    await preloadNextQuote()
});

async function updateTextToType() {
    textToType.textContent = null
    currentTextToType = nextQuote || await randomQuote()

    currentTextToType.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        textToType.appendChild(charSpan)
    })

    preloadNextQuote()
}

async function processCurrText() {
    currIn = input.value;
    currInArray = currIn.split('');

    character++;
    err = 0;

    textSpanArray = textToType.querySelectorAll('span');
    textSpanArray.forEach((char, index) => {
        let typedChar = currInArray[index]

        if (typedChar == null) {
            char.classList.remove('correct');
            char.classList.remove('incorrect');
        } else if (typedChar === char.innerText) {
            char.classList.add('correct');
            char.classList.remove('incorrect');
        } else {
            char.classList.add('incorrect');
            char.classList.remove('correct');

            err++;
        }
    });

    errText.textContent = totalErr + err;

    let corrChar = (character - (totalErr + err));
    let accVal = ((corrChar / character) * 100);
    accText.textContent = Math.round(accVal);

    if (currIn.length == currentTextToType.length) {
        await updateTextToType();
        totalErr += err;
        input.value = "";
    }
}


async function startGame() {
    timeLeft = TIME_LIMIT;
    timePassed = 0;
    err = 0;
    totalErr = 0;
    acc = 0;
    character = 0;
    textIndex = 0;
    input.disabled = false;
    input.value = "";

    await updateTextToType();

    accText.textContent = 100;
    timeText.textContent = timeLeft + 's';
    errText.textContent = 0;
    restart.style.display = "none";
    cpmStuff.style.display = "none";
    wpmStuff.style.display = "none";

    clearInterval(time);
    time = setInterval(updateTime, 1000);
}

function reset() {
    timeLeft = TIME_LIMIT;
    timePassed = 0;
    err = 0;
    totalErr = 0;
    acc = 0;
    character = 0;
    textIndex = 0;
    input.disabled = false;

    input.value = "";
    textToType.textContent = "Click below to start the game";
    accText.textContent = 100;
    timeText.textContent = timeLeft + 's';
    errText.textContent = 0;
    restart.style.display = "none";
    cpmStuff.style.display = "none";
    wpmStuff.style.display = "none";
}

function updateTime() {
    if (timeLeft > 0){
        timeLeft--;
        timePassed++;
        timeText.textContent = timeLeft +'s';
    } else {
        finish();
    }
    console.log("Timer tick: " + timeLeft);
}

function finish() {
    clearInterval(time);
    input.disabled = true;
    textToType.textContent = "Click restart to play again";
    restart.style.display = "block";
    cpm = Math.round(((character / timePassed) * 60));
    wpm = Math.round((((character / 5) / timePassed) * 60));
    cpmText.textContent = cpm;
    wpmText.textContent = wpm;
    cpmStuff.style.display = "block";
    wpmStuff.style.display = "block";
}