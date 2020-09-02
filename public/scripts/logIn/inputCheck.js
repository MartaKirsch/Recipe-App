//function that checks the login
const loginCheck = async (e) => {

  //reset the popup
  errDiv.style.display = 'none';

  //get the value
  let val = e.target.value;

  if(val=="" || !val)
  {
    errorDivs[0].innerHTML = 'This field cannot be empty!';
    errorDivs[0].style.visibility = 'visible';
    flags[0] = 0;
  }
  else
  {
    //check in db if user with this nickname already exists
    let data = await fetch(`/account/checkIfLoginExists/${val}`).then(res=>res.json());

    if(data.exists == 'yes')
    {
      errorDivs[0].innerHTML = 'This login is already in use!';
      errorDivs[0].style.visibility = 'visible';
      flags[0] = 0;
    }
    else
    {
      errorDivs[0].style.visibility = 'hidden';
      flags[0] = 1;
    }
  }



};

//function that checks the email
const emailCheck = async (e) => {

  //reset the popup
  errDiv.style.display = 'none';

  //create regular expression for the email
  const emailReg = /^\w+@\w+\.[a-z]{2,3}$/;

  //get the entered value
  const val = e.target.value;

  if(val=="" || !val)
  {
    errorDivs[1].innerHTML = 'This field cannot be empty!';
    errorDivs[1].style.visibility = 'visible';
    flags[1] = 0;
  }
  else if(emailReg.test(val))
  {
    errorDivs[1].style.visibility = 'hidden';
    flags[1] = 1;

    let data = await fetch(`/account/checkIfEmailExists/${val}`).then(res=>res.json());

    if(data.exists == 'yes')
    {
      errorDivs[1].innerHTML = 'This email is already in use!';
      errorDivs[1].style.visibility = 'visible';
      flags[1] = 0;
    }
    else
    {
      errorDivs[1].style.visibility = 'hidden';
      flags[1] = 1;
    }
  }
  else
  {
    errorDivs[1].innerHTML = 'This is not a valid email address!';
    errorDivs[1].style.visibility = 'visible';
    flags[1] = 0;
  }

};

//function that checks the password
const passwordCheck = (e) => {

  //reset the popup
  errDiv.style.display = 'none';

  //create regular expression for the email
  const passwordReg = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

  //get the entered value
  const val = e.target.value;

  if(passwordReg.test(val))
  {
    errorDivs[2].style.visibility = 'hidden';
    flags[2] = 1;
  }
  else if(val=="" || !val)
  {
    errorDivs[2].innerHTML = 'This field cannot be empty!';
    errorDivs[2].style.visibility = 'visible';
    flags[2] = 0;
  }
  else
  {
    errorDivs[2].innerHTML = 'One upper- and lowercase letter and one digit!';
    errorDivs[2].style.visibility = 'visible';
    flags[2] = 0;
  }
};

//add event listeners
rTextInputs[0].addEventListener('change', loginCheck);
rTextInputs[1].addEventListener('change', emailCheck);
rPassword.addEventListener('change', passwordCheck);
