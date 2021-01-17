import ToolJS from '../main';
import { getElement, Logs } from "../deps";
import isObj from '../obj/isObj';
import extend from '../obj/extend';

/**
 * This method observes mutations in a single element using the [MutationObserver]{@link https://javascript.info/mutation-observer}, and fires a callback function eacg time there is a mutation.
 * @method module:Utils.observeMutation
 * @param {String|HTMLElement} el The element to be observed.
 * @param {Function} callback The callback function to be fired.
 * @param {Object} [config] An optional config object for the observer.
 * @param {Boolean} [config.attributes=true] Determines whether to observe the attributes of the element.
 * @param {Boolean} [config.childList=true] Determines whether to observen changes in the direction of the children of the element.
 * @param {Boolean} [config.subtree=true] Determines whether to observe the descendants of the element.
 * @param {Boolean} [config.attributeOldValue=true] Determines whether to pass both the old and new values of the element's attributes to the callback.
 * @param {Boolean} [config.characterData=true] Determines whether to observe node.data.
 * @returns {*} A new instance of the MutationObserver
 */
const observeMutation = (el, callback, config) => {
    var debugging = ToolJS.env.debugging;
    var elem = getElement(el);

    var observerConfig = {
        attributes: true,
        subtree: true,
        childList: true,
        attributeOldValue: true,
        characterData: true
    };

    config = (isObj(config)) ? extend(observerConfig, config) : observerConfig;

    if(elem.length){
        elem = elem[0];
        if(debugging) Logs.warn("You can only observe one element at a time with one instance of the MutationObserver class")
    }

    observer = new MutationObserver(function (mutation) {
        if (typeof callback == "function") { callback.call(); }
    });

    observer.observe(elem, config);

    return observer;
}

export default observeMutation;