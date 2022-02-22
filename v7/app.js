var   express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
	  passport 	    = require("passport"),
	  LocalStrategy = require("passport-local"),
	  mongoose      = require('mongoose'),
	  Campground    = require("./models/campground"),
	  Comment	    = require("./models/comment"),
	  User 	  	    = require("./models/user"),
	  seedDB	    = require("./seeds"); 

var commentRoutes     = require("./routes/comments"),
	campgroundsRoutes = require("./routes/campgrounds"),
	indexRoutes       = require("./routes/index");

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs");
seedDB();

//-----------------------
//PASSPORT CONFIGURATION
//-----------------------

app.use(require("express-session")({
	secret:"Once again",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
})

//requiring routes
app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundsRoutes);

app.listen(3000, function(){
	console.log("The YelpCamp Server has started!")
	});