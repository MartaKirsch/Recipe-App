const updateData = (doc)=>{

  //meal
  const mealOptions= [];
  Array.from(meal.options).forEach((option) => {
    mealOptions.push(option.value);
  });
  meal.selectedIndex = mealOptions.indexOf(doc.meal);

  //meat/vege option
  const meatvegeOptions= [];
  Array.from(meatvege.options).forEach((option) => {
    meatvegeOptions.push(option.value);
  });
  meatvege.selectedIndex = meatvegeOptions.indexOf(doc.meatvege);

  //ingredients
  for(let i=0; i<doc.ingredients.length-1;i++)
  {
    addIngredients();
  }
  ingredients = document.querySelectorAll('input[name="ingredients[]"]');
  amounts = document.querySelectorAll('input[name="amount[]"]');
  kcals = document.querySelectorAll('input[name="kcal[]"]');

  for(let i=0; i<ingredients.length;i++)
  {
    ingredients[i].value = doc.ingredients[i].name;
    amounts[i].value = doc.ingredients[i].amount;
    kcals[i].value = doc.ingredients[i].kcal;
  }

  //tastes
  const taste1Options= [];
  Array.from(taste1.options).forEach((option) => {
    taste1Options.push(option.value);
  });
  taste1.selectedIndex = taste1Options.indexOf(doc.tastes[0]);

  if(doc.tastes.length == 2)
  {
    const taste2Options= [];
    Array.from(taste2.options).forEach((option) => {
      taste2Options.push(option.value);
    });
    taste2.selectedIndex = taste2Options.indexOf(doc.tastes[1]);
  }

  //prepare
  const prepare = document.querySelector('textarea[name="prepare"]');
  prepare.value = doc.prepare;




};

const dataDiv = document.querySelector('#dataDiv');
updateData(JSON.parse(dataDiv.innerHTML));
