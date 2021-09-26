package db

import (
	"context"
	"time"

	"github.com/JeffersonGarcia15/Twitter-Clone/models"
	"go.mongodb.org/mongo-driver/bson"
)

func CheckIfUserExists(email string) (models.User, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col
}