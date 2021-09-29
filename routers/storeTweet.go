package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"

)

/*
StoreTweet allows us to store a tweet in the database.
*/

func StoreTweet(w http.ResponseWriter, r *http.Request) {
	var body models.Tweet

	err := json.NewDecoder(r.Body).Decode(&body)

	register := models.RecordTweet{
		UserID: IDUser,
		Body: body.Body,
		Date: time.Now(),
	}

	_, status, err := db.InsertTweet(register)
	if err != nil {
		http.Error(w, "An error occurred when trying to insert a tweet, please try again."+err.Error(), 400)
		return
	}

	if !status{
		http.Error(w, "It was not possible to insert a tweet.", 400)
		return
	}

	w.WriteHeader(http.StatusCreated)
}