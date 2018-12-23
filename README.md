
# Recipes

---

Name: Shad Khan

Date: 12/06/2018

Project Topic: Crowdsourced Recipes Application

Heroku Link: https://shad-389kfinal.herokuapp.com/

---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     Name       `Type: String`
- `Field 2`:     Minutes       `Type: Number`
- `Field 3`:     Ingredients       `Type: [String]`
- `Field 4`:     Instructions       `Type: [String]`
- `Field 5`:     Rating       `Type: Number`
- `Field 6`:     Meal       `Type: String`
- `Field 7`:     Description      `Type: String`

Schema: 
```javascript
{
   name: {
       type: String,
       required: true,
       },
       
   minutes: {
       type: Number,
       required: true,
       },
       
   ingredients: {
       type: [String],
       required: true,
       },
       
   instructions: {
       type: [String],
       required: true,
       },
       
   rating: {
       type: Number,
       min: 1,
       max: 5,
       equired: true,
       },
       
   meal: {
       type: String,
       required: true,
       },
       
   description: {
       type: String,
       }
}
```

### 2. Add New Data

HTML form route: `/addRecipe`

POST endpoint route: `/api/addRecipe`

Example Node.js POST request to endpoint: 
```javascript
var request = require("request");

var options = { 
    method: 'POST',
    url: 'https://shad-389kfinal.herokuapp.com/api/addRecipe',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded' 
    },
    form: { 
       'name': 'Fried Egg Sandwich',
       'minutes': '15',
       'ingredients': "2 teaspoons butter \n 4 eggs \n 4 slices processed American cheese " +
        "\n 8 slices toasted white bread \n salt and pepper to taste \n 2 tablespoons mayonnaise \n 2 tablespoons ketchup",
       'instructions': "1. In a large skillet, melt butter over medium high heat. " +
        "\n 2. Crack eggs in pan and cook to desired firmness. \n 3. Just before eggs are cooked, place a slice of cheese over each egg. \n" +
         "4. After cheese has melted, place each egg on a toasted slice of bread. \n 5. Season eggs with salt and pepper. \n" +
          "5. Spread mayonnaise and ketchup on remaining slices of bread and cover eggs with bread to make 4 sandwiches.",
       'rating': '5',
       'meal': 'Breakfast',
       'description': 'Great comfort food, for breakfast.',
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: 
<br/>`/api/getRecipes` - Main 
<br> `/api/recipe/:id` 
<br> `/api/meals/:meal_name` - (Breakfast / Lunch / Dinner)
<br> `/api/alphabetical`
<br> `/api/30minutemeals`
<br> `/api/5stars`
<br> `/api/random` 

### 4. Search Data

Search Field: Recipe Name

### 5. Navigation Pages

Navigation Filters
1. Meal (Breakfast, Lunch, Dinner) -> `  /meals/:meal_name  `
2. Alphabetical Recipes -> ` /alphabetical `
3. 30 Minute or Less Recipes -> `  /30minutemeals'  `
4. 5-Star Recipes -> `  /5stars'  `
5. Random Recipe -> `  /random  `

