"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all3) => {
    for (var name in all3)
      __defProp(target, name, { get: all3[name], enumerable: true });
  };

  // ../node_modules/axios/lib/helpers/bind.js
  function bind(fn, thisArg) {
    return /* @__PURE__ */ __name(function wrap() {
      return fn.apply(thisArg, arguments);
    }, "wrap");
  }
  __name(bind, "bind");

  // ../node_modules/axios/lib/utils.js
  var { toString } = Object.prototype;
  var { getPrototypeOf } = Object;
  var kindOf = ((cache) => (thing) => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null));
  var kindOfTest = /* @__PURE__ */ __name((type) => {
    type = type.toLowerCase();
    return (thing) => kindOf(thing) === type;
  }, "kindOfTest");
  var typeOfTest = /* @__PURE__ */ __name((type) => (thing) => typeof thing === type, "typeOfTest");
  var { isArray } = Array;
  var isUndefined = typeOfTest("undefined");
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  __name(isBuffer, "isBuffer");
  var isArrayBuffer = kindOfTest("ArrayBuffer");
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  __name(isArrayBufferView, "isArrayBufferView");
  var isString = typeOfTest("string");
  var isFunction = typeOfTest("function");
  var isNumber = typeOfTest("number");
  var isObject = /* @__PURE__ */ __name((thing) => thing !== null && typeof thing === "object", "isObject");
  var isBoolean = /* @__PURE__ */ __name((thing) => thing === true || thing === false, "isBoolean");
  var isPlainObject = /* @__PURE__ */ __name((val) => {
    if (kindOf(val) !== "object") {
      return false;
    }
    const prototype3 = getPrototypeOf(val);
    return (prototype3 === null || prototype3 === Object.prototype || Object.getPrototypeOf(prototype3) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
  }, "isPlainObject");
  var isDate = kindOfTest("Date");
  var isFile = kindOfTest("File");
  var isBlob = kindOfTest("Blob");
  var isFileList = kindOfTest("FileList");
  var isStream = /* @__PURE__ */ __name((val) => isObject(val) && isFunction(val.pipe), "isStream");
  var isFormData = /* @__PURE__ */ __name((thing) => {
    let kind;
    return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
  }, "isFormData");
  var isURLSearchParams = kindOfTest("URLSearchParams");
  var [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
  var trim = /* @__PURE__ */ __name((str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""), "trim");
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i;
    let l;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  __name(forEach, "forEach");
  function findKey(obj, key) {
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  __name(findKey, "findKey");
  var _global = (() => {
    if (typeof globalThis !== "undefined")
      return globalThis;
    return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
  })();
  var isContextDefined = /* @__PURE__ */ __name((context) => !isUndefined(context) && context !== _global, "isContextDefined");
  function merge() {
    const { caseless } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = /* @__PURE__ */ __name((val, key) => {
      const targetKey = caseless && findKey(result, key) || key;
      if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
        result[targetKey] = merge(result[targetKey], val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else {
        result[targetKey] = val;
      }
    }, "assignValue");
    for (let i = 0, l = arguments.length; i < l; i++) {
      arguments[i] && forEach(arguments[i], assignValue);
    }
    return result;
  }
  __name(merge, "merge");
  var extend = /* @__PURE__ */ __name((a, b, thisArg, { allOwnKeys } = {}) => {
    forEach(b, (val, key) => {
      if (thisArg && isFunction(val)) {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    }, { allOwnKeys });
    return a;
  }, "extend");
  var stripBOM = /* @__PURE__ */ __name((content) => {
    if (content.charCodeAt(0) === 65279) {
      content = content.slice(1);
    }
    return content;
  }, "stripBOM");
  var inherits = /* @__PURE__ */ __name((constructor, superConstructor, props, descriptors2) => {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
    constructor.prototype.constructor = constructor;
    Object.defineProperty(constructor, "super", {
      value: superConstructor.prototype
    });
    props && Object.assign(constructor.prototype, props);
  }, "inherits");
  var toFlatObject = /* @__PURE__ */ __name((sourceObj, destObj, filter2, propFilter) => {
    let props;
    let i;
    let prop;
    const merged = {};
    destObj = destObj || {};
    if (sourceObj == null)
      return destObj;
    do {
      props = Object.getOwnPropertyNames(sourceObj);
      i = props.length;
      while (i-- > 0) {
        prop = props[i];
        if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
          destObj[prop] = sourceObj[prop];
          merged[prop] = true;
        }
      }
      sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
    } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
    return destObj;
  }, "toFlatObject");
  var endsWith = /* @__PURE__ */ __name((str, searchString, position) => {
    str = String(str);
    if (position === void 0 || position > str.length) {
      position = str.length;
    }
    position -= searchString.length;
    const lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
  }, "endsWith");
  var toArray = /* @__PURE__ */ __name((thing) => {
    if (!thing)
      return null;
    if (isArray(thing))
      return thing;
    let i = thing.length;
    if (!isNumber(i))
      return null;
    const arr = new Array(i);
    while (i-- > 0) {
      arr[i] = thing[i];
    }
    return arr;
  }, "toArray");
  var isTypedArray = ((TypedArray) => {
    return (thing) => {
      return TypedArray && thing instanceof TypedArray;
    };
  })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
  var forEachEntry = /* @__PURE__ */ __name((obj, fn) => {
    const generator = obj && obj[Symbol.iterator];
    const iterator = generator.call(obj);
    let result;
    while ((result = iterator.next()) && !result.done) {
      const pair = result.value;
      fn.call(obj, pair[0], pair[1]);
    }
  }, "forEachEntry");
  var matchAll = /* @__PURE__ */ __name((regExp, str) => {
    let matches;
    const arr = [];
    while ((matches = regExp.exec(str)) !== null) {
      arr.push(matches);
    }
    return arr;
  }, "matchAll");
  var isHTMLForm = kindOfTest("HTMLFormElement");
  var toCamelCase = /* @__PURE__ */ __name((str) => {
    return str.toLowerCase().replace(
      /[-_\s]([a-z\d])(\w*)/g,
      /* @__PURE__ */ __name(function replacer(m, p1, p2) {
        return p1.toUpperCase() + p2;
      }, "replacer")
    );
  }, "toCamelCase");
  var hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
  var isRegExp = kindOfTest("RegExp");
  var reduceDescriptors = /* @__PURE__ */ __name((obj, reducer) => {
    const descriptors2 = Object.getOwnPropertyDescriptors(obj);
    const reducedDescriptors = {};
    forEach(descriptors2, (descriptor, name) => {
      let ret;
      if ((ret = reducer(descriptor, name, obj)) !== false) {
        reducedDescriptors[name] = ret || descriptor;
      }
    });
    Object.defineProperties(obj, reducedDescriptors);
  }, "reduceDescriptors");
  var freezeMethods = /* @__PURE__ */ __name((obj) => {
    reduceDescriptors(obj, (descriptor, name) => {
      if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
        return false;
      }
      const value = obj[name];
      if (!isFunction(value))
        return;
      descriptor.enumerable = false;
      if ("writable" in descriptor) {
        descriptor.writable = false;
        return;
      }
      if (!descriptor.set) {
        descriptor.set = () => {
          throw Error("Can not rewrite read-only method '" + name + "'");
        };
      }
    });
  }, "freezeMethods");
  var toObjectSet = /* @__PURE__ */ __name((arrayOrString, delimiter) => {
    const obj = {};
    const define = /* @__PURE__ */ __name((arr) => {
      arr.forEach((value) => {
        obj[value] = true;
      });
    }, "define");
    isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
    return obj;
  }, "toObjectSet");
  var noop = /* @__PURE__ */ __name(() => {
  }, "noop");
  var toFiniteNumber = /* @__PURE__ */ __name((value, defaultValue) => {
    return value != null && Number.isFinite(value = +value) ? value : defaultValue;
  }, "toFiniteNumber");
  var ALPHA = "abcdefghijklmnopqrstuvwxyz";
  var DIGIT = "0123456789";
  var ALPHABET = {
    DIGIT,
    ALPHA,
    ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
  };
  var generateString = /* @__PURE__ */ __name((size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
    let str = "";
    const { length } = alphabet;
    while (size--) {
      str += alphabet[Math.random() * length | 0];
    }
    return str;
  }, "generateString");
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
  }
  __name(isSpecCompliantForm, "isSpecCompliantForm");
  var toJSONObject = /* @__PURE__ */ __name((obj) => {
    const stack = new Array(10);
    const visit = /* @__PURE__ */ __name((source, i) => {
      if (isObject(source)) {
        if (stack.indexOf(source) >= 0) {
          return;
        }
        if (!("toJSON" in source)) {
          stack[i] = source;
          const target = isArray(source) ? [] : {};
          forEach(source, (value, key) => {
            const reducedValue = visit(value, i + 1);
            !isUndefined(reducedValue) && (target[key] = reducedValue);
          });
          stack[i] = void 0;
          return target;
        }
      }
      return source;
    }, "visit");
    return visit(obj, 0);
  }, "toJSONObject");
  var isAsyncFn = kindOfTest("AsyncFunction");
  var isThenable = /* @__PURE__ */ __name((thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch), "isThenable");
  var utils_default = {
    isArray,
    isArrayBuffer,
    isBuffer,
    isFormData,
    isArrayBufferView,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isPlainObject,
    isReadableStream,
    isRequest,
    isResponse,
    isHeaders,
    isUndefined,
    isDate,
    isFile,
    isBlob,
    isRegExp,
    isFunction,
    isStream,
    isURLSearchParams,
    isTypedArray,
    isFileList,
    forEach,
    merge,
    extend,
    trim,
    stripBOM,
    inherits,
    toFlatObject,
    kindOf,
    kindOfTest,
    endsWith,
    toArray,
    forEachEntry,
    matchAll,
    isHTMLForm,
    hasOwnProperty,
    hasOwnProp: hasOwnProperty,
    reduceDescriptors,
    freezeMethods,
    toObjectSet,
    toCamelCase,
    noop,
    toFiniteNumber,
    findKey,
    global: _global,
    isContextDefined,
    ALPHABET,
    generateString,
    isSpecCompliantForm,
    toJSONObject,
    isAsyncFn,
    isThenable
  };

  // ../node_modules/axios/lib/core/AxiosError.js
  function AxiosError(message, code, config, request, response) {
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
    this.message = message;
    this.name = "AxiosError";
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
  }
  __name(AxiosError, "AxiosError");
  utils_default.inherits(AxiosError, Error, {
    toJSON: /* @__PURE__ */ __name(function toJSON() {
      return {
        message: this.message,
        name: this.name,
        description: this.description,
        number: this.number,
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        config: utils_default.toJSONObject(this.config),
        code: this.code,
        status: this.response && this.response.status ? this.response.status : null
      };
    }, "toJSON")
  });
  var prototype = AxiosError.prototype;
  var descriptors = {};
  [
    "ERR_BAD_OPTION_VALUE",
    "ERR_BAD_OPTION",
    "ECONNABORTED",
    "ETIMEDOUT",
    "ERR_NETWORK",
    "ERR_FR_TOO_MANY_REDIRECTS",
    "ERR_DEPRECATED",
    "ERR_BAD_RESPONSE",
    "ERR_BAD_REQUEST",
    "ERR_CANCELED",
    "ERR_NOT_SUPPORT",
    "ERR_INVALID_URL"
  ].forEach((code) => {
    descriptors[code] = { value: code };
  });
  Object.defineProperties(AxiosError, descriptors);
  Object.defineProperty(prototype, "isAxiosError", { value: true });
  AxiosError.from = (error, code, config, request, response, customProps) => {
    const axiosError = Object.create(prototype);
    utils_default.toFlatObject(error, axiosError, /* @__PURE__ */ __name(function filter2(obj) {
      return obj !== Error.prototype;
    }, "filter"), (prop) => {
      return prop !== "isAxiosError";
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  };
  var AxiosError_default = AxiosError;

  // ../node_modules/axios/lib/helpers/null.js
  var null_default = null;

  // ../node_modules/axios/lib/helpers/toFormData.js
  function isVisitable(thing) {
    return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
  }
  __name(isVisitable, "isVisitable");
  function removeBrackets(key) {
    return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  __name(removeBrackets, "removeBrackets");
  function renderKey(path, key, dots) {
    if (!path)
      return key;
    return path.concat(key).map(/* @__PURE__ */ __name(function each(token, i) {
      token = removeBrackets(token);
      return !dots && i ? "[" + token + "]" : token;
    }, "each")).join(dots ? "." : "");
  }
  __name(renderKey, "renderKey");
  function isFlatArray(arr) {
    return utils_default.isArray(arr) && !arr.some(isVisitable);
  }
  __name(isFlatArray, "isFlatArray");
  var predicates = utils_default.toFlatObject(utils_default, {}, null, /* @__PURE__ */ __name(function filter(prop) {
    return /^is[A-Z]/.test(prop);
  }, "filter"));
  function toFormData(obj, formData, options) {
    if (!utils_default.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new (null_default || FormData)();
    options = utils_default.toFlatObject(options, {
      metaTokens: true,
      dots: false,
      indexes: false
    }, false, /* @__PURE__ */ __name(function defined(option, source) {
      return !utils_default.isUndefined(source[option]);
    }, "defined"));
    const metaTokens = options.metaTokens;
    const visitor = options.visitor || defaultVisitor;
    const dots = options.dots;
    const indexes = options.indexes;
    const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
    const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
    if (!utils_default.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null)
        return "";
      if (utils_default.isDate(value)) {
        return value.toISOString();
      }
      if (!useBlob && utils_default.isBlob(value)) {
        throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
      }
      if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
        return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
      }
      return value;
    }
    __name(convertValue, "convertValue");
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (value && !path && typeof value === "object") {
        if (utils_default.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = JSON.stringify(value);
        } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(/* @__PURE__ */ __name(function each(el, index) {
            !(utils_default.isUndefined(el) || el === null) && formData.append(
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          }, "each"));
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    __name(defaultVisitor, "defaultVisitor");
    const stack = [];
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path) {
      if (utils_default.isUndefined(value))
        return;
      if (stack.indexOf(value) !== -1) {
        throw Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils_default.forEach(value, /* @__PURE__ */ __name(function each(el, key) {
        const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(
          formData,
          el,
          utils_default.isString(key) ? key.trim() : key,
          path,
          exposedHelpers
        );
        if (result === true) {
          build(el, path ? path.concat(key) : [key]);
        }
      }, "each"));
      stack.pop();
    }
    __name(build, "build");
    if (!utils_default.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  __name(toFormData, "toFormData");
  var toFormData_default = toFormData;

  // ../node_modules/axios/lib/helpers/AxiosURLSearchParams.js
  function encode(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+",
      "%00": "\0"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, /* @__PURE__ */ __name(function replacer(match) {
      return charMap[match];
    }, "replacer"));
  }
  __name(encode, "encode");
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData_default(params, this, options);
  }
  __name(AxiosURLSearchParams, "AxiosURLSearchParams");
  var prototype2 = AxiosURLSearchParams.prototype;
  prototype2.append = /* @__PURE__ */ __name(function append(name, value) {
    this._pairs.push([name, value]);
  }, "append");
  prototype2.toString = /* @__PURE__ */ __name(function toString2(encoder) {
    const _encode = encoder ? function(value) {
      return encoder.call(this, value, encode);
    } : encode;
    return this._pairs.map(/* @__PURE__ */ __name(function each(pair) {
      return _encode(pair[0]) + "=" + _encode(pair[1]);
    }, "each"), "").join("&");
  }, "toString");
  var AxiosURLSearchParams_default = AxiosURLSearchParams;

  // ../node_modules/axios/lib/helpers/buildURL.js
  function encode2(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
  }
  __name(encode2, "encode");
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    const _encode = options && options.encode || encode2;
    const serializeFn = options && options.serialize;
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  __name(buildURL, "buildURL");

  // ../node_modules/axios/lib/core/InterceptorManager.js
  var InterceptorManager = class {
    constructor() {
      this.handlers = [];
    }
    use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    }
    eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    }
    clear() {
      if (this.handlers) {
        this.handlers = [];
      }
    }
    forEach(fn) {
      utils_default.forEach(this.handlers, /* @__PURE__ */ __name(function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      }, "forEachHandler"));
    }
  };
  __name(InterceptorManager, "InterceptorManager");
  var InterceptorManager_default = InterceptorManager;

  // ../node_modules/axios/lib/defaults/transitional.js
  var transitional_default = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  };

  // ../node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
  var URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;

  // ../node_modules/axios/lib/platform/browser/classes/FormData.js
  var FormData_default = typeof FormData !== "undefined" ? FormData : null;

  // ../node_modules/axios/lib/platform/browser/classes/Blob.js
  var Blob_default = typeof Blob !== "undefined" ? Blob : null;

  // ../node_modules/axios/lib/platform/browser/index.js
  var browser_default = {
    isBrowser: true,
    classes: {
      URLSearchParams: URLSearchParams_default,
      FormData: FormData_default,
      Blob: Blob_default
    },
    protocols: ["http", "https", "file", "blob", "url", "data"]
  };

  // ../node_modules/axios/lib/platform/common/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    hasBrowserEnv: () => hasBrowserEnv,
    hasStandardBrowserEnv: () => hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
    origin: () => origin
  });
  var hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
  var hasStandardBrowserEnv = ((product) => {
    return hasBrowserEnv && ["ReactNative", "NativeScript", "NS"].indexOf(product) < 0;
  })(typeof navigator !== "undefined" && navigator.product);
  var hasStandardBrowserWebWorkerEnv = (() => {
    return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
  })();
  var origin = hasBrowserEnv && window.location.href || "http://localhost";

  // ../node_modules/axios/lib/platform/index.js
  var platform_default = {
    ...utils_exports,
    ...browser_default
  };

  // ../node_modules/axios/lib/helpers/toURLEncodedForm.js
  function toURLEncodedForm(data, options) {
    return toFormData_default(data, new platform_default.classes.URLSearchParams(), Object.assign({
      visitor: function(value, key, path, helpers) {
        if (platform_default.isNode && utils_default.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }
  __name(toURLEncodedForm, "toURLEncodedForm");

  // ../node_modules/axios/lib/helpers/formDataToJSON.js
  function parsePropPath(name) {
    return utils_default.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
      return match[0] === "[]" ? "" : match[1] || match[0];
    });
  }
  __name(parsePropPath, "parsePropPath");
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }
  __name(arrayToObject, "arrayToObject");
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      let name = path[index++];
      if (name === "__proto__")
        return true;
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils_default.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils_default.hasOwnProp(target, name)) {
          target[name] = [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!target[name] || !utils_default.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils_default.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    __name(buildPath, "buildPath");
    if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
      const obj = {};
      utils_default.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  __name(formDataToJSON, "formDataToJSON");
  var formDataToJSON_default = formDataToJSON;

  // ../node_modules/axios/lib/defaults/index.js
  function stringifySafely(rawValue, parser, encoder) {
    if (utils_default.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils_default.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  __name(stringifySafely, "stringifySafely");
  var defaults = {
    transitional: transitional_default,
    adapter: ["xhr", "http", "fetch"],
    transformRequest: [/* @__PURE__ */ __name(function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils_default.isObject(data);
      if (isObjectPayload && utils_default.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils_default.isFormData(data);
      if (isFormData2) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
      }
      if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) {
        return data;
      }
      if (utils_default.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils_default.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, this.formSerializer).toString();
        }
        if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const _FormData = this.env && this.env.FormData;
          return toFormData_default(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            this.formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }, "transformRequest")],
    transformResponse: [/* @__PURE__ */ __name(function transformResponse(data) {
      const transitional2 = this.transitional || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const JSONRequested = this.responseType === "json";
      if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) {
        return data;
      }
      if (data && utils_default.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data);
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, this.response);
            }
            throw e;
          }
        }
      }
      return data;
    }, "transformResponse")],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
      FormData: platform_default.classes.FormData,
      Blob: platform_default.classes.Blob
    },
    validateStatus: /* @__PURE__ */ __name(function validateStatus(status) {
      return status >= 200 && status < 300;
    }, "validateStatus"),
    headers: {
      common: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": void 0
      }
    }
  };
  utils_default.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
    defaults.headers[method] = {};
  });
  var defaults_default = defaults;

  // ../node_modules/axios/lib/helpers/parseHeaders.js
  var ignoreDuplicateOf = utils_default.toObjectSet([
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
  ]);
  var parseHeaders_default = /* @__PURE__ */ __name((rawHeaders) => {
    const parsed = {};
    let key;
    let val;
    let i;
    rawHeaders && rawHeaders.split("\n").forEach(/* @__PURE__ */ __name(function parser(line) {
      i = line.indexOf(":");
      key = line.substring(0, i).trim().toLowerCase();
      val = line.substring(i + 1).trim();
      if (!key || parsed[key] && ignoreDuplicateOf[key]) {
        return;
      }
      if (key === "set-cookie") {
        if (parsed[key]) {
          parsed[key].push(val);
        } else {
          parsed[key] = [val];
        }
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
      }
    }, "parser"));
    return parsed;
  }, "default");

  // ../node_modules/axios/lib/core/AxiosHeaders.js
  var $internals = Symbol("internals");
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  __name(normalizeHeader, "normalizeHeader");
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils_default.isArray(value) ? value.map(normalizeValue) : String(value);
  }
  __name(normalizeValue, "normalizeValue");
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  __name(parseTokens, "parseTokens");
  var isValidHeaderName = /* @__PURE__ */ __name((str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim()), "isValidHeaderName");
  function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
    if (utils_default.isFunction(filter2)) {
      return filter2.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils_default.isString(value))
      return;
    if (utils_default.isString(filter2)) {
      return value.indexOf(filter2) !== -1;
    }
    if (utils_default.isRegExp(filter2)) {
      return filter2.test(value);
    }
  }
  __name(matchHeaderValue, "matchHeaderValue");
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  __name(formatHeader, "formatHeader");
  function buildAccessors(obj, header) {
    const accessorName = utils_default.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  __name(buildAccessors, "buildAccessors");
  var AxiosHeaders = class {
    constructor(headers) {
      headers && this.set(headers);
    }
    set(header, valueOrRewrite, rewrite) {
      const self2 = this;
      function setHeader(_value, _header, _rewrite) {
        const lHeader = normalizeHeader(_header);
        if (!lHeader) {
          throw new Error("header name must be a non-empty string");
        }
        const key = utils_default.findKey(self2, lHeader);
        if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
          self2[key || _header] = normalizeValue(_value);
        }
      }
      __name(setHeader, "setHeader");
      const setHeaders = /* @__PURE__ */ __name((headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite)), "setHeaders");
      if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
        setHeaders(header, valueOrRewrite);
      } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
        setHeaders(parseHeaders_default(header), valueOrRewrite);
      } else if (utils_default.isHeaders(header)) {
        for (const [key, value] of header.entries()) {
          setHeader(value, key, rewrite);
        }
      } else {
        header != null && setHeader(valueOrRewrite, header, rewrite);
      }
      return this;
    }
    get(header, parser) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils_default.findKey(this, header);
        if (key) {
          const value = this[key];
          if (!parser) {
            return value;
          }
          if (parser === true) {
            return parseTokens(value);
          }
          if (utils_default.isFunction(parser)) {
            return parser.call(this, value, key);
          }
          if (utils_default.isRegExp(parser)) {
            return parser.exec(value);
          }
          throw new TypeError("parser must be boolean|regexp|function");
        }
      }
    }
    has(header, matcher) {
      header = normalizeHeader(header);
      if (header) {
        const key = utils_default.findKey(this, header);
        return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
      }
      return false;
    }
    delete(header, matcher) {
      const self2 = this;
      let deleted = false;
      function deleteHeader(_header) {
        _header = normalizeHeader(_header);
        if (_header) {
          const key = utils_default.findKey(self2, _header);
          if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
            delete self2[key];
            deleted = true;
          }
        }
      }
      __name(deleteHeader, "deleteHeader");
      if (utils_default.isArray(header)) {
        header.forEach(deleteHeader);
      } else {
        deleteHeader(header);
      }
      return deleted;
    }
    clear(matcher) {
      const keys = Object.keys(this);
      let i = keys.length;
      let deleted = false;
      while (i--) {
        const key = keys[i];
        if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
          delete this[key];
          deleted = true;
        }
      }
      return deleted;
    }
    normalize(format) {
      const self2 = this;
      const headers = {};
      utils_default.forEach(this, (value, header) => {
        const key = utils_default.findKey(headers, header);
        if (key) {
          self2[key] = normalizeValue(value);
          delete self2[header];
          return;
        }
        const normalized = format ? formatHeader(header) : String(header).trim();
        if (normalized !== header) {
          delete self2[header];
        }
        self2[normalized] = normalizeValue(value);
        headers[normalized] = true;
      });
      return this;
    }
    concat(...targets) {
      return this.constructor.concat(this, ...targets);
    }
    toJSON(asStrings) {
      const obj = /* @__PURE__ */ Object.create(null);
      utils_default.forEach(this, (value, header) => {
        value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
      });
      return obj;
    }
    [Symbol.iterator]() {
      return Object.entries(this.toJSON())[Symbol.iterator]();
    }
    toString() {
      return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
    }
    get [Symbol.toStringTag]() {
      return "AxiosHeaders";
    }
    static from(thing) {
      return thing instanceof this ? thing : new this(thing);
    }
    static concat(first, ...targets) {
      const computed = new this(first);
      targets.forEach((target) => computed.set(target));
      return computed;
    }
    static accessor(header) {
      const internals = this[$internals] = this[$internals] = {
        accessors: {}
      };
      const accessors = internals.accessors;
      const prototype3 = this.prototype;
      function defineAccessor(_header) {
        const lHeader = normalizeHeader(_header);
        if (!accessors[lHeader]) {
          buildAccessors(prototype3, _header);
          accessors[lHeader] = true;
        }
      }
      __name(defineAccessor, "defineAccessor");
      utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
      return this;
    }
  };
  __name(AxiosHeaders, "AxiosHeaders");
  AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
  utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
    let mapped = key[0].toUpperCase() + key.slice(1);
    return {
      get: () => value,
      set(headerValue) {
        this[mapped] = headerValue;
      }
    };
  });
  utils_default.freezeMethods(AxiosHeaders);
  var AxiosHeaders_default = AxiosHeaders;

  // ../node_modules/axios/lib/core/transformData.js
  function transformData(fns, response) {
    const config = this || defaults_default;
    const context = response || config;
    const headers = AxiosHeaders_default.from(context.headers);
    let data = context.data;
    utils_default.forEach(fns, /* @__PURE__ */ __name(function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    }, "transform"));
    headers.normalize();
    return data;
  }
  __name(transformData, "transformData");

  // ../node_modules/axios/lib/cancel/isCancel.js
  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }
  __name(isCancel, "isCancel");

  // ../node_modules/axios/lib/cancel/CanceledError.js
  function CanceledError(message, config, request) {
    AxiosError_default.call(this, message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
    this.name = "CanceledError";
  }
  __name(CanceledError, "CanceledError");
  utils_default.inherits(CanceledError, AxiosError_default, {
    __CANCEL__: true
  });
  var CanceledError_default = CanceledError;

  // ../node_modules/axios/lib/core/settle.js
  function settle(resolve, reject, response) {
    const validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError_default(
        "Request failed with status code " + response.status,
        [AxiosError_default.ERR_BAD_REQUEST, AxiosError_default.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
        response.config,
        response.request,
        response
      ));
    }
  }
  __name(settle, "settle");

  // ../node_modules/axios/lib/helpers/parseProtocol.js
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || "";
  }
  __name(parseProtocol, "parseProtocol");

  // ../node_modules/axios/lib/helpers/speedometer.js
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return /* @__PURE__ */ __name(function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    }, "push");
  }
  __name(speedometer, "speedometer");
  var speedometer_default = speedometer;

  // ../node_modules/axios/lib/helpers/throttle.js
  function throttle(fn, freq) {
    let timestamp = 0;
    const threshold = 1e3 / freq;
    let timer = null;
    return /* @__PURE__ */ __name(function throttled() {
      const force = this === true;
      const now = Date.now();
      if (force || now - timestamp > threshold) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        timestamp = now;
        return fn.apply(null, arguments);
      }
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          timestamp = Date.now();
          return fn.apply(null, arguments);
        }, threshold - (now - timestamp));
      }
    }, "throttled");
  }
  __name(throttle, "throttle");
  var throttle_default = throttle;

  // ../node_modules/axios/lib/helpers/progressEventReducer.js
  var progressEventReducer_default = /* @__PURE__ */ __name((listener, isDownloadStream, freq = 3) => {
    let bytesNotified = 0;
    const _speedometer = speedometer_default(50, 250);
    return throttle_default((e) => {
      const loaded = e.loaded;
      const total = e.lengthComputable ? e.total : void 0;
      const progressBytes = loaded - bytesNotified;
      const rate = _speedometer(progressBytes);
      const inRange = loaded <= total;
      bytesNotified = loaded;
      const data = {
        loaded,
        total,
        progress: total ? loaded / total : void 0,
        bytes: progressBytes,
        rate: rate ? rate : void 0,
        estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
        event: e,
        lengthComputable: total != null
      };
      data[isDownloadStream ? "download" : "upload"] = true;
      listener(data);
    }, freq);
  }, "default");

  // ../node_modules/axios/lib/helpers/isURLSameOrigin.js
  var isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? (/* @__PURE__ */ __name(function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement("a");
    let originURL;
    function resolveURL(url) {
      let href = url;
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
    __name(resolveURL, "resolveURL");
    originURL = resolveURL(window.location.href);
    return /* @__PURE__ */ __name(function isURLSameOrigin(requestURL) {
      const parsed = utils_default.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    }, "isURLSameOrigin");
  }, "standardBrowserEnv"))() : (/* @__PURE__ */ __name(function nonStandardBrowserEnv() {
    return /* @__PURE__ */ __name(function isURLSameOrigin() {
      return true;
    }, "isURLSameOrigin");
  }, "nonStandardBrowserEnv"))();

  // ../node_modules/axios/lib/helpers/cookies.js
  var cookies_default = platform_default.hasStandardBrowserEnv ? {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils_default.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils_default.isString(path) && cookie.push("path=" + path);
      utils_default.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  } : {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  };

  // ../node_modules/axios/lib/helpers/isAbsoluteURL.js
  function isAbsoluteURL(url) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }
  __name(isAbsoluteURL, "isAbsoluteURL");

  // ../node_modules/axios/lib/helpers/combineURLs.js
  function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
  }
  __name(combineURLs, "combineURLs");

  // ../node_modules/axios/lib/core/buildFullPath.js
  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  __name(buildFullPath, "buildFullPath");

  // ../node_modules/axios/lib/core/mergeConfig.js
  var headersToObject = /* @__PURE__ */ __name((thing) => thing instanceof AxiosHeaders_default ? { ...thing } : thing, "headersToObject");
  function mergeConfig(config1, config2) {
    config2 = config2 || {};
    const config = {};
    function getMergedValue(target, source, caseless) {
      if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
        return utils_default.merge.call({ caseless }, target, source);
      } else if (utils_default.isPlainObject(source)) {
        return utils_default.merge({}, source);
      } else if (utils_default.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    __name(getMergedValue, "getMergedValue");
    function mergeDeepProperties(a, b, caseless) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(a, b, caseless);
      } else if (!utils_default.isUndefined(a)) {
        return getMergedValue(void 0, a, caseless);
      }
    }
    __name(mergeDeepProperties, "mergeDeepProperties");
    function valueFromConfig2(a, b) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(void 0, b);
      }
    }
    __name(valueFromConfig2, "valueFromConfig2");
    function defaultToConfig2(a, b) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(void 0, b);
      } else if (!utils_default.isUndefined(a)) {
        return getMergedValue(void 0, a);
      }
    }
    __name(defaultToConfig2, "defaultToConfig2");
    function mergeDirectKeys(a, b, prop) {
      if (prop in config2) {
        return getMergedValue(a, b);
      } else if (prop in config1) {
        return getMergedValue(void 0, a);
      }
    }
    __name(mergeDirectKeys, "mergeDirectKeys");
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
    };
    utils_default.forEach(Object.keys(Object.assign({}, config1, config2)), /* @__PURE__ */ __name(function computeConfigValue(prop) {
      const merge2 = mergeMap[prop] || mergeDeepProperties;
      const configValue = merge2(config1[prop], config2[prop], prop);
      utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    }, "computeConfigValue"));
    return config;
  }
  __name(mergeConfig, "mergeConfig");

  // ../node_modules/axios/lib/helpers/resolveConfig.js
  var resolveConfig_default = /* @__PURE__ */ __name((config) => {
    const newConfig = mergeConfig({}, config);
    let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;
    newConfig.headers = headers = AxiosHeaders_default.from(headers);
    newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer);
    if (auth) {
      headers.set(
        "Authorization",
        "Basic " + btoa((auth.username || "") + ":" + (auth.password ? unescape(encodeURIComponent(auth.password)) : ""))
      );
    }
    let contentType;
    if (utils_default.isFormData(data)) {
      if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv) {
        headers.setContentType(void 0);
      } else if ((contentType = headers.getContentType()) !== false) {
        const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
        headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
      }
    }
    if (platform_default.hasStandardBrowserEnv) {
      withXSRFToken && utils_default.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
      if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin_default(newConfig.url)) {
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }
    return newConfig;
  }, "default");

  // ../node_modules/axios/lib/adapters/xhr.js
  var isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
  var xhr_default = isXHRAdapterSupported && function(config) {
    return new Promise(/* @__PURE__ */ __name(function dispatchXhrRequest(resolve, reject) {
      const _config = resolveConfig_default(config);
      let requestData = _config.data;
      const requestHeaders = AxiosHeaders_default.from(_config.headers).normalize();
      let { responseType } = _config;
      let onCanceled;
      function done() {
        if (_config.cancelToken) {
          _config.cancelToken.unsubscribe(onCanceled);
        }
        if (_config.signal) {
          _config.signal.removeEventListener("abort", onCanceled);
        }
      }
      __name(done, "done");
      let request = new XMLHttpRequest();
      request.open(_config.method.toUpperCase(), _config.url, true);
      request.timeout = _config.timeout;
      function onloadend() {
        if (!request) {
          return;
        }
        const responseHeaders = AxiosHeaders_default.from(
          "getAllResponseHeaders" in request && request.getAllResponseHeaders()
        );
        const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
        const response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        };
        settle(/* @__PURE__ */ __name(function _resolve(value) {
          resolve(value);
          done();
        }, "_resolve"), /* @__PURE__ */ __name(function _reject(err) {
          reject(err);
          done();
        }, "_reject"), response);
        request = null;
      }
      __name(onloadend, "onloadend");
      if ("onloadend" in request) {
        request.onloadend = onloadend;
      } else {
        request.onreadystatechange = /* @__PURE__ */ __name(function handleLoad() {
          if (!request || request.readyState !== 4) {
            return;
          }
          if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
            return;
          }
          setTimeout(onloadend);
        }, "handleLoad");
      }
      request.onabort = /* @__PURE__ */ __name(function handleAbort() {
        if (!request) {
          return;
        }
        reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, _config, request));
        request = null;
      }, "handleAbort");
      request.onerror = /* @__PURE__ */ __name(function handleError() {
        reject(new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, _config, request));
        request = null;
      }, "handleError");
      request.ontimeout = /* @__PURE__ */ __name(function handleTimeout() {
        let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
        const transitional2 = _config.transitional || transitional_default;
        if (_config.timeoutErrorMessage) {
          timeoutErrorMessage = _config.timeoutErrorMessage;
        }
        reject(new AxiosError_default(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
          _config,
          request
        ));
        request = null;
      }, "handleTimeout");
      requestData === void 0 && requestHeaders.setContentType(null);
      if ("setRequestHeader" in request) {
        utils_default.forEach(requestHeaders.toJSON(), /* @__PURE__ */ __name(function setRequestHeader(val, key) {
          request.setRequestHeader(key, val);
        }, "setRequestHeader"));
      }
      if (!utils_default.isUndefined(_config.withCredentials)) {
        request.withCredentials = !!_config.withCredentials;
      }
      if (responseType && responseType !== "json") {
        request.responseType = _config.responseType;
      }
      if (typeof _config.onDownloadProgress === "function") {
        request.addEventListener("progress", progressEventReducer_default(_config.onDownloadProgress, true));
      }
      if (typeof _config.onUploadProgress === "function" && request.upload) {
        request.upload.addEventListener("progress", progressEventReducer_default(_config.onUploadProgress));
      }
      if (_config.cancelToken || _config.signal) {
        onCanceled = /* @__PURE__ */ __name((cancel) => {
          if (!request) {
            return;
          }
          reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
          request.abort();
          request = null;
        }, "onCanceled");
        _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
        if (_config.signal) {
          _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
        }
      }
      const protocol = parseProtocol(_config.url);
      if (protocol && platform_default.protocols.indexOf(protocol) === -1) {
        reject(new AxiosError_default("Unsupported protocol " + protocol + ":", AxiosError_default.ERR_BAD_REQUEST, config));
        return;
      }
      request.send(requestData || null);
    }, "dispatchXhrRequest"));
  };

  // ../node_modules/axios/lib/helpers/composeSignals.js
  var composeSignals = /* @__PURE__ */ __name((signals, timeout) => {
    let controller = new AbortController();
    let aborted;
    const onabort = /* @__PURE__ */ __name(function(cancel) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = cancel instanceof Error ? cancel : this.reason;
        controller.abort(err instanceof AxiosError_default ? err : new CanceledError_default(err instanceof Error ? err.message : err));
      }
    }, "onabort");
    let timer = timeout && setTimeout(() => {
      onabort(new AxiosError_default(`timeout ${timeout} of ms exceeded`, AxiosError_default.ETIMEDOUT));
    }, timeout);
    const unsubscribe = /* @__PURE__ */ __name(() => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2 && (signal2.removeEventListener ? signal2.removeEventListener("abort", onabort) : signal2.unsubscribe(onabort));
        });
        signals = null;
      }
    }, "unsubscribe");
    signals.forEach((signal2) => signal2 && signal2.addEventListener && signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = unsubscribe;
    return [signal, () => {
      timer && clearTimeout(timer);
      timer = null;
    }];
  }, "composeSignals");
  var composeSignals_default = composeSignals;

  // ../node_modules/axios/lib/helpers/trackStream.js
  var streamChunk = /* @__PURE__ */ __name(function* (chunk, chunkSize) {
    let len = chunk.byteLength;
    if (!chunkSize || len < chunkSize) {
      yield chunk;
      return;
    }
    let pos = 0;
    let end;
    while (pos < len) {
      end = pos + chunkSize;
      yield chunk.slice(pos, end);
      pos = end;
    }
  }, "streamChunk");
  var readBytes = /* @__PURE__ */ __name(async function* (iterable, chunkSize, encode3) {
    for await (const chunk of iterable) {
      yield* streamChunk(ArrayBuffer.isView(chunk) ? chunk : await encode3(String(chunk)), chunkSize);
    }
  }, "readBytes");
  var trackStream = /* @__PURE__ */ __name((stream, chunkSize, onProgress, onFinish, encode3) => {
    const iterator = readBytes(stream, chunkSize, encode3);
    let bytes = 0;
    return new ReadableStream({
      type: "bytes",
      async pull(controller) {
        const { done, value } = await iterator.next();
        if (done) {
          controller.close();
          onFinish();
          return;
        }
        let len = value.byteLength;
        onProgress && onProgress(bytes += len);
        controller.enqueue(new Uint8Array(value));
      },
      cancel(reason) {
        onFinish(reason);
        return iterator.return();
      }
    }, {
      highWaterMark: 2
    });
  }, "trackStream");

  // ../node_modules/axios/lib/adapters/fetch.js
  var fetchProgressDecorator = /* @__PURE__ */ __name((total, fn) => {
    const lengthComputable = total != null;
    return (loaded) => setTimeout(() => fn({
      lengthComputable,
      total,
      loaded
    }));
  }, "fetchProgressDecorator");
  var isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
  var isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
  var encodeText = isFetchSupported && (typeof TextEncoder === "function" ? ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
  var supportsRequestStream = isReadableStreamSupported && (() => {
    let duplexAccessed = false;
    const hasContentType = new Request(platform_default.origin, {
      body: new ReadableStream(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    }).headers.has("Content-Type");
    return duplexAccessed && !hasContentType;
  })();
  var DEFAULT_CHUNK_SIZE = 64 * 1024;
  var supportsResponseStream = isReadableStreamSupported && !!(() => {
    try {
      return utils_default.isReadableStream(new Response("").body);
    } catch (err) {
    }
  })();
  var resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && ((res) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = utils_default.isFunction(res[type]) ? (res2) => res2[type]() : (_, config) => {
        throw new AxiosError_default(`Response type '${type}' is not supported`, AxiosError_default.ERR_NOT_SUPPORT, config);
      });
    });
  })(new Response());
  var getBodyLength = /* @__PURE__ */ __name(async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils_default.isBlob(body)) {
      return body.size;
    }
    if (utils_default.isSpecCompliantForm(body)) {
      return (await new Request(body).arrayBuffer()).byteLength;
    }
    if (utils_default.isArrayBufferView(body)) {
      return body.byteLength;
    }
    if (utils_default.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils_default.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  }, "getBodyLength");
  var resolveBodyLength = /* @__PURE__ */ __name(async (headers, body) => {
    const length = utils_default.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  }, "resolveBodyLength");
  var fetch_default = isFetchSupported && (async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions
    } = resolveConfig_default(config);
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let [composedSignal, stopTimeout] = signal || cancelToken || timeout ? composeSignals_default([signal, cancelToken], timeout) : [];
    let finished, request;
    const onFinish = /* @__PURE__ */ __name(() => {
      !finished && setTimeout(() => {
        composedSignal && composedSignal.unsubscribe();
      });
      finished = true;
    }, "onFinish");
    let requestContentLength;
    try {
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, fetchProgressDecorator(
            requestContentLength,
            progressEventReducer_default(onUploadProgress)
          ), null, encodeText);
        }
      }
      if (!utils_default.isString(withCredentials)) {
        withCredentials = withCredentials ? "cors" : "omit";
      }
      request = new Request(url, {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        withCredentials
      });
      let response = await fetch(request);
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && (onDownloadProgress || isStreamResponse)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils_default.toFiniteNumber(response.headers.get("content-length"));
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onDownloadProgress && fetchProgressDecorator(
            responseContentLength,
            progressEventReducer_default(onDownloadProgress, true)
          ), isStreamResponse && onFinish, encodeText),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
      !isStreamResponse && onFinish();
      stopTimeout && stopTimeout();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders_default.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      onFinish();
      if (err && err.name === "TypeError" && /fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError_default("Network Error", AxiosError_default.ERR_NETWORK, config, request),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError_default.from(err, err && err.code, config, request);
    }
  });

  // ../node_modules/axios/lib/adapters/adapters.js
  var knownAdapters = {
    http: null_default,
    xhr: xhr_default,
    fetch: fetch_default
  };
  utils_default.forEach(knownAdapters, (fn, value) => {
    if (fn) {
      try {
        Object.defineProperty(fn, "name", { value });
      } catch (e) {
      }
      Object.defineProperty(fn, "adapterName", { value });
    }
  });
  var renderReason = /* @__PURE__ */ __name((reason) => `- ${reason}`, "renderReason");
  var isResolvedHandle = /* @__PURE__ */ __name((adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false, "isResolvedHandle");
  var adapters_default = {
    getAdapter: (adapters) => {
      adapters = utils_default.isArray(adapters) ? adapters : [adapters];
      const { length } = adapters;
      let nameOrAdapter;
      let adapter;
      const rejectedReasons = {};
      for (let i = 0; i < length; i++) {
        nameOrAdapter = adapters[i];
        let id;
        adapter = nameOrAdapter;
        if (!isResolvedHandle(nameOrAdapter)) {
          adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
          if (adapter === void 0) {
            throw new AxiosError_default(`Unknown adapter '${id}'`);
          }
        }
        if (adapter) {
          break;
        }
        rejectedReasons[id || "#" + i] = adapter;
      }
      if (!adapter) {
        const reasons = Object.entries(rejectedReasons).map(
          ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
        );
        let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
        throw new AxiosError_default(
          `There is no suitable adapter to dispatch the request ` + s,
          "ERR_NOT_SUPPORT"
        );
      }
      return adapter;
    },
    adapters: knownAdapters
  };

  // ../node_modules/axios/lib/core/dispatchRequest.js
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError_default(null, config);
    }
  }
  __name(throwIfCancellationRequested, "throwIfCancellationRequested");
  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders_default.from(config.headers);
    config.data = transformData.call(
      config,
      config.transformRequest
    );
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter = adapters_default.getAdapter(config.adapter || defaults_default.adapter);
    return adapter(config).then(/* @__PURE__ */ __name(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      response.data = transformData.call(
        config,
        config.transformResponse,
        response
      );
      response.headers = AxiosHeaders_default.from(response.headers);
      return response;
    }, "onAdapterResolution"), /* @__PURE__ */ __name(function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          reason.response.data = transformData.call(
            config,
            config.transformResponse,
            reason.response
          );
          reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    }, "onAdapterRejection"));
  }
  __name(dispatchRequest, "dispatchRequest");

  // ../node_modules/axios/lib/env/data.js
  var VERSION = "1.7.2";

  // ../node_modules/axios/lib/helpers/validator.js
  var validators = {};
  ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
    validators[type] = /* @__PURE__ */ __name(function validator(thing) {
      return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
    }, "validator");
  });
  var deprecatedWarnings = {};
  validators.transitional = /* @__PURE__ */ __name(function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
      return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
    }
    __name(formatMessage, "formatMessage");
    return (value, opt, opts) => {
      if (validator === false) {
        throw new AxiosError_default(
          formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
          AxiosError_default.ERR_DEPRECATED
        );
      }
      if (version && !deprecatedWarnings[opt]) {
        deprecatedWarnings[opt] = true;
        console.warn(
          formatMessage(
            opt,
            " has been deprecated since v" + version + " and will be removed in the near future"
          )
        );
      }
      return validator ? validator(value, opt, opts) : true;
    };
  }, "transitional");
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object") {
      throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator = schema[opt];
      if (validator) {
        const value = options[opt];
        const result = value === void 0 || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError_default("option " + opt + " must be " + result, AxiosError_default.ERR_BAD_OPTION_VALUE);
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
      }
    }
  }
  __name(assertOptions, "assertOptions");
  var validator_default = {
    assertOptions,
    validators
  };

  // ../node_modules/axios/lib/core/Axios.js
  var validators2 = validator_default.validators;
  var Axios = class {
    constructor(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager_default(),
        response: new InterceptorManager_default()
      };
    }
    async request(configOrUrl, config) {
      try {
        return await this._request(configOrUrl, config);
      } catch (err) {
        if (err instanceof Error) {
          let dummy;
          Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : dummy = new Error();
          const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
          try {
            if (!err.stack) {
              err.stack = stack;
            } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
              err.stack += "\n" + stack;
            }
          } catch (e) {
          }
        }
        throw err;
      }
    }
    _request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      const { transitional: transitional2, paramsSerializer, headers } = config;
      if (transitional2 !== void 0) {
        validator_default.assertOptions(transitional2, {
          silentJSONParsing: validators2.transitional(validators2.boolean),
          forcedJSONParsing: validators2.transitional(validators2.boolean),
          clarifyTimeoutError: validators2.transitional(validators2.boolean)
        }, false);
      }
      if (paramsSerializer != null) {
        if (utils_default.isFunction(paramsSerializer)) {
          config.paramsSerializer = {
            serialize: paramsSerializer
          };
        } else {
          validator_default.assertOptions(paramsSerializer, {
            encode: validators2.function,
            serialize: validators2.function
          }, true);
        }
      }
      config.method = (config.method || this.defaults.method || "get").toLowerCase();
      let contextHeaders = headers && utils_default.merge(
        headers.common,
        headers[config.method]
      );
      headers && utils_default.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (method) => {
          delete headers[method];
        }
      );
      config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
      const requestInterceptorChain = [];
      let synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(/* @__PURE__ */ __name(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      }, "unshiftRequestInterceptors"));
      const responseInterceptorChain = [];
      this.interceptors.response.forEach(/* @__PURE__ */ __name(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      }, "pushResponseInterceptors"));
      let promise;
      let i = 0;
      let len;
      if (!synchronousRequestInterceptors) {
        const chain = [dispatchRequest.bind(this), void 0];
        chain.unshift.apply(chain, requestInterceptorChain);
        chain.push.apply(chain, responseInterceptorChain);
        len = chain.length;
        promise = Promise.resolve(config);
        while (i < len) {
          promise = promise.then(chain[i++], chain[i++]);
        }
        return promise;
      }
      len = requestInterceptorChain.length;
      let newConfig = config;
      i = 0;
      while (i < len) {
        const onFulfilled = requestInterceptorChain[i++];
        const onRejected = requestInterceptorChain[i++];
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected.call(this, error);
          break;
        }
      }
      try {
        promise = dispatchRequest.call(this, newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      i = 0;
      len = responseInterceptorChain.length;
      while (i < len) {
        promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
      }
      return promise;
    }
    getUri(config) {
      config = mergeConfig(this.defaults, config);
      const fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    }
  };
  __name(Axios, "Axios");
  utils_default.forEach(["delete", "get", "head", "options"], /* @__PURE__ */ __name(function forEachMethodNoData(method) {
    Axios.prototype[method] = function(url, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        url,
        data: (config || {}).data
      }));
    };
  }, "forEachMethodNoData"));
  utils_default.forEach(["post", "put", "patch"], /* @__PURE__ */ __name(function forEachMethodWithData(method) {
    function generateHTTPMethod(isForm) {
      return /* @__PURE__ */ __name(function httpMethod(url, data, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        }));
      }, "httpMethod");
    }
    __name(generateHTTPMethod, "generateHTTPMethod");
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + "Form"] = generateHTTPMethod(true);
  }, "forEachMethodWithData"));
  var Axios_default = Axios;

  // ../node_modules/axios/lib/cancel/CancelToken.js
  var CancelToken = class {
    constructor(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      let resolvePromise;
      this.promise = new Promise(/* @__PURE__ */ __name(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      }, "promiseExecutor"));
      const token = this;
      this.promise.then((cancel) => {
        if (!token._listeners)
          return;
        let i = token._listeners.length;
        while (i-- > 0) {
          token._listeners[i](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = (onfulfilled) => {
        let _resolve;
        const promise = new Promise((resolve) => {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = /* @__PURE__ */ __name(function reject() {
          token.unsubscribe(_resolve);
        }, "reject");
        return promise;
      };
      executor(/* @__PURE__ */ __name(function cancel(message, config, request) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError_default(message, config, request);
        resolvePromise(token.reason);
      }, "cancel"));
    }
    throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    }
    subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    }
    unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      const index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    }
    static source() {
      let cancel;
      const token = new CancelToken(/* @__PURE__ */ __name(function executor(c) {
        cancel = c;
      }, "executor"));
      return {
        token,
        cancel
      };
    }
  };
  __name(CancelToken, "CancelToken");
  var CancelToken_default = CancelToken;

  // ../node_modules/axios/lib/helpers/spread.js
  function spread(callback) {
    return /* @__PURE__ */ __name(function wrap(arr) {
      return callback.apply(null, arr);
    }, "wrap");
  }
  __name(spread, "spread");

  // ../node_modules/axios/lib/helpers/isAxiosError.js
  function isAxiosError(payload) {
    return utils_default.isObject(payload) && payload.isAxiosError === true;
  }
  __name(isAxiosError, "isAxiosError");

  // ../node_modules/axios/lib/helpers/HttpStatusCode.js
  var HttpStatusCode = {
    Continue: 100,
    SwitchingProtocols: 101,
    Processing: 102,
    EarlyHints: 103,
    Ok: 200,
    Created: 201,
    Accepted: 202,
    NonAuthoritativeInformation: 203,
    NoContent: 204,
    ResetContent: 205,
    PartialContent: 206,
    MultiStatus: 207,
    AlreadyReported: 208,
    ImUsed: 226,
    MultipleChoices: 300,
    MovedPermanently: 301,
    Found: 302,
    SeeOther: 303,
    NotModified: 304,
    UseProxy: 305,
    Unused: 306,
    TemporaryRedirect: 307,
    PermanentRedirect: 308,
    BadRequest: 400,
    Unauthorized: 401,
    PaymentRequired: 402,
    Forbidden: 403,
    NotFound: 404,
    MethodNotAllowed: 405,
    NotAcceptable: 406,
    ProxyAuthenticationRequired: 407,
    RequestTimeout: 408,
    Conflict: 409,
    Gone: 410,
    LengthRequired: 411,
    PreconditionFailed: 412,
    PayloadTooLarge: 413,
    UriTooLong: 414,
    UnsupportedMediaType: 415,
    RangeNotSatisfiable: 416,
    ExpectationFailed: 417,
    ImATeapot: 418,
    MisdirectedRequest: 421,
    UnprocessableEntity: 422,
    Locked: 423,
    FailedDependency: 424,
    TooEarly: 425,
    UpgradeRequired: 426,
    PreconditionRequired: 428,
    TooManyRequests: 429,
    RequestHeaderFieldsTooLarge: 431,
    UnavailableForLegalReasons: 451,
    InternalServerError: 500,
    NotImplemented: 501,
    BadGateway: 502,
    ServiceUnavailable: 503,
    GatewayTimeout: 504,
    HttpVersionNotSupported: 505,
    VariantAlsoNegotiates: 506,
    InsufficientStorage: 507,
    LoopDetected: 508,
    NotExtended: 510,
    NetworkAuthenticationRequired: 511
  };
  Object.entries(HttpStatusCode).forEach(([key, value]) => {
    HttpStatusCode[value] = key;
  });
  var HttpStatusCode_default = HttpStatusCode;

  // ../node_modules/axios/lib/axios.js
  function createInstance(defaultConfig) {
    const context = new Axios_default(defaultConfig);
    const instance = bind(Axios_default.prototype.request, context);
    utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
    utils_default.extend(instance, context, null, { allOwnKeys: true });
    instance.create = /* @__PURE__ */ __name(function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    }, "create");
    return instance;
  }
  __name(createInstance, "createInstance");
  var axios = createInstance(defaults_default);
  axios.Axios = Axios_default;
  axios.CanceledError = CanceledError_default;
  axios.CancelToken = CancelToken_default;
  axios.isCancel = isCancel;
  axios.VERSION = VERSION;
  axios.toFormData = toFormData_default;
  axios.AxiosError = AxiosError_default;
  axios.Cancel = axios.CanceledError;
  axios.all = /* @__PURE__ */ __name(function all(promises) {
    return Promise.all(promises);
  }, "all");
  axios.spread = spread;
  axios.isAxiosError = isAxiosError;
  axios.mergeConfig = mergeConfig;
  axios.AxiosHeaders = AxiosHeaders_default;
  axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
  axios.getAdapter = adapters_default.getAdapter;
  axios.HttpStatusCode = HttpStatusCode_default;
  axios.default = axios;
  var axios_default = axios;

  // ../node_modules/axios/index.js
  var {
    Axios: Axios2,
    AxiosError: AxiosError2,
    CanceledError: CanceledError2,
    isCancel: isCancel2,
    CancelToken: CancelToken2,
    VERSION: VERSION2,
    all: all2,
    Cancel,
    isAxiosError: isAxiosError2,
    spread: spread2,
    toFormData: toFormData2,
    AxiosHeaders: AxiosHeaders2,
    HttpStatusCode: HttpStatusCode2,
    formToJSON,
    getAdapter,
    mergeConfig: mergeConfig2
  } = axios_default;

  // src/utils.ts
  function doRequest(requestBody) {
    try {
      const promise = axios_default.post(requestBody.url, requestBody.body, { headers: requestBody.headers });
      const datapromise = promise.then((response) => response.data);
      return datapromise;
    } catch (errors) {
      console.error(errors);
      return void 0;
    }
  }
  __name(doRequest, "doRequest");

  // src/acc.ts
  var Account = class {
    async account(func, username2, userdata) {
      let gameRequest = {
        function: func,
        username: username2,
        Userdata: userdata
      };
      const options = {
        url: "https://c7w4so9tq4.execute-api.ap-south-1.amazonaws.com/second/cc",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(gameRequest)
      };
      try {
        const gameResponse = await doRequest(options);
        return gameResponse;
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    }
  };
  __name(Account, "Account");

  // src/game.ts
  var Game = class {
    async play(bet) {
      let gameRequest = {
        bets: bet
      };
      const options = {
        url: "https://c7w4so9tq4.execute-api.ap-south-1.amazonaws.com/second/first",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(gameRequest)
      };
      try {
        const gameResponse = await doRequest(options);
        return gameResponse;
      } catch (err) {
        console.log(JSON.stringify(err));
        return void 0;
      }
    }
  };
  __name(Game, "Game");

  // src/Main.ts
  var acc = new Account();
  var game = new Game();
  var username = "none";
  document.addEventListener("DOMContentLoaded", () => {
    const bodyId = document.body.id;
    const spinButton = document.getElementById("submitbutton");
    const usernameElement = document.getElementById("login-username");
    const passwordElement = document.getElementById("login-password");
    const usernameElement1 = document.getElementById("signup-username");
    const passwordElement1 = document.getElementById("signup-password");
    const signinButton = document.getElementById("LogIn");
    const signupButton = document.getElementById("Sign-up");
    const bankbalanceElement = document.getElementById("bankbalance");
    const bankElement = document.getElementById("bank");
    const betElement = document.getElementById("bet-amount");
    const betRowsElement = document.getElementById("bet-rows");
    const BankAddButton = document.getElementById("bankadd");
    const slotResultsElement = document.getElementById("slot");
    const statusElement = document.getElementById("status");
    if (bodyId === "home") {
      const storedusername = localStorage.getItem("username");
      if (storedusername) {
        username = storedusername;
      }
      acc.account("getBankBalance", username).then((response) => {
        let bankbal = response;
        console.log(response);
        bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
      });
      BankAddButton.addEventListener("click", () => {
        let bank = parseFloat(bankElement.value);
        if (username == "none") {
          alert("sign in or sign up to start the game!");
        } else {
          if (bank < 1e10) {
            acc.account("BankAddWid", username, bank);
          }
          if (bank >= 1e10) {
            alert("Amount too high!");
          }
          setTimeout(() => {
            acc.account("getBankBalance", username).then((response) => {
              let bankbal;
              bankbal = response;
              bankbalanceElement.textContent = `Bank balance: $${bankbal}`;
            });
          }, 100);
        }
      });
      spinButton.addEventListener("click", () => {
        const betvalue = parseFloat(betElement.value);
        const betrows = parseFloat(betRowsElement.value);
        const bet = Array(betrows).fill(betvalue);
        let bankbal;
        acc.account("getBankBalance", username).then((response) => {
          console.log(response);
          bankbal = response;
          if (bet > bankbal) {
            alert("Not enough balance!");
            return;
          }
          if (bankbal < 10) {
            alert("At least $10 should be deposited to play the game");
            return;
          } else {
            game.play(bet).then((res) => {
              let beoutput = res;
              let slot = beoutput.matrix;
              let output = beoutput.winnings;
              console.log(slot);
              slotResultsElement.innerHTML = "";
              slot.forEach((row) => {
                const rowDiv = document.createElement("div");
                rowDiv.classList.add("slot-row");
                row.forEach((cell) => {
                  const cellDiv = document.createElement("div");
                  cellDiv.classList.add("slot-cell");
                  cellDiv.textContent = cell;
                  rowDiv.appendChild(cellDiv);
                });
                slotResultsElement.appendChild(rowDiv);
              });
              if (output > 0) {
                statusElement.textContent = `You won $${output}!`;
                acc.account("BankAddWid", username, output).then((response2) => {
                  let bankbal2;
                  bankbal2 = response2;
                  bankbalanceElement.textContent = `Bank balance: $${bankbal2}`;
                });
              } else {
                statusElement.textContent = `You lost $${betvalue * betrows}, keep trying!`;
                acc.account("BankAddWid", username, betvalue * betrows).then((response2) => {
                  let bankbal2;
                  bankbal2 = response2;
                  bankbalanceElement.textContent = `Bank balance: $${bankbal2}`;
                });
              }
            });
          }
        });
      });
    } else if (bodyId === "sign-in") {
      if (signinButton) {
        signinButton.addEventListener("click", () => {
          let user = usernameElement.value;
          let password = passwordElement.value;
          acc.account("UserVerify", user, password).then((response) => {
            if (response === true) {
              username = user;
              window.location.href = "home.html";
              localStorage.setItem("username", username);
            } else {
              alert("Username or password incorrect");
            }
          });
        });
      }
      if (signupButton) {
        signupButton.addEventListener("click", () => {
          let user = usernameElement1.value;
          let password = passwordElement1.value;
          acc.account("UserAdd", user, password).then((response) => {
            if (response === "User is added successfully") {
              username = user;
              window.location.href = "home.html";
            } else {
              alert("Username already exists");
            }
          });
        });
      }
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Zvcm1EYXRhLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vYnJvd3Nlci9jbGFzc2VzL0Jsb2IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9wbGF0Zm9ybS9icm93c2VyL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vY29tbW9uL3V0aWxzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvcGxhdGZvcm0vaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NIZWFkZXJzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbGVkRXJyb3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3BlZWRvbWV0ZXIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Rocm90dGxlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3Jlc29sdmVDb25maWcuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbXBvc2VTaWduYWxzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy90cmFja1N0cmVhbS5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2ZldGNoLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMvYWRhcHRlcnMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2Vudi9kYXRhLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy92YWxpZGF0b3IuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQXhpb3NFcnJvci5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvSHR0cFN0YXR1c0NvZGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsICIuLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCAic3JjL3V0aWxzLnRzIiwgInNyYy9hY2MudHMiLCAic3JjL2dhbWUudHMiLCAic3JjL01haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJndW1lbnRzKTtcbiAgfTtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBiaW5kIGZyb20gJy4vaGVscGVycy9iaW5kLmpzJztcblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxuY29uc3Qge3RvU3RyaW5nfSA9IE9iamVjdC5wcm90b3R5cGU7XG5jb25zdCB7Z2V0UHJvdG90eXBlT2Z9ID0gT2JqZWN0O1xuXG5jb25zdCBraW5kT2YgPSAoY2FjaGUgPT4gdGhpbmcgPT4ge1xuICAgIGNvbnN0IHN0ciA9IHRvU3RyaW5nLmNhbGwodGhpbmcpO1xuICAgIHJldHVybiBjYWNoZVtzdHJdIHx8IChjYWNoZVtzdHJdID0gc3RyLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpKTtcbn0pKE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG5jb25zdCBraW5kT2ZUZXN0ID0gKHR5cGUpID0+IHtcbiAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuICh0aGluZykgPT4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZVxufVxuXG5jb25zdCB0eXBlT2ZUZXN0ID0gdHlwZSA9PiB0aGluZyA9PiB0eXBlb2YgdGhpbmcgPT09IHR5cGU7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCB7aXNBcnJheX0gPSBBcnJheTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1VuZGVmaW5lZCA9IHR5cGVPZlRlc3QoJ3VuZGVmaW5lZCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQnVmZmVyXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQnVmZmVyKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwpICYmIHZhbC5jb25zdHJ1Y3RvciAhPT0gbnVsbCAmJiAhaXNVbmRlZmluZWQodmFsLmNvbnN0cnVjdG9yKVxuICAgICYmIGlzRnVuY3Rpb24odmFsLmNvbnN0cnVjdG9yLmlzQnVmZmVyKSAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0FycmF5QnVmZmVyID0ga2luZE9mVGVzdCgnQXJyYXlCdWZmZXInKTtcblxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIGxldCByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKGlzQXJyYXlCdWZmZXIodmFsLmJ1ZmZlcikpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNTdHJpbmcgPSB0eXBlT2ZUZXN0KCdzdHJpbmcnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Z1bmN0aW9uID0gdHlwZU9mVGVzdCgnZnVuY3Rpb24nKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc051bWJlciA9IHR5cGVPZlRlc3QoJ251bWJlcicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7Kn0gdGhpbmcgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc09iamVjdCA9ICh0aGluZykgPT4gdGhpbmcgIT09IG51bGwgJiYgdHlwZW9mIHRoaW5nID09PSAnb2JqZWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJvb2xlYW5cbiAqXG4gKiBAcGFyYW0geyp9IHRoaW5nIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJvb2xlYW4sIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc0Jvb2xlYW4gPSB0aGluZyA9PiB0aGluZyA9PT0gdHJ1ZSB8fCB0aGluZyA9PT0gZmFsc2U7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgcGxhaW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNQbGFpbk9iamVjdCA9ICh2YWwpID0+IHtcbiAgaWYgKGtpbmRPZih2YWwpICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKHZhbCk7XG4gIHJldHVybiAocHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG90eXBlKSA9PT0gbnVsbCkgJiYgIShTeW1ib2wudG9TdHJpbmdUYWcgaW4gdmFsKSAmJiAhKFN5bWJvbC5pdGVyYXRvciBpbiB2YWwpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNEYXRlID0ga2luZE9mVGVzdCgnRGF0ZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNCbG9iID0ga2luZE9mVGVzdCgnQmxvYicpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZUxpc3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzRmlsZUxpc3QgPSBraW5kT2ZUZXN0KCdGaWxlTGlzdCcpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzU3RyZWFtID0gKHZhbCkgPT4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHsqfSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuY29uc3QgaXNGb3JtRGF0YSA9ICh0aGluZykgPT4ge1xuICBsZXQga2luZDtcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8IChcbiAgICAgIGlzRnVuY3Rpb24odGhpbmcuYXBwZW5kKSAmJiAoXG4gICAgICAgIChraW5kID0ga2luZE9mKHRoaW5nKSkgPT09ICdmb3JtZGF0YScgfHxcbiAgICAgICAgLy8gZGV0ZWN0IGZvcm0tZGF0YSBpbnN0YW5jZVxuICAgICAgICAoa2luZCA9PT0gJ29iamVjdCcgJiYgaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgRm9ybURhdGFdJylcbiAgICAgIClcbiAgICApXG4gIClcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmNvbnN0IGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbmNvbnN0IFtpc1JlYWRhYmxlU3RyZWFtLCBpc1JlcXVlc3QsIGlzUmVzcG9uc2UsIGlzSGVhZGVyc10gPSBbJ1JlYWRhYmxlU3RyZWFtJywgJ1JlcXVlc3QnLCAnUmVzcG9uc2UnLCAnSGVhZGVycyddLm1hcChraW5kT2ZUZXN0KTtcblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuY29uc3QgdHJpbSA9IChzdHIpID0+IHN0ci50cmltID9cbiAgc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZywgJycpO1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBbYWxsT3duS2V5cyA9IGZhbHNlXVxuICogQHJldHVybnMge2FueX1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuLCB7YWxsT3duS2V5cyA9IGZhbHNlfSA9IHt9KSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IGk7XG4gIGxldCBsO1xuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yIChpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBjb25zdCBrZXlzID0gYWxsT3duS2V5cyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikgOiBPYmplY3Qua2V5cyhvYmopO1xuICAgIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICAgIGxldCBrZXk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmRLZXkob2JqLCBrZXkpIHtcbiAga2V5ID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICBsZXQgX2tleTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBfa2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoa2V5ID09PSBfa2V5LnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiBfa2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuY29uc3QgX2dsb2JhbCA9ICgoKSA9PiB7XG4gIC8qZXNsaW50IG5vLXVuZGVmOjAqL1xuICBpZiAodHlwZW9mIGdsb2JhbFRoaXMgIT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBnbG9iYWxUaGlzO1xuICByZXR1cm4gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKVxufSkoKTtcblxuY29uc3QgaXNDb250ZXh0RGVmaW5lZCA9IChjb250ZXh0KSA9PiAhaXNVbmRlZmluZWQoY29udGV4dCkgJiYgY29udGV4dCAhPT0gX2dsb2JhbDtcblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKlxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICBjb25zdCB7Y2FzZWxlc3N9ID0gaXNDb250ZXh0RGVmaW5lZCh0aGlzKSAmJiB0aGlzIHx8IHt9O1xuICBjb25zdCByZXN1bHQgPSB7fTtcbiAgY29uc3QgYXNzaWduVmFsdWUgPSAodmFsLCBrZXkpID0+IHtcbiAgICBjb25zdCB0YXJnZXRLZXkgPSBjYXNlbGVzcyAmJiBmaW5kS2V5KHJlc3VsdCwga2V5KSB8fCBrZXk7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QocmVzdWx0W3RhcmdldEtleV0pICYmIGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZShyZXN1bHRbdGFyZ2V0S2V5XSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzUGxhaW5PYmplY3QodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSBtZXJnZSh7fSwgdmFsKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsKSkge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWwuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W3RhcmdldEtleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgYXJndW1lbnRzW2ldICYmIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW2FsbE93bktleXNdXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmNvbnN0IGV4dGVuZCA9IChhLCBiLCB0aGlzQXJnLCB7YWxsT3duS2V5c309IHt9KSA9PiB7XG4gIGZvckVhY2goYiwgKHZhbCwga2V5KSA9PiB7XG4gICAgaWYgKHRoaXNBcmcgJiYgaXNGdW5jdGlvbih2YWwpKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0sIHthbGxPd25LZXlzfSk7XG4gIHJldHVybiBhO1xufVxuXG4vKipcbiAqIFJlbW92ZSBieXRlIG9yZGVyIG1hcmtlci4gVGhpcyBjYXRjaGVzIEVGIEJCIEJGICh0aGUgVVRGLTggQk9NKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHdpdGggQk9NXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gY29udGVudCB2YWx1ZSB3aXRob3V0IEJPTVxuICovXG5jb25zdCBzdHJpcEJPTSA9IChjb250ZW50KSA9PiB7XG4gIGlmIChjb250ZW50LmNoYXJDb2RlQXQoMCkgPT09IDB4RkVGRikge1xuICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufVxuXG4vKipcbiAqIEluaGVyaXQgdGhlIHByb3RvdHlwZSBtZXRob2RzIGZyb20gb25lIGNvbnN0cnVjdG9yIGludG8gYW5vdGhlclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHN1cGVyQ29uc3RydWN0b3JcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcHJvcHNdXG4gKiBAcGFyYW0ge29iamVjdH0gW2Rlc2NyaXB0b3JzXVxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBpbmhlcml0cyA9IChjb25zdHJ1Y3Rvciwgc3VwZXJDb25zdHJ1Y3RvciwgcHJvcHMsIGRlc2NyaXB0b3JzKSA9PiB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIGRlc2NyaXB0b3JzKTtcbiAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb25zdHJ1Y3RvciwgJ3N1cGVyJywge1xuICAgIHZhbHVlOiBzdXBlckNvbnN0cnVjdG9yLnByb3RvdHlwZVxuICB9KTtcbiAgcHJvcHMgJiYgT2JqZWN0LmFzc2lnbihjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3BzKTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlIG9iamVjdCB3aXRoIGRlZXAgcHJvdG90eXBlIGNoYWluIHRvIGEgZmxhdCBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2VPYmogc291cmNlIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IFtkZXN0T2JqXVxuICogQHBhcmFtIHtGdW5jdGlvbnxCb29sZWFufSBbZmlsdGVyXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3Byb3BGaWx0ZXJdXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuY29uc3QgdG9GbGF0T2JqZWN0ID0gKHNvdXJjZU9iaiwgZGVzdE9iaiwgZmlsdGVyLCBwcm9wRmlsdGVyKSA9PiB7XG4gIGxldCBwcm9wcztcbiAgbGV0IGk7XG4gIGxldCBwcm9wO1xuICBjb25zdCBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVxLW51bGwsZXFlcWVxXG4gIGlmIChzb3VyY2VPYmogPT0gbnVsbCkgcmV0dXJuIGRlc3RPYmo7XG5cbiAgZG8ge1xuICAgIHByb3BzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc291cmNlT2JqKTtcbiAgICBpID0gcHJvcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgICBwcm9wID0gcHJvcHNbaV07XG4gICAgICBpZiAoKCFwcm9wRmlsdGVyIHx8IHByb3BGaWx0ZXIocHJvcCwgc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgIW1lcmdlZFtwcm9wXSkge1xuICAgICAgICBkZXN0T2JqW3Byb3BdID0gc291cmNlT2JqW3Byb3BdO1xuICAgICAgICBtZXJnZWRbcHJvcF0gPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBzb3VyY2VPYmogPSBmaWx0ZXIgIT09IGZhbHNlICYmIGdldFByb3RvdHlwZU9mKHNvdXJjZU9iaik7XG4gIH0gd2hpbGUgKHNvdXJjZU9iaiAmJiAoIWZpbHRlciB8fCBmaWx0ZXIoc291cmNlT2JqLCBkZXN0T2JqKSkgJiYgc291cmNlT2JqICE9PSBPYmplY3QucHJvdG90eXBlKTtcblxuICByZXR1cm4gZGVzdE9iajtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hTdHJpbmdcbiAqIEBwYXJhbSB7TnVtYmVyfSBbcG9zaXRpb249IDBdXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGVuZHNXaXRoID0gKHN0ciwgc2VhcmNoU3RyaW5nLCBwb3NpdGlvbikgPT4ge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHBvc2l0aW9uID09PSB1bmRlZmluZWQgfHwgcG9zaXRpb24gPiBzdHIubGVuZ3RoKSB7XG4gICAgcG9zaXRpb24gPSBzdHIubGVuZ3RoO1xuICB9XG4gIHBvc2l0aW9uIC09IHNlYXJjaFN0cmluZy5sZW5ndGg7XG4gIGNvbnN0IGxhc3RJbmRleCA9IHN0ci5pbmRleE9mKHNlYXJjaFN0cmluZywgcG9zaXRpb24pO1xuICByZXR1cm4gbGFzdEluZGV4ICE9PSAtMSAmJiBsYXN0SW5kZXggPT09IHBvc2l0aW9uO1xufVxuXG5cbi8qKlxuICogUmV0dXJucyBuZXcgYXJyYXkgZnJvbSBhcnJheSBsaWtlIG9iamVjdCBvciBudWxsIGlmIGZhaWxlZFxuICpcbiAqIEBwYXJhbSB7Kn0gW3RoaW5nXVxuICpcbiAqIEByZXR1cm5zIHs/QXJyYXl9XG4gKi9cbmNvbnN0IHRvQXJyYXkgPSAodGhpbmcpID0+IHtcbiAgaWYgKCF0aGluZykgcmV0dXJuIG51bGw7XG4gIGlmIChpc0FycmF5KHRoaW5nKSkgcmV0dXJuIHRoaW5nO1xuICBsZXQgaSA9IHRoaW5nLmxlbmd0aDtcbiAgaWYgKCFpc051bWJlcihpKSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGFyciA9IG5ldyBBcnJheShpKTtcbiAgd2hpbGUgKGktLSA+IDApIHtcbiAgICBhcnJbaV0gPSB0aGluZ1tpXTtcbiAgfVxuICByZXR1cm4gYXJyO1xufVxuXG4vKipcbiAqIENoZWNraW5nIGlmIHRoZSBVaW50OEFycmF5IGV4aXN0cyBhbmQgaWYgaXQgZG9lcywgaXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZVxuICogdGhpbmcgcGFzc2VkIGluIGlzIGFuIGluc3RhbmNlIG9mIFVpbnQ4QXJyYXlcbiAqXG4gKiBAcGFyYW0ge1R5cGVkQXJyYXl9XG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuY29uc3QgaXNUeXBlZEFycmF5ID0gKFR5cGVkQXJyYXkgPT4ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gdGhpbmcgPT4ge1xuICAgIHJldHVybiBUeXBlZEFycmF5ICYmIHRoaW5nIGluc3RhbmNlb2YgVHlwZWRBcnJheTtcbiAgfTtcbn0pKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyAmJiBnZXRQcm90b3R5cGVPZihVaW50OEFycmF5KSk7XG5cbi8qKlxuICogRm9yIGVhY2ggZW50cnkgaW4gdGhlIG9iamVjdCwgY2FsbCB0aGUgZnVuY3Rpb24gd2l0aCB0aGUga2V5IGFuZCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBlbnRyeS5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgZm9yRWFjaEVudHJ5ID0gKG9iaiwgZm4pID0+IHtcbiAgY29uc3QgZ2VuZXJhdG9yID0gb2JqICYmIG9ialtTeW1ib2wuaXRlcmF0b3JdO1xuXG4gIGNvbnN0IGl0ZXJhdG9yID0gZ2VuZXJhdG9yLmNhbGwob2JqKTtcblxuICBsZXQgcmVzdWx0O1xuXG4gIHdoaWxlICgocmVzdWx0ID0gaXRlcmF0b3IubmV4dCgpKSAmJiAhcmVzdWx0LmRvbmUpIHtcbiAgICBjb25zdCBwYWlyID0gcmVzdWx0LnZhbHVlO1xuICAgIGZuLmNhbGwob2JqLCBwYWlyWzBdLCBwYWlyWzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcmVndWxhciBleHByZXNzaW9uIGFuZCBhIHN0cmluZywgYW5kIHJldHVybnMgYW4gYXJyYXkgb2YgYWxsIHRoZSBtYXRjaGVzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHJlZ0V4cCAtIFRoZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWF0Y2ggYWdhaW5zdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIHNlYXJjaC5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXk8Ym9vbGVhbj59XG4gKi9cbmNvbnN0IG1hdGNoQWxsID0gKHJlZ0V4cCwgc3RyKSA9PiB7XG4gIGxldCBtYXRjaGVzO1xuICBjb25zdCBhcnIgPSBbXTtcblxuICB3aGlsZSAoKG1hdGNoZXMgPSByZWdFeHAuZXhlYyhzdHIpKSAhPT0gbnVsbCkge1xuICAgIGFyci5wdXNoKG1hdGNoZXMpO1xuICB9XG5cbiAgcmV0dXJuIGFycjtcbn1cblxuLyogQ2hlY2tpbmcgaWYgdGhlIGtpbmRPZlRlc3QgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHdoZW4gcGFzc2VkIGFuIEhUTUxGb3JtRWxlbWVudC4gKi9cbmNvbnN0IGlzSFRNTEZvcm0gPSBraW5kT2ZUZXN0KCdIVE1MRm9ybUVsZW1lbnQnKTtcblxuY29uc3QgdG9DYW1lbENhc2UgPSBzdHIgPT4ge1xuICByZXR1cm4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvWy1fXFxzXShbYS16XFxkXSkoXFx3KikvZyxcbiAgICBmdW5jdGlvbiByZXBsYWNlcihtLCBwMSwgcDIpIHtcbiAgICAgIHJldHVybiBwMS50b1VwcGVyQ2FzZSgpICsgcDI7XG4gICAgfVxuICApO1xufTtcblxuLyogQ3JlYXRpbmcgYSBmdW5jdGlvbiB0aGF0IHdpbGwgY2hlY2sgaWYgYW4gb2JqZWN0IGhhcyBhIHByb3BlcnR5LiAqL1xuY29uc3QgaGFzT3duUHJvcGVydHkgPSAoKHtoYXNPd25Qcm9wZXJ0eX0pID0+IChvYmosIHByb3ApID0+IGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkoT2JqZWN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0XG4gKlxuICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFJlZ0V4cCBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5jb25zdCBpc1JlZ0V4cCA9IGtpbmRPZlRlc3QoJ1JlZ0V4cCcpO1xuXG5jb25zdCByZWR1Y2VEZXNjcmlwdG9ycyA9IChvYmosIHJlZHVjZXIpID0+IHtcbiAgY29uc3QgZGVzY3JpcHRvcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyhvYmopO1xuICBjb25zdCByZWR1Y2VkRGVzY3JpcHRvcnMgPSB7fTtcblxuICBmb3JFYWNoKGRlc2NyaXB0b3JzLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIGxldCByZXQ7XG4gICAgaWYgKChyZXQgPSByZWR1Y2VyKGRlc2NyaXB0b3IsIG5hbWUsIG9iaikpICE9PSBmYWxzZSkge1xuICAgICAgcmVkdWNlZERlc2NyaXB0b3JzW25hbWVdID0gcmV0IHx8IGRlc2NyaXB0b3I7XG4gICAgfVxuICB9KTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhvYmosIHJlZHVjZWREZXNjcmlwdG9ycyk7XG59XG5cbi8qKlxuICogTWFrZXMgYWxsIG1ldGhvZHMgcmVhZC1vbmx5XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKi9cblxuY29uc3QgZnJlZXplTWV0aG9kcyA9IChvYmopID0+IHtcbiAgcmVkdWNlRGVzY3JpcHRvcnMob2JqLCAoZGVzY3JpcHRvciwgbmFtZSkgPT4ge1xuICAgIC8vIHNraXAgcmVzdHJpY3RlZCBwcm9wcyBpbiBzdHJpY3QgbW9kZVxuICAgIGlmIChpc0Z1bmN0aW9uKG9iaikgJiYgWydhcmd1bWVudHMnLCAnY2FsbGVyJywgJ2NhbGxlZSddLmluZGV4T2YobmFtZSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdmFsdWUgPSBvYmpbbmFtZV07XG5cbiAgICBpZiAoIWlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm47XG5cbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBmYWxzZTtcblxuICAgIGlmICgnd3JpdGFibGUnIGluIGRlc2NyaXB0b3IpIHtcbiAgICAgIGRlc2NyaXB0b3Iud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWRlc2NyaXB0b3Iuc2V0KSB7XG4gICAgICBkZXNjcmlwdG9yLnNldCA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0NhbiBub3QgcmV3cml0ZSByZWFkLW9ubHkgbWV0aG9kIFxcJycgKyBuYW1lICsgJ1xcJycpO1xuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufVxuXG5jb25zdCB0b09iamVjdFNldCA9IChhcnJheU9yU3RyaW5nLCBkZWxpbWl0ZXIpID0+IHtcbiAgY29uc3Qgb2JqID0ge307XG5cbiAgY29uc3QgZGVmaW5lID0gKGFycikgPT4ge1xuICAgIGFyci5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICAgIG9ialt2YWx1ZV0gPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgaXNBcnJheShhcnJheU9yU3RyaW5nKSA/IGRlZmluZShhcnJheU9yU3RyaW5nKSA6IGRlZmluZShTdHJpbmcoYXJyYXlPclN0cmluZykuc3BsaXQoZGVsaW1pdGVyKSk7XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuY29uc3Qgbm9vcCA9ICgpID0+IHt9XG5cbmNvbnN0IHRvRmluaXRlTnVtYmVyID0gKHZhbHVlLCBkZWZhdWx0VmFsdWUpID0+IHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKHZhbHVlID0gK3ZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xufVxuXG5jb25zdCBBTFBIQSA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eidcblxuY29uc3QgRElHSVQgPSAnMDEyMzQ1Njc4OSc7XG5cbmNvbnN0IEFMUEhBQkVUID0ge1xuICBESUdJVCxcbiAgQUxQSEEsXG4gIEFMUEhBX0RJR0lUOiBBTFBIQSArIEFMUEhBLnRvVXBwZXJDYXNlKCkgKyBESUdJVFxufVxuXG5jb25zdCBnZW5lcmF0ZVN0cmluZyA9IChzaXplID0gMTYsIGFscGhhYmV0ID0gQUxQSEFCRVQuQUxQSEFfRElHSVQpID0+IHtcbiAgbGV0IHN0ciA9ICcnO1xuICBjb25zdCB7bGVuZ3RofSA9IGFscGhhYmV0O1xuICB3aGlsZSAoc2l6ZS0tKSB7XG4gICAgc3RyICs9IGFscGhhYmV0W01hdGgucmFuZG9tKCkgKiBsZW5ndGh8MF1cbiAgfVxuXG4gIHJldHVybiBzdHI7XG59XG5cbi8qKlxuICogSWYgdGhlIHRoaW5nIGlzIGEgRm9ybURhdGEgb2JqZWN0LCByZXR1cm4gdHJ1ZSwgb3RoZXJ3aXNlIHJldHVybiBmYWxzZS5cbiAqXG4gKiBAcGFyYW0ge3Vua25vd259IHRoaW5nIC0gVGhlIHRoaW5nIHRvIGNoZWNrLlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1NwZWNDb21wbGlhbnRGb3JtKHRoaW5nKSB7XG4gIHJldHVybiAhISh0aGluZyAmJiBpc0Z1bmN0aW9uKHRoaW5nLmFwcGVuZCkgJiYgdGhpbmdbU3ltYm9sLnRvU3RyaW5nVGFnXSA9PT0gJ0Zvcm1EYXRhJyAmJiB0aGluZ1tTeW1ib2wuaXRlcmF0b3JdKTtcbn1cblxuY29uc3QgdG9KU09OT2JqZWN0ID0gKG9iaikgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBBcnJheSgxMCk7XG5cbiAgY29uc3QgdmlzaXQgPSAoc291cmNlLCBpKSA9PiB7XG5cbiAgICBpZiAoaXNPYmplY3Qoc291cmNlKSkge1xuICAgICAgaWYgKHN0YWNrLmluZGV4T2Yoc291cmNlKSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYoISgndG9KU09OJyBpbiBzb3VyY2UpKSB7XG4gICAgICAgIHN0YWNrW2ldID0gc291cmNlO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBpc0FycmF5KHNvdXJjZSkgPyBbXSA6IHt9O1xuXG4gICAgICAgIGZvckVhY2goc291cmNlLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlZHVjZWRWYWx1ZSA9IHZpc2l0KHZhbHVlLCBpICsgMSk7XG4gICAgICAgICAgIWlzVW5kZWZpbmVkKHJlZHVjZWRWYWx1ZSkgJiYgKHRhcmdldFtrZXldID0gcmVkdWNlZFZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RhY2tbaV0gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgcmV0dXJuIHZpc2l0KG9iaiwgMCk7XG59XG5cbmNvbnN0IGlzQXN5bmNGbiA9IGtpbmRPZlRlc3QoJ0FzeW5jRnVuY3Rpb24nKTtcblxuY29uc3QgaXNUaGVuYWJsZSA9ICh0aGluZykgPT5cbiAgdGhpbmcgJiYgKGlzT2JqZWN0KHRoaW5nKSB8fCBpc0Z1bmN0aW9uKHRoaW5nKSkgJiYgaXNGdW5jdGlvbih0aGluZy50aGVuKSAmJiBpc0Z1bmN0aW9uKHRoaW5nLmNhdGNoKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nLFxuICBpc051bWJlcixcbiAgaXNCb29sZWFuLFxuICBpc09iamVjdCxcbiAgaXNQbGFpbk9iamVjdCxcbiAgaXNSZWFkYWJsZVN0cmVhbSxcbiAgaXNSZXF1ZXN0LFxuICBpc1Jlc3BvbnNlLFxuICBpc0hlYWRlcnMsXG4gIGlzVW5kZWZpbmVkLFxuICBpc0RhdGUsXG4gIGlzRmlsZSxcbiAgaXNCbG9iLFxuICBpc1JlZ0V4cCxcbiAgaXNGdW5jdGlvbixcbiAgaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3QsXG4gIGZvckVhY2gsXG4gIG1lcmdlLFxuICBleHRlbmQsXG4gIHRyaW0sXG4gIHN0cmlwQk9NLFxuICBpbmhlcml0cyxcbiAgdG9GbGF0T2JqZWN0LFxuICBraW5kT2YsXG4gIGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoLFxuICB0b0FycmF5LFxuICBmb3JFYWNoRW50cnksXG4gIG1hdGNoQWxsLFxuICBpc0hUTUxGb3JtLFxuICBoYXNPd25Qcm9wZXJ0eSxcbiAgaGFzT3duUHJvcDogaGFzT3duUHJvcGVydHksIC8vIGFuIGFsaWFzIHRvIGF2b2lkIEVTTGludCBuby1wcm90b3R5cGUtYnVpbHRpbnMgZGV0ZWN0aW9uXG4gIHJlZHVjZURlc2NyaXB0b3JzLFxuICBmcmVlemVNZXRob2RzLFxuICB0b09iamVjdFNldCxcbiAgdG9DYW1lbENhc2UsXG4gIG5vb3AsXG4gIHRvRmluaXRlTnVtYmVyLFxuICBmaW5kS2V5LFxuICBnbG9iYWw6IF9nbG9iYWwsXG4gIGlzQ29udGV4dERlZmluZWQsXG4gIEFMUEhBQkVULFxuICBnZW5lcmF0ZVN0cmluZyxcbiAgaXNTcGVjQ29tcGxpYW50Rm9ybSxcbiAgdG9KU09OT2JqZWN0LFxuICBpc0FzeW5jRm4sXG4gIGlzVGhlbmFibGVcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbmZpZ10gVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xuZnVuY3Rpb24gQXhpb3NFcnJvcihtZXNzYWdlLCBjb2RlLCBjb25maWcsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIEVycm9yLmNhbGwodGhpcyk7XG5cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2s7XG4gIH1cblxuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLm5hbWUgPSAnQXhpb3NFcnJvcic7XG4gIGNvZGUgJiYgKHRoaXMuY29kZSA9IGNvZGUpO1xuICBjb25maWcgJiYgKHRoaXMuY29uZmlnID0gY29uZmlnKTtcbiAgcmVxdWVzdCAmJiAodGhpcy5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gIHJlc3BvbnNlICYmICh0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2UpO1xufVxuXG51dGlscy5pbmhlcml0cyhBeGlvc0Vycm9yLCBFcnJvciwge1xuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB1dGlscy50b0pTT05PYmplY3QodGhpcy5jb25maWcpLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgc3RhdHVzOiB0aGlzLnJlc3BvbnNlICYmIHRoaXMucmVzcG9uc2Uuc3RhdHVzID8gdGhpcy5yZXNwb25zZS5zdGF0dXMgOiBudWxsXG4gICAgfTtcbiAgfVxufSk7XG5cbmNvbnN0IHByb3RvdHlwZSA9IEF4aW9zRXJyb3IucHJvdG90eXBlO1xuY29uc3QgZGVzY3JpcHRvcnMgPSB7fTtcblxuW1xuICAnRVJSX0JBRF9PUFRJT05fVkFMVUUnLFxuICAnRVJSX0JBRF9PUFRJT04nLFxuICAnRUNPTk5BQk9SVEVEJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFUlJfTkVUV09SSycsXG4gICdFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTJyxcbiAgJ0VSUl9ERVBSRUNBVEVEJyxcbiAgJ0VSUl9CQURfUkVTUE9OU0UnLFxuICAnRVJSX0JBRF9SRVFVRVNUJyxcbiAgJ0VSUl9DQU5DRUxFRCcsXG4gICdFUlJfTk9UX1NVUFBPUlQnLFxuICAnRVJSX0lOVkFMSURfVVJMJ1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbl0uZm9yRWFjaChjb2RlID0+IHtcbiAgZGVzY3JpcHRvcnNbY29kZV0gPSB7dmFsdWU6IGNvZGV9O1xufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKEF4aW9zRXJyb3IsIGRlc2NyaXB0b3JzKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90b3R5cGUsICdpc0F4aW9zRXJyb3InLCB7dmFsdWU6IHRydWV9KTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbkF4aW9zRXJyb3IuZnJvbSA9IChlcnJvciwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSwgY3VzdG9tUHJvcHMpID0+IHtcbiAgY29uc3QgYXhpb3NFcnJvciA9IE9iamVjdC5jcmVhdGUocHJvdG90eXBlKTtcblxuICB1dGlscy50b0ZsYXRPYmplY3QoZXJyb3IsIGF4aW9zRXJyb3IsIGZ1bmN0aW9uIGZpbHRlcihvYmopIHtcbiAgICByZXR1cm4gb2JqICE9PSBFcnJvci5wcm90b3R5cGU7XG4gIH0sIHByb3AgPT4ge1xuICAgIHJldHVybiBwcm9wICE9PSAnaXNBeGlvc0Vycm9yJztcbiAgfSk7XG5cbiAgQXhpb3NFcnJvci5jYWxsKGF4aW9zRXJyb3IsIGVycm9yLm1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpO1xuXG4gIGF4aW9zRXJyb3IuY2F1c2UgPSBlcnJvcjtcblxuICBheGlvc0Vycm9yLm5hbWUgPSBlcnJvci5uYW1lO1xuXG4gIGN1c3RvbVByb3BzICYmIE9iamVjdC5hc3NpZ24oYXhpb3NFcnJvciwgY3VzdG9tUHJvcHMpO1xuXG4gIHJldHVybiBheGlvc0Vycm9yO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NFcnJvcjtcbiIsICIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgc3RyaWN0XG5leHBvcnQgZGVmYXVsdCBudWxsO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4uL2NvcmUvQXhpb3NFcnJvci5qcyc7XG4vLyB0ZW1wb3JhcnkgaG90Zml4IHRvIGF2b2lkIGNpcmN1bGFyIHJlZmVyZW5jZXMgdW50aWwgQXhpb3NVUkxTZWFyY2hQYXJhbXMgaXMgcmVmYWN0b3JlZFxuaW1wb3J0IFBsYXRmb3JtRm9ybURhdGEgZnJvbSAnLi4vcGxhdGZvcm0vbm9kZS9jbGFzc2VzL0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBnaXZlbiB0aGluZyBpcyBhIGFycmF5IG9yIGpzIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhpbmcgLSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGJlIHZpc2l0ZWQuXG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVmlzaXRhYmxlKHRoaW5nKSB7XG4gIHJldHVybiB1dGlscy5pc1BsYWluT2JqZWN0KHRoaW5nKSB8fCB1dGlscy5pc0FycmF5KHRoaW5nKTtcbn1cblxuLyoqXG4gKiBJdCByZW1vdmVzIHRoZSBicmFja2V0cyBmcm9tIHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gVGhlIGtleSBvZiB0aGUgcGFyYW1ldGVyLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHRoZSBrZXkgd2l0aG91dCB0aGUgYnJhY2tldHMuXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUJyYWNrZXRzKGtleSkge1xuICByZXR1cm4gdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSA/IGtleS5zbGljZSgwLCAtMikgOiBrZXk7XG59XG5cbi8qKlxuICogSXQgdGFrZXMgYSBwYXRoLCBhIGtleSwgYW5kIGEgYm9vbGVhbiwgYW5kIHJldHVybnMgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIFRoZSBwYXRoIHRvIHRoZSBjdXJyZW50IGtleS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBUaGUga2V5IG9mIHRoZSBjdXJyZW50IG9iamVjdCBiZWluZyBpdGVyYXRlZCBvdmVyLlxuICogQHBhcmFtIHtzdHJpbmd9IGRvdHMgLSBJZiB0cnVlLCB0aGUga2V5IHdpbGwgYmUgcmVuZGVyZWQgd2l0aCBkb3RzIGluc3RlYWQgb2YgYnJhY2tldHMuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggdG8gdGhlIGN1cnJlbnQga2V5LlxuICovXG5mdW5jdGlvbiByZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSB7XG4gIGlmICghcGF0aCkgcmV0dXJuIGtleTtcbiAgcmV0dXJuIHBhdGguY29uY2F0KGtleSkubWFwKGZ1bmN0aW9uIGVhY2godG9rZW4sIGkpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICB0b2tlbiA9IHJlbW92ZUJyYWNrZXRzKHRva2VuKTtcbiAgICByZXR1cm4gIWRvdHMgJiYgaSA/ICdbJyArIHRva2VuICsgJ10nIDogdG9rZW47XG4gIH0pLmpvaW4oZG90cyA/ICcuJyA6ICcnKTtcbn1cblxuLyoqXG4gKiBJZiB0aGUgYXJyYXkgaXMgYW4gYXJyYXkgYW5kIG5vbmUgb2YgaXRzIGVsZW1lbnRzIGFyZSB2aXNpdGFibGUsIHRoZW4gaXQncyBhIGZsYXQgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheTxhbnk+fSBhcnIgLSBUaGUgYXJyYXkgdG8gY2hlY2tcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNGbGF0QXJyYXkoYXJyKSB7XG4gIHJldHVybiB1dGlscy5pc0FycmF5KGFycikgJiYgIWFyci5zb21lKGlzVmlzaXRhYmxlKTtcbn1cblxuY29uc3QgcHJlZGljYXRlcyA9IHV0aWxzLnRvRmxhdE9iamVjdCh1dGlscywge30sIG51bGwsIGZ1bmN0aW9uIGZpbHRlcihwcm9wKSB7XG4gIHJldHVybiAvXmlzW0EtWl0vLnRlc3QocHJvcCk7XG59KTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgZGF0YSBvYmplY3QgdG8gRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEBwYXJhbSB7P09iamVjdH0gW29wdGlvbnNdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy52aXNpdG9yXVxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tZXRhVG9rZW5zID0gdHJ1ZV1cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZG90cyA9IGZhbHNlXVxuICogQHBhcmFtIHs/Qm9vbGVhbn0gW29wdGlvbnMuaW5kZXhlcyA9IGZhbHNlXVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbi8qKlxuICogSXQgY29udmVydHMgYW4gb2JqZWN0IGludG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxhbnksIGFueT59IG9iaiAtIFRoZSBvYmplY3QgdG8gY29udmVydCB0byBmb3JtIGRhdGEuXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybURhdGEgLSBUaGUgRm9ybURhdGEgb2JqZWN0IHRvIGFwcGVuZCB0by5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9uc1xuICpcbiAqIEByZXR1cm5zXG4gKi9cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSwgb3B0aW9ucykge1xuICBpZiAoIXV0aWxzLmlzT2JqZWN0KG9iaikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd0YXJnZXQgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBmb3JtRGF0YSA9IGZvcm1EYXRhIHx8IG5ldyAoUGxhdGZvcm1Gb3JtRGF0YSB8fCBGb3JtRGF0YSkoKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgb3B0aW9ucyA9IHV0aWxzLnRvRmxhdE9iamVjdChvcHRpb25zLCB7XG4gICAgbWV0YVRva2VuczogdHJ1ZSxcbiAgICBkb3RzOiBmYWxzZSxcbiAgICBpbmRleGVzOiBmYWxzZVxuICB9LCBmYWxzZSwgZnVuY3Rpb24gZGVmaW5lZChvcHRpb24sIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICAgIHJldHVybiAhdXRpbHMuaXNVbmRlZmluZWQoc291cmNlW29wdGlvbl0pO1xuICB9KTtcblxuICBjb25zdCBtZXRhVG9rZW5zID0gb3B0aW9ucy5tZXRhVG9rZW5zO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgY29uc3QgdmlzaXRvciA9IG9wdGlvbnMudmlzaXRvciB8fCBkZWZhdWx0VmlzaXRvcjtcbiAgY29uc3QgZG90cyA9IG9wdGlvbnMuZG90cztcbiAgY29uc3QgaW5kZXhlcyA9IG9wdGlvbnMuaW5kZXhlcztcbiAgY29uc3QgX0Jsb2IgPSBvcHRpb25zLkJsb2IgfHwgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIEJsb2I7XG4gIGNvbnN0IHVzZUJsb2IgPSBfQmxvYiAmJiB1dGlscy5pc1NwZWNDb21wbGlhbnRGb3JtKGZvcm1EYXRhKTtcblxuICBpZiAoIXV0aWxzLmlzRnVuY3Rpb24odmlzaXRvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2aXNpdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29udmVydFZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsKSByZXR1cm4gJyc7XG5cbiAgICBpZiAodXRpbHMuaXNEYXRlKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgaWYgKCF1c2VCbG9iICYmIHV0aWxzLmlzQmxvYih2YWx1ZSkpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdCbG9iIGlzIG5vdCBzdXBwb3J0ZWQuIFVzZSBhIEJ1ZmZlciBpbnN0ZWFkLicpO1xuICAgIH1cblxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKHZhbHVlKSB8fCB1dGlscy5pc1R5cGVkQXJyYXkodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdXNlQmxvYiAmJiB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyA/IG5ldyBCbG9iKFt2YWx1ZV0pIDogQnVmZmVyLmZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZhdWx0IHZpc2l0b3IuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBrZXlcbiAgICogQHBhcmFtIHtBcnJheTxTdHJpbmd8TnVtYmVyPn0gcGF0aFxuICAgKiBAdGhpcyB7Rm9ybURhdGF9XG4gICAqXG4gICAqIEByZXR1cm5zIHtib29sZWFufSByZXR1cm4gdHJ1ZSB0byB2aXNpdCB0aGUgZWFjaCBwcm9wIG9mIHRoZSB2YWx1ZSByZWN1cnNpdmVseVxuICAgKi9cbiAgZnVuY3Rpb24gZGVmYXVsdFZpc2l0b3IodmFsdWUsIGtleSwgcGF0aCkge1xuICAgIGxldCBhcnIgPSB2YWx1ZTtcblxuICAgIGlmICh2YWx1ZSAmJiAhcGF0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAne30nKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAga2V5ID0gbWV0YVRva2VucyA/IGtleSA6IGtleS5zbGljZSgwLCAtMik7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICB2YWx1ZSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICh1dGlscy5pc0FycmF5KHZhbHVlKSAmJiBpc0ZsYXRBcnJheSh2YWx1ZSkpIHx8XG4gICAgICAgICgodXRpbHMuaXNGaWxlTGlzdCh2YWx1ZSkgfHwgdXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSkgJiYgKGFyciA9IHV0aWxzLnRvQXJyYXkodmFsdWUpKVxuICAgICAgICApKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBrZXkgPSByZW1vdmVCcmFja2V0cyhrZXkpO1xuXG4gICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uIGVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgISh1dGlscy5pc1VuZGVmaW5lZChlbCkgfHwgZWwgPT09IG51bGwpICYmIGZvcm1EYXRhLmFwcGVuZChcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXN0ZWQtdGVybmFyeVxuICAgICAgICAgICAgaW5kZXhlcyA9PT0gdHJ1ZSA/IHJlbmRlcktleShba2V5XSwgaW5kZXgsIGRvdHMpIDogKGluZGV4ZXMgPT09IG51bGwgPyBrZXkgOiBrZXkgKyAnW10nKSxcbiAgICAgICAgICAgIGNvbnZlcnRWYWx1ZShlbClcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc1Zpc2l0YWJsZSh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZvcm1EYXRhLmFwcGVuZChyZW5kZXJLZXkocGF0aCwga2V5LCBkb3RzKSwgY29udmVydFZhbHVlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBzdGFjayA9IFtdO1xuXG4gIGNvbnN0IGV4cG9zZWRIZWxwZXJzID0gT2JqZWN0LmFzc2lnbihwcmVkaWNhdGVzLCB7XG4gICAgZGVmYXVsdFZpc2l0b3IsXG4gICAgY29udmVydFZhbHVlLFxuICAgIGlzVmlzaXRhYmxlXG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGJ1aWxkKHZhbHVlLCBwYXRoKSB7XG4gICAgaWYgKHV0aWxzLmlzVW5kZWZpbmVkKHZhbHVlKSkgcmV0dXJuO1xuXG4gICAgaWYgKHN0YWNrLmluZGV4T2YodmFsdWUpICE9PSAtMSkge1xuICAgICAgdGhyb3cgRXJyb3IoJ0NpcmN1bGFyIHJlZmVyZW5jZSBkZXRlY3RlZCBpbiAnICsgcGF0aC5qb2luKCcuJykpO1xuICAgIH1cblxuICAgIHN0YWNrLnB1c2godmFsdWUpO1xuXG4gICAgdXRpbHMuZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gZWFjaChlbCwga2V5KSB7XG4gICAgICBjb25zdCByZXN1bHQgPSAhKHV0aWxzLmlzVW5kZWZpbmVkKGVsKSB8fCBlbCA9PT0gbnVsbCkgJiYgdmlzaXRvci5jYWxsKFxuICAgICAgICBmb3JtRGF0YSwgZWwsIHV0aWxzLmlzU3RyaW5nKGtleSkgPyBrZXkudHJpbSgpIDoga2V5LCBwYXRoLCBleHBvc2VkSGVscGVyc1xuICAgICAgKTtcblxuICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBidWlsZChlbCwgcGF0aCA/IHBhdGguY29uY2F0KGtleSkgOiBba2V5XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzdGFjay5wb3AoKTtcbiAgfVxuXG4gIGlmICghdXRpbHMuaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBvYmplY3QnKTtcbiAgfVxuXG4gIGJ1aWxkKG9iaik7XG5cbiAgcmV0dXJuIGZvcm1EYXRhO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b0Zvcm1EYXRhO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRvRm9ybURhdGEgZnJvbSAnLi90b0Zvcm1EYXRhLmpzJztcblxuLyoqXG4gKiBJdCBlbmNvZGVzIGEgc3RyaW5nIGJ5IHJlcGxhY2luZyBhbGwgY2hhcmFjdGVycyB0aGF0IGFyZSBub3QgaW4gdGhlIHVucmVzZXJ2ZWQgc2V0IHdpdGhcbiAqIHRoZWlyIHBlcmNlbnQtZW5jb2RlZCBlcXVpdmFsZW50c1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBUaGUgc3RyaW5nIHRvIGVuY29kZS5cbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZW5jb2RlZCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgY29uc3QgY2hhck1hcCA9IHtcbiAgICAnISc6ICclMjEnLFxuICAgIFwiJ1wiOiAnJTI3JyxcbiAgICAnKCc6ICclMjgnLFxuICAgICcpJzogJyUyOScsXG4gICAgJ34nOiAnJTdFJyxcbiAgICAnJTIwJzogJysnLFxuICAgICclMDAnOiAnXFx4MDAnXG4gIH07XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC9bIScoKX5dfCUyMHwlMDAvZywgZnVuY3Rpb24gcmVwbGFjZXIobWF0Y2gpIHtcbiAgICByZXR1cm4gY2hhck1hcFttYXRjaF07XG4gIH0pO1xufVxuXG4vKipcbiAqIEl0IHRha2VzIGEgcGFyYW1zIG9iamVjdCBhbmQgY29udmVydHMgaXQgdG8gYSBGb3JtRGF0YSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsIGFueT59IHBhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIHRvIGJlIGNvbnZlcnRlZCB0byBhIEZvcm1EYXRhIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0PHN0cmluZywgYW55Pn0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBwYXNzZWQgdG8gdGhlIEF4aW9zIGNvbnN0cnVjdG9yLlxuICpcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiBBeGlvc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMsIG9wdGlvbnMpIHtcbiAgdGhpcy5fcGFpcnMgPSBbXTtcblxuICBwYXJhbXMgJiYgdG9Gb3JtRGF0YShwYXJhbXMsIHRoaXMsIG9wdGlvbnMpO1xufVxuXG5jb25zdCBwcm90b3R5cGUgPSBBeGlvc1VSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGU7XG5cbnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbiBhcHBlbmQobmFtZSwgdmFsdWUpIHtcbiAgdGhpcy5fcGFpcnMucHVzaChbbmFtZSwgdmFsdWVdKTtcbn07XG5cbnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKGVuY29kZXIpIHtcbiAgY29uc3QgX2VuY29kZSA9IGVuY29kZXIgPyBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBlbmNvZGVyLmNhbGwodGhpcywgdmFsdWUsIGVuY29kZSk7XG4gIH0gOiBlbmNvZGU7XG5cbiAgcmV0dXJuIHRoaXMuX3BhaXJzLm1hcChmdW5jdGlvbiBlYWNoKHBhaXIpIHtcbiAgICByZXR1cm4gX2VuY29kZShwYWlyWzBdKSArICc9JyArIF9lbmNvZGUocGFpclsxXSk7XG4gIH0sICcnKS5qb2luKCcmJyk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NVUkxTZWFyY2hQYXJhbXMgZnJvbSAnLi4vaGVscGVycy9BeGlvc1VSTFNlYXJjaFBhcmFtcy5qcyc7XG5cbi8qKlxuICogSXQgcmVwbGFjZXMgYWxsIGluc3RhbmNlcyBvZiB0aGUgY2hhcmFjdGVycyBgOmAsIGAkYCwgYCxgLCBgK2AsIGBbYCwgYW5kIGBdYCB3aXRoIHRoZWlyXG4gKiBVUkkgZW5jb2RlZCBjb3VudGVycGFydHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsIFRoZSB2YWx1ZSB0byBiZSBlbmNvZGVkLlxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBlbmNvZGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHBhcmFtIHs/b2JqZWN0fSBvcHRpb25zXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIG9wdGlvbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBcbiAgY29uc3QgX2VuY29kZSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5lbmNvZGUgfHwgZW5jb2RlO1xuXG4gIGNvbnN0IHNlcmlhbGl6ZUZuID0gb3B0aW9ucyAmJiBvcHRpb25zLnNlcmlhbGl6ZTtcblxuICBsZXQgc2VyaWFsaXplZFBhcmFtcztcblxuICBpZiAoc2VyaWFsaXplRm4pIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gc2VyaWFsaXplRm4ocGFyYW1zLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gdXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSA/XG4gICAgICBwYXJhbXMudG9TdHJpbmcoKSA6XG4gICAgICBuZXcgQXhpb3NVUkxTZWFyY2hQYXJhbXMocGFyYW1zLCBvcHRpb25zKS50b1N0cmluZyhfZW5jb2RlKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgY29uc3QgaGFzaG1hcmtJbmRleCA9IHVybC5pbmRleE9mKFwiI1wiKTtcblxuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuXG5jbGFzcyBJbnRlcmNlcHRvck1hbmFnZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhhbmRsZXJzID0gW107XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gICAqXG4gICAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAgICovXG4gIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICAgIGZ1bGZpbGxlZCxcbiAgICAgIHJlamVjdGVkLFxuICAgICAgc3luY2hyb25vdXM6IG9wdGlvbnMgPyBvcHRpb25zLnN5bmNocm9ub3VzIDogZmFsc2UsXG4gICAgICBydW5XaGVuOiBvcHRpb25zID8gb3B0aW9ucy5ydW5XaGVuIDogbnVsbFxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaW50ZXJjZXB0b3Igd2FzIHJlbW92ZWQsIGBmYWxzZWAgb3RoZXJ3aXNlXG4gICAqL1xuICBlamVjdChpZCkge1xuICAgIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaW50ZXJjZXB0b3JzIGZyb20gdGhlIHN0YWNrXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgY2xlYXIoKSB7XG4gICAgaWYgKHRoaXMuaGFuZGxlcnMpIHtcbiAgICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAgICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gICAqXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgZm9yRWFjaChmbikge1xuICAgIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgICAgZm4oaCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzaWxlbnRKU09OUGFyc2luZzogdHJ1ZSxcbiAgZm9yY2VkSlNPTlBhcnNpbmc6IHRydWUsXG4gIGNsYXJpZnlUaW1lb3V0RXJyb3I6IGZhbHNlXG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zVVJMU2VhcmNoUGFyYW1zIGZyb20gJy4uLy4uLy4uL2hlbHBlcnMvQXhpb3NVUkxTZWFyY2hQYXJhbXMuanMnO1xuZXhwb3J0IGRlZmF1bHQgdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgPyBVUkxTZWFyY2hQYXJhbXMgOiBBeGlvc1VSTFNlYXJjaFBhcmFtcztcbiIsICIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgPyBGb3JtRGF0YSA6IG51bGw7XG4iLCAiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydCBkZWZhdWx0IHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyA/IEJsb2IgOiBudWxsXG4iLCAiaW1wb3J0IFVSTFNlYXJjaFBhcmFtcyBmcm9tICcuL2NsYXNzZXMvVVJMU2VhcmNoUGFyYW1zLmpzJ1xuaW1wb3J0IEZvcm1EYXRhIGZyb20gJy4vY2xhc3Nlcy9Gb3JtRGF0YS5qcydcbmltcG9ydCBCbG9iIGZyb20gJy4vY2xhc3Nlcy9CbG9iLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzQnJvd3NlcjogdHJ1ZSxcbiAgY2xhc3Nlczoge1xuICAgIFVSTFNlYXJjaFBhcmFtcyxcbiAgICBGb3JtRGF0YSxcbiAgICBCbG9iXG4gIH0sXG4gIHByb3RvY29sczogWydodHRwJywgJ2h0dHBzJywgJ2ZpbGUnLCAnYmxvYicsICd1cmwnLCAnZGF0YSddXG59O1xuIiwgImNvbnN0IGhhc0Jyb3dzZXJFbnYgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqIG5hdGl2ZXNjcmlwdFxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdOYXRpdmVTY3JpcHQnIG9yICdOUydcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaGFzU3RhbmRhcmRCcm93c2VyRW52ID0gKFxuICAocHJvZHVjdCkgPT4ge1xuICAgIHJldHVybiBoYXNCcm93c2VyRW52ICYmIFsnUmVhY3ROYXRpdmUnLCAnTmF0aXZlU2NyaXB0JywgJ05TJ10uaW5kZXhPZihwcm9kdWN0KSA8IDBcbiAgfSkodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciB3ZWJXb3JrZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBBbHRob3VnaCB0aGUgYGlzU3RhbmRhcmRCcm93c2VyRW52YCBtZXRob2QgaW5kaWNhdGVzIHRoYXRcbiAqIGBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlcmAsIHRoZSBXZWJXb3JrZXIgd2lsbCBzdGlsbCBiZVxuICogZmlsdGVyZWQgb3V0IGR1ZSB0byBpdHMganVkZ21lbnQgc3RhbmRhcmRcbiAqIGB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnYC5cbiAqIFRoaXMgbGVhZHMgdG8gYSBwcm9ibGVtIHdoZW4gYXhpb3MgcG9zdCBgRm9ybURhdGFgIGluIHdlYldvcmtlclxuICovXG5jb25zdCBoYXNTdGFuZGFyZEJyb3dzZXJXZWJXb3JrZXJFbnYgPSAoKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgICBzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUgJiZcbiAgICB0eXBlb2Ygc2VsZi5pbXBvcnRTY3JpcHRzID09PSAnZnVuY3Rpb24nXG4gICk7XG59KSgpO1xuXG5jb25zdCBvcmlnaW4gPSBoYXNCcm93c2VyRW52ICYmIHdpbmRvdy5sb2NhdGlvbi5ocmVmIHx8ICdodHRwOi8vbG9jYWxob3N0JztcblxuZXhwb3J0IHtcbiAgaGFzQnJvd3NlckVudixcbiAgaGFzU3RhbmRhcmRCcm93c2VyV2ViV29ya2VyRW52LFxuICBoYXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIG9yaWdpblxufVxuIiwgImltcG9ydCBwbGF0Zm9ybSBmcm9tICcuL25vZGUvaW5kZXguanMnO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAnLi9jb21tb24vdXRpbHMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC4uLnV0aWxzLFxuICAuLi5wbGF0Zm9ybVxufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIHRvRm9ybURhdGEoZGF0YSwgbmV3IHBsYXRmb3JtLmNsYXNzZXMuVVJMU2VhcmNoUGFyYW1zKCksIE9iamVjdC5hc3NpZ24oe1xuICAgIHZpc2l0b3I6IGZ1bmN0aW9uKHZhbHVlLCBrZXksIHBhdGgsIGhlbHBlcnMpIHtcbiAgICAgIGlmIChwbGF0Zm9ybS5pc05vZGUgJiYgdXRpbHMuaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGtleSwgdmFsdWUudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaGVscGVycy5kZWZhdWx0VmlzaXRvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfSwgb3B0aW9ucykpO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZyBsaWtlIGBmb29beF1beV1bel1gIGFuZCByZXR1cm5zIGFuIGFycmF5IGxpa2UgYFsnZm9vJywgJ3gnLCAneScsICd6J11cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKlxuICogQHJldHVybnMgQW4gYXJyYXkgb2Ygc3RyaW5ncy5cbiAqL1xuZnVuY3Rpb24gcGFyc2VQcm9wUGF0aChuYW1lKSB7XG4gIC8vIGZvb1t4XVt5XVt6XVxuICAvLyBmb28ueC55LnpcbiAgLy8gZm9vLXgteS16XG4gIC8vIGZvbyB4IHkgelxuICByZXR1cm4gdXRpbHMubWF0Y2hBbGwoL1xcdyt8XFxbKFxcdyopXS9nLCBuYW1lKS5tYXAobWF0Y2ggPT4ge1xuICAgIHJldHVybiBtYXRjaFswXSA9PT0gJ1tdJyA/ICcnIDogbWF0Y2hbMV0gfHwgbWF0Y2hbMF07XG4gIH0pO1xufVxuXG4vKipcbiAqIENvbnZlcnQgYW4gYXJyYXkgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gYXJyIC0gVGhlIGFycmF5IHRvIGNvbnZlcnQgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEByZXR1cm5zIEFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMgYW5kIHZhbHVlcyBhcyB0aGUgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5VG9PYmplY3QoYXJyKSB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoYXJyKTtcbiAgbGV0IGk7XG4gIGNvbnN0IGxlbiA9IGtleXMubGVuZ3RoO1xuICBsZXQga2V5O1xuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIG9ialtrZXldID0gYXJyW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBJdCB0YWtlcyBhIEZvcm1EYXRhIG9iamVjdCBhbmQgcmV0dXJucyBhIEphdmFTY3JpcHQgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZvcm1EYXRhIFRoZSBGb3JtRGF0YSBvYmplY3QgdG8gY29udmVydCB0byBKU09OLlxuICpcbiAqIEByZXR1cm5zIHtPYmplY3Q8c3RyaW5nLCBhbnk+IHwgbnVsbH0gVGhlIGNvbnZlcnRlZCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGZvcm1EYXRhVG9KU09OKGZvcm1EYXRhKSB7XG4gIGZ1bmN0aW9uIGJ1aWxkUGF0aChwYXRoLCB2YWx1ZSwgdGFyZ2V0LCBpbmRleCkge1xuICAgIGxldCBuYW1lID0gcGF0aFtpbmRleCsrXTtcblxuICAgIGlmIChuYW1lID09PSAnX19wcm90b19fJykgcmV0dXJuIHRydWU7XG5cbiAgICBjb25zdCBpc051bWVyaWNLZXkgPSBOdW1iZXIuaXNGaW5pdGUoK25hbWUpO1xuICAgIGNvbnN0IGlzTGFzdCA9IGluZGV4ID49IHBhdGgubGVuZ3RoO1xuICAgIG5hbWUgPSAhbmFtZSAmJiB1dGlscy5pc0FycmF5KHRhcmdldCkgPyB0YXJnZXQubGVuZ3RoIDogbmFtZTtcblxuICAgIGlmIChpc0xhc3QpIHtcbiAgICAgIGlmICh1dGlscy5oYXNPd25Qcm9wKHRhcmdldCwgbmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gW3RhcmdldFtuYW1lXSwgdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAhaXNOdW1lcmljS2V5O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0W25hbWVdIHx8ICF1dGlscy5pc09iamVjdCh0YXJnZXRbbmFtZV0pKSB7XG4gICAgICB0YXJnZXRbbmFtZV0gPSBbXTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBidWlsZFBhdGgocGF0aCwgdmFsdWUsIHRhcmdldFtuYW1lXSwgaW5kZXgpO1xuXG4gICAgaWYgKHJlc3VsdCAmJiB1dGlscy5pc0FycmF5KHRhcmdldFtuYW1lXSkpIHtcbiAgICAgIHRhcmdldFtuYW1lXSA9IGFycmF5VG9PYmplY3QodGFyZ2V0W25hbWVdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gIWlzTnVtZXJpY0tleTtcbiAgfVxuXG4gIGlmICh1dGlscy5pc0Zvcm1EYXRhKGZvcm1EYXRhKSAmJiB1dGlscy5pc0Z1bmN0aW9uKGZvcm1EYXRhLmVudHJpZXMpKSB7XG4gICAgY29uc3Qgb2JqID0ge307XG5cbiAgICB1dGlscy5mb3JFYWNoRW50cnkoZm9ybURhdGEsIChuYW1lLCB2YWx1ZSkgPT4ge1xuICAgICAgYnVpbGRQYXRoKHBhcnNlUHJvcFBhdGgobmFtZSksIHZhbHVlLCBvYmosIDApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9iajtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JtRGF0YVRvSlNPTjtcbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tICcuLi9jb3JlL0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IHRyYW5zaXRpb25hbERlZmF1bHRzIGZyb20gJy4vdHJhbnNpdGlvbmFsLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4uL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyc7XG5pbXBvcnQgdG9VUkxFbmNvZGVkRm9ybSBmcm9tICcuLi9oZWxwZXJzL3RvVVJMRW5jb2RlZEZvcm0uanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcbmltcG9ydCBmb3JtRGF0YVRvSlNPTiBmcm9tICcuLi9oZWxwZXJzL2Zvcm1EYXRhVG9KU09OLmpzJztcblxuLyoqXG4gKiBJdCB0YWtlcyBhIHN0cmluZywgdHJpZXMgdG8gcGFyc2UgaXQsIGFuZCBpZiBpdCBmYWlscywgaXQgcmV0dXJucyB0aGUgc3RyaW5naWZpZWQgdmVyc2lvblxuICogb2YgdGhlIGlucHV0XG4gKlxuICogQHBhcmFtIHthbnl9IHJhd1ZhbHVlIC0gVGhlIHZhbHVlIHRvIGJlIHN0cmluZ2lmaWVkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyc2VyIC0gQSBmdW5jdGlvbiB0aGF0IHBhcnNlcyBhIHN0cmluZyBpbnRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmNvZGVyIC0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGEgdmFsdWUgYW5kIHJldHVybnMgYSBzdHJpbmcuXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gQSBzdHJpbmdpZmllZCB2ZXJzaW9uIG9mIHRoZSByYXdWYWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5naWZ5U2FmZWx5KHJhd1ZhbHVlLCBwYXJzZXIsIGVuY29kZXIpIHtcbiAgaWYgKHV0aWxzLmlzU3RyaW5nKHJhd1ZhbHVlKSkge1xuICAgIHRyeSB7XG4gICAgICAocGFyc2VyIHx8IEpTT04ucGFyc2UpKHJhd1ZhbHVlKTtcbiAgICAgIHJldHVybiB1dGlscy50cmltKHJhd1ZhbHVlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZS5uYW1lICE9PSAnU3ludGF4RXJyb3InKSB7XG4gICAgICAgIHRocm93IGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIChlbmNvZGVyIHx8IEpTT04uc3RyaW5naWZ5KShyYXdWYWx1ZSk7XG59XG5cbmNvbnN0IGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogWyd4aHInLCAnaHR0cCcsICdmZXRjaCddLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IGhlYWRlcnMuZ2V0Q29udGVudFR5cGUoKSB8fCAnJztcbiAgICBjb25zdCBoYXNKU09OQ29udGVudFR5cGUgPSBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgPiAtMTtcbiAgICBjb25zdCBpc09iamVjdFBheWxvYWQgPSB1dGlscy5pc09iamVjdChkYXRhKTtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQgJiYgdXRpbHMuaXNIVE1MRm9ybShkYXRhKSkge1xuICAgICAgZGF0YSA9IG5ldyBGb3JtRGF0YShkYXRhKTtcbiAgICB9XG5cbiAgICBjb25zdCBpc0Zvcm1EYXRhID0gdXRpbHMuaXNGb3JtRGF0YShkYXRhKTtcblxuICAgIGlmIChpc0Zvcm1EYXRhKSB7XG4gICAgICByZXR1cm4gaGFzSlNPTkNvbnRlbnRUeXBlID8gSlNPTi5zdHJpbmdpZnkoZm9ybURhdGFUb0pTT04oZGF0YSkpIDogZGF0YTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04JywgZmFsc2UpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBsZXQgaXNGaWxlTGlzdDtcblxuICAgIGlmIChpc09iamVjdFBheWxvYWQpIHtcbiAgICAgIGlmIChjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKSA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0b1VSTEVuY29kZWRGb3JtKGRhdGEsIHRoaXMuZm9ybVNlcmlhbGl6ZXIpLnRvU3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8IGNvbnRlbnRUeXBlLmluZGV4T2YoJ211bHRpcGFydC9mb3JtLWRhdGEnKSA+IC0xKSB7XG4gICAgICAgIGNvbnN0IF9Gb3JtRGF0YSA9IHRoaXMuZW52ICYmIHRoaXMuZW52LkZvcm1EYXRhO1xuXG4gICAgICAgIHJldHVybiB0b0Zvcm1EYXRhKFxuICAgICAgICAgIGlzRmlsZUxpc3QgPyB7J2ZpbGVzW10nOiBkYXRhfSA6IGRhdGEsXG4gICAgICAgICAgX0Zvcm1EYXRhICYmIG5ldyBfRm9ybURhdGEoKSxcbiAgICAgICAgICB0aGlzLmZvcm1TZXJpYWxpemVyXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGlzT2JqZWN0UGF5bG9hZCB8fCBoYXNKU09OQ29udGVudFR5cGUgKSB7XG4gICAgICBoZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi9qc29uJywgZmFsc2UpO1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgY29uc3QgdHJhbnNpdGlvbmFsID0gdGhpcy50cmFuc2l0aW9uYWwgfHwgZGVmYXVsdHMudHJhbnNpdGlvbmFsO1xuICAgIGNvbnN0IGZvcmNlZEpTT05QYXJzaW5nID0gdHJhbnNpdGlvbmFsICYmIHRyYW5zaXRpb25hbC5mb3JjZWRKU09OUGFyc2luZztcbiAgICBjb25zdCBKU09OUmVxdWVzdGVkID0gdGhpcy5yZXNwb25zZVR5cGUgPT09ICdqc29uJztcblxuICAgIGlmICh1dGlscy5pc1Jlc3BvbnNlKGRhdGEpIHx8IHV0aWxzLmlzUmVhZGFibGVTdHJlYW0oZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGlmIChkYXRhICYmIHV0aWxzLmlzU3RyaW5nKGRhdGEpICYmICgoZm9yY2VkSlNPTlBhcnNpbmcgJiYgIXRoaXMucmVzcG9uc2VUeXBlKSB8fCBKU09OUmVxdWVzdGVkKSkge1xuICAgICAgY29uc3Qgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgICAgY29uc3Qgc3RyaWN0SlNPTlBhcnNpbmcgPSAhc2lsZW50SlNPTlBhcnNpbmcgJiYgSlNPTlJlcXVlc3RlZDtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChzdHJpY3RKU09OUGFyc2luZykge1xuICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICBlbnY6IHtcbiAgICBGb3JtRGF0YTogcGxhdGZvcm0uY2xhc3Nlcy5Gb3JtRGF0YSxcbiAgICBCbG9iOiBwbGF0Zm9ybS5jbGFzc2VzLkJsb2JcbiAgfSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9LFxuXG4gIGhlYWRlcnM6IHtcbiAgICBjb21tb246IHtcbiAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJyxcbiAgICAgICdDb250ZW50LVR5cGUnOiB1bmRlZmluZWRcbiAgICB9XG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgKG1ldGhvZCkgPT4ge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0cztcbiIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB1dGlscyBmcm9tICcuLy4uL3V0aWxzLmpzJztcblxuLy8gUmF3QXhpb3NIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xuY29uc3QgaWdub3JlRHVwbGljYXRlT2YgPSB1dGlscy50b09iamVjdFNldChbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXSk7XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByYXdIZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCByYXdIZWFkZXJzID0+IHtcbiAgY29uc3QgcGFyc2VkID0ge307XG4gIGxldCBrZXk7XG4gIGxldCB2YWw7XG4gIGxldCBpO1xuXG4gIHJhd0hlYWRlcnMgJiYgcmF3SGVhZGVycy5zcGxpdCgnXFxuJykuZm9yRWFjaChmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSBsaW5lLnN1YnN0cmluZygwLCBpKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSBsaW5lLnN1YnN0cmluZyhpICsgMSkudHJpbSgpO1xuXG4gICAgaWYgKCFrZXkgfHwgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mW2tleV0pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0pIHtcbiAgICAgICAgcGFyc2VkW2tleV0ucHVzaCh2YWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBbdmFsXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4uL3V0aWxzLmpzJztcbmltcG9ydCBwYXJzZUhlYWRlcnMgZnJvbSAnLi4vaGVscGVycy9wYXJzZUhlYWRlcnMuanMnO1xuXG5jb25zdCAkaW50ZXJuYWxzID0gU3ltYm9sKCdpbnRlcm5hbHMnKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyICYmIFN0cmluZyhoZWFkZXIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT09IGZhbHNlIHx8IHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gdXRpbHMuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5tYXAobm9ybWFsaXplVmFsdWUpIDogU3RyaW5nKHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbnMoc3RyKSB7XG4gIGNvbnN0IHRva2VucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGNvbnN0IHRva2Vuc1JFID0gLyhbXlxccyw7PV0rKVxccyooPzo9XFxzKihbXiw7XSspKT8vZztcbiAgbGV0IG1hdGNoO1xuXG4gIHdoaWxlICgobWF0Y2ggPSB0b2tlbnNSRS5leGVjKHN0cikpKSB7XG4gICAgdG9rZW5zW21hdGNoWzFdXSA9IG1hdGNoWzJdO1xuICB9XG5cbiAgcmV0dXJuIHRva2Vucztcbn1cblxuY29uc3QgaXNWYWxpZEhlYWRlck5hbWUgPSAoc3RyKSA9PiAvXlstX2EtekEtWjAtOV5gfH4sISMkJSYnKisuXSskLy50ZXN0KHN0ci50cmltKCkpO1xuXG5mdW5jdGlvbiBtYXRjaEhlYWRlclZhbHVlKGNvbnRleHQsIHZhbHVlLCBoZWFkZXIsIGZpbHRlciwgaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gIGlmICh1dGlscy5pc0Z1bmN0aW9uKGZpbHRlcikpIHtcbiAgICByZXR1cm4gZmlsdGVyLmNhbGwodGhpcywgdmFsdWUsIGhlYWRlcik7XG4gIH1cblxuICBpZiAoaXNIZWFkZXJOYW1lRmlsdGVyKSB7XG4gICAgdmFsdWUgPSBoZWFkZXI7XG4gIH1cblxuICBpZiAoIXV0aWxzLmlzU3RyaW5nKHZhbHVlKSkgcmV0dXJuO1xuXG4gIGlmICh1dGlscy5pc1N0cmluZyhmaWx0ZXIpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmluZGV4T2YoZmlsdGVyKSAhPT0gLTE7XG4gIH1cblxuICBpZiAodXRpbHMuaXNSZWdFeHAoZmlsdGVyKSkge1xuICAgIHJldHVybiBmaWx0ZXIudGVzdCh2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9ybWF0SGVhZGVyKGhlYWRlcikge1xuICByZXR1cm4gaGVhZGVyLnRyaW0oKVxuICAgIC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyhbYS16XFxkXSkoXFx3KikvZywgKHcsIGNoYXIsIHN0cikgPT4ge1xuICAgICAgcmV0dXJuIGNoYXIudG9VcHBlckNhc2UoKSArIHN0cjtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYnVpbGRBY2Nlc3NvcnMob2JqLCBoZWFkZXIpIHtcbiAgY29uc3QgYWNjZXNzb3JOYW1lID0gdXRpbHMudG9DYW1lbENhc2UoJyAnICsgaGVhZGVyKTtcblxuICBbJ2dldCcsICdzZXQnLCAnaGFzJ10uZm9yRWFjaChtZXRob2ROYW1lID0+IHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBtZXRob2ROYW1lICsgYWNjZXNzb3JOYW1lLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oYXJnMSwgYXJnMiwgYXJnMykge1xuICAgICAgICByZXR1cm4gdGhpc1ttZXRob2ROYW1lXS5jYWxsKHRoaXMsIGhlYWRlciwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gICAgICB9LFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0pO1xufVxuXG5jbGFzcyBBeGlvc0hlYWRlcnMge1xuICBjb25zdHJ1Y3RvcihoZWFkZXJzKSB7XG4gICAgaGVhZGVycyAmJiB0aGlzLnNldChoZWFkZXJzKTtcbiAgfVxuXG4gIHNldChoZWFkZXIsIHZhbHVlT3JSZXdyaXRlLCByZXdyaXRlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBzZXRIZWFkZXIoX3ZhbHVlLCBfaGVhZGVyLCBfcmV3cml0ZSkge1xuICAgICAgY29uc3QgbEhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihfaGVhZGVyKTtcblxuICAgICAgaWYgKCFsSGVhZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaGVhZGVyIG5hbWUgbXVzdCBiZSBhIG5vbi1lbXB0eSBzdHJpbmcnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleShzZWxmLCBsSGVhZGVyKTtcblxuICAgICAgaWYoIWtleSB8fCBzZWxmW2tleV0gPT09IHVuZGVmaW5lZCB8fCBfcmV3cml0ZSA9PT0gdHJ1ZSB8fCAoX3Jld3JpdGUgPT09IHVuZGVmaW5lZCAmJiBzZWxmW2tleV0gIT09IGZhbHNlKSkge1xuICAgICAgICBzZWxmW2tleSB8fCBfaGVhZGVyXSA9IG5vcm1hbGl6ZVZhbHVlKF92YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0SGVhZGVycyA9IChoZWFkZXJzLCBfcmV3cml0ZSkgPT5cbiAgICAgIHV0aWxzLmZvckVhY2goaGVhZGVycywgKF92YWx1ZSwgX2hlYWRlcikgPT4gc2V0SGVhZGVyKF92YWx1ZSwgX2hlYWRlciwgX3Jld3JpdGUpKTtcblxuICAgIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KGhlYWRlcikgfHwgaGVhZGVyIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3Rvcikge1xuICAgICAgc2V0SGVhZGVycyhoZWFkZXIsIHZhbHVlT3JSZXdyaXRlKVxuICAgIH0gZWxzZSBpZih1dGlscy5pc1N0cmluZyhoZWFkZXIpICYmIChoZWFkZXIgPSBoZWFkZXIudHJpbSgpKSAmJiAhaXNWYWxpZEhlYWRlck5hbWUoaGVhZGVyKSkge1xuICAgICAgc2V0SGVhZGVycyhwYXJzZUhlYWRlcnMoaGVhZGVyKSwgdmFsdWVPclJld3JpdGUpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNIZWFkZXJzKGhlYWRlcikpIHtcbiAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGhlYWRlci5lbnRyaWVzKCkpIHtcbiAgICAgICAgc2V0SGVhZGVyKHZhbHVlLCBrZXksIHJld3JpdGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBoZWFkZXIgIT0gbnVsbCAmJiBzZXRIZWFkZXIodmFsdWVPclJld3JpdGUsIGhlYWRlciwgcmV3cml0ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBnZXQoaGVhZGVyLCBwYXJzZXIpIHtcbiAgICBoZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoaGVhZGVyKTtcblxuICAgIGlmIChoZWFkZXIpIHtcbiAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkodGhpcywgaGVhZGVyKTtcblxuICAgICAgaWYgKGtleSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXNba2V5XTtcblxuICAgICAgICBpZiAoIXBhcnNlcikge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJzZXIgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gcGFyc2VUb2tlbnModmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzRnVuY3Rpb24ocGFyc2VyKSkge1xuICAgICAgICAgIHJldHVybiBwYXJzZXIuY2FsbCh0aGlzLCB2YWx1ZSwga2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1JlZ0V4cChwYXJzZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIHBhcnNlci5leGVjKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3BhcnNlciBtdXN0IGJlIGJvb2xlYW58cmVnZXhwfGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFzKGhlYWRlciwgbWF0Y2hlcikge1xuICAgIGhlYWRlciA9IG5vcm1hbGl6ZUhlYWRlcihoZWFkZXIpO1xuXG4gICAgaWYgKGhlYWRlcikge1xuICAgICAgY29uc3Qga2V5ID0gdXRpbHMuZmluZEtleSh0aGlzLCBoZWFkZXIpO1xuXG4gICAgICByZXR1cm4gISEoa2V5ICYmIHRoaXNba2V5XSAhPT0gdW5kZWZpbmVkICYmICghbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyKSkpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlbGV0ZShoZWFkZXIsIG1hdGNoZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBsZXQgZGVsZXRlZCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlSGVhZGVyKF9oZWFkZXIpIHtcbiAgICAgIF9oZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmIChfaGVhZGVyKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IHV0aWxzLmZpbmRLZXkoc2VsZiwgX2hlYWRlcik7XG5cbiAgICAgICAgaWYgKGtleSAmJiAoIW1hdGNoZXIgfHwgbWF0Y2hIZWFkZXJWYWx1ZShzZWxmLCBzZWxmW2tleV0sIGtleSwgbWF0Y2hlcikpKSB7XG4gICAgICAgICAgZGVsZXRlIHNlbGZba2V5XTtcblxuICAgICAgICAgIGRlbGV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzQXJyYXkoaGVhZGVyKSkge1xuICAgICAgaGVhZGVyLmZvckVhY2goZGVsZXRlSGVhZGVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlSGVhZGVyKGhlYWRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbGV0ZWQ7XG4gIH1cblxuICBjbGVhcihtYXRjaGVyKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuICAgIGxldCBpID0ga2V5cy5sZW5ndGg7XG4gICAgbGV0IGRlbGV0ZWQgPSBmYWxzZTtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICBpZighbWF0Y2hlciB8fCBtYXRjaEhlYWRlclZhbHVlKHRoaXMsIHRoaXNba2V5XSwga2V5LCBtYXRjaGVyLCB0cnVlKSkge1xuICAgICAgICBkZWxldGUgdGhpc1trZXldO1xuICAgICAgICBkZWxldGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVsZXRlZDtcbiAgfVxuXG4gIG5vcm1hbGl6ZShmb3JtYXQpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBjb25zdCBoZWFkZXJzID0ge307XG5cbiAgICB1dGlscy5mb3JFYWNoKHRoaXMsICh2YWx1ZSwgaGVhZGVyKSA9PiB7XG4gICAgICBjb25zdCBrZXkgPSB1dGlscy5maW5kS2V5KGhlYWRlcnMsIGhlYWRlcik7XG5cbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgc2VsZltrZXldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBmb3JtYXQgPyBmb3JtYXRIZWFkZXIoaGVhZGVyKSA6IFN0cmluZyhoZWFkZXIpLnRyaW0oKTtcblxuICAgICAgaWYgKG5vcm1hbGl6ZWQgIT09IGhlYWRlcikge1xuICAgICAgICBkZWxldGUgc2VsZltoZWFkZXJdO1xuICAgICAgfVxuXG4gICAgICBzZWxmW25vcm1hbGl6ZWRdID0gbm9ybWFsaXplVmFsdWUodmFsdWUpO1xuXG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWRdID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgY29uY2F0KC4uLnRhcmdldHMpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jb25jYXQodGhpcywgLi4udGFyZ2V0cyk7XG4gIH1cblxuICB0b0pTT04oYXNTdHJpbmdzKSB7XG4gICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIHV0aWxzLmZvckVhY2godGhpcywgKHZhbHVlLCBoZWFkZXIpID0+IHtcbiAgICAgIHZhbHVlICE9IG51bGwgJiYgdmFsdWUgIT09IGZhbHNlICYmIChvYmpbaGVhZGVyXSA9IGFzU3RyaW5ncyAmJiB1dGlscy5pc0FycmF5KHZhbHVlKSA/IHZhbHVlLmpvaW4oJywgJykgOiB2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKSB7XG4gICAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHRoaXMudG9KU09OKCkpW1N5bWJvbC5pdGVyYXRvcl0oKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyh0aGlzLnRvSlNPTigpKS5tYXAoKFtoZWFkZXIsIHZhbHVlXSkgPT4gaGVhZGVyICsgJzogJyArIHZhbHVlKS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpIHtcbiAgICByZXR1cm4gJ0F4aW9zSGVhZGVycyc7XG4gIH1cblxuICBzdGF0aWMgZnJvbSh0aGluZykge1xuICAgIHJldHVybiB0aGluZyBpbnN0YW5jZW9mIHRoaXMgPyB0aGluZyA6IG5ldyB0aGlzKHRoaW5nKTtcbiAgfVxuXG4gIHN0YXRpYyBjb25jYXQoZmlyc3QsIC4uLnRhcmdldHMpIHtcbiAgICBjb25zdCBjb21wdXRlZCA9IG5ldyB0aGlzKGZpcnN0KTtcblxuICAgIHRhcmdldHMuZm9yRWFjaCgodGFyZ2V0KSA9PiBjb21wdXRlZC5zZXQodGFyZ2V0KSk7XG5cbiAgICByZXR1cm4gY29tcHV0ZWQ7XG4gIH1cblxuICBzdGF0aWMgYWNjZXNzb3IoaGVhZGVyKSB7XG4gICAgY29uc3QgaW50ZXJuYWxzID0gdGhpc1skaW50ZXJuYWxzXSA9ICh0aGlzWyRpbnRlcm5hbHNdID0ge1xuICAgICAgYWNjZXNzb3JzOiB7fVxuICAgIH0pO1xuXG4gICAgY29uc3QgYWNjZXNzb3JzID0gaW50ZXJuYWxzLmFjY2Vzc29ycztcbiAgICBjb25zdCBwcm90b3R5cGUgPSB0aGlzLnByb3RvdHlwZTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZUFjY2Vzc29yKF9oZWFkZXIpIHtcbiAgICAgIGNvbnN0IGxIZWFkZXIgPSBub3JtYWxpemVIZWFkZXIoX2hlYWRlcik7XG5cbiAgICAgIGlmICghYWNjZXNzb3JzW2xIZWFkZXJdKSB7XG4gICAgICAgIGJ1aWxkQWNjZXNzb3JzKHByb3RvdHlwZSwgX2hlYWRlcik7XG4gICAgICAgIGFjY2Vzc29yc1tsSGVhZGVyXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXRpbHMuaXNBcnJheShoZWFkZXIpID8gaGVhZGVyLmZvckVhY2goZGVmaW5lQWNjZXNzb3IpIDogZGVmaW5lQWNjZXNzb3IoaGVhZGVyKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbkF4aW9zSGVhZGVycy5hY2Nlc3NvcihbJ0NvbnRlbnQtVHlwZScsICdDb250ZW50LUxlbmd0aCcsICdBY2NlcHQnLCAnQWNjZXB0LUVuY29kaW5nJywgJ1VzZXItQWdlbnQnLCAnQXV0aG9yaXphdGlvbiddKTtcblxuLy8gcmVzZXJ2ZWQgbmFtZXMgaG90Zml4XG51dGlscy5yZWR1Y2VEZXNjcmlwdG9ycyhBeGlvc0hlYWRlcnMucHJvdG90eXBlLCAoe3ZhbHVlfSwga2V5KSA9PiB7XG4gIGxldCBtYXBwZWQgPSBrZXlbMF0udG9VcHBlckNhc2UoKSArIGtleS5zbGljZSgxKTsgLy8gbWFwIGBzZXRgID0+IGBTZXRgXG4gIHJldHVybiB7XG4gICAgZ2V0OiAoKSA9PiB2YWx1ZSxcbiAgICBzZXQoaGVhZGVyVmFsdWUpIHtcbiAgICAgIHRoaXNbbWFwcGVkXSA9IGhlYWRlclZhbHVlO1xuICAgIH1cbiAgfVxufSk7XG5cbnV0aWxzLmZyZWV6ZU1ldGhvZHMoQXhpb3NIZWFkZXJzKTtcblxuZXhwb3J0IGRlZmF1bHQgQXhpb3NIZWFkZXJzO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcGFyYW0gez9PYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZm5zLCByZXNwb25zZSkge1xuICBjb25zdCBjb25maWcgPSB0aGlzIHx8IGRlZmF1bHRzO1xuICBjb25zdCBjb250ZXh0ID0gcmVzcG9uc2UgfHwgY29uZmlnO1xuICBjb25zdCBoZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29udGV4dC5oZWFkZXJzKTtcbiAgbGV0IGRhdGEgPSBjb250ZXh0LmRhdGE7XG5cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbi5jYWxsKGNvbmZpZywgZGF0YSwgaGVhZGVycy5ub3JtYWxpemUoKSwgcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMgOiB1bmRlZmluZWQpO1xuICB9KTtcblxuICBoZWFkZXJzLm5vcm1hbGl6ZSgpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCB1dGlscyBmcm9tICcuLi91dGlscy5qcyc7XG5cbi8qKlxuICogQSBgQ2FuY2VsZWRFcnJvcmAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0PX0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge09iamVjdD19IHJlcXVlc3QgVGhlIHJlcXVlc3QuXG4gKlxuICogQHJldHVybnMge0NhbmNlbGVkRXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5mdW5jdGlvbiBDYW5jZWxlZEVycm9yKG1lc3NhZ2UsIGNvbmZpZywgcmVxdWVzdCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXEtbnVsbCxlcWVxZXFcbiAgQXhpb3NFcnJvci5jYWxsKHRoaXMsIG1lc3NhZ2UgPT0gbnVsbCA/ICdjYW5jZWxlZCcgOiBtZXNzYWdlLCBBeGlvc0Vycm9yLkVSUl9DQU5DRUxFRCwgY29uZmlnLCByZXF1ZXN0KTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscy5pbmhlcml0cyhDYW5jZWxlZEVycm9yLCBBeGlvc0Vycm9yLCB7XG4gIF9fQ0FOQ0VMX186IHRydWVcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBDYW5jZWxlZEVycm9yO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi9BeGlvc0Vycm9yLmpzJztcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIGNvbnN0IHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VQcm90b2NvbCh1cmwpIHtcbiAgY29uc3QgbWF0Y2ggPSAvXihbLStcXHddezEsMjV9KSg6P1xcL1xcL3w6KS8uZXhlYyh1cmwpO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV0gfHwgJyc7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENhbGN1bGF0ZSBkYXRhIG1heFJhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2FtcGxlc0NvdW50PSAxMF1cbiAqIEBwYXJhbSB7TnVtYmVyfSBbbWluPSAxMDAwXVxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBzcGVlZG9tZXRlcihzYW1wbGVzQ291bnQsIG1pbikge1xuICBzYW1wbGVzQ291bnQgPSBzYW1wbGVzQ291bnQgfHwgMTA7XG4gIGNvbnN0IGJ5dGVzID0gbmV3IEFycmF5KHNhbXBsZXNDb3VudCk7XG4gIGNvbnN0IHRpbWVzdGFtcHMgPSBuZXcgQXJyYXkoc2FtcGxlc0NvdW50KTtcbiAgbGV0IGhlYWQgPSAwO1xuICBsZXQgdGFpbCA9IDA7XG4gIGxldCBmaXJzdFNhbXBsZVRTO1xuXG4gIG1pbiA9IG1pbiAhPT0gdW5kZWZpbmVkID8gbWluIDogMTAwMDtcblxuICByZXR1cm4gZnVuY3Rpb24gcHVzaChjaHVua0xlbmd0aCkge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgICBjb25zdCBzdGFydGVkQXQgPSB0aW1lc3RhbXBzW3RhaWxdO1xuXG4gICAgaWYgKCFmaXJzdFNhbXBsZVRTKSB7XG4gICAgICBmaXJzdFNhbXBsZVRTID0gbm93O1xuICAgIH1cblxuICAgIGJ5dGVzW2hlYWRdID0gY2h1bmtMZW5ndGg7XG4gICAgdGltZXN0YW1wc1toZWFkXSA9IG5vdztcblxuICAgIGxldCBpID0gdGFpbDtcbiAgICBsZXQgYnl0ZXNDb3VudCA9IDA7XG5cbiAgICB3aGlsZSAoaSAhPT0gaGVhZCkge1xuICAgICAgYnl0ZXNDb3VudCArPSBieXRlc1tpKytdO1xuICAgICAgaSA9IGkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaGVhZCA9IChoZWFkICsgMSkgJSBzYW1wbGVzQ291bnQ7XG5cbiAgICBpZiAoaGVhZCA9PT0gdGFpbCkge1xuICAgICAgdGFpbCA9ICh0YWlsICsgMSkgJSBzYW1wbGVzQ291bnQ7XG4gICAgfVxuXG4gICAgaWYgKG5vdyAtIGZpcnN0U2FtcGxlVFMgPCBtaW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXNzZWQgPSBzdGFydGVkQXQgJiYgbm93IC0gc3RhcnRlZEF0O1xuXG4gICAgcmV0dXJuIHBhc3NlZCA/IE1hdGgucm91bmQoYnl0ZXNDb3VudCAqIDEwMDAgLyBwYXNzZWQpIDogdW5kZWZpbmVkO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzcGVlZG9tZXRlcjtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGhyb3R0bGUgZGVjb3JhdG9yXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtOdW1iZXJ9IGZyZXFcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmbiwgZnJlcSkge1xuICBsZXQgdGltZXN0YW1wID0gMDtcbiAgY29uc3QgdGhyZXNob2xkID0gMTAwMCAvIGZyZXE7XG4gIGxldCB0aW1lciA9IG51bGw7XG4gIHJldHVybiBmdW5jdGlvbiB0aHJvdHRsZWQoKSB7XG4gICAgY29uc3QgZm9yY2UgPSB0aGlzID09PSB0cnVlO1xuXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBpZiAoZm9yY2UgfHwgbm93IC0gdGltZXN0YW1wID4gdGhyZXNob2xkKSB7XG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgdGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgICAgdGltZXN0YW1wID0gbm93O1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGlmICghdGltZXIpIHtcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgICAgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICB9LCB0aHJlc2hvbGQgLSAobm93IC0gdGltZXN0YW1wKSk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB0aHJvdHRsZTtcbiIsICJpbXBvcnQgc3BlZWRvbWV0ZXIgZnJvbSBcIi4vc3BlZWRvbWV0ZXIuanNcIjtcbmltcG9ydCB0aHJvdHRsZSBmcm9tIFwiLi90aHJvdHRsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAobGlzdGVuZXIsIGlzRG93bmxvYWRTdHJlYW0sIGZyZXEgPSAzKSA9PiB7XG4gIGxldCBieXRlc05vdGlmaWVkID0gMDtcbiAgY29uc3QgX3NwZWVkb21ldGVyID0gc3BlZWRvbWV0ZXIoNTAsIDI1MCk7XG5cbiAgcmV0dXJuIHRocm90dGxlKGUgPT4ge1xuICAgIGNvbnN0IGxvYWRlZCA9IGUubG9hZGVkO1xuICAgIGNvbnN0IHRvdGFsID0gZS5sZW5ndGhDb21wdXRhYmxlID8gZS50b3RhbCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9ncmVzc0J5dGVzID0gbG9hZGVkIC0gYnl0ZXNOb3RpZmllZDtcbiAgICBjb25zdCByYXRlID0gX3NwZWVkb21ldGVyKHByb2dyZXNzQnl0ZXMpO1xuICAgIGNvbnN0IGluUmFuZ2UgPSBsb2FkZWQgPD0gdG90YWw7XG5cbiAgICBieXRlc05vdGlmaWVkID0gbG9hZGVkO1xuXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGxvYWRlZCxcbiAgICAgIHRvdGFsLFxuICAgICAgcHJvZ3Jlc3M6IHRvdGFsID8gKGxvYWRlZCAvIHRvdGFsKSA6IHVuZGVmaW5lZCxcbiAgICAgIGJ5dGVzOiBwcm9ncmVzc0J5dGVzLFxuICAgICAgcmF0ZTogcmF0ZSA/IHJhdGUgOiB1bmRlZmluZWQsXG4gICAgICBlc3RpbWF0ZWQ6IHJhdGUgJiYgdG90YWwgJiYgaW5SYW5nZSA/ICh0b3RhbCAtIGxvYWRlZCkgLyByYXRlIDogdW5kZWZpbmVkLFxuICAgICAgZXZlbnQ6IGUsXG4gICAgICBsZW5ndGhDb21wdXRhYmxlOiB0b3RhbCAhPSBudWxsXG4gICAgfTtcblxuICAgIGRhdGFbaXNEb3dubG9hZFN0cmVhbSA/ICdkb3dubG9hZCcgOiAndXBsb2FkJ10gPSB0cnVlO1xuXG4gICAgbGlzdGVuZXIoZGF0YSk7XG4gIH0sIGZyZXEpO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID9cblxuLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4vLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICBjb25zdCBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBjb25zdCB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBsZXQgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdHMgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgbGV0IGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKCk7XG4iLCAiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHBsYXRmb3JtIGZyb20gJy4uL3BsYXRmb3JtL2luZGV4LmpzJztcblxuZXhwb3J0IGRlZmF1bHQgcGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52ID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAge1xuICAgIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgY29uc3QgY29va2llID0gW25hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpXTtcblxuICAgICAgdXRpbHMuaXNOdW1iZXIoZXhwaXJlcykgJiYgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuXG4gICAgICB1dGlscy5pc1N0cmluZyhwYXRoKSAmJiBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG5cbiAgICAgIHV0aWxzLmlzU3RyaW5nKGRvbWFpbikgJiYgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcblxuICAgICAgc2VjdXJlID09PSB0cnVlICYmIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcblxuICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgfSxcblxuICAgIHJlYWQobmFtZSkge1xuICAgICAgY29uc3QgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICB9LFxuXG4gICAgcmVtb3ZlKG5hbWUpIHtcbiAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgfVxuICB9XG5cbiAgOlxuXG4gIC8vIE5vbi1zdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAge1xuICAgIHdyaXRlKCkge30sXG4gICAgcmVhZCgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgcmVtb3ZlKCkge31cbiAgfTtcblxuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGQrXFwtLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLz9cXC8kLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaXNBYnNvbHV0ZVVSTCBmcm9tICcuLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMnO1xuaW1wb3J0IGNvbWJpbmVVUkxzIGZyb20gJy4uL2hlbHBlcnMvY29tYmluZVVSTHMuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgYmFzZVVSTCB3aXRoIHRoZSByZXF1ZXN0ZWRVUkwsXG4gKiBvbmx5IHdoZW4gdGhlIHJlcXVlc3RlZFVSTCBpcyBub3QgYWxyZWFkeSBhbiBhYnNvbHV0ZSBVUkwuXG4gKiBJZiB0aGUgcmVxdWVzdFVSTCBpcyBhYnNvbHV0ZSwgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSByZXF1ZXN0ZWRVUkwgdW50b3VjaGVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlcXVlc3RlZFVSTCBBYnNvbHV0ZSBvciByZWxhdGl2ZSBVUkwgdG8gY29tYmluZVxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBmdWxsIHBhdGhcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9BeGlvc0hlYWRlcnMuanNcIjtcblxuY29uc3QgaGVhZGVyc1RvT2JqZWN0ID0gKHRoaW5nKSA9PiB0aGluZyBpbnN0YW5jZW9mIEF4aW9zSGVhZGVycyA/IHsgLi4udGhpbmcgfSA6IHRoaW5nO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBOZXcgb2JqZWN0IHJlc3VsdGluZyBmcm9tIG1lcmdpbmcgY29uZmlnMiB0byBjb25maWcxXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICBjb25zdCBjb25maWcgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRNZXJnZWRWYWx1ZSh0YXJnZXQsIHNvdXJjZSwgY2FzZWxlc3MpIHtcbiAgICBpZiAodXRpbHMuaXNQbGFpbk9iamVjdCh0YXJnZXQpICYmIHV0aWxzLmlzUGxhaW5PYmplY3Qoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHV0aWxzLm1lcmdlLmNhbGwoe2Nhc2VsZXNzfSwgdGFyZ2V0LCBzb3VyY2UpO1xuICAgIH0gZWxzZSBpZiAodXRpbHMuaXNQbGFpbk9iamVjdChzb3VyY2UpKSB7XG4gICAgICByZXR1cm4gdXRpbHMubWVyZ2Uoe30sIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiBzb3VyY2Uuc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURlZXBQcm9wZXJ0aWVzKGEsIGIsIGNhc2VsZXNzKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGEsIGIsIGNhc2VsZXNzKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChhKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSwgY2FzZWxlc3MpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiB2YWx1ZUZyb21Db25maWcyKGEsIGIpIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGIpKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBiKTtcbiAgICB9XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihhLCBiKSB7XG4gICAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChiKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYik7XG4gICAgfSBlbHNlIGlmICghdXRpbHMuaXNVbmRlZmluZWQoYSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGEpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBtZXJnZURpcmVjdEtleXMoYSwgYiwgcHJvcCkge1xuICAgIGlmIChwcm9wIGluIGNvbmZpZzIpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShhLCBiKTtcbiAgICB9IGVsc2UgaWYgKHByb3AgaW4gY29uZmlnMSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgYSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgbWVyZ2VNYXAgPSB7XG4gICAgdXJsOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIG1ldGhvZDogdmFsdWVGcm9tQ29uZmlnMixcbiAgICBkYXRhOiB2YWx1ZUZyb21Db25maWcyLFxuICAgIGJhc2VVUkw6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNmb3JtUmVxdWVzdDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB0cmFuc2Zvcm1SZXNwb25zZTogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBwYXJhbXNTZXJpYWxpemVyOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHRpbWVvdXQ6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdGltZW91dE1lc3NhZ2U6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgd2l0aENyZWRlbnRpYWxzOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHdpdGhYU1JGVG9rZW46IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYWRhcHRlcjogZGVmYXVsdFRvQ29uZmlnMixcbiAgICByZXNwb25zZVR5cGU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkNvb2tpZU5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgeHNyZkhlYWRlck5hbWU6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgb25VcGxvYWRQcm9ncmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBvbkRvd25sb2FkUHJvZ3Jlc3M6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgZGVjb21wcmVzczogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBtYXhDb250ZW50TGVuZ3RoOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIG1heEJvZHlMZW5ndGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgYmVmb3JlUmVkaXJlY3Q6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgdHJhbnNwb3J0OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGh0dHBBZ2VudDogZGVmYXVsdFRvQ29uZmlnMixcbiAgICBodHRwc0FnZW50OiBkZWZhdWx0VG9Db25maWcyLFxuICAgIGNhbmNlbFRva2VuOiBkZWZhdWx0VG9Db25maWcyLFxuICAgIHNvY2tldFBhdGg6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgcmVzcG9uc2VFbmNvZGluZzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICB2YWxpZGF0ZVN0YXR1czogbWVyZ2VEaXJlY3RLZXlzLFxuICAgIGhlYWRlcnM6IChhLCBiKSA9PiBtZXJnZURlZXBQcm9wZXJ0aWVzKGhlYWRlcnNUb09iamVjdChhKSwgaGVhZGVyc1RvT2JqZWN0KGIpLCB0cnVlKVxuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnMSwgY29uZmlnMikpLCBmdW5jdGlvbiBjb21wdXRlQ29uZmlnVmFsdWUocHJvcCkge1xuICAgIGNvbnN0IG1lcmdlID0gbWVyZ2VNYXBbcHJvcF0gfHwgbWVyZ2VEZWVwUHJvcGVydGllcztcbiAgICBjb25zdCBjb25maWdWYWx1ZSA9IG1lcmdlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0sIHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn1cbiIsICJpbXBvcnQgcGxhdGZvcm0gZnJvbSBcIi4uL3BsYXRmb3JtL2luZGV4LmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5pbXBvcnQgaXNVUkxTYW1lT3JpZ2luIGZyb20gXCIuL2lzVVJMU2FtZU9yaWdpbi5qc1wiO1xuaW1wb3J0IGNvb2tpZXMgZnJvbSBcIi4vY29va2llcy5qc1wiO1xuaW1wb3J0IGJ1aWxkRnVsbFBhdGggZnJvbSBcIi4uL2NvcmUvYnVpbGRGdWxsUGF0aC5qc1wiO1xuaW1wb3J0IG1lcmdlQ29uZmlnIGZyb20gXCIuLi9jb3JlL21lcmdlQ29uZmlnLmpzXCI7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGJ1aWxkVVJMIGZyb20gXCIuL2J1aWxkVVJMLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChjb25maWcpID0+IHtcbiAgY29uc3QgbmV3Q29uZmlnID0gbWVyZ2VDb25maWcoe30sIGNvbmZpZyk7XG5cbiAgbGV0IHtkYXRhLCB3aXRoWFNSRlRva2VuLCB4c3JmSGVhZGVyTmFtZSwgeHNyZkNvb2tpZU5hbWUsIGhlYWRlcnMsIGF1dGh9ID0gbmV3Q29uZmlnO1xuXG4gIG5ld0NvbmZpZy5oZWFkZXJzID0gaGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKGhlYWRlcnMpO1xuXG4gIG5ld0NvbmZpZy51cmwgPSBidWlsZFVSTChidWlsZEZ1bGxQYXRoKG5ld0NvbmZpZy5iYXNlVVJMLCBuZXdDb25maWcudXJsKSwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuXG4gIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgaWYgKGF1dGgpIHtcbiAgICBoZWFkZXJzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICtcbiAgICAgIGJ0b2EoKGF1dGgudXNlcm5hbWUgfHwgJycpICsgJzonICsgKGF1dGgucGFzc3dvcmQgPyB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYXV0aC5wYXNzd29yZCkpIDogJycpKVxuICAgICk7XG4gIH1cblxuICBsZXQgY29udGVudFR5cGU7XG5cbiAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkpIHtcbiAgICBpZiAocGxhdGZvcm0uaGFzU3RhbmRhcmRCcm93c2VyRW52IHx8IHBsYXRmb3JtLmhhc1N0YW5kYXJkQnJvd3NlcldlYldvcmtlckVudikge1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZSh1bmRlZmluZWQpOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfSBlbHNlIGlmICgoY29udGVudFR5cGUgPSBoZWFkZXJzLmdldENvbnRlbnRUeXBlKCkpICE9PSBmYWxzZSkge1xuICAgICAgLy8gZml4IHNlbWljb2xvbiBkdXBsaWNhdGlvbiBpc3N1ZSBmb3IgUmVhY3ROYXRpdmUgRm9ybURhdGEgaW1wbGVtZW50YXRpb25cbiAgICAgIGNvbnN0IFt0eXBlLCAuLi50b2tlbnNdID0gY29udGVudFR5cGUgPyBjb250ZW50VHlwZS5zcGxpdCgnOycpLm1hcCh0b2tlbiA9PiB0b2tlbi50cmltKCkpLmZpbHRlcihCb29sZWFuKSA6IFtdO1xuICAgICAgaGVhZGVycy5zZXRDb250ZW50VHlwZShbdHlwZSB8fCAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsIC4uLnRva2Vuc10uam9pbignOyAnKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuXG4gIGlmIChwbGF0Zm9ybS5oYXNTdGFuZGFyZEJyb3dzZXJFbnYpIHtcbiAgICB3aXRoWFNSRlRva2VuICYmIHV0aWxzLmlzRnVuY3Rpb24od2l0aFhTUkZUb2tlbikgJiYgKHdpdGhYU1JGVG9rZW4gPSB3aXRoWFNSRlRva2VuKG5ld0NvbmZpZykpO1xuXG4gICAgaWYgKHdpdGhYU1JGVG9rZW4gfHwgKHdpdGhYU1JGVG9rZW4gIT09IGZhbHNlICYmIGlzVVJMU2FtZU9yaWdpbihuZXdDb25maWcudXJsKSkpIHtcbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgY29uc3QgeHNyZlZhbHVlID0geHNyZkhlYWRlck5hbWUgJiYgeHNyZkNvb2tpZU5hbWUgJiYgY29va2llcy5yZWFkKHhzcmZDb29raWVOYW1lKTtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICBoZWFkZXJzLnNldCh4c3JmSGVhZGVyTmFtZSwgeHNyZlZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3Q29uZmlnO1xufVxuXG4iLCAiaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IHNldHRsZSBmcm9tICcuLy4uL2NvcmUvc2V0dGxlLmpzJztcbmltcG9ydCB0cmFuc2l0aW9uYWxEZWZhdWx0cyBmcm9tICcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBwYXJzZVByb3RvY29sIGZyb20gJy4uL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyc7XG5pbXBvcnQgcGxhdGZvcm0gZnJvbSAnLi4vcGxhdGZvcm0vaW5kZXguanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tICcuLi9jb3JlL0F4aW9zSGVhZGVycy5qcyc7XG5pbXBvcnQgcHJvZ3Jlc3NFdmVudFJlZHVjZXIgZnJvbSAnLi4vaGVscGVycy9wcm9ncmVzc0V2ZW50UmVkdWNlci5qcyc7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tIFwiLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzXCI7XG5cbmNvbnN0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCc7XG5cbmV4cG9ydCBkZWZhdWx0IGlzWEhSQWRhcHRlclN1cHBvcnRlZCAmJiBmdW5jdGlvbiAoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgX2NvbmZpZyA9IHJlc29sdmVDb25maWcoY29uZmlnKTtcbiAgICBsZXQgcmVxdWVzdERhdGEgPSBfY29uZmlnLmRhdGE7XG4gICAgY29uc3QgcmVxdWVzdEhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShfY29uZmlnLmhlYWRlcnMpLm5vcm1hbGl6ZSgpO1xuICAgIGxldCB7cmVzcG9uc2VUeXBlfSA9IF9jb25maWc7XG4gICAgbGV0IG9uQ2FuY2VsZWQ7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGlmIChfY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAgIF9jb25maWcuY2FuY2VsVG9rZW4udW5zdWJzY3JpYmUob25DYW5jZWxlZCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChfY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBfY29uZmlnLnNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICByZXF1ZXN0Lm9wZW4oX2NvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgX2NvbmZpZy51cmwsIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBfY29uZmlnLnRpbWVvdXQ7XG5cbiAgICBmdW5jdGlvbiBvbmxvYWRlbmQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVycyA9IEF4aW9zSGVhZGVycy5mcm9tKFxuICAgICAgICAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ICYmIHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKClcbiAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZURhdGEgPSAhcmVzcG9uc2VUeXBlIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnIHx8IHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nID9cbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKGZ1bmN0aW9uIF9yZXNvbHZlKHZhbHVlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCBmdW5jdGlvbiBfcmVqZWN0KGVycikge1xuICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoJ29ubG9hZGVuZCcgaW4gcmVxdWVzdCkge1xuICAgICAgLy8gVXNlIG9ubG9hZGVuZCBpZiBhdmFpbGFibGVcbiAgICAgIHJlcXVlc3Qub25sb2FkZW5kID0gb25sb2FkZW5kO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlIHRvIGVtdWxhdGUgb25sb2FkZW5kXG4gICAgICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVhZHlzdGF0ZSBoYW5kbGVyIGlzIGNhbGxpbmcgYmVmb3JlIG9uZXJyb3Igb3Igb250aW1lb3V0IGhhbmRsZXJzLFxuICAgICAgICAvLyBzbyB3ZSBzaG91bGQgY2FsbCBvbmxvYWRlbmQgb24gdGhlIG5leHQgJ3RpY2snXG4gICAgICAgIHNldFRpbWVvdXQob25sb2FkZW5kKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGJyb3dzZXIgcmVxdWVzdCBjYW5jZWxsYXRpb24gKGFzIG9wcG9zZWQgdG8gYSBtYW51YWwgY2FuY2VsbGF0aW9uKVxuICAgIHJlcXVlc3Qub25hYm9ydCA9IGZ1bmN0aW9uIGhhbmRsZUFib3J0KCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdSZXF1ZXN0IGFib3J0ZWQnLCBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCwgX2NvbmZpZywgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignTmV0d29yayBFcnJvcicsIEF4aW9zRXJyb3IuRVJSX05FVFdPUkssIF9jb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgbGV0IHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBfY29uZmlnLnRpbWVvdXQgPyAndGltZW91dCBvZiAnICsgX2NvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyA6ICd0aW1lb3V0IGV4Y2VlZGVkJztcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25hbCA9IF9jb25maWcudHJhbnNpdGlvbmFsIHx8IHRyYW5zaXRpb25hbERlZmF1bHRzO1xuICAgICAgaWYgKF9jb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gX2NvbmZpZy50aW1lb3V0RXJyb3JNZXNzYWdlO1xuICAgICAgfVxuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlLFxuICAgICAgICB0cmFuc2l0aW9uYWwuY2xhcmlmeVRpbWVvdXRFcnJvciA/IEF4aW9zRXJyb3IuRVRJTUVET1VUIDogQXhpb3NFcnJvci5FQ09OTkFCT1JURUQsXG4gICAgICAgIF9jb25maWcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICByZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkICYmIHJlcXVlc3RIZWFkZXJzLnNldENvbnRlbnRUeXBlKG51bGwpO1xuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMudG9KU09OKCksIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKF9jb25maWcud2l0aENyZWRlbnRpYWxzKSkge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSAhIV9jb25maWcud2l0aENyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAocmVzcG9uc2VUeXBlICYmIHJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IF9jb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIF9jb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgcHJvZ3Jlc3NFdmVudFJlZHVjZXIoX2NvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MsIHRydWUpKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgX2NvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIHByb2dyZXNzRXZlbnRSZWR1Y2VyKF9jb25maWcub25VcGxvYWRQcm9ncmVzcykpO1xuICAgIH1cblxuICAgIGlmIChfY29uZmlnLmNhbmNlbFRva2VuIHx8IF9jb25maWcuc2lnbmFsKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgb25DYW5jZWxlZCA9IGNhbmNlbCA9PiB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByZWplY3QoIWNhbmNlbCB8fCBjYW5jZWwudHlwZSA/IG5ldyBDYW5jZWxlZEVycm9yKG51bGwsIGNvbmZpZywgcmVxdWVzdCkgOiBjYW5jZWwpO1xuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfTtcblxuICAgICAgX2NvbmZpZy5jYW5jZWxUb2tlbiAmJiBfY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChfY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBfY29uZmlnLnNpZ25hbC5hYm9ydGVkID8gb25DYW5jZWxlZCgpIDogX2NvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwcm90b2NvbCA9IHBhcnNlUHJvdG9jb2woX2NvbmZpZy51cmwpO1xuXG4gICAgaWYgKHByb3RvY29sICYmIHBsYXRmb3JtLnByb3RvY29scy5pbmRleE9mKHByb3RvY29sKSA9PT0gLTEpIHtcbiAgICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcignVW5zdXBwb3J0ZWQgcHJvdG9jb2wgJyArIHByb3RvY29sICsgJzonLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVRVUVTVCwgY29uZmlnKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhIHx8IG51bGwpO1xuICB9KTtcbn1cbiIsICJpbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tIFwiLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3IuanNcIjtcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gXCIuLi9jb3JlL0F4aW9zRXJyb3IuanNcIjtcblxuY29uc3QgY29tcG9zZVNpZ25hbHMgPSAoc2lnbmFscywgdGltZW91dCkgPT4ge1xuICBsZXQgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICBsZXQgYWJvcnRlZDtcblxuICBjb25zdCBvbmFib3J0ID0gZnVuY3Rpb24gKGNhbmNlbCkge1xuICAgIGlmICghYWJvcnRlZCkge1xuICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgY29uc3QgZXJyID0gY2FuY2VsIGluc3RhbmNlb2YgRXJyb3IgPyBjYW5jZWwgOiB0aGlzLnJlYXNvbjtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoZXJyIGluc3RhbmNlb2YgQXhpb3NFcnJvciA/IGVyciA6IG5ldyBDYW5jZWxlZEVycm9yKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLm1lc3NhZ2UgOiBlcnIpKTtcbiAgICB9XG4gIH1cblxuICBsZXQgdGltZXIgPSB0aW1lb3V0ICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIG9uYWJvcnQobmV3IEF4aW9zRXJyb3IoYHRpbWVvdXQgJHt0aW1lb3V0fSBvZiBtcyBleGNlZWRlZGAsIEF4aW9zRXJyb3IuRVRJTUVET1VUKSlcbiAgfSwgdGltZW91dClcblxuICBjb25zdCB1bnN1YnNjcmliZSA9ICgpID0+IHtcbiAgICBpZiAoc2lnbmFscykge1xuICAgICAgdGltZXIgJiYgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHRpbWVyID0gbnVsbDtcbiAgICAgIHNpZ25hbHMuZm9yRWFjaChzaWduYWwgPT4ge1xuICAgICAgICBzaWduYWwgJiZcbiAgICAgICAgKHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyID8gc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25hYm9ydCkgOiBzaWduYWwudW5zdWJzY3JpYmUob25hYm9ydCkpO1xuICAgICAgfSk7XG4gICAgICBzaWduYWxzID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBzaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4gc2lnbmFsICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyICYmIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIG9uYWJvcnQpKTtcblxuICBjb25zdCB7c2lnbmFsfSA9IGNvbnRyb2xsZXI7XG5cbiAgc2lnbmFsLnVuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmU7XG5cbiAgcmV0dXJuIFtzaWduYWwsICgpID0+IHtcbiAgICB0aW1lciAmJiBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIHRpbWVyID0gbnVsbDtcbiAgfV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbXBvc2VTaWduYWxzO1xuIiwgIlxuXG5leHBvcnQgY29uc3Qgc3RyZWFtQ2h1bmsgPSBmdW5jdGlvbiogKGNodW5rLCBjaHVua1NpemUpIHtcbiAgbGV0IGxlbiA9IGNodW5rLmJ5dGVMZW5ndGg7XG5cbiAgaWYgKCFjaHVua1NpemUgfHwgbGVuIDwgY2h1bmtTaXplKSB7XG4gICAgeWllbGQgY2h1bms7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHBvcyA9IDA7XG4gIGxldCBlbmQ7XG5cbiAgd2hpbGUgKHBvcyA8IGxlbikge1xuICAgIGVuZCA9IHBvcyArIGNodW5rU2l6ZTtcbiAgICB5aWVsZCBjaHVuay5zbGljZShwb3MsIGVuZCk7XG4gICAgcG9zID0gZW5kO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWFkQnl0ZXMgPSBhc3luYyBmdW5jdGlvbiogKGl0ZXJhYmxlLCBjaHVua1NpemUsIGVuY29kZSkge1xuICBmb3IgYXdhaXQgKGNvbnN0IGNodW5rIG9mIGl0ZXJhYmxlKSB7XG4gICAgeWllbGQqIHN0cmVhbUNodW5rKEFycmF5QnVmZmVyLmlzVmlldyhjaHVuaykgPyBjaHVuayA6IChhd2FpdCBlbmNvZGUoU3RyaW5nKGNodW5rKSkpLCBjaHVua1NpemUpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0cmFja1N0cmVhbSA9IChzdHJlYW0sIGNodW5rU2l6ZSwgb25Qcm9ncmVzcywgb25GaW5pc2gsIGVuY29kZSkgPT4ge1xuICBjb25zdCBpdGVyYXRvciA9IHJlYWRCeXRlcyhzdHJlYW0sIGNodW5rU2l6ZSwgZW5jb2RlKTtcblxuICBsZXQgYnl0ZXMgPSAwO1xuXG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW0oe1xuICAgIHR5cGU6ICdieXRlcycsXG5cbiAgICBhc3luYyBwdWxsKGNvbnRyb2xsZXIpIHtcbiAgICAgIGNvbnN0IHtkb25lLCB2YWx1ZX0gPSBhd2FpdCBpdGVyYXRvci5uZXh0KCk7XG5cbiAgICAgIGlmIChkb25lKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgICAgb25GaW5pc2goKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgbGVuID0gdmFsdWUuYnl0ZUxlbmd0aDtcbiAgICAgIG9uUHJvZ3Jlc3MgJiYgb25Qcm9ncmVzcyhieXRlcyArPSBsZW4pO1xuICAgICAgY29udHJvbGxlci5lbnF1ZXVlKG5ldyBVaW50OEFycmF5KHZhbHVlKSk7XG4gICAgfSxcbiAgICBjYW5jZWwocmVhc29uKSB7XG4gICAgICBvbkZpbmlzaChyZWFzb24pO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yLnJldHVybigpO1xuICAgIH1cbiAgfSwge1xuICAgIGhpZ2hXYXRlck1hcms6IDJcbiAgfSlcbn1cbiIsICJpbXBvcnQgcGxhdGZvcm0gZnJvbSBcIi4uL3BsYXRmb3JtL2luZGV4LmpzXCI7XG5pbXBvcnQgdXRpbHMgZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5pbXBvcnQgQXhpb3NFcnJvciBmcm9tIFwiLi4vY29yZS9BeGlvc0Vycm9yLmpzXCI7XG5pbXBvcnQgY29tcG9zZVNpZ25hbHMgZnJvbSBcIi4uL2hlbHBlcnMvY29tcG9zZVNpZ25hbHMuanNcIjtcbmltcG9ydCB7dHJhY2tTdHJlYW19IGZyb20gXCIuLi9oZWxwZXJzL3RyYWNrU3RyZWFtLmpzXCI7XG5pbXBvcnQgQXhpb3NIZWFkZXJzIGZyb20gXCIuLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IHByb2dyZXNzRXZlbnRSZWR1Y2VyIGZyb20gXCIuLi9oZWxwZXJzL3Byb2dyZXNzRXZlbnRSZWR1Y2VyLmpzXCI7XG5pbXBvcnQgcmVzb2x2ZUNvbmZpZyBmcm9tIFwiLi4vaGVscGVycy9yZXNvbHZlQ29uZmlnLmpzXCI7XG5pbXBvcnQgc2V0dGxlIGZyb20gXCIuLi9jb3JlL3NldHRsZS5qc1wiO1xuXG5jb25zdCBmZXRjaFByb2dyZXNzRGVjb3JhdG9yID0gKHRvdGFsLCBmbikgPT4ge1xuICBjb25zdCBsZW5ndGhDb21wdXRhYmxlID0gdG90YWwgIT0gbnVsbDtcbiAgcmV0dXJuIChsb2FkZWQpID0+IHNldFRpbWVvdXQoKCkgPT4gZm4oe1xuICAgIGxlbmd0aENvbXB1dGFibGUsXG4gICAgdG90YWwsXG4gICAgbG9hZGVkXG4gIH0pKTtcbn1cblxuY29uc3QgaXNGZXRjaFN1cHBvcnRlZCA9IHR5cGVvZiBmZXRjaCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgUmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgUmVzcG9uc2UgPT09ICdmdW5jdGlvbic7XG5jb25zdCBpc1JlYWRhYmxlU3RyZWFtU3VwcG9ydGVkID0gaXNGZXRjaFN1cHBvcnRlZCAmJiB0eXBlb2YgUmVhZGFibGVTdHJlYW0gPT09ICdmdW5jdGlvbic7XG5cbi8vIHVzZWQgb25seSBpbnNpZGUgdGhlIGZldGNoIGFkYXB0ZXJcbmNvbnN0IGVuY29kZVRleHQgPSBpc0ZldGNoU3VwcG9ydGVkICYmICh0eXBlb2YgVGV4dEVuY29kZXIgPT09ICdmdW5jdGlvbicgP1xuICAgICgoZW5jb2RlcikgPT4gKHN0cikgPT4gZW5jb2Rlci5lbmNvZGUoc3RyKSkobmV3IFRleHRFbmNvZGVyKCkpIDpcbiAgICBhc3luYyAoc3RyKSA9PiBuZXcgVWludDhBcnJheShhd2FpdCBuZXcgUmVzcG9uc2Uoc3RyKS5hcnJheUJ1ZmZlcigpKVxuKTtcblxuY29uc3Qgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtID0gaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJiAoKCkgPT4ge1xuICBsZXQgZHVwbGV4QWNjZXNzZWQgPSBmYWxzZTtcblxuICBjb25zdCBoYXNDb250ZW50VHlwZSA9IG5ldyBSZXF1ZXN0KHBsYXRmb3JtLm9yaWdpbiwge1xuICAgIGJvZHk6IG5ldyBSZWFkYWJsZVN0cmVhbSgpLFxuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGdldCBkdXBsZXgoKSB7XG4gICAgICBkdXBsZXhBY2Nlc3NlZCA9IHRydWU7XG4gICAgICByZXR1cm4gJ2hhbGYnO1xuICAgIH0sXG4gIH0pLmhlYWRlcnMuaGFzKCdDb250ZW50LVR5cGUnKTtcblxuICByZXR1cm4gZHVwbGV4QWNjZXNzZWQgJiYgIWhhc0NvbnRlbnRUeXBlO1xufSkoKTtcblxuY29uc3QgREVGQVVMVF9DSFVOS19TSVpFID0gNjQgKiAxMDI0O1xuXG5jb25zdCBzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtID0gaXNSZWFkYWJsZVN0cmVhbVN1cHBvcnRlZCAmJiAhISgoKT0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gdXRpbHMuaXNSZWFkYWJsZVN0cmVhbShuZXcgUmVzcG9uc2UoJycpLmJvZHkpO1xuICB9IGNhdGNoKGVycikge1xuICAgIC8vIHJldHVybiB1bmRlZmluZWRcbiAgfVxufSkoKTtcblxuY29uc3QgcmVzb2x2ZXJzID0ge1xuICBzdHJlYW06IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKChyZXMpID0+IHJlcy5ib2R5KVxufTtcblxuaXNGZXRjaFN1cHBvcnRlZCAmJiAoKChyZXMpID0+IHtcbiAgWyd0ZXh0JywgJ2FycmF5QnVmZmVyJywgJ2Jsb2InLCAnZm9ybURhdGEnLCAnc3RyZWFtJ10uZm9yRWFjaCh0eXBlID0+IHtcbiAgICAhcmVzb2x2ZXJzW3R5cGVdICYmIChyZXNvbHZlcnNbdHlwZV0gPSB1dGlscy5pc0Z1bmN0aW9uKHJlc1t0eXBlXSkgPyAocmVzKSA9PiByZXNbdHlwZV0oKSA6XG4gICAgICAoXywgY29uZmlnKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKGBSZXNwb25zZSB0eXBlICcke3R5cGV9JyBpcyBub3Qgc3VwcG9ydGVkYCwgQXhpb3NFcnJvci5FUlJfTk9UX1NVUFBPUlQsIGNvbmZpZyk7XG4gICAgICB9KVxuICB9KTtcbn0pKG5ldyBSZXNwb25zZSkpO1xuXG5jb25zdCBnZXRCb2R5TGVuZ3RoID0gYXN5bmMgKGJvZHkpID0+IHtcbiAgaWYgKGJvZHkgPT0gbnVsbCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgaWYodXRpbHMuaXNCbG9iKGJvZHkpKSB7XG4gICAgcmV0dXJuIGJvZHkuc2l6ZTtcbiAgfVxuXG4gIGlmKHV0aWxzLmlzU3BlY0NvbXBsaWFudEZvcm0oYm9keSkpIHtcbiAgICByZXR1cm4gKGF3YWl0IG5ldyBSZXF1ZXN0KGJvZHkpLmFycmF5QnVmZmVyKCkpLmJ5dGVMZW5ndGg7XG4gIH1cblxuICBpZih1dGlscy5pc0FycmF5QnVmZmVyVmlldyhib2R5KSkge1xuICAgIHJldHVybiBib2R5LmJ5dGVMZW5ndGg7XG4gIH1cblxuICBpZih1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhib2R5KSkge1xuICAgIGJvZHkgPSBib2R5ICsgJyc7XG4gIH1cblxuICBpZih1dGlscy5pc1N0cmluZyhib2R5KSkge1xuICAgIHJldHVybiAoYXdhaXQgZW5jb2RlVGV4dChib2R5KSkuYnl0ZUxlbmd0aDtcbiAgfVxufVxuXG5jb25zdCByZXNvbHZlQm9keUxlbmd0aCA9IGFzeW5jIChoZWFkZXJzLCBib2R5KSA9PiB7XG4gIGNvbnN0IGxlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKGhlYWRlcnMuZ2V0Q29udGVudExlbmd0aCgpKTtcblxuICByZXR1cm4gbGVuZ3RoID09IG51bGwgPyBnZXRCb2R5TGVuZ3RoKGJvZHkpIDogbGVuZ3RoO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0ZldGNoU3VwcG9ydGVkICYmIChhc3luYyAoY29uZmlnKSA9PiB7XG4gIGxldCB7XG4gICAgdXJsLFxuICAgIG1ldGhvZCxcbiAgICBkYXRhLFxuICAgIHNpZ25hbCxcbiAgICBjYW5jZWxUb2tlbixcbiAgICB0aW1lb3V0LFxuICAgIG9uRG93bmxvYWRQcm9ncmVzcyxcbiAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgIHJlc3BvbnNlVHlwZSxcbiAgICBoZWFkZXJzLFxuICAgIHdpdGhDcmVkZW50aWFscyA9ICdzYW1lLW9yaWdpbicsXG4gICAgZmV0Y2hPcHRpb25zXG4gIH0gPSByZXNvbHZlQ29uZmlnKGNvbmZpZyk7XG5cbiAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlID8gKHJlc3BvbnNlVHlwZSArICcnKS50b0xvd2VyQ2FzZSgpIDogJ3RleHQnO1xuXG4gIGxldCBbY29tcG9zZWRTaWduYWwsIHN0b3BUaW1lb3V0XSA9IChzaWduYWwgfHwgY2FuY2VsVG9rZW4gfHwgdGltZW91dCkgP1xuICAgIGNvbXBvc2VTaWduYWxzKFtzaWduYWwsIGNhbmNlbFRva2VuXSwgdGltZW91dCkgOiBbXTtcblxuICBsZXQgZmluaXNoZWQsIHJlcXVlc3Q7XG5cbiAgY29uc3Qgb25GaW5pc2ggPSAoKSA9PiB7XG4gICAgIWZpbmlzaGVkICYmIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29tcG9zZWRTaWduYWwgJiYgY29tcG9zZWRTaWduYWwudW5zdWJzY3JpYmUoKTtcbiAgICB9KTtcblxuICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGxldCByZXF1ZXN0Q29udGVudExlbmd0aDtcblxuICB0cnkge1xuICAgIGlmIChcbiAgICAgIG9uVXBsb2FkUHJvZ3Jlc3MgJiYgc3VwcG9ydHNSZXF1ZXN0U3RyZWFtICYmIG1ldGhvZCAhPT0gJ2dldCcgJiYgbWV0aG9kICE9PSAnaGVhZCcgJiZcbiAgICAgIChyZXF1ZXN0Q29udGVudExlbmd0aCA9IGF3YWl0IHJlc29sdmVCb2R5TGVuZ3RoKGhlYWRlcnMsIGRhdGEpKSAhPT0gMFxuICAgICkge1xuICAgICAgbGV0IF9yZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBib2R5OiBkYXRhLFxuICAgICAgICBkdXBsZXg6IFwiaGFsZlwiXG4gICAgICB9KTtcblxuICAgICAgbGV0IGNvbnRlbnRUeXBlSGVhZGVyO1xuXG4gICAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSAmJiAoY29udGVudFR5cGVIZWFkZXIgPSBfcmVxdWVzdC5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpKSB7XG4gICAgICAgIGhlYWRlcnMuc2V0Q29udGVudFR5cGUoY29udGVudFR5cGVIZWFkZXIpXG4gICAgICB9XG5cbiAgICAgIGlmIChfcmVxdWVzdC5ib2R5KSB7XG4gICAgICAgIGRhdGEgPSB0cmFja1N0cmVhbShfcmVxdWVzdC5ib2R5LCBERUZBVUxUX0NIVU5LX1NJWkUsIGZldGNoUHJvZ3Jlc3NEZWNvcmF0b3IoXG4gICAgICAgICAgcmVxdWVzdENvbnRlbnRMZW5ndGgsXG4gICAgICAgICAgcHJvZ3Jlc3NFdmVudFJlZHVjZXIob25VcGxvYWRQcm9ncmVzcylcbiAgICAgICAgKSwgbnVsbCwgZW5jb2RlVGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCF1dGlscy5pc1N0cmluZyh3aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICB3aXRoQ3JlZGVudGlhbHMgPSB3aXRoQ3JlZGVudGlhbHMgPyAnY29ycycgOiAnb21pdCc7XG4gICAgfVxuXG4gICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgICAgLi4uZmV0Y2hPcHRpb25zLFxuICAgICAgc2lnbmFsOiBjb21wb3NlZFNpZ25hbCxcbiAgICAgIG1ldGhvZDogbWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLm5vcm1hbGl6ZSgpLnRvSlNPTigpLFxuICAgICAgYm9keTogZGF0YSxcbiAgICAgIGR1cGxleDogXCJoYWxmXCIsXG4gICAgICB3aXRoQ3JlZGVudGlhbHNcbiAgICB9KTtcblxuICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHJlcXVlc3QpO1xuXG4gICAgY29uc3QgaXNTdHJlYW1SZXNwb25zZSA9IHN1cHBvcnRzUmVzcG9uc2VTdHJlYW0gJiYgKHJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScgfHwgcmVzcG9uc2VUeXBlID09PSAncmVzcG9uc2UnKTtcblxuICAgIGlmIChzdXBwb3J0c1Jlc3BvbnNlU3RyZWFtICYmIChvbkRvd25sb2FkUHJvZ3Jlc3MgfHwgaXNTdHJlYW1SZXNwb25zZSkpIHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcblxuICAgICAgWydzdGF0dXMnLCAnc3RhdHVzVGV4dCcsICdoZWFkZXJzJ10uZm9yRWFjaChwcm9wID0+IHtcbiAgICAgICAgb3B0aW9uc1twcm9wXSA9IHJlc3BvbnNlW3Byb3BdO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlQ29udGVudExlbmd0aCA9IHV0aWxzLnRvRmluaXRlTnVtYmVyKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LWxlbmd0aCcpKTtcblxuICAgICAgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UoXG4gICAgICAgIHRyYWNrU3RyZWFtKHJlc3BvbnNlLmJvZHksIERFRkFVTFRfQ0hVTktfU0laRSwgb25Eb3dubG9hZFByb2dyZXNzICYmIGZldGNoUHJvZ3Jlc3NEZWNvcmF0b3IoXG4gICAgICAgICAgcmVzcG9uc2VDb250ZW50TGVuZ3RoLFxuICAgICAgICAgIHByb2dyZXNzRXZlbnRSZWR1Y2VyKG9uRG93bmxvYWRQcm9ncmVzcywgdHJ1ZSlcbiAgICAgICAgKSwgaXNTdHJlYW1SZXNwb25zZSAmJiBvbkZpbmlzaCwgZW5jb2RlVGV4dCksXG4gICAgICAgIG9wdGlvbnNcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlIHx8ICd0ZXh0JztcblxuICAgIGxldCByZXNwb25zZURhdGEgPSBhd2FpdCByZXNvbHZlcnNbdXRpbHMuZmluZEtleShyZXNvbHZlcnMsIHJlc3BvbnNlVHlwZSkgfHwgJ3RleHQnXShyZXNwb25zZSwgY29uZmlnKTtcblxuICAgICFpc1N0cmVhbVJlc3BvbnNlICYmIG9uRmluaXNoKCk7XG5cbiAgICBzdG9wVGltZW91dCAmJiBzdG9wVGltZW91dCgpO1xuXG4gICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICBoZWFkZXJzOiBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKSxcbiAgICAgICAgc3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdFxuICAgICAgfSlcbiAgICB9KVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBvbkZpbmlzaCgpO1xuXG4gICAgaWYgKGVyciAmJiBlcnIubmFtZSA9PT0gJ1R5cGVFcnJvcicgJiYgL2ZldGNoL2kudGVzdChlcnIubWVzc2FnZSkpIHtcbiAgICAgIHRocm93IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIG5ldyBBeGlvc0Vycm9yKCdOZXR3b3JrIEVycm9yJywgQXhpb3NFcnJvci5FUlJfTkVUV09SSywgY29uZmlnLCByZXF1ZXN0KSxcbiAgICAgICAge1xuICAgICAgICAgIGNhdXNlOiBlcnIuY2F1c2UgfHwgZXJyXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG5cbiAgICB0aHJvdyBBeGlvc0Vycm9yLmZyb20oZXJyLCBlcnIgJiYgZXJyLmNvZGUsIGNvbmZpZywgcmVxdWVzdCk7XG4gIH1cbn0pO1xuXG5cbiIsICJpbXBvcnQgdXRpbHMgZnJvbSAnLi4vdXRpbHMuanMnO1xuaW1wb3J0IGh0dHBBZGFwdGVyIGZyb20gJy4vaHR0cC5qcyc7XG5pbXBvcnQgeGhyQWRhcHRlciBmcm9tICcuL3hoci5qcyc7XG5pbXBvcnQgZmV0Y2hBZGFwdGVyIGZyb20gJy4vZmV0Y2guanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSBcIi4uL2NvcmUvQXhpb3NFcnJvci5qc1wiO1xuXG5jb25zdCBrbm93bkFkYXB0ZXJzID0ge1xuICBodHRwOiBodHRwQWRhcHRlcixcbiAgeGhyOiB4aHJBZGFwdGVyLFxuICBmZXRjaDogZmV0Y2hBZGFwdGVyXG59XG5cbnV0aWxzLmZvckVhY2goa25vd25BZGFwdGVycywgKGZuLCB2YWx1ZSkgPT4ge1xuICBpZiAoZm4pIHtcbiAgICB0cnkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCAnbmFtZScsIHt2YWx1ZX0pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sICdhZGFwdGVyTmFtZScsIHt2YWx1ZX0pO1xuICB9XG59KTtcblxuY29uc3QgcmVuZGVyUmVhc29uID0gKHJlYXNvbikgPT4gYC0gJHtyZWFzb259YDtcblxuY29uc3QgaXNSZXNvbHZlZEhhbmRsZSA9IChhZGFwdGVyKSA9PiB1dGlscy5pc0Z1bmN0aW9uKGFkYXB0ZXIpIHx8IGFkYXB0ZXIgPT09IG51bGwgfHwgYWRhcHRlciA9PT0gZmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0QWRhcHRlcjogKGFkYXB0ZXJzKSA9PiB7XG4gICAgYWRhcHRlcnMgPSB1dGlscy5pc0FycmF5KGFkYXB0ZXJzKSA/IGFkYXB0ZXJzIDogW2FkYXB0ZXJzXTtcblxuICAgIGNvbnN0IHtsZW5ndGh9ID0gYWRhcHRlcnM7XG4gICAgbGV0IG5hbWVPckFkYXB0ZXI7XG4gICAgbGV0IGFkYXB0ZXI7XG5cbiAgICBjb25zdCByZWplY3RlZFJlYXNvbnMgPSB7fTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG5hbWVPckFkYXB0ZXIgPSBhZGFwdGVyc1tpXTtcbiAgICAgIGxldCBpZDtcblxuICAgICAgYWRhcHRlciA9IG5hbWVPckFkYXB0ZXI7XG5cbiAgICAgIGlmICghaXNSZXNvbHZlZEhhbmRsZShuYW1lT3JBZGFwdGVyKSkge1xuICAgICAgICBhZGFwdGVyID0ga25vd25BZGFwdGVyc1soaWQgPSBTdHJpbmcobmFtZU9yQWRhcHRlcikpLnRvTG93ZXJDYXNlKCldO1xuXG4gICAgICAgIGlmIChhZGFwdGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihgVW5rbm93biBhZGFwdGVyICcke2lkfSdgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYWRhcHRlcikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmVqZWN0ZWRSZWFzb25zW2lkIHx8ICcjJyArIGldID0gYWRhcHRlcjtcbiAgICB9XG5cbiAgICBpZiAoIWFkYXB0ZXIpIHtcblxuICAgICAgY29uc3QgcmVhc29ucyA9IE9iamVjdC5lbnRyaWVzKHJlamVjdGVkUmVhc29ucylcbiAgICAgICAgLm1hcCgoW2lkLCBzdGF0ZV0pID0+IGBhZGFwdGVyICR7aWR9IGAgK1xuICAgICAgICAgIChzdGF0ZSA9PT0gZmFsc2UgPyAnaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgZW52aXJvbm1lbnQnIDogJ2lzIG5vdCBhdmFpbGFibGUgaW4gdGhlIGJ1aWxkJylcbiAgICAgICAgKTtcblxuICAgICAgbGV0IHMgPSBsZW5ndGggP1xuICAgICAgICAocmVhc29ucy5sZW5ndGggPiAxID8gJ3NpbmNlIDpcXG4nICsgcmVhc29ucy5tYXAocmVuZGVyUmVhc29uKS5qb2luKCdcXG4nKSA6ICcgJyArIHJlbmRlclJlYXNvbihyZWFzb25zWzBdKSkgOlxuICAgICAgICAnYXMgbm8gYWRhcHRlciBzcGVjaWZpZWQnO1xuXG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIHN1aXRhYmxlIGFkYXB0ZXIgdG8gZGlzcGF0Y2ggdGhlIHJlcXVlc3QgYCArIHMsXG4gICAgICAgICdFUlJfTk9UX1NVUFBPUlQnXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBhZGFwdGVyO1xuICB9LFxuICBhZGFwdGVyczoga25vd25BZGFwdGVyc1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHRyYW5zZm9ybURhdGEgZnJvbSAnLi90cmFuc2Zvcm1EYXRhLmpzJztcbmltcG9ydCBpc0NhbmNlbCBmcm9tICcuLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4uL2RlZmF1bHRzL2luZGV4LmpzJztcbmltcG9ydCBDYW5jZWxlZEVycm9yIGZyb20gJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi4vY29yZS9BeGlvc0hlYWRlcnMuanMnO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gXCIuLi9hZGFwdGVycy9hZGFwdGVycy5qc1wiO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxlZEVycm9yYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG5cbiAgaWYgKGNvbmZpZy5zaWduYWwgJiYgY29uZmlnLnNpZ25hbC5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IENhbmNlbGVkRXJyb3IobnVsbCwgY29uZmlnKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmZyb20oY29uZmlnLmhlYWRlcnMpO1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgY29uZmlnLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgaWYgKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXS5pbmRleE9mKGNvbmZpZy5tZXRob2QpICE9PSAtMSkge1xuICAgIGNvbmZpZy5oZWFkZXJzLnNldENvbnRlbnRUeXBlKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLCBmYWxzZSk7XG4gIH1cblxuICBjb25zdCBhZGFwdGVyID0gYWRhcHRlcnMuZ2V0QWRhcHRlcihjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyKTtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZXNwb25zZS5oZWFkZXJzKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMgPSBBeGlvc0hlYWRlcnMuZnJvbShyZWFzb24ucmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufVxuIiwgImV4cG9ydCBjb25zdCBWRVJTSU9OID0gXCIxLjcuMlwiOyIsICIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7VkVSU0lPTn0gZnJvbSAnLi4vZW52L2RhdGEuanMnO1xuaW1wb3J0IEF4aW9zRXJyb3IgZnJvbSAnLi4vY29yZS9BeGlvc0Vycm9yLmpzJztcblxuY29uc3QgdmFsaWRhdG9ycyA9IHt9O1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuWydvYmplY3QnLCAnYm9vbGVhbicsICdudW1iZXInLCAnZnVuY3Rpb24nLCAnc3RyaW5nJywgJ3N5bWJvbCddLmZvckVhY2goKHR5cGUsIGkpID0+IHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbmNvbnN0IGRlcHJlY2F0ZWRXYXJuaW5ncyA9IHt9O1xuXG4vKipcbiAqIFRyYW5zaXRpb25hbCBvcHRpb24gdmFsaWRhdG9yXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKlxuICogQHJldHVybnMge2Z1bmN0aW9ufVxuICovXG52YWxpZGF0b3JzLnRyYW5zaXRpb25hbCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25hbCh2YWxpZGF0b3IsIHZlcnNpb24sIG1lc3NhZ2UpIHtcbiAgZnVuY3Rpb24gZm9ybWF0TWVzc2FnZShvcHQsIGRlc2MpIHtcbiAgICByZXR1cm4gJ1tBeGlvcyB2JyArIFZFUlNJT04gKyAnXSBUcmFuc2l0aW9uYWwgb3B0aW9uIFxcJycgKyBvcHQgKyAnXFwnJyArIGRlc2MgKyAobWVzc2FnZSA/ICcuICcgKyBtZXNzYWdlIDogJycpO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgcmV0dXJuICh2YWx1ZSwgb3B0LCBvcHRzKSA9PiB7XG4gICAgaWYgKHZhbGlkYXRvciA9PT0gZmFsc2UpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKG9wdCwgJyBoYXMgYmVlbiByZW1vdmVkJyArICh2ZXJzaW9uID8gJyBpbiAnICsgdmVyc2lvbiA6ICcnKSksXG4gICAgICAgIEF4aW9zRXJyb3IuRVJSX0RFUFJFQ0FURURcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gJiYgIWRlcHJlY2F0ZWRXYXJuaW5nc1tvcHRdKSB7XG4gICAgICBkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSA9IHRydWU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBmb3JtYXRNZXNzYWdlKFxuICAgICAgICAgIG9wdCxcbiAgICAgICAgICAnIGhhcyBiZWVuIGRlcHJlY2F0ZWQgc2luY2UgdicgKyB2ZXJzaW9uICsgJyBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZWFyIGZ1dHVyZSdcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yID8gdmFsaWRhdG9yKHZhbHVlLCBvcHQsIG9wdHMpIDogdHJ1ZTtcbiAgfTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IG9iamVjdCdzIHByb3BlcnRpZXMgdHlwZVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICovXG5cbmZ1bmN0aW9uIGFzc2VydE9wdGlvbnMob3B0aW9ucywgc2NoZW1hLCBhbGxvd1Vua25vd24pIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdvcHRpb25zIG11c3QgYmUgYW4gb2JqZWN0JywgQXhpb3NFcnJvci5FUlJfQkFEX09QVElPTl9WQUxVRSk7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpO1xuICBsZXQgaSA9IGtleXMubGVuZ3RoO1xuICB3aGlsZSAoaS0tID4gMCkge1xuICAgIGNvbnN0IG9wdCA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsaWRhdG9yID0gc2NoZW1hW29wdF07XG4gICAgaWYgKHZhbGlkYXRvcikge1xuICAgICAgY29uc3QgdmFsdWUgPSBvcHRpb25zW29wdF07XG4gICAgICBjb25zdCByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhc3NlcnRPcHRpb25zLFxuICB2YWxpZGF0b3JzXG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuaW1wb3J0IGJ1aWxkVVJMIGZyb20gJy4uL2hlbHBlcnMvYnVpbGRVUkwuanMnO1xuaW1wb3J0IEludGVyY2VwdG9yTWFuYWdlciBmcm9tICcuL0ludGVyY2VwdG9yTWFuYWdlci5qcyc7XG5pbXBvcnQgZGlzcGF0Y2hSZXF1ZXN0IGZyb20gJy4vZGlzcGF0Y2hSZXF1ZXN0LmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL21lcmdlQ29uZmlnLmpzJztcbmltcG9ydCBidWlsZEZ1bGxQYXRoIGZyb20gJy4vYnVpbGRGdWxsUGF0aC5qcyc7XG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uL2hlbHBlcnMvdmFsaWRhdG9yLmpzJztcbmltcG9ydCBBeGlvc0hlYWRlcnMgZnJvbSAnLi9BeGlvc0hlYWRlcnMuanMnO1xuXG5jb25zdCB2YWxpZGF0b3JzID0gdmFsaWRhdG9yLnZhbGlkYXRvcnM7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKlxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmNsYXNzIEF4aW9zIHtcbiAgY29uc3RydWN0b3IoaW5zdGFuY2VDb25maWcpIHtcbiAgICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBjb25maWdPclVybCBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gICAqIEBwYXJhbSB7P09iamVjdH0gY29uZmlnXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAgICovXG4gIGFzeW5jIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5fcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBsZXQgZHVtbXk7XG5cbiAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgPyBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShkdW1teSA9IHt9KSA6IChkdW1teSA9IG5ldyBFcnJvcigpKTtcblxuICAgICAgICAvLyBzbGljZSBvZmYgdGhlIEVycm9yOiAuLi4gbGluZVxuICAgICAgICBjb25zdCBzdGFjayA9IGR1bW15LnN0YWNrID8gZHVtbXkuc3RhY2sucmVwbGFjZSgvXi4rXFxuLywgJycpIDogJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKCFlcnIuc3RhY2spIHtcbiAgICAgICAgICAgIGVyci5zdGFjayA9IHN0YWNrO1xuICAgICAgICAgICAgLy8gbWF0Y2ggd2l0aG91dCB0aGUgMiB0b3Agc3RhY2sgbGluZXNcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YWNrICYmICFTdHJpbmcoZXJyLnN0YWNrKS5lbmRzV2l0aChzdGFjay5yZXBsYWNlKC9eLitcXG4uK1xcbi8sICcnKSkpIHtcbiAgICAgICAgICAgIGVyci5zdGFjayArPSAnXFxuJyArIHN0YWNrXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gaWdub3JlIHRoZSBjYXNlIHdoZXJlIFwic3RhY2tcIiBpcyBhbiB1bi13cml0YWJsZSBwcm9wZXJ0eVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBfcmVxdWVzdChjb25maWdPclVybCwgY29uZmlnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICAgIGlmICh0eXBlb2YgY29uZmlnT3JVcmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gICAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpZyA9IGNvbmZpZ09yVXJsIHx8IHt9O1xuICAgIH1cblxuICAgIGNvbmZpZyA9IG1lcmdlQ29uZmlnKHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG5cbiAgICBjb25zdCB7dHJhbnNpdGlvbmFsLCBwYXJhbXNTZXJpYWxpemVyLCBoZWFkZXJzfSA9IGNvbmZpZztcblxuICAgIGlmICh0cmFuc2l0aW9uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFsaWRhdG9yLmFzc2VydE9wdGlvbnModHJhbnNpdGlvbmFsLCB7XG4gICAgICAgIHNpbGVudEpTT05QYXJzaW5nOiB2YWxpZGF0b3JzLnRyYW5zaXRpb25hbCh2YWxpZGF0b3JzLmJvb2xlYW4pLFxuICAgICAgICBmb3JjZWRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgICAgY2xhcmlmeVRpbWVvdXRFcnJvcjogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKVxuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXNTZXJpYWxpemVyICE9IG51bGwpIHtcbiAgICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHBhcmFtc1NlcmlhbGl6ZXIpKSB7XG4gICAgICAgIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyID0ge1xuICAgICAgICAgIHNlcmlhbGl6ZTogcGFyYW1zU2VyaWFsaXplclxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWxpZGF0b3IuYXNzZXJ0T3B0aW9ucyhwYXJhbXNTZXJpYWxpemVyLCB7XG4gICAgICAgICAgZW5jb2RlOiB2YWxpZGF0b3JzLmZ1bmN0aW9uLFxuICAgICAgICAgIHNlcmlhbGl6ZTogdmFsaWRhdG9ycy5mdW5jdGlvblxuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBTZXQgY29uZmlnLm1ldGhvZFxuICAgIGNvbmZpZy5tZXRob2QgPSAoY29uZmlnLm1ldGhvZCB8fCB0aGlzLmRlZmF1bHRzLm1ldGhvZCB8fCAnZ2V0JykudG9Mb3dlckNhc2UoKTtcblxuICAgIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICAgIGxldCBjb250ZXh0SGVhZGVycyA9IGhlYWRlcnMgJiYgdXRpbHMubWVyZ2UoXG4gICAgICBoZWFkZXJzLmNvbW1vbixcbiAgICAgIGhlYWRlcnNbY29uZmlnLm1ldGhvZF1cbiAgICApO1xuXG4gICAgaGVhZGVycyAmJiB1dGlscy5mb3JFYWNoKFxuICAgICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgICAobWV0aG9kKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBoZWFkZXJzW21ldGhvZF07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbmZpZy5oZWFkZXJzID0gQXhpb3NIZWFkZXJzLmNvbmNhdChjb250ZXh0SGVhZGVycywgaGVhZGVycyk7XG5cbiAgICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gICAgY29uc3QgcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4gPSBbXTtcbiAgICBsZXQgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIGlmICh0eXBlb2YgaW50ZXJjZXB0b3IucnVuV2hlbiA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnRlcmNlcHRvci5ydW5XaGVuKGNvbmZpZykgPT09IGZhbHNlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzICYmIGludGVyY2VwdG9yLnN5bmNocm9ub3VzO1xuXG4gICAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gICAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICAgIHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgbGV0IHByb21pc2U7XG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsZW47XG5cbiAgICBpZiAoIXN5bmNocm9ub3VzUmVxdWVzdEludGVyY2VwdG9ycykge1xuICAgICAgY29uc3QgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LmJpbmQodGhpcyksIHVuZGVmaW5lZF07XG4gICAgICBjaGFpbi51bnNoaWZ0LmFwcGx5KGNoYWluLCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgICBjaGFpbi5wdXNoLmFwcGx5KGNoYWluLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW4pO1xuICAgICAgbGVuID0gY2hhaW4ubGVuZ3RoO1xuXG4gICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW5baSsrXSwgY2hhaW5baSsrXSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cblxuICAgIGxlbiA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIGxldCBuZXdDb25maWcgPSBjb25maWc7XG5cbiAgICBpID0gMDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBjb25zdCBvbkZ1bGZpbGxlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluW2krK107XG4gICAgICBjb25zdCBvblJlamVjdGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW5baSsrXTtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBvblJlamVjdGVkLmNhbGwodGhpcywgZXJyb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcHJvbWlzZSA9IGRpc3BhdGNoUmVxdWVzdC5jYWxsKHRoaXMsIG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuXG4gICAgaSA9IDA7XG4gICAgbGVuID0gcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLmxlbmd0aDtcblxuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKHJlc3BvbnNlSW50ZXJjZXB0b3JDaGFpbltpKytdLCByZXNwb25zZUludGVyY2VwdG9yQ2hhaW5baSsrXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICBnZXRVcmkoY29uZmlnKSB7XG4gICAgY29uZmlnID0gbWVyZ2VDb25maWcodGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgICBjb25zdCBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICAgIHJldHVybiBidWlsZFVSTChmdWxsUGF0aCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpO1xuICB9XG59XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kLFxuICAgICAgdXJsLFxuICAgICAgZGF0YTogKGNvbmZpZyB8fCB7fSkuZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlSFRUUE1ldGhvZChpc0Zvcm0pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaHR0cE1ldGhvZCh1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgICAgbWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBpc0Zvcm0gPyB7XG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdtdWx0aXBhcnQvZm9ybS1kYXRhJ1xuICAgICAgICB9IDoge30sXG4gICAgICAgIHVybCxcbiAgICAgICAgZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEF4aW9zO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IENhbmNlbGVkRXJyb3IgZnJvbSAnLi9DYW5jZWxlZEVycm9yLmpzJztcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7Q2FuY2VsVG9rZW59XG4gKi9cbmNsYXNzIENhbmNlbFRva2VuIHtcbiAgY29uc3RydWN0b3IoZXhlY3V0b3IpIHtcbiAgICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgbGV0IHJlc29sdmVQcm9taXNlO1xuXG4gICAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHRva2VuID0gdGhpcztcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4oY2FuY2VsID0+IHtcbiAgICAgIGlmICghdG9rZW4uX2xpc3RlbmVycykgcmV0dXJuO1xuXG4gICAgICBsZXQgaSA9IHRva2VuLl9saXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgICB3aGlsZSAoaS0tID4gMCkge1xuICAgICAgICB0b2tlbi5fbGlzdGVuZXJzW2ldKGNhbmNlbCk7XG4gICAgICB9XG4gICAgICB0b2tlbi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgICB9KTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG4gICAgdGhpcy5wcm9taXNlLnRoZW4gPSBvbmZ1bGZpbGxlZCA9PiB7XG4gICAgICBsZXQgX3Jlc29sdmU7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICB0b2tlbi5zdWJzY3JpYmUocmVzb2x2ZSk7XG4gICAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgICBwcm9taXNlLmNhbmNlbCA9IGZ1bmN0aW9uIHJlamVjdCgpIHtcbiAgICAgICAgdG9rZW4udW5zdWJzY3JpYmUoX3Jlc29sdmUpO1xuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcblxuICAgIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlLCBjb25maWcsIHJlcXVlc3QpIHtcbiAgICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSwgY29uZmlnLCByZXF1ZXN0KTtcbiAgICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gICAqL1xuICB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICAgIGlmICh0aGlzLnJlYXNvbikge1xuICAgICAgdGhyb3cgdGhpcy5yZWFzb247XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZSB0byB0aGUgY2FuY2VsIHNpZ25hbFxuICAgKi9cblxuICBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICAgIGxpc3RlbmVyKHRoaXMucmVhc29uKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbGlzdGVuZXJzKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xpc3RlbmVycyA9IFtsaXN0ZW5lcl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAgICovXG5cbiAgdW5zdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICAgKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICAgKi9cbiAgc3RhdGljIHNvdXJjZSgpIHtcbiAgICBsZXQgY2FuY2VsO1xuICAgIGNvbnN0IHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICAgIGNhbmNlbCA9IGM7XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuLFxuICAgICAgY2FuY2VsXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYW5jZWxUb2tlbjtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IHV0aWxzIGZyb20gJy4vLi4vdXRpbHMuanMnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3NcbiAqXG4gKiBAcGFyYW0geyp9IHBheWxvYWQgVGhlIHZhbHVlIHRvIHRlc3RcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc0F4aW9zRXJyb3IocGF5bG9hZCkge1xuICByZXR1cm4gdXRpbHMuaXNPYmplY3QocGF5bG9hZCkgJiYgKHBheWxvYWQuaXNBeGlvc0Vycm9yID09PSB0cnVlKTtcbn1cbiIsICJjb25zdCBIdHRwU3RhdHVzQ29kZSA9IHtcbiAgQ29udGludWU6IDEwMCxcbiAgU3dpdGNoaW5nUHJvdG9jb2xzOiAxMDEsXG4gIFByb2Nlc3Npbmc6IDEwMixcbiAgRWFybHlIaW50czogMTAzLFxuICBPazogMjAwLFxuICBDcmVhdGVkOiAyMDEsXG4gIEFjY2VwdGVkOiAyMDIsXG4gIE5vbkF1dGhvcml0YXRpdmVJbmZvcm1hdGlvbjogMjAzLFxuICBOb0NvbnRlbnQ6IDIwNCxcbiAgUmVzZXRDb250ZW50OiAyMDUsXG4gIFBhcnRpYWxDb250ZW50OiAyMDYsXG4gIE11bHRpU3RhdHVzOiAyMDcsXG4gIEFscmVhZHlSZXBvcnRlZDogMjA4LFxuICBJbVVzZWQ6IDIyNixcbiAgTXVsdGlwbGVDaG9pY2VzOiAzMDAsXG4gIE1vdmVkUGVybWFuZW50bHk6IDMwMSxcbiAgRm91bmQ6IDMwMixcbiAgU2VlT3RoZXI6IDMwMyxcbiAgTm90TW9kaWZpZWQ6IDMwNCxcbiAgVXNlUHJveHk6IDMwNSxcbiAgVW51c2VkOiAzMDYsXG4gIFRlbXBvcmFyeVJlZGlyZWN0OiAzMDcsXG4gIFBlcm1hbmVudFJlZGlyZWN0OiAzMDgsXG4gIEJhZFJlcXVlc3Q6IDQwMCxcbiAgVW5hdXRob3JpemVkOiA0MDEsXG4gIFBheW1lbnRSZXF1aXJlZDogNDAyLFxuICBGb3JiaWRkZW46IDQwMyxcbiAgTm90Rm91bmQ6IDQwNCxcbiAgTWV0aG9kTm90QWxsb3dlZDogNDA1LFxuICBOb3RBY2NlcHRhYmxlOiA0MDYsXG4gIFByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZDogNDA3LFxuICBSZXF1ZXN0VGltZW91dDogNDA4LFxuICBDb25mbGljdDogNDA5LFxuICBHb25lOiA0MTAsXG4gIExlbmd0aFJlcXVpcmVkOiA0MTEsXG4gIFByZWNvbmRpdGlvbkZhaWxlZDogNDEyLFxuICBQYXlsb2FkVG9vTGFyZ2U6IDQxMyxcbiAgVXJpVG9vTG9uZzogNDE0LFxuICBVbnN1cHBvcnRlZE1lZGlhVHlwZTogNDE1LFxuICBSYW5nZU5vdFNhdGlzZmlhYmxlOiA0MTYsXG4gIEV4cGVjdGF0aW9uRmFpbGVkOiA0MTcsXG4gIEltQVRlYXBvdDogNDE4LFxuICBNaXNkaXJlY3RlZFJlcXVlc3Q6IDQyMSxcbiAgVW5wcm9jZXNzYWJsZUVudGl0eTogNDIyLFxuICBMb2NrZWQ6IDQyMyxcbiAgRmFpbGVkRGVwZW5kZW5jeTogNDI0LFxuICBUb29FYXJseTogNDI1LFxuICBVcGdyYWRlUmVxdWlyZWQ6IDQyNixcbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQ6IDQyOCxcbiAgVG9vTWFueVJlcXVlc3RzOiA0MjksXG4gIFJlcXVlc3RIZWFkZXJGaWVsZHNUb29MYXJnZTogNDMxLFxuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29uczogNDUxLFxuICBJbnRlcm5hbFNlcnZlckVycm9yOiA1MDAsXG4gIE5vdEltcGxlbWVudGVkOiA1MDEsXG4gIEJhZEdhdGV3YXk6IDUwMixcbiAgU2VydmljZVVuYXZhaWxhYmxlOiA1MDMsXG4gIEdhdGV3YXlUaW1lb3V0OiA1MDQsXG4gIEh0dHBWZXJzaW9uTm90U3VwcG9ydGVkOiA1MDUsXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlczogNTA2LFxuICBJbnN1ZmZpY2llbnRTdG9yYWdlOiA1MDcsXG4gIExvb3BEZXRlY3RlZDogNTA4LFxuICBOb3RFeHRlbmRlZDogNTEwLFxuICBOZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZDogNTExLFxufTtcblxuT2JqZWN0LmVudHJpZXMoSHR0cFN0YXR1c0NvZGUpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICBIdHRwU3RhdHVzQ29kZVt2YWx1ZV0gPSBrZXk7XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgSHR0cFN0YXR1c0NvZGU7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgdXRpbHMgZnJvbSAnLi91dGlscy5qcyc7XG5pbXBvcnQgYmluZCBmcm9tICcuL2hlbHBlcnMvYmluZC5qcyc7XG5pbXBvcnQgQXhpb3MgZnJvbSAnLi9jb3JlL0F4aW9zLmpzJztcbmltcG9ydCBtZXJnZUNvbmZpZyBmcm9tICcuL2NvcmUvbWVyZ2VDb25maWcuanMnO1xuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vZGVmYXVsdHMvaW5kZXguanMnO1xuaW1wb3J0IGZvcm1EYXRhVG9KU09OIGZyb20gJy4vaGVscGVycy9mb3JtRGF0YVRvSlNPTi5qcyc7XG5pbXBvcnQgQ2FuY2VsZWRFcnJvciBmcm9tICcuL2NhbmNlbC9DYW5jZWxlZEVycm9yLmpzJztcbmltcG9ydCBDYW5jZWxUb2tlbiBmcm9tICcuL2NhbmNlbC9DYW5jZWxUb2tlbi5qcyc7XG5pbXBvcnQgaXNDYW5jZWwgZnJvbSAnLi9jYW5jZWwvaXNDYW5jZWwuanMnO1xuaW1wb3J0IHtWRVJTSU9OfSBmcm9tICcuL2Vudi9kYXRhLmpzJztcbmltcG9ydCB0b0Zvcm1EYXRhIGZyb20gJy4vaGVscGVycy90b0Zvcm1EYXRhLmpzJztcbmltcG9ydCBBeGlvc0Vycm9yIGZyb20gJy4vY29yZS9BeGlvc0Vycm9yLmpzJztcbmltcG9ydCBzcHJlYWQgZnJvbSAnLi9oZWxwZXJzL3NwcmVhZC5qcyc7XG5pbXBvcnQgaXNBeGlvc0Vycm9yIGZyb20gJy4vaGVscGVycy9pc0F4aW9zRXJyb3IuanMnO1xuaW1wb3J0IEF4aW9zSGVhZGVycyBmcm9tIFwiLi9jb3JlL0F4aW9zSGVhZGVycy5qc1wiO1xuaW1wb3J0IGFkYXB0ZXJzIGZyb20gJy4vYWRhcHRlcnMvYWRhcHRlcnMuanMnO1xuaW1wb3J0IEh0dHBTdGF0dXNDb2RlIGZyb20gJy4vaGVscGVycy9IdHRwU3RhdHVzQ29kZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJucyB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgY29uc3QgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgY29uc3QgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCwge2FsbE93bktleXM6IHRydWV9KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0LCBudWxsLCB7YWxsT3duS2V5czogdHJ1ZX0pO1xuXG4gIC8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbiAgaW5zdGFuY2UuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKG1lcmdlQ29uZmlnKGRlZmF1bHRDb25maWcsIGluc3RhbmNlQ29uZmlnKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbmNvbnN0IGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IENhbmNlbGVkRXJyb3I7XG5heGlvcy5DYW5jZWxUb2tlbiA9IENhbmNlbFRva2VuO1xuYXhpb3MuaXNDYW5jZWwgPSBpc0NhbmNlbDtcbmF4aW9zLlZFUlNJT04gPSBWRVJTSU9OO1xuYXhpb3MudG9Gb3JtRGF0YSA9IHRvRm9ybURhdGE7XG5cbi8vIEV4cG9zZSBBeGlvc0Vycm9yIGNsYXNzXG5heGlvcy5BeGlvc0Vycm9yID0gQXhpb3NFcnJvcjtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5cbmF4aW9zLnNwcmVhZCA9IHNwcmVhZDtcblxuLy8gRXhwb3NlIGlzQXhpb3NFcnJvclxuYXhpb3MuaXNBeGlvc0Vycm9yID0gaXNBeGlvc0Vycm9yO1xuXG4vLyBFeHBvc2UgbWVyZ2VDb25maWdcbmF4aW9zLm1lcmdlQ29uZmlnID0gbWVyZ2VDb25maWc7XG5cbmF4aW9zLkF4aW9zSGVhZGVycyA9IEF4aW9zSGVhZGVycztcblxuYXhpb3MuZm9ybVRvSlNPTiA9IHRoaW5nID0+IGZvcm1EYXRhVG9KU09OKHV0aWxzLmlzSFRNTEZvcm0odGhpbmcpID8gbmV3IEZvcm1EYXRhKHRoaW5nKSA6IHRoaW5nKTtcblxuYXhpb3MuZ2V0QWRhcHRlciA9IGFkYXB0ZXJzLmdldEFkYXB0ZXI7XG5cbmF4aW9zLkh0dHBTdGF0dXNDb2RlID0gSHR0cFN0YXR1c0NvZGU7XG5cbmF4aW9zLmRlZmF1bHQgPSBheGlvcztcblxuLy8gdGhpcyBtb2R1bGUgc2hvdWxkIG9ubHkgaGF2ZSBhIGRlZmF1bHQgZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBheGlvc1xuIiwgImltcG9ydCBheGlvcyBmcm9tICcuL2xpYi9heGlvcy5qcyc7XG5cbi8vIFRoaXMgbW9kdWxlIGlzIGludGVuZGVkIHRvIHVud3JhcCBBeGlvcyBkZWZhdWx0IGV4cG9ydCBhcyBuYW1lZC5cbi8vIEtlZXAgdG9wLWxldmVsIGV4cG9ydCBzYW1lIHdpdGggc3RhdGljIHByb3BlcnRpZXNcbi8vIHNvIHRoYXQgaXQgY2FuIGtlZXAgc2FtZSB3aXRoIGVzIG1vZHVsZSBvciBjanNcbmNvbnN0IHtcbiAgQXhpb3MsXG4gIEF4aW9zRXJyb3IsXG4gIENhbmNlbGVkRXJyb3IsXG4gIGlzQ2FuY2VsLFxuICBDYW5jZWxUb2tlbixcbiAgVkVSU0lPTixcbiAgYWxsLFxuICBDYW5jZWwsXG4gIGlzQXhpb3NFcnJvcixcbiAgc3ByZWFkLFxuICB0b0Zvcm1EYXRhLFxuICBBeGlvc0hlYWRlcnMsXG4gIEh0dHBTdGF0dXNDb2RlLFxuICBmb3JtVG9KU09OLFxuICBnZXRBZGFwdGVyLFxuICBtZXJnZUNvbmZpZ1xufSA9IGF4aW9zO1xuXG5leHBvcnQge1xuICBheGlvcyBhcyBkZWZhdWx0LFxuICBBeGlvcyxcbiAgQXhpb3NFcnJvcixcbiAgQ2FuY2VsZWRFcnJvcixcbiAgaXNDYW5jZWwsXG4gIENhbmNlbFRva2VuLFxuICBWRVJTSU9OLFxuICBhbGwsXG4gIENhbmNlbCxcbiAgaXNBeGlvc0Vycm9yLFxuICBzcHJlYWQsXG4gIHRvRm9ybURhdGEsXG4gIEF4aW9zSGVhZGVycyxcbiAgSHR0cFN0YXR1c0NvZGUsXG4gIGZvcm1Ub0pTT04sXG4gIGdldEFkYXB0ZXIsXG4gIG1lcmdlQ29uZmlnXG59XG4iLCAiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xyXG5leHBvcnQgZnVuY3Rpb24gZG9SZXF1ZXN0KHJlcXVlc3RCb2R5OiBhbnkpIHtcclxuXHR0cnkge1xyXG5cdCAgY29uc3QgcHJvbWlzZSA9IGF4aW9zLnBvc3QocmVxdWVzdEJvZHkudXJsLCByZXF1ZXN0Qm9keS5ib2R5LCB7IGhlYWRlcnM6IHJlcXVlc3RCb2R5LmhlYWRlcnMgfSk7XHJcblx0ICBjb25zdCBkYXRhcHJvbWlzZSA9IHByb21pc2UudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmRhdGEpXHJcblx0ICByZXR1cm4gZGF0YXByb21pc2U7XHJcblx0fSBjYXRjaCAoZXJyb3JzKSB7XHJcblx0ICBjb25zb2xlLmVycm9yKGVycm9ycyk7XHJcblx0ICByZXR1cm4gdW5kZWZpbmVkOyAvLyBSZXR1cm4gdW5kZWZpbmVkIGluIGNhc2Ugb2YgYW4gZXJyb3JcclxuXHR9XHJcbiAgfSIsICJpbXBvcnQgeyBkb1JlcXVlc3QgfSBmcm9tIFwiLi91dGlsc1wiXHJcblxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBBY2NvdW50IHtcclxuXHJcbiAgICBhc3luYyBhY2NvdW50KGZ1bmM6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgdXNlcmRhdGE/OmFueSkge1xyXG5cclxuICAgICAgICBsZXQgZ2FtZVJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uOiBmdW5jLFxyXG4gICAgICAgICAgICB1c2VybmFtZTogdXNlcm5hbWUsXHJcbiAgICAgICAgICAgIFVzZXJkYXRhOnVzZXJkYXRhIFxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9jN3c0c285dHE0LmV4ZWN1dGUtYXBpLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbS9zZWNvbmQvY2NcIixcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGdhbWVSZXF1ZXN0KVxyXG4gICAgICAgICAgICAvLyBxczoge1xyXG4gICAgICAgICAgICAvLyAgICAgYmV0OiBiZXRcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGdhbWVSZXNwb25zZSA9IGF3YWl0IGRvUmVxdWVzdChvcHRpb25zKTtcclxuICAgICAgICAgICAgcmV0dXJuIGdhbWVSZXNwb25zZVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnIpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCAiaW1wb3J0IHsgZG9SZXF1ZXN0IH0gZnJvbSBcIi4vdXRpbHNcIjtcclxuZXhwb3J0IGNsYXNzIEdhbWUge1xyXG4gICAgYXN5bmMgcGxheShiZXQ6IG51bWJlcltdKSB7XHJcbiAgICAgICAgbGV0IGdhbWVSZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICBiZXRzOiBiZXRcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHVybDogXCJodHRwczovL2M3dzRzbzl0cTQuZXhlY3V0ZS1hcGkuYXAtc291dGgtMS5hbWF6b25hd3MuY29tL3NlY29uZC9maXJzdFwiLFxyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZ2FtZVJlcXVlc3QpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgZ2FtZVJlc3BvbnNlID0gYXdhaXQgZG9SZXF1ZXN0KG9wdGlvbnMpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2FtZVJlc3BvbnNlXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycikpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCAiaW1wb3J0IHsgQWNjb3VudCB9IGZyb20gXCIuL2FjY1wiO1xyXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xyXG5sZXQgYWNjID0gbmV3IEFjY291bnQoKTtcclxubGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xyXG5pbnRlcmZhY2UgR2FtZU91dHB1dCB7XHJcbiAgICBtYXRyaXg6IHN0cmluZ1tdW10sXHJcbiAgICB3aW5uaW5nczogbnVtYmVyXHJcbn1cclxubGV0IHVzZXJuYW1lID0gXCJub25lXCJcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgYm9keUlkID0gZG9jdW1lbnQuYm9keS5pZDtcclxuICAgIGNvbnN0IHNwaW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0YnV0dG9uJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBjb25zdCB1c2VybmFtZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9naW4tdXNlcm5hbWUnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgY29uc3QgcGFzc3dvcmRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ2luLXBhc3N3b3JkJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIGNvbnN0IHVzZXJuYW1lRWxlbWVudDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnVwLXVzZXJuYW1lJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIGNvbnN0IHBhc3N3b3JkRWxlbWVudDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbnVwLXBhc3N3b3JkJykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgIGNvbnN0IHNpZ25pbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdMb2dJbicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgY29uc3Qgc2lnbnVwQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ1NpZ24tdXAnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIGNvbnN0IGJhbmtiYWxhbmNlRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5rYmFsYW5jZScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3QgYmFua0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFuaycpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBjb25zdCBiZXRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JldC1hbW91bnQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgY29uc3QgYmV0Um93c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmV0LXJvd3MnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgY29uc3QgQmFua0FkZEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYW5rYWRkJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBjb25zdCBzbG90UmVzdWx0c0VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xvdCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgY29uc3Qgc3RhdHVzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0dXMnKSBhcyBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBpZiAoYm9keUlkID09PSBcImhvbWVcIikge1xyXG4gICAgICAgIGNvbnN0IHN0b3JlZHVzZXJuYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXJuYW1lJyk7XHJcbiAgICAgICAgaWYgKHN0b3JlZHVzZXJuYW1lKSB7XHJcbiAgICAgICAgICAgIHVzZXJuYW1lID0gc3RvcmVkdXNlcm5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFjYy5hY2NvdW50KFwiZ2V0QmFua0JhbGFuY2VcIiwgdXNlcm5hbWUpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBsZXQgYmFua2JhbCA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcclxuICAgICAgICAgICAgYmFua2JhbGFuY2VFbGVtZW50LnRleHRDb250ZW50ID0gYEJhbmsgYmFsYW5jZTogJCR7YmFua2JhbH1gO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIEJhbmtBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBiYW5rOiBudW1iZXIgPSBwYXJzZUZsb2F0KGJhbmtFbGVtZW50LnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKHVzZXJuYW1lID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcInNpZ24gaW4gb3Igc2lnbiB1cCB0byBzdGFydCB0aGUgZ2FtZSFcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChiYW5rIDwgMTAwMDAwMDAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2MuYWNjb3VudChcIkJhbmtBZGRXaWRcIiwgdXNlcm5hbWUsIGJhbmspO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGJhbmsgPj0gMTAwMDAwMDAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkFtb3VudCB0b28gaGlnaCFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhY2MuYWNjb3VudChcImdldEJhbmtCYWxhbmNlXCIsIHVzZXJuYW1lKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGJhbmtiYWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhbmtiYWwgPSByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFua2JhbGFuY2VFbGVtZW50LnRleHRDb250ZW50ID0gYEJhbmsgYmFsYW5jZTogJCR7YmFua2JhbH1gO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNwaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJldHZhbHVlID0gcGFyc2VGbG9hdChiZXRFbGVtZW50LnZhbHVlKTtcclxuICAgICAgICAgICAgY29uc3QgYmV0cm93cyA9IHBhcnNlRmxvYXQoYmV0Um93c0VsZW1lbnQudmFsdWUpO1xyXG4gICAgICAgICAgICBjb25zdCBiZXQ6IG51bWJlcltdID0gQXJyYXkoYmV0cm93cykuZmlsbChiZXR2YWx1ZSk7XHJcbiAgICAgICAgICAgIGxldCBiYW5rYmFsO1xyXG4gICAgICAgICAgICBhY2MuYWNjb3VudChcImdldEJhbmtCYWxhbmNlXCIsIHVzZXJuYW1lKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxyXG4gICAgICAgICAgICAgICAgYmFua2JhbCA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJldCA+IGJhbmtiYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIk5vdCBlbm91Z2ggYmFsYW5jZSFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGJhbmtiYWwgPCAxMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiQXQgbGVhc3QgJDEwIHNob3VsZCBiZSBkZXBvc2l0ZWQgdG8gcGxheSB0aGUgZ2FtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdhbWUucGxheShiZXQpLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYmVvdXRwdXQgPSByZXMgYXMgR2FtZU91dHB1dFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2xvdCA9IGJlb3V0cHV0Lm1hdHJpeDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG91dHB1dCA9IGJlb3V0cHV0Lndpbm5pbmdzO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzbG90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xvdFJlc3VsdHNFbGVtZW50LmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbG90LmZvckVhY2gocm93ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93RGl2LmNsYXNzTGlzdC5hZGQoJ3Nsb3Qtcm93Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cuZm9yRWFjaChjZWxsID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbERpdi5jbGFzc0xpc3QuYWRkKCdzbG90LWNlbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsRGl2LnRleHRDb250ZW50ID0gY2VsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dEaXYuYXBwZW5kQ2hpbGQoY2VsbERpdik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsb3RSZXN1bHRzRWxlbWVudC5hcHBlbmRDaGlsZChyb3dEaXYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvdXRwdXQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXNFbGVtZW50LnRleHRDb250ZW50ID0gYFlvdSB3b24gJCR7b3V0cHV0fSFgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjLmFjY291bnQoXCJCYW5rQWRkV2lkXCIsIHVzZXJuYW1lLCBvdXRwdXQpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYW5rYmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhbmtiYWwgPSByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5rYmFsYW5jZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgQmFuayBiYWxhbmNlOiAkJHtiYW5rYmFsfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdHVzRWxlbWVudC50ZXh0Q29udGVudCA9IGBZb3UgbG9zdCAkJHtiZXR2YWx1ZSAqIGJldHJvd3N9LCBrZWVwIHRyeWluZyFgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWNjLmFjY291bnQoXCJCYW5rQWRkV2lkXCIsIHVzZXJuYW1lLCBiZXR2YWx1ZSAqIGJldHJvd3MpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBiYW5rYmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhbmtiYWwgPSByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYW5rYmFsYW5jZUVsZW1lbnQudGV4dENvbnRlbnQgPSBgQmFuayBiYWxhbmNlOiAkJHtiYW5rYmFsfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoYm9keUlkID09PSBcInNpZ24taW5cIikge1xyXG5cclxuICAgICAgICBpZiAoc2lnbmluQnV0dG9uKSB7XHJcbiAgICAgICAgICAgIHNpZ25pbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB1c2VyID0gdXNlcm5hbWVFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhc3N3b3JkID0gcGFzc3dvcmRFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYWNjLmFjY291bnQoXCJVc2VyVmVyaWZ5XCIsIHVzZXIsIHBhc3N3b3JkKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcm5hbWUgPSB1c2VyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdob21lLmh0bWwnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcm5hbWUnLCB1c2VybmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZSBvciBwYXNzd29yZCBpbmNvcnJlY3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNpZ251cEJ1dHRvbikge1xyXG4gICAgICAgICAgICBzaWdudXBCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdXNlciA9IHVzZXJuYW1lRWxlbWVudDEudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFzc3dvcmQgPSBwYXNzd29yZEVsZW1lbnQxLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYWNjLmFjY291bnQoXCJVc2VyQWRkXCIsIHVzZXIsIHBhc3N3b3JkKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IFwiVXNlciBpcyBhZGRlZCBzdWNjZXNzZnVsbHlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VybmFtZSA9IHVzZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2hvbWUuaHRtbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJVc2VybmFtZSBhbHJlYWR5IGV4aXN0c1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFFZSxXQUFSLEtBQXNCLElBQUksU0FBUztBQUN4QyxXQUFPLGdDQUFTLE9BQU87QUFDckIsYUFBTyxHQUFHLE1BQU0sU0FBUyxTQUFTO0FBQUEsSUFDcEMsR0FGTztBQUFBLEVBR1Q7QUFKd0I7OztBQ0l4QixNQUFNLEVBQUMsU0FBUSxJQUFJLE9BQU87QUFDMUIsTUFBTSxFQUFDLGVBQWMsSUFBSTtBQUV6QixNQUFNLFVBQVUsV0FBUyxXQUFTO0FBQzlCLFVBQU0sTUFBTSxTQUFTLEtBQUssS0FBSztBQUMvQixXQUFPLE1BQU0sU0FBUyxNQUFNLE9BQU8sSUFBSSxNQUFNLEdBQUcsRUFBRSxFQUFFLFlBQVk7QUFBQSxFQUNwRSxHQUFHLHVCQUFPLE9BQU8sSUFBSSxDQUFDO0FBRXRCLE1BQU0sYUFBYSx3QkFBQyxTQUFTO0FBQzNCLFdBQU8sS0FBSyxZQUFZO0FBQ3hCLFdBQU8sQ0FBQyxVQUFVLE9BQU8sS0FBSyxNQUFNO0FBQUEsRUFDdEMsR0FIbUI7QUFLbkIsTUFBTSxhQUFhLGlDQUFRLFdBQVMsT0FBTyxVQUFVLE1BQWxDO0FBU25CLE1BQU0sRUFBQyxRQUFPLElBQUk7QUFTbEIsTUFBTSxjQUFjLFdBQVcsV0FBVztBQVMxQyxXQUFTLFNBQVMsS0FBSztBQUNyQixXQUFPLFFBQVEsUUFBUSxDQUFD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QUEsUUFDTCxDQUFDO0FBQUEsTUFDTDtBQUFBLElBRUo7QUFBQSxFQUNKLENBQUM7IiwKICAibmFtZXMiOiBbInByb3RvdHlwZSIsICJkZXNjcmlwdG9ycyIsICJmaWx0ZXIiLCAiaGFzT3duUHJvcGVydHkiLCAiZmlsdGVyIiwgInByb3RvdHlwZSIsICJ0b1N0cmluZyIsICJlbmNvZGUiLCAiaXNGb3JtRGF0YSIsICJpc0ZpbGVMaXN0IiwgInRyYW5zaXRpb25hbCIsICJmaWx0ZXIiLCAic2VsZiIsICJwcm90b3R5cGUiLCAidmFsaWRhdGVTdGF0dXMiLCAibWVyZ2UiLCAidHJhbnNpdGlvbmFsIiwgInNpZ25hbCIsICJlbmNvZGUiLCAicmVzIiwgInZhbGlkYXRvcnMiLCAidHJhbnNpdGlvbmFsIiwgIkF4aW9zIiwgIkF4aW9zRXJyb3IiLCAiQ2FuY2VsZWRFcnJvciIsICJpc0NhbmNlbCIsICJDYW5jZWxUb2tlbiIsICJWRVJTSU9OIiwgImFsbCIsICJpc0F4aW9zRXJyb3IiLCAic3ByZWFkIiwgInRvRm9ybURhdGEiLCAiQXhpb3NIZWFkZXJzIiwgIkh0dHBTdGF0dXNDb2RlIiwgIm1lcmdlQ29uZmlnIiwgInVzZXJuYW1lIiwgInJlc3BvbnNlIiwgImJhbmtiYWwiXQp9Cg==
