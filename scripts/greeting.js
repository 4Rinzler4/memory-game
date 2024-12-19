document.addEventListener("DOMContentLoaded", () => {
  const greetingsKey = "greetingsList";
  const greetingMessage = document.querySelector(".greeting-message p");
  const loadButton = document.querySelector(".load-message");

  const initializeGreetings = () => {
    if (!localStorage.getItem(greetingsKey)) {
      const greetings = [
        "Merry Christmas and a Happy New Year!",
        "Wishing you joy and peace this Christmas!",
        "May your Christmas be merry and bright!",
        "Have a magical and blessed Christmas!",
        "Sending love and warm wishes this Christmas!",
        "May your holiday season be filled with happiness and cheer!",
        "Merry Christmas to you and your loved ones!",
        "May the spirit of Christmas bring you joy and peace!",
        "Wishing you a Christmas full of laughter and love!",
        "May your heart and home be filled with Christmas joy!",
        "Merry Christmas! May your days be full of happiness!",
        "Warmest wishes for a wonderful Christmas!",
        "May the magic of Christmas fill your heart with hope!",
        "Wishing you love, joy, and peace this Christmas!",
        "Have a holly, jolly Christmas and a joyful New Year!",
        "May all your Christmas wishes come true!",
        "Sending festive cheer your way this Christmas!",
        "Wishing you the happiest Christmas ever!",
        "May your Christmas sparkle with moments of joy and love!",
        "Merry Christmas! May your holiday season be unforgettable!",
      ];
      localStorage.setItem(greetingsKey, JSON.stringify(greetings));
    }
  };

  const loadRandomGreeting = () => {
    const greetings = JSON.parse(localStorage.getItem(greetingsKey)) || [];
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    greetingMessage.firstChild.textContent = randomGreeting + " ";
  };

  initializeGreetings();
  loadRandomGreeting();

  loadButton.addEventListener("click", loadRandomGreeting);

  const greetingButton = document.getElementById("greeting-button");
  const greetingWindow = document.getElementById("greeting-message");

  greetingButton.addEventListener("click", () => {
    const isExpanded =
      greetingWindow.style.maxHeight &&
      greetingWindow.style.maxHeight !== "0px";

    if (isExpanded) {
      greetingWindow.style.maxHeight = "0px";
      greetingWindow.style.border = "none";
      greetingWindow.style.overflow = "hidden";
      greetingButton.innerHTML = "<i class='bx bxs-tree'></i>";
    } else {
      greetingWindow.style.maxHeight = "200px";
      greetingWindow.style.border = "3px solid var(--color-button)";
      greetingWindow.style.opacity = "1";
      greetingButton.innerHTML = "<i class='bx bx-x'></i>";
      loadRandomGreeting();
    }
  });
});
