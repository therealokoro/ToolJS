/**
 * @todo
 * add toString, toNumber
 */
import ToolJS from "../main";

import isNum from "./isNum";
import isOdd from "./isOdd";
import isEven from "./isEven";
import rand from "./rand";
import round from "./round";
import increment from "./increment";
import decrement from "./decrement";
import range from "./range";
import inRange from "./inRange";

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
}

// register the Num object as a module in the library
var ToolJSModules = ToolJS.modules;
ToolJSModules.Num = Num;

// export the Num object as the default export
export default Num;