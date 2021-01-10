(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var __exportStar = (target, module, desc) => {
    __markAsModule(target);
    if (typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
    }
    return target;
  };
  var __toModule = (module) => {
    if (module && module.__esModule)
      return module;
    return __exportStar(__defProp(__create(__getProtoOf(module)), "default", {value: module, enumerable: true}), module);
  };

  // ui/shims/react.js
  var require_react = __commonJS((exports, module) => {
    module.exports = window.React;
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/helpers/bind.js
  var require_bind = __commonJS((exports, module) => {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
      };
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/node_modules/is-buffer/index.js
  var require_is_buffer = __commonJS((exports, module) => {
    /*!
     * Determine if an object is a Buffer
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    module.exports = function isBuffer(obj) {
      return obj != null && obj.constructor != null && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/utils.js
  var require_utils = __commonJS((exports, module) => {
    "use strict";
    var bind = require_bind();
    var isBuffer = require_is_buffer();
    var toString = Object.prototype.toString;
    function isArray(val) {
      return toString.call(val) === "[object Array]";
    }
    function isArrayBuffer(val) {
      return toString.call(val) === "[object ArrayBuffer]";
    }
    function isFormData(val) {
      return typeof FormData !== "undefined" && val instanceof FormData;
    }
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isDate(val) {
      return toString.call(val) === "[object Date]";
    }
    function isFile(val) {
      return toString.call(val) === "[object File]";
    }
    function isBlob(val) {
      return toString.call(val) === "[object Blob]";
    }
    function isFunction(val) {
      return toString.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isURLSearchParams(val) {
      return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
    }
    function trim(str) {
      return str.replace(/^\s*/, "").replace(/\s*$/, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
          fn.call(null, obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (typeof result[key] === "object" && typeof val === "object") {
          result[key] = merge(result[key], val);
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function deepMerge() {
      var result = {};
      function assignValue(val, key) {
        if (typeof result[key] === "object" && typeof val === "object") {
          result[key] = deepMerge(result[key], val);
        } else if (typeof val === "object") {
          result[key] = deepMerge({}, val);
        } else {
          result[key] = val;
        }
      }
      for (var i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      deepMerge,
      extend,
      trim
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/helpers/buildURL.js
  var require_buildURL = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    function encode(val) {
      return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url, params, paramsSerializer) {
      if (!params) {
        return url;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts.push(encode(key) + "=" + encode(v));
          });
        });
        serializedParams = parts.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url.indexOf("#");
        if (hashmarkIndex !== -1) {
          url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url;
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/core/InterceptorManager.js
  var require_InterceptorManager = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected) {
      this.handlers.push({
        fulfilled,
        rejected
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/core/transformData.js
  var require_transformData = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    module.exports = function transformData(data, headers, fns) {
      utils.forEach(fns, function transform(fn) {
        data = fn(data, headers);
      });
      return data;
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/cancel/isCancel.js
  var require_isCancel = __commonJS((exports, module) => {
    "use strict";
    module.exports = function isCancel(value) {
      return !!(value && value.__CANCEL__);
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/helpers/normalizeHeaderName.js
  var require_normalizeHeaderName = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value;
          delete headers[name];
        }
      });
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/core/enhanceError.js
  var require_enhanceError = __commonJS((exports, module) => {
    "use strict";
    module.exports = function enhanceError(error, config, code, request, response) {
      error.config = config;
      if (code) {
        error.code = code;
      }
      error.request = request;
      error.response = response;
      error.isAxiosError = true;
      error.toJSON = function() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code
        };
      };
      return error;
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/core/createError.js
  var require_createError = __commonJS((exports, module) => {
    "use strict";
    var enhanceError = require_enhanceError();
    module.exports = function createError(message2, config, code, request, response) {
      var error = new Error(message2);
      return enhanceError(error, config, code, request, response);
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/core/settle.js
  var require_settle = __commonJS((exports, module) => {
    "use strict";
    var createError = require_createError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(createError("Request failed with status code " + response.status, response.config, null, response.request, response));
      }
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/helpers/parseHeaders.js
  var require_parseHeaders = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i = line.indexOf(":");
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/helpers/isURLSameOrigin.js
  var require_isURLSameOrigin = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url) {
        var href = url;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/helpers/cookies.js
  var require_cookies = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/adapters/xhr.js
  var require_xhr = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var buildURL = require_buildURL();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var createError = require_createError();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        if (utils.isFormData(requestData)) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password || "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        request.onreadystatechange = function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !config.responseType || config.responseType === "text" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(resolve, reject, response);
          request = null;
        };
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(createError("Request aborted", config, "ECONNABORTED", request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(createError("Network Error", config, null, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          reject(createError("timeout of " + config.timeout + "ms exceeded", config, "ECONNABORTED", request));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var cookies = require_cookies();
          var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (config.withCredentials) {
          request.withCredentials = true;
        }
        if (config.responseType) {
          try {
            request.responseType = config.responseType;
          } catch (e) {
            if (config.responseType !== "json") {
              throw e;
            }
          }
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken) {
          config.cancelToken.promise.then(function onCanceled(cancel) {
            if (!request) {
              return;
            }
            request.abort();
            reject(cancel);
            request = null;
          });
        }
        if (requestData === void 0) {
          requestData = null;
        }
        request.send(requestData);
      });
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/defaults.js
  var require_defaults = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      } else if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      }
      return adapter;
    }
    var defaults = {
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        if (utils.isObject(data)) {
          setContentTypeIfUnset(headers, "application/json;charset=utf-8");
          return JSON.stringify(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (e) {
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      }
    };
    defaults.headers = {
      common: {
        Accept: "application/json, text/plain, */*"
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/helpers/isAbsoluteURL.js
  var require_isAbsoluteURL = __commonJS((exports, module) => {
    "use strict";
    module.exports = function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/helpers/combineURLs.js
  var require_combineURLs = __commonJS((exports, module) => {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/core/dispatchRequest.js
  var require_dispatchRequest = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      if (config.baseURL && !isAbsoluteURL(config.url)) {
        config.url = combineURLs(config.baseURL, config.url);
      }
      config.headers = config.headers || {};
      config.data = transformData(config.data, config.headers, config.transformRequest);
      config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers || {});
      utils.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function cleanHeaderConfig(method) {
        delete config.headers[method];
      });
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData(response.data, response.headers, config.transformResponse);
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
          }
        }
        return Promise.reject(reason);
      });
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/core/mergeConfig.js
  var require_mergeConfig = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      utils.forEach(["url", "method", "params", "data"], function valueFromConfig2(prop) {
        if (typeof config2[prop] !== "undefined") {
          config[prop] = config2[prop];
        }
      });
      utils.forEach(["headers", "auth", "proxy"], function mergeDeepProperties(prop) {
        if (utils.isObject(config2[prop])) {
          config[prop] = utils.deepMerge(config1[prop], config2[prop]);
        } else if (typeof config2[prop] !== "undefined") {
          config[prop] = config2[prop];
        } else if (utils.isObject(config1[prop])) {
          config[prop] = utils.deepMerge(config1[prop]);
        } else if (typeof config1[prop] !== "undefined") {
          config[prop] = config1[prop];
        }
      });
      utils.forEach([
        "baseURL",
        "transformRequest",
        "transformResponse",
        "paramsSerializer",
        "timeout",
        "withCredentials",
        "adapter",
        "responseType",
        "xsrfCookieName",
        "xsrfHeaderName",
        "onUploadProgress",
        "onDownloadProgress",
        "maxContentLength",
        "validateStatus",
        "maxRedirects",
        "httpAgent",
        "httpsAgent",
        "cancelToken",
        "socketPath"
      ], function defaultToConfig2(prop) {
        if (typeof config2[prop] !== "undefined") {
          config[prop] = config2[prop];
        } else if (typeof config1[prop] !== "undefined") {
          config[prop] = config1[prop];
        }
      });
      return config;
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/core/Axios.js
  var require_Axios = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(config) {
      if (typeof config === "string") {
        config = arguments[1] || {};
        config.url = arguments[0];
      } else {
        config = config || {};
      }
      config = mergeConfig(this.defaults, config);
      config.method = config.method ? config.method.toLowerCase() : "get";
      var chain = [dispatchRequest, void 0];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, "");
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url, config) {
        return this.request(utils.merge(config || {}, {
          method,
          url
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      Axios.prototype[method] = function(url, data, config) {
        return this.request(utils.merge(config || {}, {
          method,
          url,
          data
        }));
      };
    });
    module.exports = Axios;
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/cancel/Cancel.js
  var require_Cancel = __commonJS((exports, module) => {
    "use strict";
    function Cancel(message2) {
      this.message = message2;
    }
    Cancel.prototype.toString = function toString() {
      return "Cancel" + (this.message ? ": " + this.message : "");
    };
    Cancel.prototype.__CANCEL__ = true;
    module.exports = Cancel;
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/cancel/CancelToken.js
  var require_CancelToken = __commonJS((exports, module) => {
    "use strict";
    var Cancel = require_Cancel();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      executor(function cancel(message2) {
        if (token.reason) {
          return;
        }
        token.reason = new Cancel(message2);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/helpers/spread.js
  var require_spread = __commonJS((exports, module) => {
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/lib/axios.js
  var require_axios = __commonJS((exports, module) => {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      return instance;
    }
    var axios3 = createInstance(defaults);
    axios3.Axios = Axios;
    axios3.create = function create(instanceConfig) {
      return createInstance(mergeConfig(axios3.defaults, instanceConfig));
    };
    axios3.Cancel = require_Cancel();
    axios3.CancelToken = require_CancelToken();
    axios3.isCancel = require_isCancel();
    axios3.all = function all(promises) {
      return Promise.all(promises);
    };
    axios3.spread = require_spread();
    module.exports = axios3;
    module.exports.default = axios3;
  });

  // ../../APPDATA/Local/Yarn/Data/global/node_modules/axios/index.js
  var require_axios2 = __commonJS((exports, module) => {
    module.exports = require_axios();
  });

  // ui/shims/antd.js
  var require_antd = __commonJS((exports, module) => {
    module.exports = window.antd;
  });

  // ui/src/index.tsx
  const react = __toModule(require_react());
  const axios = __toModule(require_axios2());
  const antd = __toModule(require_antd());
  const {Option} = antd.Select;
  const {Header, Content, Footer} = antd.Layout;
  const App = () => {
    const [offset, setOffset] = react.useState(document.documentElement.clientWidth < 700 ? 1 : 8);
    const [model, setModel] = react.useState("SkipFSRCNN-MS N");
    const [url, setUrl] = react.useState();
    const [fileList, setFileList] = react.useState();
    const lock = react.useRef(false);
    react.useEffect(() => {
      addEventListener("resize", () => {
        setOffset(document.documentElement.clientWidth < 700 ? 1 : 8);
      });
    }, []);
    const submit = () => {
      if (!fileList) {
        antd.message.warning("\u8BF7\u5148\u9009\u62E9\u4E00\u5F20\u56FE\u7247");
        return;
      }
      if (lock.current) {
        antd.message.warning("\u8BF7\u4E0D\u8981\u9891\u7E41\u63D0\u4EA4");
        return;
      }
      lock.current = true;
      const formData = new FormData();
      formData.append("model", model);
      formData.append("file", fileList[0]);
      antd.message.info("\u5728\u505A\u4E86\u5728\u505A\u4E86");
      axios.default.post("/sr", formData, {
        responseType: "blob"
      }).then((result) => {
        if (url) {
          URL.revokeObjectURL(url);
        }
        const url_ = URL.createObjectURL(result.data);
        console.log(url_);
        antd.message.success("\u6211\u597D\u4E86");
        setUrl(url_);
        lock.current = false;
      }).catch((err) => {
        lock.current = false;
        const reader = new FileReader();
        reader.readAsText(err.response.data);
        reader.onloadend = () => {
          antd.message.error(reader.result);
        };
      });
    };
    return /* @__PURE__ */ react.default.createElement(antd.Layout, {
      style: {minHeight: "100%"}
    }, /* @__PURE__ */ react.default.createElement(Header, null, /* @__PURE__ */ react.default.createElement("h1", {
      style: {
        color: "white"
      }
    }, "\u6211\u4EEC\u7684demo")), /* @__PURE__ */ react.default.createElement(Content, null, /* @__PURE__ */ react.default.createElement(antd.Row, null, /* @__PURE__ */ react.default.createElement(antd.Col, {
      offset,
      span: 24 - offset - offset
    }, /* @__PURE__ */ react.default.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        marginTop: 10
      }
    }, /* @__PURE__ */ react.default.createElement("div", null, "\u9009\u62E9\u6A21\u578B\uFF1A"), /* @__PURE__ */ react.default.createElement(antd.Select, {
      value: model,
      onChange: (value) => {
        console.log(value);
        setModel(value);
      },
      style: {
        display: "inline-block",
        flexGrow: 1
      }
    }, /* @__PURE__ */ react.default.createElement(Option, {
      value: "SkipFSRCNN-MS H"
    }, "SkipFSRCNN-MS H"), /* @__PURE__ */ react.default.createElement(Option, {
      value: "SkipFSRCNN-MS N"
    }, "SkipFSRCNN-MS N"), /* @__PURE__ */ react.default.createElement(Option, {
      value: "CARN-M"
    }, "CARN-M"))), /* @__PURE__ */ react.default.createElement("div", {
      style: {
        marginTop: 10,
        marginBottom: 10
      }
    }, "\u9009\u62E9\u56FE\u7247\uFF1A", /* @__PURE__ */ react.default.createElement(antd.Upload, {
      beforeUpload: (file) => {
        console.log(file);
        setFileList([file]);
        return false;
      },
      fileList
    }, /* @__PURE__ */ react.default.createElement(antd.Button, null, "\u4E0A\u4F20"))), /* @__PURE__ */ react.default.createElement(antd.Button, {
      block: true,
      type: "primary",
      onClick: submit
    }, "\u63D0\u4EA4\uFF01"), /* @__PURE__ */ react.default.createElement(antd.Divider, null, "\u597D\uFF01\u5F88\u6709\u7CBE\u795E\uFF01"), url && /* @__PURE__ */ react.default.createElement("a", {
      href: url,
      target: "_blank"
    }, /* @__PURE__ */ react.default.createElement("img", {
      src: url,
      style: {width: "100%"}
    }))))), /* @__PURE__ */ react.default.createElement(Footer, null, "\u8BF7\u7231\u62A4\u670D\u52A1\u5668~"));
  };
  ReactDOM.render(/* @__PURE__ */ react.default.createElement(App, null), document.querySelector("#app"));
})();
//# sourceMappingURL=bundle.js.map
