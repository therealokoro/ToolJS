![NPM Downloads](https://img.shields.io/npm/dw/@redeakaa/tooljs?style=for-the-badge)
![NPM License](https://img.shields.io/npm/l/@redeakaa/tooljs?style=for-the-badge)
| **Like us a lot?** Help others know why you like us! **Review this package on [pkgreview.dev](https://pkgreview.dev/npm/@redeakaa/tooljs)** | ➡   | [![Review us on pkgreview.dev](https://i.ibb.co/McjVMfb/pkgreview-dev.jpg)](https://pkgreview.dev/npm/@redeakaa/tooljs) |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------------------------------------------------------------- |

## ToolJS 🛠⚙
This is an open-source collection of functions, methods and routine javascript operations which every front-end developer might have a use for at some point in their project.

It bascially simplifies your work flow by shorthanding some of the long boring codes you write everytime which may consist of so many functions, variables, methods and so on, into a single function. From DOM manipulation, to mathematical calculations to string manipulations and so on all in one library(Pretty useful uh!😎).

Why write or copy the same code over and over again when you could just have it all in one library for easy access (Well step right up ToolJS 👏).

### Table of Content 📜

- [ToolJS 🛠⚙](#tooljs-)
  - [Table of Content 📜](#table-of-content-)
  - [Documentation](#documentation)
  - [Installation:](#installation)
  - [Usage](#usage)
  - [Contributions](#contributions)
  - [Credits](#credits)

### Documentation
See the full documentation and api here <a href="#">ToolJS Documentation and API</a>

### Installation:

**In Node.js**

```
npm install @redeakaa/tooljs
```

**For Browser**

```javascript
<script src="https://unpkg.com/@redeakaa/tooljs@1.0.1/dist/umd/tooljs.min.js"></script>
```

**For Browser(As a module)**

```javascript
<script type="module" src="https://unpkg.com/@redeakaa/tooljs@1.0.1/dist/esm/tooljs.esm.js"></script>
```

### Usage

**Usage In Node.js**

To include the libraries default export

```javascript
const ToolJS = require("@redeakaa/tooljs).default;
```

Then export a module or an array of modules to a variable and use as needed

```javascript
var $ = ToolJS.export(["Str", "Calc", "Utils"]);

var total = $.add(10, 50, 40);
console.log(total);
// => 100

var toCamelCase = $.camelCase("Hello World from ToolJS");
console.log(toCamelCase);
// => "helloWorldFromToolJS"

var type = $.typeOf(400);
console.log(type);
// => "number"
```

Or you can include any of the libraries named exports and call any of its registered methods. 

```javascript
const { DOM, Obj, Str, Num, Calc, Utils } = require("@redeakaa/tooljs");

var capitalized = DOM.capitalize("hello world from toolJS");
console.log(capitalized);
// => "Hello World From ToolJS"

var obj = Obj.push({ name: "John Doe", age: 25 }, { gender: "Male" });
console.log(obj);
// => { name: "John Doe", age: 25, gender: "Male" }
```

**Usage In Browser**

If you included the `tooljs.min.js` file or the `tooljs.umd.js`, then the `ToolJS` namespace is automatically exposed to the window object.

```javascript
// export all methods in all registered module
var _ = ToolJS.export();

// increment 10 by 5.
var val = _.increment(10, 5);
console.log(val);
// => 15

var odd = _.isOdd(27);
console.log(odd);
// => true"

// gets the element whose id = "#myElement"
var el = _.getEl("#myElement");
```

For ES6 Module's Import Style

```javascript
var url = "https://unpkg.com/@redeakaa/tooljs@1.0.1/dist/esm/tooljs.esm.js";

import { Utils, Obj } from url;

// sets a cookie which expires in days
Utils.setCookie("username", "John Doe", 14, "/");

// gets the cookie named "username"
var user = Utils.getCookie("username",);
console.log(user);
// => "John Doe"

var myObj = Obj.toObj(["John Doe", "Male"]);
console.log(myObj);
// => { 0: "John Doe", 1: "Male" }
```

Check out the libraries official <a href="#">documentation</a> page to see a list of all available methods for each module and <a href="#">how to create a module/plugin</a> of your own.

### Contributions
Please feel free to make contributions to this project at any point in time. Find any bug, open an issue and we'll fix it together.

### Credits
- Made with 💝 by Okoro Redemption.
