package handlers

import (
	"log"
	"net/http"
	"os"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/JeffersonGarcia15/Twitter-Clone/middlew"
	"github.com/JeffersonGarcia15/Twitter-Clone/routers"


)

/*
Urls is in charge of setting the PORT, and the handler plus making the server listen
*/

func Urls() {
	router := mux.NewRouter()

	router.HandleFunc("/signup", middlew.CheckDB(routers.SignUp)).Methods("POST")

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}
	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))

}
