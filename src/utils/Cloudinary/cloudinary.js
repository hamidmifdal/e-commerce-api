import Cloudinary from 'cloudinary'

export const Cloud2 = Cloudinary.v2
Cloud2.config({
    cloud_name  : process.env.CLOUDINARY_NAME,
    api_key     : process.env.CLOUDINARY_API_KEY,
    api_secret  : process.env.CLOUDINARY_API_SECRET

})
const Cloud = Cloudinary.v2
Cloud.config({
    cloud_name  : process.env.CLOUDINARY_NAME,
    api_key     : process.env.CLOUDINARY_API_KEY,
    api_secret  : process.env.CLOUDINARY_API_SECRET

})
export const UpladeProfileUser = async (photo,source) =>{
    try {
        const uplade = await Cloud.uploader.upload(
            photo,{
                resource_type: 'auto',
                folder : source //'e-comme/users'
            });
        return uplade;
    } catch (error) {
        return console.log(`error: ${error.message}`)
    }
}
export const RemoveProfileUser = async (photo) =>{
    try {
        const remove = await Cloud.uploader.destroy(photo)
        return remove
    } catch (error) {
        return console.log(`error: ${error.message}`)
    }
}