import isObj from "./isObj";
import isEmpty from "./isEmpty";

/**
 * This method removes the last property pair from an object and returns it
 * @method module:Obj.pop
 * @param {Object} obj The object whose last member is to be removed
 * @returns {Object} The property that was removed
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     isActive: true
 * };
 * 
 * // removes "isActive: true" from the object and returns it
 * var keyValue = Obj.pop(myObj, "isActive", true); // returns {isActive: true}
 * 
 */
const pop = (obj) => {
    var output;

    if (isObj(obj)) {
        if(!isEmpty(obj)){
            var keys = Object.keys(obj);
            var lastKeyIndex = keys.length - 1;
            var lastKey = keys[lastKeyIndex];
            output = obj[lastKey];
            delete obj[lastKey];
        }
    }

    return output;
}

export default pop;