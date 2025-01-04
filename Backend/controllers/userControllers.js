const User=require("../models/userSchema")
const bcrypt=require("bcrypt")
const {generateJWT} = require("../utils/generateToken")

async function createUser(req,res){
        const {name,password,email} =req.body
       try{
           if(!name){
            return res.status(400).json({
                success:false,
                message:"Please fill name"
            })
           }
           if(!password){
            return res.status(400).json({
                success:false,
                message:"Please fill password"
            })
           }
           if(!email){
            return res.status(400).json({
                success:false,
                message:"Please fill email"
            })
           }
           const checkForexistingUser=await User.findOne({email})
    
           if(checkForexistingUser){
            return res.status(400).json({
                success:false,
                message:"User already Exist with this Email"
            })
           }
           const hashedPass=await bcrypt.hash(password,10 )
           const newUser=await User.create({
                name,
                email,
                password:hashedPass,
           })
           let token=await generateJWT({
            email:newUser.email,
            id:newUser._id
           })
           return res.status(200).json({
            success:true,
            message:"User Created Successfully",
            user: {
                name:newUser.name,
                email:newUser.email,
                blogs:newUser.blogs

            },
            token
           });
       }catch(err){
           return res.status(200).json({
            success:false,
            message:"Please try again"
           })
       }
}

async function login(req,res){
    const {password,email} =req.body
   try{
       if(!password){
        return res.status(400).json({
            success:false,
            message:"Please fill password"
        })
       }
       if(!email){
        return res.status(400).json({
            success:false,
            message:"Please fill email"
        })
       }
       const checkForexistingUser=await User.findOne({email})

       if(!checkForexistingUser){
        return res.status(400).json({
            success:false,
            message:"User doest not Exist"
        })
       }
       let checkForPass=await bcrypt.compare(password,checkForexistingUser.password)
      if(!checkForPass){
        return res.status(500).json({
            success:false,
            message:"Incorrect Password",
            checkForPass
           })
      }
      let token=await generateJWT({
        email:checkForexistingUser.email,
        id:checkForexistingUser._id
       })
       return res.status(200).json({
        success:true,
        message:"User Logged in Successfully",
        user: checkForexistingUser,
        token
       });
   }catch(err){
       return res.status(500).json({
        success:false,
        message:"Please try again"
       })
   }
}

async function getAllUsers(req,res){
    const users = await User.find({});
        try{
          return res.status(200).json({
            success:true,
            message:"users fetch succesfully",
            users
            
          }) 
        }catch(err){
            return res.status(200).json({
             success:false,
             message:"Please try again"
            })
        }
    }

function getUserById(req,res){
        try{
            
            const user=users.filter(user=>user.id==req.params.id);
            
             return res.status(200).json({
             success:true,
             message:"users fetch succesfully",
             user,
           });
        }catch(err){
            return res.status(200).json({
             success:false,
             message:"Please try again"
            })
        }
    }
function updateUser(req,res){
        try{
            
        const {id} =req.params
        let index=users.findIndex(user=>user.id==id)
        users[index]={...users[index],...req.body}
            
             return res.status(200).json({
             success:true,
             message:"users Updated succesfully",
           });
         
        }catch(err){
            return res.status(200).json({
             success:false,
             message:"Please try again"
            })
        }
    }
function deleteUser (req,res){
    try{
        
        const {id} =req.params
        let deleteuser=users.findIndex(user=>user.id==id)
        users.splice(deleteuser,1)
      
         return res.status(200).json({
         success:true,
         message:"users deleted succesfully",
       });
     
    }catch(err){
        return res.status(200).json({
         success:false,
         message:"Please try again"
        })
    }
}
module.exports={createUser,getAllUsers,getUserById,updateUser,deleteUser,login}