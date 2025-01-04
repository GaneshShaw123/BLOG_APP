const verifyUser=async(req,res,next)=>{
    console.log("Veify User Middleware")
    next();
}
module.exports=verifyUser