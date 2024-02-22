package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/go-redis/redis"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

var client *redis.Client

type Score struct {
	Username string `json:"username"`
	Score    int    `json:"score"`
}

func main() {
	client = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // replace with Redis server address
		Password: "",               // replace with Redis server password if any
		DB:       0,                // default DB
	})
	pong, err := client.Ping().Result()
	fmt.Println(pong, err)
	router := mux.NewRouter()
	router.HandleFunc("/score", SetScore).Methods("POST")
	router.HandleFunc("/leaderboard", GetLeaderboard).Methods("GET")

	handler := cors.Default().Handler(router)

	log.Fatal(http.ListenAndServe(":8000", handler))
}


// handler function to set the score for the respective user
func SetScore(w http.ResponseWriter, r *http.Request) {
	var newScore Score

	err := json.NewDecoder(r.Body).Decode(&newScore)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// incoming score is not 1, returning early
	scoreDData, err := client.Get(newScore.Username).Bytes()

	if newScore.Score != 1 && err != redis.Nil {
		fmt.Fprintf(w, "Score not incremented for user %s: %s", newScore.Username, scoreDData)
		return
	}

	// Get the current score of the user
	scoreData, err := client.Get(newScore.Username).Bytes()
	if err == redis.Nil {
		//user does not exist, adding a new user with the incoming score
		scoreData, err = json.Marshal(newScore)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		err = client.Set(newScore.Username, scoreData, 0).Err()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Fprintf(w, "New user %s added", newScore.Username)
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var currentScore Score
	err = json.Unmarshal(scoreData, &currentScore)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Incrementing the score
	currentScore.Score++

	// updating new score back to Redis db for the user
	scoreData, err = json.Marshal(currentScore)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = client.Set(newScore.Username, scoreData, 0).Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "Score incremented for user %s", newScore.Username)
}

// handler function to get the leaderboard data
func GetLeaderboard(w http.ResponseWriter, r *http.Request) {
	keys, err := client.Keys("*").Result()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var leaderboard []Score
	for _, key := range keys {
		scoreData, err := client.Get(key).Bytes()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		var score Score
		err = json.Unmarshal(scoreData, &score)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		leaderboard = append(leaderboard, score)
	}

	json.NewEncoder(w).Encode(leaderboard)
}
