
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const handlebars = require('express-handlebars');
const session = require('express-session');
const expressValidator = require('express-validator');
const index = require('./routes/index');




const app = express();





app.use('/assets', express.static(path.join(__dirname, 'public')));


app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use('/', index);



app.listen(3000, function() {
    console.log('Server listening on port 3000');
});