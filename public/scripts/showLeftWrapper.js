const showLeftWrapper = () => {

  //get the left wrapper and sidebar
  const leftWrapper = document.querySelector('#leftWrapper');
  const sidebar = document.querySelector('#sidebar');

  //make it visible or invisible
  if(leftWrapper.style.display == 'block')
  {
    leftWrapper.style.display = 'none';
  }
  else
  {
    leftWrapper.style.display = 'block';
  }


};

document.querySelector('#sidebar').addEventListener('click', showLeftWrapper);
