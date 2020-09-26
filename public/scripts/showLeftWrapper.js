const showLeftWrapper = () => {

  //get the left wrapper and sidebar
  const leftWrapper = document.querySelector('#leftWrapper');
  const sidebar = document.querySelector('#sidebar');

  //make it visible
  leftWrapper.style.display = 'block';

  //hide the sidebar
  // sidebar.style.display = 'none';


};

document.querySelector('#sidebar').addEventListener('click', showLeftWrapper);
