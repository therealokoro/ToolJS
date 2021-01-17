(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ToolJS = factory());
}(this, (function () { 'use strict';

    /**
     * ToolJS class is the root of the library. This is the default exported object.
     * It holds the libraries informations, the registered modules, and methods to exported.
     * It also exposes a set of methods as public apis
     * @class
     */
    class ToolJS {
        /**
         * @memberof ToolJS
         * @typedef {Object} ToolJSConfig - An object of the libraries configuration options
         * @property {Boolean} debugging - Enable code debugging and error logging
         */

        /**
         * Initializes a new instance of the ToolJS class. <br>
         * <blockquote>Note that you're not required to initialize a new instance of the class.
         * The Library does that for you and returns the new instance</blockquote>
         */
        constructor() {
            /**
             * Defines a set of default configuration options for the library
             * @type {ToolJSConfig}
             */
            const defaultConfig = {
                debugging: false,
                namespace: "$",
            };

            this.env = defaultConfig;
            this.modules = {};
            this.exports = {};
            this.info = {
                "version": "1.0.0",
                "url": "https://tooljs.com",
                "docs": "https://tooljs.com/docs/",
                "github": "https://github.com/REDEAKAA/tooljs",
                "author": "Okoro Redemption",
                "authors-github": "https://github.com/REDEAKAA/"
            };
        }
        /**
         * If passed an array of strings or a single string, it exports all methods and function in each registered module with a matching name in the passed array.
         * Else it exports all the functions and methods of all the registered modules.
         * @param {String | Array<string>} arr - A single string or an array of strings 
         * matching a registered module
         * @returns {Object} an object of methods from across the specified modules
         * @example
         * // exports a single module "_Str" to a variable
         * var $ = ToolJS.export("_Str");
         * // exports an array of modules to a variable
         * var $ = ToolJS.export(["_Str", "_Calc"]);
         */
        export(arr) {
            /** 
             * Defines an object of methods to be exported
             * @type {Object} */
            var target = this.exports;
            /** 
             * Defines an object of registered modules
             * @type {Object} */
            var modules = this.modules;

            // handle arguments as an array
            if (Array.isArray(arr)) {
                arr.forEach(curr => { addMethods(curr); });
            }
            else if (typeof arr == "string") { addMethods(arr); }
            else {
                for (const key in modules) { addMethods(key); }
            }

            /** @param {string} str */
            function addMethods(str) {
                var currModule = modules[str];
                for (const method in currModule) {
                    const func = currModule[method];
                    target[method] = func;
                }
            }

            return target;
        }
        /** 
         * This method is used to overwrite the libraries default configurations by passing it a non-empty object of options
         * See [ToolJSConfig]{@link ToolJS#ToolJSConfig} for accepted configuration options
         * @param {ToolJSConfig} options - An object of configuration options
         */
        config(options) {
            if (typeof options == "object") {
                var defaultConfig = this.env;
                var defaultKeys = Object.keys(defaultConfig);
                var debugging = this.env.debugging;

                for (const currConfigKey in options) {
                    const currConfigKeyValue = options[currConfigKey];

                    if (defaultKeys.includes(currConfigKey)) {
                        defaultConfig[currConfigKey] = currConfigKeyValue;
                    }
                }

                // log info to the console
                if (debugging) console.log("ToolJS Enviroment configurations has been updated! See new config below");
            }
        }
        /**
         * This method registers a new module or plugin to the library which is added to the default modules available and can be used like the others. 
         * See [Creating a ToolJS Plugin]{@tutorial create-plugin}
         * @param {String} moduleName - A string representing the name of the module
         * @param {Function} moduleFunc - A function that returns and object of methods.
         */
        register(moduleName, moduleFunc) {
            /** @this lib referes to the ToolJS class */
            var lib = this;
            var debugging = lib.env.debugging;

            // check typeof of moduleName
            if (typeof moduleName !== "string") {
                throw new Error("Module name must be a string");
            }

            // work with moduleFunc if available
            if (moduleFunc) {
                // get modules
                var modules = lib.modules;

                // make sure module has not been defined before
                if (typeof modules[moduleName] == "undefined") {
                    var moduleExports = moduleFunc();
                    modules[moduleName] = moduleExports;

                    // log info to the console
                    if (debugging) console.log(`ToolJS registered a new module with name '${moduleName}'`);
                    return moduleExports;
                }
                else {
                    throw new Error(`A module with the name '${moduleName}' is already registered`);
                }

            }
        }
    }







    // export a new instance of the ToolJS class
    var ToolJS$1 = new ToolJS;

    /**
     * This method checks if a variable is a plain object literal
     * @method module:Obj.isObj
     * @param {Object} obj The variable to test for if its an object literal
     * @returns {Boolean} The result of the test
     * @example
     * var myObj = {
     *     Name: "John Doe",
     *     Age: "25",
     *     Gender: "Male"
     * };
     * Obj.isObj(myObj) // returns true;
     * 
     * var myElem = DOM.getEl("p");
     * Obj.isObj(myElem) // returns false;
     * 
     * var arr = ["item1", "item2"];
     * 
     * console.log(typeof arr === "object");
     * // the above code will return "true", because all Arrays in javascript are objects. 
     * // but this is not an object literal
     * 
     * // This will check if its actaully an array or a plain object
     * Obj.isObj(arr) // returns false;
     */
    const isObj$1 = (obj) => {
        return (typeof obj !== "undefined" && obj !== null && obj.constructor === Object && typeof obj === 'object' && !Array.isArray(obj) && toString.call(obj) == "[object Object]");
    };

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
        if (isObj$1(obj)) {
            var entries = Object.entries(obj);
            
            for (let i = 0; i < entries.length; i++) {
                const currPair = entries[i];
                var key = currPair[0];
                var value = currPair[1];
                var index = entries.indexOf(currPair);
                callback(key, value, index);
            }
        }
    };

    /**
     * This method returns an array containing the keys of an object literal
     * @method module:Obj.keys
     * @param {Object} obj The object whose keys are to be returned
     * @returns {Array} An array holding the keys of the object
     * @example
     * var myObj = {
     *     Name: "John Doe",
     *     Age: 25,
     *     Gender: "Male"
     * };
     * 
     * var objKeys = Obj.keys(myObj); // returns ["Name", "Age", "Gender"]
     */
    const keys = (obj) => {
        if (isObj$1(obj)) {
            return Object.keys(obj);
        }
    };

    /**
     * This method returns an array containing the values of an object literal
     * @method module:Obj.values
     * @param {Object} obj The object whose values are to be returned
     * @returns {Array<String>} An array holding the values of the object
     * @example
     * var myObj = {
     *     Name: "John Doe",
     *     Age: 25,
     *     Gender: "Male"
     * };
     * 
     * var objValues = Obj.values(myObj); // returns ["John Doe", 25, "Male"]
     */
    const values = (obj) => {
        if (isObj$1(obj)) { return Object.values(obj); }
    };

    /**
     * This method checks if an object contains a particular property specified by the property key, and returns true.
     * @method module:Obj.includes
     * @param {Object} obj The object to perform the search on
     * @param {String} key The key of the property to be searched for
     * @returns {Boolean} The result of the search
     * @example
     * var myObj = {
     *     Name: "John Doe",
     *     Age: 25,
     *     Gender: "Male"
     * };
     * 
     * var keyValue = Obj.includes(myObj, "Name"); // returns true
     * var keyValue = Obj.includes(myObj, "occupation"); // returns false
     */
    const includes = (obj, key) => {
        var debugging = ToolJS$1.env.debugging;
        var result;

        if (isObj$1(obj)) {
            if (typeof key == "string") {
                var keyArr = keys(obj);
                result = keyArr.includes(key);
            }
            else { if (debugging) Logs$1.throw("The key parameter must be a string"); }
        }

        return result;
    };

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
        var debugging = ToolJS$1.env.debugging;
        var result = [], output;

        if (isObj$1(obj)) {
            if(Array.isArray(key)){
                key.forEach(currKey => {
                    if (typeof currKey == "string") { result.push(_getVal(currKey)); }
                    else { if (debugging) Logs$1.throw("The key name must be of type string"); }
                });
            }
            else if (typeof key == "string") { result.push(_getVal(key)); }
            else { if (debugging) Logs$1.throw("The key parameter must be a string or an array of strings"); }
        }

        function _getVal(path) {
            path = path.replace(/\[(\w+)\]/g, '.$1');
            path = path.replace(/^\./, '');
            var a = path.split('.');
            var o = obj;
            while (a.length) {
                var n = a.shift();
                if (!includes(o, n)){ if(debugging) Logs$1.warn(`The path '${path}' did not match any property in the object`); }
                else { o = o[n]; }
            }
            return o;
        }
        if(result.length != 0){
            output = (result.length == 1) ? result[0] : result;
            return output;
        }

    };

    /**
     * This method returns an array containing the entries of an object literal
     * @method module:Obj.entries
     * @param {Object} obj The object whose entries are to be returned
     * @returns {Array} An array holding the entries of the object
     * @example
     * var myObj = {
     *     Name: "John Doe",
     *     Age: 25,
     *     Gender: "Male"
     * };
     * 
     * var objEntries = Obj.entries(myObj); // returns [["Name", "John Doe"], ["Age", "25"], ["Gender", "Male"]]
     */
    const entries = (obj) => {
        if (isObj$1(obj)) { return Object.entries(obj); }
    };

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

        if (isObj$1(obj)) {
            forEach(obj, (key, value) => {
                var newObj = {};
                newObj[key] = value;
                output.push(newObj);
            });
        }

        return output;
    };

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
        var debugging = ToolJS$1.env.debugging;

        if (isObj$1(obj)) {
            if (typeof key == "string") {
                if(value){
                    if (!includes(obj, key)) { obj[key] = value; }
                    else { if (debugging) Logs$1.throw(`The object already has a property with the key '${key}'`); }
                }
                else { if (debugging) Logs$1.throw("Since you provided a new key, you must provide a value for the key"); }
            }
            else if(isObj$1(key)){
                forEach(key, (prop, value) => {
                    if (!includes(obj, prop)) { obj[prop] = value; }
                    else { if (debugging) Logs$1.warn(`The object already has a property with the key '${prop}'`); }
                });
            }
            else { if (debugging) Logs$1.throw("The key parameter must be of type string"); }
        }

        return obj;
    };

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
        var debugging = ToolJS$1.env.debugging;

        if (isObj$1(target)) {
            if (isObj$1(source)) {
                forEach(target, function (key, value) {
                    if (source[key] != undefined) {
                        if (isObj$1(target[key])) {
                            extend(target[key], source[key]);
                        } else { target[key] = source[key]; }
                    }
                    else { target[key] = value; }
                });
            }
            else { if (debugging) Logs$1.throw("The source parameter must be an object too"); }
        }
        else { if (debugging) Logs$1.throw("The target parameter must be an object"); }

        return target;
    };

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
        var debugging = ToolJS$1.env.debugging;

        if (isObj$1(obj)) {
            if(path){
                if (Array.isArray(path)) {
                    path.forEach(currKey => {
                        if (typeof currKey == "string") { _setVal(currKey); }
                        else { if (debugging) Logs$1.throw("The path name must be of type string"); }
                    });
                }
                else if (typeof path == "string") { _setVal(path); }
                else { if (debugging) Logs$1.throw("The path parameter must be a string or an array of strings"); }
            }
            else { if (debugging) Logs$1.throw("The path parameter must be specified"); }
        }
        
        function _setVal(path) {
            var setValue;

            if(value){ if(typeof value === "function"){ setValue = (null != value()) ? value() : value; } }
            else { if (debugging) Logs$1.warn("The value paramter was left empty!"); }
            
            var a = path.split('.');
            var o = obj;
            while (a.length - 1) {
                var n = a.shift();
                if (!includes(o, n)) {
                    if (debugging) Logs$1.info(`The path '${n}' did not match a property in the object, but will be created dynamically`);
                    o[n] = {};
                }
                else { o = o[n]; }
            }        o[a[0]] = setValue;
        }

        

        return obj;
    };

    /**
     * This method returns the zero-based index of a specific property in an object.
     * If the key is not found, it returns -1
     * @method module:Obj.indexOf
     * @param {Object} obj The object to which the search is to be made upon
     * @param {String} key The property key whose index is to be returned
     * @returns {Number} The index of the object property
     * @example
     * var myObj = {
     *     Name: "John Doe",
     *     Age: 25,
     *     Gender: "Male"
     * };
     * 
     * var index = Obj.indexOf(myObj, "Age"); // returns 1
     * var index = Obj.indexOf(myObj, "Occupation"); // returns -1
     */
    const indexOf = (obj, key) => {
        var debugging = ToolJS$1.env.debugging;
        var output;

        if (isObj$1(obj)) {
            var objKeys = Object.keys(obj);
            if(objKeys.includes(key)){ output = objKeys.indexOf(key);}
            else { output = -1; }
        }
        else { if (debugging) Logs$1.throw("The obj parameter must be an object"); }

        if(output != null){ return output; }
    };

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
        var debugging = ToolJS$1.env.debugging;
        var result = [], output;

        if (isObj$1(obj)) {
            var objKeys = Object.keys(obj);

            if(Array.isArray(index)){
                index.forEach(currIndex => {
                    if(typeof currIndex == "number"){
                        var key = objKeys[currIndex];
                        var value = obj[key];
                        
                        if(typeof value != "undefined"){ result.push(value); }
                        else { if (debugging) Logs$1.warn("The object does not have a property at index " + currIndex); }
                    }
                    else { if (debugging) Logs$1.throw("The index must be a numeric value"); }
                });
            }
            else if (typeof index == "number") {
                var key = objKeys[index];
                var value = obj[key];
                
                if(typeof value != "undefined"){ result.push(value); }
                else { if (debugging) Logs$1.warn("The object does not have a property at index " + index); }
            }
            else { if (debugging) Logs$1.throw("The index parameter must be a numeric value"); }
        }

        if(result.length != 0){
            output = (result.length == 1) ? result[0] : result;
            return output;
        }
        else { return null; }

    };

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
        var debugging = ToolJS$1.env.debugging;
        var result = [], output;

        if (isObj$1(obj)) {
            var objKeys = Object.keys(obj);

            if(Array.isArray(index)){
                index.forEach(currIndex => {
                    if(typeof currIndex == "number"){
                        var key = objKeys[currIndex];
                        
                        if(typeof key != "undefined"){ result.push(key); }
                        else { if (debugging) Logs$1.warn("The object does not have a property at index " + currIndex); }
                    }
                    else { if (debugging) Logs$1.throw("The index must be a numeric key"); }
                });
            }
            else if (typeof index == "number") {
                var key = objKeys[index];
                
                if(typeof key != "undefined"){ result.push(key); }
                else { if (debugging) Logs$1.warn("The object does not have a property at index " + index); }
            }
            else { if (debugging) Logs$1.throw("The index parameter must be a numeric key"); }
        }

        if(result.length != 0){
            output = (result.length == 1) ? result[0] : result;
            return output;
        }
        else { return null; }

    };

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
        var debugging = ToolJS$1.env.debugging;
        var output = {};

        if (Array.isArray(arr)) {
            if(arr.length != 0){
                for (let i = 0; i < arr.length; i++) {
                    const value = arr[i];
                    output[i] = value;
                }
            }
            else { if(debugging) Logs$1.throw("The arr to be converted must have atleast one value"); }
        }
        else { if(debugging) Logs$1.throw("The arr parameter must be an array with atleast a value"); }

        if (output.length != 0) { return output; }
    };

    /**
     * This method checks if an object literal is empty and returns true, else it returns false
     * @method module:Obj.isEmpty
     * @param {Object} obj The object to be checked if its empty
     * @returns {Boolean} The result of the check
     * @example
     * var myObj = {
     *     Name: "John Doe",
     *     Age: 25,
     *     Gender: "Male"
     * };
     * 
     * var myEmptyObj = {};
     * 
     * Obj.isEmpty(myObj); // returns false
     * Obj.isEmpty(myEmptyObj); // returns true
     */
    const isEmpty = (obj) => {
        if (isObj$1(obj)) {
            var entries = Object.entries(obj);
            return (entries.length === 0);
        }
    };

    /**
     * This method removes a specified property or an array of properties from an object, if they exist in the object.
     * @method module:Obj.remove
     * @param {Object} obj The object whose property is to be removed
     * @param {String} key The key of the object property is to be removed
     * @returns {Object} The resultant object
     * @example
     * var myObj = {
     *     Name: "John Doe",
     *     Age: 25,
     *     Gender: "Male"
     * };
     * 
     * // removes the "Name" property and its value from the object
     * Obj.remove(myObj, "Name");
     * 
     * // removes the "Name" and "Age" property and their values from the object 
     * Obj.remove(myObj, ["Name", "Age"]);
     */
    const remove = (obj, key) => {
        var debugging = ToolJS$1.env.debugging;

        if (isObj$1(obj)) {
            if (Array.isArray(key)) {
                key.forEach(currKey => {
                    if (typeof currKey == "string") { delete obj[currKey]; }
                    else { if (debugging) Logs$1.warn("The key name must be of type string"); }
                });
            }
            else if (typeof key == "string") { delete obj[key]; }
            else { if (debugging) Logs$1.throw("The key parameter must be a string or an array of strings"); }
        }

        return obj;
    };

    /**
     * This method returns an array containing the value of each property in the source object.
     * If a path or an array of paths to a property value or values passed as the second parameter, 
     * then only those path value(s) is returned in the array
     * @method module:Obj.toArray
     * @param {Object} obj The source object to be converted to an array
     * @param {String|Array<String>} [path] An optional string or array or strings representing paths to properties
     * @returns {Array<Object>} An array holding the value of each property in the source object
     * @example
     * var myObj = {
     *     Name: "John Doe",
     *     Age: 25,
     *     Gender: "Male"
     * };
     * 
     * var objtoArray = Obj.toArray(myObj); // returns ["John Doe", 25, "Male"]
     */
    const toArray = (obj, path) => {
        var output = [];

        if (isObj$1(obj)) {
            if(path){ var value = valueOf(obj, path); output.push(value); }
            else { forEach(obj, (key, value) => { output.push(value); }); }
        }

        return output;
    };

    /**
     * This method removes the last property pair from an object and returns it
     * @method module:Obj.pop
     * @param {Object} obj The object whose last member is to be removed
     * @returns {Object} The property that was removed
     * @example
     * var myObj = {
     *     Name: "John Doe",
     *     Age: 25,
     *     isActive: true
     * };
     * 
     * // removes "isActive: true" from the object and returns it
     * var keyValue = Obj.pop(myObj, "isActive", true); // returns {isActive: true}
     * 
     */
    const pop = (obj) => {
        var output;

        if (isObj$1(obj)) {
            if(!isEmpty(obj)){
                var keys = Object.keys(obj);
                var lastKeyIndex = keys.length - 1;
                var lastKey = keys[lastKeyIndex];
                output = obj[lastKey];
                delete obj[lastKey];
            }
        }

        return output;
    };

    /**
     * @todo
     * add merge
     * add propObj
     */

    /**
     * This module contains methods and functions that manipulates an object
     * @module Obj
     * @since v1.0.0
     */
    const Obj = {
        entries: entries,
        extend: extend,
        forEach: forEach,
        includes: includes,
        indexOf: indexOf,
        isObj: isObj$1,
        isEmpty: isEmpty,
        keyAt: keyAt,
        keys: keys,
        pop: pop,
        push: push,
        remove: remove,
        set: set,
        toArray: toArray,
        toPropArray: toPropArray,
        toObj: toObj,
        valueAt: valueAt,
        valueOf: valueOf,
        values: values,
    };

    // register the Obj object as a module in the library
    var ToolJSModules = ToolJS$1.modules;
    ToolJSModules.Obj = Obj;

    /**
     * Converts an HTMLCollection or NodeList to an array of its elements
     * @param {HTMLCollection|NodeList} c An HTMLCollection or HTMLNodelist
     * @param {Array} [a] An array to store elements in
     * @private
     */
    const cToA = (c, a) => {
        // initialise the output array
        var elemArr = [];

        if(Array.isArray(c)){ elemArr = c; }
        else {
            if (c.length == 1) {
                // if there is only one element in the collection push that element to the array
                elemArr.push(c[0]);
            }
            else if (c.length > 1) {
                // if there are more than one element in the collection push each to the array
                for (let x = 0; x < c.length; x++) { elemArr.push(c[x]); }
            }
            else if (c.length == undefined) { elemArr.push(c); }
        }

        if (a) {
            elemArr.forEach(currVal => {
                // foreach node in the elemArr that is not in the given output array, push it in
                if (a.indexOf(currVal) == -1) { a.push(currVal); }
            });
        }
        else {
            return elemArr;
        }
    };

    /**
     * Defines a set of methods for logging out messages
     * @private
     */
    const Logs$1 = {
        log: (msg) => { console.log(msg); },
        warn: (msg) => { console.warn(msg); },
        error: (msg) => { console.error(msg); },
        debug: (msg) => { console.debug(msg); },
        info: (msg) => { console.info(msg); },
        throw: (msg) => { throw new Error(msg) },
    };

    /**
     * Gets an element of a collection of elements from the DOM
     * @param {String|Array|HTMLCollection|NodeList} selector element to get
     * @param {String|HTMLElement|HTMLCollection|NodeList} [from=document] where to get the elemet
     * @returns {Object|HTMLElement} an element or an object of elements
     * @private
     */
    const getElement = (selector, from) => {
         // declare used variable
        var elemArr = [], elemCollection, returnVal, scope,
            err3 = "Selector must be either a valid css selector or an HTML element or collection";
        var debugging = ToolJS$1.env.debugging;

        if(from){
            if (typeof from == "object" && !Obj.isObj(from)) {
                scope = from;
            }
            else if(typeof from == "string"){
                scope = document.querySelectorAll(from);
                scope = (scope.length == 1) ? scope[0] : scope;
            }
            else {
                if(debugging){ Logs$1.throw("The 'from' paramter must either hold a reference to a DOM element or a valid css selector string"); }        }
        } else { scope = document; }

        if(selector){
            if (ToolJSNodeList.prototype.isPrototypeOf(selector)){ elemArr = selector; }
            else {
                if(Array.isArray(selector)){
                    selector.forEach(currSelector => {
                        if (typeof currSelector == "object" && !Obj.isObj(currSelector)) { cToA(currSelector, elemArr); }
                        else if (typeof currSelector == "string") { _selectorIsString(currSelector); }
                        else { if (debugging) Logs$1.throw(err3); }
                    });
                }
                else if( typeof selector == "object" && !Obj.isObj(selector) ){ cToA(selector, elemArr); }
                else if( typeof selector == "string"){ _selectorIsString(selector); }
                else { if(debugging) Logs$1.throw(err3); }
            }
        }

        function _selectorIsString(string) {
            var elements = scope.querySelectorAll(string);
            if (elements.length == 0) {
                Logs$1.warn(`The selector '${string}' did not match any element in the DOM, or was specified under the wrong parent`);
            } else { cToA(elements, elemArr); }
        }

        elemCollection = new ToolJSNodeList(elemArr);
        elemArr.forEach(element => { elemCollection.push(element); });
        returnVal = (elemCollection.length == 1) ? elemCollection[0] : elemCollection;

        return returnVal;
    };

    /**
     * manipulates an array of elements or a single element
     * @param {Array|HTMLElement|Object} elem The element(s) to manipulate
     * @param {string} options A key to pair value object of manipulation options
     * @private
     */
    const manipulate$1 = (elem, options) => {
        // check if error logging is enabled
        var debugging = ToolJS$1.env.debugging;
        // get the DOM methods
        var domMethods = ToolJS$1.export("DOM");
        var elements = (Array.isArray(elem)) ? [...elem] : [elem];

        // check option parameter type
        if (!Obj.isObj(options) && debugging) {
            Logs$1.throw("Options must be a key to pair value object");
        }

        function actions(elem) {
            var sibling;

            Obj.forEach(options, function (property, value) {
                if (property == "appendTo") {
                    parent = getElement(value);
                    parent.appendChild(elem);
                }
                else if (property == "insertBefore") {
                    sibling = getElement(value);
                    parent = sibling.parentElement;
                    parent.insertBefore(elem, sibling);
                }
                else if (property == "insertAfter") {
                    sibling = getElement(value);
                    sibling.insertAdjacentElement("afterend", elem);
                }
                else if (property == "classList") {
                    if (Obj.isObj(value)) {
                        if (value.add) { domMethods.addClass(el, value); }
                        if (value.remove) { domMethods.removeClass(el, value); }
                    }
                }
                else if (property == "siblings") {
                    var currSibling, parent = elem.parentElement;
                    if(Obj.isObj(value)){
                        Obj.forEach(value, (key, val) => {
                            if (key == "next") { currSibling = elem.nextElementSibling; }
                            else if (key == "prev") { currSibling = elem.previousElementSibling; }
                            else { currSibling = parent.querySelector(key); }

                            if (currSibling != undefined) { manipulate$1(currSibling, val); }
                            else {
                                var parentChildren = parent.children;
                                for (let i = 0; i < parentChildren.length; i++) {
                                    const currChild = parentChildren[i];
                                    if (!elem.isSameNode(currChild)) { manipulate$1(currChild, value); }
                                }
                            }
                        });
                    }
                }
                else if (property == "create") {
                    if(Obj.isObj(value)){
                        Obj.forEach(value, (tag, opt) => {
                            var newEl = domMethods.createEl(tag, opt);
                            elem.appendChild(newEl);
                        });
                    }
                }
                else if (property == "move") { domMethods.moveEl(elem, value); }
                else if (property == "style") { domMethods.styleEl(elem, value); }
                else if (property == "css") { domMethods.css(elem, value); }
                else if (property == "attr") { domMethods.attr(elem, value); }
                else if (property == "events") { domMethods.on(elem, value); }
                else if (property == "removeChild") { domMethods.removeChild(elem, value); }
                else if (property == "children") { domMethods.childrenEl(elem, value); }
                else {
                    elem[property] = value;
                }
            });
        }

        // loop through the elements and manipulate them
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            var b = actions(el);
        }
    };

    /**
     * Deep spread all the content of a spread parameter into a new array
     * @param {Array} arr The spread parameter
     * @param {String} type The data type
     * @param {String} [msg] The optional error message
     * @private
     */
    const spreadToArr = (arr, type, msg, debugging) => {
        var output = [];

        function checkType(value, type){ return typeof value === type; }
        
        arr.forEach(curr => {
            if (Array.isArray(curr)) {
                curr.forEach(currVal => {
                    if (checkType(currVal, type)) { output.push(currVal); }
                    else { if (debugging) Logs$1.warn(msg); }
                });
            }
            else if (checkType(curr, type)) { output.push(curr); }
            else { if (debugging) Logs$1.warn(msg); }
        });

        return output;
    };

    /**
     * ToolJSNodeList returns an array which holds the elements of a DOM fetched using {@link module:DOM.getEl} method.
     * It registers all available method in the DOM module to each element in that array. It also registers a new the DOM methods to the array instance itself
     * @memberof module:DOM
     */
    function ToolJSNodeList(arr) {
        // get the DOM methods
        var domMethods = ToolJS$1.export("DOM");
        var excludeMethods = ["createEl", "createText", "isCollection", "isNodeList", "isEl"];

        // register a new set of prototypes to the collection
        Obj.forEach(domMethods, (method, func) => {
            if(!excludeMethods.includes(method)){
                ToolJSNodeList.prototype[method] = function (...args) {
                    return func(arr, ...args);
                };
            }
        });

        return this;
    }

    ToolJSNodeList.prototype = Object.create(Array.prototype);

    /**
     * This method checks if a variable is a plain object literal
     * @method module:Obj.isObj
     * @param {Object} obj The variable to test for if its an object literal
     * @returns {Boolean} The result of the test
     * @example
     * var myObj = {
     *     Name: "John Doe",
     *     Age: "25",
     *     Gender: "Male"
     * };
     * Obj.isObj(myObj) // returns true;
     * 
     * var myElem = DOM.getEl("p");
     * Obj.isObj(myElem) // returns false;
     * 
     * var arr = ["item1", "item2"];
     * 
     * console.log(typeof arr === "object");
     * // the above code will return "true", because all Arrays in javascript are objects. 
     * // but this is not an object literal
     * 
     * // This will check if its actaully an array or a plain object
     * Obj.isObj(arr) // returns false;
     */
    const isObj$2 = (obj) => {
        return (typeof obj !== "undefined" && obj !== null && obj.constructor === Object && typeof obj === 'object' && !Array.isArray(obj) && toString.call(obj) == "[object Object]");
    };

    /**
     * This method checks if an item or variable is a string or an instance of the string itemect
     * @method module:Str.isString
     * @param {*} item The item or variable to be checked.
     * @returns {Boolean} The result of the check
     * @example
     * var numberItem = 50
     *
     * var stringItem = "ToolJS Rocks";
     * 
     * Str.isString(numberItem); // returns false
     * Str.isString(stringItem); // returns true
     */
    const isString = (item) => {
        return ( typeof item !== "undefined" && item !== null && typeof item === "string" );
    };

    // import deps module

    /**
     * Gets and returns an element or a collection of elements(if more than one elememt is found) from the DOM
     * @method module:DOM.getEl
     * @param {String|HTMLElement|Array<string|HTMLElement>} el 
     * Could be a valid css selector string, an html element, 
     * a collection of elements or an array of css selector strings and html elments
     * @param {String|HTMLElement|Object} [from=document]
     * A location(i.e an element) in the DOM where the element can be found.
     * Could be a valid css selector string, or an html element.
     * If passed an object, that object is considered to be manipulation options
     * @param {ToolJSNodeListManipulator} [options] An key to pair object that manipulates the element(s) returned
     * @returns {HTMLElement|Object} an html element or a collection of elements
     * @example
     * // returns a "div" element from the document
     * var myDiv = DOM.getEl("div");
     * 
     * // returns a "p" element from myDiv element
     * var p = DOM.getEl("p", myDiv);
     * 
     * // returns a "p" element from myDiv element and manipulates it
     * var p = DOM.getEl("p", myDiv, {
     *     className: "myParagraph",
     *     id: "para1",
     *     title: "This is a paragraph"
     * });
     * 
     * // returns a "p" element and manipulates it
     * var p = DOM.getEl("p", {
     *     className: "myParagraph",
     *     id: "para1",
     *     title: "This is a paragraph"
     * });
     */
    const getEl = (el, from, options) => {
        var optionsObj, scope;

        if(!el && debugging) Logs.throw("Specify an element to get or a valid css selector representing an element");

        // resolve the option param
        if (isObj$2(from)) {
            optionsObj = from;
            scope = document;
        }
        else { scope = from; }

        if(isObj$2(options)){ optionsObj = options; }
        // get the element
        var elem = getElement(el, scope);
        
        // manipulate if options are available
        if (isObj$2(optionsObj)) {
            manipulate$1(elem, optionsObj);
        }
        
        var output = getElement(el, scope);
        return output;
    };

    /**
     * Styles an element or an array of element using the some css style string
     * @method module:DOM.css
     * @param {String|Array<String|HTMLElement>|HTMLElement} el
     * A valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elments
     * @param {String|Array<String>} value a css style string or an array of css style string
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
     * @returns {HTMLElement|Object} an html element or a collection of elements
     * @example
     * // changes all "p" elements color to red and font size to 40px
     * DOM.css("p", "color: red; font-size: 40px;");
     * 
     * // changes all "p", "h2" elements color to red
     * DOM.css(["p", "h2"], "color: red");
     * 
     * // changes all "p" elements color to red and font size to 40px
     * DOM.css("p", ["color: red", "font-size: 40px"]);
     */
    const css = (el, value, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        // get the elements and store in an array

        if(!el && debugging) Logs$1.throw("Specify an element to apply css rules too");
        
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _css(el); });

        function _css(el) {
            if (isString(value)) {
                el.style.cssText += value;
            }
            else if (Array.isArray(value)) {
                value.forEach(currValue => {
                    el.style.cssText += currValue;
                });
            }
            else if (!isObj$1(value)) {
                if (debugging) Logs$1.throw("Value must either be a string or an array of strings. You can alternatively pass it an object literal to manipulate the element");
            }
        }

        // manipulate if options are available
        if (isObj$1(options)) {
            manipulate$1(elemArr, options);
        }
        return elem;
    };

    /**
     * Styles an element or an array of element using the some css style properties.
     * @method module:DOM.styleEl
     * @param {String|Array<String|HTMLElement>|HTMLElement} el
     * A valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elments
     * @param {Object|String|Array<String>} props
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned.
     * @returns {HTMLElement|Object} an html element or a collection of elements
     * @example
     * // gives all "p" element a color of red and a fontsize of 30px
     * DOM.styleEl("p", {
     *     color: "red",
     *     fontSize: "30px"
     * });
     * 
     * // styles all "h3" and "p" elements with the following giving parameters
     * DOM.styleEl(["h3", "p"], {
     *     color: "red",
     *     fontSize: "30px"
     * });
     */
    const styleEl = (el, props, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;

        if(!el && debugging) Logs$1.throw("Specify an element to be styled");

        // get the elements and store in an array
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _style(el); });

        /* if the props paramter holds a string, 
        then return the value of the style property that corresponds with the string */
        function _style(el) {
            if(Obj.isObj(props)){
                Obj.forEach(props, (property, value) => {
                    el.style[property] = value;
                });
            }
            else { if(debugging){ Logs$1.throw("The props parameter must be an object literal"); } }
        }

        // manipulate if options are available
        if (options != null) {
            manipulate$1(elem, options);
        }

        return getElement(el);
    };

    /**
     * This method returns the character at the specified index, and returns and empty string if the index does not exist
     * @method module:Str.charAt
     * @param {String} str The string to make the search on.
     * @param {Number} index An integer representing the index of the character to be returned
     * @returns {String} The character at the specified index
     * @example
     * var myString = "ToolJS Rocks";
     * 
     * Str.charAt(myString, 7); // returns "R";
     * Str.charAt(myString, 13); // returns ""
     */
    const charAt = (str, index) => {
        if (isString(str)) {
            str = str.trim();
            
            return str.charAt(index);
        }
    };

    /**
     * This method returns the first character of a given string
     * @method module:Str.firstChar
     * @param {String} str The string to make the search on.
     * @returns {String} The resultant character
     * @example
     * var myString = "ToolJS Rocks";
     * 
     * Str.firstChar(myString); // returns "T";
     */
    const firstChar = (str) => {
        if (isString(str)) {
            str = str.trim();
            return str.charAt(0);
        }
    };

    /**
     * This method returns the last character of a given string
     * @method module:Str.lastChar
     * @param {String} str The string to make the search on.
     * @returns {String} The resultant character
     * @example
     * var myString = "ToolJS Rocks";
     * 
     * Str.lastChar(myString); // returns "s";
     */
    const lastChar = (str) => {
        if (isString(str)) {
            str = str.trim();
            var lastIndex = str.length - 1;
            return str.charAt(lastIndex);
        }
    };

    /**
     * This method returns a given string with its first character converted to uppercase.
     * To convert the first character of each word in a string use the [.capitalize()]{@link module:Str.capitalize} method
     * @method module:Str.firstToUpper
     * @param {String} str The string whose first character is to be converted
     * @returns {String} The converted string
     * @example
     * var myString = "toolJS";
     * var myString2 = "toolJS is awesome";
     * 
     * Str.firstToUpper(myString); // returns "ToolJS";
     * Str.firstToUpper(myString2, 13); // returns "ToolJS is awesome"
     */
    const firstToUpper = (str) => {
        var firstChar, newWord;

        if (isString(str)) {
            str = str.trim();
            
            firstChar = str.charAt(0);
            var newFirstChar = firstChar.toUpperCase();
            newWord = str.replace(firstChar, newFirstChar);

            return newWord;
        }
    };

    /**
     * This method returns a given string with its first character converted to lowercase.
     * @method module:Str.firstToLower
     * @param {String} str The string whose first character is to be converted
     * @returns {String} The converted string
     * @example
     * var myString = "ToolJS";
     * var myString2 = "ToolJS is Awesome";
     * 
     * Str.firstToLower(myString); // returns "toolJS";
     * Str.firstToLower(myString2, 13); // returns "toolJS is Awesome"
     */
    const firstToLower = (str) => {
        var firstChar, newWord;

        if (isString(str)) {
            str = str.trim();
            
            firstChar = str.charAt(0);
            var newFirstChar = firstChar.toLowerCase();
            newWord = str.replace(firstChar, newFirstChar);

            return newWord;
        }
    };

    /**
     * This method returns a camel cased version of a given string
     * @method module:Str.camelCase
     * @param {String} str The string whose camel case version is to be returned
     * @returns {String} The camel cased string
     * @example
     * var myString = "ToolJS Rocks";
     * 
     * Str.camelCase(myString); // returns "tooljsRocks";
     */
    const camelCase = (str) => {
        var camelCased = [], output, delimeter = " ";

        if(isString(str)){
            str = str.trim();
            str = str.replace(/_|-|'|"| /g, delimeter);
            var words = str.split(delimeter);

            for (let i = 0; i < words.length; i++) {
                const currWord = words[i];

                if(i == 0){
                    var newWord = firstToLower(currWord);
                    camelCased.push(newWord);
                }
                else {
                    var newWord = firstToUpper(currWord);
                    camelCased.push(newWord);
                }
            }
        }

        output = camelCased.join("");

        return output;
    };

    /**
     * This method capitalizez a given string. It converts the first character of each word to uppercase.
     * @method module:Str.capitalize
     * @param {String} str The string to be capitalized.
     * @returns {String} The capitalized string
     * @example
     * var myString = "toolJS is awesome and it rocks";
     * 
     * Str.capitalize(myString); // returns "ToolJS Is Awesome And It Rocks";
     */
    const capitalize = (str) => {
        var capitalized = [], output;

        if(isString(str)){
            str = str.trim();
            var words = str.split(" ");

            for (let i = 0; i < words.length; i++) {
                const currWord = words[i];
                var newWord = firstToUpper(currWord);
                capitalized.push(newWord);
            }
        }

        output = capitalized.join(" ");

        return output;
    };

    /**
     * This method returns a slugified string from a reference string.
     * @method module:Str.slugify
     * @param {String} str The string to be slugified
     * @returns {String} The slugified string
     * @example
     * var myString = "ToolJS Rocks, you should think of using it too";
     * 
     * Str.slugify(myString); // returns "toolJS-rocks-you-should-think-of-using-it-too";
     */
    const slugify = (str) => {
        var slugified = [], output, delimeter = " ";

        if(isString(str)){
            str = str.trim();
            str = str.replace(/,/g, "");
            str = str.replace(/_|-|'|"|,| /g, delimeter);
            var words = str.split(delimeter);

            for (let i = 0; i < words.length; i++) {
                const currWord = words[i];
                var newWord = firstToLower(currWord);
                slugified.push(newWord);
            }
        }

        output = slugified.join("-");

        return output;
    };

    /**
     * This method converts a string to lowercase, separating each word by a space.
     * @method module:Str.lowerCase
     * @param {String} str The string to be to converted lowecase
     * @returns {String} The converted string
     * @example
     * var myString = "toolJS_is_an-awesome-library, try it out";
     * 
     * Str.lowerCase(myString); // returns "tooljs is an awesome library, try it out";
     */
    const lowerCase = (str) => {
        var output, delimeter = " ";

        if (isString(str)) {
            str = str.trim();
            str = str.replace(/_|-| /g, delimeter);
            output = str.toLowerCase();
        }

        return output;
    };

    /**
     * This method converts a string to uppercase, separating each word by a space.
     * @method module:Str.upperCase
     * @param {String} str The string to be converted to uppercase
     * @returns {String} The converted string
     * @example
     * var myString = "toolJS_is_an-awesome-library, try it out";
     * 
     * Str.upperCase(myString); // returns "TOOLJS IS AN AWESOME LIBRARY, TRY IT OUT";
     */
    const upperCase = (str) => {
        var delimeter = " ";

        if(isString(str)){
            str = str.trim();
            str = str.replace(/_|-| /g, delimeter);
            return str.toUpperCase();
        }
    };

    /**
     * This method converts a string to tolower.
     * @method module:Str.toLower
     * @param {String} str The string to be converted to lowercase
     * @returns {String} The converted string
     * @example
     * var myString = "ToolJS_IS_an-Awesome-library, TRY IT OUT";
     * 
     * Str.toLower(myString); // returns "tooljs_is_an-awesome-library, try it out";
     */
    const toLower = (str) => {
        if (isString(str)) {
            str = str.trim();
            return str.toLowerCase();
        }
    };

    /**
     * This method converts a string to uppercase.
     * @method module:Str.toUpper
     * @param {String} str The string to be converted to uppercase
     * @returns {String} The converted string
     * @example
     * var myString = "toolJS_is_an-awesome-library, try it out";
     * 
     * Str.toUpper(myString); // returns "TOOLJS_IS_AN-AWESOME-LIBRARY, TRY IT OUT";
     */
    const toUpper = (str) => {
        if (isString(str)) {
            str = str.trim();
            return str.toUpperCase();
        }
    };

    /**
     * This method returns an array containing each word in a string or an array of strings.
     * @method module:Str.words
     * @param {String|Array<String>} strings The string whose words are to be returned. Could be an array of strings.
     * @returns {Array} An array of the words found in the string(s).
     * @example
     * var myString = "This is the first sentence";
     * var mySecondString = "This is second sentence";
     * 
     * Str.words(myString); // returns ["This", "is", "the", "first", "sentence"]
     * Str.words(myString, mySecondString);
     * // returns ["This", "is", "the", "first", "sentence", "This", "is", "second", "sentence"]);
     */
    const words = (...strings) => {
        var debugging = ToolJS$1.env.debugging;
        var strArray, output = [];
        var err = "The str parameter must hold only strings or an array of strings";

        strArray = spreadToArr(strings, "string", err, debugging);

        strArray.forEach(currStr => {
            currStr = currStr.trim();
            // currStr = currStr.replace(/[^A-Za-z0-9]+/g, " ");
            currStr = currStr.replace(/[^A-Za-z0-9$]+/g, " ");
            var newArr = currStr.split(" ");
            output = output.concat(newArr);
        });
        
        return output;
    };

    /**
     * This method returns a string repeated n number of times
     * @method module:Str.repeat
     * @param {String} str The string to be repeated.
     * @param {Number} [count=1] The number of times the original string value should be repeated in the new string. This is optional
     * @param {String|Array<String>} [substr] An optional parameter to specify a particular substring to be repeated in the main string. Could be an array of strings
     * @returns {String} A new string containing copies of the original string
     * @example
     * var myString = "ToolJS";
     * var myString2 = "This is the first sentence";
     * 
     * Str.repeat(myString); // returns "ToolJSToolJS";
     * Str.repeat(myString2, 3, "the"); // returns "This is thethethe first sentence";
     */
    const repeat = (str, count = 1, substr) => {
        var debugging = ToolJS$1.env.debugging;
        var output;

        if (isString(str)) {
            if(substr){
                if (Array.isArray(substr)) {
                    substr.forEach(currSubStr => {
                        var newSubStr = currSubStr.repeat(count);
                        output = str.replace(currSubStr, newSubStr);
                    });
                }
                else if(isString(substr)){
                    var newSubStr = substr.repeat(count);
                    output = str.replace(substr, newSubStr);
                }
                else { if(debugging) Logs$1.warn("The substring parameter must either be a string or an array of strings"); }
            }
            else { output = str.repeat(count); }

            return output;
        }
    };

    /**
     * This method checks to see if a given string ends with a particular substring. This is a case-sensitive method
     * @method module:Str.endsWith
     * @param {String} str The string reference to make the search on.
     * @param {String} target The target string to check for
     * @param {Number} [endpos=str.length] The position to which the search is ended in the reference string length. Default(str.length)
     * @returns {Boolean} The result of the test
     * @example
     * var myString = "ToolJS Rocks";
     * 
     * Str.endsWith(myString, "Rocks"); // returns true
     * Str.endsWith(myString, "R", 8); // returns true
     */
    const endsWith = (str, target, endpos) => {
        var newString, result;
        endpos = (endpos) ? endpos : str.length;

        if (isString(str)) {
            newString = str.substring(0, endpos);
            result = newString.endsWith(target);
            return result;
        }
    };

    /**
     * This method checks to see if a given string begins with a particular substring. This is a case-sensitive method
     * @method module:Str.startsWith
     * @param {String} str The string reference to make the search on.
     * @param {String} target The target string to check for
     * @param {Number} [startpos=0] The position to which the search is started in the reference string length. Default(0)
     * @returns {Boolean} The result of the test
     * @example
     * var myString = "ToolJS Rocks";
     * 
     * Str.startsWith(myString, "ToolJS"); // returns true
     * Str.startsWith(myString, "R", 7); // returns true
     */
    const startsWith = (str, target, startpos) => {
        var newString, result;
        startpos = (startpos) ? startpos : 0;

        if (isString(str)) {
            newString = str.substring(startpos, str.length);
            result = (0 === newString.indexOf(target));
            return result;
        }
    };

    /**
     * This method scans through a reference string for matches to a specified string, replaces them with a new string and returns a new string.
     * @method module:Str.replace
     * @param {String} str The reference string to scanned and modified
     * @param {String|Regexp|Array<String>} pattern The string to be replaced. Could be a single string, an array of strings or just a regexp.
     * @param {String} replacement The replacement string to be used.
     * @returns {String} A new string with the replacements.
     * @example
     * var myString = "This is the first sentence";
     * 
     * Str.replace(myString, "first", "second"); // returns "This is the second sentence"
     * Str.replace(myString, /th/ig, "blabla"); // returns "blablais is blabla second sentence"
     */
    const replace = (str, pattern, replacement) => {
        var debugging = ToolJS$1.env.debugging;
        var output;

        if (!str || !pattern || !replacement){
            if(debugging) Logs$1.warn("The replace method requires a string, pattern and a replacement parameter");
            return;
        }

        if(isString(str)){
            if (pattern && replacement) {
                if (Array.isArray(pattern)) {
                    pattern.forEach(currPattern => {
                        output = str.replace(currPattern, replacement);
                    });
                }
                else {
                    output = str.replace(pattern, replacement);
                }
            }

            return output;
        }

    };

    /**
     * This method removes leading and trialing whitespaces of a string, if the deep parameter is set to true, then it also removes extra whitespace between the string characters.
     * @method module:Str.trim
     * @param {String} str The string to be trimmed.
     * @param {Boolean} [deep=false] Determines whether to do a deep trim on the string.
     * @param {Boolean} [char=" "] Specifies which character is to be trimmed off. Default value(" ");
     * @returns {String} The trimmed string.
     * @example
     * var myString = "   ToolJS    Rocks    ";
     * var myString2 = " The extra   whitespaces within   this    string   will   be removed";
     * 
     * Str.trim(myString); // returns "ToolJS    Rocks";
     * Str.trim(myString2, true); // returns "The extra whitespaces within this string will be removed"
     */
    const trim = (str, deep = false, char) => {
        var output;

        if (isString(str)) {
            if(char){ output = _charTrim(str); }
            else { output = _simpleTrim(str); }
            return output;
        }

        function noEmpty(arr) { return arr !== ""; }

        function _simpleTrim(str) {
            var trimmed = str.trim();
            
            if (deep) {
                var strSplit = trimmed.split(" ");
                var newArr = strSplit.filter(noEmpty);
                trimmed = newArr.join(" ");
            }

            return trimmed;
        }

        function _charTrim(str) {
            var trimmed;

            if(Array.isArray(char)){
                char.forEach(currChar => {
                    str = _startTrim(str, currChar);
                    trimmed = str;
                });
            }
            else if (isString(char)) {
                trimmed = _startTrim(str, char);
            }

            function _startTrim(str, char) {
                var trimmed;
                str = _simpleTrim(str);

                if (deep) {
                    var strSplit = str.split(char);
                    var newArr = strSplit.filter(noEmpty);
                    trimmed = newArr.join(" ");
                }
                else {
                    if (startsWith(str, char)) { str = str.replace(char, ""); }
                    if (endsWith(str, char)) {
                        var lastIndex = str.lastIndexOf(char) - 1;
                        str = str.slice(0, lastIndex);
                    }

                    trimmed = str;
                }

                trimmed = _simpleTrim(trimmed);

                return trimmed;
            }

            return trimmed;
        }
    };

    /**
     * This method checks to see if a string is in uppercase or not.
     * @method module:Str.isUpper
     * @param {String} str The string to be checked
     * @returns {Boolean} The result of the check
     * @example
     * var myString = "i am NOT in uPPercCAse";
     * 
     * Str.isUpper(myString); // returns false;
     * Str.isUpper("I AM IN UPPERCASE"); // returns true;
     */
    const isUpper = (str) => {
        if (isString(str)) {
            str = str.trim();
            var toUpper = str.toUpperCase();
            return (str === toUpper);
        }
    };

    /**
     * This method checks to see if a string is in lowercase or not.
     * @method module:Str.isLower
     * @param {String} str The string to be checked
     * @returns {Boolean} The result of the check
     * @example
     * var myString = "i am NOT in LowercCAse";
     * 
     * Str.isLower(myString); // returns false;
     * Str.isLower("i am in lowercase"); // returns true;
     */
    const isLower = (str) => {
        if (isString(str)) {
            str = str.trim();
            var toLower = str.toLowerCase();
            return (str === toLower);
        }
    };

    /**
     * This method toggles an uppercase string to lowercase and vise versa. If the original string is not in either upper or lower case, then the no conversion is made. 
     * @method module:Str.toggleCase
     * @param {String} str The string to be toggled
     * @returns {String} The new string
     * @example
     * Str.toggleCase("i am in lowercase"); // returns "I AM IN LOWERCASE";
     * Str.toggleCase("I AM IN UPPERCASE"); // returns "i am in uppercase";
     */
    const toggleCase = (str) => {
        var output;

        if (isString(str)) {
            str = str.trim();
            if (isUpper(str)){ output = str.toLowerCase(); }
            else if (isLower(str)){ output = str.toUpperCase(); }
        }

        return output;
    };

    /**
     * This method converts a non-string value or item to a string and returns it.
     * @method module:Str.toString
     * @param {String} value The to be converted to a string.
     * @returns {String} The new string.
     * @example
     * 
     * Str.toString(45); // returns "45";
     */
    const toString$1 = (value) => {
        var debugging = ToolJS$1.env.debugging;
        var output;

        if (!isString(value)) { output = String(value); return output; }
    };

    /**
     * This method converts a given string to a hashtag string.
     * @method module:Str.toHashTag
     * @param {String} str The string to be converted.
     * @param {Boolean} [toUpper=false] Determines whether the hashtag string should be made uppercase. Default value(false) .
     * @returns {String} The hashtagged string
     * @example
     * var myString = "Black Lives Matter";
     * var myString2 = "toolJS is awesome";
     * 
     * Str.toHashTag(myString, true); // returns "#BLACKLIVESMATTER";
     * Str.toHashTag(myString2); // returns "#ToolJSIsAwesome"
     */
    const toHashTag = (str, toUpper) => {
        var output, newString;

        if (isString(str)) {
            str = str.trim();
            newString = firstToUpper(camelCase(str));
            output = `#${newString}`;
            output = (toUpper == true) ? output.toUpperCase() : output;

            return output;
        }
    };

    /**
     * This method generates a random string in accordance to a set of options, and returns the string. Note that the min and max numbers are inclusive when generating integers.
     * @method module:Str.random
     * @param {Object} [options] An object that controls how the random string is generated.
     * @param {Boolean} [options.alphanumeric=false] Tells the method to generate an alphanumeric string.
     * @param {Boolean} [options.string=true] Tells the method to generate only strings.
     * @param {Boolean} [options.integer=false] Tells the method to generate only integers.
     * @param {Boolean} [options.characters] A string or characters to be used when generating string or alphanumeric randoms.
     * @param {String} [options.casing="lowecase"] Specifies the casing of the generated string. Either "lowercase" or "uppercase".
     * @param {Number} [options.length=10] Specifies the length of the generated string.
     * @param {Number} [options.min=0] The min value of the range. This is only used when integer is set to true.
     * @param {Number} [options.max=100] The max value of the range. This is only used when integer is set to true.
     * @param {Boolean} [options.round=true] This determines if the value returned should be rounded.
     * @param {Number} [options.decimals=3] If the round option is set to false, then this sets the number of decimal places to round to.
     * @returns {String} The random string generated.
     * @example
     * 
     * var value = Str.random(); // returns a random string
     * 
     * var value = Str.random({
     *      casing: "uppercase",
     *      length: 5,
     *      alphanumeric: true,
     * }); // returns a random alphanumeric string 5 characters long in uppercase
     */
    const random = (options) => {
        var debugging = ToolJS$1.env.debugging;
        var output, min = 0, max = 100, round = true, decimals = 3, casing = "lowercase",
            length = 10, string = true, integer = false, alphanumeric = false,
            characters = "abcdefghijklmnopqrstuvwxyz";

        if (isObj$1(options)){
            min = (typeof options.min === "number") ? options.min : min;
            max = (typeof options.max === "number") ? options.max : max;
            round = (typeof options.round === "boolean") ? options.round : round;
            casing = (typeof options.casing === "string") ? options.casing : casing;
            string = (typeof options.string === "boolean") ? options.string : string;
            length = (typeof options.length === "number") ? options.length : length;
            integer = (typeof options.integer === "boolean") ? options.integer : integer;
            decimals = (typeof options.decimals === "number") ? options.decimals : decimals;
            characters = (typeof options.characters === "string") ? options.characters : characters;
            alphanumeric = (typeof options.alphanumeric === "boolean") ? options.alphanumeric : alphanumeric;
        }

        function _random() {
            var text, num, result;

            if (alphanumeric === true){
                // text = Math.random().toString(36).replace('0.', '');
                text = Math.random().toString(20).substr(2, length);

                var first = text.charAt(0);
                var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

                if (digits.includes(first)) {
                    var index = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
                    characters = characters.split("");
                    var newAlpha = characters[index];
                    text = text.replace(first, newAlpha);
                }
            }
            else if (integer === true) {
                if (round == true) { num = Math.floor(Math.random() * (max - min + 1)) + min; }
                else {
                    num = Math.random() * (max - min + 1) + min;
                    num = num.toFixed(decimals);
                }
            }
            else if(string == true){
                var toArray = characters.split("");
                text = "";

                for (var i = 0; i < length; i++) {
                    index = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
                    text += toArray[index];
                }
            }
            else if (integer == false && string == false) {
                if (debugging) Logs$1.throw("One of either integer or string must be set to 'true'");
            }

            if(text){
                if (casing == "uppercase") { text = text.toUpperCase(); }
                else if (casing == "lowercase") { text = text.toLowerCase(); }
                result = text;
            }
            else if(num){ result = num; }

            return result;
        }

        output = _random();
        return output;
    };

    /**
     * This method concatenates two(2) or more strings and returns a new string.
     * @method module:Str.concat
     * @param {Array<String>} strings The strings to be concatenated together. Could be an array of strings
     * @returns {String} The new string.
     * @example
     * 
     * var string1 = "John Doe ";
     * var string2 = "and i am 20yrs old.";
     * 
     * Str.concat(["My ", "Name ", "is "], string1, string2, "I ", ["am", " a programmer"]);
     * // returns "My Name is John Doe and i am 20yrs old. I am a programmer"
     * 
     * Str.concat(string1, string2);
     * // returns "John Doe and i am 20yrs old."
     * 
     * Str.concat([string1, string2]);
     * // returns "John Doe and i am 20yrs old."
     */
    const concat = (...strings) => {
        var debugging = ToolJS$1.env.debugging;
        var output = "", strArr, err = "All parameters must be of type string";
        strArr = spreadToArr(strings, "string", err, debugging);

        for (let currStr of strArr) {
            if (isString(currStr)) { output = output.concat(currStr); }
            else { if (debugging) Logs$1.warn(""); }
        }

        return output;
    };

    /**
     * This method joins two(2) or more strings together using a given delimeter.
     * @method module:Str.joinBy
     * @param {String|Number} delimeter The character to join the strings together with.
     * @param {String|Array<String>} strings The strings to join. Could be an array of strings.
     * @param {String} [strings] More strings to join.
     * @returns {String} The new string.
     * @example
     * 
     * var string1 = "John Doe";
     * var string2 = "and i am 20yrs old.";
     * 
     * Str.joinBy("_", ["My", "Name", "is"], string1, string2);
     * // returns "My_Name_is_John Doe_and i am 20yrs old"
     * 
     * Str.joinBy(" | ", "String", "Number", "Array", "Boolean");
     * // returns "Strings | Number | Arrary | Boolean"
     */
    const joinBy = (delimeter, ...strings) => {
        var debugging = ToolJS$1.env.debugging;
        var output = "", strArr, err = "All parameters must be of type string";
        strArr = spreadToArr(strings, "string", err, debugging);

        if (delimeter) { output = strArr.join(delimeter); }
        else { Logs$1.throw("The joinBy method requires a delimeter for joining"); }
        return output;
    };

    /**
     * This method checks if an item or variable is a number.
     * @method module:Num.isNum
     * @param {*} item The item or variable to be checked.
     * @returns {Boolean} The result of the check.
     * @example
     * var numberItem = 50
     * var stringItem = "ToolJS Rocks";
     * 
     * Num.isNum(numberItem); // returns true
     * Num.isNum(stringItem); // returns false
     */
    const isNum = (item) => {
        return (typeof item !== "undefined" && item !== null && typeof item === "number");
    };

    /**
     * This method counts the number of words presents in a string and returns the value.
     * @method module:Str.wordCount
     * @param {String} str The string to be counted.
     * @param {String|Number} [start=0] If passed a number, then the count will start at the index corresponding with the number.
     * But if passed a string, then the count will start at the first occurance of the string
     * @param {String|Number} [end=str.length] If passed a number, then the count will end at the index corresponding with the number.
     * But if passed a string, then the count will end at the last occurance of the string
     * @returns {Number} The result of the count
     * @example
     * var myString = "ToolJS Rocks";
     * var myString2 = "This is a longer string, but the count will start from the word 'but' and end at 'start'";
     * 
     * var out = Str.wordCount(myString); // returns 2
     * var out = Str.wordCount(myString, "Rocks"); // returns 1
     * var out = Str.wordCount(myString2, 24, 43); // returns 5
     * var out = Str.wordCount(myString2, "longer", "will"); // returns 6
     */
    const wordCount = (str, start = 0, end = str.length) => {
        var newString, result, startpos, endpos;
        
        if(start){
            if(isString(start)) { startpos = str.indexOf(start); }
            else if(isNum(start)) { startpos = start; }
        }
        
        if(end){
            if(isString(end)) { endpos = str.lastIndexOf(end) + end.length; }
            else if(isNum(end)) { endpos = end; }
        }

        newString = str.slice(startpos, endpos);
        result = words(newString).length;
        
        return result;
    };

    /**
     * This method creates an array of words split into groups the length of a specified size. Leftover words are placed in a single array.
     * @method module:Str.wordChunk
     * @param {String} str The string to be split into chunks of words.
     * @param {Number} size The size of each chunk of word.
     * @returns {Array<Array>} An array of chunks of words.
     * @example
     * var myString = "This is a long string, which will be split into chunks of words";
     * 
     * Str.wordChunk(myString, 4); 
     * // returns [["This" "is" "a" "long"], ["string", "which" "will" "be"], ["split", "into", "chunks", "of"], ["words"]]
     */
    const wordChunk = (str, size) => {
        var output = [], wordArr;

        if (isString(str) && isNum(size)) {
            str = str.trim();
            wordArr = words(str);
            
            while (wordArr.length) {
                var chunk = wordArr.slice(0, size);
                wordArr = wordArr.slice(size, wordArr.length);
                output.push(chunk);
            }

            return output;
        }
    };

    /**
     * This method truncates a given string to a given length and appends a given string at the end.
     * @method module:Str.truncate
     * @param {String} str The string to be truncated
     * @param {Object|Number} [options] An option object determines how the string is truncated. If passed a number then it represents the string limit.
     * @param {Number} [options.limit=30] The maximum length allowed for the truncated string.
     * @param {String} [options.replacement="..."] The replacement string to be appended at the end of the truncated string.
     * @param {String} [replacement="..."] The replacement string for the truncated string. This is used only when a number is passed to the preceeding parameter.
     * @returns {String} The truncated string.
     * @example
     * var myString = "This is a long string, which will be truncated into a shorter version";
     * 
     * Str.truncate(myString, 21, "[...]"); // returns "This is a long string[...]";
     */
    const truncate = (str, options, replacement = "...") => {
        var debugging = ToolJS$1.env.debugging;
        var output, limit = 30;

        if (isString(str)) {
            str = str.trim();
            output = _truncate(str);
        }

        function _truncate(str) {
            if (isObj$1(options)) {
                limit = (isNum(options.limit)) ? options.limit : limit;
                replacement = (isString(options.replacement)) ? options.replacement : replacement;
            }
            else if (isNum(options)){ limit = options; }
            else { if (debugging) Logs$1.warn("The options parameter should be an object or a number specifing the string length"); }

            return str.length > limit ? str.slice(0, limit) + replacement : str;
        }

        return output;
    };

    /**
     * This method reverses a string by its characters and returns it.
     * @method module:Str.reverse
     * @param {String} str The string to be reversed
     * @param {Boolean} [alt=false] This determines if the reverse should be done by words and not characters.
     * @returns {Boolean} The reversed string.
     * @example
     * var myString = "I will be reversed";
     * 
     * Str.reverse(myString); // returns "desrever eb lliw I";
     * Str.reverse(myString, true); // returns "reversed be will I";
     */
    const reverse = (str, alt = false) => {
        var output, toArray;

        if (isString(str)) {
            if(alt){
                toArray = str.split(" ");
                output = toArray.reverse();
                output = output.join(" ");
            }
            else {
                toArray = str.split("");
                output = toArray.reverse();
                output = output.join("");
            }
        }

        return output;
    };

    /**
     * This method shuffles the words of a string and returns a new string. It can alternatively shuffle the characters of the string.
     * @method module:Str.shuffle
     * @param {String} str The string to be shuffled
     * @param {Boolean} [alt=false] Tells the method to carry out the shuffle on characters of the string and not words.
     * @returns {String} The shuffled string.
     * @example
     * var myString = "I will be shuffled";
     * 
     * Str.shuffle(myString); // returns "desrever eb lliw I";
     * Str.shuffle(myString, true); // returns "shuffled be will I";
     */
    const shuffle = (str, alt = false) => {
        var output, toArray;
        var splitChar = (alt === true) ? "" : " ";

        if (isString(str)) {
            toArray = str.split(splitChar);
            toArray.sort(function () { return 0.5 - Math.random(); });
            output = toArray.join(splitChar);
            return output;
        }
    };

    /**
     * This method returns the longest word in a given string
     * @method module:Str.longest
     * @param {String} str The string whose longest word is to be returned.
     * @param {Boolean} [length=false] This tells the method to return the length of the longest word instead of the word itself.
     * @returns {String|Number} The longest word or the length of the longest word.
     * @example
     * var myString = "ToolJS is not the longest word is this string.";
     * 
     * Str.longest(myString); // returns "longest"
     * Str.longest(myString, true); // returns 7
     */
    const longest = (str, length) => {
        var output;

        if (isString(str)) {
            str = str.trim();
            var toWords = words(str);

            if(length){
                var wordLeng = toWords.map(currWord => currWord.length);
                output = Math.max(...wordLeng);
            }
            else {
                output = toWords.reduce((longest, curr) => {
                    return (longest.length >= curr.length) ? longest : curr;
                });
            }

            return output;
        }
    };

    /**
     * This method returns the shortest word in a given string
     * @method module:Str.shortest
     * @param {String} str The string whose shortest word is to be returned.
     * @param {Boolean} [length=false] This tells the method to return the length of the shortest word instead of the word itself.
     * @returns {String|Number} The shortest word or the length of the shortest word.
     * @example
     * var myString = "ToolJS is not the shortest word is this string.";
     * 
     * Str.shortest(myString); // returns "is"
     * Str.shortest(myString, true); // returns 2
     */
    const shortest = (str, length) => {
        var output;

        if (isString(str)) {
            str = str.trim();
            var toWords = words(str);

            if(length){
                var wordLeng = toWords.map(currWord => currWord.length);
                output = Math.min(...wordLeng);
            }
            else {
                output = toWords.reduce((shortest, curr) => {
                    return (shortest.length <= curr.length) ? shortest : curr;
                });
            }

            return output;
        }
    };

    // * The sort function works well, but still needs adjustment
    // ? should the sort type be numerical only?
    // TODO make the sort work numerically
    /**
     * This method sorts a given string using a set of default options(which can be overwritten), and returns the sorted string.
     * @method module:Str.sort
     * @param {String} str The string to be sorted.
     * @param {Object} [options] An options object that determines how to sort is carried out on the string.
     * @param {Object} [options.type="alphabetic"] The sort type. One of either "alphabetic", "numeric".
     * @param {Object} [options.order="asc"] The order of the sort. One of either "asc" or "desc".
     * @returns {String} The sorted string.
     * @example
     * var myString = "Apple 1Apple 1Banana Banana $100, 2 100";
     * 
     * Str.sort(myString); // returns "sort"
     * Str.sort(myString); // returns 7
     */
    const sort = (str, options) => {
        var output, toWords, type = "alphabetic", order = "asc";

        if (isString(str)) {
            str = str.trim();
            toWords = words(str);
            
            if (isObj$1(options)){
                type = (isString(options.type)) ? options.type : type;
                order = (isString(options.order)) ? options.order : order;
            }

            function _sort(arr) {
                var sortedString;
                var collator = new Intl.Collator([], { numeric: true });
                var sorted = arr.sort((a, b) => collator.compare(a, b));

                if (order === "asc") { sortedString = sorted.join(" "); }
                else if (order === "desc") { sortedString = sorted.reverse().join(" "); }
                return sortedString;
            }
            
            output = _sort(toWords);
            return output;
        }
    };

    /**
     * This method compares two(2) strings to see if they are the same and returns the result of the comparison.
     * @method module:Str.compare
     * @param {String} string1 The first string for comparison.
     * @param {String} string2 The second string for comparison.
     * @returns {Boolean} The result of the comparison
     * @example
     * var string1 = "ToolJS Rocks"
     * var string2 = "ToolJS Rocks";
     * var string3 = "tooljs Rocks";
     * 
     * Str.compare(string1, string2); // returns true
     * Str.compare(string1, string3); // returns false
     */
    const compare = (string1, string2) => {
        if (isString(string1) && isString(string2)){
            return (string1 === string2)
        }};

    /**
     * This method checks to see if a string contains numbers in it.
     * @method module:Str.hasNums
     * @param {String} str The string to be checked
     * @returns {Boolean} The result of the check
     * @example
     * var myString = "My name is John Doe, and i am 20years old.";
     * var myString2 = "My name is John Doe";
     * 
     * Str.hasNums(myString); // returns true;
     * Str.hasNums(myString2); // returns false;
     */
    const hasNums = (str) => {
        if (isString(str)) {
            str = str.trim();
            var regexp = /d/g;
            return regexp.test(str);
        }
    };

    /**
     * This method strips off numbers from a string and returns the rest of the string. If no number was found in the string, then it returns the original string back.
     * @method module:Str.stripNums
     * @param {String} str The string to strip of its numbers.
     * @returns {String} The remaining string.
     * @example
     * var myString = "This is a sample 67 string with 1 3numbers65432";
     * 
     * Str.stripNums(myString); // returns "This is a sample string";
     */
    const stripNums = (str) => {
        if (isString(str)) {
            return str.replace(/\d+/g, '');
        }
    };

    /**
     * This method extracts the numbers from a string and returns an array holding the numbers. If no number is found in the string, then it returns null
     * @method module:Str.getNums
     * @param {String} str The string to strip of its numbers.
     * @returns {Array<Number>} An array of numbers.
     * @example
     * var myString = "Apple, 1Apple, Banana, 2Banana, 1, 2, 3 20 100";
     * 
     * Str.getNums(myString); // returns [1, 2, 1, 2, 3, 20, 100];
     */
    const getNums = (str) => {
        if (isString(str)) {
            var regex = /[+-]?\d+(?:\.\d+)?/g;
            var matches = str.match(regex);
            return (matches) ? matches.map(Number) : null;
        }
    };

    /**
     * This method strips off any special character from a string and returns the rest of the string.
     * @method module:Str.stripSpecialChars
     * @param {String} str The string to strip of its special characters.
     * @returns {String} The remaining string.
     * @example
     * var myString = "This is a sample string. &(£*!£()£#'')# ";
     * 
     * Str.stripSpecialChars(myString); // returns "This is a sample string";
     */
    const stripSpecialChars = (str) => {
        if (isString(str)) {
            return str.replace(/[^A-Za-z0-9 ]+/g, '');
        }
    };

    /**
     * This method returns an array containing each word in a string or an array of strings, while excluding a set of specified words
     * @method module:Str.wordsExclude
     * @param {String|Array<String>} exclude An array of words to exclude from the result if found in the given string. Could be a single string
     * @param {String|Array<String>} strings The string whose camel case version is to be returned
     * @returns {Array} An array of the words found in the string(s).
     * @example
     * var myString = "This is the first sentence";
     * var mySecondString = "This is another sentence";
     * 
     * Str.wordsExclude("sentence", myString, mySecondString);
     * // returns ["is", "the", "first", "sentence", "is", "another", "sentence"]
     */
    const wordsExclude = (exclude, ...strings) => {
        var wordsArray, excludeArr = [], output = [];

        if (exclude) {
            if (isString(exclude)) { excludeArr.push(exclude); }
            else if (Array.isArray(exclude)) {
                exclude.forEach(curr => { excludeArr.push(curr); });
            }
        }

        if(strings){
            wordsArray = words(strings);
            wordsArray.map(curr => {
                if(!excludeArr.includes(curr)) output.push(curr);
            });
        }

        return output;
    };

    /**
     * This method returns an array containing every single character in a string, excluding whitespaces.
     * @method module:Str.chars
     * @param {String} str The string whose characters are to be returned.
     * @returns {Array} The array of characters.
     * @example
     * var myString = "ToolJS";
     * 
     * Str.chars(myString); // returns ["T", "o", "o", "l", "J", "S"];
     */
    const chars = (str) => {
        if (isString(str)) {
            str = str.trim();
            str = str.replace(/ /g, "");
            return str.split("");
        }
    };

    /**
     * This method inserts a given character at both ends of a string. It can optional add the character at one end of the string.
     * @method module:Str.pad
     * @param {String} str The string to be padded.
     * @param {Boolean} [options] An option object to specifying the padding characters per direction.
     * If passed a string then its used for both the left and right padding.
     * @param {String} [options.left] Specifies the character for the left padding.
     * @param {String} [options.right] Specifies the character for the right padding.
     * @returns {String} The padded string.
     * @example
     * var myString = "ToolJS Rocks";
     * 
     * Str.pad(myString, "__"); // returns "__ToolJS Rocks__";
     * 
     * Str.pad(myString, {
     *      left: "**",
     *      right: "##"
     * }); // returns "**ToolJS Rocks##";
     */
    const pad = (str, options) => {
        var output, left, right;

        if (isString(str)) {
            str = str.trim();

            if (isString(options)){ 
                var char = options;
                output = char + str + char; 
            }
            else if (isObj$1(options)){
                left = options.left;
                right = options.right;
                output = left + str + right;
            }

            return output;
        }
    };

    /**
     * This method replaces characters like "&", "<", ">", '"', and "'" with their htmlentities characters in a string with their normal characters and returns it.
     * @method module:Str.htmlencode
     * @param {String} str The string to be escaped
     * @returns {String} The escaped string
     * @example
     * Str.escape("10 is > 5 & 5 < 10"); // returns "10 is &gt; 5 &amp; 5 &lt; 10"
     */

    var entityMap = {
        "'": "&apos;",
        "<": "&lt;",
        ">": "&gt;",
    };

    const htmlencode = (str) => {
        if (isString(str)) {
            str = str.replace(/&/g, '&amp;');
            str = str.replace(/"/g, '&quot;');
            for (var key in entityMap) {
                var entity = entityMap[key];
                var regex = new RegExp(key, 'g');
                str = str.replace(regex, entity);
            }
            return str;
        }
    };

    /**
     * This method replaces the htmlentities characters in a string with their normal characters and returns it.
     * @method module:Str.htmldecode
     * @param {String} str The string to be decoded
     * @returns {String} The decoded string
     * @example
     * Str.htmldecode("10 is &gt; 5 &amp; 5 &lt; 10"); // returns "10 is > 5 & 5 < 10";
     */

    var entityMap$1 = {
        "'": "&apos;",
        "<": "&lt;",
        ">": "&gt;",
    };

    const htmldecode = (str) => {
        if (isString(str)) {
            for (var key in entityMap$1) {
                var entity = entityMap$1[key];
                var regex = new RegExp(entity, 'g');
                str = str.replace(regex, key);
            }
            str = str.replace(/&quot;/g, '"');
            str = str.replace(/&amp;/g, '&');
            return str;
        }
    };

    /**
     * This method returns the characters and words between two given string, if found.
     * @method module:Str.between
     * @param {String} str The string to make the search on.
     * @param {String} start The starting string, i.e the beginning of the range.
     * @param {String} end The end string, i.e the ending of the range.
     * @returns {String} The result of the search
     * @example
     * var myString = "The string in the { curly brackets will } be returned";
     * 
     * Str.between(myString, "{", "}"); // returns " curly brackets will ";
     */
    const between = (str, start, end) => {
        if (isString(str) && isString(start) && isString(end)) {
            str = str.trim();
            
            var startpos = str.indexOf(start) + start.length;
            var endpos = str.lastIndexOf(end) - end.length;
            
            return str.substr(startpos, endpos);
        }
    };

    /**
     * @todo
     * work on sort
     * work on replace to use array pairs
     */

    /**
     * This module contains methods and functions that manipulates a string, 
     * most of which are extensions of JavaScript's inbuilt methods
     * @module Str
     * @since v1.0.0
     */
    const Str = {
        between: between,
        camelCase: camelCase,
        capitalize: capitalize,
        charAt: charAt,
        chars: chars,
        compare: compare,
        concat: concat,
        endsWith: endsWith,
        firstChar: firstChar,
        firstToLower: firstToLower,
        firstToUpper: firstToUpper,
        getNums: getNums,
        hasNums: hasNums,
        htmlencode: htmlencode,
        htmldecode: htmldecode,
        isLower: isLower,
        isString: isString,
        isUpper: isUpper,
        joinBy: joinBy,
        lastChar: lastChar,
        longest: longest,
        lowerCase: lowerCase,
        pad: pad,
        random: random,
        repeat: repeat,
        replace: replace,
        reverse: reverse,
        shortest: shortest,
        shuffle: shuffle,
        slugify: slugify,
        sort: sort,
        startsWith: startsWith,
        stripNums: stripNums,
        stripSpecialChars: stripSpecialChars,
        toggleCase: toggleCase,
        toHashTag: toHashTag,
        toLower: toLower,
        toString: toString$1,
        toUpper: toUpper,
        trim: trim,
        truncate: truncate,
        upperCase: upperCase,
        wordChunk: wordChunk,
        wordCount: wordCount,
        words: words,
        wordsExclude: wordsExclude,
    };

    // register the Str object as a module in the library
    var ToolJSModules$1 = ToolJS$1.modules;
    ToolJSModules$1.Str = Str;

    /**
     * This method accepts either a string or an array of strings representing an HTML element
     * and creates an element for each string and manipulates the elements using a set of options provided(optional)
     * @method module:DOM.createEl
     * @param {String | String[]} tag A string or an array of strings representing an HTML element to be created
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) created
     * @returns {HTMLElement|Array<HTMLElement>} an html element or an array of elements
     * @example
     * // creates a h4 element gives it some properties, and appends it to the "body"
     * var myElem = DOM.createEl("h4", {
     *      innerText: "This was created programmatically",
     *      className: "myNewElem",
     *      id: "newElem",
     *      title: "I was just created",
     *      appendTo: "body" // other alternative to appendTo includes "insertAfter", "insertBefore", 
     * });
     * 
     * // create a h4, p and a div element
     * var myElems = DOM.createEl(["h4", "p", "div"]);
     * 
     * // you can pass it an html string and it will create the element
     * DOM.createEl("<div class='myElem'>This was just <b>created</b>", {
     *      appendTo: "body"
     * });
     */
    const createEl = (tag, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        var elemArr = [], elem;

        if (!tag) { Logs$1.throw("Specify a tag representing an HTML element to be created"); }

        if (Array.isArray(tag)) {
            tag.forEach(currStr => {
                if(Str.isString(currStr)){
                    var newElem = stringCreate(currStr);
                    elemArr.push(newElem);
                }
                else { if(debugging) Logs$1.warn("Tag must be a string representing an HTML element"); }
            });
        }
        else if (Str.isString(tag)) {
            var newElem = stringCreate(tag);
            elemArr.push(newElem);
        }
        else { if (debugging) Logs$1.warn("Tag must be a string or an array of strings representing an HTML element"); }

        function stringCreate(str) {
            var firstChar = Str.firstChar(str);
            var lastChar = Str.lastChar(str);

            if (firstChar == "<" && lastChar == ">") {
                var tempDiv = document.createElement("div");
                tempDiv.innerHTML = str;
                elem = tempDiv.children[0];
            }
            else { elem = document.createElement(str); }
            return elem;
        }

        if (options) { manipulate$1(elemArr, options); }

        elem = getElement(elemArr);
        return elem;
    };

    /**
     * This method creates a textnode by accepting a string as the first paramter
     * and manipulates the textnode using a set of options provided(optional)
     * @method module:DOM.createText
     * @param {String} text A textnode to be created
     * @param {Object|ToolJSNodeListManipulator} [options] A key to pair object that specifies where and how to place the textnode.
     * @param {String|HTMLElement} [options.appendTo] An element to append the  createdtextnode to.
     * @param {String|HTMLElement} [options.prependTo] An element to prepend the created textnode to.
     * @param {String|HTMLElement} [options.insertBefore] An element to insert the created textnode before.
     * @param {String|HTMLElement} [options.insertAfter] An element to insert the created textnode after.
     * @returns {Text} The textnode created
     * @example
     * // creates a textnode, and inserts it before the p element in the h2 element
     * var text = DOM.createText("Clean Bandit", {
     *      insertBefore: "h2 p"
     * });
     */
    const createText = (text, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        var textNode, parent, sibling, newTextContent;

        if (!text) { Logs$1.throw("Specify a text node to be created"); }

        if (isString(text)) {
            textNode = document.createTextNode(text);
            newTextContent = textNode.textContent;

            if (options) {
                Obj.forEach(options, (type, dest) => {
                    if (type == "appendTo") {
                        if(dest == "body"){
                            parent = document.createElement("p");
                            parent.appendChild(textNode);
                            document.body.appendChild(parent);
                        }
                        else {
                            parent = getElement(dest);
                            parent.appendChild(textNode);
                        }
                    }
                    else if (type == "prependTo") {
                        parent = getElement(dest);
                        var firstChild = parent.firstElementChild;
                        firstChild.insertAdjacentText("beforebegin", newTextContent);
                    }
                    else if (type == "insertBefore") {
                        sibling = getElement(dest);
                        parent = sibling.parentElement;
                        parent.insertBefore(newTextContent, sibling);
                    }
                    else if (type == "insertAfter") {
                        sibling = getElement(dest);
                        sibling.insertAdjacentText("afterend", newTextContent);
                    }
                });
            }
        }
        else if (!isString(text) && debugging) {
            Logs$1.throw("Textnode to be created must be a string");
        }

        return textNode;
    };

    /**
     * This method replaces the innertext of an element or an array of elements with a new text.
     * If the text paramter is omitted, then it returns the elements innertext for a single element,
     * and an array of innertext for more than one element
     * @method module:DOM.text
     * @param {String|Array<String|HTMLElement>} [el] A single element or an array of elements to replace the text
     * @param {*} [text] The replacement text for the element(s). If passed a function, the return value of the fuction is used.
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned.
     * @returns {String|Array|HTMLElement} The element/set of elements or the innertext.
     * @example
     * // changes the innertext of the p element and returns the p element
     * // you can pass it an array of selectors to multiple elements
     * var myP = DOM.text("p", "ToolJS Rocks");
     * 
     * // returns the innertext of the p elemen
     * var myP = DOM.text("p");
     * 
     * // returns an array containing the innertext of all h3, and p elements
     * var myP = DOM.text(["h3", "p"]);
     */
    const text = (el, text, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        var elem, elemArr, output, textArr = [], opt;

        if (!el && debugging) { Logs$1.throw("Specify an element to either get its innertext or change it"); }

        // if the el parameter is not an object literal, continue execution
        var elem = getElement(el);
        elemArr = cToA(elem);
        
        // resolve manipulation option
        if (isObj$1(text)) { opt = text; }
        else if (isObj$1(options)) { opt = options; }

        elemArr.forEach(el => { _text(el); });

        function _text(currEl) {
            if(text){
                if (typeof text == "function") { currEl.innerText = text(); }
                else { currEl.innerText = text; }
            }
            // if the text parameter is empty then push the innertext of each element into an array
            else { textArr.push(currEl.innerText); }
        }

        // manipulate the elements if options are available
        if(opt != null){ manipulate$1(elem, opt); }

        if(textArr.length != 0){
            output = (textArr.length == 1) ? textArr[0] : textArr;
        }
        else { output = elem; }

        return output;
    };

    // import deps module

    /**
     * This method replaces the innerHTML of an element or an array of elements with a new html.
     * If the html paramter is omitted, then it returns the elements innerHTML for a single element,
     * and an array of innerHTML for more than one element
     * @method module:DOM.html
     * @param {String|Array<String|HTMLElement>} [el] A single element or an array of elements to replace the html
     * @param {String} [html] An html string to replace the elements innerHTML with
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
     * @returns {String|Array|HTMLElement} The element/set of elements or the innerHTML
     * @example
     * // changes the innerHTML of the p element and returns the p element
     * // you can pass it an array of selectors to multiple elements
     * var myP = DOM.html("p", "Clean Bandit");
     * // returns the innerHTML of the p elemen
     * var myP = DOM.html("p");
     * // returns an array containing the innerHTML of all h3, and p elements
     * var myP = DOM.html(["h3", "p"]);
     */
    const html = (el, html, options) => {
        var elem, elemArr, output, htmlArr = [], opt;

        if (!el) { Logs$1.throw("Specify an element to either get its innerHTML or change it"); }

        // if the el parameter is not an object literal, continue execution
        var elem = getElement(el);
        elemArr = cToA(elem);

        // resolve manipulation option
        if (Obj.isObj(html)) { opt = html; }
        else if (Obj.isObj(options)) { opt = options; }

        elemArr.forEach(el => { _html(el); });

        function _html(currEl) {
            if (html) {
                if (typeof html == "function") { currEl.innerHTML = html(); }
                else { currEl.innerHTML = html; }
            }
            // if the html parameter is empty then push the innerHTML of each element into an array
            else { htmlArr.push(currEl.innerHTML); }
        }

        // manipulate the elements if options are available
        if (opt != null) { manipulate$1(elem, opt); }

        if (htmlArr.length != 0) {
            output = (htmlArr.length == 1) ? htmlArr[0] : htmlArr;
        }
        else { output = elem; }

        return output;
    };

    // import deps module

    /**
     * This method clones an element or an array of elements. 
     * It gives you the option of deep cloning(i.e clone children) or just the element itself.
     * By default, deepClone is used on the element, which means both the elements children are cloned.
     * @method module:DOM.cloneEl
     * @param {String | String[]} el A valid css selector string or an array of strings and elements representing an HTML element
     * @param {Object|ToolJSNodeListManipulator} [options] A key to pair object that specifies how the element(s) are cloned. 
     * If passed a boolean, then its sts the <code>deepClone</code> parameter and if passed a number, its sets the clone <code>count</code> parameter
     * @param {Object} [options.deepClone=true] Specifies whether to clone both the elements children
     * @param {Number} [options.count=1] Specifies the number of times the clone is made.
     * @param {Number} [cloneCount=1] This also optionally specifies the number of times the clone is made.
     * @returns {HTMLElement|Array<HTMLElement>} an html element or an array of elements
     * @example
     * // returns a single clone of each element in the array
     * var myClones = DOM.cloneEl(["h4", "p", "#myDiv1"]);
     * 
     * // returns a single clone of the "div" element without its children
     * var myClone = DOM.cloneEl("#myDiv1", false, 1);
     * 
     * // returns 2 clones of the "div" element without its children and appends them to "#newDiv"
     * var myClone = DOM.cloneEl("#myDiv1", {
     *     deepClone: false,
     *     count: 2,
     *     appendTo: "#newDiv"
     * });
     */
    const cloneEl = (el, options, cloneCount) => {
        // check debugging status
        var output, cloneArr = [], elem;
        var deepClone = true, count = 1;

        if (!el) { Logs$1.throw("Specify an element or an array of elements to be cloned"); }

        var elem = getElement(el);
        var elemArr = cToA(elem);

        if (Obj.isObj(options)) {
            // @ts-ignore
            if (typeof options.deepClone == "boolean"){ deepClone = options.deepClone; }
            if (isNum(options.count)){ count = options.count; }

            if (typeof options == "boolean") { deepClone = options; }
            if (isNum(options)) { count = options; }
            if (typeof options == "boolean" && typeof isNum(cloneCount) == "number") { 
                deepClone = options; count = cloneCount;
            }
        }

        elemArr.forEach(el => { _clone(el); });

        function _clone(el) {
            for (let i = 0; i < count; i++) {
                var newClone = el.cloneNode(deepClone);
                cloneArr.push(newClone);
            }
        }

        if(Obj.isObj(options)){
            manipulate$1(cloneArr, options);
        }

        cloneArr = getElement(cloneArr);
        output = (cloneArr.length == 1) ? cloneArr[0] : cloneArr;

        return output;
    };

    /**
     * Returns the value of a specified attribute from an element or an array of elements
     * @method module:DOM.getAttr
     * @param {String|HTMLElement|Array<string|HTMLElement>} el
     * Could be a valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elements
     * @param {String} [attr] The attribute whose value is to be returned.
     * If left empty, the value of all the elements attributes will be retured as an object
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
     * @returns {String|Object} - The attributes value or an objects of attributes
     * @example
     * // this returns the value of the id attribute of the element
     * var val = DOM.getAttr("#p", "id");
     *
     * // this returns the value of all the set attributes of the element
     * var val = DOM.getAttr("#p");
     */
    const getAttr = (el, attr, options) => {
        var debugging = ToolJS$1.env.debugging;
        var attrArr = [], output;

        if(!el && debugging) Logs$1.throw("Specify an element whose attribute is to be returned");
        
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _attr(el); });

        function _attr(el) {
            if(attr){
                if (isString(attr)){
                    var attrValue = el.getAttribute(attr);
                    attrArr.push(attrValue);
                }
                else { if(debugging) Logs$1.throw("The attr parameter must be of type string"); }
            }
            else {
                var allAttributes = el.attributes;
                var attrObj = {};
                
                for (let i = 0; i < allAttributes.length; i++) {
                    const currAttr = allAttributes[i];
                    attrObj[currAttr.name] = currAttr.value;
                }

                attrArr.push(attrObj);
            }
        }

        if(options != null){ manipulate$1(elem, options); }

        output = (attrArr.length == 1) ? attrArr[0] : attrArr;

        return output;
    };

    /**
     * Returns the value of a specified data attribute from an element or an array of elements.
     * It can also be used to set mulitple data attributes in an object literal form
     * @method module:DOM.dataAttr
     * @param {String|HTMLElement|Array<string|HTMLElement>} el
     * Could be a valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elements
     * @param {String|Object} [attr] The data attribute whose value is to be returned.
     * If left empty, the value of all the elements data attributes will be retured as an object.
     * You can optionally pass it an object of data attributes to set or change on the element
     * @returns {String|Object} - The data attributes value or an objects of attributes
     * @example
     * // this sets the data-color and data-text attributes of the element
     * DOM.dataAttr("#p", {
     *     color: "red",
     *     text: "ToolJS is awesome"
     * });
     * 
     * // this returns the value of the data-color attribute of the element
     * var val = DOM.dataAttr("#p", "color");
     * 
     * // this returns the value of all the data attributes of the element
     * var val = DOM.dataAttr("#p");
     */
    const dataAttr = (el, attr) => {
        var debugging = ToolJS$1.env.debugging;
        var attrArr = [], output;

        if(!el && debugging) Logs$1.throw("Specify an element to work on");
        
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _attr(el); });

        function _attr(el) {
            if(attr){
                if(isString(attr)){
                    var attrValue = el.dataset[attr];
                    attrArr.push(attrValue);
                }
                else if(Obj.isObj(attr)){
                    Obj.forEach(attr, (name, value) => {
                        el.dataset[name] = value;
                    });
                }
                else { if(debugging) Logs$1.throw("The attr parameter must be of type string"); }
            }
            else {
                var allAttributes = el.dataset;
                var attrObj = {};

                for (const name in allAttributes) {
                    const value = allAttributes[name];
                    attrObj[name] = value;
                }

                attrArr.push(attrObj);
            }
        }

        if(attrArr.length != 0){ output = (attrArr.length == 1) ? attrArr[0] : attrArr; }
        else { output = elem; }

        return output;
    };

    /**
     * This method takes in an object of attributes with values and sets each on an element or an array of elements
     * @method module:DOM.setAttr
     * @param {String|HTMLElement|Array<string|HTMLElement>} el
     * Could be a valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elements
     * @param {Object} attr A key to pair objcet of attributes and values
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
     * @returns {HTMLElement|Array<HTMLElement>} -  The elements whose attributes were set
     * @example
     * // this sets the id and title attributes of the element
     * DOM.setAttr("#p", {
     *     id: "newElem1",
     *     title: "ToolJS is awesome"
     * });
     * 
     DOM.setAttr("#p", "id", "myNewId");
     */
    const setAttr = (el, attr, options) => {
        var debugging = ToolJS$1.env.debugging;
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _attr(el); });

        function _attr(el) {
            if(attr){
                if (Obj.isObj(attr)) {
                    Obj.forEach(attr, (name, value) => {
                        el.setAttribute(name, value);
                    });
                }
                else if(isString(attr) && isString(options)){
                    el.setAttribute(attr, options);
                }
                else { if(debugging) Logs$1.throw("The attr parameter must be an object literal"); }
            }
        }

        if(Obj.isObj(options)){ manipulate$1(elem, options); }

        return elem;
    };

    /**
     * This method removes an attribute or an array of attributes from an element if the element has that attribute set
     * @method module:DOM.removeAttr
     * @param {String|HTMLElement|Array<string|HTMLElement>} el
     * Could be a valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elements
     * @param {String|Array<String>} attr A string representing an attribute or an array of attributes to be removed
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
     * @returns {HTMLElement|Array<HTMLElement>} The elements whose attributes were removed
     * @example
     * // this removes the title attribute from the element
     * DOM.removeAttr("#p", "title");
     * 
     * // this removes the title class and the data-color attributes from the element
     * DOM.removeAttr("#p", ["title", "class", "data-color"]);
     */
    const removeAttr = (el, attr, options) => {
        var debugging = ToolJS$1.env.debugging;
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);
        elemArr.forEach(el => { _attr(el); });

        function _attr(el) {
            if(attr){
                if (Array.isArray(attr)) {
                    attr.forEach(currAttr => {
                        if (el.hasAttribute(currAttr)) { el.removeAttribute(currAttr); }
                        else { if (debugging) Logs$1.warn(`This element does not have a set attribute named '${currAttr}'`); }
                    });
                }
                else if (isString(attr)) {
                    if (el.hasAttribute(attr)) {
                        el.removeAttribute(attr);
                    }
                }
                else { if(debugging) Logs$1.throw("The attr parameter must be an object literal"); }
            }
            else { if(debugging) Logs$1.throw("You must specify atleast one attribute to be removed"); }
        }

        if(options != null){ manipulate$1(elem, options); }

        return getElement(el);
    };

    /**
     * This method clones an element or an array of elements. 
     * It gives you the option of deep cloning(i.e clone children) or just the element itself.
     * By default, deepClone is used on the element, which means both the elements children are cloned.
     * @method module:DOM.replaceEl
     * @param {String|HTMLElement} el A valid css selector string or an array of strings and elements representing an HTML element
     * @param {String|HTMLElement|Array<String|HTMLElement>} newEl The replacement element. Could be a valid css selector, or a valid html string which will create the element
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the replacement element.
     * @returns {HTMLElement|Array<HTMLElement>} an html element or an array of elements
     * @example
     * // replaces the first "p" element found 
     * // with the first "div" element found and returns the "div"
     * var myDiv = DOM.replaceEl("p", "div");
     */
    const replaceEl = (el, newEl, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        var newElem;

        if (!el && debugging) { Logs$1.throw("Specify an element or an array of elements to be cloned"); }

        // @ts-ignore
        var elem = getElement(el);

        if(elem.length){
            elem = elem[0];
            if(debugging) Logs$1.warn("You can only replace one element at a time");
        }
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _replace(el); });

        function _replace(el) {
            if(newEl){
                if(Str.isString(newEl)){
                    if (Str.startsWith(newEl, "<") && Str.endsWith(newEl, ">")) {
                        var tempDiv = document.createElement("div");
                        tempDiv.innerHTML = newEl;
                        newElem = tempDiv.children[0];
                    }
                    else {
                        newElem = getElement(newEl);
                    }
                }
                else if(!isObj$1(newEl)){
                    // @ts-ignore
                    newElem = getElement(newEl);
                }
                else {
                    if (debugging) Logs$1.throw("The newEl parameter must either be a string or an html element");
                }
            }
            else {
                if(debugging) Logs$1.throw("You must provide a new element to replace the old element with");
            }

            if (newElem.length) {
                newElem = newElem[0];
                if (debugging) Logs$1.warn("You can only replace an element with one element");
            }

            parent = el.parentElement;
            // @ts-ignore
            parent.replaceChild(newElem, el);
        }

        if(isObj$1(options)){
            // @ts-ignore
            manipulate$1(newElem, options);
        }

        return newElem;
    };

    // import deps module

    /**
     * This method removes an element or an array of elements from an element in the DOM
     * This is different from the [removeChild]{@link module:DOM.removeChild} method which checks a specific location in the DOM for the element to be removed.
     * @method module:DOM.removeEl
     * @param {String|HTMLElement|Array<string|HTMLElement>} el
     * Could be a valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elements.
     * This is the element or elements to be removed
     * @example
     * // this removes all the p elements from the DOM
     * DOM.removeEl("p");
     * 
     * // this removes all p and div elements from the DOM
     * DOM.removeEl(["p", "div"]);
     */
    const removeEl = (el) => {
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);
        elemArr.forEach(el => { _remove(el); });

        function _remove(el) {
            var parent = el.parentElement;
            parent.removeChild(el);
        }
    };

    /**
     * This method checks if a variable holds a NodeList.
     * @method module:DOM.isNodeList
     * @param {*} item The variable or item to check for
     * @returns {Boolean} The result of the check for
     * @example
     * var myEl = document.querySelector("p");
     * DOM.isNodeList(myEl) // returns true;
     *
     * var myElem = document.getElementsByTagName("p");
     * DOM.isNodeList(myElem) // returns false;
     *
     * var byId = document.getElementById("p");
     * DOM.isNodeList(byId) // returns false;
     */
    const isNodeList = (item) => {
        return NodeList.prototype.isPrototypeOf(item);
    };

    /**
     * This method checks if a variable holds an HTMLCollection.
     * @method module:DOM.isCollection
     * @param {*} item The variable or item to check for
     * @returns {Boolean} The result of the check for
     * @example
     * var myElem = document.getElementsByTagName("p");
     * DOM.isCollection(myElem) // returns true;
     *
     * var myEl = document.querySelector("p");
     * DOM.isCollection(myEl) // returns false;
     *
     * var byId = document.getElementById("p");
     * DOM.isCollection(byId) // returns false;
     */
    const isCollection = (item) => {
        return HTMLCollection.prototype.isPrototypeOf(item);
    };

    /**
     * This method checks if a variable or an item is actually an element
     * @method module:DOM.isEl
     * @param {DOMect} item The variable or item to test for if its an element
     * @returns {Boolean} The result of the test
     * @example
     * var myDOM = {};
     * DOM.isEl(myDOM) // returns false;
     *
     * var myElem = DOM.getEl("p");
     * DOM.isEl(myElem) // returns true;
     *
     * var myElem = document.getElementById("p");
     * DOM.isEl(myElem) // returns true;
     *
     * var myElem = document.querySelectorAll("p");
     * DOM.isEl(myElem) // returns true;
     *
     * var myElem = document.getElementsByTagName("p");
     * DOM.isEl(myElem) // returns true;
     *
     * var arr = ["item1", "item2"];
     * DOM.isEl(arr) // returns false;
     */
    const isEl = (item) => {
        var arr = [HTMLElement, HTMLDocument, ToolJSNodeList];
        
        function isElement(item){
            return arr.some(arr => {
                return arr.prototype.isPrototypeOf(item);
            });
        }

        return (isNodeList(item) || isCollection(item) || isElement(item));
    };

    // import deps module

    /**
     * This method removes an element or an array of elements from a <b>specific</b> element in the DOM.
     * This is different from the [removeEl]{@link module:DOM.removeEl} method which checks the whole DOM for the element to be removed.
     * @method module:DOM.removeChild
     * @param {String|HTMLElement|Array<string|HTMLElement>} scope
     * Could be a valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elements.
     * This is where the element or elements are to be removed from
     * @param {String|HTMLElement|Array<string|HTMLElement>} el The element or an array elements to be removed.
     * Could be a valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elements.
     * @example
     * // this removes all the p elements from the element with id "myDiv"
     * DOM.removeChild("#myDiv", "p");
     * 
     * // this removes all p and b elements from the element with id "myDiv"
     * DOM.removeChild("#myDiv", ["p", "b"]);
     */
    const removeChild = (scope, el) => {
        var from, parent;

        if (isString(scope)){ from = document.querySelector(scope); }
        else if(isEl(scope)){ from = scope; }
        else { from = document; }

        if(el){
            var elem = getElement(el, from);
            var elemArr = cToA(elem);

            elemArr.forEach(el => {
                parent = el.parentElement;
                parent.removeChild(el);
            });
        }

        return from;
    };

    /**
     * This method manipulates an elements attributes, it adds, updates and removes attributes of an element.
     * @method module:DOM.attr
     * @param {String|HTMLElement|Array<String|HTMLElement>} el
     * Could be a valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elements
     * If left empty, the value of all the elements attributes will be retured as an object
     * @param {Object|ToolJSNodeListManipulator} [options] A key to pair object that specifies the two operations that can be carried out on a DOM element's attribute
     * @param {Object} [options.set] A key to pair object that updates already existing attributes of an element or creates new ones
     * @param {String|Array<String>} [options.remove] A single attribute or an array of attributes to be removed from the element
     * @returns {HTMLElement|Object} the element or elements whose attributes were manipulated
     * @example
     * DOM.attr("#p", {
     *      set: {
     *          class: "some-class another-class",
     *          title: "This is a title",
     *          name: "myInput",
     *          id: "newID"
     *      },
     *      remove: ["data-color", "tabindex"], // or pass it a single string e.g "data-color"
     * });
     */
    const attr = (el, options) => {
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _attr(el); });

        function _attr(el) {
            if(Obj.isObj(options)){
                Obj.forEach(options, (key, value) => {
                    if (key == "set") { setAttr(el, value); }
                    if(key == "remove"){ removeAttr(el, value); }
                });

            }
        }
        
        if (Obj.isObj(options)) { manipulate$1(elemArr, options); }

        var output = getElement(el);
        return output;
    };

    /**
     * This method checks if an element contains a particular class and returns true.
     * If an array of elements is passed, it'll only return true if all the elements in the array contain the class
     * @method module:DOM.hasClass
     * @param {String|Array<String|HTMLElement>|HTMLElement} el A valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elments
     * @param {String} className The className to be checked for in an element. Note that this cannot be an array
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
     * @returns {HTMLElement|Object} an html element or a collection of elements
     * @example
     * // checks if the "#p" element has a class labelled "myClass1"
     * DOM.hasClass("#p", "myClass");
     * 
     * // checks if the "p", "h2" elements have a class labelled "myClass1"
     * DOM.hasClass(["p", "h2"], "myClass1");
     * 
     */
    const hasClass = (el, className, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;

        if(!el && debugging) Logs$1.throw("Specify an element to work on");

        // get the elements and store in an array
        var elem = getElement(el);
        var elemArr = cToA(elem);
        var output = _hasClass(elemArr);

        function _hasClass(el) {

            if(el.length === 1){
                var val;
                if (isString(className)) {
                    el.every(currEl => { val = currEl.classList.contains(className); });
                }
                else { if (debugging) Logs$1.throw("The className must either be a string"); }
                return val;
            }
            else { if (debugging) Logs$1.warn("The hasClass method should be used for one element at a time"); }
            
        }

        // manipulate if options are available
        if (options != null) {
            manipulate$1(elem, options);
        }

        return output;
    };

    /**
     * This method adds a single or multiple classNames to an element of an array of elements
     * @method module:DOM.addClass
     * @param {String|Array<String|HTMLElement>|HTMLElement} el
     * A valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elments
     * @param {String|Array<String>} className The classNames to be added to the element
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
     * @returns {HTMLElement|Object} an html element or a collection of elements
     * @example
     * // adds a single className to the "p" elements
     * DOM.addClass("p", "myClass");
     * 
     * // adds two classNamees to the "p", "h2" elements
     * DOM.addClass(["p", "h2"], ["myClass1", "myClass2"]);
     * 
     */
    const addClass = (el, className, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        // get the elements and store in an array
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _addClass(el); });

        function _addClass(el) {
            if (typeof className === "string") {
                if (!hasClass(el, className)) { el.classList.add(className); }
                else { if (debugging) Logs$1.warn(`The specified element already has a class labelled '${className}'`); }
            }
            else if (Array.isArray(className)) {
                className.forEach(currValue => {
                    if (!hasClass(el, currValue)) { el.classList.add(currValue); }
                    else { if (debugging) Logs$1.warn(`The specified element already has a class labelled '${currValue}'`); }
                });
            }
            else {
                if (debugging) Logs$1.throw("The className must either be a string or an array of strings");
            }
        }

        // manipulate if options are available
        if (options != null) {
            manipulate$1(elemArr, options);
        }

        return elem;
    };

    /**
     * This method removes a single or multiple classNames from an element of an array of elements
     * @method module:DOM.removeClass
     * @param {String|Array<String|HTMLElement>|HTMLElement} el
     * A valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elments
     * @param {String|Array<String>} className The classNames to be removed from an element
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
     * @returns {HTMLElement|Object} an html element or a collection of elements
     * @example
     * // removes a single className to the "p" elements
     * DOM.removeClass("p", "myClass");
     * 
     * // removes two classNamees to the "p", "h2" elements
     * DOM.removeClass(["p", "h2"], ["myClass1", "myClass2"]);
     * 
     */
    const removeClass = (el, className, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        // get the elements and store in an array
        
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _removeClass(el); });

        function _removeClass(el) {
            if (isString(className)) {
                if(hasClass(el, className)){ el.classList.remove(className); }
            }
            else if (Array.isArray(className)) {
                className.forEach(currValue => {
                    if(hasClass(el, currValue)){ el.classList.remove(currValue); }
                });
            }
            else { if (debugging) Logs$1.throw("The className must either be a string or an array of strings"); }
        }

        // manipulate if options are available
        if (options != null) {
            manipulate$1(elem, options);
        }

        return getElement(el);
    };

    /**
     * This method toggles a single or multiple classNames on an element of an array of elements
     * @method module:DOM.toggleClass
     * @param {String|Array<String|HTMLElement>|HTMLElement} el
     * A valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elments
     * @param {String|Array<String>} className The classNames to be toggled on an element
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
     * @returns {HTMLElement|Object} an html element or a collection of elements
     * @example
     * // toggles a single className to the "p" elements
     * DOM.toggleClass("p", "myClass");
     * 
     * // toggles two classNamees to the "p", "h2" elements
     * DOM.toggleClass(["p", "h2"], ["myClass1", "myClass2"]);
     * 
     */
    const toggleClass = (el, className, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        // get the elements and store in an array
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _toggleClass(el); });

        function _toggleClass(el) {
            if (typeof className === "string") {
                el.classList.toggle(className);
            }
            else if (Array.isArray(className)) {
                className.forEach(currValue => {
                    el.classList.toggle(currValue);
                });
            }
            else {
                if (debugging) Logs$1.throw("The className must either be a string or an array of strings");
            }
        }

        // manipulate if options are available
        if (options != null) {
            manipulate$1(elemArr, options);
        }

        return getElement(el);
    };

    /**
     * This method moves an element or an array of elements from their current location in the DOM to another location
     * @method module:DOM.moveEl
     * @param {String|Array<String|HTMLElement>|HTMLElement} el
     * A valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elments
     * @param {Object|ToolJSNodeListManipulator} options An object literal that specifies the move type and destination
     * <blockquote>Note that you're expected to use only of the available options</blockquote>
     * @param {String|HTMLElement} [options.prependTo] This prepends the element to the destination(i.e makes the element first child)
     * @param {String|HTMLElement} [options.appendTo] This appends the element to the destination(i.e makes the element the last child)
     * @param {String|HTMLElement} [options.insertBefore] This places the elements before the specified element(i.e destination)
     * @param {String|HTMLElement} [options.insertAfter] This places the elements after the specified element(i.e destination)
     * @returns {HTMLElement|Object} an html element or a collection of elements
     * @example
     * // this prepends the elements to the ".dest" element
     * DOM.moveEl("#p", ".myElem", {
     *      prependTo: ".dest"
     * });
     * 
     * // this appends the elements to the ".dest" element
     * DOM.moveEl("#p", ".myElem", {
     *      appendTo: ".dest"
     * });
     * 
     * // this places the elements before of the ".dest" element
     * DOM.moveEl("#p", ".myElem", {
     *      insertBefore: ".dest"
     * });
     * 
     * // this places the elements after of the ".dest" element
     * DOM.moveEl("#p", ".myElem", {
     *      insertAfter: ".dest"
     * });
     */
    const moveEl = (el, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        // get the elements and store in an array
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _moveEl(el); });

        function _moveEl(el) {
            if(Obj.isObj(options)){
                Obj.forEach(options, (type, value) => {
                    var sibling = getElement(value);
                    var parent = sibling.parentElement;

                    if (type == "insertBefore") {
                        parent.insertBefore(el, sibling);
                    }
                    else if (type == "appendTo") {
                        parent = getElement(value);
                        parent.appendChild(el);
                    }
                    else if (type == "prependTo") {
                        parent = getElement(value);
                        var firstChild = parent.firstElementChild;
                        firstChild.insertAdjacentElement("beforebegin", el);
                    }
                    else if (type == "insertAfter") {
                        sibling.insertAdjacentElement("afterend", el);
                    }
                    else {
                        if (debugging) Logs$1.warn(`'${type}' is not a supported move option. Use any of the following 'insertBefore|insertAfter|appendTo|destination'`);
                    }
                });
            }
            else {
                if (debugging) Logs$1.warn(`The options parameter must be an object literal`);
            }
        }

        // manipulate if options are available
        if (options != null) {
            manipulate$1(elem, options);
        }

        return getElement(el);
    };

    /**
     * This method binds one or more events to an element or an array of elements
     * @method module:DOM.on
     * @param {String|HTMLElement|Array<string|HTMLElement>} el
     * Could be a valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elements
     * @param {String|Object|Array<String>} event The event to bind on the element.
     * This can be an array of events or even an object literal with each key serving as the event type and its value the callback
     * If left empty, the value of all the elements attributes will be retured as an object
     * @param {Function} [callback] The function to be called when the event is fired.
     * @param {Boolean} [useCapture=false] A Boolean value that specifies whether the events should be executed in the capturing or in the bubbling phase.
     * This can be ommited if you specify multiple events using the object literal format.
     * @returns {HTMLElement|Array<HTMLElement>} - An html element or an array of html elements
     * @example
     * // binds a click event to the "#p" element
     * DOM.on("#p", "click", function(){
     *      console.log("Fired on click event");
     * });
     *
     * // binds a click and contextmenu event to the "#p" element
     * DOM.on("#p", ["click", "contextmenu"], function(){
     *      console.log("Fired on click and contextmenu events");
     * });
     *
     * // binds a click and contextmenu event to the "#p" element separating each event with a comma
     * DOM.on("#p", "click", contextmenu", function(){
     *      console.log("Fired on click and contextmenu events");
     * });
     *
     * // binds a click, contextmenu and mouseout event to the "#p" element
     * DOM.on("#p", {
     *      click: function(){
     *          console.log("Fired on click event");
     *      },
     *      contextmenu: function(){
     *          console.log("Fired on contextmenu event");
     *      },
     *      mouseout: function(){
     *          console.log("Fired on mouseout event");
     *      }
     * });
     */
    const on = (el, event, callback, useCapture = false) => {
        var debugging = ToolJS$1.env.debugging;
        var err1 = "The callback must be a function",
            err2 = "The event type must be a string";

        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _bind(el); });

        function _bind(el) {
            if(event){
                if (isString(event)){
                    if(event.includes(",")){
                        var eventArr = event.replace(/ /g, "").split(",");
                        arrayEvents(el, eventArr, callback);
                    }
                    else { stringEvents(el, event, callback); }
                }
                else if(Array.isArray(event)){ arrayEvents(el, event, callback); }
                else if(Obj.isObj(event)){
                    Obj.forEach(event, (eventType, func) => { stringEvents(el, eventType, func); });
                }
                else { if(debugging) Logs$1.throw("The event parameter must be of type string or an object literal"); }
            }
            else { if (debugging) Logs$1.warn("You must specify atleast one event to bind on the element"); }
        }

        function crossBrowserBind(el, event, callback, useCapture) {
            if (document.addEventListener) { el.addEventListener(event, callback, useCapture); }
            else if (document.attachEvent) { el.attachEvent(event, callback, useCapture); }
        }

        function stringEvents(el, event, callback) {
            if (typeof callback == "function") { crossBrowserBind(el, event, callback, useCapture); }
            else { if (debugging) Logs$1.throw(err1); }
        }

        function arrayEvents(el, arr, callback) {
            arr.forEach(e => {
                if (isString(e)) { stringEvents(el, e, callback); }
                else { if (debugging) Logs$1.throw(err2); }
            });
        }

        return elem;
    };

    /**
     * This method takes a string and gets the corresponding style property value of an element.
     * The method checks if the element has a custom style set to the style property and returns the value, else it gets the computed style(default style).
     * @method module:DOM.getStyle
     * @param {String|Array<String|HTMLElement>|HTMLElement} el
     * A valid css selector string, an html element,
     * a collection of elements or an array of css selector strings and html elments
     * @param {String} prop The style property whose value is to be returned.
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s) returned
     * @returns {HTMLElement|Object} The style property value
     * @example
     * 
     * DOM.getStyle("#p", "color"); // returns "rgba(0,0,0)" this is the default color of a p tag.
     * 
     * DOM.styleEl("#p", { color: "red" }) // change the color of the p tag
     * 
     * DOM.getStyle("#p", "color"); // returns "red" this is the default color of a p tag.
     */
    const getStyle = (el, prop, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        var styleValues = [], returnValue;

        if (!el && debugging) Logs$1.throw("Specify an element whose style property is to be returned");

        // get the elements and store in an array
        // @ts-ignore
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(el => { _getstylevalue(el); });

        /* if the prop paramter holds a string, 
        then return the value of the style property that corresponds with the string */
        function _getstylevalue(el) {
            if(typeof prop == "string"){
                var styleValue;
                var computedStyle = window.getComputedStyle(el).getPropertyValue(prop);
                var stylePropValue = el.style[prop];

                if (typeof stylePropValue == "undefined" || stylePropValue == ""){
                    styleValue = computedStyle;
                }
                else { styleValue = stylePropValue; }

                styleValues.push(styleValue);
            }
            else {
                if (debugging) { Logs$1.warn("The prop parameter is required and must be a string"); }
            }
        }

        if(styleValues.length != 0){
            returnValue = (styleValues.length == 1) ? styleValues[0] : styleValues;
        }

        // manipulate if options are available
        if (options != null) {
            manipulate$1(elem, options);
        }

        return returnValue;
    };

    /**
     * This method fires a callback function once for each element in a collection, nodelist or array.
     * @method module:DOM.each
     * @param {String|HTMLElement|Array<string|HTMLElement>} el An array of elements. Could also be a valid css selector string.
     * @param {Function} callback The callback function to be fired once for each element.
     * @returns {String|HTMLElement} The elements
     * @example
     * var myElem = document.getElementsByTagName("p");
     * DOM.each(myElem) // returns true;
     *
     * var myEl = document.querySelector("p");
     * DOM.each(myEl) // returns false;
     *
     * var byId = document.getElementById("p");
     * DOM.each(byId) // returns false;
     */
    const each = (el, callback) => {
        var debugging = ToolJS$1.env.debugging;
        if(!el && debugging) Logs$1.warn("You must specify an element or an array of element first");

        var elem = getElement(el);
        var elemArr = cToA(elem);

        if("function" === typeof callback){
            elemArr.forEach((currEl, index) => callback(currEl, index, elemArr));
        }
        else { if(debugging) Logs$1.warn("The callback parameter must a of function"); }

        return getElement(el);
    };

    // import deps module

    /**
     * This method finds a specific element in another element and returns it.
     * @method module:DOM.find
     * @param {String|HTMLElement|Array<string|HTMLElement>} el The element to be found.
     * Could be a valid css selector string, or an html element.
     * @param {String|HTMLElement|Object} scope The scope in the DOM to which the search is limited to.
     * Could be a valid css selector string, or an html element.
     * @param {ToolJSNodeListManipulator} [options] An key to pair object that manipulates the element(s) returned
     * @returns {HTMLElement|Object} an html element or a collection of elements
     * @example
     * // returns a "p" element from myDiv element
     * var p = DOM.find("p", myDiv);
     * 
     * // returns a "p" element from myDiv element and manipulates it
     * var p = DOM.find("p", myDiv, {
     *     className: "myParagraph",
     *     id: "para1",
     *     title: "This is a paragraph"
     * });
     */
    const find = (el, scope, options) => {
        var elem;

        if(!el && debugging) Logs.throw("Specify an element to get or a valid css selector representing an element");
        if(!scope && debugging) Logs.throw("Specify the scope of the search. This should be a DOM element or a css selector representing a DOM element");

        if(el && scope){ elem = getElement(el, scope); }

        // manipulate if options are available
        if (isObj$1(options)) {
            manipulate$1(cToA(elem), options);
        }

        return getElement(el, scope);
    };

    /**
     * This method returns the next available sibling element of a specified element.
     * @method module:DOM.next
     * @param {String|HTMLElement} el Could be a valid css selector string, an html element
     * @param {ToolJSNodeListManipulator} options A key to pair object that manipulates the returned element.
     * @returns {HTMLElement} The next available element sibling.
     */
    const next = (el, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        if(!el && debugging) Logs$1.throw("Specify an element whose next sibling is to be returned");

        if(el){
            var elem = getElement(el);
            var elemArr = cToA(elem);

            if(elemArr.length == 1){ return getElement(elemArr[0].nextElementSibling); }
            else { if(debugging) Logs$1.warn("You can only use this method on one element at a time"); }

            // manipulate if options are available
            if (isObj(options)) {
                manipulate(elem, options);
            }
        }
    };

    /**
     * This method returns the previous available sibling element of a specified element.
     * @method module:DOM.prev
     * @param {String|HTMLElement} el Could be a valid css selector string, an html element.
     * @param {ToolJSNodeListManipulator} options A key to pair object that manipulates the returned element.
     * @returns {HTMLElement} The previous available element sibling.
     */
    const prev = (el, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        if(!el && debugging) Logs$1.throw("Specify an element whose previous sibling is to be returned");

        if(el){
            var elem = getElement(el);
            var elemArr = cToA(elem);

            if(elemArr.length == 1){ return elemArr[0].previousElementSibling; }
            else { if(debugging) Logs$1.warn("You can only use this method on one element at a time"); }

            // manipulate if options are available
            if (isObj(options)) {
                manipulate(elem, options);
            }
        }
    };

    /**
     * This method returns the first child element available of a specified element.
     * @method module:DOM.firstChildEl
     * @param {String|HTMLElement} el Could be a valid css selector string, an html element,
     * @param {ToolJSNodeListManipulator} options A key to pair object that manipulates the elements returned.
     * @returns {HTMLElement} The first child element.
     */
    const firstChildEl = (el, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        var output;

        if(!el && debugging) Logs$1.throw("Specify an element whose first child element is to be returned");

        var elem = getElement(el);
        var elemArr = cToA(elem);

        console.log(elemArr);

        if (elemArr.length == 1) { output = getElement(elemArr[0].firstElementChild); }
        else { if (debugging) Logs$1.warn("You can only use this method on one element at a time"); }

        var out = output;
        if (isObj$1(options)) { manipulate(out, options); }

        return output;

    };

    /**
     * This method returns the last child element available of a specified element.
     * @method module:DOM.lastChildEl
     * @param {String|HTMLElement} el Could be a valid css selector string, an html element.
     * @param {ToolJSNodeListManipulator} options A key to pair object that manipulates the returned element.
     * @returns {HTMLElement} The last child element.
     */
    const lastChildEl = (el, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        if(!el && debugging) Logs$1.throw("Specify an element whose last child element is to be returned");

        if(el){
            var elem = getElement(el);
            var elemArr = cToA(elem);

            if(elemArr.length == 1){ return getElement(elemArr[0].lastElementChild); }
            else { if(debugging) Logs$1.warn("You can only use this method on one element at a time"); }

            // manipulate if options are available
            if (isObj(options)) {
                manipulate(elem, options);
            }
        }
    };

    /**
     * This method returns an array containing the available sibling elements of a specified element. If none is found, then an empty array is returned.
     * @method module:DOM.siblings
     * @param {String|HTMLElement} el Could be a valid css selector string, an html element.
     * @param {ToolJSNodeListManipulator} options A key to pair object that manipulates the sibling elements.
     * @returns {Array<HTMLElement>} The element's siblings in an array.
     */
    const siblings = (el, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        var output = [];

        if(!el && debugging) Logs$1.throw("Specify an element whose sibling elements is to be returned");

        if(el){
            var elem = getElement(el);
            var elemArr = cToA(elem);

            var elem = (elemArr.length == 1) ? elemArr[0] : elem;
            var parentChildren = elem.parentElement.children;

            for (let i = 0; i < parentChildren.length; i++) {
                const currChild = parentChildren[i];
                if (!elem.isSameNode(currChild)) { output.push(currChild); }
            }

            // manipulate if options are available
            if (isObj$1(options)) {
                manipulate(output, options);
            }

            return getElement(output);
        }
    };

    /**
     * This method wraps a given element with a new element specified as a string and returns it back.
     * @method module:DOM.wrap
     * @param {String|HTMLElement} el The element to be wrapped. Could be a valid css selector string, an html element
     * @param {String} wrapper The element to be wrapped. Could be a valid css selector string, an html element
     * @param {ToolJSNodeListManipulator} options A key to pair object that manipulates the returned element.
     * @returns {HTMLElement} The wrapped element.
     */
    const wrap = (el, wrapper, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        if(!el && wrapper && debugging) Logs$1.throw("Specify an element whose wrap sibling is to be returned");

        if(el){
            var elem = getElement(el);
            var elemArr = cToA(elem);

            elemArr.forEach(currEl => {
                if (wrapper) {  
                    var wrapEl = createEl(wrapper, {
                        insertBefore: currEl
                    });
                    wrapEl.appendChild(currEl);
                }
            });

            // manipulate if options are available
            if (isObj$1(options)) {
                manipulate(elemArr, options);
            }
        }

        return getElement(el);
    };

    /**
     * This method returns an array containing the available child elements of a specified element. If none is found, then an empty array is returned.
     * @method module:DOM.childrenEl
     * @param {String|HTMLElement} el Could be a valid css selector string, an html element.
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the children elements.
     * @returns {Array<HTMLElement>} The element's children in an array.
     */
    const childrenEl = (el, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        var output = [];

        if(!el && debugging) Logs$1.throw("Specify an element whose children is to be returned");

        if(el){
            var elem = getElement(el);
            var elemArr = cToA(elem);

            var elem = (elemArr.length == 1) ? elemArr[0] : elem;
            var elemChildren = elem.children;

            for (let i = 0; i < elemChildren.length; i++) {
                const currChild = elemChildren[i];
                output.push(currChild);
            }

            // manipulate if options are available
            if (isObj$1(options)) {
                manipulate$1(output, options);
            }

            return getElement(output);
        }
    };

    /**
     * This method calculates the offset height of an element and returns it. If passed a second parameter, then it sets the height of the element and returns the element.
     * @method module:DOM.height
     * @param {String|HTMLElement} el Could be a valid css selector string, an html elements.
     * @param {Number} [value] The new height of the element.
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s).
     * @returns {Number} The element's offset height.
     */
    const height = (el, value, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        var output = [], opt = (isObj$1(value)) ? value : options;
        
        if(!el && debugging) Logs$1.throw("Specify an element whose sibling elements is to be returned");

        if(el){
            var elem = getElement(el);
            var elemArr = cToA(elem);

            elemArr.forEach(currEl => {
                if(value && !isObj$1(value)){
                    if(isNum(value)){ currEl.style.height = value + "px"; }
                    else if (isString(value)){ currEl.style.height = value; }
                    output = elem;
                }
                else { output.push(currEl.offsetHeight); }
            });

            // manipulate if options are available
            if ( isObj$1(opt) ) {
                manipulate$1(elem, opt);
            }

            return (output.length == 1) ? output[0] : output;
        }
    };

    /**
     * This method calculates the offset width of an element and returns it. If passed a second parameter, then it sets the width of the element and returns the element.
     * @method module:DOM.width
     * @param {String|HTMLElement} el Could be a valid css selector string, an html elements.
     * @param {Number} [value] The new width of the element.
     * @param {ToolJSNodeListManipulator} [options] A key to pair object that manipulates the element(s).
     * @returns {Number} The element's offset width.
     */
    const width = (el, value, options) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        var output = [], opt = (isObj$1(value)) ? value : options;
        
        if(!el && debugging) Logs$1.throw("Specify an element whose sibling elements is to be returned");

        if(el){
            var elem = getElement(el);
            var elemArr = cToA(elem);

            elemArr.forEach(currEl => {
                if(value && !isObj$1(value)){
                    if(isNum(value)){ currEl.style.width = value + "px"; }
                    else if (isString(value)){ currEl.style.width = value; }
                    output = elem;
                }
                else { output.push(currEl.offsetWidth); }
            });

            // manipulate if options are available
            if ( isObj$1(opt) ) {
                manipulate$1(elem, opt);
            }

            return (output.length == 1) ? output[0] : output;
        }
    };

    /**
     * This method calculates the offset position(x and y axis) of an element and returns it. If passed a second parameter, then it sets the offset position of the element(s) and returns the element.
     * @method module:DOM.offset
     * @param {String|HTMLElement} el Could be a valid css selector string, an html elements.
     * @param {Object} [coordinates] The new offset co-ordinates of the element.
     * @param {Number|String} [x] The x-axis(left) value. If passed a number, then its unit defaults to "px", else you could specify its unit and value in string
     * @param {Number|String} [y] The y-axis(top) value. If passed a number, then its unit defaults to "px", else you could specify its unit and value in string
     * @returns {Object} The element's position co-ordinates.
     */
    const offset = (el, coordinates) => {
        // check debugging status
        var debugging = ToolJS$1.env.debugging;
        var output = [], coords = (isObj$1(coordinates));
        
        if(!el && debugging) Logs$1.throw("Specify an element whose sibling elements is to be returned");

        if(el){
            var elem = getElement(el);
            var elemArr = cToA(elem);

            elemArr.forEach(currEl => {
                if (isObj$1(coords)){
                    var left = coords.x; 
                    var top = coords.y; 

                    if (isNum(coords.x)){ currEl.style.left = left + "px"; }
                    else if (isString(coords.x)){ currEl.style.left = left + left; }

                    if (isNum(coords.y)){ currEl.style.top = top + "px"; }
                    else if (isString(coords.y)){ currEl.style.top = top + top; }

                    output = elem;
                }
                else {
                    var posTop = currEl.style.top;
                    var posLeft = currEl.style.left;

                    output.push({
                        x: currEl.offsetLeft,
                        y: currEl.offsetTop,
                        left: posLeft,
                        top: posTop,
                        el: currEl
                    });
                }
            });

            return (output.length == 1) ? output[0] : output;
        }
    };

    /** This is the entry point into the DOM module */

    /**
     * This module contains methods and functions that can be used to manipulate DOM elements See {@tutorial dom-tuts}
     * @tutorial dom-tuts
     * @module DOM
     * @since v1.0.0
     */

    const DOM = {
        addClass: addClass,
        attr: attr,
        childrenEl: childrenEl,
        cloneEl: cloneEl,
        createEl: createEl,
        createText: createText,
        css: css,
        dataAttr: dataAttr,
        each: each,
        find: find,
        firstChildEl: firstChildEl,
        getAttr: getAttr,
        getEl: getEl,
        getStyle: getStyle,
        hasClass: hasClass,
        height: height,
        html: html,
        lastChildEl: lastChildEl,
        isCollection: isCollection,
        isEl: isEl,
        isNodeList: isNodeList,
        moveEl: moveEl,
        next: next,
        offset: offset,
        on: on,
        prev: prev,
        setAttr: setAttr,
        siblings: siblings,
        styleEl: styleEl,
        removeAttr: removeAttr,
        removeChild: removeChild,
        removeClass: removeClass,
        removeEl: removeEl,
        replaceEl: replaceEl,
        text: text,
        toggleClass: toggleClass,
        width: width,
        wrap: wrap,
    };

    /**
     * @typedef {Object} ToolJSNodeListManipulator - This defines a of key to pair object which manipulates DOM elements in a [ToolJSNodeList]{@link ToolJSNodeList} instance.
     * This options help to do a quick manipulation on the DOM element(s). The options object is usually the last parameter of the methods in the DOM module.
     * All methods in the DOM module have this parameter except <code>dataAttr()</code>, <code>each()</code>, <code>on()</code>, <code>off()</code>, <code>isNodeList()</code>, <code>isCollection()</code>, <code>removeChild()</code>, <code>removeEl()</code>, <code>offset()</code> and <code>isEl()</code>
     * It comes with a set of pre-defined properties, while the rest are the same properties every DOM element has in your native javascript such as "id", "className", "title", "tabIndex" etc.
     *
     * Below are a list of the pre-defined properties available
     *
     * @property {Object} [insertBefore] - This options moves the element using the insertBefore method.
     * @property {Object} [insertAfter] - This options moves the element using the insertAfter method.
     * @property {Object} [appendTo] - This options moves the element using the appendTo method.
     * @property {String} [css] - Adds a css style string to an element. E.g "color: red; font-size: 40px".
     * @property {Object} [style] - Accepts an object of javascript style properties and values. E.g {color: "red", fontSize: "40px"}.
     * @property {Object} [children] - Manipulates the children of the reference element.
     * It takes any option in the <code>ToolJSNodeListManipulator</code> object. It basically replicates the [.childrenEl]{@link module:DOM.childrenEl} method.
     * @property {Object} [siblings] -  Manipulates the siblings of the reference element, replicating the [.siblings]{@link module:DOM.siblings} method and also providing two(2) options.
     * It accepts an objcet itself as a value, and if passed a valid css selector string as key of one of its object properties, then a matching element is looked for and returned for manipulation.
     * @property {Object} [siblings.next] - This returns the next sibling of an element for manipulation using the <code>ToolJSNodeListManipulator</code> object options.
     * @property {Object} [siblings.prev] - This returns the previous sibling of an element for manipulation using the <code>ToolJSNodeListManipulator</code> object options.
     * @property {Object} [classList] - This manipulates the classList of an element. It accepts an object with two(2) pre-defined properties.
     * @property {String|Array<String>} [add] - This specifes a list of classes to be added to the element
     * @property {String|Array<String>} [remove] - This specifes a list of classes to be removed from the element
     * @property {Object} [create] - This option also accepts an object with each key serving as the element tag to be created and its value serves as the properties of the element, which can include any of the <code>ToolJSNodeListManipulator</code> object options.
     * @property {String|Array<String>} [removeChild] - This specifies a list of child elements to be removed from the reference element.
     * @property {Object} [events] - This option accepts an object which is used to set multiple event listeners on the element by specifing each event as the property key, and the callback function as the property value.
     * @property {Object} [attr] - This options accepts an object which manipulates the attributes of the reference element. It comes with two(2) pre-defined properties.
     * @property {Object} [attr.set] - This options accepts an object with each property key representing an attribute to be set(whether a new or already existing attribute), and the property value, being the attribute's value.
     * @property {String|Array<String>} [attr.remove] - This options accepts either an array of strings or a single string containing an attribute that is to be removed from the element.
     * @property {Object} [move] - This options accepts an object which specifies how the reference element is to be moved through the property key and where its to be moved to through the property value. It comes with three pre-defined options which you are expected to use only one.
     * @property {Object} [move.insertBefore] - This options moves the element using the insertBefore method.
     * @property {Object} [move.insertAfter] - This options moves the element using the insertAfter method.
     * @property {Object} [move.appendTo] - This options moves the element using the appendTo method.
     * @property {Object} [move.prependTo] - This options moves the element using the prependTo method.
     */


    // register the DOM object as a module in the library
    var ToolJSModules$2 = ToolJS$1.modules;
    ToolJSModules$2.DOM = DOM;

    /**
     * This method checks if a number is odd or even, adn returns a boolean.
     * @method module:Num.isOdd
     * @param {Number} int The number or integer to test for
     * @returns {Boolean} The result of the test
     * @example
     * var oddNum = 35;
     * var evenNum = 20;
     * 
     * Num.isOdd(oddNum); // returns true;
     * Num.isOdd(evenNum); // returns false;
     */
    const isOdd = (int) => {
        if (isNum(int)) {
            var modulus = int % 2;
            return (modulus !== 0) ? true : false;
        }
    };

    /**
     * This method checks if a number is even or even, adn returns a boolean.
     * @method module:Num.isEven
     * @param {Number} int The number or integer to test for
     * @returns {Boolean} The result of the test
     * @example
     * var oddNum = 35;
     * var evenNum = 20;
     * 
     * Num.isEven(oddNum); // returns false;
     * Num.isEven(evenNum); // returns true;
     */
    const isEven = (int) => {
        if (isNum(int)) {
            var modulus = int % 2;
            return (modulus == 0) ? true : false;
        }
    };

    /**
     * This method returns a random number within a given range. Default Range (0 - 100). Note that the min and max numbers are inclusive.
     * @method module:Num.rand
     * @param {Object} [options] An object that controls how the random number is generated. If passed an number, then it sets the min value
     * @param {Number} [options.min=0] The minimum value of the range. Default (0)
     * @param {Number} [options.max=100] The maximum value of the range. Default (100)
     * @param {Boolean} [options.round=true] This determines if the value returned should be rounded. Default (true)
     * @param {Number} [options.decimals=3] If the round option is set to false, then this sets the number of decimal places to round to. Default (3)
     * @param {Number} [max] The maximum value of the range. This is only used if the first paramter is passed a number and not an object
     * @returns {Number} The random number generated
     * @example
     * 
     * var value = Num.rand(10, 1000); // returns a random number between 10 - 1000
     * 
     * var value = Num.rand({
     *      min: 10,
     *      max: 100,
     *      round: false,
     *      decimals: 2
     * }); // returns a random number between 10 - 1000
     */
    const rand = (options, max) => {
        var debugging = ToolJS$1.env.debugging;
        var number, minimum = 0, maximum = 100, round = true, decimals = 3;

        if (isObj$1(options)){
            minimum = (typeof options.min === "number") ? options.min : minimum;
            maximum = (typeof options.max === "number") ? options.max : maximum;
            round = (typeof options.round === "boolean") ? options.round : round;
            decimals = (typeof options.decimals === "number") ? options.decimals : decimals;

            if(max && debugging) Logs$1.warn("This parameter would be ignored, because an object was passed as the first parameter");
        }
        else if (isNum(options)) {
            minimum = options;

            if (isNum(max)) { maximum = (typeof max === "number") ? max : maximum; }
            else { if(debugging) Logs$1.throw("The max parameter must be a number"); }
        }
        else { if(debugging) Logs$1.throw("The options parameter must either be an object literal or a number"); }

        if (round === true) { number = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; }
        else {
            number = Math.random() * (maximum - minimum + 1) + minimum;
            number = number.toFixed(decimals);
        }

        return number;
    };

    /**
     * This method rounds up a number to a specified number of decimal places.
     * @method module:Num.round
     * @param {Number} int The number or integer to be rounded.
     * @param {Number} [decimal=2] The number of decimal places to round up to. Default value (2).
     * @returns {Boolean} The rounded up number
     * @example
     * Num.round(35, 2); // returns 35;
     * Num.round(205.3123, 2); // returns 205.31;
     * Num.round(1.6666666666666667, 3); // returns 1.667;
     * Num.round(0.076, 1); // returns 0.1;
     * Num.round(100.343, 0); // returns 100;
     */
    const round = (int, decimal = 2) => {
        if (isNum(int)) {
            return +(Math.round(int + "e+" + decimal) + "e-" + decimal);
        }
    };

    /**
     * This method increments a number by a specified number of times and returns the final value
     * @method module:Num.increment
     * @param {Array<Number>|Number} number The number to increment. Could be an array of number.
     * @param {Number} [n=1] The incrementation value. Default value (1).
     * @returns {Number} The final value
     * @example
     * 
     * var number = [10, 2, 3];
     * 
     * var ans = Num.increment(number, 3); // returns [13, 5, 6]
     * var ans = Num.increment(7, 3); // returns 10
     * var ans = Num.increment(2); // returns 3
     */
    const increment = (number, n = 1) => {
        var debugging = ToolJS$1.env.debugging;
        var arr = [], output = [], err = "The increment method accepts only number or an array of number";
        
        if(Array.isArray(number)){
            arr = spreadToArr(number, "number", err, debugging);
        }
        else if(isNum(number)){ arr.push(number); }

        arr.forEach(currNum => {
            var inc = n;
            while (inc > 0) { ++currNum; --inc; }
            output.push(currNum);
        });

        return (output.length > 1) ? output : output[0];
    };

    /**
     * This method decrements a number by a specified number of times and returns the final value
     * @method module:Num.decrement
     * @param {Array<Number>|Number} number The number to decrement. Could be an array of number.
     * @param {Number} [n=1] The decrementation value. Default value (1).
     * @returns {Number} The final value
     * @example
     * 
     * var number = [10, 2, 3];
     * 
     * var ans = Num.decrement(number, 3); // returns [7, -1, 0]
     * var ans = Num.decrement(7, 3); // returns 4
     * var ans = Num.decrement(2); // returns -1
     */
    const decrement = (number, n = 1) => {
        var debugging = ToolJS$1.env.debugging;
        var arr = [], output = [], err = "The decrement method accepts only number or an array of number";
        
        if(Array.isArray(number)){
            arr = spreadToArr(number, "number", err, debugging);
        }
        else if(isNum(number)){ arr.push(number); }

        arr.forEach(currNum => {
            var inc = n;
            while (inc > 0) { --currNum; --inc; }
            output.push(currNum);
        });

        return (output.length > 1) ? output : output[0];
    };

    /**
     * This method calculates and returns the range of a set of numbers.
     * @method module:Num.range
     * @param {Array<Number>|Number} numbers A set of numbers. Could be an array of numbers.
     * @returns {Array<Number>} The range of the numbers
     * @example
     * Num.range(1, 2, 3, 4); // returns [1, 4];
     * Num.range(7, 2, 74, 4); // returns [2, 74];
     */
    const range = (...numbers) => {
        var debugging = ToolJS$1.env.debugging;
        var arr, err = "The range method accepts only numbers or an array of numbers";
        arr = spreadToArr(numbers, "number", err, debugging);
        arr.sort();
        
        var start = arr[0];
        var end = arr[arr.length - 1];

        return [start, end];
    };

    /**
     * This method checks if a number is within a given range, and returns true, else it returns false.
     * @method module:Num.inRange
     * @param {Number} num The number to be checked.
     * @param {Number} start The start of the range.
     * @param {Number} end The end of the range.
     * @returns {Boolean} The result of the check
     * @example
     * Num.inRange(2, 3, 4); // returns true;
     * Num.inRange(7, 6, 10); // returns false;
     * Num.inRange(7, 6, 2); // returns false;
     */
    const inRange = (num, start, end) => {
        if (isNum(num) && isNum(start) && isNum(end)){
            return (start > num && num < end);
        }
    };

    /**
     * @todo
     * add toString, toNumber
     */

    /**
     * This module contains methods and functions that manipulates a number.
     * @module Num
     * @since v1.0.0
     */
    const Num = {
        decrement: decrement,
        increment: increment,
        inRange: inRange,
        isEven: isEven,
        isNum: isNum,
        isOdd: isOdd,
        rand: rand,
        range: range,
        round: round,
    };

    // register the Num object as a module in the library
    var ToolJSModules$3 = ToolJS$1.modules;
    ToolJSModules$3.Num = Num;

    /**
     * This method sums two(2) or more numbers together and returns the sum.
     * @method module:Calc.add
     * @param {Array<Number>|Number} numbers The numbers to be summed up. Could be an array of numbers.
     * @returns {Number} The result of the summation
     * @example
     * var numbers = [4, 4, 10];
     * 
     * Calc.add(numbers); // returns 18;
     * Calc.add(1, 2, 3, 4); // returns 10;
     * Calc.add(numbers, 1, 2, 3, 4, [5, 5], 2); // returns 40;
     */
    const add = (...numbers) => {
        var debugging = ToolJS$1.env.debugging;
        var result, arr, err = "The add method accepts only numbers or an array of numbers";
        
        arr = spreadToArr(numbers, "number", err, debugging);
        result = arr.reduce((sum, num) => { return sum + num; });
        
        return result;
    };

    /**
     * This method subtracts a list of numbers from right to left and returns the result.
     * @method module:Calc.subtract
     * @param {Array<Number>|Number} numbers The numbers to be subtracted. Could be an array of numbers. Note that the order in which they are arranged matters.
     * @returns {Number} The result of the subtraction
     * @example
     * var numbers = [10, 4];
     * 
     * Calc.subtract(numbers); // returns 6;
     * Calc.subtract(1, 2, 3, 4); // returns -8;
     */
    const subtract = (...numbers) => {
        var debugging = ToolJS$1.env.debugging;
        var result, arr, err = "The subtract method accepts only numbers or an array of numbers";
        
        arr = spreadToArr(numbers, "number", err, debugging);
        result = arr.reduce((sum, num) => { return sum - num; });
        
        return result;
    };

    /**
     * This method multiplies two(2) or more numbers together and returns the product of the numbers.
     * @method module:Calc.multiply
     * @param {Array<Number>|Number} numbers The numbers to be multiplied. Could be an array of numbers.
     * @returns {Number} The product of the numbers
     * @example
     * var numbers = [1, 2, 3, 4];
     * 
     * Calc.multiply(numbers); // returns 24;
     * Calc.multiply(10, 2, 3, 4); // returns 240;
     */
    const multiply = (...numbers) => {
        var debugging = ToolJS$1.env.debugging;
        var result, arr, err = "The multiply method accepts only numbers or an array of numbers";
        
        arr = spreadToArr(numbers, "number", err, debugging);
        result = arr.reduce((sum, num) => { return sum * num; });
        
        return result;
    };

    /**
     * This method divides two(2) or more numbers and returns the result.
     * @method module:Calc.divide
     * @param {Array<Number>|Number} numbers The numbers to be divided. Could be an array of numbers.
     * @returns {Number} The result of the division
     * @example
     * 
     * Calc.divide(10, 5); // returns 2
     * 
     * var numbers = [10, 2, 3];
     * var ans = Calc.divide(numbers); // returns 1.6666666667
     * 
     * // ans can now be rounded up to n decimal places
     * Num.round(ans, 2); // returns 1.67
     */
    const divide = (...numbers) => {
        var debugging = ToolJS$1.env.debugging;
        var result, arr, err = "The divide method accepts only numbers or an array of numbers";
        
        arr = spreadToArr(numbers, "number", err, debugging);
        result = arr.reduce((sum, num) => { return sum / num; });
        
        return result;
    };

    /**
     * This method returns the maximum value is a list or array of numbers.
     * @method module:Calc.max
     * @param {Array<Number>|Number} numbers A list of numbers to iterate over. Could be an array of numbers.
     * @returns {Number} The maximum value in the list.
     * @example
     * 
     * Calc.max(10, 5); // returns 10
     * 
     * var numbers = [10, 2, 3];
     * var ans = Calc.max(numbers, 20, 15, 1.5); // returns 20
     */
    const max = (...numbers) => {
        var debugging = ToolJS$1.env.debugging;
        var arr, err = "The max method accepts only numbers or an array of numbers";
        arr = spreadToArr(numbers, "number", err, debugging);
        return Math.max(...arr);
    };

    /**
     * This method returns the minimum value is a list or array of numbers.
     * @method module:Calc.min
     * @param {Array<Number>|Number} numbers A list of numbers to iterate over. Could be an array of numbers.
     * @returns {Number} The minimum value in the list.
     * @example
     * 
     * Calc.min(10, 5); // returns 5
     * 
     * var numbers = [10, 2, 3];
     * var ans = Calc.min(numbers, 20, 15, 1.5); // returns 1.5
     */
    const min = (...numbers) => {
        var debugging = ToolJS$1.env.debugging;
        var arr, err = "The min method accepts only numbers or an array of numbers";
        arr = spreadToArr(numbers, "number", err, debugging);
        return Math.min(...arr);
    };

    /**
     * This method returns the modulo of two(2) numbers i.e the remainder of the division of the two numbers.
     * @method module:Calc.modulo
     * @param {Number} n1 The first number.
     * @param {Number} n2 The second number.
     * @returns {Number} The modulo of the two number.
     * @example
     * Calc.modulo(10, 5); // returns 0
     * Calc.modulo(5, 2); // returns 3
     */
    const modulo = (n1, n2) => {
        var debugging = ToolJS$1.env.debugging;
        if(isNum(n1) && isNum(n2)){ return n1 % n2 }
        else { if (debugging) Logs$1.throw("The modulo method accepts only numbers"); }
    };

    /**
     * This method returns the exponential of two(2) numbers.
     * @method module:Calc.exponential
     * @param {Number} n1 The first number.
     * @param {Number} n2 The second number.
     * @returns {Number} The exponential of the two number.
     * @example
     * Calc.exponential(10, 5); // returns 100000
     */
    const exponential = (n1, n2) => {
        var debugging = ToolJS$1.env.debugging;
        if(isNum(n1) && isNum(n2)){ return n1 ** n2 }
        else { if (debugging) Logs$1.throw("The exponential method accepts only numbers"); }
    };

    /**
     * This method calculates and returns the power of x to y.
     * @method module:Calc.pow
     * @param {Number} x The number whose power is to be returned (x).
     * @param {Number} y The power value (y).
     * @returns {Number} The power of x to y.
     * @example
     * Calc.pow(2, 5); // returns 32
     */
    const pow = (x, y) => {
        var debugging = ToolJS$1.env.debugging;
        if(isNum(x) && isNum(y)){ return Math.pow(x, y) }
        else { if (debugging) Logs$1.throw("The power method accepts only numbers"); }
    };

    /**
     * This method evaluates a mathematical expression(in string format) and returns the result. This only works for simple maths operators that uses "+", "-", "/", "*".
     * For a more devoted function see either of the following.
     * [BigEval.js Library]{@link https://github.com/aviaryan/BigEval.js}
     * [Math.js Library]{@link https://mathjs.org/index.html}
     * [JavaScript Expression Evaluator]{@link https://silentmatt.com/javascript-expression-evaluator/}
     * @method module:Calc.evaluate
     * @param {String} expr The expression to be evaluated. Expression must be of type string. See example below
     * @returns {Number} The result of the evaluation.
     * @example
     * Calc.evaluate("10 + 5 - 1 * 2 / 4"); // returns 14.5
     */
    const evaluate = (expr) => {
        if (isString(expr)) {
            return Function(`'use strict'; return (${expr})`)();
        }
    };

    /**
     * This method calculates the mean(average) of a set of numbers and returns the value.
     * @method module:Calc.mean
     * @param {Array<Number>|Number} numbers A set of numbers. Could be an array of numbers.
     * @returns {Number} The mean of the numbers
     * @example
     * Calc.mean(1, 2, 3); // returns 2;
     */
    const mean = (...numbers) => {
        var debugging = ToolJS$1.env.debugging;
        var result, arr, err = "The mean method accepts only numbers or an array of numbers";
        
        arr = spreadToArr(numbers, "number", err, debugging);
        result = arr.reduce((sum, num) => { return sum + num; });
        return result / arr.length;
    };

    /**
     * This method calculates the median(i.e the middle number) of a set of numbers and returns the value.
     * @method module:Calc.median
     * @param {Array<Number>|Number} numbers A set of numbers. Could be an array of numbers.
     * @returns {Number} The median of the numbers
     * @example
     * Calc.median(1, 2, 3, 4); // returns 2.5;
     */
    const median = (...numbers) => {
        var debugging = ToolJS$1.env.debugging;
        var result = 0, arr, err = "The median method accepts only numbers or an array of numbers";

        arr = spreadToArr(numbers, "number", err, debugging);
        var arrLength = arr.length;

        arr.sort();

        if(isEven(arrLength)) {
            result = (arr[arrLength / 2 - 1] + arr[arrLength / 2]) / 2;
        } 
        else { result = arr[(arrLength - 1) / 2]; }

        return result;
    };

    /**
     * This method calculates the mode of a set of numbers, i.e the number(s) that appear the most. It returns an array of numbers if it finds more than one mode
     * @method module:Calc.mode
     * @param {Array<Number>|Number} numbers A set of numbers. Could be an array of numbers.
     * @returns {Array<Number>|Number} The mode of the numbers
     * @example
     * Calc.mode(1,2,3,1,2,4,7,8,1,1); // returns 1;
     * Calc.mode(1,2,3,1,2,4,7,8); // returns [1, 2] because 1 and 2 appear the most in the list
     */
    const mode = (...numbers) => {
        var debugging = ToolJS$1.env.debugging;
        var result = [], arr, err = "The mode method accepts only numbers or an array of numbers";

        arr = spreadToArr(numbers, "number", err, debugging);
        var count = [], num, maxIndex = 0;

        for (let i = 0; i < arr.length; i += 1) {
            num = arr[i];
            count[num] = (count[num] || 0) + 1;
            if (count[num] > maxIndex) {
                maxIndex = count[num];
            }
        }

        for (const i in count) {
            if (Object.hasOwnProperty.call(count, i)) {
                const curr = count[i];
                if (curr === maxIndex) {
                    result.push(Number(i));
                }
            }
        }

        return (result.length == 1) ? result[0] : result;
    };

    /**
     * @todo
     * add taxRate
     * add toPercent
     * add SI
     * add rate
     * add rate
     * add eval
     */

    /**
     * This module contains mathematical methods and functions. Typical calculator functions
     * @module Calc
     * @since v1.0.0
     */
    const Calc = {
        add: add,
        evaluate: evaluate,
        exponential: exponential,
        divide: divide,
        max: max,
        mean: mean,
        median: median,
        min: min,
        mode: mode,
        modulo: modulo,
        multiply: multiply,
        pow: pow,
        subtract: subtract,
    };

    // register the Calc object as a module in the library
    var ToolJSModules$4 = ToolJS$1.modules;
    ToolJSModules$4.Calc = Calc;

    /**
     * This method sets a new cookie.
     * @method module:Utils.setCookie
     * @param {String} name The name of the new cookie to set.
     * @param {*} value The value of the new cookie to set.
     * @param {Number} [duration=356] (Number of days) The duration of which the cookie is kept. Default value(356).
     * @param {String} [path="/"] The path to which the cookie is set. Default value("/").
     * @example
     * Utils.setCookie("myCookie", "A new Cookie", 360, "/");
     */
    const setCookie = (name, value, duration = 365, path = "/") => {
        var debugging = ToolJS$1.env.debugging;

        var date = new Date();
        date.setTime(date.getTime() + (duration * 24 * 60 * 60 * 1000));
        var dateToString = date.toUTCString();

        var expires = "expires=" + dateToString;
        document.cookie = name + "=" + value + ";" + expires + ";path=" + path;

        if (debugging) Logs$1.info(`Cookie '${name}' set, expires '${dateToString}'`);
    };

    /**
     * This method gets a the value of a set cookie.
     * @method module:Utils.getCookie
     * @param {String} name The name of the new cookie to get.
     * @returns {*} The value of the set cookie
     * @example
     * 
     * // set a new cookie
     * Utils.setCookie("myCookie", "A new Cookie", 360, "/");
     * 
     * // get the value of the cookie
     * Utils.getCookie("myCookie"); // returns "A new cookie"
     */
    const getCookie = (name) => {
        var cookies = document.cookie;
        var output, cookieObj = {};

        if(cookies !== ""){
            cookies = cookies.trim();
            var cookiesArr = cookies.split(";");
            
            cookiesArr.forEach(currCookie => {
                currCookie = currCookie.trim();

                var cookieName = currCookie.split("=")[0];
                var cookieValue = currCookie.split("=")[1];

                Obj.push(cookieObj, cookieName, cookieValue);

                if(isString(name)){
                    if (Obj.includes(cookieObj, name)) { output = Obj.valueOf(cookieObj, name); }
                }
                else { output = cookieObj; }
            });
        }

        return output;

    };

    /**
     * This method checks if a cookie is set or not.
     * @method module:Utils.checkCookie
     * @param {String} name The name of the cookie to be checked.
     * @returns {Boolean} The result of the check.
     * @example
     * // set a new cookie
     * Utils.setCookie("myCookie", "A new Cookie", 360, "/");
     * 
     * // check if the cookie exists
     * Utils.checkCookie("myCookie") // returns true;
     */
    const checkCookie = (name) => {
        var debugging = ToolJS$1.env.debugging;

        if (isString(name)) {
            var cookie = getCookie(name);

            if(typeof cookie !== undefined){
                return true;
            }
            else {
                if(debugging) Logs$1.warn(`There is no cookie set with the name of ${name}`);
                return false;
            }
        }
    };

    /**
     * This method deletes one or more set cookies.
     * @method module:Utils.deleteCookie
     * @param {String|Array<String>} names The name of the cookie to be deleted. Could be an array of names.
     * @example
     * 
     * // delete the cookies named "myCookie" and "myCookie2" 
     * Utils.deleteCookie("myCookie", "myCookie2");
     */
    const deleteCookie = (...names) => {
        var debugging = ToolJS$1.env.debugging;
        var cookies = spreadToArr(names, "string", debugging);
        
        cookies.forEach(currCookie => {
            document.cookie = currCookie + "= ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        });
    };

    /**
     * This method imports an external javascript file into an html document using a url to the script source.
     * @method module:Utils.importScript
     * @param {String|Array<String>} url The script url. Could be an array of scripts
     * @param {Boolean} [async] Determines whether the scripts should be async.
     * @param {String} [type] Specifies the script type.
     * @example
     * // imports a script with async set to "true" and type set to "module"
     * Utils.importScript("https://unpkg.com/redakaa/@latest/bundle.esm.js", true, "module");
     * 
     * // imports a script with async set to "false" and type set to "text/javascript"
     * Utils.importScript("https://unpkg.com/redakaa/@latest/bundle.umd.js");
     */
    const importScript = (url, async, type = "text/javascript") => {
        if(url){
            if(Array.isArray(url)){
                url.forEach(currUrl => { _createScript(currUrl); });
            }
            else if(isString(url)){ _createScript(url); }
        }

        function _createScript(url) {
            var scriptEl = createEl("script", {
                type: type,
                src: url,
                appendTo: "html"
            });

            if (async == true) { setAttr(scriptEl, "async", ""); }
        }
    };

    /**
     * This method observes mutations in a single element using the [MutationObserver]{@link https://javascript.info/mutation-observer}, and fires a callback function eacg time there is a mutation.
     * @method module:Utils.observeMutation
     * @param {String|HTMLElement} el The element to be observed.
     * @param {Function} callback The callback function to be fired.
     * @param {Object} [config] An optional config object for the observer.
     * @param {Boolean} [config.attributes=true] Determines whether to observe the attributes of the element.
     * @param {Boolean} [config.childList=true] Determines whether to observen changes in the direction of the children of the element.
     * @param {Boolean} [config.subtree=true] Determines whether to observe the descendants of the element.
     * @param {Boolean} [config.attributeOldValue=true] Determines whether to pass both the old and new values of the element's attributes to the callback.
     * @param {Boolean} [config.characterData=true] Determines whether to observe node.data.
     * @returns {*} A new instance of the MutationObserver
     */
    const observeMutation = (el, callback, config) => {
        var debugging = ToolJS$1.env.debugging;
        var elem = getElement(el);

        var observerConfig = {
            attributes: true,
            subtree: true,
            childList: true,
            attributeOldValue: true,
            characterData: true
        };

        config = (isObj$1(config)) ? extend(observerConfig, config) : observerConfig;

        if(elem.length){
            elem = elem[0];
            if(debugging) Logs$1.warn("You can only observe one element at a time with one instance of the MutationObserver class");
        }

        observer = new MutationObserver(function (mutation) {
            if (typeof callback == "function") { callback.call(); }
        });

        observer.observe(elem, config);

        return observer;
    };

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
            if(type === ("array" )){ output = Array.isArray(item); }
            else { output = typeof item === type; }
            output = output.toUpperCase();
        }
        else {
            if(typeof item === "object"){
                var inString = toString.call(item);
                inString = between(inString, "[", "]");
                output = inString.split(" ")[1];
            }
            else { output = typeof item; }
        }

        return output;
    };

    /**
     * @todo
     * add toString, toUtilsber
     */

    /**
     * This module contains general methods and functions usful to everday javascripting.
     * @module Utils
     * @since v1.0.0
     */
    const Utils = {
        checkCookie: checkCookie,
        deleteCookie: deleteCookie,
        getCookie: getCookie,
        importScript: importScript,
        observeMutation: observeMutation,
        setCookie: setCookie,
        typeOf: typeOf,
    };

    // register the Utils object as a module in the library
    var ToolJSModules$5 = ToolJS$1.modules;
    ToolJSModules$5.Utils = Utils;

    // Import the main library class

    return ToolJS$1;

})));
