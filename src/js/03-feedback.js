const throttle = require('lodash.throttle');

const form = document.querySelector('.feedback-form');


form.addEventListener('submit', handleSubmit);


function saveItemStorage (key, value) {
  try {
   const keyJSON = JSON.stringify(value);
    localStorage.setItem(key, keyJSON);
  } catch (error) {
    // console.error("Set state error: ", error.message);
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


function handleInput (event) {
    
    const formData = {};
    const { elements: { email, message } } = event.currentTarget;

    console.log(event.currentTarget.elements)
   
    formData.email = email.value;
    formData.message = message.value;

    saveItemStorage("feedback-form-state", formData)

       
};

form.addEventListener('input', throttle(handleInput, 500));

function handleSubmit(event) {
    event.preventDefault();

    console.log(readItemStorage("feedback-form-state"));

    event.currentTarget.reset();
}

function populateText() {
    const savedMessage = readItemStorage("feedback-form-state");
    if (savedMessage) {
        form.elements.email.value = savedMessage.email;
        form.elements.message.value = savedMessage.message;
    }
}

document.addEventListener("DOMContentLoaded", populateText )


