const session = require('express-session');


const index = (req, res) => {
  let sess = req.session;

  //check if a user is logged in
  if(sess.login)
  {
    res.render('account');
  }

  //if not, redirect to the log-in page
  else
  {
    res.render('logIn');
  }

};

const logIn = (req, res) => {
  res.render('account');
};

module.exports = {
  index,
  logIn
};
