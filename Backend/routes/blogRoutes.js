const express =require("express");
const { model } = require("mongoose");
const { createBlog, getBlogs } = require("../controllers/blogControllers");
const route=express.Router()
const verifyUser=require("../middlewares/auth");


route.post("/blogs",verifyUser,createBlog)
route.get("/blogs",getBlogs)
route.get("/blogs/:id",(req,res)=>{
    const {id} =req.params
    let searchblog=blogs.filter(blog=>blog.id==id)
    return res.json({searchblog});
})
route.delete("/blogs/:id",(req,res)=>{
    const {id} =req.params
    let deleteblog=blogs.findIndex(blog=>blog.id==id)
    blogs.splice(deleteblog,1)
  
   return res.json({message:"Blog Deleted successfully"});
})
route.patch("/blogs/:id",(req,res)=>{
    const {id} =req.params
    let index=blogs.findIndex(blog=>blog.id==id)
    blogs[index]={...blogs[index],...req.body}
    return res.json({message:"Blog updated successfully"});
})
module.exports=route


