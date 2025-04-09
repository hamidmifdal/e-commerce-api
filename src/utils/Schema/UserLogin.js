import Joi from"joi"
//login api
export const SchemaUserLogin = Joi.object({
        username: Joi.string().min(3).max(12).required(),
        password: Joi.string().min(8).required()})

//Register api
export const SchemaUserRegister = Joi.object({
        username: Joi.string().min(3).max(12).required(),
        password: Joi.string().min(8).max(20).required(),
        email: Joi.string().email().required()})
//Edite api
export const SchemaUpdateUser = Joi.object({
    username: Joi.string().min(3).max(12).optional(),
    password: Joi.string().min(8).max(20).optional(),
    email: Joi.string().email().optional()
})
// validate login
export const ValidateSchemaUser = (schema) => (req, res, next) =>{
    const {error, value} = schema.validate(req.body);
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

export const ValidateUpdateUser = (schema) => (req,res,next) =>{
    const {error, value} = schema.validate(req.body);
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