package models

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

/*
The user model
*/

type User struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"id" `
	Name string `bson:"name" json:"name,omitempty" `
	Last string `bson:"last" json:"last,omitempty" `
	Bod time.Time `bson:"bod" json:"bod,omitempty" `
	Email string `bson:"email" json:"email" `
	Password string `bson:"password" json:"password,omitempty" `
	Avatar string `bson:"avatar" json:"avatar,omitempty" `
	Banner string `bson:"banner" json:"banner,omitempty" `
	Location string `bson:"location" json:"location,omitempty" `
	Website string `bson:"website" json:"website,omitempty" `
}