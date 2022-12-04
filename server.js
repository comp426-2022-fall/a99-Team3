// Require express
const express = require("express")
const app = express()
// Link to database.js
var database = require("./database.js");

// Require md5 MODULE
var md5 = require("md5");

// Require CORS module
var cors = require("cors");

// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make Express use CORS
app.use(cors());

// Set server port
var HTTP_PORT = 8888;

// Let the server listen to the port, if error exists, print the error
app.listen(HTTP_PORT, () => {
    if(error){
        console.log("Woops! Something went wrong!", error)
    }else{
        console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
    }
});

// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
    res.json({"message":"Your API works! (200)"});
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3

// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new/user", (req, res, next) => {
	var data = {
		user: req.body.user,
		email: req.body.email,
		pass: req.body.pass ? md5(req.body.pass) : null,
		name: req.body.name, 
		fortune_score: req.body.fortune_score
	}
	const stmt = db.prepare('INSERT INTO userinfo (user, pass, email, name, fortune_score) VALUES (?, ?, ?, ?, 0)');
const info = stmt.run(data.user, data.pass, data.email, data.name, data.fortune_score);
	res.status(201).json({"message":info.changes+" record created: ID "+info.lastInsertRowid+" (201)"});
})


// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {	
	const stmt = database.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:id
app.get("/app/user/:id", (req, res) => {	
	const stmt = database.prepare("SELECT * FROM userinfo WHERE id = ?").get(req.params.id);
	res.status(200).json(stmt);
});

// UPDATE a single user (HTTP method PATCH) (the updated user is the current user that is logged in)
app.patch("/app/update/user", (req, res) => {

	const stmt = database.prepare("UPDATE userinfo SET user = COALESCE(?,user), email = COALESCE(?,email), pass = COALESCE(?,pass) WHERE user = ?").run(req.body.changeduser, req.body.email, md5(req.body.pass), req.body.user)
	res.status(200).json({"message":`1 record updated: User ${req.body.user} (200)`});

});

// DELETE a single user (HTTP method DELETE) (the deleted user is the current user that is logged in)
app.delete("/app/delete/user", (req, res) => {
	const stmt = database.prepare("DELETE FROM userinfo WHERE user = ?").run(req.body.user);
	res.status(200).json({"message":"1 record deleted: ID 2 (200)"});
});

// UPDATE a single user's highest score (HTTP method PATCH) if the current score is higher than the highestScore in database (the updataed user is the current user that is logged in)
app.patch("/app/recordscore/user", (req, res) =>  {

	const stmt = database.prepare("UPDATE userinfo SET highest= COALESCE(?,highest) WHERE user = ?").run(req.body.highest, req.body.user)
	res.status(200).json({"message":`1 record updated: User ${req.body.user} (200)`});
});

// READ a single user (HTTP method GET) given the username and password.
app.post("/app/login/user", (req, res) => {	

	const stmt = database.prepare("SELECT * FROM userinfo WHERE user = ? AND pass = ?").get(req.body.user, md5(req.body.pass));
	if (md5(req.body.pass).length == 0) {
		res.status(404);
	} else{
		res.status(200).json(stmt);
	}
	
});



// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Your API is working!"});
    res.status(404);
});
