const session = require('express-session');


const index = (req, res) => {

  res.render('add');

};

module.exports = {
  index
};
