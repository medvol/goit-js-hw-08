import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', handleSubmit);
form.addEventListener('input', throttle(handleInput, 500));


function saveItemStorage (key, value) {
  try {
   const keyJSON = JSON.stringify(value);
    localStorage.setItem(key, keyJSON);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }

};

function readItemStorage (key) {
  try {
    const keyJSON = localStorage.getItem(key);

    return keyJSON === keyJSON ? JSON.parse(keyJSON) : null;
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
}


function handleInput() {
    
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');
    
    const dataForm = {
        email: email.value,
        message: message.value,
    }

    return saveItemStorage(STORAGE_KEY, dataForm);
   
};



function handleSubmit(event) {
    event.preventDefault();

    console.log(readItemStorage(STORAGE_KEY));
    
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

function populateText() {
    const savedMessage = readItemStorage(STORAGE_KEY);
    if (savedMessage) {
        const { elements: { email, message } } = form;
        email.value = savedMessage.email;
        message.value = savedMessage.message;
    }
}

document.addEventListener("DOMContentLoaded", populateText);


