/**
 * PoopRecipes Trigger: AllRecipes
 * 
 * Runs on elements of className "ingredient-name".
 */
(function () {
    var elements = document.getElementsByClassName("ingredient-name"),
        i;
    
    for(i = elements.length - 1; i >= 0; i -= 1) {
        elements[i].innerText = "poop";
    }
})();