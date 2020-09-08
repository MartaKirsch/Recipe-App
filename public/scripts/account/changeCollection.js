const changeCollection = () => {

  buttons.forEach((button) => {
    if(button.classList.toggle('clicked'))
    {
      inputs.forEach((input) => {

        //add new event listeners
        input.addEventListener('change', ()=>{
          loadRecipes({added:button.value, new:'yes'});
        });

      });

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
