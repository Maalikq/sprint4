

const jwt = require('jsonwebtoken');
const { SocialModel } = require('../model/social.model');
require("dotenv").config()

const createPost = async (req, res) => { 
    const newPost = req.body;
    try {
        const addPost = await SocialModel(newPost)
        await addPost.save()
        res.send("Post created successfully")
        
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

const getAllPost = async (req, res,) => {
    const token = req.headers.authorization;
    let yourID;
    if (token) {
        const decode = jwt.verify(token, process.env.KEY)
        if (decode) {
            const userID = decode.userID;
            yourID = userID
        }
    }
    const {device} = req.query
    const queryObject = { userID: yourID }
    if (device) {
        queryObject.device = device
    }
    try {
        const getPost = await SocialModel.find(queryObject)
        res.send(getPost)
        
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

const patchPost = async (req, res) => { 
    const postData = req.body;
    const id = req.params.id;
    const post = await SocialModel.findOne({ _id: id })
    const post_userID = post.userID;
    const post_req = req.body.userID

    try {
        if (post_req !== post_userID) { 
            res.send("you are not allowed to edit this post")
            console.log("You are not allowed to edit this post")
        } else {
            await SocialModel.findByIdAndUpdate({ _id: id }, postData, { new: true })
            res.send("post updated successfully") 
        }
    } catch (err) {
        console.log(err);
        res.send("error updating post")
    }
}


const deletePost = async (req, res) => {
  const id = req.params.id;
  const post = await SocialModel.findOne({ _id: id });
  const post_userID = post.userID;
  const post_req = req.body.userID;

  try {
    if (post_req !== post_userID) {
      res.send("you are not allowed to delete this post");
      console.log("You are not allowed to delete this post");
    } else {
      await SocialModel.findByIdAndDelete({ _id: id }, postData, { new: true });
      res.send("post deleted successfully");
    }
  } catch (err) {
    console.log(err);
    res.send("error deleting post");
  }
};

module.exports = {getAllPost,createPost,patchPost,deletePost}







