import Joi from 'joi';

const registerUser = {
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    email: Joi.string().required(),
    age: Joi.number().required(),
    name: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.string(),
    plainPass: Joi.string().required(),
  }),
};

const postData = {
  params: Joi.object(),
  query: Joi.object(),
  body: Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    address: Joi.string().required(),
  }),
};

export { registerUser, postData };