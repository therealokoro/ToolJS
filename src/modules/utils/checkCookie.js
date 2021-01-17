import ToolJS from '../main';
import getCookie from './getCookie';
import isString from '../str/isString';
import { Logs } from "../deps";

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
    var debugging = ToolJS.env.debugging;

    if (isString(name)) {
        var cookie = getCookie(name);

        if(typeof cookie !== undefined){
            return true;
        }
        else{
            if(debugging) Logs.warn(`There is no cookie set with the name of ${name}`);
            return false;
        }
    }
}

export default checkCookie;