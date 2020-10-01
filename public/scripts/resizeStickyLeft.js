const resize = (e) => {

  let navbars = document.querySelectorAll('.navbar');
  let navbar = navbars[navbars.length-1];

  if(window.innerWidth>=768)
  {
    navbar = navbars[0];
  }
  let nav = parseFloat(window.getComputedStyle(navbar, null).getPropertyValue('height'));
  let wrapper =  document.querySelector('#wrapper');
  let padding = 2.5 * parseFloat(window.getComputedStyle(wrapper, null).getPropertyValue('padding-left'));

  if(leftWrapper.classList.contains('recipe')||leftWrapper.classList.contains('logIn'))
  {
    document.querySelector('#stickyLeft').style.height = 'auto';
  }
  else
  {
    //set the stickyleft height so it's in the middle of the window (top/bottom)
    document.querySelector('#stickyLeft').style.height = (window.innerHeight - nav - padding)+'px';
  }

  if(window.innerWidth<=1200 && !leftWrapper.classList.contains('logIn'))
  {
    //set the left wrapper height so that it's the height of the whole document
    document.querySelector('#leftWrapper').style.height = (document.body.offsetHeight - nav - padding) + 'px';
  }
  else
  {
    document.querySelector('#leftWrapper').style.height = 'auto';
  }



  if(e.type == 'scroll')
  {
    first = true;
  }

  //if the delete recipe options are shown, close them
  if(document.querySelector('#delOpts') && document.body.offsetWidth<=1183)
  {
    document.querySelector('#wrapper').removeChild(document.querySelector('#delOpts'));
  }
  else if(document.querySelector('#delOpts'))
  {
    document.querySelector('#stickyLeft').removeChild(document.querySelector('#delOpts'));
  }


};

//is it first occurance of the 'scroll' event?
let first = false;
window.onresize = resize;
window.onscroll = ()=>{
  if(!first)
  {
    resize({type : 'scroll'});
  }
};


let evt = new Event('resize');
window.dispatchEvent(evt);
