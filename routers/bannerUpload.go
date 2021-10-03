package routers

import (
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"github.com/JeffersonGarcia15/Twitter-Clone/db"

)

/*
BannerUpload is the function in charge of uploading and setting a banner to a user
*/

func BannerUpload(w http.ResponseWriter, r *http.Request){
	file, handler, err := r.FormFile("banner")
	var extension = strings.Split(handler.Filename, ".")[1]//somepicture.png => png
	var imgUrl string = "uploads/banners/" + IDUser + "." + extension // to avoid duplicates like how aws does it

	f, err := os.OpenFile(imgUrl, os.O_WRONLY|os.O_CREATE, 0666) //Write, read and create permissions

	if err != nil {
		http.Error(w, "An error occurred while uploading the image ! "+err.Error(),http.StatusBadRequest)
		return
	}

	_, err = io.Copy(f, file)//copy and rename the file in line 16 and puts it in f in line 20
	if err != nil {
		http.Error(w, "An error occurred while copying the image ! "+err.Error(),http.StatusBadRequest)
		return
	}

	var user models.User
	var status bool

	user.Banner = IDUser + "." + extension
	status, err = db.EditRegister(user, IDUser)

	if err != nil || !status {
		http.Error(w, "An error occurred while saving the banner on the database ! "+err.Error(),http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)


}