package routers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
)

/*
UserList reads the user list
*/
func UserList(w http.ResponseWriter, r *http.Request) {
	typeUser := r.URL.Query().Get("searchType")
	page := r.URL.Query().Get("page")
	search := r.URL.Query().Get("search")

	pagTemp, err := strconv.Atoi(page)//alphabetical -> int
	if err != nil {
		http.Error(w, "You must send the page parameter as an int greater than 0 "+err.Error(),http.StatusBadRequest)
		return
	}

	pag := int64(pagTemp)

	result, status := db.ReadUsersInfo(IDUser, pag, search, typeUser)

	if !status{
		http.Error(w, "An error ocurred when reading all the users ",http.StatusBadRequest)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(result)
}
