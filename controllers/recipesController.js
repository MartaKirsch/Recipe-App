const session = require('express-session');
const Recipe = require('../models/recipeModel.js');
const User = require('../models/userModel.js');


const index = (req, res) => {

  let sess = req.session;

  //get the recipe's id
  let id = req.params.id;

  //find the recipe
  Recipe.findById(id).then((doc)=>{

    doc.alreadySaved = false;

    if(sess.login)
    {
      User.findOne({name:sess.login}).then(user=>{
        if(user.savedRecipes.indexOf(id)>=0)
        {
          doc.alreadySaved = true;
        }
        res.render('recipe', doc);
      });
    }
    else
    {
      res.render('recipe', doc);
    }
  });

};

const save = (req, res) => {

  let sess = req.session;

  //get the recipe's id and action (+/-)
  let id = req.params.id;
  let action = req.params.action;

  //if the user is not logged in, send info about redirect needed for him to log in first
  if(!sess.login)
  {
    res.json({redirect: 'yes'})
  }
  //if the user is logged in
  else
  {
    //check if the recipe is already saved
    User.findOne({name: sess.login}).then(doc=>{
      //it's already saved
      if(doc.savedRecipes.indexOf(id)>=0)
      {
        if(action=='+')
        {
          res.json({alreadySaved:'yes'});
        }
        else if(action=='-')
        {
          let index = doc.savedRecipes.indexOf(id);
          let arrPart1 = doc.savedRecipes.slice(0, index);
          let arrPart2 = doc.savedRecipes.slice(index+1, doc.savedRecipes.length);
          let arr = arrPart1.concat(arrPart2);

          doc.savedRecipes = arr;
          doc.save();
          res.json({deleted:'yes'});
        }
      }
      //it's not saved yet
      else
      {
        doc.savedRecipes.push(id);
        doc.save().then(blob=>{
          res.json({saved:'yes'});
        });
      }
    });
  }



};

const load = async (req, res) => {

  let sess = req.session;

  //get the data
  const data = req.body;

  //search params
  let searchObj = {};

  if(data.name!='')
  {
    searchObj.name = new RegExp(data.name, "i");
  }
  if(data.meal!='none')
  {
    searchObj.meal = data.meal;
  }
  if(data.meatvege!='none')
  {
    searchObj.meatvege = data.meatvege;
  }
  if(data.taste!='none')
  {
    searchObj.tastes = data.taste;
  }
  if(data.kcalmin != "")
  {
    searchObj.sumOfKcal = {$gt: parseInt(data.kcalmin)};
    if(data.kcalmax != "")
    {
      searchObj.sumOfKcal = {$gt: parseInt(data.kcalmin),$lt: parseInt(data.kcalmax)};
    }
  }
  else if(data.kcalmax != "")
  {
    searchObj.sumOfKcal = {$lt: parseInt(data.kcalmax)};
    if(data.kcalmin != "")
    {
      searchObj.sumOfKcal = {$gt: parseInt(data.kcalmin),$lt: parseInt(data.kcalmax)};
    }
  }

  if(data.added == 'Added')
  {
    searchObj.author = sess.login;
  }

  //sorting options
  let sortByOption = '';
  let ascDesc = 1;
  let patterns = {
    rate: /rate/,
    kcal: /kcal/,
    date: /date/,
    up: /Up/,
    down: /Down/
  };

  if(data.sortBy=='none' || patterns.date.test(data.sortBy))
  {
    sortByOption = 'createdOn';
    ascDesc = -1;
  }
  else if(patterns.rate.test(data.sortBy))
  {
    sortByOption = 'rates.average';
  }
  else if(patterns.kcal.test(data.sortBy))
  {
    sortByOption = 'sumOfKcal';
  }

  if(patterns.up.test(data.sortBy))
  {
    ascDesc = 1;
  }
  else if(patterns.down.test(data.sortBy))
  {
    ascDesc = -1;
  }

  //get the recipes
  Recipe
  .find(searchObj)
  .skip(parseInt(req.params.num))
  .limit(10)
  .sort([[sortByOption , ascDesc]])
  .then((docs)=>{

    //send the recipes to the frontend
    res.json(docs);

  })
  .catch(err=>console.log(err));




};

module.exports = {
  index,
  load,
  save
};
