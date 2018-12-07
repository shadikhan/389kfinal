var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var dataUtil = require("./data-util");
// var _ = require('underscore');
var dotenv = require('dotenv');
var Recipe = require('./models/Recipe');

// Load environment variables
dotenv.load();

console.log(process.env.MONGODB);

// Connect to Sandbox MongoDB
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function (err) {
    console.log("Connection was unable to take place");
    process.exit(1);
});

var app = express();
// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */


// GET Requests

// At the home / route, you should display every data point in an HTML Page.
app.get("/", function (req, res) {
    Recipe.find({}, function (err, recipes) {
        if (err) throw err;
        res.render("home", {
            recipes: recipes,
        });
    })
});


// Return all data points as JSON
app.get('/api/getRecipes', function (req, res) {
    Recipe.find({}, function (err, recipes) {
        if (err) throw err;
        res.json(recipes);
    });
});

// At the /random route, display a random recipe.
app.get("/random", function (req, res) {
    Recipe.find({}, function (err, recipes) {
        if (err) throw err;
        let recipe = recipes[Math.floor(Math.random() * recipes.length)];
        res.render("recipe", {
            recipe: recipe,
        });
    });
});

// At the /api/random route, display a random recipe as JSON
// At the /random route, display a random recipe.
app.get("/api/random", function (req, res) {
    Recipe.find({}, function (err, recipes) {
        if (err) throw err;
        let recipe = recipes[Math.floor(Math.random() * recipes.length)];
        res.json(recipe);
    });
});


//At the /recipe/:id route, display a specific recipe.
app.get('/recipe/:id', function (req, res) {
    Recipe.findOne({_id: req.params.id}, function (err, recipe) {
        if (err) throw err;
        if (!recipe) return res.render('404');
        else {
            res.render("recipe", {
                recipe: recipe,
            });
        }
    });
});


//At the /api/recipe/:id route, display a specific recipe as JSON data
app.get('/api/recipe/:id', function (req, res) {
    Recipe.findOne({_id: req.params.id}, function (err, recipe) {
        if (err) throw err;
        if (!recipe) return res.render('404');
        else {
            res.json(recipe);
        }
    });
});


// Render the addRecipe page, to add the recipe
app.get('/addRecipe', function (req, res) {
    res.render('create', {
        status: null,
    });
});

// Render the alphabetical page, which displays the recipes in alphabetical order
app.get('/alphabetical', function (req, res) {
    Recipe.find({}, function (err, recipes) {
        if (err) throw err;
        else {
            res.render("meal", {
                h1: "A-Z Recipes",
                h5: "Recipes sorted in alphabetical order",
                recipes: recipes.sort(function (a, b) {
                    let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                    if (nameA < nameB) //sort string ascending
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0; //default return value (no sorting)
                }),
            });
        }
    });
});

// Render the /api/alphabetical page, which displays the recipes in alphabetical order as JSON
app.get('/api/alphabetical', function (req, res) {
    Recipe.find({}, function (err, recipes) {
        if (err) throw err;
        else {
            let sorted = recipes.sort(function (a, b) {
                let nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
                if (nameA < nameB) //sort string ascending
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0; //default return value (no sorting)
            });
            res.json(sorted);
        }
    });
});



// Render the /meals/:meal_name page, which displays the recipes with that specific meal name.
app.get('/meals/:meal_name', function (req, res) {
    Recipe.find({meal: req.params.meal_name}, function (err, recipes) {
        if (err) throw err;
        if (!recipes) return res.render('404');
        else {
            res.render("meal", {
                h1: req.params.meal_name + " Recipes",
                h5: "All your favorite " + (req.params.meal_name).toLowerCase() + " recipes",
                recipes: recipes,
            });
        }
    });
});

// Render the /api/meals/:meal_name page, which displays the recipes with that specific meal name as JSON.
app.get('/api/meals/:meal_name', function (req, res) {
    Recipe.find({meal: req.params.meal_name}, function (err, recipes) {
        if (err) throw err;
        if (!recipes) return res.render('404');
        else {
            res.json(recipes);
        }
    });
});


// Render the /5stars page, which displays all the 5 star recipes
app.get('/5stars', function (req, res) {
    Recipe.find({rating: 5}, function (err, recipes) {
        if (err) throw err;
        if (!recipes) return res.render('404');
        else {
            res.render("meal", {
                h1: "5-Star Recipes",
                h5: "The most popular recipes",
                recipes: recipes,
            });
        }
    });
});

// Render the /api/5stars page, which displays all the 5 star recipes as JSON
app.get('/api/5stars', function (req, res) {
    Recipe.find({rating: 5}, function (err, recipes) {
        if (err) throw err;
        if (!recipes) return res.render('404');
        else {
           res.json(recipes);
        }
    });
});

// Render the /30minutemeals page, which displays all recipes that take 30 minutes or less to cook.
app.get('/30minutemeals', function (req, res) {
    Recipe.find({minutes: {$lte: 30}}, function (err, recipes) {
        if (err) throw err;
        if (!recipes) return res.render('404');
        else {
            res.render("meal", {
                h1: "Recipes that take 30 minutes or less",
                h5: "Shoutout to Rachel Ray",
                recipes: recipes,
            });
        }
    });
});

// Render the /30minutemeals page, which displays all recipes that take 30 minutes or less to cook.
app.get('/api/30minutemeals', function (req, res) {
    Recipe.find({minutes: {$lte: 30}}, function (err, recipes) {
        if (err) throw err;
        if (!recipes) return res.render('404');
        else {
            res.json(recipes);
        }
    });
});


// POST Requests

// Create a recipe and add it to DB if exact recipe doesn't exist
app.post('/api/addRecipe', function (req, res) {
    // const isNumber = /^\d+$/.test(String(req.body.minutes)); We can make this client side.
    const recipeName = dataUtil.prepareName(String(req.body.name));
    const minutesTaken = parseInt(req.body.minutes);
    const ingredientsList = req.body.ingredients.split("\n");
    const instructionsList = req.body.instructions.split("\n");

    if (recipeName === "" || minutesTaken <= 0 || ingredientsList === "" || instructionsList === "") {
        res.render('create', {
            status: "Couldn't add the recipe to the DB, check your input!",
        });
    }
    else {
        const recipe = new Recipe({
            name: recipeName,
            minutes: parseInt(req.body.minutes),
            ingredients: ingredientsList,
            instructions: instructionsList,
            rating: parseInt(req.body.rating),
            meal: req.body.meal,
            description: req.body.description,
        });

        recipe.save(function (err, recipe) {
            if (err) throw err;
            res.render('recipe', {
                recipe: recipe,
            });
        });
    }
});


app.listen(process.env.PORT || 3000, function() {
    console.log('Listening!');
});
