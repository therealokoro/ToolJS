import isString from "../str/isString";

/**
 * This method evaluates a mathematical expression(in string format) and returns the result. This only works for simple maths operators that uses "+", "-", "/", "*".
 * For a more devoted function see either of the following.
 * [BigEval.js Library]{@link https://github.com/aviaryan/BigEval.js}
 * [Math.js Library]{@link https://mathjs.org/index.html}
 * [JavaScript Expression Evaluator]{@link https://silentmatt.com/javascript-expression-evaluator/}
 * @method module:Calc.evaluate
 * @param {String} expr The expression to be evaluated. Expression must be of type string. See example below
 * @returns {Number} The result of the evaluation.
 * @example
 * Calc.evaluate("10 + 5 - 1 * 2 / 4"); // returns 14.5
 */
const evaluate = (expr) => {
    if (isString(expr)) {
        return Function(`'use strict'; return (${expr})`)();
    }
}

export default evaluate;