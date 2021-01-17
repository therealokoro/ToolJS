import ToolJS from '../main';
import { Logs } from "../deps";

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
    var debugging = ToolJS.env.debugging;

    var date = new Date();
    date.setTime(date.getTime() + (duration * 24 * 60 * 60 * 1000));
    var dateToString = date.toUTCString();

    var expires = "expires=" + dateToString;
    document.cookie = name + "=" + value + ";" + expires + ";path=" + path;

    if (debugging) Logs.info(`Cookie '${name}' set, expires '${dateToString}'`);
}

export default setCookie;