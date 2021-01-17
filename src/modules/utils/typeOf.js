import isString from '../str/isString';
import between from '../str/between';

/**
 * This method checks the data type of an item or variable and returns. It also takes an optional parameter specifying a particular data type to check for, this narrows down the check.
 * @method module:Utils.typeOf
 * @param {*} item The item whose type is to be checked.
 * @param {String} [type] A specific data type to test the item by.
 * @returns {Boolean|String} The result of the check.
 * @example
 * var item1 = "Hello World";
 * Utils.typeOf(item1); // returns "string"
 * 
 * var item2 = {name: "John Doe", gender: "Male"};
 * Utils.typeOf(item2); // returns "object"
 * 
 * var item3 = ["Hello", "World"];
 * Utils.typeOf(item3); // returns "array"
 * 
 * var item4 = function(){ console.log("foo") };
 * Utils.typeOf(item4); // returns "function"
 * 
 * var item5 = 100;
 * Utils.typeOf(item5); // returns "number"
 * 
 * var item6 = "ToolJS Rocks";
 * Utils.typeOf(item6, "string"); // returns true
 * 
 * var item7 = document.getElementById("#myElem");
 * Utils.typeOf(item7); // returns "Element"
 * 
 * var item8 = /[^ud]/g;
 * Utils.typeOf(item8); // returns "RegExp"
 */
const typeOf = (item, type) => {
    var output;

    if(isString(type)){
        if(type === ("array" || "Array")){ output = Array.isArray(item); }
        else{ output = typeof item === type; }
        output = output.toUpperCase();
    }
    else{
        if(typeof item === "object"){
            var inString = toString.call(item);
            inString = between(inString, "[", "]");
            output = inString.split(" ")[1];
        }
        else{ output = typeof item; }
    }

    return output;
}

export default typeOf;