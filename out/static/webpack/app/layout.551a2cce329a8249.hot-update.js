"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./src/lib/features/authentication/authenticationSlice.js":
/*!****************************************************************!*\
  !*** ./src/lib/features/authentication/authenticationSlice.js ***!
  \****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   login: function() { return /* binding */ login; },\n/* harmony export */   logout: function() { return /* binding */ logout; },\n/* harmony export */   register: function() { return /* binding */ register; }\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @reduxjs/toolkit */ \"(app-pages-browser)/./node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs\");\n/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/utils */ \"(app-pages-browser)/./src/lib/utils.js\");\n\n\nconst initialState = {\n    isLoading: false,\n    user: null\n};\nconst login = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)(\"authentication/login\", async (param, thunkAPI)=>{\n    let { email, password } = param;\n    try {\n        const { data } = await _lib_utils__WEBPACK_IMPORTED_MODULE_0__.customFetch.post(\"/auth/login\", {\n            email,\n            password\n        });\n        return data;\n    } catch (error) {\n        return thunkAPI.rejectWithValue(error.response.data.message);\n    }\n});\nconst register = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)(\"authentication/register\", async (param, thunkAPI)=>{\n    let { email, password, username } = param;\n    try {\n        const { data } = await _lib_utils__WEBPACK_IMPORTED_MODULE_0__.customFetch.post(\"/auth/register\", {\n            email,\n            password,\n            username\n        });\n        return data;\n    } catch (error) {\n        return thunkAPI.rejectWithValue(error.response.data.message);\n    }\n});\nconst logout = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createAsyncThunk)(\"authentication/logout\", async (_, thunkAPI)=>{\n    try {\n        const { data } = await _lib_utils__WEBPACK_IMPORTED_MODULE_0__.customFetch.delete(\"/auth/logout\");\n        return data;\n    } catch (error) {\n        return thunkAPI.rejectWithValue(error.response.data.message);\n    }\n});\nconst authenticationSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_1__.createSlice)({\n    name: \"authentication\",\n    initialState,\n    reducers: {},\n    extraReducers: (builder)=>{}\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (authenticationSlice.reducer);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9saWIvZmVhdHVyZXMvYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb25TbGljZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpRTtBQUN2QjtBQUUxQyxNQUFNRyxlQUFlO0lBQ3BCQyxXQUFXO0lBQ1hDLE1BQU07QUFDUDtBQUVPLE1BQU1DLFFBQVFMLGtFQUFnQkEsQ0FDcEMsd0JBQ0EsY0FBNEJNO1FBQXJCLEVBQUVDLEtBQUssRUFBRUMsUUFBUSxFQUFFO0lBQ3pCLElBQUk7UUFDSCxNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHLE1BQU1SLG1EQUFXQSxDQUFDUyxJQUFJLENBQUMsZUFBZTtZQUN0REg7WUFDQUM7UUFDRDtRQUNBLE9BQU9DO0lBQ1IsRUFBRSxPQUFPRSxPQUFPO1FBQ2YsT0FBT0wsU0FBU00sZUFBZSxDQUFDRCxNQUFNRSxRQUFRLENBQUNKLElBQUksQ0FBQ0ssT0FBTztJQUM1RDtBQUNELEdBQ0M7QUFFSyxNQUFNQyxXQUFXZixrRUFBZ0JBLENBQ3ZDLDJCQUNBLGNBQXNDTTtRQUEvQixFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRVEsUUFBUSxFQUFFO0lBQ25DLElBQUk7UUFDSCxNQUFNLEVBQUVQLElBQUksRUFBRSxHQUFHLE1BQU1SLG1EQUFXQSxDQUFDUyxJQUFJLENBQUMsa0JBQWtCO1lBQ3pESDtZQUNBQztZQUNBUTtRQUNEO1FBQ0EsT0FBT1A7SUFDUixFQUFFLE9BQU9FLE9BQU87UUFDZixPQUFPTCxTQUFTTSxlQUFlLENBQUNELE1BQU1FLFFBQVEsQ0FBQ0osSUFBSSxDQUFDSyxPQUFPO0lBQzVEO0FBQ0QsR0FDQztBQUVLLE1BQU1HLFNBQVNqQixrRUFBZ0JBLENBQ3JDLHlCQUNBLE9BQU9rQixHQUFHWjtJQUNULElBQUk7UUFDSCxNQUFNLEVBQUVHLElBQUksRUFBRSxHQUFHLE1BQU1SLG1EQUFXQSxDQUFDa0IsTUFBTSxDQUFDO1FBQzFDLE9BQU9WO0lBQ1IsRUFBRSxPQUFPRSxPQUFPO1FBQ2YsT0FBT0wsU0FBU00sZUFBZSxDQUFDRCxNQUFNRSxRQUFRLENBQUNKLElBQUksQ0FBQ0ssT0FBTztJQUM1RDtBQUNELEdBQ0M7QUFFRixNQUFNTSxzQkFBc0JyQiw2REFBV0EsQ0FBQztJQUN2Q3NCLE1BQU07SUFDTm5CO0lBQ0FvQixVQUFVLENBQUM7SUFDWEMsZUFBZSxDQUFDQyxXQUFhO0FBQzlCO0FBRUEsK0RBQWVKLG9CQUFvQkssT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9saWIvZmVhdHVyZXMvYXV0aGVudGljYXRpb24vYXV0aGVudGljYXRpb25TbGljZS5qcz80NDRjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNsaWNlLCBjcmVhdGVBc3luY1RodW5rIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XHJcbmltcG9ydCB7IGN1c3RvbUZldGNoIH0gZnJvbSAnQC9saWIvdXRpbHMnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG5cdGlzTG9hZGluZzogZmFsc2UsXHJcblx0dXNlcjogbnVsbCxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2dpbiA9IGNyZWF0ZUFzeW5jVGh1bmsoXHJcblx0J2F1dGhlbnRpY2F0aW9uL2xvZ2luJyxcclxuXHRhc3luYyAoeyBlbWFpbCwgcGFzc3dvcmQgfSwgdGh1bmtBUEkpID0+IHtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgY3VzdG9tRmV0Y2gucG9zdCgnL2F1dGgvbG9naW4nLCB7XHJcblx0XHRcdFx0ZW1haWwsXHJcblx0XHRcdFx0cGFzc3dvcmQsXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdHJldHVybiB0aHVua0FQSS5yZWplY3RXaXRoVmFsdWUoZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlKTtcclxuXHRcdH1cclxuXHR9XHJcbik7XHJcblxyXG5leHBvcnQgY29uc3QgcmVnaXN0ZXIgPSBjcmVhdGVBc3luY1RodW5rKFxyXG5cdCdhdXRoZW50aWNhdGlvbi9yZWdpc3RlcicsXHJcblx0YXN5bmMgKHsgZW1haWwsIHBhc3N3b3JkLCB1c2VybmFtZSB9LCB0aHVua0FQSSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgeyBkYXRhIH0gPSBhd2FpdCBjdXN0b21GZXRjaC5wb3N0KCcvYXV0aC9yZWdpc3RlcicsIHtcclxuXHRcdFx0XHRlbWFpbCxcclxuXHRcdFx0XHRwYXNzd29yZCxcclxuXHRcdFx0XHR1c2VybmFtZSxcclxuXHRcdFx0fSk7XHJcblx0XHRcdHJldHVybiBkYXRhO1xyXG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdFx0cmV0dXJuIHRodW5rQVBJLnJlamVjdFdpdGhWYWx1ZShlcnJvci5yZXNwb25zZS5kYXRhLm1lc3NhZ2UpO1xyXG5cdFx0fVxyXG5cdH1cclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2dvdXQgPSBjcmVhdGVBc3luY1RodW5rKFxyXG5cdCdhdXRoZW50aWNhdGlvbi9sb2dvdXQnLFxyXG5cdGFzeW5jIChfLCB0aHVua0FQSSkgPT4ge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgeyBkYXRhIH0gPSBhd2FpdCBjdXN0b21GZXRjaC5kZWxldGUoJy9hdXRoL2xvZ291dCcpO1xyXG5cdFx0XHRyZXR1cm4gZGF0YTtcclxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdHJldHVybiB0aHVua0FQSS5yZWplY3RXaXRoVmFsdWUoZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlKTtcclxuXHRcdH1cclxuXHR9XHJcbik7XHJcblxyXG5jb25zdCBhdXRoZW50aWNhdGlvblNsaWNlID0gY3JlYXRlU2xpY2Uoe1xyXG5cdG5hbWU6ICdhdXRoZW50aWNhdGlvbicsXHJcblx0aW5pdGlhbFN0YXRlLFxyXG5cdHJlZHVjZXJzOiB7fSxcclxuXHRleHRyYVJlZHVjZXJzOiAoYnVpbGRlcikgPT4ge30sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXV0aGVudGljYXRpb25TbGljZS5yZWR1Y2VyO1xyXG4iXSwibmFtZXMiOlsiY3JlYXRlU2xpY2UiLCJjcmVhdGVBc3luY1RodW5rIiwiY3VzdG9tRmV0Y2giLCJpbml0aWFsU3RhdGUiLCJpc0xvYWRpbmciLCJ1c2VyIiwibG9naW4iLCJ0aHVua0FQSSIsImVtYWlsIiwicGFzc3dvcmQiLCJkYXRhIiwicG9zdCIsImVycm9yIiwicmVqZWN0V2l0aFZhbHVlIiwicmVzcG9uc2UiLCJtZXNzYWdlIiwicmVnaXN0ZXIiLCJ1c2VybmFtZSIsImxvZ291dCIsIl8iLCJkZWxldGUiLCJhdXRoZW50aWNhdGlvblNsaWNlIiwibmFtZSIsInJlZHVjZXJzIiwiZXh0cmFSZWR1Y2VycyIsImJ1aWxkZXIiLCJyZWR1Y2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/lib/features/authentication/authenticationSlice.js\n"));

/***/ })

});