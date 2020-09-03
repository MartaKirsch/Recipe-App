const loadRecipes = async (e) => {

  //prevent default behaviour
  e.preventDefault();

  alert('noice');
};

//add event listener
document.querySelector('#filters').addEventListener('submit', loadRecipes);
