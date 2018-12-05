
// Converts our recipe name to the format of no extra spaces, and the first character is capitalized.
function prepareName(name) {
    let recipe = name.replace(/ +(?= )/g,'');
    recipe = recipe.toLowerCase();

    if (recipe === "")
        return "";
    else {
        recipe = recipe.charAt(0).toUpperCase() + recipe.slice(1);
        return recipe;
    }
}

module.exports = {
    prepareName: prepareName,
};