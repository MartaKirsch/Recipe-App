const session = require('express-session');


const index = (req, res) => {

  res.render('search');

};


const indexByAuthor = (req, res) => {

  res.render('searchAuthor');

};

module.exports = {
  index,
  indexByAuthor
};
