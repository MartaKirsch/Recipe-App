
const generateATags = (docs, clearFirst) => {

  if(clearFirst)
  {
    document.querySelector('#recipes').innerHTML = '';
  }

  //if no recipes are found
  if(docs.length==0 && clearFirst)
  {
    //create all the elements
    let a = document.createElement('a');
    let img = document.createElement('img');
    let recipesText = document.createElement('div');
    let recipesName = document.createElement('div');

    //set up all the created elements

    //url
    img.src = '/public/img/dinner.png';

    //classes
    recipesText.classList.add('recipesText');
    recipesName.classList.add('recipesName');

    //innerHTML
    recipesName.innerHTML = 'No Recipes Found!';

    //put recipesText together
    recipesText.appendChild(recipesName);

    //pu a tag together
    a.appendChild(img);
    a.appendChild(recipesText);

    document.querySelector('#recipes').appendChild(a);
  }

  //if there are recipes found
  else
  {
    docs.forEach(doc=>{
      //create all the elements
      let a = document.createElement('a');
      let img = document.createElement('img');
      let recipesText = document.createElement('div');
      let recipesName = document.createElement('div');
      let tags = document.createElement('div');

      let tastesArr = [];
      doc.tastes.forEach((taste) => {
        tastesArr.push(document.createElement('div'));
      });

      let meal = document.createElement('div');
      let meatvege = document.createElement('div');
      let kcal = document.createElement('div');

      //set up all the created elements

        //urls
      a.href = `/recipes/recipe/${doc._id}`;

      img.src = doc.imgURL;

        //classes
      recipesText.classList.add('recipesText');
      recipesName.classList.add('recipesName');
      tags.classList.add('tags');

      meal.classList.add('tag');
      meatvege.classList.add('tag');
      kcal.classList.add('tag');
      meal.classList.add('tag');

        //innerHTMLs
      meal.innerHTML = doc.meal;
      meatvege.innerHTML = doc.meatvege;
      kcal.innerHTML = doc.sumOfKcal + "kcal";
      recipesName.innerHTML = doc.name;

      for(let i=0; i<tastesArr.length; i++)
      {
        tastesArr[i].classList.add('tag');
        tastesArr[i].innerHTML = doc.tastes[i];
      }

      //put everything together

        //tags
      tags.appendChild(kcal);
      tags.appendChild(meal);
      tastesArr.forEach((taste) => {
        tags.appendChild(taste);
      });
      tags.appendChild(meatvege);

        //recipesText
      recipesText.appendChild(recipesName);
      recipesText.appendChild(tags);

        //a tag
      a.appendChild(img);
      a.appendChild(recipesText);

      document.querySelector('#recipes').appendChild(a);



    });
  }

};

const loadRecipes = async (e) => {

  let kcalmin = "";
  let kcalmax = "";

  //inputs
  const name = document.querySelector('input[name="search"]');
  const meal = document.querySelector('select[name="meal"]');
  const meatvege = document.querySelector('select[name="meatvege"]');
  const taste = document.querySelector('select[name="taste"]');
  const sortBy = document.querySelector('#sortBy');
  kcalmin = document.querySelector('input[name="kcalmin"]');
  kcalmax = document.querySelector('input[name="kcalmax"]');


  let added = '';

  //flag for the db query to search by author
  if(e.added)
  {
    added = e.added;
  }
  else if(e.type == 'submit')
  {
    //prevent form's default behaviour
    console.log('prevent');
    e.preventDefault();
  }

  //get the num of already loaded recipes
  let atags = document.querySelectorAll('#recipes a');
  let num = atags.length;
  if(e.type && e.target.id == 'filters')
  {
    num = 0;
  }
  else if(e.new)
  {
    num = 0;
  }

  //search by author
  let author = '';
  if(e.added == 'searchByAuthor')
  {
    let reg = /\/\w+$/;
    author = location.href.match(reg)[0];
    author = author.slice(1, author.length);
  }

  //fetch new recipes
  let data = await fetch(`/recipes/load/${num}`,
    {
      method:"POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.value,
        meatvege: meatvege.value,
        meal: meal.value,
        sortBy: sortBy.value,
        taste: taste.value,
        kcalmin: kcalmin.value,
        kcalmax: kcalmax.value,
        added: added,
        author: author
      })
    })
 .then(res=>res.json());

  console.log(data);

  //generate the a tags of the recipesName
  //if it comes from a form - delete previous content
  if(e.type && e.target.id == 'filters')
  {
    generateATags(data, 1);
    window.scroll(0,0);
  }
  //if it comes from the input change on the account view - delete previous content
  else if(e.new)
  {
    generateATags(data, 1);
    window.scroll(0,0);
  }
  //else - it comes from scrolling down the page so don't delete previous content
  else
  {
    generateATags(data, 0);
  }

};

//add event listeners (button and inputs)
document.querySelector('#filters').addEventListener('submit', loadRecipes);
const formInputs = document.querySelectorAll('#leftWrapper input,#leftWrapper select');
formInputs.forEach((input) => {
  input.addEventListener('change', ()=>{
    let event = new Event('submit');
    document.querySelector('#filters').dispatchEvent(event);
  });
});

window.onload = ()=>{
  if(document.querySelector('form#filters')!=null)
  {
    let event = new Event('submit', { cancelable: true });
    document.querySelector('#filters').dispatchEvent(event);
    let evt = new Event('resize');
    window.dispatchEvent(evt);
  }
  else
  {
    changeCollection();
  }
};
