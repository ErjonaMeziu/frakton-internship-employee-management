import Joi from 'joi';


export const RegisterValidator = Joi.object().keys({
    userName: Joi.string().alphanum().min(3).max(25).trim(true).required(),
    userEmail: Joi.string().email().trim(true).required(),
    password: Joi.string().min(8).trim(true).required(),
    companyName: Joi.string().alphanum().min(3).max(25).trim(true).required(),
    file: Joi.required(),
}).options({
            abortEarly: false,
});
        
export const LoginValidator = Joi.object().keys({
        userEmail: Joi.string().email().trim(true).required(),
        password: Joi.string().min(8).trim(true).required(),
    })
    .options({
        abortEarly: false,
    });
        
    
