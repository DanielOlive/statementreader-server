# Statement Reader Server

This project was created to help support the monitoring of personal account transactions. Features include importing csv data, filtering transactions and marking items as paid/complete. At present data can be imported from two providers American Express and Halifax bank, more to follow. A basic user authentication has been added for security purposes using JWT. This tool has been useful to me an ensures I deduct the correct amounts from other accounts.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 


### Prerequisites

Please ensure you have MongoDB installed prior to running this server

```
Give examples
```

### Installing

Install the dependency's 

```
yarn install
```

Start Mongo server
```
mongod
```

Start the API server

```
yarn start
```

The node server acts as a API service for the front-end Statement Reader project found [here] (https://github.com/DanielOlive/statementreader)

## Built With

* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://maven.apache.org/)
* [Mongoose](https://maven.apache.org/)
* [JWT](https://rometools.github.io/rome/) - encryption
* [Babel](https://babeljs.io/)
* [Eslint](https://maven.apache.org/)
* [Prettier](https://maven.apache.org/)
* [csv-parse](https://maven.apache.org/)


## Authors

* **Daniel De Oliveira** - *Initial work* - [DanielOlive](https://github.com/DanielOlive)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
