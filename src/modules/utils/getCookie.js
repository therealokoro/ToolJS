import isString from '../str/isString';
import Obj from '../obj';

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
            else { output = cookieObj }
        });
    }

    return output;

}

export default getCookie;