# Endpoints
## GET /places
- Parameters are taken through the request body, example shown below. 
- Parameters taken: latitude, longitude, customerName, type, numberOfLocations, outputType, language
- Required parameters: latitude, longitude, and customerName
- Optional parameters: type, numberOfLocations, outputType, language

## Steps:
- To run: `npm start`, open up an API tool like Postman, and open up a GET on `localhost:8000/places`. Add request bodies to return non-zero results.
- To test: `npm test`. 
