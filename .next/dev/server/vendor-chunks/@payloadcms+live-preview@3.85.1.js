"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@payloadcms+live-preview@3.85.1";
exports.ids = ["vendor-chunks/@payloadcms+live-preview@3.85.1"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@payloadcms+live-preview@3.85.1/node_modules/@payloadcms/live-preview/dist/isDocumentEvent.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@payloadcms+live-preview@3.85.1/node_modules/@payloadcms/live-preview/dist/isDocumentEvent.js ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isDocumentEvent: () => (/* binding */ isDocumentEvent)\n/* harmony export */ });\nconst isDocumentEvent = (event, serverURL)=>event.origin === serverURL && event.data && typeof event.data === 'object' && event.data.type === 'payload-document-event';\n\n//# sourceMappingURL=isDocumentEvent.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHBheWxvYWRjbXMrbGl2ZS1wcmV2aWV3QDMuODUuMS9ub2RlX21vZHVsZXMvQHBheWxvYWRjbXMvbGl2ZS1wcmV2aWV3L2Rpc3QvaXNEb2N1bWVudEV2ZW50LmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTzs7QUFFUCIsInNvdXJjZXMiOlsiL2hvbWUvcmVpemVuZC9EZXNrdG9wL01NVi9wYXlsb2FkQ21zL25vZGVfbW9kdWxlcy8ucG5wbS9AcGF5bG9hZGNtcytsaXZlLXByZXZpZXdAMy44NS4xL25vZGVfbW9kdWxlcy9AcGF5bG9hZGNtcy9saXZlLXByZXZpZXcvZGlzdC9pc0RvY3VtZW50RXZlbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGlzRG9jdW1lbnRFdmVudCA9IChldmVudCwgc2VydmVyVVJMKT0+ZXZlbnQub3JpZ2luID09PSBzZXJ2ZXJVUkwgJiYgZXZlbnQuZGF0YSAmJiB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gJ29iamVjdCcgJiYgZXZlbnQuZGF0YS50eXBlID09PSAncGF5bG9hZC1kb2N1bWVudC1ldmVudCc7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzRG9jdW1lbnRFdmVudC5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@payloadcms+live-preview@3.85.1/node_modules/@payloadcms/live-preview/dist/isDocumentEvent.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/@payloadcms+live-preview@3.85.1/node_modules/@payloadcms/live-preview/dist/ready.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@payloadcms+live-preview@3.85.1/node_modules/@payloadcms/live-preview/dist/ready.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ready: () => (/* binding */ ready)\n/* harmony export */ });\nconst ready = (args)=>{\n    const { serverURL } = args;\n    if (typeof window !== 'undefined') {\n        // This subscription may have been from either an iframe or a popup\n        // We need to report 'ready' to the parent window, whichever it may be\n        // i.e. `window?.opener` for popups, `window?.parent` for iframes\n        const windowToPostTo = window?.opener || window?.parent;\n        windowToPostTo?.postMessage({\n            type: 'payload-live-preview',\n            ready: true\n        }, serverURL);\n    }\n};\n\n//# sourceMappingURL=ready.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHBheWxvYWRjbXMrbGl2ZS1wcmV2aWV3QDMuODUuMS9ub2RlX21vZHVsZXMvQHBheWxvYWRjbXMvbGl2ZS1wcmV2aWV3L2Rpc3QvcmVhZHkuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPO0FBQ1AsWUFBWSxZQUFZO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsiL2hvbWUvcmVpemVuZC9EZXNrdG9wL01NVi9wYXlsb2FkQ21zL25vZGVfbW9kdWxlcy8ucG5wbS9AcGF5bG9hZGNtcytsaXZlLXByZXZpZXdAMy44NS4xL25vZGVfbW9kdWxlcy9AcGF5bG9hZGNtcy9saXZlLXByZXZpZXcvZGlzdC9yZWFkeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcmVhZHkgPSAoYXJncyk9PntcbiAgICBjb25zdCB7IHNlcnZlclVSTCB9ID0gYXJncztcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gVGhpcyBzdWJzY3JpcHRpb24gbWF5IGhhdmUgYmVlbiBmcm9tIGVpdGhlciBhbiBpZnJhbWUgb3IgYSBwb3B1cFxuICAgICAgICAvLyBXZSBuZWVkIHRvIHJlcG9ydCAncmVhZHknIHRvIHRoZSBwYXJlbnQgd2luZG93LCB3aGljaGV2ZXIgaXQgbWF5IGJlXG4gICAgICAgIC8vIGkuZS4gYHdpbmRvdz8ub3BlbmVyYCBmb3IgcG9wdXBzLCBgd2luZG93Py5wYXJlbnRgIGZvciBpZnJhbWVzXG4gICAgICAgIGNvbnN0IHdpbmRvd1RvUG9zdFRvID0gd2luZG93Py5vcGVuZXIgfHwgd2luZG93Py5wYXJlbnQ7XG4gICAgICAgIHdpbmRvd1RvUG9zdFRvPy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICB0eXBlOiAncGF5bG9hZC1saXZlLXByZXZpZXcnLFxuICAgICAgICAgICAgcmVhZHk6IHRydWVcbiAgICAgICAgfSwgc2VydmVyVVJMKTtcbiAgICB9XG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yZWFkeS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@payloadcms+live-preview@3.85.1/node_modules/@payloadcms/live-preview/dist/ready.js\n");

/***/ })

};
;