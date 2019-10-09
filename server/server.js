const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users.js");

const app = express();

// body parser middleware
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);

app.use(bodyParser.json());

// db config
const db = require("./config/keys.js").mongoURI;

// establish connection to db
mongoose.connect(db, {useNewUrlParser: true})
	.then(() => console.log("Successfully established connection to MongoDB."))
	.catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("../client/public", express.static('public'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server now running on port ${port} !`));
