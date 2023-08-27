import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { promise, reject, resolve } from 'when';

const form = document.querySelector('form');

let delay = Number(document.querySelector('[name = "delay"]').value);
let step = Number(document.querySelector('[name = "step"]').value);
let amount = Number(document.querySelector('[name = "amount"]').value);

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  setTimeout(generatePromiseChain, delay);
};

function createPromise(position, delay) {

  setTimeout(() => {
    let promise = new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve('Success');
      } else {
        reject('Failure');
      };

    });
  
  promise.then(({ position, delay }) => {
    console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  }) 
  }, delay * position)

};
 

function generatePromiseChain() {
  for (let position = 1; position <= amount; position++) {
    createPromise(position, step);
  }
};
  



  
 

  

