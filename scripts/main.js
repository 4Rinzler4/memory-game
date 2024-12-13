const body = document.getElementsByTagName('body');
const container = document.querySelector('.container-game');
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const retryButton = document.getElementById('retry-button');
const gameOverModal = document.getElementById('game-over-modal');
const gameOverMessage = document.getElementById('game-over-message');
const cards = document.querySelectorAll('.card');
const complexityButtons = document.querySelectorAll('.complexity__buttons button');
const gameMenu = document.querySelector('.game-menu');
const memoryGame = document.querySelector('.memory-game');
const windowTime = document.querySelector('.window-time');
const bodyGame = document.querySelector('.body-game');
const music = document.getElementById('background-music');
const volumeSlider = document.getElementById("volume-slider");
const nameInput = document.getElementById('name');
const submitButton = document.getElementById('submit-button');
const recordTableBody = document.querySelector('.record__body');
const welcomeMessage = document.getElementById('welcome-message');
const resumeSnow = document.getElementById('resume-snow');
const pauseSnow = document.getElementById('pause-snow');
const onButton = document.getElementById('button__on');
const offButton = document.getElementById('button__off');
const whiteButton = document.getElementById('white-star');
const blueButton = document.getElementById('blue-star');
const redButton = document.getElementById('red-star');
const greenButton = document.getElementById('green-star');
const menuToggle = document.getElementById('menu-toggle');
const recordTable = document.getElementById('record-table');

submitButton.disabled = true;

music.volume = volumeSlider.value;

let timer; 
let timeLeft = 2000; 
let complexity = 'easy'; 
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let pairsFound = 0;
let gameStarted = false; 
let activeColor = "var(--color-text)";
let playerName = '';
let gameTime = 0;
let rank = 1;
let drawInterval;
let isDrawing = true;

welcomeMessage.style.opacity = 0;

function togleMusicPlay() {
  if(music.paused) {
    music.play();
  }
}

function togleMusicPause() {
  if(music.play) {
    music.pause();
  }
}

volumeSlider.addEventListener("input", (event) => {
  music.volume = event.target.value;
});

menuToggle.addEventListener('click', () => {
  if (recordTable.style.maxHeight === '0px' || !recordTable.style.maxHeight) {
    recordTable.style.maxHeight = `${recordTable.scrollHeight}px`;
    menuToggle.innerHTML = "<i class='bx bxs-down-arrow bx-rotate-180' ></i>";
  } else {
    recordTable.style.maxHeight = '0px';
    menuToggle.innerHTML = "<i class='bx bxs-down-arrow' ></i>";
  }
});

nameInput.addEventListener('input', () => {
  if (nameInput.value.trim() !== '') {
    submitButton.disabled = false; 
  } else {
    submitButton.disabled = true; 
  }
  
});

// Слухач для введення імені
submitButton.addEventListener('click', () => {
  playerName = nameInput.value.trim(); // Отримуємо ім'я користувача
  
  welcomeMessage.textContent = `Welcome, ${playerName}! Start the game.`;
  nameInput.disabled = true; // Блокування поля вводу після введення
  welcomeMessage.style.opacity = 1;
  startButton.classList.remove("hidden");
});

// Функція додавання запису до таблиці
function addRecord(name, time) {
  // Знаходимо перший порожній рядок у таблиці
  const emptyRow = Array.from(recordTableBody.querySelectorAll('.record__row')).find((row) => {
    const cells = row.querySelectorAll('.record__cell');
    return cells[1].textContent === '' && cells[2].textContent === '';
  });

  if (emptyRow) {
    const cells = emptyRow.querySelectorAll('.record__cell');
    cells[1].textContent = name;
    cells[2].textContent = time;
  }
}

onButton.addEventListener("click", () => {
  onButton.classList.add("active");
  offButton.classList.remove("active"); 
});

offButton.addEventListener("click", () => {
  onButton.classList.remove("active");
  offButton.classList.add("active");
});


function draw() {
  const e = document.createElement("div");
  e.classList.add("star");
  container.appendChild(e);
  e.style.left = `${Math.random() * innerWidth}px`;

  e.style.fontSize = `${Math.random() * 24}px`;
  e.style.animationDuration = `${2 + Math.random() * 4}s`;
  e.style.color = activeColor;
  setTimeout (
      () => container.removeChild(e), 5000,
  );
}

