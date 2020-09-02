let flags = [1,0,0,0,0,0];

let ingredientsFlags = [1];

//inputs
const imgUrl = document.querySelector('input[name="imgurl"]');
const recipeName = document.querySelector('input[name="name"]');
const meal = document.querySelector('input[name="meal"]');
const meatvege = document.querySelector('input[name="meatvege"]');
const taste1 = document.querySelector('input[name="taste1"]');
const taste2 = document.querySelector('input[name="taste2"]');

//ingredients
let ingredients = document.querySelectorAll('input[name="ingredients[]"]');
let amount = document.querySelectorAll('input[name="amount[]"]');
let kcal = document.querySelectorAll('input[name="kcal[]"]');
