import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { reject } from 'when';

const form = document.querySelector('form');

let delay = Number(document.querySelector('[name = "delay"]').value);
let step = Number(document.querySelector('[name = "step"]').value);
let amount = Number(document.querySelector('[name = "amount"]').value);

const createBtn = document.querySelector('button[type = submit]');

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
 
}

function createPromise(position, delay) {
  
  for (position = 1; position <= amount; position += 1) {
    if (position > 1) {
      delay += step;
    }
    const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
  }
  
}


  

