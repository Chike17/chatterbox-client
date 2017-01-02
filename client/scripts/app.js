// YOUR CODE HERE:
 
// You'll do this using $.ajax to send (POST) and fetch (GET) JSON data to and from a remote server.

var app = {
  init: function() {},
  send: function() {
    $(document).ready(function() {
      // var $chats= $('#chats');
      var message = {
        username: 'shawndrost',
        text: 'trololo',
        roomname: '4chan'
      };
      // $('button').click(function() {
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
      });
    // });
  },
  fetch: function() {}
};

// $.get('https://api.parse.com/1/classes/messages', function(data) {
//     $('#chats').append($data);
// });