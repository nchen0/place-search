import Joi from "@hapi/joi";

const validateInput = input => {
  const newInput = input.body;
  const schema = Joi.object({
    latitude: Joi.required(),
    type: Joi.string(),
    longitude: Joi.required(),
    customerName: Joi.required(),
    language: Joi.string()
  });
  return schema.validate(newInput);
};

const languages = {
  English: "en",
  Spanish: "es",
  French: "fr"
};

export { validateInput, languages };
