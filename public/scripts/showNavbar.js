const showNavbar = () => {

  //get all the a tags
  const atags = document.querySelectorAll('nav a');

  //get the minimize img
  const img = document.querySelector('#minimizeImg');

  //switch their display
  if(!atags[0].classList.contains('visible'))
  {
    atags.forEach((tag) => {

      tag.classList.add('visible');

    });

    img.src = '/public/img/down-arrow.png';
  }
  else
  {
    atags.forEach((tag) => {

      tag.classList.remove('visible');

    });

    img.src = '/public/img/up-arrow.png';
  }

};

//add event listener - dunno why it doesn't work
// document.querySelector('#minimize img').addEventListener('click', ()=>{
//   console.log('a');
// });
