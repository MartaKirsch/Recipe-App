const resize = (e) => {

  // document.querySelector('#stickyLeft').style.height = (window.innerHeight - 150)+'px';

  let navbar = document.querySelector('#navbar');
  let nav = parseFloat(window.getComputedStyle(navbar, null).getPropertyValue('height'));
  let wrapper =  document.querySelector('#wrapper');
  let padding = 2.5 * parseFloat(window.getComputedStyle(wrapper, null).getPropertyValue('padding-left'));

  if(!leftWrapper.classList.contains('logIn'))
  {
    //set the stickyleft height so it's in the middle (top/bottom)
    document.querySelector('#stickyLeft').style.height = (window.innerHeight - nav - padding)+'px';
  }

  if(document.body.offsetWidth<=1183 && !leftWrapper.classList.contains('logIn'))
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
