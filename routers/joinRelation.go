package routers

import (
	"net/http"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"

)

/*
JoinRelation makes the registration of the relation between two users.
*/

func JoinRelation(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "You must send the id parameter", http.StatusBadRequest)
		return
	}

	var t models.Relation
	t.UserID = IDUser
	t.UserRelationID = ID

	status, err := db.InsertRelation(t)
	if err != nil {
		http.Error(w, "An error occurred while trying to insert the relation "+err.Error(), http.StatusBadRequest)
		return
	}
	if !status {
		http.Error(w, "It was not possible to insert the relation "+err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
}