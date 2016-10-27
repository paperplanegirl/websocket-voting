$(document).ready(function()  {
  var socket = io();
  var count = 0;
  $("#buzz").click(function(){
    count++;
    socket.emit('clicked', count);
    console.log("hahaha");
  });

  socket.on('totalclicked', function(count){
    $("#counter").empty().append(count);
  });

  socket.on('tweets', function(tweet) {
    console.log(tweet);
    $("#tweet-box").append("<div><p>"+tweet.text+"</p></div>");
  });
});
