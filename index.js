const express = require("express");
const axios = require("axios");
const server = express();
require("dotenv").config();
const PORT = process.env.PORT;
server.use(express.json());
const { validateInput, languages } = require("./helpers/helper-functions");

server.get("/places", (req, res) => {
  const { latitude, longitude, customerName } = req.body;
  const validatedSearch = validateInput(req);
  if (validatedSearch.error) {
    return res.status(400).send(validatedSearch.error.details[0].message);
  }
  const language = languages[req.body] || "en";
  const type = req.body.type || "all";
  const outputType = req.body.outputType || "json";
  // console.log(
  //   "url: ",
  //   `https://maps.googleapis.com/maps/api/place/textsearch/${output}?query=${customerName}&location=${latitude},${longitude}&type=${type}&language=${language}&radius=10000&language=spanish&key=${process.env.API_KEY}`
  // );
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/${outputType}?query=${customerName}&location=${latitude},${longitude}&type=${type}&language=${language}&radius=10000&language=spanish&key=${process.env.API_KEY}`
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

let httpServer = server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = httpServer;
