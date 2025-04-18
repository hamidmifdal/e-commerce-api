import Joi from "joi";
//new product
export const newProducts = Joi.object({
    title   : Joi.string().min(3).max(12).required(),
    desc    : Joi.string().min(10).max(40).required(),
    prix    : Joi.number().required(),
    category: Joi.string().min(3).max(15).required(),
    // color   : Joi.string().optional()
    color   : Joi.array().items(Joi.string()).optional(),
})
//new product
export const editeProducts = Joi.object({
    title   : Joi.string().min(3).max(12).optional(),
    desc    : Joi.string().min(10).max(40).optional(),
    prix    : Joi.number().optional(),
    category: Joi.string().min(3).max(15).optional(),
    color   : Joi.array().items(Joi.string()).optional()
})
export const ValidateProducts = (schema) => (req,res,next) =>{
    const {error, value} = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: false
    });
    if (error) {
        const errors = {};
        error.details.forEach(err => {
            const field = err.path[0]; // usually the field name
            const message = err.message.replace(/"/g, '');
            errors[field] = message;
        });
    
        return res.status(400).json(errors);    
    }    
    req.validateBody = value;
    next();
}