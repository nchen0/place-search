import { validateInput, languages } from "./helpers/helper-functions";
import express from "express";
import axios from "axios";
const server = express();
require("dotenv").config();
const PORT = process.env.PORT;
server.use(express.json());

server.get("/places", (req, res) => {
  let { latitude, longitude, customerName } = req.body;

  // Validating required parameters are there
  const validatedSearch = validateInput(req);
  if (validatedSearch.error) {
    return res.status(400).send(validatedSearch.error.details[0].message);
  }

  // Optional parameters
  const language = languages[req.body.language ? req.body.language.toLowerCase() : null] || "en";
  const type = req.body.type || "all";
  const outputType = req.body.outputType || "json";
  const number = req.body.number || 20;

  // If the customer name has more than one word, Google API needs it to include +'s between them.
  if (customerName.indexOf(" ") >= 0) {
    customerName = customerName.replace(/\s/g, "+");
  }

  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/${outputType}?query=${customerName}&location=${latitude},${longitude}&type=${type}&language=${language}&radius=10000&key=${process.env.API_KEY}`
    )
    .then(response => {
      if (number < 20) {
        response.data.results = response.data.results.splice(0, number);
        return res.send(response.data);
      }
      return res.send(response.data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

let httpServer = server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default httpServer;
