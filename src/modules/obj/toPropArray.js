import isObj from "./isObj";
import forEach from "./forEach";

/**
 * This method returns an array containing an object of each property and value in the source object.
 * @method module:Obj.toPropArray
 * @param {Object} obj The source object to be converted to an array
 * @returns {Array<Object>} An array holding each property and value of the source object
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var objtoPropArray = Obj.toPropArray(myObj); // returns [{Name: "John Doe"}, {Age: "25"}, {Gender: "Male"}]
 */
const toPropArray = (obj) => {
    var output = [];

    if (isObj(obj)) {
        forEach(obj, (key, value) => {
            var newObj = {};
            newObj[key] = value;
            output.push(newObj);
        });
    }

    return output;
}

export default toPropArray;