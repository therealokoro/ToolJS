import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "./isObj";
import includes from "./includes";

/**
 * This method returns the value of a particular property specified using the property key
 * @method module:Obj.valueOf
 * @param {Object} obj The object whose particular property value are to be returned
 * @param {String|Array<String>} key The key of the property whose value is to be returned. Could be an array of keys
 * @returns {String|Array} The value of the specified key or an array of multiple values as the case may be
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var keyValue = Obj.valueOf(myObj, "Name"); // returns "John Doe"
 * var keyValue = Obj.valueOf(myObj, ["Name", "Age"]); // returns ["John Doe", 25]
 */
const valueOf = (obj, key) => {
    var debugging = ToolJS.env.debugging;
    var result = [], output;

    if (isObj(obj)) {
        if(Array.isArray(key)){
            key.forEach(currKey => {
                if (typeof currKey == "string") { result.push(_getVal(currKey)); }
                else { if (debugging) Logs.throw("The key name must be of type string"); }
            });
        }
        else if (typeof key == "string") { result.push(_getVal(key)); }
        else { if (debugging) Logs.throw("The key parameter must be a string or an array of strings"); }
    }

    function _getVal(path) {
        path = path.replace(/\[(\w+)\]/g, '.$1');
        path = path.replace(/^\./, '');
        var a = path.split('.');
        var o = obj;
        while (a.length) {
            var n = a.shift();
            if (!includes(o, n)){ if(debugging) Logs.warn(`The path '${path}' did not match any property in the object`); }
            else{ o = o[n]; }
        }
        return o;
    };

    if(result.length != 0){
        output = (result.length == 1) ? result[0] : result;
        return output;
    }

}

export default valueOf;