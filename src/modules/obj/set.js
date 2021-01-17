import ToolJS from "../main";
import { Logs } from "../deps";
import isObj from "./isObj";
import includes from "./includes";

// ! This method still needs some major work

/**
 * This method updates the value of a particular property in an object.
 * If the path specified doesn't match any property in the object, then it creates the new object
 * @method module:Obj.set
 * @param {Object} obj The object whose property is to be updated
 * @param {String} path The absolute path to the property whose value is to be updated
 * @param {*} value The new value for the object property.
 * Note that if a function with a return value is passed here, 
 * the return value will be assigned to the property, else the whole function will be assigned to it.
 * @returns {Object} The initial object
 * @example
 * var myObj = {
 *     Name: "John Doe",
 *     Age: 25,
 *     Gender: "Male",
 *     skills: {
 *          web: {
 *              html: "80%",
 *              css: "75%",
 *              js: "70%",
 *          }
 *     }
 * };
 * 
 * // updates the "css" property value in the object
 * var newObj = Obj.set(myObj, "skills.web.css", "100%");
 * 
 * // updates the "Age" property value in the object
 * var newObj = Obj.set(myObj, "Age", 40);
 */
const set = (obj, path, value) => {
    var debugging = ToolJS.env.debugging;

    if (isObj(obj)) {
        if(path){
            if (Array.isArray(path)) {
                path.forEach(currKey => {
                    if (typeof currKey == "string") { _setVal(currKey) }
                    else { if (debugging) Logs.throw("The path name must be of type string"); }
                });
            }
            else if (typeof path == "string") { _setVal(path); }
            else { if (debugging) Logs.throw("The path parameter must be a string or an array of strings"); }
        }
        else { if (debugging) Logs.throw("The path parameter must be specified"); }
    }
    
    function _setVal(path) {
        var setValue;

        if(value){ if(typeof value === "function"){ setValue = (null != value()) ? value() : value; } }
        else { if (debugging) Logs.warn("The value paramter was left empty!"); }
        
        var a = path.split('.');
        var o = obj;
        while (a.length - 1) {
            var n = a.shift();
            if (!includes(o, n)) {
                if (debugging) Logs.info(`The path '${n}' did not match a property in the object, but will be created dynamically`);
                o[n] = {};
            }
            else { o = o[n]; }
        };
        o[a[0]] = setValue;
    }

    

    return obj;
}

export default set;