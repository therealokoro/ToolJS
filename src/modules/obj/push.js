import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "./isObj";
import includes from "./includes";
import forEach from "./forEach";

/**
 * This method adds a new pair of property and value to an already existing object
 * @method module:Obj.push
 * @param {Object} obj The object to add the new property to
 * @param {String} key The key of the new property. Note that if the key already exist, it will be skipped.
 * You can also pass it an object which will be added to the existing object as long as there is no key repeatation
 * @param {String} [value] The value of the new property
 * @returns {Object} The updated object
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 * };
 * 
 * var newProps = {
 *     birthDate: "24th",
 *     birthMonth: "April"
 * }
 * 
 * var keyValue = Obj.push(myObj, "isActive", true); // returns {Name: "John Doe", Age: 25, isActive: true}
 * var keyValue = Obj.push(myObj, newProps);
 * 
 */
const push = (obj, key, value) => {
    var debugging = ToolJS.env.debugging;

    if (isObj(obj)) {
        if (typeof key == "string") {
            if(value){
                if (!includes(obj, key)) { obj[key] = value; }
                else { if (debugging) Logs.throw(`The object already has a property with the key '${key}'`); }
            }
            else { if (debugging) Logs.throw("Since you provided a new key, you must provide a value for the key"); }
        }
        else if(isObj(key)){
            forEach(key, (prop, value) => {
                if (!includes(obj, prop)) { obj[prop] = value; }
                else { if (debugging) Logs.warn(`The object already has a property with the key '${prop}'`); }
            });
        }
        else { if (debugging) Logs.throw("The key parameter must be of type string"); }
    }

    return obj;
}

export default push;