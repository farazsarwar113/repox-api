var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: String,
  password: String,
  firstname: {
    type: String,
    default: ''
  },
  lastname: {
    type: String,
    default: ''
  },
  github:{
    g_id: {
      type: String,
      default: ''
    },
    g_username:{
      type: String,
      default: ''
    }
  },
  gitlab:{
    gl_id: {
      type: String,
      default: ''
    },
    gl_username:{
      type: String,
      default: ''
    }
  }

});

User.methods.getName = function () {
  return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);