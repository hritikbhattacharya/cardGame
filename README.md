
# Card Game

A brief description of what this project does and who it's for




# Backend 

It uses a Redis database to store scores for different users and provides two HTTP endpoints: one for setting a user's score and another for retrieving the leaderboard.

## Installation

First, make sure you have Go and Redis installed on your machine. If not, you can download Go from [here](https://golang.org/dl/) and Redis from [here](https://redis.io/download).

To install the project, navigate to the project directory and run:

```bash
go mod download
```
This will download all the necessary dependencies.

## Usage
#### NOTE :  Before runnign the Go server make sure Redis server is reunning.

To start the server, run:
```bash
go run main.go
```

The server will start on localhost:8000








## API Reference

### Set Score

**Endpoint:** `/score`

**Method:** `POST`

**Request Body:**

```json
{
  "username": "<username>",
  "score": <score>
}
```
This endpoint sets the score for a user. If the user doesn't exist, it adds a new user with the incoming score. If the user does exist, it increments the user's score.

### Get LeaderBoard

**Endpoint:** `/leaderboard`

**Method:** `GET`

This endpoint retrieves the leaderboard data. It gets all the keys from the Redis database, retrieves the score data for each key (user), and returns it in the response.





## Frontend

## Installation

#### First, make sure you have [Node.js](https://nodejs.org/) and npm installed on your machine. If not, you can download them from [here](https://nodejs.org/).

To install the project, navigate to the `card_game_frontend` directory and run:

```bash
npm install
```

This will download all the necessary dependencies.

## Usage

To start the application, run:
```bash
npm start
```
The application will start on localhost:3000 (or another port, if you've configured it differently).






    