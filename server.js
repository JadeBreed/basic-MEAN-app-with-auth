// install express & dependancies
var ejs             = require("ejs"), 
    faker           = require("faker"),
    express         = require("express"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    seedDB          = require("./seed.js"),
    bodyParser      = require("body-parser"),
    User            = require("./models/user"),
    LocalStrategy   = require("passport-local");


// mongoose.connect(process.env.DATABASEURL);
mongoose.connect("mongodb://localhost/meantest");

//////////////////////////////////////////////////////////////////
////////////Initialize express
//////////////////////////////////////////////////////////////
var app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.bodyParser());

// seedDB();

//////////////////////////////////////////////////////////////////
////////////Passport configuration
//////////////////////////////////////////////////////////////
app.use(require("express-session")({
    secret: "we live in a computer sim",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

//////////////////////////////////////////////////////////////////
////////////Auth routes
//////////////////////////////////////////////////////////////

// show register form --- handled by angular
// app.get("/register", function(req, res){
//   res.render("register"); 
// });

// registration logic
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err);
            res.redirect("/#/register");
        } else {
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
            console.log("register success");
        });
        }
    });

})

// show login form --- handled by angular 
// app.get("/login", function(req,res){
//     res.render("login");
//     console.log('login route hit');
// });


// login logic
app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/",
        failureRedirect: "/#/login"
    }), function(req, res){
    
})

// logout route
app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
   console.log('you logged out');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

//////////////////////////////////////////////////////////////////
////////////Other routes
//////////////////////////////////////////////////////////////

//  "/" => render index view
app.get("/", function(req, res){
   res.sendfile('./public/app/index.htm'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get("/secret",isLoggedIn, function(req, res){
   console.log('you hit secret');
});

// Catch all
app.get("*", function(req, res){
   res.send("The path doesn't exist");
});

//////////////////////////////////////////////////////////////////
//////////// Tell Express to listen for requests (start server)
//////////////////////////////////////////////////////////////

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started");
}); 