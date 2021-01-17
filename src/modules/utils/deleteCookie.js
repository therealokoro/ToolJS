import ToolJS from '../main';
import { spreadToArr } from "../deps";

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
    var debugging = ToolJS.env.debugging;
    var cookies = spreadToArr(names, "string", debugging);
    
    cookies.forEach(currCookie => {
        document.cookie = currCookie + "= ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
    });
}

export default deleteCookie;