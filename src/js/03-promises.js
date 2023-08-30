import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { promise, reject, resolve } from 'when';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  generatePromiseChain();
};

function createPromise(position, delay) {
  
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      };
    }, delay)
     
  });
}
 

function generatePromiseChain() {
  let delay = Number(document.querySelector('[name = "delay"]').value);
  let step = Number(document.querySelector('[name = "step"]').value);
  let amount = Number(document.querySelector('[name = "amount"]').value);

  

  for (let position = 1; position <= amount; position++) {
    let promiseDelay = delay + step * position;
    let promise = createPromise(position, promiseDelay);
      promise.then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
};
  



  
 

  

