const updateGlobalVars = ()=>{
  //update the global variables
  ingredients = document.querySelectorAll('input[name="ingredients[]"]');
  amounts = document.querySelectorAll('input[name="amount[]"]');
  kcals = document.querySelectorAll('input[name="kcal[]"]');

  //if there's only one ingredient left, make the delete button disappear
  if(ingredients.length == 1)
  {
    document.querySelectorAll('.deleteIngredient')[0].style.visibility = 'hidden';
  }
  else
  {
    document.querySelectorAll('.deleteIngredient')[0].style.visibility = 'visible';
  }
};

const deleteIngredients = (e)=>{

  let wrapper = e.target.parentNode.parentNode;
  let row = e.target.parentNode;

  //remove the flag
  let arr = [];

  for(let i=0; i<ingredientsFlags.length;i++)
  {
    if(i!=parseInt(e.target.dataset.num))
    {
      arr.push(ingredientsFlags[i]);
    }
  }

  ingredientsFlags = arr;

  //remove the element
  wrapper.removeChild(row);

  updateGlobalVars();

};

const addIngredients = ()=>{

  //create elements
  let row = document.createElement('div');
  let ingredientInput = document.createElement('input');
  let amountInput = document.createElement('input');
  let kcalInput = document.createElement('input');
  let deleteIngredient = document.createElement('div');

  //set up the new divs
  row.classList.add('moreTexts');

  deleteIngredient.classList.add('deleteIngredient');
  deleteIngredient.innerHTML = '-';
  deleteIngredient.dataset.num = ingredientsFlags.length;

  ingredientInput.type = 'text';
  ingredientInput.autocomplete = 'off';
  ingredientInput.name = 'ingredients[]';
  ingredientInput.placeholder = 'Ingredient';

  amountInput.type = 'text';
  amountInput.autocomplete = 'off';
  amountInput.name = 'amount[]';
  amountInput.placeholder = 'Amount';

  kcalInput.type = 'text';
  kcalInput.autocomplete = 'off';
  kcalInput.name = 'kcal[]';
  kcalInput.placeholder = 'Kcal';


  //put inputs in the row
  row.appendChild(ingredientInput);
  row.appendChild(amountInput);
  row.appendChild(kcalInput);
  row.appendChild(deleteIngredient);

  //append the new row to the page element
  document.querySelector('#ingredientsWrapper').appendChild(row);

  updateGlobalVars();

  //add event listener for the delete button
  let deletes = document.querySelectorAll('.deleteIngredient');
  deletes.forEach((deleteButton) => {
    deleteButton.addEventListener('click', deleteIngredients);
  });

  //add event listeners for text inputs
  for(let i=0; i<ingredients.length ; i++)
  {
    ingredients[i].addEventListener('change', rowCheck);
    amounts[i].addEventListener('change', rowCheck);
    kcals[i].addEventListener('change', rowCheck);
  }

  //push a new flag
  ingredientsFlags.push(0);


};

//add event listener
document.querySelector('#addMoreTexts').addEventListener('click', addIngredients);
