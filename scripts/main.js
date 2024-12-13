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

music.volume = volumeSlider.value;

let timer; 
let timeLeft = 90000; 
let complexity = 'easy'; 
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let pairsFound = 0;
let gameStarted = false; 
let activeColor = "var(--color-text)";

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
});
document.getElementById("red-star").addEventListener("click", () => {
  activeColor = "var(--color-red)";
});
document.getElementById("green-star").addEventListener("click", () => {
  activeColor = "var(--color-border)";
});
document.getElementById("white-star").addEventListener("click", () => {
  activeColor = "var(--color-text)";
});

setInterval(
  () => draw(),
  40,
);

// Функція запуску таймера
function startTimer() {
  timer = setInterval(() => {
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

// Кінець гри
function endGame(isWin) {
  clearInterval(timer);
  gameOverModal.classList.remove('hidden');
  gameMenu.classList.remove('hidden');
  if (isWin) {
    gameOverMessage.textContent = 'Congratulations! You won the game!';
  } else {
    gameOverMessage.textContent = "Time's up! You lost the game.";
  }
  gameStarted = false; 
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
  memoryGame.classList.remove('hidden');
  
});

// Подія для перезапуску гри
retryButton.addEventListener('click', () => {
  restartGame();
  gameStarted = true; 
});

// Додавання обробників подій до кожної картки
cards.forEach((card) => card.addEventListener('click', flipCard));
