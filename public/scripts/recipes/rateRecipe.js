const rateRecipe = async () => {

  const id = document.querySelector('#recipeId').innerHTML;

  //check if a user is logged in
  let data = await fetch(`/recipes/checkLogIn`).then(res=>res.json());

  if(data.redirect)
  {
    //save the redirect url for the future redirect
    sessionStorage.setItem('redirectURL', `/recipes/recipe/${id}`);
    location.href = '/account';
  }
  else
  {
    const select = document.querySelector('select[name="rate"]');
    const rate = select.value;

    if(rate!='none')
    {
      let data = await fetch(`/recipes/rate/${rate}/${id}`).then(res=>res.json());

      if(data.isOK)
      {
        // console.log(data);
        window.location = window.location;
      }

    }

  }


};

document.querySelector('#rateButton').addEventListener('click', rateRecipe);
