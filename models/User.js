const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    default: []
  }],
  profileDet: {
    bio: {
      type: String,
      default: 'hello',
    },
  }
}, { timestamps: true })

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;