const checkForm = (e) => {

  //check if an avatar is chosen
  if(flags[3]==0)
  {
    errDiv.style.display = 'block';
    errDiv.innerHTML = 'You need to select an avatar!';
  }
  else
  {
    let flagsCheck = 1;

    //check if all the flags are alright
    flags.forEach((flag) => {
      if(flag==0)
      {
        flagsCheck = 0;
      }
    });

    if(flagsCheck == 0)
    {
      errDiv.style.display = 'block';
      errDiv.innerHTML = 'You need to correctly enter all the data!';
    }

    else
    {
      document.querySelector('#registerButton').type = 'submit';
    }

  }

};

//add event listener
document.querySelector('#registerButton').addEventListener('click', checkForm);
