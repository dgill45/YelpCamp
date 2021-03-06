var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");


// INDEX route - show all campgrounds
router.get("/", function(req, res){
	//Get all campgrounds from the DB
	Campground.find({}, function(err, allCampgrounds){
		if (err){
			console.log(err)
		}else{
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
			}
		});
});

//CREATE route - Adds new campground to the DB
router.post("/", function(req, res){
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
router.get("/new", function(req, res){
	res.render("campgrounds/new")
})

//SHOW route - Shows information about one campground
router.get("/:id", function(req, res){
	//Find campground with provided provided id. 
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			console.log(foundCampground);
	//render show template with that campground.
			res.render("campgrounds/show", {campground: foundCampground})
		}
	});	
})

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else {
		res.redirect("/login");
	}
}

module.exports = router;