import { isValidObjectId } from "mongoose"
import Products from "../models/product.model.js"
import {Cloud2} from '../utils/Cloudinary/cloudinary.js'
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import { unlinkSync } from "fs"
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname,"../../public/images/"))
    },
    filename : function(req,file,cb){
        const fackname = new Date().toISOString().replace(/:/g,'_')
        cb(null, fackname + file.originalname)
    }
})
export const localStorage = multer({ storage })

export const CreateProduct = async (req, res) => {
    try {
        const userId = req.user.userId
        const {title, desc, prix, color, category} = req.validateBody
        if(!isValidObjectId(userId)){
            return res.status(400).json({message:"user not login"})
        }
        const validate = await Products.findOne({title})
        if(validate){
            return res.status(400).json({message:"title is areld"})
        }
        const Uplaod = await Cloud2.uploader.upload(path.join(__dirname, "../../public/images", req.file.filename), {
            folder:'ecomm/products'
        })
        const product = await Products.findById(userId)
        if(product?.image?.PublicId){
            await Cloud2.uploader.destroy(product.image.PublicId)
        }
        const item = new Products({title, desc, prix, color, author: userId, category,
            image:{
                PublicId : Uplaod.public_id,
                url: Uplaod.secure_url
            }
        })
        await item.save()
        unlinkSync(path.join(__dirname, "../../public/images", req.file.filename));
        return res.status(201).json({message:"new Product is ok"})
    } catch (error) {
        return res.status(422).json({message:`error: ${error.message}`})
    }
}
export const UpdateProducts = async (req,res) => {
    try {
        const {id} = req.params;
        const content = req.validateBody
        if(!id){
            return res.status(400).json({message:"product is not found"})
        }
        const update = await Products.findByIdAndUpdate(
            id,
            content,
            {
                new: true,
                runValidators: true
            })
        if(!update){
            return res.status(400).json({message:"product is not found"})
        }
        return res.status(200).json({massage:"ok!",update})
    } catch (error) {
        
    }
}
export const removeProduts = async (req,res) =>{
    try {
        const { _id } = req.params
    if(!isValidObjectId(_id)){
        return res.status(400).json({message:"product is not found"})
    }
    const remove = await Products.findByIdAndDelete(_id)
    if(!remove){
        return res.status(400).json({message:"product is not found"})
    }
    return res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        return res.status(500).json({message:`${error}`})
    }
}
export const GetAllProduct = async (req,res) => {
    try {
        const items = await Products.find()
        return res.status(200).json(items)
    } catch (error) {
        return res.status(500).json({message:`${error}`})
    }
}