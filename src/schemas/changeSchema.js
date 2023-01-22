import joi from "joi";

const changeSchema = joi.object({
  value: joi.number().min(1).required(),
  description: joi.string().min(1).required(),
  type: joi.string().valid("in", "out").required(),
});

export default changeSchema;
