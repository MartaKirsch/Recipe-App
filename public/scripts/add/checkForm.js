const checkForm = () => {

  let isOK = true;

  flags.forEach((flag) => {
    if(flag==0)
    {
      isOK = false;
    }
  });

  if(isOK == true)
  {
    document.querySelector('#addRecipeForm').submit();
  }
  else
  {
    var event = new Event('change');
    recipeName.dispatchEvent(event);
    meal.dispatchEvent(event);
    meatvege.dispatchEvent(event);
    taste1.dispatchEvent(event);
    taste2.dispatchEvent(event);
    prepare.dispatchEvent(event);
    for(let i=0; i<ingredients.length; i++)
    {
      ingredients[i].dispatchEvent(event);
      amounts[i].dispatchEvent(event);
      kcals[i].dispatchEvent(event);
    }
  }

};

//add event listener
document.querySelector('#addRecipe').addEventListener('click', checkForm);
