var express = require('express')
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('twit');
var serverFingerprintsArray = []

require('dotenv').config();

var twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


app.use(express.static('public'));

app.get('/', function(req, res){
  res.render(__dirname + '/views/index.ejs');
});

io.sockets.on('connection', function(socket){

  socket.on('clicked', function(val){
    // val = {count: count, fingerprint: fingerprint}
    serverFingerprintsArray.push(val.fingerprint)
    io.emit('totalclicked', {count: val.count, fingerprints: serverFingerprintsArray});
  });

  // including twitter stream
  var stream = twitter.stream('statuses/filter', { track: 'got talent' });
  stream.on('tweet', function(tweet) {
    socket.emit('tweets', tweet);
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
