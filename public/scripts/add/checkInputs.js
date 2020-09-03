const selectCheck = (e) => {
  let val = e.target.value;

  if(val!='none')
  {
    flags[parseInt(e.target.dataset.num)] = 1;
    e.target.classList.remove('wrongInput');
  }
  else
  {
    flags[parseInt(e.target.dataset.num)] = 0;
    e.target.classList.add('wrongInput');
  }
};

const tastesCheck = (e) => {

  let val1 = taste1.value;
  let val2 = taste2.value;

  if(val1=='none' && val2=='none')
  {
    taste1.classList.add('wrongInput');
    taste2.classList.add('wrongInput');
    flags[5] = 0;
  }
  else if(val1==val2)
  {
    taste1.classList.add('wrongInput');
    taste2.classList.add('wrongInput');
    flags[5] = 0;
  }
  else
  {
    taste1.classList.remove('wrongInput');
    taste2.classList.remove('wrongInput');
    flags[5] = 1;
  }

};

const nameCheck = (e) => {
  let val = e.target.value;

  if(val.length>=1 && val.length <=40)
  {
    flags[1] = 1;
    e.target.classList.remove('wrongInput');
  }
  else
  {
    flags[1] = 0;
    e.target.classList.add('wrongInput');
  }

};

const ingredientsCheck = () => {

  let isOK = true;

  ingredientsFlags.forEach((flag) => {
    if(flag==0)
    {
      isOK = false;
    }
  });

  if(isOK == true)
  {
    flags[4] = 1;
  }
  else
  {
    flags[4] = 0;
  }

};

const rowCheck = (e) => {

  let index = e.target.parentNode.lastElementChild.dataset.num;

  //create regular expressions
  const nameReg = /^.{1,38}$/;
  const amountReg = /^\d+[a-z]{1,3}$/i;
  const kcalReg = /^\d{1,6}$/;

  //test the values
  if(nameReg.test(ingredients[index].value) && amountReg.test(amounts[index].value) && kcalReg.test(kcals[index].value))
  {
    ingredientsFlags[index] = 1;
  }
  else
  {
    //test each single value
    if(e.target.name=="ingredients[]")
    {
      if(!nameReg.test(ingredients[index].value))
      {
        ingredients[index].classList.add('wrongInput');
      }
      else
      {
        ingredients[index].classList.remove('wrongInput');
      }
    }

    else if(e.target.name=="amount[]")
    {
      if(!amountReg.test(amounts[index].value) || !amounts[index].value)
      {
        amounts[index].classList.add('wrongInput');
      }
      else
      {
        amounts[index].classList.remove('wrongInput');
      }
    }

    else if(e.target.name=="kcal[]")
    {
      if(!kcalReg.test(kcals[index].value))
      {
        kcals[index].classList.add('wrongInput');
      }
      else
      {
        kcals[index].classList.remove('wrongInput');
      }
    }

    ingredientsFlags[index] = 0;
  }

  ingredientsCheck();
};

const prepareCheck = (e) => {
  let val = e.target.value;

  if(val.length>=15)
  {
    flags[6] = 1;
    e.target.classList.remove('wrongInput');
  }
  else
  {
    flags[6] = 0;
    e.target.classList.add('wrongInput');
  }
};


//add event listeners
recipeName.addEventListener('change', nameCheck);
meal.addEventListener('change', selectCheck);
meatvege.addEventListener('change', selectCheck);
taste1.addEventListener('change', tastesCheck);
taste2.addEventListener('change', tastesCheck);
prepare.addEventListener('change', prepareCheck);

for(let i=0; i<ingredients.length ; i++)
{
  ingredients[i].addEventListener('change', rowCheck);
  amounts[i].addEventListener('change', rowCheck);
  kcals[i].addEventListener('change', rowCheck);
}
