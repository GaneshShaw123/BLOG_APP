const express =require("express")
const {createUser,getAllUsers,getUserById,updateUser,deleteUser,login} = require("../controllers/userControllers")
const route=express.Router()

route.post("/users",createUser)

route.post("/login",login)

route.get("/users",getAllUsers)

route.get("/users/:id",getUserById)

route.patch("/users/:id",updateUser)

route.delete("/users/:id",deleteUser)

module.exports=route



