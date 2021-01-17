import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "./isObj";
import forEach from "./forEach";

/**
 * This method updates an already existing object with the values of matching properties from another object
 * @method module:Obj.extend
 * @param {Object} target The object to which the update is to be made upon
 * @param {String} source The source of the update i.e the source of the new property values
 * @returns {Object} The resultant object
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male"
 * };
 * 
 * var newProps = {
 *     Age: 15,
 *     Gender: "Female"
 * }
 * 
 * var newObj = Obj.extend(myObj, newProps); // returns {Name: "John Doe", Age: 15, Gender: "Female"}
 */
const extend = (target, source) => {
    var debugging = ToolJS.env.debugging;

    if (isObj(target)) {
        if (isObj(source)) {
            forEach(target, function (key, value) {
                if (source[key] != undefined) {
                    if (isObj(target[key])) {
                        extend(target[key], source[key])
                    } else { target[key] = source[key]; }
                }
                else { target[key] = value; }
            });
        }
        else { if (debugging) Logs.throw("The source parameter must be an object too"); }
    }
    else { if (debugging) Logs.throw("The target parameter must be an object"); }

    return target;
}

export default extend;