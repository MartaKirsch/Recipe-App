const saveRecipe = async ()=>{

  const id = document.querySelector('#recipeId').innerHTML;
  const action = document.querySelector('#add').innerHTML;

  let data = await fetch(`/recipes/save/${id}/${action}`).then(res=>res.json());

  if(data.redirect)
  {
    //save the redirect url for the future redirect
    sessionStorage.setItem('redirectURL', `/recipes/recipe/${id}`);
    location.href = '/account';
  }
  else if(data.saved)
  {
    location.href=location.href;
  }
  else if(data.deleted)
  {
    location.href=location.href;
  }

};

document.querySelector('#add').addEventListener('click', saveRecipe);
