import Joi from "@hapi/joi";

const validateInput = input => {
  const newInput = req.body;
  const schema = Joi.object({
    latitude: Joi.required()
    // longitude: Joi.re
  });
};

export default validateInput;
