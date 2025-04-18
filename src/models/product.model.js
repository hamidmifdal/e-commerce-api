import { url } from 'inspector';
import { model, Schema } from 'mongoose'

const PostSchema = new Schema({
    title:{
        type: String,
    },
    desc:{
        type:String,
    },
    prix:{
        type: Number,
    },
    category:{
        type: String,
    },
    color:[{
        type: String,
        custom: ["white","black","green"]
    }],
    author:{
        type: Schema.Types.ObjectId,
        role: 'User',
        required : true

    },
    image : {
        type : Object,
        PublicId : null,
        url         : '/image/iconDefault.png'
    }
},{timeseries:true})

const Post = model("Post",PostSchema)
export default Post;