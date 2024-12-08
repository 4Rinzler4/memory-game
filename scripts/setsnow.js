const whiteButton = document.getElementById('white-star');
const blueButton = document.getElementById('blue-star');
const redButton = document.getElementById('red-star');
const greenButton = document.getElementById('green-star');

whiteButton.addEventListener("click", function () {
    whiteButton.classList.add("active");
    blueButton.classList.remove("active");
    redButton.classList.remove("active");
    greenButton.classList.remove("active");
});

blueButton.addEventListener("click", function () {
    whiteButton.classList.remove("active");
    blueButton.classList.add("active");
    redButton.classList.remove("active");
    greenButton.classList.remove("active");
});

redButton.addEventListener("click", function () {
    whiteButton.classList.remove("active");
    blueButton.classList.remove("active");
    redButton.classList.add("active");
    greenButton.classList.remove("active");
});

greenButton.addEventListener("click", function () {
    whiteButton.classList.remove("active");
    blueButton.classList.remove("active");
    redButton.classList.remove("active");
    greenButton.classList.add("active");
});