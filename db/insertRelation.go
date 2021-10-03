package db

import (
	"context"
	"time"
	"github.com/JeffersonGarcia15/Twitter-Clone/models"
)

/*
InsertRelation saves the relation on the database.
*/

func InsertRelation(t models.Relation) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col := db.Collection("joins")

	_, err := col.InsertOne(ctx, t)
	if err != nil {
		return false, err
	}
	return true, nil
}

