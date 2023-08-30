const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const background = document.querySelector('body');

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

let timerId;

function onStart(event) {
    startBtn.disabled = true;
    stopBtn.disabled = false;

  timerId = setInterval(() => {
    background.style.backgroundColor = getRandomHexColor();
    }, 1000)
};

function onStop(event) {
    startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId)
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
};
