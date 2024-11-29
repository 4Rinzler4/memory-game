const container = document.querySelector("body");
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const retryButton = document.getElementById('retry-button');
const gameOverModal = document.getElementById('game-over-modal');
const gameOverMessage = document.getElementById('game-over-message');
const cards = document.querySelectorAll('.card');
const complexityButtons = document.querySelectorAll('.complexity__buttons button');

let timer; 
let timeLeft = 60000; // Початковий час
let complexity = 'easy'; // Складність гри
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let pairsFound = 0;
let gameStarted = false; 

function draw() {
  const e = document.createElement("div");
  e.classList.add("star");
  container.appendChild(e);
  e.style.left = `${Math.random() * innerWidth}px`;

  e.style.fontSize = `${Math.random() * 24}px`;
  e.style.animationDuration = `${2 + Math.random() * 4}s`;

  setTimeout (
      () => container.removeChild(e), 5000,
  );
}

setInterval(
  () => draw(),
  40,
);

// Функція запуску таймера
function startTimer() {
  timer = setInterval(() => {
    timeLeft -= 1000;
    timerDisplay.textContent = `Time left: ${timeLeft / 1000}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(false);
    }
  }, 1000);
}

// Вибір складності
complexityButtons.forEach((button) => {
  button.addEventListener('click', () => {
    complexity = button.id.split('-')[0]; // "easy", "medium", "hard"
    if (complexity === 'easy') timeLeft = 60000;
    if (complexity === 'medium') timeLeft = 45000;
    if (complexity === 'hard') timeLeft = 30000;
    
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

});

// Подія для перезапуску гри
retryButton.addEventListener('click', () => {
  restartGame();
  gameStarted = true; 
});

// Додавання обробників подій до кожної картки
cards.forEach((card) => card.addEventListener('click', flipCard));
