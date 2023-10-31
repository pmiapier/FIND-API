const Joi = require(`joi`);

const registerSchema = Joi.object({
    firstname: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    phoneNumber:Joi.string().pattern(/^[0-9]{10}$/).trim().required(),
    email:Joi.string().email().trim().required(),
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{6,30}$/)
        .trim()
        .required(),
    confirmPassword: Joi.string()
        .valid(Joi.ref("password"))
        .trim()
        .required()
        .strip(),
});



const loginSchema = Joi.object({
    email:Joi.string().email().trim().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).required(),
});



module.exports = { registerSchema, loginSchema };
