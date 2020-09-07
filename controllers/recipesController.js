const session = require('express-session');
const Recipe = require('../models/recipeModel.js');


const index = (req, res) => {

  let sess = req.session;

  if(sess.login)
  {
    res.render('add');
  }
  else
  {
    res.redirect('/account');
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
  load
};
