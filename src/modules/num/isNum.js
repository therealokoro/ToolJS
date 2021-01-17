/**
 * This method checks if an item or variable is a number.
 * @method module:Num.isNum
 * @param {*} item The item or variable to be checked.
 * @returns {Boolean} The result of the check.
 * @example
 * var numberItem = 50
 * var stringItem = "ToolJS Rocks";
 * 
 * Num.isNum(numberItem); // returns true
 * Num.isNum(stringItem); // returns false
 */
const isNum = (item) => {
    return (typeof item !== "undefined" && item !== null && typeof item === "number");
}

export default isNum;