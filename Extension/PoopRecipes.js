var PoopRecipes = (function (settings) {
    
    /**
     * Instantiates a new instance of a PoopRecipes object. The only stored
     * data is the database Array of poop name strings.
     * 
     * @param {Object} settings   The settings object used as arguments. The
     *                            only required key is "database".                    
     */
    var PoopRecipes = function (settings) {
        this.database = settings["database"];
    };
    
    /**
     * Returns the hash number of a String, mod the length of the PoopRecipes
     * database.
     * 
     * @param {String} string
     * @return {Number}
     * @remarks This is done by summing the String.charCodeAt of each character
     *          in the string.
     */
    PoopRecipes.prototype.getStringHash = function (string) {
        var total = 0,
            i;
        
        for(i = string.length - 1; i >= 0; i -= 1) {
            total += string.charCodeAt(i);
        }
        
        return total % this.database.length;
    };
    
    /**
     * Gets the "poofied" equivalent of a String from the PoopRecipes database.
     * 
     * @param {String} string
     * @return {String}
     */
    PoopRecipes.prototype.getStringConverted = function (string) {
        return this.database[this.getStringHash(string)];
    };
    
    /**
     * "Poopifies" an element's .innerText.
     * 
     * @param {HTMLElement} element
     * @return {PoopRecipes} this
     */
    PoopRecipes.prototype.convertElement = function (element) {
        element.innerText = this.getStringConverted(element.innerText);
        return this;
    };
    
    /**
     * Converts all matched elements in a page to have "poopified" content.
     * 
     * @param {String} selector   A CSS selector to select all elements that
     *                            should have their .innerText "poopified."
     * @return {PoopRecipes} this
     */
    PoopRecipes.prototype.convertAllElements = function (selector) {
        var elements = document.querySelectorAll(selector),
            i;
        
        for(i = elements.length - 1; i >= 0; i -= 1) {
            this.convertElement(elements[i]);
        }
        
        return this;
    };
    
    return new PoopRecipes(settings);
})({
    "database": [
        "poop",
        "poop pellets",
        "poop squirts",
        "poopies",
        "poos",
        "poopsies",
        "poopsters",
        "turds",
        "turd nuggets",
        "turd squirts",
        "tooties",
        "toots",
        "poop snakes",
        "diarrhoeas",
        "feces",
        "fecal matters",
        "anal blasts",
        "dumps",
        "loads",
        "butt bombs",
        "bowel movement",
        "butt muds",
        "craps",
        "doodies",
        "droppings",
        "dungs",
        "stool samples"
    ]
});