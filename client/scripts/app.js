// YOUR CODE HERE:
 
// You'll do this using $.ajax to send (POST) and fetch (GET) JSON data to and from a remote server.

$(document).ready(function() {
  // var $chats= $('#chats');
  var message = {
    username: 'shawndrost',
    text: 'trololo',
    roomname: '4chan'
  };
  $("button").click(function(){
      $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
    $.get('https://api.parse.com/1/classes/messages', function(data){
        $('#chats').append($data);
    });
  });

// var loadNewMessages = function () {
//     $(".tweet").remove();
//     var index = streams.home.length - 1;
//     while (index >= 0) {
//       var tweet = streams.home[index];
//       var $tweet = $('<div class="tweet"></div>');
//       var $user = $('<span class="user ' + tweet.user + '" title="Click here to view @' + tweet.user + '\'s timeline"></span>');
//       var $createdAt = $('<span class="createdAt"></span>');
//       var $msg = $('<p class="msg"></p>');
//       $user.text('@' + tweet.user + ':');
//       $createdAt.text(jQuery.timeago(tweet.created_at));
//       $msg.text(tweet.message);
//       $user.appendTo($tweet);
//       $createdAt.appendTo($tweet);
//       $msg.appendTo($tweet);
//       $tweet.appendTo($body);
//       index --;
//     }
//   }
//   setInterval(loadNewMessages, 5000);
})
