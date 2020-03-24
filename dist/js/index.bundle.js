/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./index.css?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__webpack_require__(/*! ./index.css */ \"./index.css\");\r\nfunction sum(a, b) {\r\n    return a + b;\r\n}\r\nexports.sum = sum;\r\ndocument.querySelectorAll('.slider').forEach(slider);\r\nfunction slider(el) {\r\n    var thumb = el.querySelector('.js-thumb__marker');\r\n    var thumbler = el.querySelector('.slider__thumb');\r\n    var track = el.querySelector('.slider__track');\r\n    var rightEdge = track.clientWidth - (thumbler.clientWidth * 2);\r\n    var step = Math.round(rightEdge * 25 / 100);\r\n    var value = 0;\r\n    var result = 0;\r\n    thumb.addEventListener('dragstart', function () {\r\n        return false;\r\n    });\r\n    thumb.addEventListener('mousedown', startSelect);\r\n    track.addEventListener('click', onMouseMove);\r\n    function startSelect(event) {\r\n        event.preventDefault();\r\n        el.addEventListener('mousemove', onMouseMove);\r\n        el.addEventListener('mouseup', endSelect);\r\n    }\r\n    function onMouseMove(event) {\r\n        var newLeft = Math.round((event.clientX - thumb.clientWidth) / step) * step;\r\n        if (newLeft < 0) {\r\n            newLeft = 0;\r\n        }\r\n        if (newLeft > rightEdge) {\r\n            newLeft = rightEdge;\r\n        }\r\n        value = newLeft;\r\n        result = Math.round(value * 100 / rightEdge);\r\n        thumbler.style.left = newLeft + 'px';\r\n        el.querySelector('.slider__title').textContent = \"Total: \" + result + \"%\";\r\n        el.querySelector('.tag__mark').textContent = result.toString();\r\n        el.querySelector('.tag__mark').style.left = newLeft - 15 + 'px';\r\n        el.querySelector('.track__bar_selected').style.right = rightEdge - newLeft + 'px';\r\n    }\r\n    function endSelect() {\r\n        el.querySelector('.slider input').value = result.toString();\r\n        el.removeEventListener('mouseup', endSelect);\r\n        el.removeEventListener('mousemove', onMouseMove);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ })

/******/ });