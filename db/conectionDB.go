package db

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

)

/*
MongCN is the object of connection to the mongodb server
*/

// func GoDotEnvVariable(key string) string {
// 	err := godotenv.Load(".env")

// 	if err != nil {
// 		log.Fatalf("Error loaging your .env file")
// 	}
// 	return os.Getenv(key)
// }

// var dotenv = GoDotEnvVariable("MONGO_PASSWORD")
var MongoCN = ConnectDB()
var clientOptions = options.Client().ApplyURI("mongodb+srv://Jefferson:Walterjurado8!@jefferson.x0uqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

/*
ConnectDB is the function that allows me to connect to the database.
*/
func ConnectDB() *mongo.Client {
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err.Error())
		return client
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err.Error())
		return client
	}
	log.Println("Connected to mongo")
	return client
}

/*
CheckingConnection is a pin to the database.
*/

func CheckingConnection() int {
	err := MongoCN.Ping(context.TODO(), nil)
	if err != nil {
		return 0
	}
	return 1
}
