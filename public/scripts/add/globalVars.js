let flags = [1,0,0,0,0,0,0];

let ingredientsFlags = [0];

//inputs
const imgUrl = document.querySelector('input[name="imgurl"]');
const recipeName = document.querySelector('input[name="name"]');
const meal = document.querySelector('select[name="meal"]');
const meatvege = document.querySelector('select[name="meatvege"]');
const taste1 = document.querySelector('select[name="taste1"]');
const taste2 = document.querySelector('select[name="taste2"]');
const prepare = document.querySelector('#rightWrapper textarea[name="prepare"]');

//ingredients
let ingredients = document.querySelectorAll('input[name="ingredients[]"]');
let amounts = document.querySelectorAll('input[name="amount[]"]');
let kcals = document.querySelectorAll('input[name="kcal[]"]');
