
const express = require('express');
const { createPost, patchPost, deletePost, getAllPost } = require('../controller/social.controller');

const socialRouter = express.Router();

socialRouter.post('/create',createPost)
socialRouter.get('/',getAllPost)
socialRouter.patch('/update/:id',patchPost)
socialRouter.delete('/delete/:id',deletePost)

module.exports ={socialRouter}