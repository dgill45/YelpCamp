var   express      = require("express"),
      app          = express(),
      bodyParser   = require("body-parser"),
	  mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

//Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);

	//Campground.create(
	//	{
	//		name: "Granite Hill", 
	//		image: "https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&h=350", 	
	//		description: "This is a huge granite hill. No bathrooms, no water. Beautiful granite."
	//	}
	//	,  function(err, campground){
	//	if (err){
	//		console.log(err)
	//}else{
	//		console.log(campground)
	//		console.log("Newly Created Campground: ")
	//	}
	//	});

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");




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
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
	//render show template with that campground.
			res.render("show", {campground: foundCampground})
		}
	});	
	
})

app.listen(3000, function(){
	console.log("The YelpCamp Server has started!")
	});




