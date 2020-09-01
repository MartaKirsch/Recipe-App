const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const accountRoutes = require('./routes/accountRoutes.js');
const searchRoutes = require('./routes/searchRoutes.js');
const addRoutes = require('./routes/addRoutes.js');
const bodyParser = require('body-parser');

//create app
const app = express();

//db connection
// mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
//   .then((result)=>{console.log('connected to db');app.listen(port);})
//   .catch((err)=>{console.log('there is an error: '+err);});

//listen to port 3000
app.listen('3000');

//static files
app.use('/public', express.static('public'));

// parse application/json
app.use(bodyParser.json())

//set view engine
app.set('view engine', 'ejs');

//session
app.use(session({secret: 'ssshhhhh', resave:true, saveUninitialized: false}));


//home page
app.get('/', (req,res)=>{
  res.render('index');
});

//other routes
app.use('/account', accountRoutes);
app.use('/search', searchRoutes);
app.use('/add', addRoutes);

//404 page
app.use((req,res)=>{
  res.render('404');
});
