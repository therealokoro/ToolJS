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
        }
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
export default new ToolJS;