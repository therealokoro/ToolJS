import ToolJS from "../main";
import isNum from "../num/isNum";
import { Logs } from "../deps";

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
    var debugging = ToolJS.env.debugging;
    if(isNum(n1) && isNum(n2)){ return n1 % n2 }
    else { if (debugging) Logs.throw("The modulo method accepts only numbers") }
}

export default modulo;