document.getElementById("blue-star").addEventListener("click", () => {
  activeColor = "var(--color-light-blue)";
  whiteButton.classList.remove("active");
  redButton.classList.remove("active");
  greenButton.classList.remove("active");
  blueButton.classList.add("active");
});
document.getElementById("red-star").addEventListener("click", () => {
  activeColor = "var(--color-red)";
  whiteButton.classList.remove("active");
  blueButton.classList.remove("active");
  greenButton.classList.remove("active");
  redButton.classList.add("active");
});
document.getElementById("green-star").addEventListener("click", () => {
  activeColor = "var(--color-border)";
  whiteButton.classList.remove("active");
  blueButton.classList.remove("active");
  redButton.classList.remove("active");
  greenButton.classList.add("active");
});
document.getElementById("white-star").addEventListener("click", () => {
  activeColor = "var(--color-text)";
  blueButton.classList.remove("active");
  redButton.classList.remove("active");
  greenButton.classList.remove("active");
  whiteButton.classList.add("active");
});

function startDrawing() {
  if (!isDrawing) {
    isDrawing = true;
    drawInterval = setInterval(() => draw(), 40);
  }
}

function stopDrawing() {
  if (isDrawing) {
    isDrawing = false;
    clearInterval(drawInterval);
  }
}

drawInterval = setInterval(() => draw(), 40);

pauseSnow.addEventListener("click", () => {
  stopDrawing();
  pauseSnow.classList.add("set-snow");
  resumeSnow.classList.remove("set-snow");
});

resumeSnow.addEventListener("click", () => {
  startDrawing();
  pauseSnow.classList.remove("set-snow");
  resumeSnow.classList.add("set-snow");
});

// Функція запуску таймера
function startTimer() {
  timer = setInterval(() => {
    gameTime += 1000; 
    timeLeft -= 1000;
    timerDisplay.textContent = `Time: ${timeLeft / 1000}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(false);
    }
  }, 1000);
}

// Вибір складності
complexityButtons.forEach((button) => {
  button.addEventListener('click', () => {
    complexity = button.id;
    if (complexity === 'easy-button') timeLeft = 90000;
    else if (complexity === 'medium-button') timeLeft = 60000;
    else if (complexity === 'hard-button') timeLeft = 45000;
    
    timerDisplay.textContent = `Time: ${timeLeft / 1000}s`;
  });
});

// Перемішування карт
function shuffleCards() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 20); 
    card.style.order = randomPos;
  });
}

// Перевірка відповідності карт
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
    pairsFound++;
    if (pairsFound === cards.length / 2) {
      endGame(true);
    }
  } else {
    unflipCards();
  }
}

// Блокування карт після збігу
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

// Відкидання невідповідних карт
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 750);
}

// Скидання змінних
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Перевертання карт
function flipCard() {
  if (!gameStarted) return; 
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

// Перезапуск гри
function restartGame() {
  gameOverModal.classList.add('hidden');
  shuffleCards();
  pairsFound = 0;
  timeLeft = complexity === 'easy' ? 90000 : complexity === 'medium' ? 45000 : 30000;
  timerDisplay.textContent = `Time: ${timeLeft / 1000}s`;

  cards.forEach((card) => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  resetBoard();
  startTimer();
  gameStarted = true; 
}

// Події для старту гри
startButton.addEventListener('click', () => {
  shuffleCards();
  startTimer();
  gameStarted = true;
  startButton.style.pointerEvents = 'none'; 
  startButton.classList.add('hidden');
  gameMenu.classList.add('hidden');
});

// Кінець гри
function endGame(isWin) {
  clearInterval(timer);
  gameOverModal.classList.remove('hidden');

  if (isWin) {
    gameOverMessage.textContent = `Congratulations! You won the game in ${gameTime / 1000} seconds!`;
    if (playerName) {
      addRecord(playerName, gameTime / 1000);
    }
  } else {
    gameOverMessage.textContent = "Time's up! You lost the game.";
  }
  gameStarted = false; 
  gameMenu.classList.remove('hidden');
}

// Подія для перезапуску гри
retryButton.addEventListener('click', () => {
  restartGame();
  gameStarted = true; 
});

// Додавання обробників подій до кожної картки
cards.forEach((card) => card.addEventListener('click', flipCard));