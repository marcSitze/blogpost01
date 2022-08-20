const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
    require: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  }
}, { timestamps: true });

const CommentModel = mongoose.model('Comment', CommentSchema)

module.exports = CommentModel