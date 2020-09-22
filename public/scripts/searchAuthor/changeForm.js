//change submit to button
const btn = document.querySelector('#filters input[type=submit]');
btn.type = 'button';

//remove event listener
document.querySelector('#filters').removeEventListener('submit', loadRecipes);

//add event listener
btn.addEventListener('click', ()=>{
  loadRecipes({added: 'searchByAuthor', new: 'yes' });
});

loadRecipes({added: 'searchByAuthor', new: 'yes' });
