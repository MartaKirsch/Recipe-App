const checkLogInData = async () => {
  let login = lTextInput.value;
  let pass = lPassword.value;

  if(pass!="" || login!="" || pass || login)
  {
    //check in db if user with this nickname already exists
    let data = await fetch(`/account/checkLogInData/${login}/${pass}`, {method:'GET'}).then(res=>res.json());

    if(data.correct == true)
    {
      document.querySelector('#loginForm').submit();
    }
    else
    {
      errDiv.style.display = 'block';
      errDiv.innerHTML = 'Incorrect login data!';
    }
  }
};

document.querySelector('#loginButton').addEventListener('click', checkLogInData);
