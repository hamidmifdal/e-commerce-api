import User from '../models/user.model.js'
import { isValidObjectId } from 'mongoose'
import * as cloudinary from '../utils/Cloudinary/cloudinary.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const JWT_SUCRET = process.env.JWT_SUCRET
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../../public/images/'));
    },
    filename: function(req, file, cb) {
        const result = new Date().toISOString().replace(/:/g,"_")
        cb(null, result + file.originalname);
    }
});
export const uploade = multer({ storage })

export const Login = async (req, res) =>{
    try {
        const { username, password } = req.validateBody
        const user = await User.findOne({username})
        if(!user){
            return res.status(400).json({message:"faild login"})
        }
        const match = await bcrypt.compare(password,user.password)
        if(!match){
            return res.status(400).json({message:"faild login"})
        }
        const token = jwt.sign(
            {username : user.username, userId : user.id},
            JWT_SUCRET,
            {expiresIn : '10m'}
        )
        res.cookie('token',token, {
            httpOnly: true,
            signed : true
        })
        return res.status(201).json({message:'login is ok'})
    } catch (error) {
        res.status(500).json({error:`${error.message}`})
    }
}
export const Register = async (req, res) =>{
    try {
        const { username, email, password } = req.validateBody
        const validate = await User.findOne({username})
        if(validate){
            return res.status(400).json({message:"username or email  areldey"})
        }
        const hashpassword = await bcrypt.hash(password,12)
        const item = new User({username,email,password: hashpassword})
        await item.save()
        return res.status(201).json({message:'ok'})
    } catch (error) {
        res.status(500).json({message:`${error.message}`,})
    }
}
export const UploadPhoto = async (req,res) => {
    try {
        const _id = req.user.userId
        if(!isValidObjectId(_id)){
            return res.status(400).json({message: "id is not founds"})
        }
        const user = await User.findById(_id)
        if(!user){
            return res.status(401).json({error: "user not found"})
        }
        if(!req.file){
            return res.status(401).json({photo: "photo is not required"})
        }
        const local_file = path.join(__dirname,`../../public/images/${req.file.filename}`)
        const Uplaod     = await cloudinary.UpladeProfileUser(local_file,'e-comme/users')
        if(user.profile?.PublicId){
            await cloudinary.RemoveProfileUser(user.profile.PublicId)
        }
        user.profile = {
            url : Uplaod.secure_url,
            PublicId : Uplaod.public_id
        }
        await user.save()
        fs.unlinkSync(local_file)
        return res.status(201).json({message:"Upload is ok!"})
    } catch (error) {
        return res.status(400).json({message: `No Uploaded: ${error}`})
    }
}
export const Profile = (req,res) => {
    try {
        const user = req.user.username
        const id = req.user.userId
        return res.status(200).send(`<h1>username: ${user}</h1>\n<p>id: ${id}</p>`)
    } catch (error) {
        return res.status(401).json({message: `Please login: ${error}`})
    }
}

export const UpdateUser = async (req, res) => {
    try {
        const { userId } = req.user;
        
        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: "Error: Invalid user ID" });
        }
        
        const { username, password, email } = req.validateBody;
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const updateData = {
            username,
            email,
            password: hashedPassword
        };
        
        const user = await User.findByIdAndUpdate(
            userId, 
            updateData, 
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ 
            message: "Update successful",
        });
        
    } catch (error) {
        return res.status(422).json({ message: `Error: ${error.message}` }); // Changed to error.message for better error info
    }
};