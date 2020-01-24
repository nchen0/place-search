import express from "express";
import axios from "axios";
const server = express();
require("dotenv").config();
const PORT = process.env.PORT;
server.use(express.json());

server.get("/places", (req, res) => {
  const { latitude, longitude, name, type, number, output, language } = req.body;
  if (!type) {
    type = "all";
  }
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${name}&location=${latitude},${longitude}&type=${type}&radius=10000&key=${process.env.API_KEY}`
    )
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
