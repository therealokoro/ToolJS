import ToolJS from "../main";
import { Logs } from "../deps";

/**
 * This method converts and returns an object literal from an array. 
 * It makes the index of each member of the array, the key of each property in the resultant object
 * @method module:Obj.toObj
 * @param {Object} arr The source array to be converted to an object
 * @returns {Object} The resultant object from the conversion
 * @example
 * var myArray = ["John Doe", "Queen Stella", true];
 * 
 * var objtoObj = Obj.toObj(myArray); // returns {0: "John Doe", 1: "Queen Stella", 2: true}
 */
const toObj = (arr) => {
    var debugging = ToolJS.env.debugging;
    var output = {};

    if (Array.isArray(arr)) {
        if(arr.length != 0){
            for (let i = 0; i < arr.length; i++) {
                const value = arr[i];
                output[i] = value;
            }
        }
        else{ if(debugging) Logs.throw("The arr to be converted must have atleast one value") }
    }
    else{ if(debugging) Logs.throw("The arr parameter must be an array with atleast a value") }

    if (output.length != 0) { return output; }
}

export default toObj;