const session = require('express-session');
const Recipe = require('../models/recipeModel.js');


const index = (req, res) => {

  let sess = req.session;

  if(sess.login)
  {
    if(req.params.id)
    {
      let id = req.params.id;
      Recipe.findOne({_id:id}).then(doc=>{
        res.render('add', {data:doc, update:true});
      });
    }
    else
    {
      res.render('add', {update:false});
    }
  }
  else
  {
    res.redirect('/account');
  }

};

const addRecipe = (req, res) => {

  let sess = req.session;

  //get the data
  const data = req.body;

  //get the tastes array ready
  let tastesArr = [];
  if(data.taste1!='none')
  {
    tastesArr.push(data.taste1);
  }
  if(data.taste2!='none')
  {
    tastesArr.push(data.taste2);
  }

  //get the ingredients array ready
  let ingredientsArr = [];

  let sum = 0;

  for(let i=0; i<data.ingredients.length; i++)
  {
    ingredientsArr[i] = {
      name: data.ingredients[i],
      amount: data.amount[i],
      kcal: parseInt(data.kcal[i])
    };
    sum += parseInt(data.kcal[i]);
  }

  //imgurl
  let imgURL = data.imgurl;
  if(data.imgurl=="")
  {
    imgURL = "/public/img/dinner.png";
  }

  //create new Recipe
  let recipe = new Recipe({
    "name": data.name,
    "imgURL": imgURL,
    "meal": data.meal,
    "meatvege": data.meatvege,
    "author": sess.login,
    "tastes": tastesArr,
    "sumOfKcal": sum,
    "ingredients": ingredientsArr,
    "howToPrepare": data.prepare
  });

  recipe.save().then((doc)=>{
    res.redirect('/account');
  });


};

const updateRecipe = (req, res) => {

  let sess = req.session;

  //get the data
  const data = req.body;

  Recipe.findOne({_id: req.params.id}).then(doc=>{

    //get the tastes array ready
    let tastesArr = [];
    if(data.taste1!='none')
    {
      tastesArr.push(data.taste1);
    }
    if(data.taste2!='none')
    {
      tastesArr.push(data.taste2);
    }

    //get the ingredients array ready
    let ingredientsArr = [];

    let sum = 0;

    for(let i=0; i<data.ingredients.length; i++)
    {
      ingredientsArr[i] = {
        name: data.ingredients[i],
        amount: data.amount[i],
        kcal: parseInt(data.kcal[i])
      };
      sum += parseInt(data.kcal[i]);
    }

    //imgurl
    let imgURL = data.imgurl;
    if(!data.imgurl || data.imgurl=="")
    {
      imgURL = "/public/img/dinner.png";
    }

    //update doc
    doc.name = data.name;
    doc.imgURL = imgURL;
    doc.meal = data.meal;
    doc.meatvege = data.meatvege;
    doc.author = sess.login;
    doc.tastes = tastesArr;
    doc.sumOfKcal = sum;
    doc.ingredients = ingredientsArr;
    doc.howToPrepare = data.prepare;


    //push it to the db
    doc.save().then(()=>{
      res.redirect('/account');
    })


  });




};

module.exports = {
  index,
  addRecipe,
  updateRecipe
};
