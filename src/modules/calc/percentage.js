import ToolJS from "../main";
import isNum from "../num/isNum";
import { Logs } from "../deps";

/**
 * This method returns the percentage of a numer.
 * @method module:Calc.percentage
 * @param {Number} number The number whose percentage is to be returned.
 * @returns {Number} The percentage.
 * @example
 * Calc.percentage(10, 5); // returns 0
 * Calc.percentage(5, 2); // returns 3
 */
const percentage = (n1, n2) => {
    var debugging = ToolJS.env.debugging;
    if(isNum(n1) && isNum(n2)){ return n1 % n2 }
    else { if (debugging) Logs.throw("The percentage method accepts only numbers") }
}

export default percentage;