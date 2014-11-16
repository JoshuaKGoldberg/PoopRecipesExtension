var PoopRecipes = (function (settings) {
    
    /**
     * Instantiates a new instance of a PoopRecipes object. The only stored
     * data is the database Array of poop name Strings.
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
     * "Poopifies" an element's .innerText. If a splitter Function is provided, 
     * the result will use the output of that Function on the original text 
     * as a prefix.
     * 
     * @param {HTMLElement} element   The element whose innerText is to be 
     *                                "poopified."
     * @param {Function} [splitter]   A Function that takes in a String and
     *                                returns the prefix, such as "2 cups." 
     *                                This is useful for sites that don't split
     *                                ingredient amounts and names info 
     *                                separate elements.
     * @return {PoopRecipes} this
     */
    PoopRecipes.prototype.convertElement = function (element, splitter) {
        var innerText = element.innerText;
        
        if(typeof(splitter) !== undefined) {
            innerText = splitter(innerText);
        }
        
        element.innerText = this.getStringConverted(innerText);
        
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