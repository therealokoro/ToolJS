/**
 * @todo
 * work on sort
 * work on replace to use array pairs
 */
import ToolJS from "../main";

import isString from "./isString";
import charAt from "./charAt";
import firstChar from "./firstChar";
import lastChar from "./lastChar";
import camelCase from "./camelCase";
import firstToUpper from "./firstToUpper";
import firstToLower from "./firstToLower";
import capitalize from "./capitalize";
import slugify from "./slugify";
import lowerCase from "./lowerCase";
import upperCase from "./upperCase";
import toLower from "./toLower";
import toUpper from "./toUpper";
import words from "./words";
import repeat from "./repeat";
import endsWith from "./endsWith";
import startsWith from "./startsWith";
import replace from "./replace";
import trim from "./trim";
import isUpper from "./isUpper";
import isLower from "./isLower";
import toggleCase from "./toggleCase";
import toString from "./toString";
import toHashTag from "./toHashTag";
import random from "./random";
import concat from "./concat";
import joinBy from "./joinBy";
import wordCount from "./wordCount";
import wordChunk from "./wordChunk";
import truncate from "./truncate";
import reverse from "./reverse";
import shuffle from "./shuffle";
import longest from "./longest";
import shortest from "./shortest";
import sort from "./sort";
import compare from "./compare";
import hasNums from "./hasNums";
import stripNums from "./stripNums";
import getNums from "./getNums";
import stripSpecialChars from "./stripSpecialChars";
import wordsExclude from "./wordsExclude";
import chars from "./chars";
import pad from "./pad";
import htmlencode from "./htmlencode";
import htmldecode from "./htmldecode";
import between from "./between";

/**
 * This module contains methods and functions that manipulates a string, 
 * most of which are extensions of JavaScript's inbuilt methods
 * @module Str
 * @since v1.0.0
 */
const Str = {
    between: between,
    camelCase: camelCase,
    capitalize: capitalize,
    charAt: charAt,
    chars: chars,
    compare: compare,
    concat: concat,
    endsWith: endsWith,
    firstChar: firstChar,
    firstToLower: firstToLower,
    firstToUpper: firstToUpper,
    getNums: getNums,
    hasNums: hasNums,
    htmlencode: htmlencode,
    htmldecode: htmldecode,
    isLower: isLower,
    isString: isString,
    isUpper: isUpper,
    joinBy: joinBy,
    lastChar: lastChar,
    longest: longest,
    lowerCase: lowerCase,
    pad: pad,
    random: random,
    repeat: repeat,
    replace: replace,
    reverse: reverse,
    shortest: shortest,
    shuffle: shuffle,
    slugify: slugify,
    sort: sort,
    startsWith: startsWith,
    stripNums: stripNums,
    stripSpecialChars: stripSpecialChars,
    toggleCase: toggleCase,
    toHashTag: toHashTag,
    toLower: toLower,
    toString: toString,
    toUpper: toUpper,
    trim: trim,
    truncate: truncate,
    upperCase: upperCase,
    wordChunk: wordChunk,
    wordCount: wordCount,
    words: words,
    wordsExclude: wordsExclude,
}

// register the Str object as a module in the library
var ToolJSModules = ToolJS.modules;
ToolJSModules.Str = Str;

// export the Str object as the default export
export default Str;