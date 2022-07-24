import throttle from 'lodash.throttle';

const STORAGE_KEY = "feedback-form-state";

const form = document.querySelector('.feedback-form');

form.addEventListener('submit', handleSubmitForm);
form.addEventListener('input', throttle(handleInput, 500));


function saveItemStorage (key, value) {
  try {
   const itemJSON = JSON.stringify(value);
    localStorage.setItem(key, itemJSON);
  } catch (error) {
    console.error("Set state error: ", error.message);
  };

};

function readItemStorage (key) {
  try {
    const itemJSON = localStorage.getItem(key);

    return itemJSON === itemJSON ? JSON.parse(itemJSON) : null;
  } catch (error) {
    console.error("Get state error: ", error.message);
  };
};


function handleInput() {
  const { elements: { email, message } } = form;

  const dataForm = {
    email: email.value,
    message: message.value,
  };

    return saveItemStorage(STORAGE_KEY, dataForm);
   
};


function handleSubmitForm(event) {
  event.preventDefault();
  
  const {elements: { email, password }} = event.currentTarget;

    if (email.value === '' || password.value === '') {
    return console.log(alert('Please fill all fields!'));
  };
    
    console.log(readItemStorage(STORAGE_KEY));
    
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
};

function populateTextOnForm() {
  const savedText = readItemStorage(STORAGE_KEY);
  
    if (savedText) {
        const { elements: { email, message } } = form;
        email.value = savedText.email;
        message.value = savedText.message;
  };
};

document.addEventListener("DOMContentLoaded", populateTextOnForm);


