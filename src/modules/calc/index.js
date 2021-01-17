/**
 * @todo
 * add taxRate
 * add toPercent
 * add SI
 * add rate
 * add rate
 * add eval
 */
import ToolJS from "../main";

import add from "./add";
import subtract from "./subtract";
import multiply from "./multiply";
import divide from "./divide";
import max from "./max";
import min from "./min";
import modulo from "./modulo";
import exponential from "./exponential";
import pow from "./pow";
import evaluate from "./evaluate";
import mean from "./mean";
import median from "./median";
import mode from "./mode";

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
}

// register the Calc object as a module in the library
var ToolJSModules = ToolJS.modules;
ToolJSModules.Calc = Calc;

// export the Calc object as the default export
export default Calc;