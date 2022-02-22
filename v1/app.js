var express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
    

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds =[
		{name: "Salmon Creek", image: "https://www.sunset.com/wp-content/uploads/4_3_horizontal_inbody_900x506/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg"},
		{name: "Granite Hill", image: "https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/558454/pexels-photo-558454.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Salmon Creek", image: "https://www.sunset.com/wp-content/uploads/4_3_horizontal_inbody_900x506/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg"},
		{name: "Granite Hill", image: "https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/558454/pexels-photo-558454.jpeg?auto=compress&cs=tinysrgb&h=350"},	
		{name: "Salmon Creek", image: "https://www.sunset.com/wp-content/uploads/4_3_horizontal_inbody_900x506/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg"},
		{name: "Granite Hill", image: "https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/558454/pexels-photo-558454.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Salmon Creek", image: "https://www.sunset.com/wp-content/uploads/4_3_horizontal_inbody_900x506/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg"},
		{name: "Granite Hill", image: "https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?auto=compress&cs=tinysrgb&h=350"},
		{name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/558454/pexels-photo-558454.jpeg?auto=compress&cs=tinysrgb&h=350"}
	]	



app.get("/", function(req, res){
	res.render("landing");
})

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds:campgrounds});
})

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs")
})

app.post("/campgrounds", function(req, res){
	// get data from form and add to campgrounds array
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	//redirect back to the campgrounds page
	res.redirect("/campgrounds");
})

app.listen(3000, function(){
	console.log("The YelpCamp Server has started!");
})