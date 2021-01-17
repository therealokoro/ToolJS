import createEl from '../dom/createEl';
import setAttr from '../dom/setAttr';
import isString from '../str/isString';

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
}

export default importScript;