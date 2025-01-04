const Blog = require("../models/blogSchema");
const User=require("../models/userSchema")
const {verifyJWT }=require("../utils/generateToken")

async function createBlog(req,res) {
    try {
        

        let isValid=await verifyJWT(req.body.token);
        console.log(isValid);
        if(!isValid){           
           return res.status(200).json({
            message:'Invalid token'
           })
        }
        const {title,description,draft,creator}=req.body;
        if(!title){
            return res.status(400).json({
                message:"Please Fill the title"
            })
        }
        if(!description){
            return res.status(400).json({
                message:"Please Fill the Description"
            })
        }

        const findUser=await User.findById(creator)
        
       if(!findUser){
        return res.status(500).json({
            message:"User Does not Exist"
        })
       }

       const blog=await Blog.create({description,title,draft,creator});
       await User.findByIdAndUpdate(creator,{$push:{blogs:blog._id}})
       return res.status(200).json({
        message:"Blog created successfully",
        blog,
       })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
async function getBlogs(req,res) {
    try {
        const blogs=await Blog.find({draft:false}).populate({
            path:"creator",
            select:"-password"
        })
        return res.status(200).json({
            message:"Blog Featched successfully",
            blogs,
           })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}
async function getBlog(req,res) {
    try {
        const {id}=req.params;
        const blogs=await Blog.findById(id)
        return res.status(200).json({
            message:"Blog Featched successfully",
            blogs,
           })
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
}}
async function updateBlog(req,res) {
    
}
async function deleteBlog(req,res) {
    
}
module.exports={
    createBlog,
    deleteBlog,
    getBlogs,
    getBlog,
    updateBlog
}