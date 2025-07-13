const sentences = [
  "This is MallaReddy Deemed to be University",
  "Data Science is very essential for programmers",
  "This is a twenty four hour hackathon",
  "Cats are known to be one of the intelligent animal species",
  "Practice makes perfect when learning to code."
];

const sentenceEl = document.getElementById("sentence"); 
const inputEl = document.getElementById("input");
const progressBar = document.getElementById("progress-bar");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");
const errorsEl = document.getElementById("errors");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

let startTime, timerRunning = false, errorCount = 0, currentSentence = "";

function loadSentence() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceEl.textContent = currentSentence;
  inputEl.value = "";
  progressBar.style.width = "0%";
  errorCount = 0;
  resultEl.classList.add("hidden");
}

function calculateStats() {
  const timeTaken = (new Date().getTime() - startTime) / 60000; // in minutes
  const wordsTyped = inputEl.value.trim().split(" ").length;
  const wpm = Math.round(wordsTyped / timeTaken);
  const totalChars = currentSentence.length;
  const correctChars = totalChars - errorCount;
  const accuracy = Math.round((correctChars / totalChars) * 100);

  wpmEl.textContent = wpm;
  accuracyEl.textContent = accuracy;
  errorsEl.textContent = errorCount;
  resultEl.classList.remove("hidden");
}

inputEl.addEventListener("input", () => {
  if (!timerRunning) {
    startTime = new Date().getTime();
    timerRunning = true;
  }

  const userInput = inputEl.value;
  let highlighted = "";
  errorCount = 0;

  for (let i = 0; i < currentSentence.length; i++) {
    if (i < userInput.length) {
      if (userInput[i] === currentSentence[i]) {
        highlighted += `<span>${currentSentence[i]}</span>`;
      } else {
        highlighted += `<span id="error-span">${currentSentence[i]}</span>`;
        errorCount++;
      }
    } else {
      highlighted += `<span>${currentSentence[i]}</span>`;
    }
  }

  sentenceEl.innerHTML = highlighted;

  const progress = Math.min((userInput.length / currentSentence.length) * 100, 100);
  progressBar.style.width = `${progress}%`;

  if (userInput === currentSentence) {
    calculateStats();
    inputEl.disabled = true;
    timerRunning = false;
  }
});

restartBtn.addEventListener("click", () => {
  loadSentence();
  inputEl.disabled = false;
  inputEl.focus();
  timerRunning = false;
});

loadSentence();
