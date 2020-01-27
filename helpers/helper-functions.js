import Joi from "@hapi/joi";

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
  english: "en",
  spanish: "es",
  french: "fr"
};

export { validateInput, languages };
