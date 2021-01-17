import isNum from "./isNum";

/**
 * This method checks if a number is odd or even, adn returns a boolean.
 * @method module:Num.isOdd
 * @param {Number} int The number or integer to test for
 * @returns {Boolean} The result of the test
 * @example
 * var oddNum = 35;
 * var evenNum = 20;
 * 
 * Num.isOdd(oddNum); // returns true;
 * Num.isOdd(evenNum); // returns false;
 */
const isOdd = (int) => {
    if (isNum(int)) {
        var modulus = int % 2;
        return (modulus !== 0) ? true : false;
    }
}

export default isOdd;