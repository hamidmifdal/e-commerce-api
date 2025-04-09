import jwt from "jsonwebtoken";

export default function Auth(req,res,next){
    const JWT_SUCRET = process.env.JWT_SUCRET
    const token = req.cookies.token || req.signedCookies.token
    if(!token){
        return res.status(422).json({message:"token is not required"})
    }
    try {
        const decoded = jwt.verify(token,JWT_SUCRET)
        req.user = decoded
        next()
    } catch (error) {
        res.clearCookie('token')
        return res.status(401).json({message:"Invalid or expired token"})
    }
}