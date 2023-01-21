import joi from "joi";

export const singUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  name: joi.string().min(3).required(),
});

export const singInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(1).required(),
});
