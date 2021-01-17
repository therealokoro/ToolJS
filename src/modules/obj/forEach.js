import isObj from "./isObj";

/**
 * This method fires up a callback function once for each property in an object, 
 * It passes three parameters to the callback function which gets updated for each property. They are listed below:
 * <ul>
 *      <li><b>key</b> - The current property key</li>
 *      <li><b>value</b> - The current property value</li>
 *      <li><b>index</b> - The current property index</li>
 * </ul>
 * @method module:Obj.forEach
 * @param {Object} obj The object to loop through its properties
 * @param {Function} callback The callback function to fired once for each property in the object.
 * This comes with three(3) predefined parameters(key, value, index)
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: "25",
 *     Gender: "Male"
 * };
 * 
 * Obj.forEach(myObj, function(key, value, index){
 *     console.log(`${key}: ${value},`);
 * });
 */
const forEach = (obj, callback) => {
    if (isObj(obj)) {
        var entries = Object.entries(obj);
        
        for (let i = 0; i < entries.length; i++) {
            const currPair = entries[i];
            var key = currPair[0];
            var value = currPair[1];
            var index = entries.indexOf(currPair);
            callback(key, value, index);
        }
    }
}

export default forEach;