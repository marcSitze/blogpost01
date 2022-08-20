const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: []
    }
  ]
}, { timestamps: true })

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;