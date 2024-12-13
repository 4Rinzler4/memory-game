const whiteButton = document.getElementById('white-star');
const blueButton = document.getElementById('blue-star');
const redButton = document.getElementById('red-star');
const greenButton = document.getElementById('green-star');
const onButton = document.getElementById('button__on');
const offButton = document.getElementById('button__off');
const resumeSnow = document.getElementById('resume-snow');
const pauseSnow = document.getElementById('pause-snow');
const setSnow = document.getElementById('set-snow');

whiteButton.addEventListener("click", () => {
    whiteButton.classList.add("active");
    blueButton.classList.remove("active");
    redButton.classList.remove("active");
    greenButton.classList.remove("active");
});

blueButton.addEventListener("click", () => {
    whiteButton.classList.remove("active");
    blueButton.classList.add("active");
    redButton.classList.remove("active");
    greenButton.classList.remove("active");
});

redButton.addEventListener("click", () => {
    whiteButton.classList.remove("active");
    blueButton.classList.remove("active");
    redButton.classList.add("active");
    greenButton.classList.remove("active");
});

greenButton.addEventListener("click", () => {
    whiteButton.classList.remove("active");
    blueButton.classList.remove("active");
    redButton.classList.remove("active");
    greenButton.classList.add("active");
});

onButton.addEventListener("click", () => {
    onButton.classList.add("active");
    offButton.classList.remove("active"); 
});

offButton.addEventListener("click", () => {
    onButton.classList.remove("active");
    offButton.classList.add("active");
});

resumeSnow.addEventListener("click", () => {
    resumeSnow.classList.add("set-snow");
    pauseSnow.classList.remove("set-snow");
});

pauseSnow.addEventListener("click", () => {
    pauseSnow.classList.add("set-snow");
    resumeSnow.classList.remove("set-snow");
});