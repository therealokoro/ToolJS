import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "./isObj";

// ! This method has not been made yet. Its just a copy

/**
 * This method returns the key of a particular property specified using the property index.
 * If no property was found at the given index, it returns null
 * @method module:Obj.keyAt
 * @param {Object} obj The object whose specific property key is to be returned
 * @param {String|Array<String>} index The index of the property whose key is to be returned.
 * This should be a non-negative number, but could be an array of numbers
 * @returns {String|Array} The key of the specified index or an array of multiple keys as the case may be
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var indexkey = Obj.keyAt(myObj, 0); // returns "Name"
 * var indexkey = Obj.keyAt(myObj, [0, 1]); // returns ["Name", "Age"]
 */
const keyAt = (obj, index) => {
    var debugging = ToolJS.env.debugging;
    var result = [], output;

    if (isObj(obj)) {
        var objKeys = Object.keys(obj);

        if(Array.isArray(index)){
            index.forEach(currIndex => {
                if(typeof currIndex == "number"){
                    var key = objKeys[currIndex];
                    
                    if(typeof key != "undefined"){ result.push(key); }
                    else { if (debugging) Logs.warn("The object does not have a property at index " + currIndex); }
                }
                else { if (debugging) Logs.throw("The index must be a numeric key"); }
            });
        }
        else if (typeof index == "number") {
            var key = objKeys[index];
            
            if(typeof key != "undefined"){ result.push(key); }
            else { if (debugging) Logs.warn("The object does not have a property at index " + index); }
        }
        else { if (debugging) Logs.throw("The index parameter must be a numeric key"); }
    }

    if(result.length != 0){
        output = (result.length == 1) ? result[0] : result;
        return output;
    }
    else{ return null; }

}

export default keyAt;