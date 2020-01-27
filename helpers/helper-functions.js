const Joi = require("@hapi/joi");

const validateInput = input => {
  const newInput = input.body;
  const schema = Joi.object({
    latitude: Joi.required(),
    type: Joi.string(),
    longitude: Joi.required(),
    customerName: Joi.required(),
    language: Joi.string(),
    number: Joi.number(),
    outputType: Joi.string()
  });
  return schema.validate(newInput);
};

const languages = {
  English: "en",
  Spanish: "es",
  French: "fr"
};

module.exports = { validateInput, languages };
