import isNum from "./isNum";

/**
 * This method checks if a number is even or even, adn returns a boolean.
 * @method module:Num.isEven
 * @param {Number} int The number or integer to test for
 * @returns {Boolean} The result of the test
 * @example
 * var oddNum = 35;
 * var evenNum = 20;
 * 
 * Num.isEven(oddNum); // returns false;
 * Num.isEven(evenNum); // returns true;
 */
const isEven = (int) => {
    if (isNum(int)) {
        var modulus = int % 2;
        return (modulus == 0) ? true : false;
    }
}

export default isEven;