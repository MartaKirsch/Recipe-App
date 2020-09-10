const changeCollection = () => {

  buttons.forEach((button) => {
    if(button.classList.toggle('clicked'))
    {
      inputs.forEach((input) => {

        //reset inputs' values
        if(input.type == 'select-one')
        {
          input.selectedIndex = 0;
        }
        else
        {
          input.value = '';
        }

        let otherFlag = 'Saved';
        if(button.innerHTML=='Saved')
        {
          otherFlag = 'Added';
        }

        //add new event listeners
        input.addEventListener('change', ()=>{
          loadRecipes({added:button.innerHTML, new:'yes'});
        });

        input.removeEventListener('change', ()=>{
          loadRecipes({added:otherFlag, new:'yes'});
        });

      });

      loadRecipes({added:button.innerHTML, new:'yes'});
    }
  });


};

//add event listener
const buttons = document.querySelectorAll('#savedAdded div');
buttons.forEach((button) => {
  button.addEventListener('click', changeCollection);
});

//inputs
const inputs = document.querySelectorAll('.filter select, .filter input');
