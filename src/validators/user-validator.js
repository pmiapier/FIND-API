const Joi = require(`joi`);

const updateUserSchema = Joi.object({
  firstName: Joi.string().allow('', null).trim(),
  lastName: Joi.string().allow('', null).trim(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .trim(),
  email: Joi.string().email().trim()
  // password: Joi.string()
  //   .pattern(/^[a-zA-Z0-9]{6,30}$/)
  //   .trim().required()
});

// const updateUserSchema = Joi.object({
//   firstName: Joi.string().allow('', null).trim(),
//   lastName: Joi.string().allow('', null).trim(),
//   phoneNumber: Joi.string()
//     .pattern(/^[0-9]{10}$/)
//     .trim(),
//   email: Joi.string().email().trim()
//   password:Joi.string().pattern(/^[a-zA-Z0-9]{6,30}$/).trim().required()
// });

module.exports = { updateUserSchema };
