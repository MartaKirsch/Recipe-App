const showLeftWrapper = () => {

  //get the left and right wrapper
  const leftWrapper = document.querySelector('#leftWrapper');
  const rightWrapper = document.querySelector('#rightWrapper');

  //make it visible
  if(leftWrapper.style.display=='none')
  {
    leftWrapper.style.display = 'block';
    rightWrapper.style.display = 'none';
  }
  else
  {
    leftWrapper.style.display = 'none';
    rightWrapper.style.display = 'block';
  }


};

document.querySelector('#sidebar').addEventListener('click', showLeftWrapper);
