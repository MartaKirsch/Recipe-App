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

        let index = user.savedRecipes.map((e)=>{ return JSON.parse(e)._id; }).indexOf(id);

        if(index>=0)
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

      let index = doc.savedRecipes.map((e)=>{ return JSON.parse(e)._id; }).indexOf(id);

      //it's already saved
      if(index>=0)
      {
        let arrPart1 = doc.savedRecipes.slice(0, index);
        let arrPart2 = doc.savedRecipes.slice(index+1, doc.savedRecipes.length);
        let arr = arrPart1.concat(arrPart2);

        doc.savedRecipes = arr;
        doc.save().then(blob=>{
          res.json({deleted:'yes'});
        });
      }

      //it's not saved yet
      else
      {
        Recipe.findOne({_id:id}).then(recipe=>{

          doc.savedRecipes.push(JSON.stringify(recipe));
          doc.save().then(blob=>{
            res.json({saved:'yes'});
          });

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
    searchObj.sumOfKcal = {$gt: parseInt(data.kcalmin),$lt: 99999};
    if(data.kcalmax != "")
    {
      searchObj.sumOfKcal = {$gt: parseInt(data.kcalmin),$lt: parseInt(data.kcalmax)};
    }
  }
  else if(data.kcalmax != "")
  {
    searchObj.sumOfKcal = {$gt: 0,$lt: parseInt(data.kcalmax)};
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

  //searching for all or by the author
  if(data.added == 'Added' || !data.added || data.added == "")
  {
    if(data.added == 'Added')
    {
      searchObj.author = sess.login;
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
  }

  //searching for the saved ones by a user
  else if(data.added == 'Saved')
  {
    User.findOne({name:sess.login}).then(user=>{

      let recipes = user.savedRecipes;


      let docs = [];
      recipes.forEach(recipe=>{
        docs.push(JSON.parse(recipe));
      })


      //apply all the filters
      if(searchObj.name||searchObj.meal||searchObj.meatvege||searchObj.kcalmin||searchObj.kcalmax||searchObj.tastes)
      {
        if(searchObj.name)
        {
          let buffor = [];
          docs.forEach(doc=>{
            if(searchObj.name.test(doc.name))
            {
              buffor.push(doc);
            }
          });
          docs = buffor;
        }

        if(searchObj.meal)
        {
          let buffor = [];
          docs.forEach(doc=>{
            if(searchObj.meal == doc.meal)
            {
              buffor.push(doc);
            }
          });
          docs = buffor;
        }

        if(searchObj.meatvege)
        {
          let buffor = [];
          docs.forEach(doc=>{
            if(searchObj.meatvege == doc.meatvege)
            {
              buffor.push(doc);
            }
          });
          docs = buffor;
        }

        if(searchObj.tastes)
        {
          let buffor = [];
          docs.forEach(doc=>{
            if(doc.tastes.indexOf(searchObj.tastes)>=0)
            {
              buffor.push(doc);
            }
          });
          docs = buffor;
        }

        if(searchObj.sumOfKcal)
        {
          let buffor = [];
          docs.forEach(doc=>{
            if(doc.sumOfKcal <= searchObj.sumOfKcal.$lt && doc.sumOfKcal >= searchObj.sumOfKcal.$gt)
            {
              buffor.push(doc);
            }
          });
          docs = buffor;
        }
      }

      //sort the docs
      if(ascDesc==1)
      {
        const sortingFun = (a, b) =>{

          if(a[sortByOption] < b[sortByOption])
          {
            return -1;
          }
          else if(a[sortByOption] > b[sortByOption])
          {
            return 1;
          }
          else
          {
            return 0;
          }
        };
        docs.sort(sortingFun);
      }
      else
      {
        const sortingFun = (a, b) =>{

          if(a.sumOfKcal < b.sumOfKcal)
          {
            return 1;
          }
          else if(a.sumOfKcal > b.sumOfKcal)
          {
            return -1;
          }
          else
          {
            return 0;
          }
        };
        docs.sort(sortingFun);
      }


      let num = req.params.num;
      docs = docs.slice(num, num+10);

      res.json(docs);


    });
  }






};


module.exports = {
  index,
  load,
  save
};
