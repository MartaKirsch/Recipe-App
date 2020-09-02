const changeCheckbox = (e) => {

  errDiv.style.display = 'none';
  
  //get the clicked img number
  let clickedNum = e.target.dataset.num;

  //add class 'clicked' to the clicked checkbox
  checkboxes[clickedNum-1].classList.add('clicked');

  //uncheck all the other checkboxes
  checkboxes.forEach((checkbox) => {
    if(checkbox.classList.contains('clicked') && checkbox != e.target)
    {
      checkbox.checked = false;
    }
  });


  //set checkboxes flag
  if(e.target.checked)
  {
    flags[3] = 1;
  }
  else
  {
    flags[3] = 0;
  }

};

//add event listeners
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('click', changeCheckbox);
});
