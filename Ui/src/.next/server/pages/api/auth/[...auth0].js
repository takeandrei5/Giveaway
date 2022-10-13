"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/auth/[...auth0]";
exports.ids = ["pages/api/auth/[...auth0]"];
exports.modules = {

/***/ "@auth0/nextjs-auth0":
/*!**************************************!*\
  !*** external "@auth0/nextjs-auth0" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "next/config":
/*!******************************!*\
  !*** external "next/config" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/config");

/***/ }),

/***/ "(api)/./src/api/webapi/users/server-side/createUser.ts":
/*!********************************************************!*\
  !*** ./src/api/webapi/users/server-side/createUser.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _routes_webapi_users__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @routes/webapi/users */ \"(api)/./src/routes/webapi/users/index.ts\");\n/* harmony import */ var _utils_axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/axios */ \"(api)/./src/utils/axios.ts\");\n\n\nconst createUser = async (accessToken)=>{\n    await _utils_axios__WEBPACK_IMPORTED_MODULE_1__.axiosInstance.post(_routes_webapi_users__WEBPACK_IMPORTED_MODULE_0__.CREATE_USER_URL, {}, {\n        headers: {\n            Authorization: \"Bearer \" + accessToken\n        }\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createUser);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvYXBpL3dlYmFwaS91c2Vycy9zZXJ2ZXItc2lkZS9jcmVhdGVVc2VyLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF1RDtBQUNWO0FBRTdDLE1BQU1FLFVBQVUsR0FBRyxPQUFPQyxXQUFtQixHQUFvQjtJQUNoRSxNQUFNRiw0REFBa0IsQ0FDdkJELGlFQUFlLEVBQ2YsRUFBRSxFQUNGO1FBQ0NLLE9BQU8sRUFBRTtZQUNSQyxhQUFhLEVBQUUsU0FBUyxHQUFHSCxXQUFXO1NBQ3RDO0tBQ0QsQ0FDRCxDQUFDO0NBQ0Y7QUFFRCxpRUFBZUQsVUFBVSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2l2ZWF3YXktdWkvLi9zcmMvYXBpL3dlYmFwaS91c2Vycy9zZXJ2ZXItc2lkZS9jcmVhdGVVc2VyLnRzPzIwOTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ1JFQVRFX1VTRVJfVVJMIH0gZnJvbSAnQHJvdXRlcy93ZWJhcGkvdXNlcnMnO1xyXG5pbXBvcnQgeyBheGlvc0luc3RhbmNlIH0gZnJvbSAnQHV0aWxzL2F4aW9zJztcclxuXHJcbmNvbnN0IGNyZWF0ZVVzZXIgPSBhc3luYyAoYWNjZXNzVG9rZW46IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG5cdGF3YWl0IGF4aW9zSW5zdGFuY2UucG9zdChcclxuXHRcdENSRUFURV9VU0VSX1VSTCxcclxuXHRcdHt9LFxyXG5cdFx0e1xyXG5cdFx0XHRoZWFkZXJzOiB7XHJcblx0XHRcdFx0QXV0aG9yaXphdGlvbjogJ0JlYXJlciAnICsgYWNjZXNzVG9rZW4sXHJcblx0XHRcdH0sXHJcblx0XHR9XHJcblx0KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVVzZXI7XHJcbiJdLCJuYW1lcyI6WyJDUkVBVEVfVVNFUl9VUkwiLCJheGlvc0luc3RhbmNlIiwiY3JlYXRlVXNlciIsImFjY2Vzc1Rva2VuIiwicG9zdCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/api/webapi/users/server-side/createUser.ts\n");

/***/ }),

/***/ "(api)/./src/api/webapi/users/server-side/index.ts":
/*!***************************************************!*\
  !*** ./src/api/webapi/users/server-side/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createUser\": () => (/* reexport safe */ _createUser__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _createUser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createUser */ \"(api)/./src/api/webapi/users/server-side/createUser.ts\");\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvYXBpL3dlYmFwaS91c2Vycy9zZXJ2ZXItc2lkZS9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFxRCIsInNvdXJjZXMiOlsid2VicGFjazovL2dpdmVhd2F5LXVpLy4vc3JjL2FwaS93ZWJhcGkvdXNlcnMvc2VydmVyLXNpZGUvaW5kZXgudHM/MDM0ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBkZWZhdWx0IGFzIGNyZWF0ZVVzZXIgfSBmcm9tICcuL2NyZWF0ZVVzZXInO1xyXG4iXSwibmFtZXMiOlsiZGVmYXVsdCIsImNyZWF0ZVVzZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/api/webapi/users/server-side/index.ts\n");

