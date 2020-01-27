const express = require("express");
const axios = require("axios");
const server = express();
require("dotenv").config();
const PORT = process.env.PORT;
server.use(express.json());
const { validateInput, languages } = require("./helpers/helper-functions");

server.get("/places", (req, res) => {
  let { latitude, longitude, customerName } = req.body;

  // Validating required parameters are there
  const validatedSearch = validateInput(req);
  if (validatedSearch.error) {
    return res.status(400).send(validatedSearch.error.details[0].message);
  }

  // Optional parameters
  const language = languages[req.body] || "en";
  const type = req.body.type || "all";
  const outputType = req.body.outputType || "json";
  const number = req.body.number || 20;

  // If the customer name has more than one word, Google API needs it to include +'s between them.
  if (customerName.indexOf(" ") >= 0) {
    customerName = customerName.replace(/\s/g, "+");
  }
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/${outputType}?query=${customerName}&pagetoken=1&location=${latitude},${longitude}&type=${type}&language=${language}&radius=10000&language=spanish&key=${process.env.API_KEY}`
    )
    .then(response => {
      if (number < 20) {
        return res.send(response.data.splice(0, number));
      }
      res.send(response.data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

let httpServer = server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = httpServer;
