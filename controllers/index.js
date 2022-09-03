const { sumOfTwo } = require('../helpers/helpers')
const Post = require('../models/Post.js')

exports.getIndex = async (req, res) => {
 try {
  const posts =  await Post.find({})
  res.render('index',{
    title: "Home",
    posts,
    userAuth: null
  });
 } catch (error) {
  console.error(error);
 }
};
