const express =require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dbConnect = require("./config/dbConnect");
const User = require("./models/userSchema");
const userRoute=require("./routes/userRoutes")
const blogRoute=require("./routes/blogRoutes")


const app=express();
app.use(express.json())
app.use(cors())

app.use("/api/v1",userRoute)
app.use("/api/v1",blogRoute)
// password xO4v9czVjnHC6AiX
//mongodb+srv://shawg0050:xO4v9czVjnHC6AiX@cluster0.a5i4d.mongodb.net/blogDatabase

app.listen(4000,()=>{
    console.log("server started");
    dbConnect()
})