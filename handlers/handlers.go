package handlers

import (
	"log"
	"net/http"
	"os"

	"github.com/JeffersonGarcia15/Twitter-Clone/middlew"
	"github.com/JeffersonGarcia15/Twitter-Clone/routers"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

/*
Urls is in charge of setting the PORT, and the handler plus making the server listen
*/

func Urls() {
	router := mux.NewRouter()

	router.HandleFunc("/signup", middlew.CheckDB(routers.SignUp)).Methods("POST")
	router.HandleFunc("/login", middlew.CheckDB(routers.Login)).Methods("POST")
	router.HandleFunc("/profile", middlew.CheckDB(middlew.ValidJWT(routers.Profile))).Methods("GET")
	router.HandleFunc("/editprofile", middlew.CheckDB(middlew.ValidJWT(routers.EditProfile))).Methods("PUT")
	router.HandleFunc("/tweet", middlew.CheckDB(middlew.ValidJWT(routers.StoreTweet))).Methods("POST")
	router.HandleFunc("/gettweet", middlew.CheckDB(middlew.ValidJWT(routers.GetTweets))).Methods("GET")
	router.HandleFunc("/deletetweet", middlew.CheckDB(middlew.ValidJWT(routers.DeleteTweet))).Methods("DELETE")

	router.HandleFunc("/uploadAvatar", middlew.CheckDB(middlew.ValidJWT(routers.AvatarUpload))).Methods("POST")
	router.HandleFunc("/getAvatar", middlew.CheckDB(routers.GetAvatar)).Methods("GET")
	router.HandleFunc("/uploadBanner", middlew.CheckDB(middlew.ValidJWT(routers.BannerUpload))).Methods("POST")
	router.HandleFunc("/getBanner", middlew.CheckDB(routers.GetBanner)).Methods("GET")

	router.HandleFunc("/follow", middlew.CheckDB(middlew.ValidJWT(routers.JoinRelation))).Methods("POST")
	router.HandleFunc("/unfollow", middlew.CheckDB(middlew.ValidJWT(routers.DeleteFollow))).Methods("DELETE")
	router.HandleFunc("/checkrelation", middlew.CheckDB(middlew.ValidJWT(routers.CheckIfRelationExists))).Methods("GET")

	router.HandleFunc("/userList", middlew.CheckDB(middlew.ValidJWT(routers.UserList))).Methods("GET")



	







	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}
	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))

}
