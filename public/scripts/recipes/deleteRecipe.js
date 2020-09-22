const hide = () => {

  //get rigth wrapper
  const sticky = document.querySelector('#stickyLeft');

  //get the delete options div
  const delOpts = document.querySelector('#delOpts');

  sticky.removeChild(delOpts);
};

const deleteRecipe = () => {

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

  //display new content
  sticky.removeChild(last);
  sticky.appendChild(delOpts);
  sticky.appendChild(last);

  //add event listener to the 'no' option
  document.querySelector('#stickyLeft .delOpt:nth-child(2)').addEventListener('click', hide);

};

document.querySelector('#delete').addEventListener('click', deleteRecipe);
