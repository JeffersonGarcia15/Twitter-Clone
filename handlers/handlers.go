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


	

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}
	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))

}
