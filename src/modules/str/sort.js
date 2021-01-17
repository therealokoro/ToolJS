import isObj from "../obj/isObj";
import isString from "./isString";
import words from "./words";

// * The sort function works well, but still needs adjustment
// ? should the sort type be numerical only?
// TODO make the sort work numerically
/**
 * This method sorts a given string using a set of default options(which can be overwritten), and returns the sorted string.
 * @method module:Str.sort
 * @param {String} str The string to be sorted.
 * @param {Object} [options] An options object that determines how to sort is carried out on the string.
 * @param {Object} [options.type="alphabetic"] The sort type. One of either "alphabetic", "numeric".
 * @param {Object} [options.order="asc"] The order of the sort. One of either "asc" or "desc".
 * @returns {String} The sorted string.
 * @example
 * var myString = "Apple 1Apple 1Banana Banana $100, 2 100";
 * 
 * Str.sort(myString); // returns "sort"
 * Str.sort(myString); // returns 7
 */
const sort = (str, options) => {
    var output, toWords, type = "alphabetic", order = "asc";

    if (isString(str)) {
        str = str.trim();
        toWords = words(str);
        
        if (isObj(options)){
            type = (isString(options.type)) ? options.type : type;
            order = (isString(options.order)) ? options.order : order;
        }

        function _sort(arr) {
            var sortedString;
            var collator = new Intl.Collator([], { numeric: true });
            var sorted = arr.sort((a, b) => collator.compare(a, b));

            if (order === "asc") { sortedString = sorted.join(" "); }
            else if (order === "desc") { sortedString = sorted.reverse().join(" "); }
            return sortedString;
        }
        
        output = _sort(toWords);
        return output;
    }
}

export default sort;