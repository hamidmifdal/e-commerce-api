import { Schema, model} from "mongoose";


const Userschema = new Schema({
    username:{
        type    : String,
        // required: true
    },
    email:{
        type    : String,
        // required: true
    },
    password:{
        type    : String,
        // required: true
    },
    profile:{
        type    : Object,
        url :'/image/iconDefault.png',
        PublicId: null

    }
},{timestamps: true})

const User = model("User",Userschema);
export default User;