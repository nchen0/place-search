# Steps:

- To start server: `npm start`, open up an API tool like Postman, and open up a GET on `localhost:8000/places`. Add request bodies to return non-zero results.
- To test: `npm test`.
- To run lint: `npm run lint`.

# Endpoints

## GET /places

- Parameters are taken through the request body, example shown below.
- Parameters taken: latitude, longitude, customerName, type, numberOfLocations, outputType, language
- Required parameters: latitude, longitude, and customerName
- Optional parameters: type (default "all"), numberOfLocations (default 20), outputType (default "json"), language (default "en")
- All requests require an API Key: API Keys can be acquired here: https://developers.google.com/places/web-service/get-api-key?authuser=1
- Note: Maximum number of results from Google API is 20 per page.
