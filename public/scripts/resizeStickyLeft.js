const resize = () => {

  // document.querySelector('#stickyLeft').style.height = (window.innerHeight - 150)+'px';

  let navbar = document.querySelector('#navbar');
  let nav = parseFloat(window.getComputedStyle(navbar, null).getPropertyValue('height'));
  let wrapper =  document.querySelector('#wrapper');
  let padding = 2.5 * parseFloat(window.getComputedStyle(wrapper, null).getPropertyValue('padding-left'));
  // console.log(window.innerHeight);
  // console.log(nav);
  // console.log(padding);

  document.querySelector('#stickyLeft').style.height = (window.innerHeight - nav - padding)+'px';

};

window.onresize = resize;


let evt = new Event('resize');
window.dispatchEvent(evt);
