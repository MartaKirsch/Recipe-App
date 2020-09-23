const session = require('express-session');
const Recipe = require('../models/recipeModel.js');
const User = require('../models/userModel.js');


const index = (req, res) => {

  let sess = req.session;

  //get the recipe's id
  let id = req.params.id;

  //find the recipe
  Recipe.findById(id).then((doc)=>{

    doc.permissions = false;

    doc.alreadySaved = false;

    doc.user = 'none';
    if(sess.login)
    {
      doc.user = sess.login;
    }

    if(sess.login)
    {
      User.findOne({name:sess.login}).then(user=>{

        if(user)
        {
          let index = user.savedRecipes.indexOf(id);

          if(index>=0)
          {
            doc.alreadySaved = true;
          }
          if(doc.author == sess.login)
          {
            doc.permissions = true;
          }

          res.render('recipe', doc);
        }

        else
        {
          //create a new array without deleted recipe
          let arrPart1 = user.savedRecipes.slice(0, index);
          let arrPart2 = user.savedRecipes.slice(index+1, user.savedRecipes.length);
          let arr = arrPart1.concat(arrPart2);

          user.savedRecipes = arr;

          user.save().then(blob=>{

            res.render('404');

          });
        }
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

      let index = doc.savedRecipes.indexOf(id);

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

          doc.savedRecipes.push(recipe._id);
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
  if(data.added == 'Added' || data.added == 'searchByAuthor'|| !data.added || data.added == "")
  {
    if(data.added == 'Added')
    {
      searchObj.author = sess.login;
    }
    else if(data.added == 'searchByAuthor')
    {
      searchObj.author = data.author;
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
    //find the user
    User.findOne({name:sess.login}).then(user=>{

      let recipes = user.savedRecipes;
      let recipesLength = user.savedRecipes.length;


      let docs = [];
      recipes.forEach(recipe=>{

        //find all saved recipes
        Recipe.findOne({_id: recipe}).then(doc=>{

          //check if the recipe hasn't already been deleted
          if(doc)
          {
            docs.push(doc);

            //check if all the saved recipes are collected
            if(docs.length == recipesLength)
            {
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
            }
          }

          else
          {
            let index = user.savedRecipes.indexOf(recipe);

            //create a new array without deleted recipe
            let arrPart1 = user.savedRecipes.slice(0, index);
            let arrPart2 = user.savedRecipes.slice(index+1, user.savedRecipes.length);
            let arr = arrPart1.concat(arrPart2);

            user.savedRecipes = arr;

            recipesLength--;

            user.save();
            if(docs.length == recipesLength)
            {
              res.json(docs);
            }
          }

        });
      });






    });
  }






};

const deleteRecipe = (req, res) => {
  const id = req.params.id;

  Recipe.findOneAndDelete({_id: id}).then(doc=>{
    res.redirect('/account');
  });

};

const rateRecipe = (req, res) => {

  let sess = req.session;
  let id = req.params.id;
  let rate = parseInt(req.params.rate);

  Recipe.findOne({_id: id}).then((doc)=>{

    const index = doc.rates.author.indexOf(sess.login);

    //check if this user already rated this recipe
    if(index>=0)
    {
      let arr = doc.rates.rate;
      arr[index] = rate;
      doc.rates.rate = arr;
    }
    //first rate
    else
    {
      doc.rates.rate.push(rate);
      doc.rates.author.push(sess.login);
    }

    //update the average rate
    let sum = 0;

    doc.rates.rate.forEach((num) => {
      sum+=num;
    });

    let average = (sum)/(doc.rates.rate.length);

    doc.rates.average = average;

    // res.json({isOK: true, arr:doc});
    // doc.save().then((blob)=>{
    //   res.json({isOK: true, blob});
    // });

    Recipe.findOneAndUpdate({_id:id}, doc, (err, recipe) => {
      res.json({isOK: true});
    });

  });


};

const checkLogIn = (req, res) => {

  let sess = req.session;

  if(sess.login)
  {
    res.json({redirect:false});
  }
  else
  {
    res.json({redirect:true});
  }

};


module.exports = {
  index,
  load,
  save,
  deleteRecipe,
  rateRecipe,
  checkLogIn
};
