var Chatroom = require('./chatModel.js').Chatroom;
var Message = require('./chatModel.js').Message;

var chatController = {};

chatController.createChat = function(users, location) {
  usersDbObj = users.map(function(user) {
    return {
      id: user.id,
      name: user.name
    };
  });

  Chatroom.create({
    users: usersDbObj,
    messages: [],
    coords: location
  }, function(err, chatroom) {
    if(err){
      throw new Error(err);
    }
    console.log('we did it');
    users.forEach(function(user) {
      user.join(chatroom._id);
    });
  });
};

chatController.addMessage = function (chatroomId, message) {
  Message.create(message).then(function(msg) {
    Chatroom.findOne({_id: chatroomId}, function (err, chatroom) {
      if (err) {
        console.error(err);
      }
      var messages = chatroom ? chatroom.messages : [];
      messages.push(msg._id);
      Chatroom.findOneAndUpdate({_id: chatroomId}, {messages: messages}).exec();
    });
  });
};

chatController.getMessages = function (chatroomId) {
  return Chatroom
    .findOne({_id: chatroomId})
    .populate("messages")
    .exec();
};

chatController.removeChat = function (chatroomId) {
  Chatroom.remove({_id: chatroomId}, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("removed chat room successfully");
    }
  });
};

module.exports = chatController;
