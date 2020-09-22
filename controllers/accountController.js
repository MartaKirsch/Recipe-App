const session = require('express-session');
const User = require('../models/userModel');


const index = (req, res) => {
  let sess = req.session;

  //check if a user is logged in
  if(sess.login)
  {
    User.findOne({name: sess.login}).then(doc=>{
      res.render('account', doc);
    })
  }

  //if not, redirect to the log-in page
  else
  {
    res.render('logIn');
  }

};

const logIn = (req, res) => {
  let sess = req.session;

  let name = req.params.login;
  let pass = req.params.pass;

  const emailReg = /^\w+@\w+\.[a-z]{2,3}$/;

  console.log('checking login and password');

  //logging in with email
  if(emailReg.test(name))
  {
    User.findOne({email: name}).then((doc)=>{
      if(doc)
      {
        if(doc.password == pass)
        {
          sess.login = doc.name;
          res.json({correct:true});
        }
      }
      else
      {
        res.json({correct:false});
      }
    });
  }
  //logging in with nickname
  else
  {
    User.findOne({name: name}).then((doc)=>{
      if(doc)
      {
        if(doc.password == pass)
        {
          sess.login = doc.name;
          res.json({correct:true});
        }
      }
      else
      {
        res.json({correct:false});
      }
    });
  }

};

const register = (req, res) => {
  let sess = req.session;

  let num = 0;
  for(let i=1; i<=6; i++)
  {
    if(req.body[`${i}`]=='on')
    {
      num = i;
    }
  }

  let user = new User({
    name: req.body.login,
    email: req.body.email,
    password: req.body.password,
    avatar: num
  });

  user.save().then(()=>{
    sess.login = req.body.login;
    res.redirect('/account');
  });

};

const checkIfLoginExists = async (req, res) => {
  const login = req.params.name;

  User.findOne({name: login}).then((doc)=>{
    if(doc)
    {
      res.json({exists:'yes'});
    }
    else
    {
      res.json({exists:'no'});
    }
  })
  .catch((err)=>{
    console.log('There was an error: '+ err);
  });
};

const checkIfEmailExists = async (req, res) => {
  const mail = req.params.name;

  User.findOne({email: mail}).then((doc)=>{
    if(doc)
    {
      res.json({exists:'yes'});
    }
    else
    {
      res.json({exists:'no'});
    }
  })
  .catch((err)=>{
    console.log('There was an error: '+ err);
  });
};

const logOut = (req, res) => {

  req.session.destroy();

  res.redirect('/');

};

module.exports = {
  index,
  logIn,
  register,
  checkIfLoginExists,
  checkIfEmailExists,
  logOut
};
