import ToolJS from '../main';
import { getElement, cToA, Logs, manipulate } from "../deps";
import isObj from '../obj/isObj';
import isNum from '../num/isNum';
import isString from '../str/isString';

/**
 * This method calculates the offset position(x and y axis) of an element and returns it. If passed a second parameter, then it sets the offset position of the element(s) and returns the element.
 * @method module:DOM.offset
 * @param {String|HTMLElement} el Could be a valid css selector string, an html elements.
 * @param {Object} [coordinates] The new offset co-ordinates of the element.
 * @param {Number|String} [x] The x-axis(left) value. If passed a number, then its unit defaults to "px", else you could specify its unit and value in string
 * @param {Number|String} [y] The y-axis(top) value. If passed a number, then its unit defaults to "px", else you could specify its unit and value in string
 * @returns {Object} The element's position co-ordinates.
 */
const offset = (el, coordinates) => {
    // check debugging status
    var debugging = ToolJS.env.debugging;
    var output = [], coords = (isObj(coordinates));
    
    if(!el && debugging) Logs.throw("Specify an element whose sibling elements is to be returned");

    if(el){
        var elem = getElement(el);
        var elemArr = cToA(elem);

        elemArr.forEach(currEl => {
            if (isObj(coords)){
                var left = coords.x; 
                var top = coords.y; 

                if (isNum(coords.x)){ currEl.style.left = left + "px"; }
                else if (isString(coords.x)){ currEl.style.left = left + left; }

                if (isNum(coords.y)){ currEl.style.top = top + "px"; }
                else if (isString(coords.y)){ currEl.style.top = top + top; }

                output = elem;
            }
            else {
                var posTop = currEl.style.top;
                var posLeft = currEl.style.left;

                output.push({
                    x: currEl.offsetLeft,
                    y: currEl.offsetTop,
                    left: posLeft,
                    top: posTop,
                    el: currEl
                });
            }
        });

        return (output.length == 1) ? output[0] : output;
    }
}

export default offset;