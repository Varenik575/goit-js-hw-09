import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import When from "when";

const picker = document.querySelector('#datetime-picker');
const startTimerBtn = document.querySelector('[data-start]');

startTimerBtn.disabled = true;

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEL = document.querySelector('[data-seconds]');
let currentDate;

setInterval(() => {
 currentDate = new Date();
}, 100)


startTimerBtn.addEventListener('click', onStart);

let chosenDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        chosenDate = selectedDates[0];
        if  (currentDate >= chosenDate) {
            Notify.failure('Please choose a date in the future');
            return;
        }
        else {
            startTimerBtn.disabled = false;
        }
    },
}

const fp = flatpickr(picker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
   return value.toString().padStart(2, '0');
}

function onStart(event) {
   
    const intervalID = setInterval(() => {
        const timerItme = convertMs(chosenDate - currentDate);
        if (timerItme.seconds >= 0) {
            daysEl.textContent = addLeadingZero(timerItme.days);
            hoursEl.textContent = addLeadingZero(timerItme.hours);
            minutesEl.textContent = addLeadingZero(timerItme.minutes);
            secondsEL.textContent = addLeadingZero(timerItme.seconds);
        } else {
            clearInterval(intervalID);
            Notify.success("Time's up!")
        }
            
    }, 100);
 
     
}

