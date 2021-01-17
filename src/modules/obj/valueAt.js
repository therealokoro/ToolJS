import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "./isObj";

/**
 * This method returns the value of a particular property specified using the property index.
 * If no property was found at the given index, it returns null
 * @method module:Obj.valueAt
 * @param {Object} obj The object whose specific property value is to be returned
 * @param {String|Array<String>} index The index of the property whose value is to be returned.
 * This should be a non-negative number, but could be an array of numbers
 * @returns {String|Array} The value of the specified index or an array of multiple values as the case may be
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var indexValue = Obj.valueAt(myObj, 0); // returns "John Doe"
 * var indexValue = Obj.valueAt(myObj, [0, 1]); // returns ["John Doe", 25]
 */
const valueAt = (obj, index) => {
    var debugging = ToolJS.env.debugging;
    var result = [], output;

    if (isObj(obj)) {
        var objKeys = Object.keys(obj);

        if(Array.isArray(index)){
            index.forEach(currIndex => {
                if(typeof currIndex == "number"){
                    var key = objKeys[currIndex];
                    var value = obj[key];
                    
                    if(typeof value != "undefined"){ result.push(value); }
                    else { if (debugging) Logs.warn("The object does not have a property at index " + currIndex); }
                }
                else { if (debugging) Logs.throw("The index must be a numeric value"); }
            });
        }
        else if (typeof index == "number") {
            var key = objKeys[index];
            var value = obj[key];
            
            if(typeof value != "undefined"){ result.push(value); }
            else { if (debugging) Logs.warn("The object does not have a property at index " + index); }
        }
        else { if (debugging) Logs.throw("The index parameter must be a numeric value"); }
    }

    if(result.length != 0){
        output = (result.length == 1) ? result[0] : result;
        return output;
    }
    else { return null; }

}

export default valueAt;