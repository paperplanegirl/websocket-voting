/* globals $ */
var socket = io();

$(document).ready(function () {;

  var count = 0
  var clientFingerprintsArray = []
  // Create a new ClientJS object and get the client's fingerprint id
  var client = new ClientJS()
  var fingerprint = client.getCustomFingerprint()
  console.log(fingerprint);

  // socket.emit('newFP', fingerprint)

  socket.on('disconnect', function () {
    console.log('user disconnected')
  })

  $('#buzz').click(function () {
    // IF MY FP IS NOT IN THE ARRAY, THEN DO THIS {...
    if (clientFingerprintsArray.indexOf(fingerprint) === -1 ) {
      count++
      socket.emit('clicked', {count: count, fingerprint: fingerprint})
      console.log('vote success. total count: ' + count)
    } else {
      console.log('user already in array, voting not allowed');
    }
  })

  socket.on('totalclicked', function (data) {
    clientFingerprintsArray = data.fingerprints
    $('#counter').empty().append(data.count)
  })

  socket.on('tweets', function (tweet) {
    console.log(tweet)
    $('#tweet-box').append('<div><p>' + tweet.text + '</p></div>')
  })

  socket.on('totalFP', function(fingerprints) {
    clientFingerprintsArray = fingerprints
  })
})
