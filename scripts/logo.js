const gradientElement = document.querySelector(".game-title");

let step = 0; // Початковий крок анімації
const gradientSpeed = 0.002; // Швидкість зміни
let currentColors = [getRandomColor(), getRandomColor()]; // Початкові кольори
let nextColors = [getRandomColor(), getRandomColor()]; // Наступні кольори

// Функція для генерації випадкових кольорів
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Функція для анімації зміни кольорів градієнта
function animateGradient() {
  const mix = step - Math.floor(step);

  const blendedColor1 = mixColors(
    hexToRgba(currentColors[0], 0.4), 
    hexToRgba(nextColors[0], 0.4), 
    mix
  );
  const blendedColor2 = mixColors(
    hexToRgba(currentColors[1], 0.4), 
    hexToRgba(nextColors[1], 0.4), 
    mix
  );

  gradientElement.style.background = `linear-gradient(90deg, ${blendedColor1}, ${blendedColor2})`;

  // Переходження до нових кольорів
  step += gradientSpeed;
  if (step >= 1) {
    step = 0;
    currentColors = nextColors;
    nextColors = [getRandomColor(), getRandomColor()];
  }

  requestAnimationFrame(animateGradient);
}

// Функція для конвертації кольору з hex в rgba
function hexToRgba(hex, darkenFactor = 1) {
  const bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  // Зменшення інтенсивності кольору
  r = Math.round(r * darkenFactor);
  g = Math.round(g * darkenFactor);
  b = Math.round(b * darkenFactor);

  return { r, g, b };
}

function mixColors(color1, color2, weight) {
  const r = Math.round(color1.r * (1 - weight) + color2.r * weight);
  const g = Math.round(color1.g * (1 - weight) + color2.g * weight);
  const b = Math.round(color1.b * (1 - weight) + color2.b * weight);
  return `rgb(${r}, ${g}, ${b})`;
}

animateGradient();