/***/ }),

/***/ "(api)/./src/pages/api/auth/[...auth0].page.ts":
/*!***********************************************!*\
  !*** ./src/pages/api/auth/[...auth0].page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api_webapi_users_server_side__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @api/webapi/users/server-side */ \"(api)/./src/api/webapi/users/server-side/index.ts\");\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @auth0/nextjs-auth0 */ \"@auth0/nextjs-auth0\");\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst afterCallback = async (_, __, session)=>{\n    await (0,_api_webapi_users_server_side__WEBPACK_IMPORTED_MODULE_0__.createUser)(session.accessToken);\n    return session;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_1__.handleAuth)({\n    async callback (req, res) {\n        try {\n            await (0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_1__.handleCallback)(req, res, {\n                afterCallback\n            });\n        } catch (error) {\n            console.error(error);\n        }\n    }\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2F1dGgvWy4uLmF1dGgwXS5wYWdlLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDK0U7QUFDTztBQUd0RixNQUFNSSxhQUFhLEdBQUcsT0FBT0MsQ0FBaUIsRUFBRUMsRUFBbUIsRUFBRUMsT0FBZ0IsR0FBSztJQUN6RixNQUFNTix5RUFBZ0IsQ0FBQ00sT0FBTyxDQUFDQyxXQUFXLENBQUUsQ0FBQztJQUU3QyxPQUFPRCxPQUFPLENBQUM7Q0FDZjtBQUVELGlFQUFlTCwrREFBVSxDQUFDO0lBQ3pCLE1BQU1PLFFBQVEsRUFBQ0MsR0FBbUIsRUFBRUMsR0FBb0IsRUFBRTtRQUN6RCxJQUFJO1lBQ0gsTUFBTVIsbUVBQWMsQ0FBQ08sR0FBRyxFQUFFQyxHQUFHLEVBQUU7Z0JBQUVQLGFBQWE7YUFBRSxDQUFDLENBQUM7U0FDbEQsQ0FBQyxPQUFPUSxLQUFLLEVBQUU7WUFDZkMsT0FBTyxDQUFDRCxLQUFLLENBQUNBLEtBQUssQ0FBQyxDQUFDO1NBQ3JCO0tBQ0Q7Q0FDRCxDQUFDLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naXZlYXdheS11aS8uL3NyYy9wYWdlcy9hcGkvYXV0aC9bLi4uYXV0aDBdLnBhZ2UudHM/ODkyYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVVc2VyIGFzIGNyZWF0ZUNoYXRBcGlVc2VyIH0gZnJvbSAnQGFwaS9jaGF0YXBpL3VzZXJzL3NlcnZlci1zaWRlJztcclxuaW1wb3J0IHsgY3JlYXRlVXNlciBhcyBjcmVhdGVXZWJBcGlVc2VyIH0gZnJvbSAnQGFwaS93ZWJhcGkvdXNlcnMvc2VydmVyLXNpZGUnO1xyXG5pbXBvcnQgeyBnZXRTZXNzaW9uLCBoYW5kbGVBdXRoLCBoYW5kbGVDYWxsYmFjaywgU2Vzc2lvbiB9IGZyb20gJ0BhdXRoMC9uZXh0anMtYXV0aDAnO1xyXG5pbXBvcnQgeyBOZXh0QXBpUmVxdWVzdCwgTmV4dEFwaVJlc3BvbnNlIH0gZnJvbSAnbmV4dCc7XHJcblxyXG5jb25zdCBhZnRlckNhbGxiYWNrID0gYXN5bmMgKF86IE5leHRBcGlSZXF1ZXN0LCBfXzogTmV4dEFwaVJlc3BvbnNlLCBzZXNzaW9uOiBTZXNzaW9uKSA9PiB7XHJcblx0YXdhaXQgY3JlYXRlV2ViQXBpVXNlcihzZXNzaW9uLmFjY2Vzc1Rva2VuISk7XHJcblxyXG5cdHJldHVybiBzZXNzaW9uO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlQXV0aCh7XHJcblx0YXN5bmMgY2FsbGJhY2socmVxOiBOZXh0QXBpUmVxdWVzdCwgcmVzOiBOZXh0QXBpUmVzcG9uc2UpIHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGF3YWl0IGhhbmRsZUNhbGxiYWNrKHJlcSwgcmVzLCB7IGFmdGVyQ2FsbGJhY2sgfSk7XHJcblx0XHR9IGNhdGNoIChlcnJvcikge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdH1cclxuXHR9LFxyXG59KTtcclxuIl0sIm5hbWVzIjpbImNyZWF0ZVVzZXIiLCJjcmVhdGVXZWJBcGlVc2VyIiwiaGFuZGxlQXV0aCIsImhhbmRsZUNhbGxiYWNrIiwiYWZ0ZXJDYWxsYmFjayIsIl8iLCJfXyIsInNlc3Npb24iLCJhY2Nlc3NUb2tlbiIsImNhbGxiYWNrIiwicmVxIiwicmVzIiwiZXJyb3IiLCJjb25zb2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/auth/[...auth0].page.ts\n");

