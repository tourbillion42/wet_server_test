const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`; //콘솔 정보 제공

  console.log(log);

  fs.appendFile('server.log', log + '\n', function(err){
    if(err){
      console.log('unable to append to server.log.');
    }
  });  // 정보 server.jog 저장
  next();
});

hbs.registerHelper('getCurrenYear', function(){
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', function(text){
  return text.toUpperCase();
});  // 글자 변경

app.get('/', function(req, res){
  res.render('home', {
    title : 'Home page',
    welcomeMessage : 'welcome to my website',
  // currentYear : new Date().getFullYear()
  })
});

app.get('/about', function(req, res){
  res.render('about', {
    title : 'About page',
  //  currentYear : new Date().getFullYear()
  });
});

app.get('/bad', function(req, res){
  res.send({
    errorMessage: 'unable to handle request'
  });
});

app.listen(9000, function(){
  console.log('Server running!');
});
