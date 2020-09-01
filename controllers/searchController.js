const session = require('express-session');


const index = (req, res) => {

  res.render('search');

};

module.exports = {
  index
};
