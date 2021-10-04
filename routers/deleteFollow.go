package routers

import (
	"net/http"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"

)

/*
DeleteFollow deletes the relation between users
*/

func DeleteFollow(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	var t models.Relation
	t.UserID = IDUser
	t.UserRelationID = ID

	status, err := db.DeleteRelation(t)
	if err != nil {
	http.Error(w, "An error occurred while trying to delete the relation "+err.Error(), http.StatusBadRequest)
	return
	}
	if !status {
		http.Error(w, "It was not possible to delete the relation "+err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusCreated)
}