/***/ }),

/***/ "(api)/./src/routes/webapi/users/index.ts":
/*!******************************************!*\
  !*** ./src/routes/webapi/users/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CREATE_USER_URL\": () => (/* binding */ CREATE_USER_URL)\n/* harmony export */ });\nconst CREATE_USER_URL = \"/api/webapi/users\";\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcm91dGVzL3dlYmFwaS91c2Vycy9pbmRleC50cy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsZUFBZSxHQUFHLG1CQUFtQjtBQUVoQiIsInNvdXJjZXMiOlsid2VicGFjazovL2dpdmVhd2F5LXVpLy4vc3JjL3JvdXRlcy93ZWJhcGkvdXNlcnMvaW5kZXgudHM/MWUzNiJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDUkVBVEVfVVNFUl9VUkwgPSAnL2FwaS93ZWJhcGkvdXNlcnMnO1xyXG5cclxuZXhwb3J0IHsgQ1JFQVRFX1VTRVJfVVJMIH07XHJcbiJdLCJuYW1lcyI6WyJDUkVBVEVfVVNFUl9VUkwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./src/routes/webapi/users/index.ts\n");

/***/ }),

/***/ "(api)/./src/utils/axios.ts":
/*!****************************!*\
  !*** ./src/utils/axios.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"axiosCdnInstance\": () => (/* binding */ axiosCdnInstance),\n/* harmony export */   \"axiosInstance\": () => (/* binding */ axiosInstance),\n/* harmony export */   \"handleDates\": () => (/* binding */ handleDates)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/config */ \"next/config\");\n/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_config__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst { serverRuntimeConfig , publicRuntimeConfig  } = next_config__WEBPACK_IMPORTED_MODULE_1___default()();\nconst axiosInstance = axios__WEBPACK_IMPORTED_MODULE_0___default().create({\n    baseURL: serverRuntimeConfig.baseURL || publicRuntimeConfig.baseURL,\n    validateStatus: (status)=>status < 500\n});\nconst axiosCdnInstance = axios__WEBPACK_IMPORTED_MODULE_0___default().create({\n    baseURL: \"https://bypass-cors.woxxle-giveaway.workers.dev/?https://api.cloudflare.com/client/v4/accounts/81339e70b0e08dc3666c602a5edb7bd7/images/v1\",\n    headers: {\n        Authorization: `Bearer ${\"sfDVc2gQS3SjAFoWSK21LiZwR_wmvxQTSIkIM5ul\"}`\n    }\n});\naxiosInstance.interceptors.response.use((response)=>{\n    handleDates(response.data);\n    return response;\n});\nfunction isIsoDateString(value) {\n    const isoDateFormat = /^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[-+]\\d{2}:?\\d{2}|Z)?$/;\n    return !!value && typeof value === \"string\" && isoDateFormat.test(value);\n}\nfunction handleDates(body) {\n    if (!body || typeof body !== \"object\") return;\n    for (const key of Object.keys(body)){\n        const value = body[key];\n        if (isIsoDateString(value)) {\n            body[key] = new Date(value);\n            continue;\n        }\n        if (typeof value === \"object\") handleDates(value);\n    }\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvdXRpbHMvYXhpb3MudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUE0RDtBQUN4QjtBQUVwQyxNQUFNLEVBQUVFLG1CQUFtQixHQUFFQyxtQkFBbUIsR0FBRSxHQUFHRixrREFBUyxFQUFFO0FBRWhFLE1BQU1HLGFBQWEsR0FBa0JKLG1EQUFZLENBQUM7SUFDakRNLE9BQU8sRUFBRUosbUJBQW1CLENBQUNJLE9BQU8sSUFBSUgsbUJBQW1CLENBQUNHLE9BQU87SUFDbkVDLGNBQWMsRUFBRSxDQUFDQyxNQUFjLEdBQUtBLE1BQU0sR0FBRyxHQUFHO0NBQ2hELENBQUM7QUFFRixNQUFNQyxnQkFBZ0IsR0FBa0JULG1EQUFZLENBQUM7SUFDcERNLE9BQU8sRUFBRUksMklBQTJDO0lBQ3BERyxPQUFPLEVBQUU7UUFDUkMsYUFBYSxFQUFFLENBQUMsT0FBTyxFQUFFSiwwQ0FBd0MsQ0FBQyxDQUFDO0tBQ25FO0NBQ0QsQ0FBQztBQUVGTixhQUFhLENBQUNZLFlBQVksQ0FBQ0MsUUFBUSxDQUFDQyxHQUFHLENBQUMsQ0FBQ0QsUUFBdUIsR0FBSztJQUNwRUUsV0FBVyxDQUFDRixRQUFRLENBQUNHLElBQUksQ0FBQyxDQUFDO0lBQzNCLE9BQU9ILFFBQVEsQ0FBQztDQUNoQixDQUFDLENBQUM7QUFFSCxTQUFTSSxlQUFlLENBQUNDLEtBQWMsRUFBVztJQUNqRCxNQUFNQyxhQUFhLDJFQUFtRjtJQUV0RyxPQUFPLENBQUMsQ0FBQ0QsS0FBSyxJQUFJLE9BQU9BLEtBQUssS0FBSyxRQUFRLElBQUlDLGFBQWEsQ0FBQ0MsSUFBSSxDQUFDRixLQUFLLENBQUMsQ0FBQztDQUN6RTtBQUVNLFNBQVNILFdBQVcsQ0FBQ00sSUFBUyxFQUFRO0lBQzVDLElBQUksQ0FBQ0EsSUFBSSxJQUFJLE9BQU9BLElBQUksS0FBSyxRQUFRLEVBQUUsT0FBTztJQUU5QyxLQUFLLE1BQU1DLEdBQUcsSUFBSUMsTUFBTSxDQUFDQyxJQUFJLENBQUNILElBQUksQ0FBQyxDQUFFO1FBQ3BDLE1BQU1ILEtBQUssR0FBR0csSUFBSSxDQUFDQyxHQUFHLENBQUM7UUFDdkIsSUFBSUwsZUFBZSxDQUFDQyxLQUFLLENBQUMsRUFBRTtZQUMzQkcsSUFBSSxDQUFDQyxHQUFHLENBQUMsR0FBRyxJQUFJRyxJQUFJLENBQUNQLEtBQUssQ0FBVyxDQUFDO1lBQ3RDLFNBQVM7U0FDVDtRQUVELElBQUksT0FBT0EsS0FBSyxLQUFLLFFBQVEsRUFBRUgsV0FBVyxDQUFDRyxLQUFLLENBQUMsQ0FBQztLQUNsRDtDQUNEO0FBRTBDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2l2ZWF3YXktdWkvLi9zcmMvdXRpbHMvYXhpb3MudHM/MWM4MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MsIHsgQXhpb3NJbnN0YW5jZSwgQXhpb3NSZXNwb25zZSB9IGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IGdldENvbmZpZyBmcm9tICduZXh0L2NvbmZpZyc7XHJcblxyXG5jb25zdCB7IHNlcnZlclJ1bnRpbWVDb25maWcsIHB1YmxpY1J1bnRpbWVDb25maWcgfSA9IGdldENvbmZpZygpO1xyXG5cclxuY29uc3QgYXhpb3NJbnN0YW5jZTogQXhpb3NJbnN0YW5jZSA9IGF4aW9zLmNyZWF0ZSh7XHJcblx0YmFzZVVSTDogc2VydmVyUnVudGltZUNvbmZpZy5iYXNlVVJMIHx8IHB1YmxpY1J1bnRpbWVDb25maWcuYmFzZVVSTCxcclxuXHR2YWxpZGF0ZVN0YXR1czogKHN0YXR1czogbnVtYmVyKSA9PiBzdGF0dXMgPCA1MDAsXHJcbn0pO1xyXG5cclxuY29uc3QgYXhpb3NDZG5JbnN0YW5jZTogQXhpb3NJbnN0YW5jZSA9IGF4aW9zLmNyZWF0ZSh7XHJcblx0YmFzZVVSTDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQ0ROX0lNQUdFU19CQVNFX1VSTCxcclxuXHRoZWFkZXJzOiB7XHJcblx0XHRBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7cHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQ0ROX0FDQ0VTU19UT0tFTn1gLFxyXG5cdH0sXHJcbn0pO1xyXG5cclxuYXhpb3NJbnN0YW5jZS5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKChyZXNwb25zZTogQXhpb3NSZXNwb25zZSkgPT4ge1xyXG5cdGhhbmRsZURhdGVzKHJlc3BvbnNlLmRhdGEpO1xyXG5cdHJldHVybiByZXNwb25zZTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBpc0lzb0RhdGVTdHJpbmcodmFsdWU6IHVua25vd24pOiBib29sZWFuIHtcclxuXHRjb25zdCBpc29EYXRlRm9ybWF0OiBSZWdFeHAgPSAvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9VFxcZHsyfTpcXGR7Mn06XFxkezJ9KD86XFwuXFxkKik/KD86Wy0rXVxcZHsyfTo/XFxkezJ9fFopPyQvO1xyXG5cclxuXHRyZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIGlzb0RhdGVGb3JtYXQudGVzdCh2YWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVEYXRlcyhib2R5OiBhbnkpOiB2b2lkIHtcclxuXHRpZiAoIWJvZHkgfHwgdHlwZW9mIGJvZHkgIT09ICdvYmplY3QnKSByZXR1cm47XHJcblxyXG5cdGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKGJvZHkpKSB7XHJcblx0XHRjb25zdCB2YWx1ZSA9IGJvZHlba2V5XTtcclxuXHRcdGlmIChpc0lzb0RhdGVTdHJpbmcodmFsdWUpKSB7XHJcblx0XHRcdGJvZHlba2V5XSA9IG5ldyBEYXRlKHZhbHVlIGFzIHN0cmluZyk7XHJcblx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSBoYW5kbGVEYXRlcyh2YWx1ZSk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgeyBheGlvc0Nkbkluc3RhbmNlLCBheGlvc0luc3RhbmNlIH07XHJcbiJdLCJuYW1lcyI6WyJheGlvcyIsImdldENvbmZpZyIsInNlcnZlclJ1bnRpbWVDb25maWciLCJwdWJsaWNSdW50aW1lQ29uZmlnIiwiYXhpb3NJbnN0YW5jZSIsImNyZWF0ZSIsImJhc2VVUkwiLCJ2YWxpZGF0ZVN0YXR1cyIsInN0YXR1cyIsImF4aW9zQ2RuSW5zdGFuY2UiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQ0ROX0lNQUdFU19CQVNFX1VSTCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiTkVYVF9QVUJMSUNfQ0ROX0FDQ0VTU19UT0tFTiIsImludGVyY2VwdG9ycyIsInJlc3BvbnNlIiwidXNlIiwiaGFuZGxlRGF0ZXMiLCJkYXRhIiwiaXNJc29EYXRlU3RyaW5nIiwidmFsdWUiLCJpc29EYXRlRm9ybWF0IiwidGVzdCIsImJvZHkiLCJrZXkiLCJPYmplY3QiLCJrZXlzIiwiRGF0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/utils/axios.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/auth/[...auth0].page.ts"));
module.exports = __webpack_exports__;

})();