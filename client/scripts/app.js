// YOUR CODE HERE:

var app = {};

app.init = function () {
  $( document ).ready(function() {
    $('#main').on('click', '.username', function () {
      app.handleUsernameClick('.username');
    });

    $('#send').on('click', '.submit', app.handleSubmit);

    $('#rooms').on('click', '.newRoom', app.renderRoom);

    // add event handler for when room is selected in drop down and call
    // displayRoomMessages
  });

  setInterval(app.fetch, 1000);
};


app.send = function (message) {

  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      console.log(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

};

app.fetch = function () {
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: {order: '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
      window.allMsgs = data.results;
      app.displayMessages();
      app.displayRooms();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive message', data);
    }
  });
  // $.get('https://api.parse.com/1/classes/messages', function(data, status) {
  //   console.log(data, status);
  // });
  // console.log(JSON.stringify($.ajax.args[0][0]));
};

app.server = 'https://api.parse.com/1/classes/messages'; // revisit

app.clearMessages = function () {
  $('#chats').empty();
};

app.renderMessage = function (message) {

  var $message = $('<div class="message"></div>');
  var $username = $('<span class="username"></span>');
  var $text = $('<div class="text"></div>');
  var $roomname = $('<div class="roomname"></div>');
  $username.text(message.username + ':');
  $text.text(message.text);
  $roomname.text(message.roomname);
  $username.appendTo($message);
  $text.appendTo($message);
  $roomname.appendTo($message);
  $message.appendTo($('#chats'));

};

app.renderRoom = function () {
  var roomName = $('#room').val();
  var $roomname = $('<option class="' + roomName + '"></option>');
  $roomname.text($('#room').val());
  $roomname.appendTo($('.roomSelect'));
};

app.handleUsernameClick = function (username) {
  $(username).css('font-weight', 'bold');
};

app.handleSubmit = function () {
  var message = {
    username: window.location.search ? window.location.search.slice(10) : 'anonymous',
    text: $('#message').val(),
    roomname: $('roomSelect').val() ? $('roomSelect').val() : 'lobby'
  };
  app.send(message);
  // app.renderMessage(message);
};

app.displayMessages = function() {
  app.clearMessages();
  window.allMsgs.forEach(function(message) {
    app.renderMessage(message);
  });
};

app.displayRooms = function() {
  var roomNames = {};
  var existingRooms = $('option').attr('class').split(' ');
console.log(existingRooms);
  window.allMsgs.forEach(function(message) {
    if (existingRooms.indexOf(message.roomname) < 0) {
      roomNames[message.roomname] = message.roomname;
    }
  });
  for (var key in roomNames) {
    var $roomname = $('<option class="' + key + '"></option>');
    $roomname.text(key);
    $roomname.appendTo($('.roomSelect'));
  }
};

app.displayRoomMessages = function() {
  window.allMsgs.forEach(function(message) {
    // app.renderMessage(message);
    // filter messages for specific room that was selected
  });
};

app.init();

