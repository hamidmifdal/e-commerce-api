import { isValidObjectId } from "mongoose"
import Products from "../models/product.model.js"


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
        
        const item = new Products({title, desc, prix, color, author: userId, category})
        await item.save()
        return res.status(201).json({message:"new Product is ok"})
    } catch (error) {
        return res.status(422).json({message:`error: ${error}`})
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