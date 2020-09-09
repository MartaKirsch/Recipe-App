const onScroll = (e) => {
  //prepare if it's an account view search
  let added = '';
  let option = document.querySelector('.clicked');
  if(option)
  {
    added = option.innerHTML;
  }

  //get the document height
  var docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;

  //check if it's already bottom
  if(window.innerHeight + window.pageYOffset == docHeight)
  {
    //change the cursor so the user knows sth is being loaded
    document.body.style.cursor = 'wait';
    loadRecipes({added:added}).then(()=>{
      document.body.style.cursor = 'default';
    });
  }
}

window.addEventListener('scroll', onScroll);
