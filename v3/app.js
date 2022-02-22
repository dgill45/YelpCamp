var   express      = require("express"),
      app          = express(),
      bodyParser   = require("body-parser"),
	  mongoose     = require('mongoose'),
	  Campground   = require("./models/campground"),
	  seedDB	   = require("./seeds"); 


mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
	res.render("landing");
})

// INDEX route - show all campgrounds
app.get("/campgrounds", function(req, res){
	//Get all campgrounds from the DB
	Campground.find({}, function(err, allCampgrounds){
		if (err){
			console.log(err)
		}else{
			res.render("index", {campgrounds:allCampgrounds});
			}
		});
});

//CREATE route - Adds new campground to the DB
app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc}
	//Create new campground and save to DB
	Campground.create(newCampground, function(err, newlyCreated){
		if (err){
			console.log(err)
		}else{
		//	redirect back to the campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

//NEW route - display form to create new campground
app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs")
})

//SHOW route - Shows information about one campground
app.get("/campgrounds/:id", function(req, res){
	//Find campground with provided provided id. 
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			console.log(foundCampground);
	//render show template with that campground.
			res.render("show", {campground: foundCampground})
		}
	});	
	
})

app.listen(3000, function(){
	console.log("The YelpCamp Server has started!")
	});