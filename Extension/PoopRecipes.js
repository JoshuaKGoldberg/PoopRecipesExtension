var PoopRecipes = (function (settings) {
    
    /**
     * Instantiates a new instance of a PoopRecipes object. 
     * 
     * @param {String[]} database   The Array of Strings to be used as random
     *                              poopification ingredient names.
     * @param {Object} units   A quick hash-table lookup of potential 
     *                         ingredient units, such as "cup" or "cups".            
     */
    var PoopRecipes = function (settings) {
        this.database = settings["database"];
        this.units = settings["units"];
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
        var converted = this.getStringConverted(element.innerText);
        
        if(splitter) {
            converted = splitter(element.innerText, this.units) + converted;
        }
        
        console.log("Got some changes", element.innerText, converted);
        
        element.innerText = converted;
        
        return this;
    };
    
    /**
     * Converts all matched elements in a page to have "poopified" content.
     * 
     * @param {String} selector   A CSS selector to select all elements that
     *                            should have their .innerText "poopified."
     * @param {Function} [splitter]   A Function that takes in a String and
     *                                returns the prefix, such as "2 cups." 
     *                                This is useful for sites that don't split
     *                                ingredient amounts and names info 
     *                                separate elements.
     * @return {PoopRecipes} this
     */
    PoopRecipes.prototype.convertAllElements = function (selector, splitter) {
        var elements = document.querySelectorAll(selector),
            i;
        
        for(i = elements.length - 1; i >= 0; i -= 1) {
            this.convertElement(elements[i], splitter);
        }
        
        return this;
    };
    
    /**
     * Standard provided splitter function. Most websites that don't separate 
     * ingredient names and amounts should be fine with this being used.
     * 
     * @param {String} string   The original innerText of an element.
     * @return {String}   The amount prefix of the string, such as "2 cups."
     */
    PoopRecipes.prototype.splitterStandard = function (string, units) {
        var stringSplit = string.split(/[ ]+/),
            unitsFirstFew = Math.min(string.length, 4),
            i;
        
        // If any of the first words are units, return the preceding part
        for(i = 0; i < unitsFirstFew; i += 1) {
            if(units.hasOwnProperty(stringSplit[i])) {
                return stringSplit.slice(0, i + 1).join(" ") + " ";
            }
        }
        
        // If there's a number, desperately go for that and the next word
        for(i = 0; i < unitsFirstFew; i += 1) {
            if(!isNaN(parseFloat(stringSplit[i]))) {
                return stringSplit.slice(0, i + 2) + " ";
            }
        }
        
        // No idea otherwise, screw it.
        return " ";
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
    ],
    "units": {
        "cup": undefined,
        "cups": undefined,
        "teaspoon": undefined,
        "teaspoons": undefined,
        "tablespoon": undefined,
        "tablespoons": undefined,
        "pinch": undefined,
        "pinches": undefined,
        "pound": undefined,
        "pounds": undefined,
        "ounce": undefined,
        "ounces": undefined,
        "bag": undefined,
        "bags": undefined,
        "scoop": undefined,
        "scoops": undefined
    }
});