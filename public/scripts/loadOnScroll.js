const onScroll = (e) => {

  //get the document height
  var docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;

  //check if it's already bottom
  if(window.innerHeight + window.pageYOffset == docHeight)
  {
    //change the cursor so the user knows sth is being loaded
    document.body.cursor = 'wait';
    loadRecipes().then(()=>{
      document.body.cursor = 'default';
    });
  }
}

window.addEventListener('scroll', onScroll);
