const updateImg = async (e) => {

  //test the entered value for being a valid url
  const reg = /^https?:\/\/.+\.(jpg|png|svg)$/;

  //if it passes
  if(reg.test(e.target.value))
  {
    //try to load the img
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';

    let data = await fetch(proxyURL+e.target.value, {method:'GET'});

    //if it is valid, reload the img shown on the page
    if(data.status == 200)
    {
      document.querySelector('#recipeImg').src = e.target.value;
      flags[0] = 1;
    }
    //if it's not
    else
    {
      document.querySelector('#recipeImg').src = '/public/img/red-cross.png';
      flags[0] = 0;
    }
  }

  //if it's not
  else if(e.target.value =="")
  {
    document.querySelector('#recipeImg').src = '/public/img/img.png';
    flags[0] = 1;
  }

  else
  {
    document.querySelector('#recipeImg').src = '/public/img/red-cross.png';
    flags[0] = 0;
  }


};

//add event listener
imgUrl.addEventListener('change', updateImg);
