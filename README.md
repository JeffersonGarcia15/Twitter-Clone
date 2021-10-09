# Welcome to a Twitter clone built in Go!

## Live link: [Twitter-Clone](https://twitter-jefferson.netlify.app)

[Twitter-Clone](https://twitter-jefferson.netlify.app), inspired by [twitter](https://twitter.com/?lang=en), is a web application that allows users to post tweets and follow users as well as filter user's based on new users or users that you currently follow, you also have freedom to edit your profile as well as your avatar and banner pictures while getting a preview of how they will look like before you click submit!

## Table of content

1. [Getting Started](https://github.com/JeffersonGarcia15/Twitter-Clone#getting-started)
2. [Technologies Used](https://github.com/JeffersonGarcia15/Astrogram#technologies-used)
3. [Key Features](https://github.com/JeffersonGarcia15/Twitter-Clone#key-features)
4. [Code Snippets](https://github.com/JeffersonGarcia15/Twitter-Clone#code-snippets)
5. [Wiki](https://github.com/JeffersonGarcia15/Twitter-Clone#wikii)
6. [Future Goals](https://github.com/JeffersonGarcia15/Twitter-Clone#future-goals)

#

## Getting Started

1. Clone this repository
2. Install dependencies (`go get`) on the backend
3. Install dependencies on the frontend (`npm install`)
4. Enter the following commands:

```
go get
npm install
```
To run servers:

```
go run main.go
npm start
```

#

## Technologies Used

**Front End**

- JavaScript
- HTML
- CSS
- Sass
- [Favicon.io](https://favicon.io)
- Bootstrap
- React
- Redux
- Heroku
- Netlify
- React-Toastify
- Moment
- React-Datepicker
- React-Dropzone

**Back End**

- Go
- MongoDB
- MongoDB Compass
- Insomnia
- Postman
- JWT

#


## Key Features

- Users can view, and post Tweets
- Users can create and destroy follows
- Users can edit their profile info
- Users can edit their avatar and banner with an option of simply dragging the images
- Users can make use of a search bar feature
- Users can make use of a filter feature

#

## Code Snippets

- First, let's start with what was definitely the most problematic route to work with. I had no experience with mongoDB, and I was doing the followers feature kind of following the idea of a SQL database where there are relations, so what I did was to match and search where the userid was the ID being sent from the frontend as the logged in user's id, then append, into the slice called conditions, from the table Tweets going through the userrelationid--the other user--, and with a foreignfield of the current user, and append all the tweets from that other user into that slice. Not only that but I had use ```$unwind``` so that all that info had the same structure, sort the tweets by date so that they are displayed from newest to oldest, and skip the tweets on the current page, when clicking on more Tweets so that I don't get repeated tweets, but rather older tweets. As a note, I want to clarify that when I say "skip the tweets on the current page", I am referring to the fact that I won't be loading the same tweets, but rather skip those and grab others from the other page. The limit per page is 20 tweets per page.

```go
func ReadFollowersTweets(ID string, page int) ([]models.ReturnFollowersTweets, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col := db.Collection("joins")

	skip := (page - 1) * 20

	conditions := make([]bson.M, 0)
	conditions = append(conditions, bson.M{"$match": bson.M{"userid": ID}})
	conditions = append(conditions, bson.M{
		"$lookup": bson.M{
			"from":         "tweets",
			"localField":   "userrelationid",
			"foreignField": "userid",
			"as":           "tweets",
		}})
	conditions = append(conditions, bson.M{"$unwind": "$tweets"}) //allows all the info to be repeated with the same structure for all tweets on same page
	conditions = append(conditions, bson.M{"$sort": bson.M{"tweets.date": -1}}) // match with the name of the table for better understanding and same on the struct
	conditions = append(conditions, bson.M{"$skip": skip})
	conditions = append(conditions, bson.M{"$limit": 20})

	cursor, err := col.Aggregate(ctx, conditions)
	if err != nil {
		fmt.Println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",err.Error())

	}
	var result []models.ReturnFollowersTweets

	err = cursor.All(ctx, &result)
	if err != nil {
		fmt.Println(err.Error())
		return result, false
	}
	return result, true

}

```

- Filter and search feature. The way I approached this was by manipulating the URL string and getting those key param words on the backend. I had to convert the page number sent from the frontend to a int so I used ```Atoi``` to go from an alphabetic character to an int. The results that I got came from the function ```ReadUsersInfo``` that was done on the db folder.
```go
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

```

- This was the function in charge of reading a user's info from the backend. It returns a slice that is pointing to the User model in order to obtain a user's info, and it also returns a boolean which on the UserList function is being grabbed by the variable called status. findOptions here is in charge of making sure that we are skipping 20 tweets depending on what page we are at. For example, if we are on the first page then (1 - 1)*2 = 0 meaning that we will NOT skip any tweets. Once the page is 2, then(2-1)*20 means that we will skip the first 20 tweets, and the SetLimit function ensures that the limit of Tweets per page is 20. For the search bar there is a $regex whose purpose is to ignore case in a given string. col.Find is in charge of finding all users, given a context and a query from the database. This is different from Find.One as we want to match all user's with a given string. For example, if the query in search is j, then I want my database to return Jefferson, Jonas and any other user's that might exist in the database whose name includes 'J'. Lastly, the cursor returned by .Find(), is what I used to filter users based on "New" or "Follow", and depending on which filter option the user has clicked, my database will return the username and exclude everything else, specially the password.

```go
func ReadUsersInfo(ID string, page int64, search string, searchType string) ([]*models.User, bool) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	db := MongoCN.Database("twitter")
	col := db.Collection("users")

	var results []*models.User

	findOptions := options.Find()
	findOptions.SetSkip((page - 1) * 20)
	findOptions.SetLimit(20)
	// i is for ignore upper and lowercase
	query := bson.M{
		"name": bson.M{"$regex": `(?i)` + search},
	}

	cur, err := col.Find(ctx, query, findOptions)

	if err != nil {
		// fmt.Println(err.Error())
		return results, false
	}
	var found, include bool

	for cur.Next(ctx) {
		var s models.User
		err := cur.Decode(&s)
		if err != nil {
			//  fmt.Println(err.Error())
			return results, false
		}

		var r models.Relation
		r.UserID = ID
		r.UserRelationID = s.ID.Hex() // isolate ID

		include = false

		found, _ = CheckIfRelationExists(r)
		if searchType == "new" && !found { // if new then we want to list the new users that we have not included already
			include = true
		}
		if searchType == "follow" && found { // if follow that means we want a list of ONLY the users that we already follow
			include = true
		}

		if r.UserRelationID == ID {
			include = false
		}

		if include {
			s.Password = ""
			s.Biography = ""
			s.Location = ""
			s.Website = ""
			s.Banner = ""
			s.Email = ""

			results = append(results, &s) // go to s pointer that is pointing to the User model and bring everything else
		}
	}
	err = cur.Err()
	if err != nil {
		// fmt.Println(err.Error())
		return results, false
	}
	cur.Close(ctx)
	return results, true
}

```

## Future Goals

- Full CRUD for Tweets
- Hashtags
- Tweets with photos
- Saved Tweets
