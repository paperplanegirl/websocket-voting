var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port);
