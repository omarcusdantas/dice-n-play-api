# Dice N Play API
An api built with Javascript, Node and PostgreSQL to manage customers, games and rentals of a board games rental store.

## :speech_balloon: Description
This project contains all the files for an API called Dice N Play.

* /customers get, post and put endpoints to handle customers.
* /games get and post endpoints to handle games.
* /rentals get, post and put endpoints to handle rentals.

## ✨ Features
* Users can add and manage customers, games and rentals.
* PostgreSQL for data persistance.
* Dayjs to better handle dates.
* Joi to validate body on post and put endpoints.

## :computer: Usage
* Make the http requests to [https://dice-n-play-api.onrender.com](https://dice-n-play-api.onrender.com) or run the project locally.
* Get information about all routes on Postman: [https://documenter.getpostman.com/view/28914967/2s9YR3canB](https://documenter.getpostman.com/view/28914967/2s9YR3canB).
* To run the project locally, clone or download the repository. Run a PostgreSQL server (use the dump.sql to generate tables).
* Set the .env file using the .env.example as model. Run the following commands on the root of the project and then you will be able to make the http requests to your local server.
```
npm i
npm run dev
```

## :world_map: Routes
All the routes are documented on Postman: [https://documenter.getpostman.com/view/28914967/2s9YR3canB](https://documenter.getpostman.com/view/28914967/2s9YR3canB)

## :rocket: Deployment
The project is deployed on [https://dice-n-play-api.onrender.com](https://dice-n-play-api.onrender.com)

## :bulb: Contributing
This project is currently not open for contributions. However, you are welcome to fork the repository and make modifications for personal use.

## :memo: License
This project is released under the MIT License.

## :books: Credits
This project was created as a practice project by Marcus Dantas.