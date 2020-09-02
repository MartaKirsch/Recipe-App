let flags = [0,0,0,0];

//get all the register form inputs
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

const rTextInputs = document.querySelectorAll('#rightWrapper input[type="text"]');

const rPassword = document.querySelector('#rightWrapper input[type="password"]');

const errorDivs = document.querySelectorAll('.error');

//get all the login form inputs
const lTextInput = document.querySelector('#leftWrapper input[type="text"]');

const lPassword = document.querySelector('#leftWrapper input[type="password"]');


const errDiv = document.querySelector('#wrongLoginData');
