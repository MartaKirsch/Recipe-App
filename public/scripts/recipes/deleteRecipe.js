const hide = () => {

  //get the delete options div
  const delOpts = document.querySelector('#delOpts');

  if(document.body.offsetWidth<=1183)
  {
    const wrapper = document.querySelector('#wrapper');
    wrapper.removeChild(delOpts);
  }

  else
  {
    //get sticky wrapper
    const sticky = document.querySelector('#stickyLeft');

    sticky.removeChild(delOpts);
  }

};

const deleteRecipe = () => {

  //check if the options div is already displayed
  if(!document.querySelector('#delOpts'))
  {
    //get rigth wrapper
    const sticky = document.querySelector('#stickyLeft');

    //get old content
    const children = sticky.children;

    //get the recipe's id
    const id = document.querySelector('#recipeId').innerHTML;

    //create new content
    const delOpts = document.createElement('div');
    const delButtons = document.createElement('div');
    const yes = document.createElement('a');
    const no = document.createElement('div');

    delOpts.innerHTML = 'Do you really want to delete this recipe?';
    delOpts.id = 'delOpts';

    yes.innerHTML = 'Yes';
    no.innerHTML = 'No';

    yes.classList.add('delOpt');
    no.classList.add('delOpt');

    yes.href = '/recipes/delete/'+ id ;

    delButtons.id = "delButtons";

    //append children
    delButtons.appendChild(yes);
    delButtons.appendChild(no);

    delOpts.appendChild(delButtons);

    //get last child
    const last = children[sticky.childElementCount - 1];


    if(document.body.offsetWidth<=1183)
    {
      const wrapper = document.querySelector('#wrapper');
      wrapper.insertBefore(delOpts, wrapper.children[1]);

      //add event listener to the 'no' option
      document.querySelector('#wrapper .delOpt:nth-child(2)').addEventListener('click', hide);
    }
    else
    {
      //display new content
      sticky.removeChild(last);
      sticky.appendChild(delOpts);
      sticky.appendChild(last);

      //add event listener to the 'no' option
      document.querySelector('#stickyLeft .delOpt:nth-child(2)').addEventListener('click', hide);
    }
  }
  

};

if(document.querySelector('#delete'))
{
  document.querySelector('#delete').addEventListener('click', deleteRecipe);
}
