package routers

import (
	"io"
	"net/http"
	"os"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"
)

/*
GetAvatar sends the avatar to the HTTP
*/

func GetAvatar(w http.ResponseWriter, r *http.Request){
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "You must send the id parameter", http.StatusBadRequest)
		return
	}
	profile, err := db.SearchProfile(ID)
	if err != nil {
		http.Error(w, "User not found", http.StatusBadRequest)
		return
	}

	OpenFile, err := os.Open("uploads/avatars/"+profile.Avatar)
	if err != nil {
		http.Error(w, "Image not found", http.StatusBadRequest)
		return
	}

	_, err = io.Copy(w, OpenFile) // send the file in binary form to the ResponseWritter
	if err != nil {
		http.Error(w, "Am error ocurred when copying the image", http.StatusBadRequest)
		return
	}
}