import Joi from 'joi';


export const schema = Joi.object({
    userName: Joi.string().alphanum().min(3).max(25).trim(true).required(),
    userEmail: Joi.string().email().trim(true).required(),
    password: Joi.string().min(8).trim(true).required(),
    companyName: Joi.string().alphanum().min(3).max(25).trim(true).required(),
}).options({
            abortEarly: false,
});
                
    
