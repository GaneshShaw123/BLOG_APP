const jwt=require("jsonwebtoken")
async function generateJWT(payload){
    let token=await jwt.sign(payload,"fghghjgugjhhjhjgjgjgjhghghhjbhbjh")
    return token;
}
async function verifyJWT(token){
    
    try {
        let isValid=await jwt.verify(token,"fghghjgugjhhjhjgjgjgjhghghhjbhbjh")
    return true;
    } catch (error) {
        return false
    }
    
}
async function decodeJWT(token){
    
    let decoded=await jwt.decode(token);
    return decoded;
    
}
module.exports={generateJWT,verifyJWT,decodeJWT}