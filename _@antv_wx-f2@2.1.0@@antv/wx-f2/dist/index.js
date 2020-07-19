(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	var interopRequireWildcard = createCommonjsModule(function (module) {
	function _getRequireWildcardCache() {
	  if (typeof WeakMap !== "function") return null;
	  var cache = new WeakMap();

	  _getRequireWildcardCache = function _getRequireWildcardCache() {
	    return cache;
	  };

	  return cache;
	}

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  }

	  if (obj === null || _typeof_1(obj) !== "object" && typeof obj !== "function") {
	    return {
	      "default": obj
	    };
	  }

	  var cache = _getRequireWildcardCache();

	  if (cache && cache.has(obj)) {
	    return cache.get(obj);
	  }

	  var newObj = {};
	  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) {
	      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

	      if (desc && (desc.get || desc.set)) {
	        Object.defineProperty(newObj, key, desc);
	      } else {
	        newObj[key] = obj[key];
	      }
	    }
	  }

	  newObj["default"] = obj;

	  if (cache) {
	    cache.set(obj, newObj);
	  }

	  return newObj;
	}

	module.exports = _interopRequireWildcard;
	});

	unwrapExports(interopRequireWildcard);

	var isArrayLike = function (value) {
	    /**
	     * isArrayLike([1, 2, 3]) => true
	     * isArrayLike(document.body.children) => true
	     * isArrayLike('abc') => true
	     * isArrayLike(Function) => false
	     */
	    return value !== null && typeof value !== 'function' && isFinite(value.length);
	};

	var contains = function (arr, value) {
	    if (!isArrayLike(arr)) {
	        return false;
	    }
	    return arr.indexOf(value) > -1;
	};

	var filter = function (arr, func) {
	    if (!isArrayLike(arr)) {
	        return arr;
	    }
	    var result = [];
	    for (var index = 0; index < arr.length; index++) {
	        var value = arr[index];
	        if (func(value, index)) {
	            result.push(value);
	        }
	    }
	    return result;
	};

	/**
	 * Flattens `array` a single level deep.
	 *
	 * @param {Array} arr The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @return {Array} Returns the new array of filtered values.
	 * @example
	 * difference([2, 1], [2, 3]);  // => [1]
	 */
	var difference = function (arr, values) {
	    if (values === void 0) { values = []; }
	    return filter(arr, function (value) { return !contains(values, value); });
	};

	var toString = {}.toString;
	var isType = function (value, type) { return toString.call(value) === '[object ' + type + ']'; };

	/**
	 * 是否为函数
	 * @param  {*} fn 对象
	 * @return {Boolean}  是否函数
	 */
	var isFunction = (function (value) {
	    return isType(value, 'Function');
	});

	// isFinite,
	var isNil = function (value) {
	    /**
	     * isNil(null) => true
	     * isNil() => true
	     */
	    return value === null || value === undefined;
	};

	var isArray = (function (value) {
	    return Array.isArray ?
	        Array.isArray(value) :
	        isType(value, 'Array');
	});

	var isObject = (function (value) {
	    /**
	     * isObject({}) => true
	     * isObject([1, 2, 3]) => true
	     * isObject(Function) => true
	     * isObject(null) => false
	     */
	    var type = typeof value;
	    return value !== null && type === 'object' || type === 'function';
	});

	function each(elements, func) {
	    if (!elements) {
	        return;
	    }
	    var rst;
	    if (isArray(elements)) {
	        for (var i = 0, len = elements.length; i < len; i++) {
	            rst = func(elements[i], i);
	            if (rst === false) {
	                break;
	            }
	        }
	    }
	    else if (isObject(elements)) {
	        for (var k in elements) {
	            if (elements.hasOwnProperty(k)) {
	                rst = func(elements[k], k);
	                if (rst === false) {
	                    break;
	                }
	            }
	        }
	    }
	}

	var keys = Object.keys ? function (obj) { return Object.keys(obj); } : function (obj) {
	    var result = [];
	    each(obj, function (value, key) {
	        if (!(isFunction(obj) && key === 'prototype')) {
	            result.push(key);
	        }
	    });
	    return result;
	};

	function isMatch(obj, attrs) {
	    var _keys = keys(attrs);
	    var length = _keys.length;
	    if (isNil(obj))
	        return !length;
	    for (var i = 0; i < length; i += 1) {
	        var key = _keys[i];
	        if (attrs[key] !== obj[key] || !(key in obj)) {
	            return false;
	        }
	    }
	    return true;
	}

	var isObjectLike = function (value) {
	    /**
	     * isObjectLike({}) => true
	     * isObjectLike([1, 2, 3]) => true
	     * isObjectLike(Function) => false
	     * isObjectLike(null) => false
	     */
	    return typeof value === 'object' && value !== null;
	};

	var isPlainObject = function (value) {
	    /**
	     * isObjectLike(new Foo) => false
	     * isObjectLike([1, 2, 3]) => false
	     * isObjectLike({ x: 0, y: 0 }) => true
	     * isObjectLike(Object.create(null)) => true
	     */
	    if (!isObjectLike(value) || !isType(value, 'Object')) {
	        return false;
	    }
	    if (Object.getPrototypeOf(value) === null) {
	        return true;
	    }
	    var proto = value;
	    while (Object.getPrototypeOf(proto) !== null) {
	        proto = Object.getPrototypeOf(proto);
	    }
	    return Object.getPrototypeOf(value) === proto;
	};

	function find(arr, predicate) {
	    if (!isArray(arr))
	        return null;
	    var _predicate;
	    if (isFunction(predicate)) {
	        _predicate = predicate;
	    }
	    if (isPlainObject(predicate)) {
	        _predicate = function (a) { return isMatch(a, predicate); };
	    }
	    if (_predicate) {
	        for (var i = 0; i < arr.length; i += 1) {
	            if (_predicate(arr[i])) {
	                return arr[i];
	            }
	        }
	    }
	    return null;
	}

	function findIndex(arr, predicate, fromIndex) {
	    if (fromIndex === void 0) { fromIndex = 0; }
	    for (var i = fromIndex; i < arr.length; i++) {
	        if (predicate(arr[i], i)) {
	            // 找到终止循环
	            return i;
	        }
	    }
	    return -1;
	}

	var firstValue = function (data, name) {
	    var rst = null;
	    for (var i = 0; i < data.length; i++) {
	        var obj = data[i];
	        var value = obj[name];
	        if (!isNil(value)) {
	            if (isArray(value)) {
	                rst = value[0]; // todo 这里是否应该使用递归，调用 firstValue @绝云
	            }
	            else {
	                rst = value;
	            }
	            break;
	        }
	    }
	    return rst;
	};

	/**
	 * Flattens `array` a single level deep.
	 *
	 * @param {Array} arr The array to flatten.
	 * @return {Array} Returns the new flattened array.
	 * @example
	 *
	 * flatten([1, [2, [3, [4]], 5]]);  // => [1, 2, [3, [4]], 5]
	 */
	var flatten = function (arr) {
	    if (!isArray(arr)) {
	        return [];
	    }
	    var rst = [];
	    for (var i = 0; i < arr.length; i++) {
	        rst = rst.concat(arr[i]);
	    }
	    return rst;
	};

	/**
	 * Flattens `array` a single level deep.
	 *
	 * @param {Array} arr The array to flatten.
	 * @param {Array} result The array to return.
	 * @return {Array} Returns the new flattened array.
	 * @example
	 *
	 * flattenDeep([1, [2, [3, [4]], 5]]);  // => [1, 2, 3, 4, 5]
	 */
	var flattenDeep = function (arr, result) {
	    if (result === void 0) { result = []; }
	    if (!isArray(arr)) {
	        result.push(arr);
	    }
	    else {
	        for (var i = 0; i < arr.length; i += 1) {
	            flattenDeep(arr[i], result);
	        }
	    }
	    return result;
	};

	var getRange = function (values) {
	    // 存在 NaN 时，min,max 判定会出问题
	    var filterValues = values.filter(function (v) { return !isNaN(v); });
	    if (!filterValues.length) { // 如果没有数值则直接返回0
	        return {
	            min: 0,
	            max: 0,
	        };
	    }
	    if (isArray(values[0])) {
	        var tmp = [];
	        for (var i = 0; i < values.length; i++) {
	            tmp = tmp.concat(values[i]);
	        }
	        filterValues = tmp;
	    }
	    var max = Math.max.apply(null, filterValues);
	    var min = Math.min.apply(null, filterValues);
	    return {
	        min: min,
	        max: max,
	    };
	};

	var arrPrototype = Array.prototype;
	var splice = arrPrototype.splice;
	var indexOf = arrPrototype.indexOf;
	var pull = function (arr) {
	    var values = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        values[_i - 1] = arguments[_i];
	    }
	    for (var i = 0; i < values.length; i++) {
	        var value = values[i];
	        var fromIndex = -1;
	        while ((fromIndex = indexOf.call(arr, value)) > -1) {
	            splice.call(arr, fromIndex, 1);
	        }
	    }
	    return arr;
	};

	var splice$1 = Array.prototype.splice;
	var pullAt = function pullAt(arr, indexes) {
	    if (!isArrayLike(arr)) {
	        return [];
	    }
	    var length = arr ? indexes.length : 0;
	    var last = length - 1;
	    while (length--) {
	        var previous = void 0;
	        var index = indexes[length];
	        if (length === last || index !== previous) {
	            previous = index;
	            splice$1.call(arr, index, 1);
	        }
	    }
	    return arr;
	};

	var reduce = function (arr, fn, init) {
	    if (!isArray(arr) && !isPlainObject(arr)) {
	        return arr;
	    }
	    var result = init;
	    each(arr, function (data, i) {
	        result = fn(result, data, i);
	    });
	    return result;
	};

	var remove = function (arr, predicate) {
	    /**
	     * const arr = [1, 2, 3, 4]
	     * const evens = remove(arr, n => n % 2 == 0)
	     * console.log(arr) // => [1, 3]
	     * console.log(evens) // => [2, 4]
	     */
	    var result = [];
	    if (!isArrayLike(arr)) {
	        return result;
	    }
	    var i = -1;
	    var indexes = [];
	    var length = arr.length;
	    while (++i < length) {
	        var value = arr[i];
	        if (predicate(value, i, arr)) {
	            result.push(value);
	            indexes.push(i);
	        }
	    }
	    pullAt(arr, indexes);
	    return result;
	};

	var isString = (function (str) {
	    return isType(str, 'String');
	});

	function sortBy(arr, key) {
	    var comparer;
	    if (isFunction(key)) {
	        comparer = function (a, b) { return key(a) - key(b); };
	    }
	    else {
	        var keys_1 = [];
	        if (isString(key)) {
	            keys_1.push(key);
	        }
	        else if (isArray(key)) {
	            keys_1 = key;
	        }
	        comparer = function (a, b) {
	            for (var i = 0; i < keys_1.length; i += 1) {
	                var prop = keys_1[i];
	                if (a[prop] > b[prop]) {
	                    return 1;
	                }
	                if (a[prop] < b[prop]) {
	                    return -1;
	                }
	            }
	            return 0;
	        };
	    }
	    arr.sort(comparer);
	    return arr;
	}

	var uniq = function (arr) {
	    var resultArr = [];
	    each(arr, function (item) {
	        if (!contains(resultArr, item)) {
	            resultArr.push(item);
	        }
	    });
	    return resultArr;
	};

	var union = function () {
	    var sources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        sources[_i] = arguments[_i];
	    }
	    return uniq([].concat.apply([], sources));
	};

	var valuesOfKey = (function (data, name) {
	    var rst = [];
	    var tmpMap = {};
	    for (var i = 0; i < data.length; i++) {
	        var obj = data[i];
	        var value = obj[name];
	        if (!isNil(value)) {
	            // flatten
	            if (!isArray(value)) {
	                value = [value];
	            }
	            for (var j = 0; j < value.length; j++) {
	                var val = value[j];
	                // unique
	                if (!tmpMap[val]) {
	                    rst.push(val);
	                    tmpMap[val] = true;
	                }
	            }
	        }
	    }
	    return rst;
	});

	function head(o) {
	    if (isArrayLike(o)) {
	        return o[0];
	    }
	    return undefined;
	}

	function last(o) {
	    if (isArrayLike(o)) {
	        var arr = o;
	        return arr[arr.length - 1];
	    }
	    return undefined;
	}

	function startsWith(arr, e) {
	    return (isArray(arr) || isString(arr)) ? arr[0] === e : false;
	}

	function endsWith(arr, e) {
	    return (isArray(arr) || isString(arr)) ? arr[arr.length - 1] === e : false;
	}

	/**
	 * 只要有一个不满足条件就返回 false
	 * @param arr
	 * @param func
	 */
	var every = function (arr, func) {
	    for (var i = 0; i < arr.length; i++) {
	        if (!func(arr[i], i))
	            return false;
	    }
	    return true;
	};

	/**
	 * 只要有一个满足条件就返回 true
	 * @param arr
	 * @param func
	 */
	var some = function (arr, func) {
	    for (var i = 0; i < arr.length; i++) {
	        if (func(arr[i], i))
	            return true;
	    }
	    return false;
	};

	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function groupBy(data, condition) {
	    if (!condition || !isArray(data)) {
	        return {};
	    }
	    var result = {};
	    // 兼容方法和 字符串的写法
	    var predicate = isFunction(condition) ? condition : function (item) { return item[condition]; };
	    var key;
	    for (var i = 0; i < data.length; i++) {
	        var item = data[i];
	        key = predicate(item);
	        if (hasOwnProperty.call(result, key)) {
	            result[key].push(item);
	        }
	        else {
	            result[key] = [item];
	        }
	    }
	    return result;
	}

	var groupToMap = function (data, condition) {
	    if (!condition) {
	        return {
	            0: data,
	        };
	    }
	    if (!isFunction(condition)) {
	        var paramsCondition_1 = isArray(condition) ? condition : condition.replace(/\s+/g, '').split('*');
	        condition = function (row) {
	            var unique = '_'; // 避免出现数字作为Key的情况，会进行按照数字的排序
	            for (var i = 0, l = paramsCondition_1.length; i < l; i++) {
	                unique += row[paramsCondition_1[i]] && row[paramsCondition_1[i]].toString();
	            }
	            return unique;
	        };
	    }
	    var groups = groupBy(data, condition);
	    return groups;
	};

	var group = (function (data, condition) {
	    if (!condition) {
	        // 没有条件，则自身改成数组
	        return [data];
	    }
	    var groups = groupToMap(data, condition);
	    var array = [];
	    for (var i in groups) {
	        array.push(groups[i]);
	    }
	    return array;
	});

	/**
	 * 获取封装的事件
	 * @protected
	 * @param  {Object} obj   对象
	 * @param  {String} action 事件名称
	 * @return {Function}        返回事件处理函数
	 */
	function getWrapBehavior(obj, action) {
	    return obj['_wrap_' + action];
	}

	/**
	 * 封装事件，便于使用上下文this,和便于解除事件时使用
	 * @protected
	 * @param  {Object} obj   对象
	 * @param  {String} action 事件名称
	 * @return {Function}        返回事件处理函数
	 */
	function wrapBehavior(obj, action) {
	    if (obj['_wrap_' + action]) {
	        return obj['_wrap_' + action];
	    }
	    var method = function (e) {
	        obj[action](e);
	    };
	    obj['_wrap_' + action] = method;
	    return method;
	}

	var numColorCache = {};
	function numberToColor(num) {
	    // 增加缓存
	    var color = numColorCache[num];
	    if (!color) {
	        var str = num.toString(16);
	        for (var i = str.length; i < 6; i++) {
	            str = '0' + str;
	        }
	        color = '#' + str;
	        numColorCache[num] = color;
	    }
	    return color;
	}

	function parseRadius(radius) {
	    var r1 = 0, r2 = 0, r3 = 0, r4 = 0;
	    if (isArray(radius)) {
	        if (radius.length === 1) {
	            r1 = r2 = r3 = r4 = radius[0];
	        }
	        else if (radius.length === 2) {
	            r1 = r3 = radius[0];
	            r2 = r4 = radius[1];
	        }
	        else if (radius.length === 3) {
	            r1 = radius[0];
	            r2 = r4 = radius[1];
	            r3 = radius[2];
	        }
	        else {
	            r1 = radius[0];
	            r2 = radius[1];
	            r3 = radius[2];
	            r4 = radius[3];
	        }
	    }
	    else {
	        r1 = r2 = r3 = r4 = radius;
	    }
	    return {
	        r1: r1,
	        r2: r2,
	        r3: r3,
	        r4: r4
	    };
	}

	var clamp = function (a, min, max) {
	    if (a < min) {
	        return min;
	    }
	    else if (a > max) {
	        return max;
	    }
	    return a;
	};

	var fixedBase = function (v, base) {
	    var str = base.toString();
	    var index = str.indexOf('.');
	    if (index === -1) {
	        return Math.round(v);
	    }
	    var length = str.substr(index + 1).length;
	    if (length > 20) {
	        length = 20;
	    }
	    return parseFloat(v.toFixed(length));
	};

	/**
	 * 判断是否数字
	 * @return {Boolean} 是否数字
	 */
	var isNumber = function (value) {
	    return isType(value, 'Number');
	};

	var isDecimal = function (num) {
	    return isNumber(num) && num % 1 !== 0;
	};

	var isEven = function (num) {
	    return isNumber(num) && num % 2 === 0;
	};

	var isInteger = Number.isInteger ? Number.isInteger : function (num) {
	    return isNumber(num) && num % 1 === 0;
	};

	var isNegative = function (num) {
	    return isNumber(num) && num < 0;
	};

	var PRECISION = 0.00001; // numbers less than this is considered as 0
	function isNumberEqual(a, b, precision) {
	    if (precision === void 0) { precision = PRECISION; }
	    return Math.abs((a - b)) < precision;
	}

	var isOdd = function (num) {
	    return isNumber(num) && num % 2 !== 0;
	};

	var isPositive = function (num) {
	    return isNumber(num) && num > 0;
	};

	/**
	 * @param {Array} arr The array to iterate over.
	 * @param {Function} [fn] The iteratee invoked per element.
	 * @return {*} Returns the maximum value.
	 * @example
	 *
	 * var objects = [{ 'n': 1 }, { 'n': 2 }];
	 *
	 * maxBy(objects, function(o) { return o.n; });
	 * // => { 'n': 2 }
	 *
	 * maxBy(objects, 'n');
	 * // => { 'n': 2 }
	 */
	var maxBy = (function (arr, fn) {
	    if (!isArray(arr)) {
	        return undefined;
	    }
	    var max = arr[0];
	    var maxData;
	    if (isFunction(fn)) {
	        maxData = fn(arr[0]);
	    }
	    else {
	        maxData = arr[0][fn];
	    }
	    var data;
	    each(arr, function (val) {
	        if (isFunction(fn)) {
	            data = fn(val);
	        }
	        else {
	            data = val[fn];
	        }
	        if (data > maxData) {
	            max = val;
	            maxData = data;
	        }
	    });
	    return max;
	});

	/**
	 * @param {Array} arr The array to iterate over.
	 * @param {Function} [fn] The iteratee invoked per element.
	 * @return {*} Returns the minimum value.
	 * @example
	 *
	 * var objects = [{ 'n': 1 }, { 'n': 2 }];
	 *
	 * minBy(objects, function(o) { return o.n; });
	 * // => { 'n': 1 }
	 *
	 * minBy(objects, 'n');
	 * // => { 'n': 1 }
	 */
	var minBy = (function (arr, fn) {
	    if (!isArray(arr)) {
	        return undefined;
	    }
	    var min = arr[0];
	    var minData;
	    if (isFunction(fn)) {
	        minData = fn(arr[0]);
	    }
	    else {
	        minData = arr[0][fn];
	    }
	    var data;
	    each(arr, function (val) {
	        if (isFunction(fn)) {
	            data = fn(val);
	        }
	        else {
	            data = val[fn];
	        }
	        if (data < minData) {
	            min = val;
	            minData = data;
	        }
	    });
	    return min;
	});

	var mod = function (n, m) {
	    return ((n % m) + m) % m;
	};

	var DEGREE = 180 / Math.PI;
	var toDegree = function (radian) {
	    return DEGREE * radian;
	};

	var RADIAN = Math.PI / 180;
	var toRadian = function (degree) {
	    return RADIAN * degree;
	};

	var has = (function (obj, key) { return obj.hasOwnProperty(key); });

	// @ts-ignore
	var values = Object.values ? function (obj) { return Object.values(obj); } : function (obj) {
	    var result = [];
	    each(obj, function (value, key) {
	        if (!(isFunction(obj) && key === 'prototype')) {
	            result.push(value);
	        }
	    });
	    return result;
	};

	var hasValue = (function (obj, value) { return contains(values(obj), value); });

	var toString$1 = (function (value) {
	    if (isNil(value))
	        return '';
	    return value.toString();
	});

	var lowerCase = function (str) {
	    return toString$1(str).toLowerCase();
	};

	var lowerFirst = function (value) {
	    var str = toString$1(value);
	    return str.charAt(0).toLowerCase() + str.substring(1);
	};

	function substitute(str, o) {
	    if (!str || !o) {
	        return str;
	    }
	    return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
	        if (match.charAt(0) === '\\') {
	            return match.slice(1);
	        }
	        return (o[name] === undefined) ? '' : o[name];
	    });
	}

	var upperCase = function (str) {
	    return toString$1(str).toUpperCase();
	};

	var upperFirst = function (value) {
	    var str = toString$1(value);
	    return str.charAt(0).toUpperCase() + str.substring(1);
	};

	var toString$2 = {}.toString;
	var getType = function (value) {
	    return toString$2.call(value).replace(/^\[object /, '').replace(/]$/, '');
	};

	/**
	 * 是否是参数类型
	 *
	 * @param {Object} value 测试的值
	 * @return {Boolean}
	 */
	var isArguments = function (value) {
	    return isType(value, 'Arguments');
	};

	/**
	 * 是否是布尔类型
	 *
	 * @param {Object} value 测试的值
	 * @return {Boolean}
	 */
	var isBoolean = function (value) {
	    return isType(value, 'Boolean');
	};

	var isDate = function (value) {
	    return isType(value, 'Date');
	};

	/**
	 * 是否是参数类型
	 *
	 * @param {Object} value 测试的值
	 * @return {Boolean}
	 */
	var isError = function (value) {
	    return isType(value, 'Error');
	};

	/**
	 * 判断是否为有限数
	 * @return {Boolean}
	 */
	function _isFinite (value) {
	    return isNumber(value) && isFinite(value);
	}

	var isNull = function (value) {
	    return value === null;
	};

	var objectProto = Object.prototype;
	var isPrototype = function (value) {
	    var Ctor = value && value.constructor;
	    var proto = (typeof Ctor === 'function' && Ctor.prototype) || objectProto;
	    return value === proto;
	};

	var isRegExp = function (str) {
	    return isType(str, 'RegExp');
	};

	var isUndefined = function (value) {
	    return value === undefined;
	};

	/**
	 * 判断是否HTML元素
	 * @return {Boolean} 是否HTML元素
	 */
	var isElement = function (o) {
	    return o instanceof Element || o instanceof HTMLDocument;
	};

	function requestAnimationFrame(fn) {
	    var method = window.requestAnimationFrame ||
	        window.webkitRequestAnimationFrame ||
	        // @ts-ignore
	        window.mozRequestAnimationFrame ||
	        // @ts-ignore
	        window.msRequestAnimationFrame ||
	        function (f) {
	            return setTimeout(f, 16);
	        };
	    return method(fn);
	}

	function cancelAnimationFrame(handler) {
	    var method = window.cancelAnimationFrame ||
	        window.webkitCancelAnimationFrame ||
	        // @ts-ignore
	        window.mozCancelAnimationFrame ||
	        // @ts-ignore
	        window.msCancelAnimationFrame ||
	        clearTimeout;
	    method(handler);
	}

	// FIXME: Mutable param should be forbidden in static lang.
	function _mix(dist, obj) {
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
	            dist[key] = obj[key];
	        }
	    }
	}
	function mix(dist, src1, src2, src3) {
	    if (src1)
	        _mix(dist, src1);
	    if (src2)
	        _mix(dist, src2);
	    if (src3)
	        _mix(dist, src3);
	    return dist;
	}

	var augment = function () {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    var c = args[0];
	    for (var i = 1; i < args.length; i++) {
	        var obj = args[i];
	        if (isFunction(obj)) {
	            obj = obj.prototype;
	        }
	        mix(c.prototype, obj);
	    }
	};

	var clone = function (obj) {
	    if (typeof obj !== 'object' || obj === null) {
	        return obj;
	    }
	    var rst;
	    if (isArray(obj)) {
	        rst = [];
	        for (var i = 0, l = obj.length; i < l; i++) {
	            if (typeof obj[i] === 'object' && obj[i] != null) {
	                rst[i] = clone(obj[i]);
	            }
	            else {
	                rst[i] = obj[i];
	            }
	        }
	    }
	    else {
	        rst = {};
	        for (var k in obj) {
	            if (typeof obj[k] === 'object' && obj[k] != null) {
	                rst[k] = clone(obj[k]);
	            }
	            else {
	                rst[k] = obj[k];
	            }
	        }
	    }
	    return rst;
	};

	function debounce(func, wait, immediate) {
	    var timeout;
	    return function () {
	        var context = this, args = arguments;
	        var later = function () {
	            timeout = null;
	            if (!immediate) {
	                func.apply(context, args);
	            }
	        };
	        var callNow = immediate && !timeout;
	        clearTimeout(timeout);
	        timeout = setTimeout(later, wait);
	        if (callNow) {
	            func.apply(context, args);
	        }
	    };
	}

	/**
	 * _.memoize(calColor);
	 * _.memoize(calColor, (...args) => args[0]);
	 * @param f
	 * @param resolver
	 */
	var memoize = (function (f, resolver) {
	    if (!isFunction(f)) {
	        throw new TypeError('Expected a function');
	    }
	    var memoized = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        // 使用方法构造 key，如果不存在 resolver，则直接取第一个参数作为 key
	        var key = resolver ? resolver.apply(this, args) : args[0];
	        var cache = memoized.cache;
	        if (cache.has(key)) {
	            return cache.get(key);
	        }
	        var result = f.apply(this, args);
	        // 缓存起来
	        cache.set(key, result);
	        return result;
	    };
	    memoized.cache = new Map();
	    return memoized;
	});

	var MAX_MIX_LEVEL = 5;
	function _deepMix(dist, src, level, maxLevel) {
	    level = level || 0;
	    maxLevel = maxLevel || MAX_MIX_LEVEL;
	    for (var key in src) {
	        if (src.hasOwnProperty(key)) {
	            var value = src[key];
	            if (value !== null && isPlainObject(value)) {
	                if (!isPlainObject(dist[key])) {
	                    dist[key] = {};
	                }
	                if (level < maxLevel) {
	                    _deepMix(dist[key], value, level + 1, maxLevel);
	                }
	                else {
	                    dist[key] = src[key];
	                }
	            }
	            else if (isArray(value)) {
	                dist[key] = [];
	                dist[key] = dist[key].concat(value);
	            }
	            else if (value !== undefined) {
	                dist[key] = value;
	            }
	        }
	    }
	}
	// todo 重写
	var deepMix = function (rst) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    for (var i = 0; i < args.length; i += 1) {
	        _deepMix(rst, args[i]);
	    }
	    return rst;
	};

	var extend = function (subclass, superclass, overrides, staticOverrides) {
	    // 如果只提供父类构造函数，则自动生成子类构造函数
	    if (!isFunction(superclass)) {
	        overrides = superclass;
	        superclass = subclass;
	        subclass = function () { };
	    }
	    var create = Object.create ?
	        function (proto, c) {
	            return Object.create(proto, {
	                constructor: {
	                    value: c
	                }
	            });
	        } :
	        function (proto, c) {
	            function Tmp() { }
	            Tmp.prototype = proto;
	            var o = new Tmp();
	            o.constructor = c;
	            return o;
	        };
	    var superObj = create(superclass.prototype, subclass); // new superclass(),//实例化父类作为子类的prototype
	    subclass.prototype = mix(superObj, subclass.prototype); // 指定子类的prototype
	    subclass.superclass = create(superclass.prototype, superclass);
	    mix(superObj, overrides);
	    mix(subclass, staticOverrides);
	    return subclass;
	};

	var indexOf$1 = function (arr, obj) {
	    if (!isArrayLike(arr)) {
	        return -1;
	    }
	    var m = Array.prototype.indexOf;
	    if (m) {
	        return m.call(arr, obj);
	    }
	    var index = -1;
	    for (var i = 0; i < arr.length; i++) {
	        if (arr[i] === obj) {
	            index = i;
	            break;
	        }
	    }
	    return index;
	};

	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	function isEmpty(value) {
	    /**
	     * isEmpty(null) => true
	     * isEmpty() => true
	     * isEmpty(true) => true
	     * isEmpty(1) => true
	     * isEmpty([1, 2, 3]) => false
	     * isEmpty('abc') => false
	     * isEmpty({ a: 1 }) => false
	     */
	    if (isNil(value)) {
	        return true;
	    }
	    if (isArrayLike(value)) {
	        return !value.length;
	    }
	    var type = getType(value);
	    if (type === 'Map' || type === 'Set') {
	        return !value.size;
	    }
	    if (isPrototype(value)) {
	        return !Object.keys(value).length;
	    }
	    for (var key in value) {
	        if (hasOwnProperty$1.call(value, key)) {
	            return false;
	        }
	    }
	    return true;
	}

	var isEqual = function (value, other) {
	    if (value === other) {
	        return true;
	    }
	    if (!value || !other) {
	        return false;
	    }
	    if (isString(value) || isString(other)) {
	        return false;
	    }
	    if (isArrayLike(value) || isArrayLike(other)) {
	        if (value.length !== other.length) {
	            return false;
	        }
	        var rst = true;
	        for (var i = 0; i < value.length; i++) {
	            rst = isEqual(value[i], other[i]);
	            if (!rst) {
	                break;
	            }
	        }
	        return rst;
	    }
	    if (isObjectLike(value) || isObjectLike(other)) {
	        var valueKeys = Object.keys(value);
	        var otherKeys = Object.keys(other);
	        if (valueKeys.length !== otherKeys.length) {
	            return false;
	        }
	        var rst = true;
	        for (var i = 0; i < valueKeys.length; i++) {
	            rst = isEqual(value[valueKeys[i]], other[valueKeys[i]]);
	            if (!rst) {
	                break;
	            }
	        }
	        return rst;
	    }
	    return false;
	};

	/**
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [fn] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * function isGreeting(value) {
	 *   return /^h(?:i|ello)$/.test(value);
	 * }
	 *
	 * function customizer(objValue, othValue) {
	 *   if (isGreeting(objValue) && isGreeting(othValue)) {
	 *     return true;
	 *   }
	 * }
	 *
	 * var array = ['hello', 'goodbye'];
	 * var other = ['hi', 'goodbye'];
	 *
	 * isEqualWith(array, other, customizer);  // => true
	 */
	var isEqualWith = (function (value, other, fn) {
	    if (!isFunction(fn)) {
	        return isEqual(value, other);
	    }
	    return !!fn(value, other);
	});

	var map = function (arr, func) {
	    if (!isArrayLike(arr)) {
	        // @ts-ignore
	        return arr;
	    }
	    var result = [];
	    for (var index = 0; index < arr.length; index++) {
	        var value = arr[index];
	        result.push(func(value, index));
	    }
	    return result;
	};

	var identity = function (v) { return v; };
	var mapValues = (function (object, func) {
	    if (func === void 0) { func = identity; }
	    var r = {};
	    if (isObject(object) && !isNil(object)) {
	        Object.keys(object).forEach(function (key) {
	            // @ts-ignore
	            r[key] = func(object[key], key);
	        });
	    }
	    return r;
	});

	/**
	 * https://github.com/developit/dlv/blob/master/index.js
	 * @param obj
	 * @param key
	 * @param defaultValue
	 */
	var get = (function (obj, key, defaultValue) {
	    var p = 0;
	    var keyArr = isString(key) ? key.split('.') : key;
	    while (obj && p < keyArr.length) {
	        obj = obj[keyArr[p++]];
	    }
	    return (obj === undefined || p < keyArr.length) ? defaultValue : obj;
	});

	/**
	 * https://github.com/developit/dlv/blob/master/index.js
	 * @param obj
	 * @param path
	 * @param value
	 */
	var set = (function (obj, path, value) {
	    var o = obj;
	    var keyArr = isString(path) ? path.split('.') : path;
	    keyArr.forEach(function (key, idx) {
	        // 不是最后一个
	        if (idx < keyArr.length - 1) {
	            if (!isObject(o[key])) {
	                o[key] = isNumber(keyArr[idx + 1]) ? [] : {};
	            }
	            o = o[key];
	        }
	        else {
	            o[key] = value;
	        }
	    });
	    return obj;
	});

	var hasOwnProperty$2 = Object.prototype.hasOwnProperty;
	var pick = (function (object, keys) {
	    if (object === null || !isPlainObject(object)) {
	        return {};
	    }
	    var result = {};
	    each(keys, function (key) {
	        if (hasOwnProperty$2.call(object, key)) {
	            result[key] = object[key];
	        }
	    });
	    return result;
	});

	var throttle = (function (func, wait, options) {
	    var timeout, context, args, result;
	    var previous = 0;
	    if (!options)
	        options = {};
	    var later = function () {
	        previous = options.leading === false ? 0 : Date.now();
	        timeout = null;
	        result = func.apply(context, args);
	        if (!timeout)
	            context = args = null;
	    };
	    var throttled = function () {
	        var now = Date.now();
	        if (!previous && options.leading === false)
	            previous = now;
	        var remaining = wait - (now - previous);
	        context = this;
	        args = arguments;
	        if (remaining <= 0 || remaining > wait) {
	            if (timeout) {
	                clearTimeout(timeout);
	                timeout = null;
	            }
	            previous = now;
	            result = func.apply(context, args);
	            if (!timeout)
	                context = args = null;
	        }
	        else if (!timeout && options.trailing !== false) {
	            timeout = setTimeout(later, remaining);
	        }
	        return result;
	    };
	    throttled.cancel = function () {
	        clearTimeout(timeout);
	        previous = 0;
	        timeout = context = args = null;
	    };
	    return throttled;
	});

	var toArray = (function (value) {
	    return isArrayLike(value) ? Array.prototype.slice.call(value) : [];
	});

	var map$1 = {};
	var uniqueId = (function (prefix) {
	    prefix = prefix || 'g';
	    if (!map$1[prefix]) {
	        map$1[prefix] = 1;
	    }
	    else {
	        map$1[prefix] += 1;
	    }
	    return prefix + map$1[prefix];
	});

	var noop = (function () { });

	var identity$1 = (function (v) { return v; });

	function size(o) {
	    if (isNil(o)) {
	        return 0;
	    }
	    if (isArrayLike(o)) {
	        return o.length;
	    }
	    return Object.keys(o).length;
	}

	/**
	 * k-v 存储
	 */
	var default_1 = /** @class */ (function () {
	    function default_1() {
	        this.map = {};
	    }
	    default_1.prototype.has = function (key) {
	        return this.map[key] !== undefined;
	    };
	    default_1.prototype.get = function (key, def) {
	        var v = this.map[key];
	        return v === undefined ? def : v;
	    };
	    default_1.prototype.set = function (key, value) {
	        this.map[key] = value;
	    };
	    default_1.prototype.clear = function () {
	        this.map = {};
	    };
	    default_1.prototype.delete = function (key) {
	        delete this.map[key];
	    };
	    default_1.prototype.size = function () {
	        return Object.keys(this.map).length;
	    };
	    return default_1;
	}());

	// array

	var esm = /*#__PURE__*/Object.freeze({
		__proto__: null,
		contains: contains,
		includes: contains,
		difference: difference,
		find: find,
		findIndex: findIndex,
		firstValue: firstValue,
		flatten: flatten,
		flattenDeep: flattenDeep,
		getRange: getRange,
		pull: pull,
		pullAt: pullAt,
		reduce: reduce,
		remove: remove,
		sortBy: sortBy,
		union: union,
		uniq: uniq,
		valuesOfKey: valuesOfKey,
		head: head,
		last: last,
		startsWith: startsWith,
		endsWith: endsWith,
		filter: filter,
		every: every,
		some: some,
		group: group,
		groupBy: groupBy,
		groupToMap: groupToMap,
		getWrapBehavior: getWrapBehavior,
		wrapBehavior: wrapBehavior,
		number2color: numberToColor,
		parseRadius: parseRadius,
		clamp: clamp,
		fixedBase: fixedBase,
		isDecimal: isDecimal,
		isEven: isEven,
		isInteger: isInteger,
		isNegative: isNegative,
		isNumberEqual: isNumberEqual,
		isOdd: isOdd,
		isPositive: isPositive,
		maxBy: maxBy,
		minBy: minBy,
		mod: mod,
		toDegree: toDegree,
		toInteger: parseInt,
		toRadian: toRadian,
		forIn: each,
		has: has,
		hasKey: has,
		hasValue: hasValue,
		keys: keys,
		isMatch: isMatch,
		values: values,
		lowerCase: lowerCase,
		lowerFirst: lowerFirst,
		substitute: substitute,
		upperCase: upperCase,
		upperFirst: upperFirst,
		getType: getType,
		isArguments: isArguments,
		isArray: isArray,
		isArrayLike: isArrayLike,
		isBoolean: isBoolean,
		isDate: isDate,
		isError: isError,
		isFunction: isFunction,
		isFinite: _isFinite,
		isNil: isNil,
		isNull: isNull,
		isNumber: isNumber,
		isObject: isObject,
		isObjectLike: isObjectLike,
		isPlainObject: isPlainObject,
		isPrototype: isPrototype,
		isRegExp: isRegExp,
		isString: isString,
		isType: isType,
		isUndefined: isUndefined,
		isElement: isElement,
		requestAnimationFrame: requestAnimationFrame,
		clearAnimationFrame: cancelAnimationFrame,
		augment: augment,
		clone: clone,
		debounce: debounce,
		memoize: memoize,
		deepMix: deepMix,
		each: each,
		extend: extend,
		indexOf: indexOf$1,
		isEmpty: isEmpty,
		isEqual: isEqual,
		isEqualWith: isEqualWith,
		map: map,
		mapValues: mapValues,
		mix: mix,
		assign: mix,
		get: get,
		set: set,
		pick: pick,
		throttle: throttle,
		toArray: toArray,
		toString: toString$1,
		uniqueId: uniqueId,
		noop: noop,
		identity: identity$1,
		size: size,
		Cache: default_1
	});

	var array = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.merge = merge;
	exports.values = values;
	exports.firstValue = firstValue;
	exports.group = group;
	exports.groupToMap = groupToMap;
	exports.remove = remove;
	exports.getRange = getRange;



	function merge(dataArray) {
	  var rst = [];

	  for (var i = 0, len = dataArray.length; i < len; i++) {
	    rst = rst.concat(dataArray[i]);
	  }

	  return rst;
	}

	function values(data, name) {
	  var rst = [];
	  var tmpMap = {};

	  for (var i = 0, len = data.length; i < len; i++) {
	    var obj = data[i];
	    var value = obj[name];

	    if (!(0, esm.isNil)(value)) {
	      if (!(0, esm.isArray)(value)) {
	        if (!tmpMap[value]) {
	          rst.push(value);
	          tmpMap[value] = true;
	        }
	      } else {
	        (0, esm.each)(value, function (val) {
	          if (!tmpMap[val]) {
	            rst.push(val);
	            tmpMap[val] = true;
	          }
	        });
	      }
	    }
	  }

	  return rst;
	}

	function firstValue(data, name) {
	  var rst = null;

	  for (var i = 0, len = data.length; i < len; i++) {
	    var obj = data[i];
	    var value = obj[name];

	    if (!(0, esm.isNil)(value)) {
	      if ((0, esm.isArray)(value)) {
	        rst = value[0];
	      } else {
	        rst = value;
	      }

	      break;
	    }
	  }

	  return rst;
	}

	function groupToMap(data, fields) {
	  if (!fields) {
	    return {
	      0: data
	    };
	  }

	  var callback = function callback(row) {
	    var unique = '_';

	    for (var i = 0, l = fields.length; i < l; i++) {
	      unique += row[fields[i]] && row[fields[i]].toString();
	    }

	    return unique;
	  };

	  var groups = {};

	  for (var i = 0, len = data.length; i < len; i++) {
	    var row = data[i];
	    var key = callback(row);

	    if (groups[key]) {
	      groups[key].push(row);
	    } else {
	      groups[key] = [row];
	    }
	  }

	  return groups;
	}

	function group(data, fields, appendConditions) {
	  if (appendConditions === void 0) {
	    appendConditions = {};
	  }

	  if (!fields) {
	    return [data];
	  }

	  var groups = groupToMap(data, fields);
	  var array = [];

	  if (fields.length === 1 && appendConditions[fields[0]]) {
	    var _values = appendConditions[fields[0]];
	    (0, esm.each)(_values, function (value) {
	      value = '_' + value;
	      array.push(groups[value]);
	    });
	  } else {
	    for (var i in groups) {
	      array.push(groups[i]);
	    }
	  }

	  return array;
	}

	function remove(arr, obj) {
	  if (!arr) {
	    return;
	  }

	  var index = arr.indexOf(obj);

	  if (index !== -1) {
	    arr.splice(index, 1);
	  }
	}

	function getRange(values) {
	  if (!values.length) {
	    return {
	      min: 0,
	      max: 0
	    };
	  }

	  var max = Math.max.apply(null, values);
	  var min = Math.min.apply(null, values);
	  return {
	    min: min,
	    max: max
	  };
	}
	});

	unwrapExports(array);
	var array_1 = array.merge;
	var array_2 = array.values;
	var array_3 = array.firstValue;
	var array_4 = array.group;
	var array_5 = array.groupToMap;
	var array_6 = array.remove;
	var array_7 = array.getRange;

	var dom = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.isCanvasElement = isCanvasElement;
	exports.getPixelRatio = getPixelRatio;
	exports.getStyle = getStyle;
	exports.getWidth = getWidth;
	exports.getHeight = getHeight;
	exports.getDomById = getDomById;
	exports.getRelativePosition = getRelativePosition;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.createEvent = createEvent;
	exports.measureText = measureText;
	exports.isBrowser = exports.isNode = exports.isMy = exports.isWx = void 0;

	/**
	 * Detects support for options object argument in addEventListener.
	 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
	 * @private
	 */
	var supportsEventListenerOptions = function () {
	  var supports = false;

	  try {
	    var options = Object.defineProperty({}, 'passive', {
	      get: function get() {
	        supports = true;
	      }
	    });
	    window.addEventListener('e', null, options);
	  } catch (e) {// continue regardless of error
	  }

	  return supports;
	}(); // Default passive to true as expected by Chrome for 'touchstart' and 'touchend' events.
	// https://github.com/chartjs/Chart.js/issues/4287


	var eventListenerOptions = supportsEventListenerOptions ? {
	  passive: true
	} : false;
	/* global wx, my */
	// weixin miniprogram

	var isWx = typeof wx === 'object' && typeof wx.getSystemInfoSync === 'function'; // ant miniprogram

	exports.isWx = isWx;
	var isMy = typeof my === 'object' && typeof my.getSystemInfoSync === 'function'; // in node

	exports.isMy = isMy;
	var isNode =  'object' !== 'undefined'; // in browser

	exports.isNode = isNode;
	var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.sessionStorage !== 'undefined';
	exports.isBrowser = isBrowser;

	function isCanvasElement(el) {
	  if (!el || typeof el !== 'object') return false;

	  if (el.nodeType === 1 && el.nodeName) {
	    // HTMLCanvasElement
	    return true;
	  } // CanvasElement


	  return !!el.isCanvasElement;
	}

	function getPixelRatio() {
	  return window && window.devicePixelRatio || 1;
	}

	function getStyle(el, property) {
	  return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
	}

	function getWidth(el) {
	  var width = getStyle(el, 'width');

	  if (width === 'auto') {
	    width = el.offsetWidth;
	  }

	  return parseFloat(width);
	}

	function getHeight(el) {
	  var height = getStyle(el, 'height');

	  if (height === 'auto') {
	    height = el.offsetHeight;
	  }

	  return parseFloat(height);
	}

	function getDomById(id) {
	  if (!id) {
	    return null;
	  }

	  return document.getElementById(id);
	}

	function getRelativePosition(point, canvas) {
	  var canvasDom = canvas.get('el');
	  if (!canvasDom) return point;

	  var _canvasDom$getBoundin = canvasDom.getBoundingClientRect(),
	      top = _canvasDom$getBoundin.top,
	      right = _canvasDom$getBoundin.right,
	      bottom = _canvasDom$getBoundin.bottom,
	      left = _canvasDom$getBoundin.left;

	  var paddingLeft = parseFloat(getStyle(canvasDom, 'padding-left'));
	  var paddingTop = parseFloat(getStyle(canvasDom, 'padding-top'));
	  var paddingRight = parseFloat(getStyle(canvasDom, 'padding-right'));
	  var paddingBottom = parseFloat(getStyle(canvasDom, 'padding-bottom'));
	  var width = right - left - paddingLeft - paddingRight;
	  var height = bottom - top - paddingTop - paddingBottom;
	  var pixelRatio = canvas.get('pixelRatio');
	  var mouseX = (point.x - left - paddingLeft) / width * canvasDom.width / pixelRatio;
	  var mouseY = (point.y - top - paddingTop) / height * canvasDom.height / pixelRatio;
	  return {
	    x: mouseX,
	    y: mouseY
	  };
	}

	function addEventListener(source, type, listener) {
	  source.addEventListener(type, listener, eventListenerOptions);
	}

	function removeEventListener(source, type, listener) {
	  source.removeEventListener(type, listener, eventListenerOptions);
	}

	function createEventObj(type, chart, x, y, nativeEvent) {
	  return {
	    type: type,
	    chart: chart,
	    "native": nativeEvent || null,
	    x: x !== undefined ? x : null,
	    y: y !== undefined ? y : null
	  };
	}

	function createEvent(event, chart) {
	  var type = event.type;
	  var clientPoint; // 说明是touch相关事件

	  if (event.touches) {
	    // https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent/changedTouches
	    // 这里直接拿changedTouches就可以了，不管是touchstart, touchmove, touchend changedTouches 都是有的
	    // 为了以防万一，做个空判断
	    var touch = event.changedTouches[0] || {}; // x, y: 相对canvas原点的位置，clientX, clientY 相对于可视窗口的位置

	    var x = touch.x,
	        y = touch.y,
	        clientX = touch.clientX,
	        clientY = touch.clientY; // 小程序环境会有x,y，这里就直接返回

	    if (x && y) {
	      return createEventObj(type, chart, x, y, event);
	    }

	    clientPoint = {
	      x: clientX,
	      y: clientY
	    };
	  } else {
	    // mouse相关事件
	    clientPoint = {
	      x: event.clientX,
	      y: event.clientY
	    };
	  } // 理论上应该是只有有在浏览器环境才会走到这里


	  var canvas = chart.get('canvas'); // 通过clientX, clientY 计算x, y

	  var point = getRelativePosition(clientPoint, canvas);
	  return createEventObj(type, chart, point.x, point.y, event);
	}

	function measureText(text, font, ctx) {
	  if (!ctx) {
	    ctx = document.createElement('canvas').getContext('2d');
	  }

	  ctx.font = font || '12px sans-serif';
	  return ctx.measureText(text);
	}
	});

	unwrapExports(dom);
	var dom_1 = dom.isCanvasElement;
	var dom_2 = dom.getPixelRatio;
	var dom_3 = dom.getStyle;
	var dom_4 = dom.getWidth;
	var dom_5 = dom.getHeight;
	var dom_6 = dom.getDomById;
	var dom_7 = dom.getRelativePosition;
	var dom_8 = dom.addEventListener;
	var dom_9 = dom.removeEventListener;
	var dom_10 = dom.createEvent;
	var dom_11 = dom.measureText;
	var dom_12 = dom.isBrowser;
	var dom_13 = dom.isNode;
	var dom_14 = dom.isMy;
	var dom_15 = dom.isWx;

	var common = createCommonjsModule(function (module, exports) {



	exports.__esModule = true;
	var _exportNames = {
	  isObjectValueEqual: true,
	  parsePadding: true,
	  directionEnabled: true,
	  upperFirst: true,
	  lowerFirst: true,
	  isString: true,
	  isNumber: true,
	  isBoolean: true,
	  isFunction: true,
	  isDate: true,
	  isArray: true,
	  isNil: true,
	  isObject: true,
	  isPlainObject: true,
	  isEqual: true,
	  deepMix: true,
	  mix: true,
	  each: true,
	  uniq: true,
	  find: true,
	  Array: true
	};
	exports.isObjectValueEqual = isObjectValueEqual;
	exports.parsePadding = parsePadding;
	exports.directionEnabled = directionEnabled;
	exports.Array = void 0;



	exports.upperFirst = esm.upperFirst;
	exports.lowerFirst = esm.lowerFirst;
	exports.isString = esm.isString;
	exports.isNumber = esm.isNumber;
	exports.isBoolean = esm.isBoolean;
	exports.isFunction = esm.isFunction;
	exports.isDate = esm.isDate;
	exports.isArray = esm.isArray;
	exports.isNil = esm.isNil;
	exports.isObject = esm.isObject;
	exports.isPlainObject = esm.isPlainObject;
	exports.isEqual = esm.isEqual;
	exports.deepMix = esm.deepMix;
	exports.mix = esm.mix;
	exports.each = esm.each;
	exports.uniq = esm.uniq;
	exports.find = esm.find;

	var ArrayUtil = interopRequireWildcard(array);

	exports.Array = ArrayUtil;



	Object.keys(dom).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
	  exports[key] = dom[key];
	});

	/**
	 * @fileOverview Utility for F2
	 * @author dxq613 @gmail.com
	 * @author sima.zhang1990@gmail.com
	 */
	function isObjectValueEqual(a, b) {
	  // for vue.js
	  a = Object.assign({}, a);
	  b = Object.assign({}, b);
	  var aProps = Object.getOwnPropertyNames(a);
	  var bProps = Object.getOwnPropertyNames(b);

	  if (aProps.length !== bProps.length) {
	    return false;
	  }

	  for (var i = 0, len = aProps.length; i < len; i++) {
	    var propName = aProps[i];

	    if (a[propName] !== b[propName]) {
	      return false;
	    }
	  }

	  return true;
	}

	function parsePadding(padding) {
	  var top;
	  var right;
	  var bottom;
	  var left;

	  if ((0, esm.isNumber)(padding) || (0, esm.isString)(padding)) {
	    top = bottom = left = right = padding;
	  } else if ((0, esm.isArray)(padding)) {
	    top = padding[0];
	    right = !(0, esm.isNil)(padding[1]) ? padding[1] : padding[0];
	    bottom = !(0, esm.isNil)(padding[2]) ? padding[2] : padding[0];
	    left = !(0, esm.isNil)(padding[3]) ? padding[3] : right;
	  }

	  return [top, right, bottom, left];
	}

	function directionEnabled(mode, dir) {
	  if (mode === undefined) {
	    return true;
	  } else if (typeof mode === 'string') {
	    return mode.indexOf(dir) !== -1;
	  }

	  return false;
	}
	});

	unwrapExports(common);
	var common_1 = common.isObjectValueEqual;
	var common_2 = common.parsePadding;
	var common_3 = common.directionEnabled;
	var common_4 = common.Array;
	var common_5 = common.upperFirst;
	var common_6 = common.lowerFirst;
	var common_7 = common.isString;
	var common_8 = common.isNumber;
	var common_9 = common.isBoolean;
	var common_10 = common.isFunction;
	var common_11 = common.isDate;
	var common_12 = common.isArray;
	var common_13 = common.isNil;
	var common_14 = common.isObject;
	var common_15 = common.isPlainObject;
	var common_16 = common.isEqual;
	var common_17 = common.deepMix;
	var common_18 = common.mix;
	var common_19 = common.each;
	var common_20 = common.uniq;
	var common_21 = common.find;

	/**
	 * @fileOverview default theme
	 * @author dxq613@gail.com
	 */


	var color1 = '#E8E8E8'; // color of axis-line and axis-grid

	var color2 = '#808080'; // color of axis label

	var defaultAxis = {
	  label: {
	    fill: color2,
	    fontSize: 10
	  },
	  line: {
	    stroke: color1,
	    lineWidth: 1
	  },
	  grid: {
	    type: 'line',
	    stroke: color1,
	    lineWidth: 1,
	    lineDash: [2]
	  },
	  tickLine: null,
	  labelOffset: 7.5
	};
	var Theme = {
	  fontFamily: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif',
	  defaultColor: '#1890FF',
	  pixelRatio: 1,
	  padding: 'auto',
	  appendPadding: 15,
	  colors: ['#1890FF', '#2FC25B', '#FACC14', '#223273', '#8543E0', '#13C2C2', '#3436C7', '#F04864'],
	  shapes: {
	    line: ['line', 'dash'],
	    point: ['circle', 'hollowCircle']
	  },
	  sizes: [4, 10],
	  axis: {
	    common: defaultAxis,
	    // common axis configuration
	    bottom: common.mix({}, defaultAxis, {
	      grid: null
	    }),
	    left: common.mix({}, defaultAxis, {
	      line: null
	    }),
	    right: common.mix({}, defaultAxis, {
	      line: null
	    }),
	    circle: common.mix({}, defaultAxis, {
	      line: null
	    }),
	    radius: common.mix({}, defaultAxis, {
	      labelOffset: 4
	    })
	  },
	  shape: {
	    line: {
	      lineWidth: 2,
	      lineJoin: 'round',
	      lineCap: 'round'
	    },
	    point: {
	      lineWidth: 0,
	      size: 3
	    },
	    area: {
	      fillOpacity: 0.1
	    }
	  },
	  _defaultAxis: defaultAxis
	};
	var theme = Theme;

	var Global = {
	  version: '3.6.3',
	  scales: {},
	  widthRatio: {
	    column: 1 / 2,
	    rose: 0.999999,
	    multiplePie: 3 / 4
	  },
	  lineDash: [4, 4]
	};

	Global.setTheme = function (theme) {
	  common.deepMix(this, theme);
	};

	Global.setTheme(theme);
	var global = Global;

	var interopRequireDefault = createCommonjsModule(function (module) {
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	}

	module.exports = _interopRequireDefault;
	});

	unwrapExports(interopRequireDefault);

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var getPrototypeOf = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = Object.create(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	var inheritsLoose = _inheritsLoose;

	var _const = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.EVENT_AFTER_GEOM_INIT = exports.EVENT_AFTER_SIZE_CHANGE = exports.EVENT_AFTER_DATA_CHANGE = exports.EVENT_BEFORE_DATA_CHANGE = exports.EVENT_AFTER_RENDER = exports.EVENT_BEFORE_RENDER = exports.EVENT_AFTER_INIT = void 0;
	var EVENT_AFTER_INIT = 'afterinit';
	exports.EVENT_AFTER_INIT = EVENT_AFTER_INIT;
	var EVENT_BEFORE_RENDER = 'beforerender';
	exports.EVENT_BEFORE_RENDER = EVENT_BEFORE_RENDER;
	var EVENT_AFTER_RENDER = 'afterrender';
	exports.EVENT_AFTER_RENDER = EVENT_AFTER_RENDER;
	var EVENT_BEFORE_DATA_CHANGE = 'beforedatachange';
	exports.EVENT_BEFORE_DATA_CHANGE = EVENT_BEFORE_DATA_CHANGE;
	var EVENT_AFTER_DATA_CHANGE = 'afterdatachange';
	exports.EVENT_AFTER_DATA_CHANGE = EVENT_AFTER_DATA_CHANGE;
	var EVENT_AFTER_SIZE_CHANGE = '_aftersizechange';
	exports.EVENT_AFTER_SIZE_CHANGE = EVENT_AFTER_SIZE_CHANGE;
	var EVENT_AFTER_GEOM_INIT = '_aftergeominit';
	exports.EVENT_AFTER_GEOM_INIT = EVENT_AFTER_GEOM_INIT;
	});

	unwrapExports(_const);
	var _const_1 = _const.EVENT_AFTER_GEOM_INIT;
	var _const_2 = _const.EVENT_AFTER_SIZE_CHANGE;
	var _const_3 = _const.EVENT_AFTER_DATA_CHANGE;
	var _const_4 = _const.EVENT_BEFORE_DATA_CHANGE;
	var _const_5 = _const.EVENT_AFTER_RENDER;
	var _const_6 = _const.EVENT_BEFORE_RENDER;
	var _const_7 = _const.EVENT_AFTER_INIT;

	var emit = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports["default"] = void 0;



	// 实现简单的事件机制
	var EventEmit = /*#__PURE__*/function () {
	  function EventEmit() {
	    this.__events = {};
	  }

	  var _proto = EventEmit.prototype;

	  _proto.on = function on(type, listener) {
	    if (!type || !listener) {
	      return;
	    }

	    var events = this.__events[type] || [];
	    events.push(listener);
	    this.__events[type] = events;
	  };

	  _proto.emit = function emit(type, e) {
	    var _this = this;

	    if ((0, common.isObject)(type)) {
	      e = type;
	      type = e && e.type;
	    }

	    if (!type) {
	      return;
	    }

	    var events = this.__events[type];

	    if (!events || !events.length) {
	      return;
	    }

	    events.forEach(function (listener) {
	      listener.call(_this, e);
	    });
	  };

	  _proto.off = function off(type, listener) {
	    var __events = this.__events;
	    var events = __events[type];

	    if (!events || !events.length) {
	      return;
	    } // 如果没有指定方法，则删除所有项


	    if (!listener) {
	      delete __events[type];
	      return;
	    } // 删除指定的 listener


	    for (var i = 0, len = events.length; i < len; i++) {
	      if (events[i] === listener) {
	        events.splice(i, 1);
	      }
	    }
	  };

	  return EventEmit;
	}();

	var _default = EventEmit;
	exports["default"] = _default;
	});

	unwrapExports(emit);

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2 = interopRequireDefault(inheritsLoose);

	var _emit = interopRequireDefault(emit);



	var Base = /*#__PURE__*/function (_Emit) {
	  (0, _inheritsLoose2["default"])(Base, _Emit);

	  var _proto = Base.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    return {};
	  };

	  function Base(cfg) {
	    var _this;

	    _this = _Emit.call(this) || this;
	    var attrs = {};

	    var defaultCfg = _this.getDefaultCfg();

	    _this._attrs = attrs;
	    common.mix(attrs, defaultCfg, cfg);
	    return _this;
	  }

	  _proto.get = function get(name) {
	    return this._attrs[name];
	  };

	  _proto.set = function set(name, value) {
	    this._attrs[name] = value;
	  };

	  _proto.destroy = function destroy() {
	    this._attrs = {};
	    this.destroyed = true;
	  };

	  return Base;
	}(_emit["default"]);

	var base = Base;

	var Plot = /*#__PURE__*/function () {
	  function Plot(cfg) {
	    common.mix(this, cfg);

	    this._init();
	  }

	  var _proto = Plot.prototype;

	  _proto._init = function _init() {
	    var self = this;
	    var start = self.start;
	    var end = self.end;
	    var xMin = Math.min(start.x, end.x);
	    var xMax = Math.max(start.x, end.x);
	    var yMin = Math.min(start.y, end.y);
	    var yMax = Math.max(start.y, end.y);
	    this.tl = {
	      x: xMin,
	      y: yMin
	    };
	    this.tr = {
	      x: xMax,
	      y: yMin
	    };
	    this.bl = {
	      x: xMin,
	      y: yMax
	    };
	    this.br = {
	      x: xMax,
	      y: yMax
	    };
	    this.width = xMax - xMin;
	    this.height = yMax - yMin;
	  }
	  /**
	   * reset
	   * @param  {Object} start start point
	   * @param  {Object} end end point
	   */
	  ;

	  _proto.reset = function reset(start, end) {
	    this.start = start;
	    this.end = end;

	    this._init();
	  }
	  /**
	   * check the point is in the range of plot
	   * @param  {Nubmer}  x x value
	   * @param  {[type]}  y y value
	   * @return {Boolean} return the result
	   */
	  ;

	  _proto.isInRange = function isInRange(x, y) {
	    if (common.isObject(x)) {
	      y = x.y;
	      x = x.x;
	    }

	    var tl = this.tl;
	    var br = this.br;
	    return tl.x <= x && x <= br.x && tl.y <= y && y <= br.y;
	  };

	  return Plot;
	}();

	var plot = Plot;

	var Matrix = {
	  multiply: function multiply(m1, m2) {
	    var m11 = m1[0] * m2[0] + m1[2] * m2[1];
	    var m12 = m1[1] * m2[0] + m1[3] * m2[1];
	    var m21 = m1[0] * m2[2] + m1[2] * m2[3];
	    var m22 = m1[1] * m2[2] + m1[3] * m2[3];
	    var dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
	    var dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
	    return [m11, m12, m21, m22, dx, dy];
	  },
	  scale: function scale(out, m, v) {
	    out[0] = m[0] * v[0];
	    out[1] = m[1] * v[0];
	    out[2] = m[2] * v[1];
	    out[3] = m[3] * v[1];
	    out[4] = m[4];
	    out[5] = m[5];
	    return out;
	  },
	  rotate: function rotate(out, m, radian) {
	    var c = Math.cos(radian);
	    var s = Math.sin(radian);
	    var m11 = m[0] * c + m[2] * s;
	    var m12 = m[1] * c + m[3] * s;
	    var m21 = m[0] * -s + m[2] * c;
	    var m22 = m[1] * -s + m[3] * c;
	    out[0] = m11;
	    out[1] = m12;
	    out[2] = m21;
	    out[3] = m22;
	    out[4] = m[4];
	    out[5] = m[5];
	    return out;
	  },
	  translate: function translate(out, m, v) {
	    out[0] = m[0];
	    out[1] = m[1];
	    out[2] = m[2];
	    out[3] = m[3];
	    out[4] = m[4] + m[0] * v[0] + m[2] * v[1];
	    out[5] = m[5] + m[1] * v[0] + m[3] * v[1];
	    return out;
	  },
	  transform: function transform(m, actions) {
	    var out = [].concat(m);

	    for (var i = 0, len = actions.length; i < len; i++) {
	      var action = actions[i];

	      switch (action[0]) {
	        case 't':
	          Matrix.translate(out, out, [action[1], action[2]]);
	          break;

	        case 's':
	          Matrix.scale(out, out, [action[1], action[2]]);
	          break;

	        case 'r':
	          Matrix.rotate(out, out, action[1]);
	          break;
	      }
	    }

	    return out;
	  }
	};
	var matrix = Matrix;

	/**
	 * 2 Dimensional Vector
	 * @module vector2
	 */
	var vector2 = {
	  /**
	   * Creates a new, empty vector2
	   *
	   * @return {vector2} a new 2D vector
	   */
	  create: function create() {
	    return [0, 0];
	  },

	  /**
	   * Calculates the length of a vector2
	   *
	   * @param {vector2} v vector to calculate length of
	   * @return {Number} length of v
	   */
	  length: function length(v) {
	    var x = v[0];
	    var y = v[1];
	    return Math.sqrt(x * x + y * y);
	  },

	  /**
	   * Normalize a vector2
	   *
	   * @param {vector2} out the receiving vector
	   * @param {vector2} v vector to normalize
	   * @return {vector2} out
	   */
	  normalize: function normalize(out, v) {
	    var len = this.length(v);

	    if (len === 0) {
	      out[0] = 0;
	      out[1] = 0;
	    } else {
	      out[0] = v[0] / len;
	      out[1] = v[1] / len;
	    }

	    return out;
	  },

	  /**
	   * Adds two vector2's
	   *
	   * @param {vector2} out the receiving vector
	   * @param {vector2} v1 the first operand
	   * @param {vector2} v2 the second operand
	   * @return {vector2} out
	   */
	  add: function add(out, v1, v2) {
	    out[0] = v1[0] + v2[0];
	    out[1] = v1[1] + v2[1];
	    return out;
	  },

	  /**
	   * Subtracts vector v2 from vector v1
	   *
	   * @param {vector2} out the receiving vector
	   * @param {vector2} v1 the first operand
	   * @param {vector2} v2 the second operand
	   * @return {vector2} out
	   */
	  sub: function sub(out, v1, v2) {
	    out[0] = v1[0] - v2[0];
	    out[1] = v1[1] - v2[1];
	    return out;
	  },

	  /**
	   * Scales a vector2 by a scalar number
	   *
	   * @param {vector2} out the receiving vector
	   * @param {vector2} v the vector to scale
	   * @param {Number} s amount to scale the vector by
	   * @return {vector2} out
	   */
	  scale: function scale(out, v, s) {
	    out[0] = v[0] * s;
	    out[1] = v[1] * s;
	    return out;
	  },

	  /**
	   * Calculates the dot product of two vector2's
	   *
	   * @param {vector2} v1 the first operand
	   * @param {vector2} v2 the second operand
	   * @return {Number} dot product of v1 and v2
	   */
	  dot: function dot(v1, v2) {
	    return v1[0] * v2[0] + v1[1] * v2[1];
	  },

	  /**
	   * Calculates the direction of two vector2's
	   *
	   * @param {vector2} v1 the first operand
	   * @param {vector2} v2 the second operand
	   * @return {Boolean} the direction of v1 and v2
	   */
	  direction: function direction(v1, v2) {
	    return v1[0] * v2[1] - v2[0] * v1[1];
	  },

	  /**
	   * Calculates the angle of two vector2's
	   *
	   * @param {vector2} v1 the first operand
	   * @param {vector2} v2 the second operand
	   * @return {Number} angle of v1 and v2
	   */
	  angle: function angle(v1, v2) {
	    var theta = this.dot(v1, v2) / (this.length(v1) * this.length(v2));
	    return Math.acos(theta);
	  },

	  /**
	   * Calculates the angle of two vector2's with direction
	   *
	   * @param {vector2} v1 the first operand
	   * @param {vector2} v2 the second operand
	   * @param {Boolean} direction the direction of two vector2's
	   * @return {Number} angle of v1 and v2
	   */
	  angleTo: function angleTo(v1, v2, direction) {
	    var angle = this.angle(v1, v2);
	    var angleLargeThanPI = this.direction(v1, v2) >= 0;

	    if (direction) {
	      if (angleLargeThanPI) {
	        return Math.PI * 2 - angle;
	      }

	      return angle;
	    }

	    if (angleLargeThanPI) {
	      return angle;
	    }

	    return Math.PI * 2 - angle;
	  },

	  /**
	   * whether a vector2 is zero vector
	   *
	   * @param  {vector2} v vector to calculate
	   * @return {Boolean}   is or not a zero vector
	   */
	  zero: function zero(v) {
	    return v[0] === 0 && v[1] === 0;
	  },

	  /**
	   * Calculates the euclidian distance between two vector2's
	   *
	   * @param {vector2} v1 the first operand
	   * @param {vector2} v2 the second operand
	   * @return {Number} distance between a and b
	   */
	  distance: function distance(v1, v2) {
	    var x = v2[0] - v1[0];
	    var y = v2[1] - v1[1];
	    return Math.sqrt(x * x + y * y);
	  },

	  /**
	   * Creates a new vector2 initialized with values from an existing vector
	   *
	   * @param {vector2} v vector to clone
	   * @return {Array} a new 2D vector
	   */
	  clone: function clone(v) {
	    return [v[0], v[1]];
	  },

	  /**
	   * Return the minimum of two vector2's
	   *
	   * @param {vector2} out the receiving vector
	   * @param {vector2} v1 the first operand
	   * @param {vector2} v2 the second operand
	   * @return {vector2} out
	   */
	  min: function min(out, v1, v2) {
	    out[0] = Math.min(v1[0], v2[0]);
	    out[1] = Math.min(v1[1], v2[1]);
	    return out;
	  },

	  /**
	   * Return the maximum of two vector2's
	   *
	   * @param {vector2} out the receiving vector
	   * @param {vector2} v1 the first operand
	   * @param {vector2} v2 the second operand
	   * @return {vector2} out
	   */
	  max: function max(out, v1, v2) {
	    out[0] = Math.max(v1[0], v2[0]);
	    out[1] = Math.max(v1[1], v2[1]);
	    return out;
	  },

	  /**
	   * Transforms the vector2 with a mat2d
	   *
	   * @param {vector2} out the receiving vector
	   * @param {vector2} v the vector to transform
	   * @param {mat2d} m matrix to transform with
	   * @return {vector2} out
	   */
	  transformMat2d: function transformMat2d(out, v, m) {
	    var x = v[0];
	    var y = v[1];
	    out[0] = m[0] * x + m[2] * y + m[4];
	    out[1] = m[1] * x + m[3] * y + m[5];
	    return out;
	  }
	};

	var defaultMatrix = [1, 0, 0, 1, 0, 0];

	var Base$1 = /*#__PURE__*/function () {
	  var _proto = Base.prototype;

	  _proto._initDefaultCfg = function _initDefaultCfg() {};

	  function Base(cfg) {
	    this._initDefaultCfg();

	    common.mix(this, cfg);
	    var start;
	    var end;

	    if (this.plot) {
	      start = this.plot.bl;
	      end = this.plot.tr;
	      this.start = start;
	      this.end = end;
	    } else {
	      start = this.start;
	      end = this.end;
	    }

	    this.init(start, end);
	  }

	  _proto._scale = function _scale(s1, s2) {
	    var matrix$1 = this.matrix;
	    var center = this.center;
	    matrix.translate(matrix$1, matrix$1, [center.x, center.y]);
	    matrix.scale(matrix$1, matrix$1, [s1, s2]);
	    matrix.translate(matrix$1, matrix$1, [-center.x, -center.y]);
	  };

	  _proto.init = function init(start, end) {
	    this.matrix = [].concat(defaultMatrix); // 设置中心点

	    this.center = {
	      x: (end.x - start.x) / 2 + start.x,
	      y: (end.y - start.y) / 2 + start.y
	    };

	    if (this.scale) {
	      this._scale(this.scale[0], this.scale[1]);
	    }
	  };

	  _proto.convertPoint = function convertPoint(point) {
	    var _this$_convertPoint = this._convertPoint(point),
	        x = _this$_convertPoint.x,
	        y = _this$_convertPoint.y;

	    var vector = [x, y];
	    vector2.transformMat2d(vector, vector, this.matrix);
	    return {
	      x: vector[0],
	      y: vector[1]
	    };
	  };

	  _proto.invertPoint = function invertPoint(point) {
	    return this._invertPoint(point);
	  };

	  _proto._convertPoint = function _convertPoint(point) {
	    return point;
	  };

	  _proto._invertPoint = function _invertPoint(point) {
	    return point;
	  };

	  _proto.reset = function reset(plot) {
	    this.plot = plot;
	    var bl = plot.bl,
	        tr = plot.tr;
	    this.start = bl;
	    this.end = tr;
	    this.init(bl, tr);
	  };

	  return Base;
	}();

	var base$1 = Base$1;

	var _possibleConstructorReturn2$1 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$1 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$1 = interopRequireDefault(inheritsLoose);



	var Cartesian = /*#__PURE__*/function (_Base) {
	  (0, _inheritsLoose2$1["default"])(Cartesian, _Base);

	  function Cartesian() {
	    return _Base.apply(this, arguments) || this;
	  }

	  var _proto = Cartesian.prototype;

	  _proto._initDefaultCfg = function _initDefaultCfg() {
	    this.type = 'cartesian';
	    this.transposed = false;
	    this.isRect = true;
	  };

	  _proto.init = function init(start, end) {
	    _Base.prototype.init.call(this, start, end);

	    this.x = {
	      start: start.x,
	      end: end.x
	    };
	    this.y = {
	      start: start.y,
	      end: end.y
	    };
	  };

	  _proto._convertPoint = function _convertPoint(point) {
	    var self = this;
	    var transposed = self.transposed;
	    var xDim = transposed ? 'y' : 'x';
	    var yDim = transposed ? 'x' : 'y';
	    var x = self.x;
	    var y = self.y;
	    return {
	      x: x.start + (x.end - x.start) * point[xDim],
	      y: y.start + (y.end - y.start) * point[yDim]
	    };
	  };

	  _proto._invertPoint = function _invertPoint(point) {
	    var self = this;
	    var transposed = self.transposed;
	    var xDim = transposed ? 'y' : 'x';
	    var yDim = transposed ? 'x' : 'y';
	    var x = self.x;
	    var y = self.y;
	    var rst = {};
	    rst[xDim] = (point.x - x.start) / (x.end - x.start);
	    rst[yDim] = (point.y - y.start) / (y.end - y.start);
	    return rst;
	  };

	  return Cartesian;
	}(base$1);

	base$1.Cartesian = Cartesian;
	base$1.Rect = Cartesian;

	var coord = base$1;

	var base$2 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports["default"] = void 0;



	/**
	 * @fileOverview the Attribute base class
	 */
	function toScaleString(scale, value) {
	  if ((0, esm.isString)(value)) {
	    return value;
	  }

	  return scale.invert(scale.scale(value));
	}
	/**
	 * 所有视觉通道属性的基类
	 * @class Attr
	 */


	var AttributeBase = /*#__PURE__*/function () {
	  function AttributeBase(cfg) {
	    var _this = this;

	    /**
	     * 属性的类型
	     * @type {String}
	     */
	    this.type = 'base';
	    /**
	     * 属性的名称
	     * @type {String}
	     */

	    this.name = null;
	    /**
	     * 回调函数
	     * @type {Function}
	     */

	    this.method = null;
	    /**
	     * 备选的值数组
	     * @type {Array}
	     */

	    this.values = [];
	    /**
	     * 属性内部的度量
	     * @type {Array}
	     */

	    this.scales = [];
	    /**
	     * 是否通过线性取值, 如果未指定，则根据数值的类型判定
	     * @type {Boolean}
	     */

	    this.linear = null;
	    /**
	     * 当用户设置的 callback 返回 null 时, 应该返回默认 callback 中的值
	     */

	    var mixedCallback = null;
	    var defaultCallback = this.callback;

	    if (cfg.callback) {
	      var userCallback = cfg.callback;

	      mixedCallback = function mixedCallback() {
	        for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
	          params[_key] = arguments[_key];
	        }

	        var ret = userCallback.apply(void 0, params);

	        if ((0, esm.isNil)(ret)) {
	          ret = defaultCallback.apply(_this, params);
	        }

	        return ret;
	      };
	    }

	    (0, esm.mix)(this, cfg);

	    if (mixedCallback) {
	      (0, esm.mix)(this, {
	        callback: mixedCallback
	      });
	    }
	  } // 获取属性值，将值映射到视觉通道


	  var _proto = AttributeBase.prototype;

	  _proto._getAttrValue = function _getAttrValue(scale, value) {
	    var values = this.values;

	    if (scale.isCategory && !this.linear) {
	      var index = scale.translate(value);
	      return values[index % values.length];
	    }

	    var percent = scale.scale(value);
	    return this.getLinearValue(percent);
	  }
	  /**
	   * 如果进行线性映射，返回对应的映射值
	   * @protected
	   * @param  {Number} percent 百分比
	   * @return {*}  颜色值、形状、大小等
	   */
	  ;

	  _proto.getLinearValue = function getLinearValue(percent) {
	    var values = this.values;
	    var steps = values.length - 1;
	    var step = Math.floor(steps * percent);
	    var leftPercent = steps * percent - step;
	    var start = values[step];
	    var end = step === steps ? start : values[step + 1];
	    var rstValue = start + (end - start) * leftPercent;
	    return rstValue;
	  }
	  /**
	   * 默认的回调函数
	   * @param {*} value 回调函数的值
	   * @type {Function}
	   * @return {Array} 返回映射后的值
	   */
	  ;

	  _proto.callback = function callback(value) {
	    var self = this;
	    var scale = self.scales[0];
	    var rstValue = null;

	    if (scale.type === 'identity') {
	      rstValue = scale.value;
	    } else {
	      rstValue = self._getAttrValue(scale, value);
	    }

	    return rstValue;
	  }
	  /**
	   * 根据度量获取属性名
	   * @return {Array} dims of this Attribute
	   */
	  ;

	  _proto.getNames = function getNames() {
	    var scales = this.scales;
	    var names = this.names;
	    var length = Math.min(scales.length, names.length);
	    var rst = [];

	    for (var i = 0; i < length; i++) {
	      rst.push(names[i]);
	    }

	    return rst;
	  }
	  /**
	   * 根据度量获取维度名
	   * @return {Array} dims of this Attribute
	   */
	  ;

	  _proto.getFields = function getFields() {
	    var scales = this.scales;
	    var rst = [];
	    (0, esm.each)(scales, function (scale) {
	      rst.push(scale.field);
	    });
	    return rst;
	  }
	  /**
	   * 根据名称获取度量
	   * @param  {String} name the name of scale
	   * @return {Scale} scale
	   */
	  ;

	  _proto.getScale = function getScale(name) {
	    var scales = this.scales;
	    var names = this.names;
	    var index = names.indexOf(name);
	    return scales[index];
	  }
	  /**
	   * 映射数据
	   * @param {*} param1...paramn 多个数值
	   * @return {Array} 映射的值组成的数组
	   */
	  ;

	  _proto.mapping = function mapping() {
	    var scales = this.scales;
	    var callback = this.callback;

	    for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      params[_key2] = arguments[_key2];
	    }

	    var values = params;

	    if (callback) {
	      for (var i = 0, len = params.length; i < len; i++) {
	        params[i] = this._toOriginParam(params[i], scales[i]);
	      }

	      values = callback.apply(this, params);
	    }

	    values = [].concat(values);
	    return values;
	  } // 原始的参数
	  ;

	  _proto._toOriginParam = function _toOriginParam(param, scale) {
	    var rst = param;

	    if (!scale.isLinear) {
	      if ((0, esm.isArray)(param)) {
	        rst = [];

	        for (var i = 0, len = param.length; i < len; i++) {
	          rst.push(toScaleString(scale, param[i]));
	        }
	      } else {
	        rst = toScaleString(scale, param);
	      }
	    }

	    return rst;
	  };

	  return AttributeBase;
	}();

	var _default = AttributeBase;
	exports["default"] = _default;
	});

	unwrapExports(base$2);

	var position = createCommonjsModule(function (module, exports) {



	exports.__esModule = true;
	exports["default"] = void 0;

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2 = interopRequireDefault(inheritsLoose);



	var _base = interopRequireDefault(base$2);

	var Position = /*#__PURE__*/function (_Base) {
	  (0, _inheritsLoose2["default"])(Position, _Base);

	  function Position(cfg) {
	    var _this;

	    _this = _Base.call(this, cfg) || this;
	    _this.names = ['x', 'y'];
	    _this.type = 'position';
	    return _this;
	  }

	  var _proto = Position.prototype;

	  _proto.mapping = function mapping(x, y) {
	    var scales = this.scales;
	    var coord = this.coord;
	    var scaleX = scales[0];
	    var scaleY = scales[1];
	    var rstX;
	    var rstY;
	    var obj;

	    if ((0, esm.isNil)(x) || (0, esm.isNil)(y)) {
	      return [];
	    }

	    if ((0, esm.isArray)(y) && (0, esm.isArray)(x)) {
	      rstX = [];
	      rstY = [];

	      for (var i = 0, j = 0, xLen = x.length, yLen = y.length; i < xLen && j < yLen; i++, j++) {
	        obj = coord.convertPoint({
	          x: scaleX.scale(x[i]),
	          y: scaleY.scale(y[j])
	        });
	        rstX.push(obj.x);
	        rstY.push(obj.y);
	      }
	    } else if ((0, esm.isArray)(y)) {
	      x = scaleX.scale(x);
	      rstY = [];
	      (0, esm.each)(y, function (yVal) {
	        yVal = scaleY.scale(yVal);
	        obj = coord.convertPoint({
	          x: x,
	          y: yVal
	        });

	        if (rstX && rstX !== obj.x) {
	          if (!(0, esm.isArray)(rstX)) {
	            rstX = [rstX];
	          }

	          rstX.push(obj.x);
	        } else {
	          rstX = obj.x;
	        }

	        rstY.push(obj.y);
	      });
	    } else if ((0, esm.isArray)(x)) {
	      y = scaleY.scale(y);
	      rstX = [];
	      (0, esm.each)(x, function (xVal) {
	        xVal = scaleX.scale(xVal);
	        obj = coord.convertPoint({
	          x: xVal,
	          y: y
	        });

	        if (rstY && rstY !== obj.y) {
	          if (!(0, esm.isArray)(rstY)) {
	            rstY = [rstY];
	          }

	          rstY.push(obj.y);
	        } else {
	          rstY = obj.y;
	        }

	        rstX.push(obj.x);
	      });
	    } else {
	      x = scaleX.scale(x);
	      y = scaleY.scale(y);
	      var point = coord.convertPoint({
	        x: x,
	        y: y
	      });
	      rstX = point.x;
	      rstY = point.y;
	    }

	    return [rstX, rstY];
	  };

	  return Position;
	}(_base["default"]);

	var _default = Position;
	exports["default"] = _default;
	});

	unwrapExports(position);

	var shape = createCommonjsModule(function (module, exports) {



	exports.__esModule = true;
	exports["default"] = void 0;

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2 = interopRequireDefault(inheritsLoose);

	var _base = interopRequireDefault(base$2);

	var Shape = /*#__PURE__*/function (_Base) {
	  (0, _inheritsLoose2["default"])(Shape, _Base);

	  function Shape(cfg) {
	    var _this;

	    _this = _Base.call(this, cfg) || this;
	    _this.names = ['shape'];
	    _this.type = 'shape';
	    _this.gradient = null;
	    return _this;
	  }
	  /**
	   * @override
	   */


	  var _proto = Shape.prototype;

	  _proto.getLinearValue = function getLinearValue(percent) {
	    var values = this.values;
	    var index = Math.round((values.length - 1) * percent);
	    return values[index];
	  };

	  return Shape;
	}(_base["default"]);

	var _default = Shape;
	exports["default"] = _default;
	});

	unwrapExports(shape);

	var size$1 = createCommonjsModule(function (module, exports) {



	exports.__esModule = true;
	exports["default"] = void 0;

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2 = interopRequireDefault(inheritsLoose);

	var _base = interopRequireDefault(base$2);

	var Size = /*#__PURE__*/function (_Base) {
	  (0, _inheritsLoose2["default"])(Size, _Base);

	  function Size(cfg) {
	    var _this;

	    _this = _Base.call(this, cfg) || this;
	    _this.names = ['size'];
	    _this.type = 'size';
	    _this.gradient = null;
	    return _this;
	  }

	  return Size;
	}(_base["default"]);

	var _default = Size;
	exports["default"] = _default;
	});

	unwrapExports(size$1);

	var colorUtil = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports["default"] = void 0;



	// Get the interpolation between colors
	function getValue(start, end, percent, index) {
	  var value = start[index] + (end[index] - start[index]) * percent;
	  return value;
	} // convert to hex


	function arr2hex(arr) {
	  return '#' + toRGBValue(arr[0]) + toRGBValue(arr[1]) + toRGBValue(arr[2]);
	}

	function toRGBValue(value) {
	  value = Math.round(value);
	  value = value.toString(16);

	  if (value.length === 1) {
	    value = '0' + value;
	  }

	  return value;
	}

	function calColor(colors, percent) {
	  var steps = colors.length - 1;
	  var step = Math.floor(steps * percent);
	  var left = steps * percent - step;
	  var start = colors[step];
	  var end = step === steps ? start : colors[step + 1];
	  var rgb = arr2hex([getValue(start, end, left, 0), getValue(start, end, left, 1), getValue(start, end, left, 2)]);
	  return rgb;
	}

	function hex2arr(str) {
	  var arr = [];
	  arr.push(parseInt(str.substr(1, 2), 16));
	  arr.push(parseInt(str.substr(3, 2), 16));
	  arr.push(parseInt(str.substr(5, 2), 16));
	  return arr;
	}

	var colorCache = {
	  black: '#000000',
	  blue: '#0000ff',
	  grey: '#808080',
	  green: '#008000',
	  orange: '#ffa500',
	  pink: '#ffc0cb',
	  purple: '#800080',
	  red: '#ff0000',
	  white: '#ffffff',
	  yellow: '#ffff00'
	};
	var ColorUtil = {
	  /**
	   * Returns a hexadecimal string representing this color in RGB space, such as #f7eaba.
	   * @param  {String} color color value
	   * @return {String} Returns a hexadecimal string
	   */
	  toHex: function toHex(color) {
	    if (colorCache[color]) {
	      return colorCache[color];
	    }

	    if (color[0] === '#') {
	      if (color.length === 7) {
	        return color;
	      }

	      var hex = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
	        return '#' + r + r + g + g + b + b;
	      }); // hex3 to hex6

	      colorCache[color] = hex;
	      return hex;
	    } // rgb/rgba to hex


	    var rst = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	    rst.shift();
	    rst = arr2hex(rst);
	    colorCache[color] = rst;
	    return rst;
	  },
	  hex2arr: hex2arr,

	  /**
	   * handle the gradient color
	   * @param  {Array} colors the colors
	   * @return {String} return the color value
	   */
	  gradient: function gradient(colors) {
	    var points = [];

	    if ((0, esm.isString)(colors)) {
	      colors = colors.split('-');
	    }

	    (0, esm.each)(colors, function (color) {
	      if (color.indexOf('#') === -1) {
	        color = ColorUtil.toHex(color);
	      }

	      points.push(hex2arr(color));
	    });
	    return function (percent) {
	      return calColor(points, percent);
	    };
	  }
	};
	var _default = ColorUtil;
	exports["default"] = _default;
	});

	unwrapExports(colorUtil);

	var color = createCommonjsModule(function (module, exports) {



	exports.__esModule = true;
	exports["default"] = void 0;

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2 = interopRequireDefault(inheritsLoose);



	var _base = interopRequireDefault(base$2);

	var _colorUtil = interopRequireDefault(colorUtil);

	var Color = /*#__PURE__*/function (_Base) {
	  (0, _inheritsLoose2["default"])(Color, _Base);

	  function Color(cfg) {
	    var _this;

	    _this = _Base.call(this, cfg) || this;
	    _this.names = ['color'];
	    _this.type = 'color';
	    _this.gradient = null;

	    if ((0, esm.isString)(_this.values)) {
	      _this.linear = true;
	    }

	    return _this;
	  }
	  /**
	   * @override
	   */


	  var _proto = Color.prototype;

	  _proto.getLinearValue = function getLinearValue(percent) {
	    var gradient = this.gradient;

	    if (!gradient) {
	      var values = this.values;
	      gradient = _colorUtil["default"].gradient(values);
	      this.gradient = gradient;
	    }

	    return gradient(percent);
	  };

	  return Color;
	}(_base["default"]);

	var _default = Color;
	exports["default"] = _default;
	});

	unwrapExports(color);

	var attr = createCommonjsModule(function (module, exports) {



	exports.__esModule = true;
	exports.Color = exports.Size = exports.Shape = exports.Position = void 0;

	var _position = interopRequireDefault(position);

	exports.Position = _position["default"];

	var _shape = interopRequireDefault(shape);

	exports.Shape = _shape["default"];

	var _size = interopRequireDefault(size$1);

	exports.Size = _size["default"];

	var _color = interopRequireDefault(color);

	exports.Color = _color["default"];
	});

	unwrapExports(attr);
	var attr_1 = attr.Color;
	var attr_2 = attr.Size;
	var attr_3 = attr.Shape;
	var attr_4 = attr.Position;

	var Shape = {};
	var ShapeBase = {
	  _coord: null,

	  /**
	   * draw the shape
	   * @param {Object} cfg options
	   * @param {Object} container container to store the shapes
	   */
	  draw: function draw(cfg, container) {
	    if (this.drawShape) {
	      this.drawShape(cfg, container);
	    }
	  },

	  /**
	   * set the coordinate instance
	   * @param {Coord} coord coordinate instance
	   */
	  setCoord: function setCoord(coord) {
	    this._coord = coord;
	  },

	  /**
	   * convert the normalized value to the canvas position
	   * @param  {point} point the point to convert
	   * @return {point} point return the result
	   */
	  parsePoint: function parsePoint(point) {
	    var coord = this._coord;

	    if (coord.isPolar) {
	      if (point.x === 1) point.x = 0.9999999;
	      if (point.y === 1) point.y = 0.9999999;
	    }

	    return coord.convertPoint(point);
	  },

	  /**
	   * convert the normalized value to the canvas position
	   * @param  {points} points the array that store the points
	   * @return {points} points return the result
	   */
	  parsePoints: function parsePoints(points) {
	    if (!points) return false;
	    var self = this;
	    var rst = [];
	    points.forEach(function (point) {
	      rst.push(self.parsePoint(point));
	    });
	    return rst;
	  }
	};
	var ShapeFactoryBase = {
	  defaultShapeType: null,
	  setCoord: function setCoord(coord) {
	    this._coord = coord;
	  },
	  getShape: function getShape(type) {
	    var self = this;

	    if (common.isArray(type)) {
	      type = type[0];
	    }

	    var shape = self[type] || self[self.defaultShapeType];
	    shape._coord = self._coord;
	    return shape;
	  },
	  getShapePoints: function getShapePoints(type, cfg) {
	    var shape = this.getShape(type);
	    var fn = shape.getPoints || shape.getShapePoints || this.getDefaultPoints;
	    var points = fn(cfg);
	    return points;
	  },
	  getDefaultPoints: function getDefaultPoints()
	  /* cfg */
	  {
	    return [];
	  },
	  drawShape: function drawShape(type, cfg, container) {
	    var shape = this.getShape(type);

	    if (!cfg.color) {
	      cfg.color = global.colors[0];
	    }

	    return shape.draw(cfg, container);
	  }
	};

	Shape.registerFactory = function (factoryName, cfg) {
	  var className = common.upperFirst(factoryName);
	  var geomObj = common.mix({}, ShapeFactoryBase, cfg);
	  Shape[className] = geomObj;
	  geomObj.name = factoryName;
	  return geomObj;
	};

	Shape.registerShape = function (factoryName, shapeType, cfg) {
	  var className = common.upperFirst(factoryName);
	  var factory = Shape[className];
	  var shapeObj = common.mix({}, ShapeBase, cfg);
	  factory[shapeType] = shapeObj;
	  return shapeObj;
	};

	Shape.registShape = Shape.registerShape;

	Shape.getShapeFactory = function (factoryName) {
	  var self = this;
	  factoryName = factoryName || 'point';
	  var className = common.upperFirst(factoryName);
	  return self[className];
	};

	var shape$1 = Shape;

	function _mix$1(dist, obj) {
	  for (var key in obj) {
	    if (obj.hasOwnProperty(key) && key !== 'constructor' && obj[key] !== undefined) {
	      dist[key] = obj[key];
	    }
	  }
	}

	var mix$1 = function mix(dist, src1, src2, src3) {
	  if (src1) _mix$1(dist, src1);
	  if (src2) _mix$1(dist, src2);
	  if (src3) _mix$1(dist, src3);
	  return dist;
	};

	var mix_1 = mix$1;

	var Adjust =
	/*#__PURE__*/
	function () {
	  var _proto = Adjust.prototype;

	  _proto._initDefaultCfg = function _initDefaultCfg() {
	    this.adjustNames = ['x', 'y']; // 调整的维度，默认,x,y都做调整
	  };

	  function Adjust(cfg) {
	    this._initDefaultCfg();

	    mix_1(this, cfg);
	  }
	  /**
	   * @override
	   */


	  _proto.processAdjust = function processAdjust()
	  /* dataArray */
	  {};

	  return Adjust;
	}();

	var base$3 = Adjust;

	var _possibleConstructorReturn2$2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$2 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$2 = interopRequireDefault(inheritsLoose);

	var Attr = interopRequireWildcard(attr);





	var GROUP_ATTRS = ['color', 'size', 'shape'];
	var FIELD_ORIGIN = '_origin';
	var FIELD_ORIGIN_Y = '_originY';







	function parseFields(field) {
	  if (common.isArray(field)) {
	    return field;
	  }

	  if (common.isString(field)) {
	    return field.split('*');
	  }

	  return [field];
	}
	/**
	 * The parent class for Geometry
	 * @class Geom
	 */


	var Geom = /*#__PURE__*/function (_Base) {
	  (0, _inheritsLoose2$2["default"])(Geom, _Base);

	  function Geom() {
	    return _Base.apply(this, arguments) || this;
	  }

	  var _proto = Geom.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    return {
	      /**
	       * geometry type
	       * @type {String}
	       */
	      type: null,

	      /**
	       * the data of geometry
	       * @type {Array}
	       */
	      data: null,

	      /**
	       * the attrs of geo,etry
	       * @type {Object}
	       */
	      attrs: {},
	      scales: {},

	      /**
	       * group for storing the shapes
	       * @type {Canvas}
	       */
	      container: null,

	      /**
	       * style options
	       * @type {Object}
	       */
	      styleOptions: null,
	      chart: null,
	      shapeType: '',

	      /**
	       * wether to generate key points for each shape
	       * @protected
	       * @type {Boolean}
	       */
	      generatePoints: false,
	      attrOptions: {},
	      sortable: false,
	      startOnZero: true,
	      visible: true,
	      connectNulls: false,
	      // 是否丢弃没有值的分组。
	      ignoreEmptyGroup: false
	    };
	  };

	  _proto.init = function init() {
	    var self = this;

	    self._initAttrs();

	    self._processData();
	  };

	  _proto._getGroupScales = function _getGroupScales() {
	    var self = this;
	    var scales = [];
	    common.each(GROUP_ATTRS, function (attrName) {
	      var attr = self.getAttr(attrName);

	      if (attr) {
	        var attrScales = attr.scales;
	        common.each(attrScales, function (scale) {
	          if (scale && scale.isCategory && scales.indexOf(scale) === -1) {
	            scales.push(scale);
	          }
	        });
	      }
	    });
	    return scales;
	  };

	  _proto._groupData = function _groupData(data) {
	    var self = this;
	    var colDefs = self.get('colDefs');

	    var groupScales = self._getGroupScales();

	    if (groupScales.length) {
	      var appendConditions = {};
	      var names = [];
	      common.each(groupScales, function (scale) {
	        var field = scale.field;
	        names.push(field);

	        if (colDefs && colDefs[field] && colDefs[field].values) {
	          // users have defined
	          appendConditions[scale.field] = colDefs[field].values;
	        }
	      });
	      return common.Array.group(data, names, appendConditions);
	    }

	    return [data];
	  };

	  _proto._setAttrOptions = function _setAttrOptions(attrName, attrCfg) {
	    var options = this.get('attrOptions');
	    options[attrName] = attrCfg;
	    var attrs = this.get('attrs'); // 说明已经初始化过了

	    if (Object.keys(attrs).length) {
	      this._createAttr(attrName, attrCfg);
	    }
	  };

	  _proto._createAttrOption = function _createAttrOption(attrName, field, cfg, defaultValues) {
	    var attrCfg = {};
	    attrCfg.field = field;

	    if (cfg) {
	      if (common.isFunction(cfg)) {
	        attrCfg.callback = cfg;
	      } else {
	        attrCfg.values = cfg;
	      }
	    } else {
	      attrCfg.values = defaultValues;
	    }

	    this._setAttrOptions(attrName, attrCfg);
	  };

	  _proto._createAttr = function _createAttr(type, option) {
	    var self = this;
	    var attrs = self.get('attrs');
	    var coord = self.get('coord');
	    var className = common.upperFirst(type);
	    var fields = parseFields(option.field);

	    if (type === 'position') {
	      option.coord = coord;
	    }

	    var scales = [];

	    for (var i = 0, len = fields.length; i < len; i++) {
	      var field = fields[i];

	      var scale = self._createScale(field);

	      scales.push(scale);
	    }

	    if (type === 'position') {
	      var yScale = scales[1]; // 饼图的处理，但是还不知道为啥

	      if (coord.type === 'polar' && coord.transposed && self.hasAdjust('stack')) {
	        if (yScale.values.length) {
	          yScale.change({
	            nice: false,
	            min: 0,
	            max: Math.max.apply(null, yScale.values)
	          });
	        }
	      }
	    }

	    option.scales = scales;
	    var attr = new Attr[className](option);
	    attrs[type] = attr;
	    return attr;
	  };

	  _proto._initAttrs = function _initAttrs() {
	    var self = this;
	    var attrOptions = self.get('attrOptions');

	    for (var type in attrOptions) {
	      if (attrOptions.hasOwnProperty(type)) {
	        this._createAttr(type, attrOptions[type]);
	      }
	    }
	  };

	  _proto._createScale = function _createScale(field) {
	    var scales = this.get('scales');
	    var scale = scales[field];

	    if (!scale) {
	      scale = this.get('chart').createScale(field);
	      scales[field] = scale;
	    }

	    return scale;
	  };

	  _proto._processData = function _processData() {
	    var self = this;
	    var data = this.get('data');
	    var dataArray = [];

	    var groupedArray = this._groupData(data);

	    if (this.get('ignoreEmptyGroup')) {
	      var yScale = this.getYScale();
	      groupedArray = groupedArray.filter(function (group) {
	        return group.some(function (item) {
	          return typeof item[yScale.field] !== 'undefined';
	        });
	      });
	    }

	    for (var i = 0, len = groupedArray.length; i < len; i++) {
	      var subData = groupedArray[i];

	      var tempData = self._saveOrigin(subData);

	      if (this.hasAdjust('dodge')) {
	        self._numberic(tempData);
	      }

	      dataArray.push(tempData);
	    }

	    if (self.get('adjust')) {
	      self._adjustData(dataArray);
	    }

	    if (self.get('sortable')) {
	      self._sort(dataArray);
	    }

	    self.set('dataArray', dataArray);
	    return dataArray;
	  };

	  _proto._saveOrigin = function _saveOrigin(data) {
	    var rst = [];

	    for (var i = 0, len = data.length; i < len; i++) {
	      var origin = data[i];
	      var obj = {};

	      for (var k in origin) {
	        obj[k] = origin[k];
	      }

	      obj[FIELD_ORIGIN] = origin;
	      rst.push(obj);
	    }

	    return rst;
	  };

	  _proto._numberic = function _numberic(data) {
	    var positionAttr = this.getAttr('position');
	    var scales = positionAttr.scales;

	    for (var j = 0, len = data.length; j < len; j++) {
	      var obj = data[j];
	      var count = Math.min(2, scales.length);

	      for (var i = 0; i < count; i++) {
	        var scale = scales[i];

	        if (scale.isCategory) {
	          var field = scale.field;
	          obj[field] = scale.translate(obj[field]);
	        }
	      }
	    }
	  };

	  _proto._adjustData = function _adjustData(dataArray) {
	    var self = this;
	    var adjust = self.get('adjust');

	    if (adjust) {
	      var adjustType = common.upperFirst(adjust.type);

	      if (!base$3[adjustType]) {
	        throw new Error('not support such adjust : ' + adjust);
	      }

	      var xScale = self.getXScale();
	      var yScale = self.getYScale();
	      var cfg = common.mix({
	        xField: xScale.field,
	        yField: yScale.field
	      }, adjust);
	      var adjustObject = new base$3[adjustType](cfg);
	      adjustObject.processAdjust(dataArray);

	      if (adjustType === 'Stack') {
	        self._updateStackRange(yScale.field, yScale, dataArray);
	      }
	    }
	  };

	  _proto._updateStackRange = function _updateStackRange(field, scale, dataArray) {
	    var mergeArray = common.Array.merge(dataArray);
	    var min = scale.min;
	    var max = scale.max;

	    for (var i = 0, len = mergeArray.length; i < len; i++) {
	      var obj = mergeArray[i];
	      var tmpMin = Math.min.apply(null, obj[field]);
	      var tmpMax = Math.max.apply(null, obj[field]);

	      if (tmpMin < min) {
	        min = tmpMin;
	      }

	      if (tmpMax > max) {
	        max = tmpMax;
	      }
	    }

	    if (min < scale.min || max > scale.max) {
	      scale.change({
	        min: min,
	        max: max
	      });
	    }
	  };

	  _proto._sort = function _sort(mappedArray) {
	    var self = this;
	    var xScale = self.getXScale();
	    var field = xScale.field,
	        type = xScale.type;

	    if (type !== 'identity' && xScale.values.length > 1) {
	      common.each(mappedArray, function (itemArr) {
	        itemArr.sort(function (obj1, obj2) {
	          if (type === 'timeCat') {
	            return xScale._toTimeStamp(obj1[FIELD_ORIGIN][field]) - xScale._toTimeStamp(obj2[FIELD_ORIGIN][field]);
	          }

	          return xScale.translate(obj1[FIELD_ORIGIN][field]) - xScale.translate(obj2[FIELD_ORIGIN][field]);
	        });
	      });
	    }

	    self.set('hasSorted', true);
	    self.set('dataArray', mappedArray);
	  };

	  _proto.paint = function paint() {
	    var self = this;
	    var dataArray = self.get('dataArray');
	    var mappedArray = [];
	    var shapeFactory = self.getShapeFactory();
	    shapeFactory.setCoord(self.get('coord'));

	    self._beforeMapping(dataArray);

	    for (var i = 0, len = dataArray.length; i < len; i++) {
	      var data = dataArray[i];

	      if (data.length) {
	        data = self._mapping(data);
	        mappedArray.push(data);
	        self.draw(data, shapeFactory);
	      }
	    }

	    self.set('dataArray', mappedArray);
	  };

	  _proto.getShapeFactory = function getShapeFactory() {
	    var shapeFactory = this.get('shapeFactory');

	    if (!shapeFactory) {
	      var shapeType = this.get('shapeType');
	      shapeFactory = shape$1.getShapeFactory(shapeType);
	      this.set('shapeFactory', shapeFactory);
	    }

	    return shapeFactory;
	  };

	  _proto._mapping = function _mapping(data) {
	    var self = this;
	    var attrs = self.get('attrs');
	    var yField = self.getYScale().field; // 用来缓存转换的值，减少mapping耗时

	    var mappedCache = {};

	    for (var k in attrs) {
	      if (attrs.hasOwnProperty(k)) {
	        var attr = attrs[k];
	        var names = attr.names;
	        var scales = attr.scales;

	        for (var i = 0, len = data.length; i < len; i++) {
	          var record = data[i];
	          record[FIELD_ORIGIN_Y] = record[yField]; // 获取视觉属性对应的value值
	          // 位置的缓存命中率低，还是每次单独计算

	          if (attr.type === 'position') {
	            var values = self._getAttrValues(attr, record);

	            for (var j = 0, _len = values.length; j < _len; j++) {
	              var val = values[j];
	              var name = names[j];
	              record[name] = common.isArray(val) && val.length === 1 ? val[0] : val;
	            }
	          } else {
	            // 除了position其他都只有一项
	            var _name = names[0];
	            var field = scales[0].field;
	            var value = record[field];
	            var key = "" + _name + value;
	            var _values = mappedCache[key];

	            if (!_values) {
	              _values = self._getAttrValues(attr, record);
	              mappedCache[key] = _values;
	            }

	            record[_name] = _values[0];
	          }
	        }
	      }
	    }

	    return data;
	  };

	  _proto._getAttrValues = function _getAttrValues(attr, record) {
	    var scales = attr.scales;
	    var params = [];

	    for (var i = 0, len = scales.length; i < len; i++) {
	      var scale = scales[i];
	      var field = scale.field;

	      if (scale.type === 'identity') {
	        params.push(scale.value);
	      } else {
	        params.push(record[field]);
	      }
	    }

	    var values = attr.mapping.apply(attr, params);
	    return values;
	  };

	  _proto.getAttrValue = function getAttrValue(attrName, record) {
	    var attr = this.getAttr(attrName);
	    var rst = null;

	    if (attr) {
	      var values = this._getAttrValues(attr, record);

	      rst = values[0];
	    }

	    return rst;
	  };

	  _proto._beforeMapping = function _beforeMapping(dataArray) {
	    var self = this;

	    if (self.get('generatePoints')) {
	      self._generatePoints(dataArray);
	    }
	  };

	  _proto.isInCircle = function isInCircle() {
	    var coord = this.get('coord');
	    return coord && coord.isPolar;
	  };

	  _proto.getCallbackCfg = function getCallbackCfg(fields, cfg, origin) {
	    if (!fields) {
	      return cfg;
	    }

	    var tmpCfg = {};
	    var params = fields.map(function (field) {
	      return origin[field];
	    });
	    common.each(cfg, function (v, k) {
	      if (common.isFunction(v)) {
	        tmpCfg[k] = v.apply(null, params);
	      } else {
	        tmpCfg[k] = v;
	      }
	    });
	    return tmpCfg;
	  };

	  _proto.getDrawCfg = function getDrawCfg(obj) {
	    var self = this;
	    var isInCircle = self.isInCircle();
	    var cfg = {
	      origin: obj,
	      x: obj.x,
	      y: obj.y,
	      color: obj.color,
	      size: obj.size,
	      shape: obj.shape,
	      isInCircle: isInCircle,
	      opacity: obj.opacity
	    };
	    var styleOptions = self.get('styleOptions');

	    if (styleOptions && styleOptions.style) {
	      cfg.style = self.getCallbackCfg(styleOptions.fields, styleOptions.style, obj[FIELD_ORIGIN]);
	    }

	    if (self.get('generatePoints')) {
	      cfg.points = obj.points;
	      cfg.nextPoints = obj.nextPoints;
	    }

	    if (isInCircle) {
	      cfg.center = self.get('coord').center;
	    }

	    return cfg;
	  };

	  _proto.draw = function draw(data, shapeFactory) {
	    var self = this;
	    var container = self.get('container');
	    var yScale = self.getYScale();
	    common.each(data, function (obj, index) {
	      if (yScale && common.isNil(obj._origin[yScale.field])) {
	        return;
	      }

	      obj.index = index;
	      var cfg = self.getDrawCfg(obj);
	      var shape = obj.shape;
	      self.drawShape(shape, obj, cfg, container, shapeFactory);
	    });
	  };

	  _proto.drawShape = function drawShape(shape, shapeData, cfg, container, shapeFactory) {
	    var gShape = shapeFactory.drawShape(shape, cfg, container);

	    if (gShape) {
	      common.each([].concat(gShape), function (s) {
	        s.set('origin', shapeData);
	      });
	    }
	  };

	  _proto._generatePoints = function _generatePoints(dataArray) {
	    var self = this;
	    var shapeFactory = self.getShapeFactory();
	    var shapeAttr = self.getAttr('shape');
	    common.each(dataArray, function (data) {
	      for (var i = 0, len = data.length; i < len; i++) {
	        var obj = data[i];
	        var cfg = self.createShapePointsCfg(obj);
	        var shape = shapeAttr ? self._getAttrValues(shapeAttr, obj) : null;
	        var points = shapeFactory.getShapePoints(shape, cfg);
	        obj.points = points;
	      }
	    }); // 添加nextPoints

	    common.each(dataArray, function (data, index) {
	      var nextData = dataArray[index + 1];

	      if (nextData) {
	        data[0].nextPoints = nextData[0].points;
	      }
	    });
	  }
	  /**
	   * get the info of each shape
	   * @protected
	   * @param  {Object} obj the data item
	   * @return {Object} cfg return the result
	   */
	  ;

	  _proto.createShapePointsCfg = function createShapePointsCfg(obj) {
	    var xScale = this.getXScale();
	    var yScale = this.getYScale();

	    var x = this._normalizeValues(obj[xScale.field], xScale);

	    var y;

	    if (yScale) {
	      y = this._normalizeValues(obj[yScale.field], yScale);
	    } else {
	      y = obj.y ? obj.y : 0.1;
	    }

	    return {
	      x: x,
	      y: y,
	      y0: yScale ? yScale.scale(this.getYMinValue()) : undefined
	    };
	  };

	  _proto.getYMinValue = function getYMinValue() {
	    var yScale = this.getYScale();
	    var min = yScale.min,
	        max = yScale.max;
	    var value;

	    if (this.get('startOnZero')) {
	      if (max <= 0 && min <= 0) {
	        value = max;
	      } else {
	        value = min >= 0 ? min : 0;
	      }
	    } else {
	      value = min;
	    }

	    return value;
	  };

	  _proto._normalizeValues = function _normalizeValues(values, scale) {
	    var rst = [];

	    if (common.isArray(values)) {
	      for (var i = 0, len = values.length; i < len; i++) {
	        var v = values[i];
	        rst.push(scale.scale(v));
	      }
	    } else {
	      rst = scale.scale(values);
	    }

	    return rst;
	  };

	  _proto.getAttr = function getAttr(name) {
	    return this.get('attrs')[name];
	  };

	  _proto.getXScale = function getXScale() {
	    return this.getAttr('position').scales[0];
	  };

	  _proto.getYScale = function getYScale() {
	    return this.getAttr('position').scales[1];
	  };

	  _proto.hasAdjust = function hasAdjust(adjust) {
	    return this.get('adjust') && this.get('adjust').type === adjust;
	  };

	  _proto._getSnap = function _getSnap(scale, item, arr) {
	    var i = 0;
	    var values;
	    var yField = this.getYScale().field; // 叠加的维度

	    if (this.hasAdjust('stack') && scale.field === yField) {
	      values = [];
	      arr.forEach(function (obj) {
	        values.push(obj[FIELD_ORIGIN_Y]);
	      });

	      for (var len = values.length; i < len; i++) {
	        if (values[0][0] > item) {
	          break;
	        }

	        if (values[values.length - 1][1] <= item) {
	          i = values.length - 1;
	          break;
	        }

	        if (values[i][0] <= item && values[i][1] > item) {
	          break;
	        }
	      }
	    } else {
	      values = scale.values;
	      values.sort(function (a, b) {
	        return a - b;
	      });

	      for (var _len2 = values.length; i < _len2; i++) {
	        // 如果只有1个点直接返回第1个点
	        if (_len2 <= 1) {
	          break;
	        } // 第1个点和第2个点之间


	        if ((values[0] + values[1]) / 2 > item) {
	          break;
	        } // 中间的点


	        if ((values[i - 1] + values[i]) / 2 <= item && (values[i + 1] + values[i]) / 2 > item) {
	          break;
	        } // 最后2个点


	        if ((values[values.length - 2] + values[values.length - 1]) / 2 <= item) {
	          i = values.length - 1;
	          break;
	        }
	      }
	    }

	    var result = values[i];
	    return result;
	  };

	  _proto.getSnapRecords = function getSnapRecords(point) {
	    var self = this;
	    var coord = self.get('coord');
	    var xScale = self.getXScale();
	    var yScale = self.getYScale();
	    var xfield = xScale.field;
	    var dataArray = self.get('dataArray');

	    if (!this.get('hasSorted')) {
	      this._sort(dataArray);
	    }

	    var rst = [];
	    var invertPoint = coord.invertPoint(point);
	    var invertPointX = invertPoint.x;

	    if (self.isInCircle() && !coord.transposed && invertPointX > (1 + xScale.rangeMax()) / 2) {
	      invertPointX = xScale.rangeMin();
	    }

	    var xValue = xScale.invert(invertPointX);

	    if (!xScale.isCategory) {
	      xValue = self._getSnap(xScale, xValue);
	    }

	    var tmp = [];
	    dataArray.forEach(function (data) {
	      data.forEach(function (obj) {
	        var originValue = common.isNil(obj[FIELD_ORIGIN]) ? obj[xfield] : obj[FIELD_ORIGIN][xfield];

	        if (self._isEqual(originValue, xValue, xScale)) {
	          tmp.push(obj);
	        }
	      });
	    }); // special for pie chart

	    if (this.hasAdjust('stack') && coord.isPolar && coord.transposed) {
	      if (invertPointX >= 0 && invertPointX <= 1) {
	        var yValue = yScale.invert(invertPoint.y);
	        yValue = self._getSnap(yScale, yValue, tmp);
	        tmp.forEach(function (obj) {
	          if (common.isArray(yValue) ? obj[FIELD_ORIGIN_Y].toString() === yValue.toString() : obj[FIELD_ORIGIN_Y] === yValue) {
	            rst.push(obj);
	          }
	        });
	      }
	    } else {
	      rst = tmp;
	    }

	    return rst;
	  };

	  _proto._isEqual = function _isEqual(originValue, value, scale) {
	    if (scale.type === 'timeCat') {
	      return scale._toTimeStamp(originValue) === value;
	    }

	    return value === originValue;
	  };

	  _proto.position = function position(field) {
	    this._setAttrOptions('position', {
	      field: field
	    });

	    return this;
	  };

	  _proto.color = function color(field, values) {
	    this._createAttrOption('color', field, values, global.colors);

	    return this;
	  };

	  _proto.size = function size(field, values) {
	    this._createAttrOption('size', field, values, global.sizes);

	    return this;
	  };

	  _proto.shape = function shape(field, values) {
	    var type = this.get('type');
	    var shapes = global.shapes[type] || [];

	    this._createAttrOption('shape', field, values, shapes);

	    return this;
	  };

	  _proto.style = function style(field, cfg) {
	    var styleOptions = this.get('styleOptions');

	    if (!styleOptions) {
	      styleOptions = {};
	      this.set('styleOptions', styleOptions);
	    }

	    if (common.isObject(field)) {
	      cfg = field;
	      field = null;
	    }

	    var fields;

	    if (field) {
	      fields = parseFields(field);
	    }

	    styleOptions.fields = fields;
	    styleOptions.style = cfg;
	    return this;
	  };

	  _proto.adjust = function adjust(type) {
	    if (common.isString(type)) {
	      type = {
	        type: type
	      };
	    }

	    this.set('adjust', type);
	    return this;
	  };

	  _proto.animate = function animate(cfg) {
	    this.set('animateCfg', cfg);
	    return this;
	  };

	  _proto.changeData = function changeData(data) {
	    this.set('data', data); // 改变数据后，情况度量，因为需要重新实例化

	    this.set('scales', {});
	    this.init();
	  };

	  _proto.clearInner = function clearInner() {
	    var container = this.get('container');

	    if (container) {
	      container.clear(); // container.setMatrix([ 1, 0, 0, 1, 0, 0 ]);
	    }
	  };

	  _proto.reset = function reset() {
	    this.set('attrs', {});
	    this.set('attrOptions', {});
	    this.set('adjust', null);
	    this.clearInner();
	  };

	  _proto.clear = function clear() {
	    this.clearInner();
	  };

	  _proto.destroy = function destroy() {
	    this.clear();

	    _Base.prototype.destroy.call(this);
	  };

	  _proto._display = function _display(visible) {
	    this.set('visible', visible);
	    var container = this.get('container');
	    var canvas = container.get('canvas');
	    container.set('visible', visible);
	    canvas.draw();
	  };

	  _proto.show = function show() {
	    this._display(true);
	  };

	  _proto.hide = function hide() {
	    this._display(false);
	  };

	  return Geom;
	}(base);

	var base$4 = Geom;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var isObject$1 = function isObject(value) {
	  /**
	   * isObject({}) => true
	   * isObject([1, 2, 3]) => true
	   * isObject(Function) => true
	   * isObject(null) => false
	   */
	  var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	  return value !== null && type === 'object' || type === 'function';
	};

	var isObject_1 = isObject$1;

	var toString$3 = {}.toString;
	var isType$1 = function isType(value, type) {
	  return toString$3.call(value) === '[object ' + type + ']';
	};

	var isType_1 = isType$1;

	var isArray$1 = Array.isArray ? Array.isArray : function (value) {
	  return isType_1(value, 'Array');
	};

	var isArray_1 = isArray$1;

	var each$1 = function each(elements, func) {
	  if (!elements) {
	    return;
	  }
	  var rst = void 0;
	  if (isArray_1(elements)) {
	    for (var i = 0, len = elements.length; i < len; i++) {
	      rst = func(elements[i], i);
	      if (rst === false) {
	        break;
	      }
	    }
	  } else if (isObject_1(elements)) {
	    for (var k in elements) {
	      if (elements.hasOwnProperty(k)) {
	        rst = func(elements[k], k);
	        if (rst === false) {
	          break;
	        }
	      }
	    }
	  }
	};

	var each_1 = each$1;

	// isFinite,
	var isNil$1 = function isNil(value) {
	  /**
	   * isNil(null) => true
	   * isNil() => true
	   */
	  return value === null || value === undefined;
	};

	var isNil_1 = isNil$1;

	var Scale =
	/*#__PURE__*/
	function () {
	  var _proto = Scale.prototype;

	  _proto._initDefaultCfg = function _initDefaultCfg() {
	    this.type = 'base';
	    /**
	     * 格式化函数,输出文本或者tick时的格式化函数
	     * @type {Function}
	     */

	    this.formatter = null;
	    /**
	     * 输出的值域
	     * @type {Array}
	     */

	    this.range = [0, 1];
	    /**
	     * 度量的标记
	     * @type {Array}
	     */

	    this.ticks = null;
	    /**
	     * 参与度量计算的值，可选项
	     * @type {Array}
	     */

	    this.values = [];
	  };

	  function Scale(cfg) {
	    this._initDefaultCfg();

	    mix_1(this, cfg);
	    this.init();
	  }
	  /**
	   * 度量初始化
	   * @protected
	   */


	  _proto.init = function init() {}
	  /**
	   * 获取该度量的ticks,返回的是多个对象，
	   *   - text: tick 的文本
	   *   - value: 对应的度量转换后的值
	   * <code>
	   *   [
	   *     {text: 0,value:0}
	   *     {text: 1,value:0.2}
	   *     {text: 2,value:0.4}
	   *     {text: 3,value:0.6}
	   *     {text: 4,value:0.8}
	   *     {text: 5,value:1}
	   *   ]
	   * </code>
	   * @param {Number} count 输出tick的个数的近似值，默认是 10
	   * @return {Array} 返回 ticks 数组
	   */
	  ;

	  _proto.getTicks = function getTicks() {
	    var self = this;
	    var ticks = self.ticks;
	    var rst = [];
	    each_1(ticks, function (tick) {
	      var obj;

	      if (isObject_1(tick)) {
	        obj = tick;
	      } else {
	        obj = {
	          text: self.getText(tick),
	          tickValue: tick,
	          value: self.scale(tick)
	        };
	      }

	      rst.push(obj);
	    });
	    return rst;
	  }
	  /**
	   * 获取格式化后的文本
	   * @param  {*} value 输入的数据
	   * @param  {*} key 字段的 key
	   * @return {String} 格式化的文本
	   */
	  ;

	  _proto.getText = function getText(value, key) {
	    var formatter = this.formatter;
	    value = formatter ? formatter(value, key) : value;

	    if (isNil_1(value) || !value.toString) {
	      value = '';
	    }

	    return value.toString();
	  }
	  /**
	   * 输出的值域最小值
	   * @protected
	   * @return {Number} 返回最小的值
	   */
	  ;

	  _proto.rangeMin = function rangeMin() {
	    return this.range[0];
	  }
	  /**
	   * 输出的值域最大值
	   * @protected
	   * @return {Number} 返回最大的值
	   */
	  ;

	  _proto.rangeMax = function rangeMax() {
	    var range = this.range;
	    return range[range.length - 1];
	  }
	  /**
	   * 度量转换后的结果，翻转回输入域
	   * @param  {Number} value 需要翻转的数值
	   * @return {*} 度量的输入值
	   */
	  ;

	  _proto.invert = function invert(value) {
	    return value;
	  }
	  /**
	   * 将传入的值从非数值转换成数值格式，如分类字符串、时间字符串等
	   * @param  {*} value 传入的值
	   * @return {Number} 转换的值
	   */
	  ;

	  _proto.translate = function translate(value) {
	    return value;
	  }
	  /**
	   * 进行度量转换
	   * @param  {*} value 输入值
	   * @return {Number} 输出值，在设定的输出值域之间，默认[0,1]
	   */
	  ;

	  _proto.scale = function scale(value) {
	    return value;
	  }
	  /**
	   * 克隆一个新的scale,拥有跟当前scale相同的输入域、输出域等
	   * @return {Scale} 克隆的度量
	   */
	  ;

	  _proto.clone = function clone() {
	    var self = this;
	    var constr = self.constructor;
	    var cfg = {};
	    each_1(self, function (v, k) {
	      cfg[k] = self[k];
	    });
	    return new constr(cfg);
	  }
	  /**
	   * 更改度量的属性信息
	   * @param  {Object} info 属性信息
	   * @chainable
	   * @return {Scale} 返回自身的引用
	   */
	  ;

	  _proto.change = function change(info) {
	    this.ticks = null;
	    mix_1(this, info);
	    this.init();
	    return this;
	  };

	  return Scale;
	}();

	var base$5 = Scale;

	/**
	 * 判断是否数字
	 * @return {Boolean} 是否数字
	 */


	var isNumber$1 = function isNumber(value) {
	  return isType_1(value, 'Number');
	};
	var isNumber_1 = isNumber$1;

	/**
	 * @fileOverview 计算方法
	 * @author dxq613@gmail.com
	 */
	// 如果小数点后面超过 10 位浮点数时进行一下处理
	var DECIMAL_LENGTH = 12; // 获取系数

	function getFactor(v) {
	  var factor = 1;

	  if (v === Infinity || v === -Infinity) {
	    throw new Error('Not support Infinity!');
	  }

	  if (v < 1) {
	    var count = 0;

	    while (v < 1) {
	      factor = factor / 10;
	      v = v * 10;
	      count++;
	    } // 浮点数计算出现问题


	    if (factor.toString().length > DECIMAL_LENGTH) {
	      factor = parseFloat(factor.toFixed(count));
	    }
	  } else {
	    while (v > 10) {
	      factor = factor * 10;
	      v = v / 10;
	    }
	  }

	  return factor;
	} // 取小于当前值的


	function arrayFloor(values, value) {
	  var length = values.length;

	  if (length === 0) {
	    return NaN;
	  }

	  var pre = values[0];

	  if (value < values[0]) {
	    return NaN;
	  }

	  if (value >= values[length - 1]) {
	    return values[length - 1];
	  }

	  for (var i = 1; i < values.length; i++) {
	    if (value < values[i]) {
	      break;
	    }

	    pre = values[i];
	  }

	  return pre;
	} // 大于当前值的第一个


	function arrayCeiling(values, value) {
	  var length = values.length;

	  if (length === 0) {
	    return NaN;
	  } // var pre = values[0];


	  var rst;

	  if (value > values[length - 1]) {
	    return NaN;
	  }

	  if (value < values[0]) {
	    return values[0];
	  }

	  for (var i = 1; i < values.length; i++) {
	    if (value <= values[i]) {
	      rst = values[i];
	      break;
	    }
	  }

	  return rst;
	}

	var Util = {
	  // 获取逼近的数值
	  snapFactorTo: function snapFactorTo(v, arr, snapType) {
	    // 假设 v = -512,isFloor = true
	    if (isNaN(v)) {
	      return NaN;
	    }

	    var factor = 1; // 计算系数

	    if (v !== 0) {
	      if (v < 0) {
	        factor = -1;
	      }

	      v = v * factor; // v = 512

	      var tmpFactor = getFactor(v);
	      factor = factor * tmpFactor; // factor = -100

	      v = v / tmpFactor; // v = 5.12
	    }

	    if (snapType === 'floor') {
	      v = Util.snapFloor(arr, v); // v = 5
	    } else if (snapType === 'ceil') {
	      v = Util.snapCeiling(arr, v); // v = 6
	    } else {
	      v = Util.snapTo(arr, v); // 四舍五入 5
	    }

	    var rst = parseFloat((v * factor).toPrecision(DECIMAL_LENGTH)); // 如果出现浮点数计算问题，需要处理一下
	    // 如果出现浮点数计算问题，需要处理一下

	    if (Math.abs(factor) < 1 && rst.toString().length > DECIMAL_LENGTH) {
	      var decimalVal = parseInt(1 / factor);
	      var symbol = factor > 0 ? 1 : -1;
	      rst = v / decimalVal * symbol;
	    }

	    return rst;
	  },
	  // 获取逼近的倍数
	  snapMultiple: function snapMultiple(v, base, snapType) {
	    var div;

	    if (snapType === 'ceil') {
	      div = Math.ceil(v / base);
	    } else if (snapType === 'floor') {
	      div = Math.floor(v / base);
	    } else {
	      div = Math.round(v / base);
	    }

	    return div * base;
	  },

	  /**
	   * 获取逼近的值，用于对齐数据
	   * @param  {Array} values   数据集合
	   * @param  {Number} value   数值
	   * @return {Number} 逼近的值
	   */
	  snapTo: function snapTo(values, value) {
	    // 这里假定values是升序排列
	    var floorVal = arrayFloor(values, value);
	    var ceilingVal = arrayCeiling(values, value);

	    if (isNaN(floorVal) || isNaN(ceilingVal)) {
	      if (values[0] >= value) {
	        return values[0];
	      }

	      var last = values[values.length - 1];

	      if (last <= value) {
	        return last;
	      }
	    }

	    if (Math.abs(value - floorVal) < Math.abs(ceilingVal - value)) {
	      return floorVal;
	    }

	    return ceilingVal;
	  },

	  /**
	   * 获取逼近的最小值，用于对齐数据
	   * @param  {Array} values   数据集合
	   * @param  {Number} value   数值
	   * @return {Number} 逼近的最小值
	   */
	  snapFloor: function snapFloor(values, value) {
	    // 这里假定values是升序排列
	    return arrayFloor(values, value);
	  },

	  /**
	   * 获取逼近的最大值，用于对齐数据
	   * @param  {Array} values   数据集合
	   * @param  {Number} value   数值
	   * @return {Number} 逼近的最大值
	   */
	  snapCeiling: function snapCeiling(values, value) {
	    // 这里假定values是升序排列
	    return arrayCeiling(values, value);
	  },
	  fixedBase: function fixedBase(v, base) {
	    var str = base.toString();
	    var index = str.indexOf('.');
	    var indexOfExp = str.indexOf('e-'); // 判断是否带小数点，1.000001 1.23e-9

	    if (index < 0 && indexOfExp < 0) {
	      // base为整数
	      return Math.round(v);
	    }

	    var length = indexOfExp >= 0 ? parseInt(str.substr(indexOfExp + 2), 10) : str.substr(index + 1).length;

	    if (length > 20) {
	      length = 20;
	    }

	    return parseFloat(v.toFixed(length));
	  }
	};
	var util = Util;

	/**
	 * @fileOverview 自动计算数字坐标轴
	 * @author dxq613@gmail.com
	 */






	var MIN_COUNT = 5;
	var MAX_COUNT = 7;
	var SNAP_COUNT_ARRAY = [0, 1, 1.2, 1.5, 1.6, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10];
	var SNAP_ARRAY = [0, 1, 2, 4, 5, 10];
	var EPS = 1e-12;

	var number = function (info) {
	  var min = info.min;
	  var max = info.max;
	  var interval = info.interval;
	  var minTickInterval = info.minTickInterval;
	  var ticks = [];
	  var minCount = info.minCount || MIN_COUNT;
	  var maxCount = info.maxCount || MAX_COUNT;
	  var isFixedCount = minCount === maxCount; // 是否限定死了个数

	  var minLimit = isNil_1(info.minLimit) ? -Infinity : info.minLimit; // 限定的最小值

	  var maxLimit = isNil_1(info.maxLimit) ? Infinity : info.maxLimit; // 限定最大值

	  var avgCount = (minCount + maxCount) / 2;
	  var count = avgCount; // 用户传入的逼近数组

	  var snapArray = info.snapArray ? info.snapArray : isFixedCount ? SNAP_COUNT_ARRAY : SNAP_ARRAY; // 如果限定大小范围，同时大小范围等于用户传入的范围，同时限定了个数，interval 按照个数均分

	  if (min === minLimit && max === maxLimit && isFixedCount) {
	    interval = (max - min) / (count - 1);
	  }

	  if (isNil_1(min)) {
	    min = 0;
	  }

	  if (isNil_1(max)) {
	    max = 0;
	  }

	  if (Math.abs(max - min) < EPS) {
	    if (min === 0) {
	      max = 1;
	    } else {
	      if (min > 0) {
	        min = 0;
	      } else {
	        max = 0;
	      }
	    }

	    if (max - min < 5 && !interval && max - min >= 1) {
	      interval = 1;
	    }
	  }

	  if (isNil_1(interval)) {
	    // 计算间距
	    var temp = (max - min) / (avgCount - 1);
	    interval = util.snapFactorTo(temp, snapArray, 'ceil');

	    if (maxCount !== minCount) {
	      count = parseInt((max - min) / interval, 10);

	      if (count > maxCount) {
	        count = maxCount;
	      }

	      if (count < minCount) {
	        count = minCount;
	      } // 不确定tick的个数时，使得tick偏小


	      interval = util.snapFactorTo((max - min) / (count - 1), snapArray, 'floor');
	    }
	  } // interval should not be less than minTickInterval


	  if (isNumber_1(minTickInterval) && interval < minTickInterval) {
	    interval = minTickInterval;
	  }

	  if (info.interval || maxCount !== minCount) {
	    // 校正 max 和 min
	    max = Math.min(util.snapMultiple(max, interval, 'ceil'), maxLimit); // 向上逼近

	    min = Math.max(util.snapMultiple(min, interval, 'floor'), minLimit); // 向下逼近

	    count = Math.round((max - min) / interval);
	    min = util.fixedBase(min, interval);
	    max = util.fixedBase(max, interval);
	  } else {
	    avgCount = parseInt(avgCount, 10); // 取整

	    var avg = (max + min) / 2;
	    var avgTick = util.snapMultiple(avg, interval, 'ceil');
	    var sideCount = Math.floor((avgCount - 2) / 2);
	    var maxTick = avgTick + sideCount * interval;
	    var minTick;

	    if (avgCount % 2 === 0) {
	      minTick = avgTick - sideCount * interval;
	    } else {
	      minTick = avgTick - (sideCount + 1) * interval;
	    }

	    var prevMaxTick = null; // 如果减去intervl, fixBase后，新的minTick没有大于之前的值，就退出，防止死循环

	    while (maxTick < max && (prevMaxTick === null || maxTick > prevMaxTick)) {
	      // 保证计算出来的刻度最大值 maxTick 不小于数据最大值 max
	      prevMaxTick = maxTick;
	      maxTick = util.fixedBase(maxTick + interval, interval);
	    }

	    var prevMinTick = null; // 如果减去intervl, fixBase后，新的minTick没有小于之前的值，就退出，防止死循环

	    while (minTick > min && (prevMinTick === null || minTick < prevMinTick)) {
	      // 保证计算出来的刻度最小值 minTick 不小于数据最大值 min
	      prevMinTick = minTick;
	      minTick = util.fixedBase(minTick - interval, interval); // 防止超常浮点数计算问题
	    }

	    max = maxTick;
	    min = minTick;
	  }

	  max = Math.min(max, maxLimit);
	  min = Math.max(min, minLimit);
	  ticks.push(min);

	  for (var i = 1; i < count; i++) {
	    var tickValue = util.fixedBase(interval * i + min, interval);

	    if (tickValue < max) {
	      ticks.push(tickValue);
	    }
	  }

	  if (ticks[ticks.length - 1] < max) {
	    ticks.push(max);
	  }

	  return {
	    min: min,
	    max: max,
	    interval: interval,
	    count: count,
	    ticks: ticks
	  };
	};

	function _inheritsLoose$1(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	/**
	 * @fileOverview The measurement of linear data scale function
	 * @author dxq613@gmail.com
	 */







	/**
	 * 线性度量
	 * @class Scale.Linear
	 */


	var Linear =
	/*#__PURE__*/
	function (_Base) {
	  _inheritsLoose$1(Linear, _Base);

	  function Linear() {
	    return _Base.apply(this, arguments) || this;
	  }

	  var _proto = Linear.prototype;

	  _proto._initDefaultCfg = function _initDefaultCfg() {
	    _Base.prototype._initDefaultCfg.call(this);

	    var self = this;
	    self.type = 'linear';
	    self.isLinear = true;
	    /**
	     * 是否为了用户习惯，优化min,max和ticks，如果进行优化，则会根据生成的ticks调整min,max，否则舍弃(min,max)范围之外的ticks
	     * @type {Boolean}
	     * @default false
	     */

	    self.nice = false;
	    /**
	     * min value of the scale
	     * @type {Number}
	     * @default null
	     */

	    self.min = null;
	    /**
	     * min value limitted of the scale
	     * @type {Number}
	     * @default null
	     */

	    self.minLimit = null;
	    /**
	     * max value of the scale
	     * @type {Number}
	     * @default null
	     */

	    self.max = null;
	    /**
	     * max value limitted of the scale
	     * @type {Number}
	     * @default null
	     */

	    self.maxLimit = null;
	    /**
	     * 自动生成标记时的个数
	     * @type {Number}
	     * @default null
	     */

	    self.tickCount = null;
	    /**
	     * 坐标轴点之间的间距，指的是真实数据的差值
	     * @type {Number}
	     * @default null
	     */

	    self.tickInterval = null;
	    /**
	     * 坐标轴点之间的最小间距，指的是真实数据的差值
	     * @type {Number}
	     * @default null
	     */

	    self.minTickInterval = null;
	    /**
	     * 用于计算坐标点时逼近的数组
	     * @type {Array}
	     */

	    self.snapArray = null;
	  }
	  /**
	   * @protected
	   * @override
	   */
	  ;

	  _proto.init = function init() {
	    var self = this;

	    if (!self.ticks) {
	      self.min = self.translate(self.min);
	      self.max = self.translate(self.max);
	      self.initTicks();
	    } else {
	      var ticks = self.ticks;
	      var firstValue = self.translate(ticks[0]);
	      var lastValue = self.translate(ticks[ticks.length - 1]);

	      if (isNil_1(self.min) || self.min > firstValue) {
	        self.min = firstValue;
	      }

	      if (isNil_1(self.max) || self.max < lastValue) {
	        self.max = lastValue;
	      }
	    }
	  }
	  /**
	   * 计算坐标点
	   * @protected
	   * @return {Array} 计算完成的坐标点
	   */
	  ;

	  _proto.calculateTicks = function calculateTicks() {
	    var min = this.min,
	        max = this.max,
	        minLimit = this.minLimit,
	        maxLimit = this.maxLimit,
	        tickCount = this.tickCount,
	        tickInterval = this.tickInterval,
	        minTickInterval = this.minTickInterval,
	        snapArray = this.snapArray;

	    if (tickCount === 1) {
	      throw new Error('linear scale\'tickCount should not be 1');
	    }

	    if (max < min) {
	      throw new Error("max: " + max + " should not be less than min: " + min);
	    }

	    var tmp = number({
	      min: min,
	      max: max,
	      minLimit: minLimit,
	      maxLimit: maxLimit,
	      minCount: tickCount,
	      maxCount: tickCount,
	      interval: tickInterval,
	      minTickInterval: minTickInterval,
	      snapArray: snapArray
	    });
	    return tmp.ticks;
	  } // 初始化ticks
	  ;

	  _proto.initTicks = function initTicks() {
	    var self = this;
	    var calTicks = self.calculateTicks();

	    if (self.nice) {
	      // 如果需要优化显示的tick
	      self.ticks = calTicks;
	      self.min = calTicks[0];
	      self.max = calTicks[calTicks.length - 1];
	    } else {
	      var ticks = [];
	      each_1(calTicks, function (tick) {
	        if (tick >= self.min && tick <= self.max) {
	          ticks.push(tick);
	        }
	      }); // 如果 ticks 为空，直接输入最小值、最大值

	      if (!ticks.length) {
	        ticks.push(self.min);
	        ticks.push(self.max);
	      }

	      self.ticks = ticks;
	    }
	  }
	  /**
	   * @override
	   */
	  ;

	  _proto.scale = function scale(value) {
	    if (isNil_1(value)) {
	      return NaN;
	    }

	    var max = this.max;
	    var min = this.min;

	    if (max === min) {
	      return 0;
	    }

	    var percent = (value - min) / (max - min);
	    var rangeMin = this.rangeMin();
	    var rangeMax = this.rangeMax();
	    return rangeMin + percent * (rangeMax - rangeMin);
	  }
	  /**
	   * @override
	   */
	  ;

	  _proto.invert = function invert(value) {
	    var percent = (value - this.rangeMin()) / (this.rangeMax() - this.rangeMin());
	    return this.min + percent * (this.max - this.min);
	  };

	  return Linear;
	}(base$5);

	base$5.Linear = Linear;

	function _inheritsLoose$2(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }





	var Identity =
	/*#__PURE__*/
	function (_Base) {
	  _inheritsLoose$2(Identity, _Base);

	  function Identity() {
	    return _Base.apply(this, arguments) || this;
	  }

	  var _proto = Identity.prototype;

	  _proto._initDefaultCfg = function _initDefaultCfg() {
	    _Base.prototype._initDefaultCfg.call(this);

	    this.isIdentity = true;
	    this.type = 'identity';
	    /**
	     * 常量值
	     * @type {*}
	     */

	    this.value = null;
	  }
	  /**
	   * @override
	   */
	  ;

	  _proto.getText = function getText() {
	    return this.value.toString();
	  }
	  /**
	   * @override
	   */
	  ;

	  _proto.scale = function scale(value) {
	    if (this.value !== value && isNumber_1(value)) {
	      return value;
	    }

	    return this.range[0];
	  }
	  /**
	   * @override
	   */
	  ;

	  _proto.invert = function invert() {
	    return this.value;
	  };

	  return Identity;
	}(base$5);

	base$5.Identity = Identity;

	/**
	 * @fileOverview 计算分类的的坐标点
	 * @author dxq613@gmail.com
	 */


	var MAX_COUNT$1 = 8;
	var SUB_COUNT = 4; // 控制个数不能过小

	function getSimpleArray(data) {
	  var arr = [];
	  each_1(data, function (sub) {
	    arr = arr.concat(sub);
	  });
	  return arr;
	}

	function getGreatestFactor(count, number) {
	  var i;

	  for (i = number; i > 0; i--) {
	    if (count % i === 0) {
	      break;
	    }
	  } // 如果是素数，没有可以整除的数字


	  if (i === 1) {
	    for (i = number; i > 0; i--) {
	      if ((count - 1) % i === 0) {
	        break;
	      }
	    }
	  }

	  return i;
	}

	var cat = function (info) {
	  var rst = {};
	  var ticks = [];
	  var isRounding = info.isRounding;
	  var categories = getSimpleArray(info.data);
	  var length = categories.length;
	  var maxCount = info.maxCount || MAX_COUNT$1;
	  var tickCount;

	  if (isRounding) {
	    // 取整操作
	    tickCount = getGreatestFactor(length - 1, maxCount - 1) + 1; // 如果计算出来只有两个坐标点，则直接使用传入的 maxCount

	    if (tickCount === 2) {
	      tickCount = maxCount;
	    } else if (tickCount < maxCount - SUB_COUNT) {
	      tickCount = maxCount - SUB_COUNT;
	    }
	  } else {
	    tickCount = maxCount;
	  }

	  if (!isRounding && length <= tickCount + tickCount / 2) {
	    ticks = [].concat(categories);
	  } else {
	    var step = parseInt(length / (tickCount - 1), 10);
	    var groups = categories.map(function (e, i) {
	      return i % step === 0 ? categories.slice(i, i + step) : null;
	    }).filter(function (e) {
	      return e;
	    });

	    for (var i = 1, groupLen = groups.length; i < groupLen && (isRounding ? i * step < length - step : i < tickCount - 1); i++) {
	      ticks.push(groups[i][0]);
	    }

	    if (categories.length) {
	      ticks.unshift(categories[0]);
	      var last = categories[length - 1];

	      if (ticks.indexOf(last) === -1) {
	        ticks.push(last);
	      }
	    }
	  }

	  rst.categories = categories;
	  rst.ticks = ticks;
	  return rst;
	};

	var isString$1 = function isString(str) {
	  return isType_1(str, 'String');
	};

	var isString_1 = isString$1;

	function _inheritsLoose$3(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }











	var Category =
	/*#__PURE__*/
	function (_Base) {
	  _inheritsLoose$3(Category, _Base);

	  function Category() {
	    return _Base.apply(this, arguments) || this;
	  }

	  var _proto = Category.prototype;

	  _proto._initDefaultCfg = function _initDefaultCfg() {
	    _Base.prototype._initDefaultCfg.call(this);

	    this.type = 'cat';
	    /**
	     * 是否分类度量
	     * @type {Boolean}
	     */

	    this.isCategory = true;
	    this.isRounding = true; // 是否进行取整操作
	  }
	  /**
	   * @override
	   */
	  ;

	  _proto.init = function init() {
	    var self = this;
	    var values = self.values;
	    var tickCount = self.tickCount;
	    each_1(values, function (v, i) {
	      values[i] = v.toString();
	    });

	    if (!self.ticks) {
	      var ticks = values;

	      if (tickCount) {
	        var temp = cat({
	          maxCount: tickCount,
	          data: values,
	          isRounding: self.isRounding
	        });
	        ticks = temp.ticks;
	      }

	      this.ticks = ticks;
	    }
	  }
	  /**
	   * @override
	   */
	  ;

	  _proto.getText = function getText(value) {
	    if (this.values.indexOf(value) === -1 && isNumber_1(value)) {
	      value = this.values[Math.round(value)];
	    }

	    return _Base.prototype.getText.call(this, value);
	  }
	  /**
	   * @override
	   */
	  ;

	  _proto.translate = function translate(value) {
	    var index = this.values.indexOf(value);

	    if (index === -1 && isNumber_1(value)) {
	      index = value;
	    } else if (index === -1) {
	      index = NaN;
	    }

	    return index;
	  }
	  /**
	   * @override
	   */
	  ;

	  _proto.scale = function scale(value) {
	    var rangeMin = this.rangeMin();
	    var rangeMax = this.rangeMax();
	    var percent;

	    if (isString_1(value) || this.values.indexOf(value) !== -1) {
	      value = this.translate(value);
	    }

	    if (this.values.length > 1) {
	      percent = value / (this.values.length - 1);
	    } else {
	      percent = value;
	    }

	    return rangeMin + percent * (rangeMax - rangeMin);
	  }
	  /**
	   * @override
	   */
	  ;

	  _proto.invert = function invert(value) {
	    if (isString_1(value)) {
	      // 如果已经是字符串
	      return value;
	    }

	    var min = this.rangeMin();
	    var max = this.rangeMax(); // 归一到 范围内

	    if (value < min) {
	      value = min;
	    }

	    if (value > max) {
	      value = max;
	    }

	    var percent = (value - min) / (max - min);
	    var index = Math.round(percent * (this.values.length - 1)) % this.values.length;
	    index = index || 0;
	    return this.values[index];
	  };

	  return Category;
	}(base$5);

	base$5.Cat = Category;

	var scale = base$5;

	var SCALE_TYPES_MAP = {
	  linear: 'Linear',
	  cat: 'Cat',
	  timeCat: 'TimeCat',
	  identity: 'Identity'
	};

	function isFullCircle(coord) {
	  if (!coord.isPolar) {
	    return false;
	  }

	  var startAngle = coord.startAngle;
	  var endAngle = coord.endAngle;

	  if (!common.isNil(startAngle) && !common.isNil(endAngle) && endAngle - startAngle < Math.PI * 2) {
	    return false;
	  }

	  return true;
	}

	function clearObj(obj) {
	  Object.keys(obj).forEach(function (key) {
	    delete obj[key];
	  });
	}

	var ScaleController = /*#__PURE__*/function () {
	  function ScaleController(cfg) {
	    // defs 列定义
	    this.defs = {}; // 已经实例化的scale

	    this.scales = {};
	    common.mix(this, cfg);
	  }

	  var _proto = ScaleController.prototype;

	  _proto.setFieldDef = function setFieldDef(field, cfg) {
	    var defs = this.defs;

	    if (common.isObject(field)) {
	      common.mix(defs, field);
	    } else {
	      defs[field] = cfg;
	    } // 因为可能同时变更多个scale，所以要把所有已实例化的scale都更新下


	    this.updateScales();
	  };

	  _proto._getDef = function _getDef(field) {
	    var defs = this.defs;
	    var def = null;

	    if (global.scales[field] || defs[field]) {
	      def = common.mix({}, global.scales[field]);
	      common.each(defs[field], function (v, k) {
	        if (common.isNil(v)) {
	          delete def[k];
	        } else {
	          def[k] = v;
	        }
	      });
	    }

	    return def;
	  };

	  _proto._getDefaultType = function _getDefaultType(field, data, def) {
	    if (def && def.type) {
	      return def.type;
	    }

	    var type = 'linear';
	    var value = common.Array.firstValue(data, field);

	    if (common.isArray(value)) {
	      value = value[0];
	    }

	    if (common.isString(value)) {
	      type = 'cat';
	    }

	    return type;
	  };

	  _proto._getScaleDef = function _getScaleDef(type, field, data, def) {
	    var values;

	    if (def && def.values) {
	      values = def.values;
	    } else {
	      values = common.Array.values(data, field);
	    }

	    var cfg = {
	      field: field,
	      values: values
	    };

	    if (type !== 'cat' && type !== 'timeCat') {
	      if (!def || !(def.min && def.max)) {
	        var _Util$Array$getRange = common.Array.getRange(values),
	            min = _Util$Array$getRange.min,
	            max = _Util$Array$getRange.max;

	        cfg.min = min;
	        cfg.max = max;
	        cfg.nice = true;
	      }
	    } else {
	      cfg.isRounding = false; // used for tickCount calculation
	    }

	    return cfg;
	  } // 调整range，为了让图形居中
	  ;

	  _proto._adjustRange = function _adjustRange(type, cfg) {
	    var range = cfg.range,
	        values = cfg.values; // 如果是线性, 或者有自定义range都不处理

	    if (type === 'linear' || range || !values) {
	      return cfg;
	    }

	    var count = values.length; // 单只有一条数据时，在中间显示

	    if (count === 1) {
	      cfg.range = [0.5, 1];
	    } else {
	      var chart = this.chart;
	      var coord = chart.get('coord');
	      var widthRatio = global.widthRatio.multiplePie;
	      var offset = 0;

	      if (isFullCircle(coord)) {
	        if (!coord.transposed) {
	          cfg.range = [0, 1 - 1 / count];
	        } else {
	          offset = 1 / count * widthRatio;
	          cfg.range = [offset / 2, 1 - offset / 2];
	        }
	      } else {
	        // 为了让图形居中，所以才设置range
	        offset = 1 / count * 1 / 2;
	        cfg.range = [offset, 1 - offset];
	      }
	    }

	    return cfg;
	  };

	  _proto._getScaleCfg = function _getScaleCfg(field, data) {
	    var self = this;

	    var def = self._getDef(field);

	    if (!data || !data.length) {
	      if (def && def.type) {
	        def.field = field;
	        return {
	          type: SCALE_TYPES_MAP[def.type],
	          cfg: def
	        };
	      }

	      return {
	        type: 'Identity',
	        cfg: {
	          value: field,
	          field: field.toString(),
	          values: [field]
	        }
	      };
	    }

	    var firstObj = data[0];
	    var firstValue = firstObj[field];

	    if (firstValue === null) {
	      firstValue = common.Array.firstValue(data, field);
	    }

	    if (common.isNumber(field) || common.isNil(firstValue) && !def) {
	      return {
	        type: 'Identity',
	        cfg: {
	          value: field,
	          field: field.toString(),
	          values: [field]
	        }
	      };
	    }

	    var type = self._getDefaultType(field, data, def);

	    var cfg = self._getScaleDef(type, field, data, def);

	    def && common.mix(cfg, def);
	    cfg = this._adjustRange(type, cfg);
	    return {
	      type: SCALE_TYPES_MAP[type],
	      cfg: cfg
	    };
	  };

	  _proto.createScale = function createScale(field, data) {
	    var scales = this.scales;

	    var _this$_getScaleCfg = this._getScaleCfg(field, data),
	        type = _this$_getScaleCfg.type,
	        cfg = _this$_getScaleCfg.cfg;

	    var scale$1 = scales[field]; // 如果已经存在，且类型相等时直接返回

	    if (scale$1 && SCALE_TYPES_MAP[scale$1.type] === type) {
	      scale$1.change(cfg);
	      return scale$1;
	    }

	    var newScale = new scale[type](cfg);
	    scales[field] = newScale;
	    return newScale;
	  };

	  _proto._updateScale = function _updateScale(scale) {
	    var field = scale.field; // 因为每个field的数据都会不同

	    var data = this.chart._getScaleData(field);

	    var _this$_getScaleCfg2 = this._getScaleCfg(field, data),
	        cfg = _this$_getScaleCfg2.cfg;

	    scale.change(cfg);
	  };

	  _proto.updateScales = function updateScales() {
	    var _this = this;

	    var scales = this.scales; // 修改完列定义后，需要更新已经实例化的scale
	    // 如果是还没有实例化的，在geom初始化的时候会被实例化，所以这里可以不用更新

	    common.each(scales, function (scale) {
	      _this._updateScale(scale);
	    });
	  } // 调整scale从0开始
	  ;

	  _proto.adjustStartZero = function adjustStartZero(scale) {
	    var defs = this.defs;
	    var field = scale.field,
	        min = scale.min,
	        max = scale.max; // 如果有定义，则不处理

	    if (defs[field] && defs[field].min) {
	      return;
	    }

	    if (min > 0) {
	      scale.change({
	        min: 0
	      });
	    } else if (max < 0) {
	      scale.change({
	        max: 0
	      });
	    }
	  };

	  _proto.clear = function clear() {
	    // this.defs = {};
	    // this.scales = {};
	    clearObj(this.defs);
	    clearObj(this.scales);
	    this.data = null;
	  };

	  return ScaleController;
	}();

	var scale$1 = ScaleController;

	var Abastract = /*#__PURE__*/function () {
	  var _proto = Abastract.prototype;

	  _proto._initDefaultCfg = function _initDefaultCfg() {
	    /**
	     * ticks
	     * @type {Array}
	     */
	    this.ticks = [];
	    /**
	     * the configuration for tickLine
	     * @type {Object}
	     */

	    this.tickLine = {};
	    /**
	     * the direction of ticks, 1 means clockwise
	     * @type {Number}
	     */

	    this.offsetFactor = 1;
	    /**
	     * the top container
	     * @type {container}
	     */

	    this.frontContainer = null;
	    /**
	     * the back container
	     * @type {[type]}
	     */

	    this.backContainer = null;
	    /**
	     * points for draw grid line
	     * @type {Array}
	     */

	    this.gridPoints = [];
	  };

	  function Abastract(cfg) {
	    this._initDefaultCfg();

	    common.mix(this, cfg);
	    this.draw();
	  }

	  _proto.draw = function draw() {
	    var line = this.line,
	        tickLine = this.tickLine,
	        label = this.label,
	        grid = this.grid;
	    grid && this.drawGrid(grid); // draw the grid lines

	    tickLine && this.drawTicks(tickLine); // draw the tickLine

	    line && this.drawLine(line); // draw axis line

	    label && this.drawLabels(); // draw ticks
	  };

	  _proto.drawTicks = function drawTicks(tickCfg) {
	    var self = this;
	    var ticks = self.ticks;
	    var length = tickCfg.length;
	    var container = self.getContainer(tickCfg.top);
	    common.each(ticks, function (tick) {
	      var start = self.getOffsetPoint(tick.value);
	      var end = self.getSidePoint(start, length);
	      var shape = container.addShape('line', {
	        className: 'axis-tick',
	        attrs: common.mix({
	          x1: start.x,
	          y1: start.y,
	          x2: end.x,
	          y2: end.y
	        }, tickCfg)
	      });
	      shape._id = self._id + '-ticks';
	    });
	  };

	  _proto.drawLabels = function drawLabels() {
	    var self = this;
	    var labelOffset = self.labelOffset;
	    var labels = self.labels;
	    common.each(labels, function (labelShape) {
	      var container = self.getContainer(labelShape.get('top'));
	      var start = self.getOffsetPoint(labelShape.get('value'));

	      var _self$getSidePoint = self.getSidePoint(start, labelOffset),
	          x = _self$getSidePoint.x,
	          y = _self$getSidePoint.y;

	      labelShape.attr(common.mix({
	        x: x,
	        y: y
	      }, self.getTextAlignInfo(start, labelOffset), labelShape.get('textStyle')));
	      labelShape._id = self._id + '-' + labelShape.attr('text');
	      container.add(labelShape);
	    });
	  };

	  _proto.drawLine = function drawLine() {};

	  _proto.drawGrid = function drawGrid(grid) {
	    var self = this;
	    var gridPoints = self.gridPoints,
	        ticks = self.ticks;
	    var gridCfg = grid;
	    var count = gridPoints.length;
	    common.each(gridPoints, function (subPoints, index) {
	      if (common.isFunction(grid)) {
	        var tick = ticks[index] || {};
	        var executedGrid = grid(tick.text, index, count);
	        gridCfg = executedGrid ? common.mix({}, global._defaultAxis.grid, executedGrid) : null;
	      }

	      if (gridCfg) {
	        var type = gridCfg.type; // has two types: 'line' and 'arc'

	        var points = subPoints.points;
	        var container = self.getContainer(gridCfg.top);
	        var shape;

	        if (type === 'arc') {
	          var center = self.center,
	              startAngle = self.startAngle,
	              endAngle = self.endAngle;
	          var radius = vector2.length([points[0].x - center.x, points[0].y - center.y]);
	          shape = container.addShape('Arc', {
	            className: 'axis-grid',
	            attrs: common.mix({
	              x: center.x,
	              y: center.y,
	              startAngle: startAngle,
	              endAngle: endAngle,
	              r: radius
	            }, gridCfg)
	          });
	        } else {
	          shape = container.addShape('Polyline', {
	            className: 'axis-grid',
	            attrs: common.mix({
	              points: points
	            }, gridCfg)
	          });
	        }

	        shape._id = subPoints._id;
	      }
	    });
	  };

	  _proto.getOffsetPoint = function getOffsetPoint() {};

	  _proto.getAxisVector = function getAxisVector() {};

	  _proto.getOffsetVector = function getOffsetVector(point, offset) {
	    var self = this;
	    var axisVector = self.getAxisVector(point);
	    var normal = vector2.normalize([], axisVector);
	    var factor = self.offsetFactor;
	    var verticalVector = [normal[1] * -1 * factor, normal[0] * factor];
	    return vector2.scale([], verticalVector, offset);
	  };

	  _proto.getSidePoint = function getSidePoint(point, offset) {
	    var self = this;
	    var offsetVector = self.getOffsetVector(point, offset);
	    return {
	      x: point.x + offsetVector[0],
	      y: point.y + offsetVector[1]
	    };
	  };

	  _proto.getTextAlignInfo = function getTextAlignInfo(point, offset) {
	    var self = this;
	    var offsetVector = self.getOffsetVector(point, offset);
	    var align;
	    var baseLine;

	    if (offsetVector[0] > 0) {
	      align = 'left';
	    } else if (offsetVector[0] < 0) {
	      align = 'right';
	    } else {
	      align = 'center';
	    }

	    if (offsetVector[1] > 0) {
	      baseLine = 'top';
	    } else if (offsetVector[1] < 0) {
	      baseLine = 'bottom';
	    } else {
	      baseLine = 'middle';
	    }

	    return {
	      textAlign: align,
	      textBaseline: baseLine
	    };
	  };

	  _proto.getContainer = function getContainer(isTop) {
	    var frontContainer = this.frontContainer,
	        backContainer = this.backContainer;
	    return isTop ? frontContainer : backContainer;
	  };

	  return Abastract;
	}();

	var abstract_1 = Abastract;

	var _possibleConstructorReturn2$3 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$3 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$3 = interopRequireDefault(inheritsLoose);





	var Line = /*#__PURE__*/function (_Abstract) {
	  (0, _inheritsLoose2$3["default"])(Line, _Abstract);

	  function Line() {
	    return _Abstract.apply(this, arguments) || this;
	  }

	  var _proto = Line.prototype;

	  _proto._initDefaultCfg = function _initDefaultCfg() {
	    _Abstract.prototype._initDefaultCfg.call(this);

	    this.start = null;
	    this.end = null;
	  };

	  _proto.getOffsetPoint = function getOffsetPoint(value) {
	    var start = this.start,
	        end = this.end;
	    return {
	      x: start.x + (end.x - start.x) * value,
	      y: start.y + (end.y - start.y) * value
	    };
	  };

	  _proto.getAxisVector = function getAxisVector() {
	    var start = this.start,
	        end = this.end;
	    return [end.x - start.x, end.y - start.y];
	  };

	  _proto.drawLine = function drawLine(lineCfg) {
	    var container = this.getContainer(lineCfg.top);
	    var start = this.start,
	        end = this.end;
	    container.addShape('line', {
	      className: 'axis-line',
	      attrs: common.mix({
	        x1: start.x,
	        y1: start.y,
	        x2: end.x,
	        y2: end.y
	      }, lineCfg)
	    });
	  };

	  return Line;
	}(abstract_1);

	abstract_1.Line = Line;

	var axis = abstract_1;

	var controller = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports["default"] = void 0;





	// 计算滑动的方向
	var calcDirection = function calcDirection(start, end) {
	  var xDistance = end.x - start.x;
	  var yDistance = end.y - start.y; // x 的距离大于y 说明是横向，否则就是纵向

	  if (Math.abs(xDistance) > Math.abs(yDistance)) {
	    return xDistance > 0 ? 'right' : 'left';
	  }

	  return yDistance > 0 ? 'down' : 'up';
	}; // 计算2点之间的距离


	var calcDistance = function calcDistance(point1, point2) {
	  var xDistance = Math.abs(point2.x - point1.x);
	  var yDistance = Math.abs(point2.y - point1.y);
	  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
	};

	var getCenter = function getCenter(point1, point2) {
	  var x = point1.x + (point2.x - point1.x) / 2;
	  var y = point1.y + (point2.y - point1.y) / 2;
	  return {
	    x: x,
	    y: y
	  };
	};

	var convertPoints = function convertPoints(touches, canvas) {
	  if (!touches) return;
	  var points = [];
	  var len = touches.length;

	  for (var i = 0; i < len; i++) {
	    var touch = touches[i]; // x, y: 相对canvas原点的位置，clientX, clientY 相对于可视窗口的位置

	    var x = touch.x,
	        y = touch.y,
	        clientX = touch.clientX,
	        clientY = touch.clientY;
	    var point = void 0; // 小程序环境会有x,y

	    if ((0, common.isNumber)(x) || (0, common.isNumber)(y)) {
	      point = {
	        x: x,
	        y: y
	      };
	    } else {
	      // 浏览器环境再计算下canvas的相对位置
	      point = (0, dom.getRelativePosition)({
	        x: clientX,
	        y: clientY
	      }, canvas);
	    }

	    points.push(point);
	  }

	  return points;
	};

	var PRESS_DELAY = 250;

	var EventController = /*#__PURE__*/function () {
	  function EventController(_ref) {
	    var _this = this;

	    var canvas = _ref.canvas,
	        el = _ref.el;

	    this._click = function (ev) {
	      _this.emitEvent('click', ev);
	    };

	    this._start = function (ev) {
	      var points = convertPoints(ev.touches, _this.canvas);

	      if (!points) {
	        return;
	      }

	      ev.points = points;

	      _this.emitEvent('touchstart', ev); // 防止上次的内容没有清理掉，重新reset下


	      _this.reset(); // 记录touch start 的时间


	      _this.startTime = Date.now(); // 记录touch start 的点

	      _this.startPoints = points;

	      if (points.length > 1) {
	        _this.startDistance = calcDistance(points[0], points[1]);
	        _this.center = getCenter(points[0], points[1]);
	      } else {
	        // 如果touchstart后停顿250ms, 则也触发press事件
	        _this.pressTimeout = setTimeout(function () {
	          // 这里固定触发press事件
	          var eventType = 'press';
	          ev.direction = 'none';

	          _this.emitStart(eventType, ev);

	          _this.emitEvent(eventType, ev);

	          _this.eventType = eventType;
	        }, PRESS_DELAY);
	      }
	    };

	    this._move = function (ev) {
	      var points = convertPoints(ev.touches, _this.canvas);
	      if (!points) return;

	      _this.clearPressTimeout();

	      ev.points = points;

	      _this.emitEvent('touchmove', ev);

	      var startPoints = _this.startPoints;
	      if (!startPoints) return; // 多指触控

	      if (points.length > 1) {
	        // touchstart的距离
	        var startDistance = _this.startDistance;
	        var currentDistance = calcDistance(points[0], points[1]);
	        ev.zoom = currentDistance / startDistance;
	        ev.center = _this.center; // 触发缩放事件

	        _this.emitStart('pinch', ev);

	        _this.emitEvent('pinch', ev);
	      } else {
	        var deltaX = points[0].x - startPoints[0].x;
	        var deltaY = points[0].y - startPoints[0].y;
	        var direction = _this.direction || calcDirection(startPoints[0], points[0]);
	        _this.direction = direction; // 获取press或者pan的事件类型
	        // press 按住滑动, pan表示平移
	        // 如果start后立刻move，则触发pan, 如果有停顿，则触发press

	        var eventType = _this.getEventType(points);

	        ev.direction = direction;
	        ev.deltaX = deltaX;
	        ev.deltaY = deltaY;

	        _this.emitStart(eventType, ev);

	        _this.emitEvent(eventType, ev); // 记录最后2次move的时间和坐标，为了给swipe事件用


	        var prevMoveTime = _this.lastMoveTime;
	        var now = Date.now(); // 最后2次的时间间隔一定要大于0，否则swipe没发计算

	        if (now - prevMoveTime > 0) {
	          _this.prevMoveTime = prevMoveTime;
	          _this.prevMovePoints = _this.lastMovePoints;
	          _this.lastMoveTime = now;
	          _this.lastMovePoints = points;
	        }
	      }
	    };

	    this._end = function (ev) {
	      _this.emitEnd(ev);

	      _this.emitEvent('touchend', ev); // swipe事件处理, 在touchend之后触发


	      var lastMoveTime = _this.lastMoveTime;
	      var now = Date.now(); // 做这个判断是为了最后一次touchmove后到end前，还有一个停顿的过程
	      // 100 是拍的一个值，理论这个值会很短，一般不卡顿的话在10ms以内

	      if (now - lastMoveTime < 100) {
	        var prevMoveTime = _this.prevMoveTime || _this.startTime;
	        var intervalTime = lastMoveTime - prevMoveTime; // 时间间隔一定要大于0, 否则计算没意义

	        if (intervalTime > 0) {
	          var prevMovePoints = _this.prevMovePoints || _this.startPoints;
	          var lastMovePoints = _this.lastMovePoints; // move速率

	          var velocity = calcDistance(prevMovePoints[0], lastMovePoints[0]) / intervalTime; // 0.3 是参考hammerjs的设置

	          if (velocity > 0.3) {
	            ev.velocity = velocity;
	            ev.direction = calcDirection(prevMovePoints[0], lastMovePoints[0]);

	            _this.emitEvent('swipe', ev);
	          }
	        }
	      }

	      _this.reset();

	      var touches = ev.touches; // 当多指只释放了1指时也会触发end, 这时重新触发一次start

	      if (touches && touches.length > 0) {
	        _this._start(ev);
	      }
	    };

	    this._cancel = function (ev) {
	      _this.emitEvent('touchcancel', ev);

	      _this.reset();
	    };

	    // canvasEl
	    this.canvas = canvas;
	    this.delegateEvent(el); // 用来记录当前触发的事件

	    this.processEvent = {};
	  }

	  var _proto = EventController.prototype;

	  _proto.delegateEvent = function delegateEvent(canvasEl) {
	    // 代理这几个事件
	    canvasEl.addEventListener('click', this._click);
	    canvasEl.addEventListener('touchstart', this._start);
	    canvasEl.addEventListener('touchmove', this._move);
	    canvasEl.addEventListener('touchend', this._end);
	    canvasEl.addEventListener('touchcancel', this._cancel);
	  };

	  _proto.emitEvent = function emitEvent(type, ev) {
	    var canvas = this.canvas;
	    canvas.emit(type, ev);
	  };

	  _proto.getEventType = function getEventType(points) {
	    var eventType = this.eventType,
	        canvas = this.canvas,
	        startTime = this.startTime,
	        startPoints = this.startPoints;

	    if (eventType) {
	      return eventType;
	    }

	    var type;
	    var panEventListeners = canvas.__events.pan; // 如果没有pan事件的监听，默认都是press

	    if (!panEventListeners || !panEventListeners.length) {
	      type = 'press';
	    } else {
	      // 如果有pan事件的处理，press则需要停顿250ms, 且移动距离小于10
	      var now = Date.now();

	      if (now - startTime > PRESS_DELAY && calcDistance(startPoints[0], points[0]) < 10) {
	        type = 'press';
	      } else {
	        type = 'pan';
	      }
	    }

	    this.eventType = type;
	    return type;
	  };

	  _proto.enable = function enable(eventType) {
	    this.processEvent[eventType] = true;
	  } // 是否进行中的事件
	  ;

	  _proto.isProcess = function isProcess(eventType) {
	    return this.processEvent[eventType];
	  } // 触发start事件
	  ;

	  _proto.emitStart = function emitStart(type, ev) {
	    if (this.isProcess(type)) {
	      return;
	    }

	    this.enable(type);
	    this.emitEvent(type + "start", ev);
	  } // 触发end事件
	  ;

	  _proto.emitEnd = function emitEnd(ev) {
	    var _this2 = this;

	    var processEvent = this.processEvent;
	    Object.keys(processEvent).forEach(function (type) {
	      _this2.emitEvent(type + "end", ev);

	      delete processEvent[type];
	    });
	  };

	  _proto.clearPressTimeout = function clearPressTimeout() {
	    if (this.pressTimeout) {
	      clearTimeout(this.pressTimeout);
	      this.pressTimeout = 0;
	    }
	  };

	  _proto.reset = function reset() {
	    this.clearPressTimeout();
	    this.startTime = 0;
	    this.startPoints = null;
	    this.startDistance = 0;
	    this.direction = null;
	    this.eventType = null;
	    this.pinch = false;
	    this.prevMoveTime = 0;
	    this.prevMovePoints = null;
	    this.lastMoveTime = 0;
	    this.lastMovePoints = null;
	  };

	  return EventController;
	}();

	var _default = EventController;
	exports["default"] = _default;
	});

	unwrapExports(controller);

	var canvasElement = createCommonjsModule(function (module, exports) {



	exports.__esModule = true;
	exports["default"] = void 0;

	var _possibleConstructorReturn2 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2 = interopRequireDefault(inheritsLoose);

	var _emit = interopRequireDefault(emit);

	var CanvasElement = /*#__PURE__*/function (_EventEmit) {
	  (0, _inheritsLoose2["default"])(CanvasElement, _EventEmit);

	  function CanvasElement(ctx) {
	    var _this;

	    _this = _EventEmit.call(this) || this;
	    _this.context = ctx; // canvas实际的宽高 (width/height) * pixelRatio

	    _this.width = 0;
	    _this.height = 0;
	    _this.style = {};
	    _this.currentStyle = {}; // 用来标识是CanvasElement实例

	    _this.isCanvasElement = true;
	    return _this;
	  }

	  var _proto = CanvasElement.prototype;

	  _proto.getContext = function getContext()
	  /* type */
	  {
	    return this.context;
	  };

	  _proto.getBoundingClientRect = function getBoundingClientRect() {
	    var width = this.width;
	    var height = this.height; // 默认都处理成可视窗口的顶部位置

	    return {
	      top: 0,
	      right: width,
	      bottom: height,
	      left: 0
	    };
	  };

	  _proto.addEventListener = function addEventListener(type, listener) {
	    this.on(type, listener);
	  };

	  _proto.removeEventListener = function removeEventListener(type, listener) {
	    this.off(type, listener);
	  };

	  _proto.dispatchEvent = function dispatchEvent(type, e) {
	    this.emit(type, e);
	  };

	  return CanvasElement;
	}(_emit["default"]);

	function supportEventListener(canvas) {
	  if (!canvas) {
	    return false;
	  } // 非 HTMLCanvasElement


	  if (canvas.nodeType !== 1 || !canvas.nodeName || canvas.nodeName.toLowerCase() !== 'canvas') {
	    return false;
	  } // 微信小程序canvas.getContext('2d')时也是CanvasRenderingContext2D
	  // 也会有ctx.canvas, 而且nodeType也是1，所以还要在看下是否支持addEventListener


	  var support = false;

	  try {
	    canvas.addEventListener('eventTest', function () {
	      support = true;
	    });
	    canvas.dispatchEvent(new Event('eventTest'));
	  } catch (error) {
	    support = false;
	  }

	  return support;
	}

	var _default = {
	  create: function create(ctx) {
	    if (!ctx) {
	      return null;
	    }

	    if (supportEventListener(ctx.canvas)) {
	      return ctx.canvas;
	    }

	    return new CanvasElement(ctx);
	  }
	};
	exports["default"] = _default;
	});

	unwrapExports(canvasElement);

	function _mod(n, m) {
	  return (n % m + m) % m;
	}

	function _addStop(steps, gradient) {
	  common.each(steps, function (item) {
	    item = item.split(':');
	    gradient.addColorStop(Number(item[0]), item[1]);
	  });
	} // the string format: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'


	function _parseLineGradient(color, shape, context) {
	  var arr = color.split(' ');
	  var angle = arr[0].slice(2, arr[0].length - 1);
	  angle = _mod(parseFloat(angle) * Math.PI / 180, Math.PI * 2);
	  var steps = arr.slice(1);

	  var _shape$getBBox = shape.getBBox(),
	      minX = _shape$getBBox.minX,
	      minY = _shape$getBBox.minY,
	      maxX = _shape$getBBox.maxX,
	      maxY = _shape$getBBox.maxY;

	  var start;
	  var end;

	  if (angle >= 0 && angle < 0.5 * Math.PI) {
	    start = {
	      x: minX,
	      y: minY
	    };
	    end = {
	      x: maxX,
	      y: maxY
	    };
	  } else if (0.5 * Math.PI <= angle && angle < Math.PI) {
	    start = {
	      x: maxX,
	      y: minY
	    };
	    end = {
	      x: minX,
	      y: maxY
	    };
	  } else if (Math.PI <= angle && angle < 1.5 * Math.PI) {
	    start = {
	      x: maxX,
	      y: maxY
	    };
	    end = {
	      x: minX,
	      y: minY
	    };
	  } else {
	    start = {
	      x: minX,
	      y: maxY
	    };
	    end = {
	      x: maxX,
	      y: minY
	    };
	  }

	  var tanTheta = Math.tan(angle);
	  var tanTheta2 = tanTheta * tanTheta;
	  var x = (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.x;
	  var y = tanTheta * (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.y;
	  var gradient = context.createLinearGradient(start.x, start.y, x, y);

	  _addStop(steps, gradient);

	  return gradient;
	} // the string format: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff'


	function _parseRadialGradient(color, shape, context) {
	  var arr = color.split(' ');
	  var circleCfg = arr[0].slice(2, arr[0].length - 1);
	  circleCfg = circleCfg.split(',');
	  var fx = parseFloat(circleCfg[0]);
	  var fy = parseFloat(circleCfg[1]);
	  var fr = parseFloat(circleCfg[2]);
	  var steps = arr.slice(1); // if radius is 0, no gradient, stroke with the last color

	  if (fr === 0) {
	    var _color = steps[steps.length - 1];
	    return _color.split(':')[1];
	  }

	  var _shape$getBBox2 = shape.getBBox(),
	      width = _shape$getBBox2.width,
	      height = _shape$getBBox2.height,
	      minX = _shape$getBBox2.minX,
	      minY = _shape$getBBox2.minY;

	  var r = Math.sqrt(width * width + height * height) / 2;
	  var gradient = context.createRadialGradient(minX + width * fx, minY + height * fy, fr * r, minX + width / 2, minY + height / 2, r);

	  _addStop(steps, gradient);

	  return gradient;
	}

	var styleParse = {
	  parseStyle: function parseStyle(color, shape, context) {
	    if (color[1] === '(') {
	      try {
	        var firstCode = color[0];

	        if (firstCode === 'l') {
	          return _parseLineGradient(color, shape, context);
	        } else if (firstCode === 'r') {
	          return _parseRadialGradient(color, shape, context);
	        }
	      } catch (ev) {
	        console.error('error in parsing gradient string, please check if there are any extra whitespaces.');
	        console.error(ev);
	      }
	    }

	    return color;
	  }
	};

	function isUnchanged(m) {
	  return m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1 && m[4] === 0 && m[5] === 0;
	}

	var ALIAS_ATTRS_MAP = {
	  stroke: 'strokeStyle',
	  fill: 'fillStyle',
	  opacity: 'globalAlpha'
	};
	var SHAPE_ATTRS = ['fillStyle', 'font', 'globalAlpha', 'lineCap', 'lineWidth', 'lineJoin', 'miterLimit', 'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY', 'strokeStyle', 'textAlign', 'textBaseline', 'lineDash', 'shadow' // 兼容支付宝小程序
	];
	var CLIP_SHAPES = ['circle', 'sector', 'polygon', 'rect', 'polyline'];

	var Element$1 = /*#__PURE__*/function () {
	  var _proto = Element.prototype;

	  _proto._initProperties = function _initProperties() {
	    this._attrs = {
	      zIndex: 0,
	      visible: true,
	      destroyed: false
	    };
	  };

	  function Element(cfg) {
	    this._initProperties();

	    common.mix(this._attrs, cfg);
	    var attrs = this._attrs.attrs;

	    if (attrs) {
	      this.initAttrs(attrs);
	    }

	    this.initTransform();
	  }

	  _proto.get = function get(name) {
	    return this._attrs[name];
	  };

	  _proto.set = function set(name, value) {
	    this._attrs[name] = value;
	  };

	  _proto.isGroup = function isGroup() {
	    return this.get('isGroup');
	  };

	  _proto.isShape = function isShape() {
	    return this.get('isShape');
	  };

	  _proto.initAttrs = function initAttrs(attrs) {
	    this.attr(common.mix(this.getDefaultAttrs(), attrs));
	  };

	  _proto.getDefaultAttrs = function getDefaultAttrs() {
	    return {};
	  };

	  _proto._setAttr = function _setAttr(name, value) {
	    var attrs = this._attrs.attrs;

	    if (name === 'clip') {
	      value = this._setAttrClip(value);
	    } else {
	      var alias = ALIAS_ATTRS_MAP[name];

	      if (alias) {
	        attrs[alias] = value;
	      }
	    }

	    attrs[name] = value;
	  };

	  _proto._getAttr = function _getAttr(name) {
	    return this._attrs.attrs[name];
	  } // _afterAttrsSet() {}
	  ;

	  _proto._setAttrClip = function _setAttrClip(clip) {
	    if (clip && CLIP_SHAPES.indexOf(clip._attrs.type) > -1) {
	      if (clip.get('canvas') === null) {
	        clip = Object.assign({}, clip);
	      }

	      clip.set('parent', this.get('parent'));
	      clip.set('context', this.get('context'));
	      return clip;
	    }

	    return null;
	  };

	  _proto.attr = function attr(name, value) {
	    var self = this;
	    if (self.get('destroyed')) return null;
	    var argumentsLen = arguments.length;

	    if (argumentsLen === 0) {
	      return self._attrs.attrs;
	    }

	    if (common.isObject(name)) {
	      this._attrs.bbox = null;

	      for (var k in name) {
	        self._setAttr(k, name[k]);
	      }

	      if (self._afterAttrsSet) {
	        self._afterAttrsSet();
	      }

	      return self;
	    }

	    if (argumentsLen === 2) {
	      this._attrs.bbox = null;

	      self._setAttr(name, value);

	      if (self._afterAttrsSet) {
	        self._afterAttrsSet();
	      }

	      return self;
	    }

	    return self._getAttr(name);
	  };

	  _proto.getParent = function getParent() {
	    return this.get('parent');
	  };

	  _proto.draw = function draw(context) {
	    if (this.get('destroyed')) {
	      return;
	    }

	    if (this.get('visible')) {
	      this.setContext(context);
	      this.drawInner(context);
	      this.restoreContext(context);
	    }
	  };

	  _proto.setContext = function setContext(context) {
	    var clip = this._attrs.attrs.clip;
	    context.save();

	    if (clip) {
	      clip.resetTransform(context);
	      clip.createPath(context);
	      context.clip();
	    }

	    this.resetContext(context);
	    this.resetTransform(context);
	  };

	  _proto.restoreContext = function restoreContext(context) {
	    context.restore();
	  };

	  _proto.resetContext = function resetContext(context) {
	    var elAttrs = this._attrs.attrs;

	    if (!this._attrs.isGroup) {
	      for (var k in elAttrs) {
	        if (SHAPE_ATTRS.indexOf(k) > -1) {
	          var v = elAttrs[k];

	          if (k === 'fillStyle' || k === 'strokeStyle') {
	            v = styleParse.parseStyle(v, this, context);
	          }

	          if (k === 'lineDash' && context.setLineDash && common.isArray(v)) {
	            context.setLineDash(v);
	          } else {
	            context[k] = v;
	          }
	        }
	      }
	    }
	  };

	  _proto.hasFill = function hasFill() {
	    return this.get('canFill') && this._attrs.attrs.fillStyle;
	  };

	  _proto.hasStroke = function hasStroke() {
	    return this.get('canStroke') && this._attrs.attrs.strokeStyle;
	  };

	  _proto.drawInner = function drawInner()
	  /* context */
	  {};

	  _proto.show = function show() {
	    this.set('visible', true);
	    return this;
	  };

	  _proto.hide = function hide() {
	    this.set('visible', false);
	    return this;
	  };

	  _proto.isVisible = function isVisible() {
	    return this.get('visible');
	  };

	  _proto._removeFromParent = function _removeFromParent() {
	    var parent = this.get('parent');

	    if (parent) {
	      var children = parent.get('children');
	      common.Array.remove(children, this);
	    }

	    return this;
	  };

	  _proto.remove = function remove(destroy) {
	    if (destroy) {
	      this.destroy();
	    } else {
	      this._removeFromParent();
	    }
	  };

	  _proto.destroy = function destroy() {
	    var destroyed = this.get('destroyed');

	    if (destroyed) {
	      return null;
	    }

	    this._removeFromParent();

	    this._attrs = {};
	    this.set('destroyed', true);
	  };

	  _proto.getBBox = function getBBox() {
	    return {
	      minX: 0,
	      maxX: 0,
	      minY: 0,
	      maxY: 0,
	      width: 0,
	      height: 0
	    };
	  };

	  _proto.initTransform = function initTransform() {
	    var attrs = this._attrs.attrs || {};

	    if (!attrs.matrix) {
	      attrs.matrix = [1, 0, 0, 1, 0, 0];
	    }

	    this._attrs.attrs = attrs;
	  };

	  _proto.getMatrix = function getMatrix() {
	    return this._attrs.attrs.matrix;
	  };

	  _proto.setMatrix = function setMatrix(m) {
	    this._attrs.attrs.matrix = [m[0], m[1], m[2], m[3], m[4], m[5]];
	  };

	  _proto.transform = function transform(actions) {
	    var matrix$1 = this._attrs.attrs.matrix;
	    this._attrs.attrs.matrix = matrix.transform(matrix$1, actions);
	    return this;
	  };

	  _proto.setTransform = function setTransform(actions) {
	    this._attrs.attrs.matrix = [1, 0, 0, 1, 0, 0];
	    return this.transform(actions);
	  };

	  _proto.translate = function translate(x, y) {
	    var matrix$1 = this._attrs.attrs.matrix;
	    matrix.translate(matrix$1, matrix$1, [x, y]);
	  };

	  _proto.rotate = function rotate(rad) {
	    var matrix$1 = this._attrs.attrs.matrix;
	    matrix.rotate(matrix$1, matrix$1, rad);
	  };

	  _proto.scale = function scale(sx, sy) {
	    var matrix$1 = this._attrs.attrs.matrix;
	    matrix.scale(matrix$1, matrix$1, [sx, sy]);
	  };

	  _proto.moveTo = function moveTo(x, y) {
	    var cx = this._attrs.x || 0;
	    var cy = this._attrs.y || 0;
	    this.translate(x - cx, y - cy);
	    this.set('x', x);
	    this.set('y', y);
	  };

	  _proto.apply = function apply(v) {
	    var m = this._attrs.attrs.matrix;
	    vector2.transformMat2d(v, v, m);
	    return this;
	  };

	  _proto.resetTransform = function resetTransform(context) {
	    var mo = this._attrs.attrs.matrix;

	    if (!isUnchanged(mo)) {
	      context.transform(mo[0], mo[1], mo[2], mo[3], mo[4], mo[5]);
	    }
	  };

	  _proto.isDestroyed = function isDestroyed() {
	    return this.get('destroyed');
	  };

	  return Element;
	}();

	var element = Element$1;

	var _possibleConstructorReturn2$4 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$4 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$4 = interopRequireDefault(inheritsLoose);





	var Shape$1 = /*#__PURE__*/function (_Element) {
	  (0, _inheritsLoose2$4["default"])(Shape, _Element);

	  function Shape() {
	    return _Element.apply(this, arguments) || this;
	  }

	  var _proto = Shape.prototype;

	  _proto._initProperties = function _initProperties() {
	    this._attrs = {
	      zIndex: 0,
	      visible: true,
	      destroyed: false,
	      isShape: true,
	      attrs: {}
	    };
	  };

	  _proto.getType = function getType() {
	    return this._attrs.type;
	  };

	  _proto.drawInner = function drawInner(context) {
	    var self = this;
	    var attrs = self.get('attrs');
	    self.createPath(context);
	    var originOpacity = context.globalAlpha;

	    if (self.hasFill()) {
	      var fillOpacity = attrs.fillOpacity;

	      if (!common.isNil(fillOpacity) && fillOpacity !== 1) {
	        context.globalAlpha = fillOpacity;
	        context.fill();
	        context.globalAlpha = originOpacity;
	      } else {
	        context.fill();
	      }
	    }

	    if (self.hasStroke()) {
	      var lineWidth = attrs.lineWidth;

	      if (lineWidth > 0) {
	        var strokeOpacity = attrs.strokeOpacity;

	        if (!common.isNil(strokeOpacity) && strokeOpacity !== 1) {
	          context.globalAlpha = strokeOpacity;
	        }

	        context.stroke();
	      }
	    }
	  };

	  _proto.getBBox = function getBBox() {
	    var bbox = this._attrs.bbox;

	    if (!bbox) {
	      bbox = this.calculateBox();

	      if (bbox) {
	        bbox.x = bbox.minX;
	        bbox.y = bbox.minY;
	        bbox.width = bbox.maxX - bbox.minX;
	        bbox.height = bbox.maxY - bbox.minY;
	      }

	      this._attrs.bbox = bbox;
	    }

	    return bbox;
	  };

	  _proto.calculateBox = function calculateBox() {
	    return null;
	  };

	  _proto.createPath = function createPath() {};

	  return Shape;
	}(element);

	var shape$2 = Shape$1;

	var SHAPE_MAP = {};
	var INDEX = '_INDEX';

	function getComparer(compare) {
	  return function (left, right) {
	    var result = compare(left, right);
	    return result === 0 ? left[INDEX] - right[INDEX] : result;
	  };
	}

	var container = {
	  getGroupClass: function getGroupClass() {},
	  getChildren: function getChildren() {
	    return this.get('children');
	  },
	  addShape: function addShape(type, cfg) {
	    if (cfg === void 0) {
	      cfg = {};
	    }

	    var canvas = this.get('canvas');
	    var shapeType = SHAPE_MAP[type];

	    if (!shapeType) {
	      shapeType = common.upperFirst(type);
	      SHAPE_MAP[type] = shapeType;
	    }

	    cfg.canvas = canvas;

	    if (shapeType === 'Text' && canvas && canvas.get('fontFamily')) {
	      cfg.attrs.fontFamily = cfg.attrs.fontFamily || canvas.get('fontFamily');
	    }

	    var shape = new shape$2[shapeType](cfg);
	    this.add(shape);
	    return shape;
	  },
	  addGroup: function addGroup(cfg) {
	    var canvas = this.get('canvas');
	    var groupClass = this.getGroupClass();
	    cfg = common.mix({}, cfg);
	    cfg.canvas = canvas;
	    cfg.parent = this;
	    var rst = new groupClass(cfg);
	    this.add(rst);
	    return rst;
	  },
	  contain: function contain(item) {
	    var children = this.get('children');
	    return children.indexOf(item) > -1;
	  },
	  sort: function sort() {
	    var children = this.get('children');

	    for (var i = 0, len = children.length; i < len; i++) {
	      var child = children[i];
	      child[INDEX] = i;
	    }

	    children.sort(getComparer(function (obj1, obj2) {
	      return obj1.get('zIndex') - obj2.get('zIndex');
	    }));
	    return this;
	  },
	  clear: function clear() {
	    var children = this.get('children');

	    while (children.length !== 0) {
	      children[children.length - 1].remove(true);
	    }

	    return this;
	  },
	  add: function add(items) {
	    var self = this;
	    var children = self.get('children');

	    if (!common.isArray(items)) {
	      items = [items];
	    }

	    for (var i = 0, len = items.length; i < len; i++) {
	      var item = items[i];
	      var parent = item.get('parent');

	      if (parent) {
	        var descendants = parent.get('children');
	        common.Array.remove(descendants, item);
	      }

	      self._setEvn(item);

	      children.push(item);
	    }

	    return self;
	  },
	  _setEvn: function _setEvn(item) {
	    var self = this;
	    item._attrs.parent = self;
	    item._attrs.context = self._attrs.context;
	    item._attrs.canvas = self._attrs.canvas;
	    var clip = item._attrs.attrs.clip;

	    if (clip) {
	      clip.set('parent', self);
	      clip.set('context', self.get('context'));
	    }

	    if (item._attrs.isGroup) {
	      var children = item._attrs.children;

	      for (var i = 0, len = children.length; i < len; i++) {
	        item._setEvn(children[i]);
	      }
	    }
	  }
	};

	var _possibleConstructorReturn2$5 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$5 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$5 = interopRequireDefault(inheritsLoose);









	var Group = /*#__PURE__*/function (_Element) {
	  (0, _inheritsLoose2$5["default"])(Group, _Element);

	  function Group() {
	    return _Element.apply(this, arguments) || this;
	  }

	  var _proto = Group.prototype;

	  _proto._initProperties = function _initProperties() {
	    this._attrs = {
	      zIndex: 0,
	      visible: true,
	      destroyed: false,
	      isGroup: true,
	      children: []
	    };
	  };

	  _proto.drawInner = function drawInner(context) {
	    var children = this.get('children');

	    for (var i = 0, len = children.length; i < len; i++) {
	      var child = children[i];
	      child.draw(context);
	    }

	    return this;
	  };

	  _proto.getBBox = function getBBox() {
	    var self = this;
	    var minX = Infinity;
	    var maxX = -Infinity;
	    var minY = Infinity;
	    var maxY = -Infinity;
	    var children = self.get('children');

	    for (var i = 0, length = children.length; i < length; i++) {
	      var child = children[i];

	      if (child.get('visible')) {
	        var box = child.getBBox();

	        if (!box) {
	          continue;
	        }

	        var leftTop = [box.minX, box.minY];
	        var leftBottom = [box.minX, box.maxY];
	        var rightTop = [box.maxX, box.minY];
	        var rightBottom = [box.maxX, box.maxY];
	        var matrix = child.attr('matrix');
	        vector2.transformMat2d(leftTop, leftTop, matrix);
	        vector2.transformMat2d(leftBottom, leftBottom, matrix);
	        vector2.transformMat2d(rightTop, rightTop, matrix);
	        vector2.transformMat2d(rightBottom, rightBottom, matrix);
	        minX = Math.min(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], minX);
	        maxX = Math.max(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], maxX);
	        minY = Math.min(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], minY);
	        maxY = Math.max(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], maxY);
	      }
	    }

	    return {
	      minX: minX,
	      minY: minY,
	      maxX: maxX,
	      maxY: maxY,
	      x: minX,
	      y: minY,
	      width: maxX - minX,
	      height: maxY - minY
	    };
	  };

	  _proto.destroy = function destroy() {
	    if (this.get('destroyed')) {
	      return;
	    }

	    this.clear();

	    _Element.prototype.destroy.call(this);
	  };

	  return Group;
	}(element);

	common.mix(Group.prototype, container, {
	  getGroupClass: function getGroupClass() {
	    return Group;
	  }
	});
	var group$1 = Group;

	var requestAnimationFrame$1 = {
	  requestAnimationFrame: typeof window === 'object' && window.requestAnimationFrame ? window.requestAnimationFrame : function (fn) {
	    return setTimeout(fn, 16);
	  }
	};

	var _possibleConstructorReturn2$6 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$6 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$6 = interopRequireDefault(inheritsLoose);

	var _emit$1 = interopRequireDefault(emit);

	var _controller = interopRequireDefault(controller);

	var _canvasElement = interopRequireDefault(canvasElement);







	var requestAnimationFrame$2 = requestAnimationFrame$1.requestAnimationFrame;

	var Canvas = /*#__PURE__*/function (_EventEmit) {
	  (0, _inheritsLoose2$6["default"])(Canvas, _EventEmit);

	  var _proto = Canvas.prototype;

	  _proto.get = function get(name) {
	    return this._attrs[name];
	  };

	  _proto.set = function set(name, value) {
	    this._attrs[name] = value;
	  };

	  function Canvas(cfg) {
	    var _this;

	    _this = _EventEmit.call(this) || this;
	    _this._attrs = common.mix({
	      type: 'canvas',
	      children: []
	    }, cfg);

	    _this._initPixelRatio();

	    _this._initCanvas();

	    return _this;
	  }

	  _proto._initPixelRatio = function _initPixelRatio() {
	    var pixelRatio = this.get('pixelRatio');

	    if (!pixelRatio) {
	      this.set('pixelRatio', common.getPixelRatio());
	    }
	  };

	  _proto.beforeDraw = function beforeDraw() {
	    var context = this._attrs.context;
	    var el = this._attrs.el;
	    context && context.clearRect && context.clearRect(0, 0, el.width, el.height);
	  };

	  _proto._initCanvas = function _initCanvas() {
	    var self = this;
	    var el = self.get('el');
	    var context = self.get('context');

	    if (!el && !context) {
	      throw new Error('Please specify the id, el or context of the chart!');
	    }

	    var canvas;

	    if (el) {
	      // DOMElement or String
	      canvas = common.isString(el) ? common.getDomById(el) : el;
	    } else {
	      // 说明没有指定el
	      canvas = _canvasElement["default"].create(context);
	    }

	    if (context && canvas && !canvas.getContext) {
	      canvas.getContext = function () {
	        return context;
	      };
	    }

	    var width = self.get('width');

	    if (!width) {
	      width = common.getWidth(canvas);
	    }

	    var height = self.get('height');

	    if (!height) {
	      height = common.getHeight(canvas);
	    }

	    self.set('canvas', this);
	    self.set('el', canvas);
	    self.set('context', context || canvas.getContext('2d'));
	    self.changeSize(width, height); // 初始化事件控制器

	    var eventController = new _controller["default"]({
	      canvas: this,
	      el: canvas
	    });
	    self.set('eventController', eventController);
	  };

	  _proto.changeSize = function changeSize(width, height) {
	    var pixelRatio = this.get('pixelRatio');
	    var canvasDOM = this.get('el'); // HTMLCanvasElement or canvasElement
	    // 浏览器环境设置style样式

	    if (canvasDOM.style) {
	      canvasDOM.style.width = width + 'px';
	      canvasDOM.style.height = height + 'px';
	    }

	    if (common.isCanvasElement(canvasDOM)) {
	      canvasDOM.width = width * pixelRatio;
	      canvasDOM.height = height * pixelRatio;

	      if (pixelRatio !== 1) {
	        var ctx = this.get('context');
	        ctx.scale(pixelRatio, pixelRatio);
	      }
	    }

	    this.set('width', width);
	    this.set('height', height);
	  };

	  _proto.getWidth = function getWidth() {
	    var pixelRatio = this.get('pixelRatio');
	    var width = this.get('width');
	    return width * pixelRatio;
	  };

	  _proto.getHeight = function getHeight() {
	    var pixelRatio = this.get('pixelRatio');
	    var height = this.get('height');
	    return height * pixelRatio;
	  };

	  _proto.getPointByClient = function getPointByClient(clientX, clientY) {
	    var el = this.get('el');
	    var bbox = el.getBoundingClientRect();
	    var width = bbox.right - bbox.left;
	    var height = bbox.bottom - bbox.top;
	    return {
	      x: (clientX - bbox.left) * (el.width / width),
	      y: (clientY - bbox.top) * (el.height / height)
	    };
	  };

	  _proto._beginDraw = function _beginDraw() {
	    this._attrs.toDraw = true;
	  };

	  _proto._endDraw = function _endDraw() {
	    this._attrs.toDraw = false;
	  };

	  _proto.draw = function draw() {
	    var self = this;

	    function drawInner() {
	      self.set('animateHandler', requestAnimationFrame$2(function () {
	        self.set('animateHandler', undefined);

	        if (self.get('toDraw')) {
	          drawInner();
	        }
	      }));
	      self.beforeDraw();

	      try {
	        var context = self._attrs.context;
	        var children = self._attrs.children;

	        for (var i = 0, len = children.length; i < len; i++) {
	          var child = children[i];
	          child.draw(context);
	        } // 支付宝，微信小程序，需要调context.draw才能完成绘制， 所以这里直接判断是否有.draw方法


	        if (context.draw) {
	          context.draw();
	        }
	      } catch (ev) {
	        console.warn('error in draw canvas, detail as:');
	        console.warn(ev);

	        self._endDraw();
	      }

	      self._endDraw();
	    }

	    if (self.get('destroyed')) {
	      return;
	    }

	    if (self.get('animateHandler')) {
	      this._beginDraw();
	    } else {
	      drawInner();
	    }
	  };

	  _proto.destroy = function destroy() {
	    if (this.get('destroyed')) {
	      return;
	    } // 需要清理 canvas 画布内容，否则会导致 spa 应用 ios 下 canvas 白屏
	    // https://stackoverflow.com/questions/52532614/total-canvas-memory-use-exceeds-the-maximum-limit-safari-12
	    // https://github.com/antvis/F2/issues/630


	    var el = this.get('el');
	    el.width = 0;
	    el.height = 0;
	    this.clear();
	    this._attrs = {};
	    this.set('destroyed', true);
	  };

	  _proto.isDestroyed = function isDestroyed() {
	    return this.get('destroyed');
	  };

	  return Canvas;
	}(_emit$1["default"]);

	common.mix(Canvas.prototype, container, {
	  getGroupClass: function getGroupClass() {
	    return group$1;
	  }
	});
	var canvas = Canvas;

	var _possibleConstructorReturn2$7 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$7 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$7 = interopRequireDefault(inheritsLoose);





	var Rect = /*#__PURE__*/function (_Shape) {
	  (0, _inheritsLoose2$7["default"])(Rect, _Shape);

	  function Rect() {
	    return _Shape.apply(this, arguments) || this;
	  }

	  var _proto = Rect.prototype;

	  _proto._initProperties = function _initProperties() {
	    _Shape.prototype._initProperties.call(this);

	    this._attrs.canFill = true;
	    this._attrs.canStroke = true;
	    this._attrs.type = 'rect';
	  };

	  _proto.getDefaultAttrs = function getDefaultAttrs() {
	    return {
	      x: 0,
	      y: 0,
	      width: 0,
	      height: 0,
	      radius: 0,
	      lineWidth: 0
	    };
	  };

	  _proto.createPath = function createPath(context) {
	    var self = this;
	    var attrs = self.get('attrs');
	    var x = attrs.x,
	        y = attrs.y,
	        width = attrs.width,
	        height = attrs.height;
	    context.beginPath();
	    var radius = attrs.radius;

	    if (!radius || !(width * height)) {
	      context.rect(x, y, width, height);
	    } else {
	      radius = common.parsePadding(radius);
	      context.moveTo(x + radius[0], y);
	      context.lineTo(x + width - radius[1], y);
	      context.arc(x + width - radius[1], y + radius[1], radius[1], -Math.PI / 2, 0, false);
	      context.lineTo(x + width, y + height - radius[2]);
	      context.arc(x + width - radius[2], y + height - radius[2], radius[2], 0, Math.PI / 2, false);
	      context.lineTo(x + radius[3], y + height);
	      context.arc(x + radius[3], y + height - radius[3], radius[3], Math.PI / 2, Math.PI, false);
	      context.lineTo(x, y + radius[0]);
	      context.arc(x + radius[0], y + radius[0], radius[0], Math.PI, Math.PI * 3 / 2, false);
	      context.closePath();
	    }
	  };

	  _proto.calculateBox = function calculateBox() {
	    var attrs = this.get('attrs');
	    var x = attrs.x,
	        y = attrs.y,
	        width = attrs.width,
	        height = attrs.height;
	    return {
	      minX: x,
	      minY: y,
	      maxX: x + width,
	      maxY: y + height
	    };
	  };

	  return Rect;
	}(shape$2);

	shape$2.Rect = Rect;

	var _possibleConstructorReturn2$8 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$8 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$8 = interopRequireDefault(inheritsLoose);



	var Circle = /*#__PURE__*/function (_Shape) {
	  (0, _inheritsLoose2$8["default"])(Circle, _Shape);

	  function Circle() {
	    return _Shape.apply(this, arguments) || this;
	  }

	  var _proto = Circle.prototype;

	  _proto._initProperties = function _initProperties() {
	    _Shape.prototype._initProperties.call(this);

	    this._attrs.canFill = true;
	    this._attrs.canStroke = true;
	    this._attrs.type = 'circle';
	  };

	  _proto.getDefaultAttrs = function getDefaultAttrs() {
	    return {
	      x: 0,
	      y: 0,
	      r: 0,
	      lineWidth: 0
	    };
	  };

	  _proto.createPath = function createPath(context) {
	    var attrs = this.get('attrs');
	    var x = attrs.x,
	        y = attrs.y,
	        r = attrs.r;
	    context.beginPath();
	    context.arc(x, y, r, 0, Math.PI * 2, false);
	    context.closePath();
	  };

	  _proto.calculateBox = function calculateBox() {
	    var attrs = this.get('attrs');
	    var x = attrs.x,
	        y = attrs.y,
	        r = attrs.r;
	    return {
	      minX: x - r,
	      maxX: x + r,
	      minY: y - r,
	      maxY: y + r
	    };
	  };

	  return Circle;
	}(shape$2);

	shape$2.Circle = Circle;

	var start = vector2.create();
	var end = vector2.create();
	var extremity = vector2.create();

	function getCubicBezierXYatT(startPt, controlPt1, controlPt2, endPt, T) {
	  var x = CubicN(T, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
	  var y = CubicN(T, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
	  return {
	    x: x,
	    y: y
	  };
	} // cubic helper formula at T distance


	function CubicN(T, a, b, c, d) {
	  var t2 = T * T;
	  var t3 = t2 * T;
	  return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
	}

	function cubicBezierBounds(c) {
	  var minX = Infinity;
	  var maxX = -Infinity;
	  var minY = Infinity;
	  var maxY = -Infinity;
	  var s = {
	    x: c[0],
	    y: c[1]
	  };
	  var c1 = {
	    x: c[2],
	    y: c[3]
	  };
	  var c2 = {
	    x: c[4],
	    y: c[5]
	  };
	  var e = {
	    x: c[6],
	    y: c[7]
	  };

	  for (var t = 0; t < 100; t++) {
	    var pt = getCubicBezierXYatT(s, c1, c2, e, t / 100);

	    if (pt.x < minX) {
	      minX = pt.x;
	    }

	    if (pt.x > maxX) {
	      maxX = pt.x;
	    }

	    if (pt.y < minY) {
	      minY = pt.y;
	    }

	    if (pt.y > maxY) {
	      maxY = pt.y;
	    }
	  }

	  return {
	    minX: minX,
	    minY: minY,
	    maxX: maxX,
	    maxY: maxY
	  };
	}

	var bbox = {
	  getBBoxFromPoints: function getBBoxFromPoints(points, lineWidth) {
	    if (points.length === 0) {
	      return;
	    }

	    var p = points[0];
	    var left = p.x;
	    var right = p.x;
	    var top = p.y;
	    var bottom = p.y;
	    var len = points.length;

	    for (var i = 1; i < len; i++) {
	      p = points[i];
	      left = Math.min(left, p.x);
	      right = Math.max(right, p.x);
	      top = Math.min(top, p.y);
	      bottom = Math.max(bottom, p.y);
	    }

	    lineWidth = lineWidth / 2 || 0;
	    return {
	      minX: left - lineWidth,
	      minY: top - lineWidth,
	      maxX: right + lineWidth,
	      maxY: bottom + lineWidth
	    };
	  },
	  getBBoxFromLine: function getBBoxFromLine(x0, y0, x1, y1, lineWidth) {
	    lineWidth = lineWidth / 2 || 0;
	    return {
	      minX: Math.min(x0, x1) - lineWidth,
	      minY: Math.min(y0, y1) - lineWidth,
	      maxX: Math.max(x0, x1) + lineWidth,
	      maxY: Math.max(y0, y1) + lineWidth
	    };
	  },
	  getBBoxFromArc: function getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise) {
	    var diff = Math.abs(startAngle - endAngle);

	    if (diff % (Math.PI * 2) < 1e-4 && diff > 1e-4) {
	      // Is a circle
	      return {
	        minX: x - r,
	        minY: y - r,
	        maxX: x + r,
	        maxY: y + r
	      };
	    }

	    start[0] = Math.cos(startAngle) * r + x;
	    start[1] = Math.sin(startAngle) * r + y;
	    end[0] = Math.cos(endAngle) * r + x;
	    end[1] = Math.sin(endAngle) * r + y;
	    var min = [0, 0];
	    var max = [0, 0];
	    vector2.min(min, start, end);
	    vector2.max(max, start, end); // Thresh to [0, Math.PI * 2]

	    startAngle = startAngle % (Math.PI * 2);

	    if (startAngle < 0) {
	      startAngle = startAngle + Math.PI * 2;
	    }

	    endAngle = endAngle % (Math.PI * 2);

	    if (endAngle < 0) {
	      endAngle = endAngle + Math.PI * 2;
	    }

	    if (startAngle > endAngle && !anticlockwise) {
	      endAngle += Math.PI * 2;
	    } else if (startAngle < endAngle && anticlockwise) {
	      startAngle += Math.PI * 2;
	    }

	    if (anticlockwise) {
	      var tmp = endAngle;
	      endAngle = startAngle;
	      startAngle = tmp;
	    }

	    for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
	      if (angle > startAngle) {
	        extremity[0] = Math.cos(angle) * r + x;
	        extremity[1] = Math.sin(angle) * r + y;
	        vector2.min(min, extremity, min);
	        vector2.max(max, extremity, max);
	      }
	    }

	    return {
	      minX: min[0],
	      minY: min[1],
	      maxX: max[0],
	      maxY: max[1]
	    };
	  },
	  getBBoxFromBezierGroup: function getBBoxFromBezierGroup(points, lineWidth) {
	    var minX = Infinity;
	    var maxX = -Infinity;
	    var minY = Infinity;
	    var maxY = -Infinity;

	    for (var i = 0, len = points.length; i < len; i++) {
	      var bbox = cubicBezierBounds(points[i]);

	      if (bbox.minX < minX) {
	        minX = bbox.minX;
	      }

	      if (bbox.maxX > maxX) {
	        maxX = bbox.maxX;
	      }

	      if (bbox.minY < minY) {
	        minY = bbox.minY;
	      }

	      if (bbox.maxY > maxY) {
	        maxY = bbox.maxY;
	      }
	    }

	    lineWidth = lineWidth / 2 || 0;
	    return {
	      minX: minX - lineWidth,
	      minY: minY - lineWidth,
	      maxX: maxX + lineWidth,
	      maxY: maxY + lineWidth
	    };
	  }
	};

	var _possibleConstructorReturn2$9 = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$9 = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$9 = interopRequireDefault(inheritsLoose);





	var Line$1 = /*#__PURE__*/function (_Shape) {
	  (0, _inheritsLoose2$9["default"])(Line, _Shape);

	  function Line() {
	    return _Shape.apply(this, arguments) || this;
	  }

	  var _proto = Line.prototype;

	  _proto._initProperties = function _initProperties() {
	    _Shape.prototype._initProperties.call(this);

	    this._attrs.canStroke = true;
	    this._attrs.type = 'line';
	  };

	  _proto.getDefaultAttrs = function getDefaultAttrs() {
	    return {
	      x1: 0,
	      y1: 0,
	      x2: 0,
	      y2: 0,
	      lineWidth: 1
	    };
	  };

	  _proto.createPath = function createPath(context) {
	    var attrs = this.get('attrs');
	    var x1 = attrs.x1,
	        y1 = attrs.y1,
	        x2 = attrs.x2,
	        y2 = attrs.y2;
	    context.beginPath();
	    context.moveTo(x1, y1);
	    context.lineTo(x2, y2);
	  };

	  _proto.calculateBox = function calculateBox() {
	    var attrs = this.get('attrs');
	    var x1 = attrs.x1,
	        y1 = attrs.y1,
	        x2 = attrs.x2,
	        y2 = attrs.y2,
	        lineWidth = attrs.lineWidth;
	    return bbox.getBBoxFromLine(x1, y1, x2, y2, lineWidth);
	  };

	  return Line;
	}(shape$2);

	shape$2.Line = Line$1;

	var _possibleConstructorReturn2$a = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$a = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$a = interopRequireDefault(inheritsLoose);





	var Polygon = /*#__PURE__*/function (_Shape) {
	  (0, _inheritsLoose2$a["default"])(Polygon, _Shape);

	  function Polygon() {
	    return _Shape.apply(this, arguments) || this;
	  }

	  var _proto = Polygon.prototype;

	  _proto._initProperties = function _initProperties() {
	    _Shape.prototype._initProperties.call(this);

	    this._attrs.canFill = true;
	    this._attrs.canStroke = true;
	    this._attrs.type = 'polygon';
	  };

	  _proto.getDefaultAttrs = function getDefaultAttrs() {
	    return {
	      points: null,
	      lineWidth: 0
	    };
	  };

	  _proto.createPath = function createPath(context) {
	    var self = this;
	    var attrs = self.get('attrs');
	    var points = attrs.points;
	    context.beginPath();

	    for (var i = 0, len = points.length; i < len; i++) {
	      var point = points[i];

	      if (i === 0) {
	        context.moveTo(point.x, point.y);
	      } else {
	        context.lineTo(point.x, point.y);
	      }
	    }

	    context.closePath();
	  };

	  _proto.calculateBox = function calculateBox() {
	    var attrs = this.get('attrs');
	    var points = attrs.points;
	    return bbox.getBBoxFromPoints(points);
	  };

	  return Polygon;
	}(shape$2);

	shape$2.Polygon = Polygon;

	/**
	 * @fileOverview convert the line to curve
	 * @author dxq613@gmail.com
	 */


	function getPoint(v) {
	  return [v.x, v.y];
	}

	function smoothBezier(points, smooth, isLoop, constraint) {
	  var cps = [];
	  var prevPoint;
	  var nextPoint;
	  var hasConstraint = !!constraint;
	  var min;
	  var max;
	  var point;
	  var len;
	  var l;
	  var i;

	  if (hasConstraint) {
	    min = [Infinity, Infinity];
	    max = [-Infinity, -Infinity];

	    for (i = 0, l = points.length; i < l; i++) {
	      point = getPoint(points[i]);
	      vector2.min(min, min, point);
	      vector2.max(max, max, point);
	    }

	    vector2.min(min, min, constraint[0]);
	    vector2.max(max, max, constraint[1]);
	  }

	  for (i = 0, len = points.length; i < len; i++) {
	    point = getPoint(points[i]);

	    if (isLoop) {
	      prevPoint = getPoint(points[i ? i - 1 : len - 1]);
	      nextPoint = getPoint(points[(i + 1) % len]);
	    } else {
	      if (i === 0 || i === len - 1) {
	        cps.push([point[0], point[1]]);
	        continue;
	      } else {
	        prevPoint = getPoint(points[i - 1]);
	        nextPoint = getPoint(points[i + 1]);
	      }
	    }

	    var v = vector2.sub([], nextPoint, prevPoint);
	    vector2.scale(v, v, smooth);
	    var d0 = vector2.distance(point, prevPoint);
	    var d1 = vector2.distance(point, nextPoint);
	    var sum = d0 + d1;

	    if (sum !== 0) {
	      d0 /= sum;
	      d1 /= sum;
	    }

	    var v1 = vector2.scale([], v, -d0);
	    var v2 = vector2.scale([], v, d1);
	    var cp0 = vector2.add([], point, v1);
	    var cp1 = vector2.add([], point, v2);

	    if (hasConstraint) {
	      vector2.max(cp0, cp0, min);
	      vector2.min(cp0, cp0, max);
	      vector2.max(cp1, cp1, min);
	      vector2.min(cp1, cp1, max);
	    }

	    cps.push([cp0[0], cp0[1]]);
	    cps.push([cp1[0], cp1[1]]);
	  }

	  if (isLoop) {
	    cps.push(cps.shift());
	  }

	  return cps;
	}

	function catmullRom2bezier(pointList, z, constraint) {
	  var isLoop = !!z;
	  var controlPointList = smoothBezier(pointList, 0.4, isLoop, constraint);
	  var len = pointList.length;
	  var d1 = [];
	  var cp1;
	  var cp2;
	  var p;

	  for (var i = 0; i < len - 1; i++) {
	    cp1 = controlPointList[i * 2];
	    cp2 = controlPointList[i * 2 + 1];
	    p = pointList[i + 1];
	    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p.x, p.y]);
	  }

	  if (isLoop) {
	    cp1 = controlPointList[len];
	    cp2 = controlPointList[len + 1];
	    p = pointList[0];
	    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p.x, p.y]);
	  }

	  return d1;
	}

	var smooth = {
	  smooth: catmullRom2bezier
	};

	var _possibleConstructorReturn2$b = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$b = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$b = interopRequireDefault(inheritsLoose);





	 // filter the point which x or y is NaN


	function _filterPoints(points) {
	  var filteredPoints = [];

	  for (var i = 0, len = points.length; i < len; i++) {
	    var point = points[i];

	    if (!isNaN(point.x) && !isNaN(point.y)) {
	      filteredPoints.push(point);
	    }
	  }

	  return filteredPoints;
	}

	var Polyline = /*#__PURE__*/function (_Shape) {
	  (0, _inheritsLoose2$b["default"])(Polyline, _Shape);

	  function Polyline() {
	    return _Shape.apply(this, arguments) || this;
	  }

	  var _proto = Polyline.prototype;

	  _proto._initProperties = function _initProperties() {
	    _Shape.prototype._initProperties.call(this);

	    this._attrs.canFill = true;
	    this._attrs.canStroke = true;
	    this._attrs.type = 'polyline';
	  };

	  _proto.getDefaultAttrs = function getDefaultAttrs() {
	    return {
	      points: null,
	      lineWidth: 1,
	      smooth: false
	    };
	  };

	  _proto.createPath = function createPath(context) {
	    var self = this;
	    var attrs = self.get('attrs');
	    var points = attrs.points,
	        smooth$1 = attrs.smooth;

	    var filteredPoints = _filterPoints(points);

	    context.beginPath();

	    if (filteredPoints.length) {
	      context.moveTo(filteredPoints[0].x, filteredPoints[0].y);

	      if (smooth$1) {
	        var constaint = [[0, 0], [1, 1]];
	        var sps = smooth.smooth(filteredPoints, false, constaint);

	        for (var i = 0, n = sps.length; i < n; i++) {
	          var sp = sps[i];
	          context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
	        }
	      } else {
	        var _i;

	        var l;

	        for (_i = 1, l = filteredPoints.length - 1; _i < l; _i++) {
	          context.lineTo(filteredPoints[_i].x, filteredPoints[_i].y);
	        }

	        context.lineTo(filteredPoints[l].x, filteredPoints[l].y);
	      }
	    }
	  };

	  _proto.calculateBox = function calculateBox() {
	    var attrs = this.get('attrs');
	    var points = attrs.points,
	        smooth$1 = attrs.smooth,
	        lineWidth = attrs.lineWidth;

	    var filteredPoints = _filterPoints(points);

	    if (smooth$1) {
	      var newPoints = [];
	      var constaint = [[0, 0], [1, 1]];
	      var sps = smooth.smooth(filteredPoints, false, constaint);

	      for (var i = 0, n = sps.length; i < n; i++) {
	        var sp = sps[i];

	        if (i === 0) {
	          newPoints.push([filteredPoints[0].x, filteredPoints[0].y, sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
	        } else {
	          var lastPoint = sps[i - 1];
	          newPoints.push([lastPoint[5], lastPoint[6], sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
	        }
	      }

	      return bbox.getBBoxFromBezierGroup(newPoints, lineWidth);
	    }

	    return bbox.getBBoxFromPoints(filteredPoints, lineWidth);
	  };

	  return Polyline;
	}(shape$2);

	shape$2.Polyline = Polyline;

	var _possibleConstructorReturn2$c = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$c = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$c = interopRequireDefault(inheritsLoose);





	var Arc = /*#__PURE__*/function (_Shape) {
	  (0, _inheritsLoose2$c["default"])(Arc, _Shape);

	  function Arc() {
	    return _Shape.apply(this, arguments) || this;
	  }

	  var _proto = Arc.prototype;

	  _proto._initProperties = function _initProperties() {
	    _Shape.prototype._initProperties.call(this);

	    this._attrs.canStroke = true;
	    this._attrs.canFill = true;
	    this._attrs.type = 'arc';
	  };

	  _proto.getDefaultAttrs = function getDefaultAttrs() {
	    return {
	      x: 0,
	      y: 0,
	      r: 0,
	      startAngle: 0,
	      endAngle: Math.PI * 2,
	      anticlockwise: false,
	      lineWidth: 1
	    };
	  };

	  _proto.createPath = function createPath(context) {
	    var attrs = this.get('attrs');
	    var x = attrs.x,
	        y = attrs.y,
	        r = attrs.r,
	        startAngle = attrs.startAngle,
	        endAngle = attrs.endAngle,
	        anticlockwise = attrs.anticlockwise;
	    context.beginPath();

	    if (startAngle !== endAngle) {
	      context.arc(x, y, r, startAngle, endAngle, anticlockwise);
	    }
	  };

	  _proto.calculateBox = function calculateBox() {
	    var attrs = this.get('attrs');
	    var x = attrs.x,
	        y = attrs.y,
	        r = attrs.r,
	        startAngle = attrs.startAngle,
	        endAngle = attrs.endAngle,
	        anticlockwise = attrs.anticlockwise;
	    return bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise);
	  };

	  return Arc;
	}(shape$2);

	shape$2.Arc = Arc;

	var _possibleConstructorReturn2$d = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$d = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$d = interopRequireDefault(inheritsLoose);





	var Sector = /*#__PURE__*/function (_Shape) {
	  (0, _inheritsLoose2$d["default"])(Sector, _Shape);

	  function Sector() {
	    return _Shape.apply(this, arguments) || this;
	  }

	  var _proto = Sector.prototype;

	  _proto._initProperties = function _initProperties() {
	    _Shape.prototype._initProperties.call(this);

	    this._attrs.canFill = true;
	    this._attrs.canStroke = true;
	    this._attrs.type = 'sector';
	  };

	  _proto.getDefaultAttrs = function getDefaultAttrs() {
	    return {
	      x: 0,
	      y: 0,
	      lineWidth: 0,
	      r: 0,
	      r0: 0,
	      startAngle: 0,
	      endAngle: Math.PI * 2,
	      anticlockwise: false
	    };
	  };

	  _proto.createPath = function createPath(context) {
	    var attrs = this.get('attrs');
	    var x = attrs.x,
	        y = attrs.y,
	        startAngle = attrs.startAngle,
	        endAngle = attrs.endAngle,
	        r = attrs.r,
	        r0 = attrs.r0,
	        anticlockwise = attrs.anticlockwise;
	    context.beginPath();
	    var unitX = Math.cos(startAngle);
	    var unitY = Math.sin(startAngle);
	    context.moveTo(unitX * r0 + x, unitY * r0 + y);
	    context.lineTo(unitX * r + x, unitY * r + y); // 当扇形的角度非常小的时候，就不进行弧线的绘制；或者整个只有1个扇形时，会出现end<0的情况不绘制

	    if (Math.abs(endAngle - startAngle) > 0.0001 || startAngle === 0 && endAngle < 0) {
	      context.arc(x, y, r, startAngle, endAngle, anticlockwise);
	      context.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y);

	      if (r0 !== 0) {
	        context.arc(x, y, r0, endAngle, startAngle, !anticlockwise);
	      }
	    }

	    context.closePath();
	  };

	  _proto.calculateBox = function calculateBox() {
	    var attrs = this.get('attrs');
	    var x = attrs.x,
	        y = attrs.y,
	        r = attrs.r,
	        r0 = attrs.r0,
	        startAngle = attrs.startAngle,
	        endAngle = attrs.endAngle,
	        anticlockwise = attrs.anticlockwise;
	    var outerBBox = bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise);
	    var innerBBox = bbox.getBBoxFromArc(x, y, r0, startAngle, endAngle, anticlockwise);
	    return {
	      minX: Math.min(outerBBox.minX, innerBBox.minX),
	      minY: Math.min(outerBBox.minY, innerBBox.minY),
	      maxX: Math.max(outerBBox.maxX, innerBBox.maxX),
	      maxY: Math.max(outerBBox.maxY, innerBBox.maxY)
	    };
	  };

	  return Sector;
	}(shape$2);

	shape$2.Sector = Sector;

	var Rect$1 = {
	  calcRotatedBox: function calcRotatedBox(_ref) {
	    var width = _ref.width,
	        height = _ref.height,
	        rotate = _ref.rotate;
	    var absRotate = Math.abs(rotate);
	    return {
	      width: Math.abs(width * Math.cos(absRotate) + height * Math.sin(absRotate)),
	      height: Math.abs(height * Math.cos(absRotate) + width * Math.sin(absRotate))
	    };
	  }
	};
	var rect = Rect$1;

	var _possibleConstructorReturn2$e = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$e = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$e = interopRequireDefault(inheritsLoose);







	var textWidthCacheCounter = 0;
	var textWidthCache = {};
	var TEXT_CACHE_MAX = 5000;

	var Text = /*#__PURE__*/function (_Shape) {
	  (0, _inheritsLoose2$e["default"])(Text, _Shape);

	  function Text() {
	    return _Shape.apply(this, arguments) || this;
	  }

	  var _proto = Text.prototype;

	  _proto._initProperties = function _initProperties() {
	    _Shape.prototype._initProperties.call(this);

	    this._attrs.canFill = true;
	    this._attrs.canStroke = true;
	    this._attrs.type = 'text';
	  };

	  _proto.getDefaultAttrs = function getDefaultAttrs() {
	    return {
	      lineWidth: 0,
	      lineCount: 1,
	      fontSize: 12,
	      fontFamily: 'sans-serif',
	      fontStyle: 'normal',
	      fontWeight: 'normal',
	      fontVariant: 'normal',
	      textAlign: 'start',
	      textBaseline: 'bottom',
	      lineHeight: null,
	      textArr: null
	    };
	  };

	  _proto._getFontStyle = function _getFontStyle() {
	    var attrs = this._attrs.attrs;
	    var fontSize = attrs.fontSize,
	        fontFamily = attrs.fontFamily,
	        fontWeight = attrs.fontWeight,
	        fontStyle = attrs.fontStyle,
	        fontVariant = attrs.fontVariant;
	    return fontStyle + " " + fontVariant + " " + fontWeight + " " + fontSize + "px " + fontFamily;
	  };

	  _proto._afterAttrsSet = function _afterAttrsSet() {
	    var attrs = this._attrs.attrs;
	    attrs.font = this._getFontStyle();

	    if (attrs.text) {
	      var text = attrs.text;
	      var textArr = null;
	      var lineCount = 1;

	      if (common.isString(text) && text.indexOf('\n') !== -1) {
	        textArr = text.split('\n');
	        lineCount = textArr.length;
	      }

	      attrs.lineCount = lineCount;
	      attrs.textArr = textArr;
	    }

	    this.set('attrs', attrs);
	  };

	  _proto._getTextHeight = function _getTextHeight() {
	    var attrs = this._attrs.attrs;

	    if (attrs.height) {
	      return attrs.height;
	    }

	    var lineCount = attrs.lineCount;
	    var fontSize = attrs.fontSize * 1;

	    if (lineCount > 1) {
	      var spaceingY = this._getSpaceingY();

	      return fontSize * lineCount + spaceingY * (lineCount - 1);
	    }

	    return fontSize;
	  };

	  _proto._getSpaceingY = function _getSpaceingY() {
	    var attrs = this._attrs.attrs;
	    var lineHeight = attrs.lineHeight;
	    var fontSize = attrs.fontSize * 1;
	    return lineHeight ? lineHeight - fontSize : fontSize * 0.14;
	  };

	  _proto.drawInner = function drawInner(context) {
	    var self = this;
	    var attrs = self._attrs.attrs;
	    var text = attrs.text;
	    var x = attrs.x;
	    var y = attrs.y;

	    if (common.isNil(text) || isNaN(x) || isNaN(y)) {
	      // text will be 0
	      return;
	    }

	    var textArr = attrs.textArr;
	    var fontSize = attrs.fontSize * 1;

	    var spaceingY = self._getSpaceingY();

	    if (attrs.rotate) {
	      // do rotation
	      context.translate(x, y);
	      context.rotate(attrs.rotate);
	      x = 0;
	      y = 0;
	    }

	    var textBaseline = attrs.textBaseline;
	    var height;

	    if (textArr) {
	      height = self._getTextHeight();
	    }

	    var subY; // context.beginPath();

	    if (self.hasFill()) {
	      var fillOpacity = attrs.fillOpacity;

	      if (!common.isNil(fillOpacity) && fillOpacity !== 1) {
	        context.globalAlpha = fillOpacity;
	      }

	      if (textArr) {
	        for (var i = 0, len = textArr.length; i < len; i++) {
	          var subText = textArr[i];
	          subY = y + i * (spaceingY + fontSize) - height + fontSize; // bottom;

	          if (textBaseline === 'middle') {
	            subY += height - fontSize - (height - fontSize) / 2;
	          }

	          if (textBaseline === 'top') {
	            subY += height - fontSize;
	          }

	          context.fillText(subText, x, subY);
	        }
	      } else {
	        context.fillText(text, x, y);
	      }
	    }

	    if (self.hasStroke()) {
	      if (textArr) {
	        for (var _i = 0, _len = textArr.length; _i < _len; _i++) {
	          var _subText = textArr[_i];
	          subY = y + _i * (spaceingY + fontSize) - height + fontSize; // bottom;

	          if (textBaseline === 'middle') {
	            subY += height - fontSize - (height - fontSize) / 2;
	          }

	          if (textBaseline === 'top') {
	            subY += height - fontSize;
	          }

	          context.strokeText(_subText, x, subY);
	        }
	      } else {
	        context.strokeText(text, x, y);
	      }
	    }
	  };

	  _proto.calculateBox = function calculateBox() {
	    var self = this;
	    var attrs = self._attrs.attrs;
	    var x = attrs.x,
	        y = attrs.y,
	        textAlign = attrs.textAlign,
	        textBaseline = attrs.textBaseline;

	    var width = self._getTextWidth(); // attrs.width


	    if (!width) {
	      return {
	        minX: x,
	        minY: y,
	        maxX: x,
	        maxY: y
	      };
	    }

	    var height = self._getTextHeight(); // attrs.height


	    if (attrs.rotate) {
	      var rotatedBox = rect.calcRotatedBox({
	        width: width,
	        height: height,
	        rotate: attrs.rotate
	      });
	      width = rotatedBox.width;
	      height = rotatedBox.height;
	    }

	    var point = {
	      x: x,
	      y: y - height
	    }; // default textAlign: start, textBaseline: bottom

	    if (textAlign) {
	      if (textAlign === 'end' || textAlign === 'right') {
	        point.x -= width;
	      } else if (textAlign === 'center') {
	        point.x -= width / 2;
	      }
	    }

	    if (textBaseline) {
	      if (textBaseline === 'top') {
	        point.y += height;
	      } else if (textBaseline === 'middle') {
	        point.y += height / 2;
	      }
	    }

	    return {
	      minX: point.x,
	      minY: point.y,
	      maxX: point.x + width,
	      maxY: point.y + height
	    };
	  };

	  _proto._getTextWidth = function _getTextWidth() {
	    var attrs = this._attrs.attrs;

	    if (attrs.width) {
	      return attrs.width;
	    }

	    var text = attrs.text;
	    var context = this.get('context');
	    if (common.isNil(text)) return undefined;
	    var font = attrs.font;
	    var textArr = attrs.textArr;
	    var key = text + '' + font;

	    if (textWidthCache[key]) {
	      return textWidthCache[key];
	    }

	    var width = 0;

	    if (textArr) {
	      for (var i = 0, length = textArr.length; i < length; i++) {
	        var subText = textArr[i];
	        width = Math.max(width, common.measureText(subText, font, context).width);
	      }
	    } else {
	      width = common.measureText(text, font, context).width;
	    }

	    if (textWidthCacheCounter > TEXT_CACHE_MAX) {
	      textWidthCacheCounter = 0;
	      textWidthCache = {};
	    }

	    textWidthCacheCounter++;
	    textWidthCache[key] = width;
	    return width;
	  };

	  return Text;
	}(shape$2);

	shape$2.Text = Text;

	var _possibleConstructorReturn2$f = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$f = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$f = interopRequireDefault(inheritsLoose);



	var Custom = /*#__PURE__*/function (_Shape) {
	  (0, _inheritsLoose2$f["default"])(Custom, _Shape);

	  function Custom() {
	    return _Shape.apply(this, arguments) || this;
	  }

	  var _proto = Custom.prototype;

	  _proto._initProperties = function _initProperties() {
	    _Shape.prototype._initProperties.call(this);

	    this._attrs.canFill = true;
	    this._attrs.canStroke = true;
	    this._attrs.createPath = null;
	    this._attrs.type = 'custom';
	  };

	  _proto.createPath = function createPath(context) {
	    var createPath = this.get('createPath');
	    createPath && createPath.call(this, context);
	  };

	  _proto.calculateBox = function calculateBox() {
	    var calculateBox = this.get('calculateBox');
	    return calculateBox && calculateBox.call(this);
	  };

	  return Custom;
	}(shape$2);

	shape$2.Custom = Custom;

	var G = {
	  Canvas: canvas,
	  Group: group$1,
	  Shape: shape$2,
	  Matrix: matrix,
	  Vector2: vector2
	};



















	var graphic = G;

	var Shape$2 = graphic.Shape;

	function formatTicks(ticks) {
	  var tmp = ticks.slice(0);

	  if (tmp.length > 0) {
	    var first = tmp[0];
	    var last = tmp[tmp.length - 1];

	    if (first.value !== 0) {
	      tmp.unshift({
	        value: 0
	      });
	    }

	    if (last.value !== 1) {
	      tmp.push({
	        value: 1
	      });
	    }
	  }

	  return tmp;
	}

	var AxisController = /*#__PURE__*/function () {
	  function AxisController(cfg) {
	    this.axisCfg = {};
	    this.frontPlot = null;
	    this.backPlot = null;
	    this.axes = {}; // store the axes's options

	    common.mix(this, cfg);
	  }

	  var _proto = AxisController.prototype;

	  _proto._isHide = function _isHide(field) {
	    var axisCfg = this.axisCfg;
	    return !axisCfg || axisCfg[field] === false;
	  };

	  _proto._getLinePosition = function _getLinePosition(scale, dimType, index, transposed) {
	    var position = '';
	    var field = scale.field;
	    var axisCfg = this.axisCfg;

	    if (axisCfg[field] && axisCfg[field].position) {
	      position = axisCfg[field].position;
	    } else if (dimType === 'x') {
	      position = transposed ? 'left' : 'bottom';
	    } else if (dimType === 'y') {
	      position = index ? 'right' : 'left';

	      if (transposed) {
	        position = 'bottom';
	      }
	    }

	    return position;
	  };

	  _proto._getLineCfg = function _getLineCfg(coord, dimType, position) {
	    var start;
	    var end;
	    var factor = 1; // Mark clockwise or counterclockwise

	    if (dimType === 'x') {
	      start = {
	        x: 0,
	        y: 0
	      };
	      end = {
	        x: 1,
	        y: 0
	      };
	    } else {
	      if (position === 'right') {
	        // there will be several y axes
	        start = {
	          x: 1,
	          y: 0
	        };
	        end = {
	          x: 1,
	          y: 1
	        };
	      } else {
	        start = {
	          x: 0,
	          y: 0
	        };
	        end = {
	          x: 0,
	          y: 1
	        };
	        factor = -1;
	      }
	    }

	    if (coord.transposed) {
	      factor *= -1;
	    }

	    return {
	      offsetFactor: factor,
	      start: coord.convertPoint(start),
	      end: coord.convertPoint(end)
	    };
	  };

	  _proto._getCircleCfg = function _getCircleCfg(coord) {
	    return {
	      startAngle: coord.startAngle,
	      endAngle: coord.endAngle,
	      center: coord.center,
	      radius: coord.circleRadius
	    };
	  };

	  _proto._getRadiusCfg = function _getRadiusCfg(coord) {
	    var transposed = coord.transposed;
	    var start;
	    var end;

	    if (transposed) {
	      start = {
	        x: 0,
	        y: 0
	      };
	      end = {
	        x: 1,
	        y: 0
	      };
	    } else {
	      start = {
	        x: 0,
	        y: 0
	      };
	      end = {
	        x: 0,
	        y: 1
	      };
	    }

	    return {
	      offsetFactor: -1,
	      start: coord.convertPoint(start),
	      end: coord.convertPoint(end)
	    };
	  };

	  _proto._getAxisCfg = function _getAxisCfg(coord, scale, verticalScale, dimType, defaultCfg) {
	    var self = this;
	    var axisCfg = this.axisCfg;
	    var ticks = scale.getTicks();
	    var cfg = common.deepMix({
	      ticks: ticks,
	      frontContainer: this.frontPlot,
	      backContainer: this.backPlot
	    }, defaultCfg, axisCfg[scale.field]);
	    var labels = [];
	    var label = cfg.label;
	    var count = ticks.length;
	    var maxWidth = 0;
	    var maxHeight = 0;
	    var labelCfg = label;
	    common.each(ticks, function (tick, index) {
	      if (common.isFunction(label)) {
	        var executedLabel = label(tick.text, index, count);
	        labelCfg = executedLabel ? common.mix({}, global._defaultAxis.label, executedLabel) : null;
	      }

	      if (labelCfg) {
	        var textStyle = {};

	        if (labelCfg.textAlign) {
	          textStyle.textAlign = labelCfg.textAlign;
	        }

	        if (labelCfg.textBaseline) {
	          textStyle.textBaseline = labelCfg.textBaseline;
	        }

	        var axisLabel = new Shape$2.Text({
	          className: 'axis-label',
	          attrs: common.mix({
	            x: 0,
	            y: 0,
	            text: tick.text,
	            fontFamily: self.chart.get('canvas').get('fontFamily')
	          }, labelCfg),
	          value: tick.value,
	          textStyle: textStyle,
	          top: labelCfg.top,
	          context: self.chart.get('canvas').get('context')
	        });
	        labels.push(axisLabel);

	        var _axisLabel$getBBox = axisLabel.getBBox(),
	            width = _axisLabel$getBBox.width,
	            height = _axisLabel$getBBox.height;

	        maxWidth = Math.max(maxWidth, width);
	        maxHeight = Math.max(maxHeight, height);
	      }
	    });
	    cfg.labels = labels;
	    cfg.maxWidth = maxWidth;
	    cfg.maxHeight = maxHeight;
	    return cfg;
	  };

	  _proto._createAxis = function _createAxis(coord, scale, verticalScale, dimType, index) {
	    if (index === void 0) {
	      index = '';
	    }

	    var self = this;
	    var coordType = coord.type;
	    var transposed = coord.transposed;
	    var type;
	    var key;
	    var defaultCfg;

	    if (coordType === 'cartesian' || coordType === 'rect') {
	      var position = self._getLinePosition(scale, dimType, index, transposed);

	      defaultCfg = global.axis[position];
	      defaultCfg.position = position;
	      type = 'Line';
	      key = position;
	    } else {
	      if (dimType === 'x' && !transposed || dimType === 'y' && transposed) {
	        defaultCfg = global.axis.circle;
	        type = 'Circle';
	        key = 'circle';
	      } else {
	        defaultCfg = global.axis.radius;
	        type = 'Line';
	        key = 'radius';
	      }
	    }

	    var cfg = self._getAxisCfg(coord, scale, verticalScale, dimType, defaultCfg);

	    cfg.type = type;
	    cfg.dimType = dimType;
	    cfg.verticalScale = verticalScale;
	    cfg.index = index;
	    this.axes[key] = cfg;
	  };

	  _proto.createAxis = function createAxis(coord, xScale, yScales) {
	    var self = this;

	    if (xScale && !self._isHide(xScale.field)) {
	      self._createAxis(coord, xScale, yScales[0], 'x');
	    }

	    common.each(yScales, function (yScale, index) {
	      if (!self._isHide(yScale.field)) {
	        self._createAxis(coord, yScale, xScale, 'y', index);
	      }
	    });
	    var axes = this.axes;
	    var chart = self.chart;

	    if (chart._isAutoPadding()) {
	      var userPadding = common.parsePadding(chart.get('padding'));
	      var appendPadding = common.parsePadding(chart.get('appendPadding'));
	      var legendRange = chart.get('legendRange') || {
	        top: 0,
	        right: 0,
	        bottom: 0,
	        left: 0
	      };
	      var padding = [userPadding[0] === 'auto' ? legendRange.top + appendPadding[0] * 2 : userPadding[0], userPadding[1] === 'auto' ? legendRange.right + appendPadding[1] : userPadding[1], userPadding[2] === 'auto' ? legendRange.bottom + appendPadding[2] : userPadding[2], userPadding[3] === 'auto' ? legendRange.left + appendPadding[3] : userPadding[3]];

	      if (coord.isPolar) {
	        var circleAxis = axes.circle;

	        if (circleAxis) {
	          var maxHeight = circleAxis.maxHeight,
	              maxWidth = circleAxis.maxWidth,
	              labelOffset = circleAxis.labelOffset;
	          padding[0] += maxHeight + labelOffset;
	          padding[1] += maxWidth + labelOffset;
	          padding[2] += maxHeight + labelOffset;
	          padding[3] += maxWidth + labelOffset;
	        }
	      } else {
	        if (axes.right && userPadding[1] === 'auto') {
	          var _axes$right = axes.right,
	              _maxWidth = _axes$right.maxWidth,
	              _labelOffset = _axes$right.labelOffset;
	          padding[1] += _maxWidth + _labelOffset;
	        }

	        if (axes.left && userPadding[3] === 'auto') {
	          var _axes$left = axes.left,
	              _maxWidth2 = _axes$left.maxWidth,
	              _labelOffset2 = _axes$left.labelOffset;
	          padding[3] += _maxWidth2 + _labelOffset2;
	        }

	        if (axes.bottom && userPadding[2] === 'auto') {
	          var _axes$bottom = axes.bottom,
	              _maxHeight = _axes$bottom.maxHeight,
	              _labelOffset3 = _axes$bottom.labelOffset;
	          padding[2] += _maxHeight + _labelOffset3;
	        }
	      }

	      chart.set('_padding', padding);

	      chart._updateLayout(padding);
	    }

	    common.each(axes, function (axis$1) {
	      var type = axis$1.type,
	          grid = axis$1.grid,
	          verticalScale = axis$1.verticalScale,
	          ticks = axis$1.ticks,
	          dimType = axis$1.dimType,
	          position = axis$1.position,
	          index = axis$1.index;
	      var appendCfg;

	      if (coord.isPolar) {
	        if (type === 'Line') {
	          appendCfg = self._getRadiusCfg(coord);
	        } else if (type === 'Circle') {
	          appendCfg = self._getCircleCfg(coord);
	        }
	      } else {
	        appendCfg = self._getLineCfg(coord, dimType, position);
	      }

	      if (grid && verticalScale) {
	        var gridPoints = [];
	        var verticalTicks = formatTicks(verticalScale.getTicks());
	        common.each(ticks, function (tick) {
	          var subPoints = [];
	          common.each(verticalTicks, function (verticalTick) {
	            var x = dimType === 'x' ? tick.value : verticalTick.value;
	            var y = dimType === 'x' ? verticalTick.value : tick.value;

	            if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
	              var point = coord.convertPoint({
	                x: x,
	                y: y
	              });
	              subPoints.push(point);
	            }
	          });
	          gridPoints.push({
	            points: subPoints,
	            _id: 'axis-' + dimType + index + '-grid-' + tick.tickValue
	          });
	        });
	        axis$1.gridPoints = gridPoints;

	        if (coord.isPolar) {
	          axis$1.center = coord.center;
	          axis$1.startAngle = coord.startAngle;
	          axis$1.endAngle = coord.endAngle;
	        }
	      }

	      appendCfg._id = 'axis-' + dimType;

	      if (!common.isNil(index)) {
	        appendCfg._id = 'axis-' + dimType + index;
	      }

	      new axis[type](common.mix(axis$1, appendCfg));
	    });
	  };

	  _proto.clear = function clear() {
	    this.axes = {};
	    this.frontPlot.clear();
	    this.backPlot.clear();
	  };

	  return AxisController;
	}();

	var axis$1 = AxisController;

	var helper = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports.getClip = getClip;
	exports.isPointInPlot = isPointInPlot;

	var Shape = graphic.Shape;

	function getClip(coord) {
	  var start = coord.start;
	  var end = coord.end;
	  var width = end.x - start.x;
	  var height = Math.abs(end.y - start.y);
	  var margin = 10;
	  var clip;

	  if (coord.isPolar) {
	    var circleRadius = coord.circleRadius,
	        center = coord.center,
	        startAngle = coord.startAngle,
	        endAngle = coord.endAngle;
	    clip = new Shape.Sector({
	      attrs: {
	        x: center.x,
	        y: center.y,
	        r: circleRadius,
	        r0: 0,
	        startAngle: startAngle,
	        endAngle: endAngle
	      }
	    });
	  } else {
	    clip = new Shape.Rect({
	      attrs: {
	        x: start.x,
	        y: end.y - margin,
	        width: width,
	        height: height + 2 * margin
	      }
	    });
	  }

	  clip.isClip = true;
	  return clip;
	}

	function isPointInPlot(point, plot) {
	  var x = point.x,
	      y = point.y;
	  var tl = plot.tl,
	      tr = plot.tr,
	      br = plot.br;
	  return x >= tl.x && x <= tr.x && y >= tl.y && y <= br.y;
	}
	});

	unwrapExports(helper);
	var helper_1 = helper.getClip;
	var helper_2 = helper.isPointInPlot;

	var _assertThisInitialized2 = interopRequireDefault(assertThisInitialized);

	var _possibleConstructorReturn2$g = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$g = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$g = interopRequireDefault(inheritsLoose);

















	var Canvas$1 = graphic.Canvas;



	function compare(a, b) {
	  return a - b;
	}

	function _isScaleExist(scales, compareScale) {
	  var flag = false;
	  common.each(scales, function (scale) {
	    var scaleValues = [].concat(scale.values);
	    var compareScaleValues = [].concat(compareScale.values);

	    if (scale.type === compareScale.type && scale.field === compareScale.field && scaleValues.sort(compare).toString() === compareScaleValues.sort(compare).toString()) {
	      flag = true;
	      return;
	    }
	  });
	  return flag;
	}

	var Chart = /*#__PURE__*/function (_Base) {
	  (0, _inheritsLoose2$g["default"])(Chart, _Base);

	  Chart.initPlugins = function initPlugins() {
	    return {
	      _plugins: [],
	      _cacheId: 0,
	      register: function register(plugins) {
	        var p = this._plugins;
	        [].concat(plugins).forEach(function (plugin) {
	          if (p.indexOf(plugin) === -1) {
	            p.push(plugin);
	          }
	        });
	        this._cacheId++;
	      },
	      unregister: function unregister(plugins) {
	        var p = this._plugins;
	        [].concat(plugins).forEach(function (plugin) {
	          var idx = p.indexOf(plugin);

	          if (idx !== -1) {
	            p.splice(idx, 1);
	          }
	        });
	        this._cacheId++;
	      },
	      clear: function clear() {
	        this._plugins = [];
	        this._cacheId++;
	      },
	      count: function count() {
	        return this._plugins.length;
	      },
	      getAll: function getAll() {
	        return this._plugins;
	      },
	      notify: function notify(chart, hook, args) {
	        var descriptors = this.descriptors(chart);
	        var ilen = descriptors.length;
	        var i;
	        var descriptor;
	        var plugin;
	        var params;
	        var method;

	        for (i = 0; i < ilen; ++i) {
	          descriptor = descriptors[i];
	          plugin = descriptor.plugin;
	          method = plugin[hook];

	          if (typeof method === 'function') {
	            params = [chart].concat(args || []);

	            if (method.apply(plugin, params) === false) {
	              return false;
	            }
	          }
	        }

	        return true;
	      },
	      descriptors: function descriptors(chart) {
	        var cache = chart._plugins || (chart._plugins = {});

	        if (cache.id === this._cacheId) {
	          return cache.descriptors;
	        }

	        var plugins = [];
	        var descriptors = [];

	        this._plugins.concat(chart && chart.get('plugins') || []).forEach(function (plugin) {
	          var idx = plugins.indexOf(plugin);

	          if (idx !== -1) {
	            return;
	          }

	          plugins.push(plugin);
	          descriptors.push({
	            plugin: plugin
	          });
	        });

	        cache.descriptors = descriptors;
	        cache.id = this._cacheId;
	        return descriptors;
	      }
	    };
	  };

	  var _proto = Chart.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    return {
	      /**
	       * the id of canvas
	       * @type {String}
	       */
	      id: null,
	      rendered: false,

	      /**
	       * padding
	       * @type {Array|Number}
	       */
	      padding: global.padding,

	      /**
	       * data
	       * @type {Array}
	       */
	      data: null,

	      /**
	       * scales of chart
	       * @type {Object}
	       */
	      scales: {},

	      /**
	       * @private
	       * geometry instances
	       * @type {Array}
	       */
	      geoms: [],

	      /**
	       * scale configuration
	       * @type {Object}
	       */
	      colDefs: null,
	      pixelRatio: global.pixelRatio,

	      /**
	       * filter options
	       * @type {Object}
	       */
	      filters: null,
	      appendPadding: global.appendPadding
	    };
	  };

	  _proto._syncYScales = function _syncYScales() {
	    var syncY = this.get('syncY');

	    if (!syncY) {
	      return;
	    }

	    var geoms = this.get('geoms');
	    var syncScales = [];
	    var min = [];
	    var max = [];
	    common.each(geoms, function (geom) {
	      var yScale = geom.getYScale();

	      if (yScale.isLinear) {
	        syncScales.push(yScale);
	        min.push(yScale.min);
	        max.push(yScale.max);
	      }
	    });
	    min = Math.min.apply(null, min);
	    max = Math.max.apply(null, max);
	    common.each(syncScales, function (scale) {
	      scale.change({
	        min: min
	      });
	      scale.change({
	        max: max
	      });
	    });
	  };

	  _proto._getFieldsForLegend = function _getFieldsForLegend() {
	    var fields = [];
	    var geoms = this.get('geoms');
	    common.each(geoms, function (geom) {
	      var attrOptions = geom.get('attrOptions');
	      var attrCfg = attrOptions.color;

	      if (attrCfg && attrCfg.field && common.isString(attrCfg.field)) {
	        var arr = attrCfg.field.split('*');
	        common.each(arr, function (item) {
	          if (fields.indexOf(item) === -1) {
	            fields.push(item);
	          }
	        });
	      }
	    });
	    return fields;
	  };

	  _proto._getScaleData = function _getScaleData(field) {
	    var data = this.get('data');
	    var filteredData = this.get('filteredData');

	    if (filteredData.length) {
	      var legendFields = this._getFieldsForLegend();

	      if (legendFields.indexOf(field) === -1) {
	        data = filteredData;
	      }
	    }

	    return data;
	  } // _updateScales() {
	  //   const scaleController = this.get('scaleController');
	  //   scaleController.updateScales();
	  //   this._adjustScale();
	  // }
	  ;

	  _proto._adjustScale = function _adjustScale() {
	    var self = this;
	    var scaleController = self.get('scaleController'); // 看起来是为了让柱状图最小或最大都默认从0开始

	    var geoms = this.get('geoms');

	    for (var i = 0; i < geoms.length; i++) {
	      var geom = geoms[i];

	      if (geom.get('type') === 'interval') {
	        var yScale = geom.getYScale();
	        scaleController.adjustStartZero(yScale);
	      }
	    }
	  };

	  _proto._removeGeoms = function _removeGeoms() {
	    var geoms = this.get('geoms');

	    while (geoms.length > 0) {
	      var geom = geoms.shift();
	      geom.destroy();
	    }
	  };

	  _proto._clearGeoms = function _clearGeoms() {
	    var geoms = this.get('geoms');

	    for (var i = 0, length = geoms.length; i < length; i++) {
	      var geom = geoms[i];
	      geom.clear();
	    }
	  };

	  _proto._clearInner = function _clearInner() {
	    this._clearGeoms();

	    Chart.plugins.notify(this, 'clearInner');
	    this.get('axisController') && this.get('axisController').clear();
	  };

	  _proto._initFilteredData = function _initFilteredData() {
	    var filters = this.get('filters');
	    var data = this.get('data') || [];

	    if (filters) {
	      data = data.filter(function (obj) {
	        var rst = true;
	        common.each(filters, function (fn, k) {
	          if (fn) {
	            rst = fn(obj[k], obj);

	            if (!rst) {
	              return false;
	            }
	          }
	        });
	        return rst;
	      });
	    }

	    this.set('filteredData', data);
	  };

	  _proto._changeGeomsData = function _changeGeomsData() {
	    var geoms = this.get('geoms');
	    var data = this.get('filteredData');

	    for (var i = 0, length = geoms.length; i < length; i++) {
	      var geom = geoms[i];
	      geom.changeData(data);
	    }
	  };

	  _proto._initGeom = function _initGeom(geom) {
	    var coord = this.get('coord');
	    var data = this.get('filteredData');
	    var colDefs = this.get('colDefs');
	    var middlePlot = this.get('middlePlot');
	    geom.set('chart', this);
	    geom.set('container', middlePlot.addGroup());
	    geom.set('data', data);
	    geom.set('coord', coord);
	    geom.set('colDefs', colDefs);
	    geom.init();
	    this.emit(_const.EVENT_AFTER_GEOM_INIT, geom);
	  };

	  _proto._initGeoms = function _initGeoms() {
	    var geoms = this.get('geoms');

	    for (var i = 0, length = geoms.length; i < length; i++) {
	      this._initGeom(geoms[i]);
	    }
	  };

	  _proto._initCoord = function _initCoord() {
	    var plot = this.get('plotRange');
	    var coordCfg = common.mix({
	      type: 'cartesian'
	    }, this.get('coordCfg'), {
	      plot: plot
	    });
	    var type = coordCfg.type;
	    var C = coord[common.upperFirst(type)];
	    var coord$1 = new C(coordCfg);
	    this.set('coord', coord$1);
	  };

	  _proto._initLayout = function _initLayout() {
	    var padding = this.get('_padding');

	    if (!padding) {
	      padding = this.get('margin') || this.get('padding');
	      padding = common.parsePadding(padding);
	    }

	    var top = padding[0] === 'auto' ? 0 : padding[0];
	    var right = padding[1] === 'auto' ? 0 : padding[1];
	    var bottom = padding[2] === 'auto' ? 0 : padding[2];
	    var left = padding[3] === 'auto' ? 0 : padding[3];
	    var width = this.get('width');
	    var height = this.get('height');
	    var start = {
	      x: left,
	      y: top
	    };
	    var end = {
	      x: width - right,
	      y: height - bottom
	    };
	    var plot$1 = this.get('plot');

	    if (plot$1) {
	      plot$1.reset(start, end);
	      return;
	    }

	    var newPlot = new plot({
	      start: start,
	      end: end
	    });
	    this.set('plotRange', newPlot);
	    this.set('plot', newPlot);
	  };

	  _proto._initCanvas = function _initCanvas() {
	    var self = this;

	    try {
	      var canvas = new Canvas$1({
	        el: self.get('el') || self.get('id'),
	        context: self.get('context'),
	        pixelRatio: self.get('pixelRatio'),
	        width: self.get('width'),
	        height: self.get('height'),
	        fontFamily: global.fontFamily
	      });
	      self.set('canvas', canvas);
	      self.set('el', canvas.get('el'));
	      self.set('width', canvas.get('width'));
	      self.set('height', canvas.get('height'));
	    } catch (error) {
	      throw error;
	    }

	    Chart.plugins.notify(self, 'afterCanvasInit');
	  };

	  _proto._initLayers = function _initLayers() {
	    var canvas = this.get('canvas');
	    this.set('backPlot', canvas.addGroup());
	    this.set('middlePlot', canvas.addGroup({
	      zIndex: 10
	    }));
	    this.set('frontPlot', canvas.addGroup({
	      zIndex: 20
	    }));
	  };

	  _proto._initEvents = function _initEvents() {
	    var _this2 = this;

	    // 数据更新后的一些更新
	    this.on(_const.EVENT_AFTER_DATA_CHANGE, function () {
	      // 数据更新后，重新设置filterdata
	      _this2._initFilteredData(); // 更新geoms里的数据


	      _this2._changeGeomsData();

	      _this2._adjustScale();
	    }); // 大小变化后的一些更新

	    this.on(_const.EVENT_AFTER_SIZE_CHANGE, function () {
	      _this2._initLayout(); // layout变化后，坐标轴也需要做相应的变化


	      var coord = _this2.get('coord');

	      if (coord) {
	        coord.reset(_this2.get('plot'));
	      }
	    });
	  };

	  _proto._initScaleController = function _initScaleController() {
	    var scaleController = new scale$1({
	      chart: this
	    }); // 让colDefs 和 scaleController.defs 用同一个对象，这样就不用考虑同步的问题

	    this.set('colDefs', scaleController.defs); // 已经实例化的scales 也保持统一个对象

	    this.set('scales', scaleController.scales);
	    this.set('scaleController', scaleController);
	  };

	  _proto._clearScaleController = function _clearScaleController() {
	    var scaleController = this.get('scaleController');
	    scaleController.clear();
	  };

	  _proto._init = function _init() {
	    var self = this;

	    self._initCanvas();

	    self._initLayout();

	    self._initLayers();

	    self._initEvents();

	    self._initScaleController();

	    self.set('axisController', new axis$1({
	      frontPlot: self.get('frontPlot').addGroup({
	        className: 'axisContainer'
	      }),
	      backPlot: self.get('backPlot').addGroup({
	        className: 'axisContainer'
	      }),
	      chart: self
	    }));
	    Chart.plugins.notify(self, 'init');
	  };

	  function Chart(cfg) {
	    var _this;

	    _this = _Base.call(this, cfg) || this;
	    var self = (0, _assertThisInitialized2["default"])(_this);
	    common.each(base$4, function (geomConstructor, className) {
	      var methodName = common.lowerFirst(className);

	      self[methodName] = function (cfg) {
	        var geom = new geomConstructor(cfg);
	        self.addGeom(geom);
	        return geom;
	      };
	    });

	    self._init();

	    return _this;
	  }

	  _proto.init = function init() {
	    // 初始filterData
	    this._initFilteredData(); // initialization coordinate instance


	    this._initCoord();

	    Chart.plugins.notify(this, 'beforeGeomInit'); // init all geometry instances

	    this._initGeoms(); // 多 Y 轴的情况时，统一 Y 轴的数值范围。


	    this._syncYScales(); // do some adjust for data


	    this._adjustScale();

	    this.emit(_const.EVENT_AFTER_INIT);
	  }
	  /**
	   * set data and some scale configuration
	   * @chainable
	   * @param  {Array} data the dataset to visualize
	   * @param  {Object} colDefs the configuration for scales
	   * @return {Chart} return the chart instance
	   */
	  ;

	  _proto.source = function source(data, colDefs) {
	    this.set('data', data);

	    if (colDefs) {
	      this.scale(colDefs);
	    }

	    return this;
	  };

	  _proto.scale = function scale(field, cfg) {
	    var scaleController = this.get('scaleController');
	    scaleController.setFieldDef(field, cfg);
	    return this;
	  }
	  /**
	   * configure the axis
	   * @chainable
	   * @param  {String|Boolean} field the field name of data
	   * @param  {Object} cfg configuration for axis
	   * @return {Chart} return the chart instance
	   */
	  ;

	  _proto.axis = function axis(field, cfg) {
	    var axisController = this.get('axisController');

	    if (!field) {
	      axisController.axisCfg = null;
	    } else {
	      axisController.axisCfg = axisController.axisCfg || {};
	      axisController.axisCfg[field] = cfg;
	    }

	    return this;
	  }
	  /**
	   * configure the coordinate
	   * @chainable
	   * @param  {String} type set the type of coodinate
	   * @param  {Object} cfg configuration for coordinate
	   * @return {Chart} return the chart instance
	   */
	  ;

	  _proto.coord = function coord(type, cfg) {
	    var coordCfg;

	    if (common.isObject(type)) {
	      coordCfg = type;
	    } else {
	      coordCfg = cfg || {};
	      coordCfg.type = type || 'cartesian';
	    }

	    this.set('coordCfg', coordCfg);
	    return this;
	  };

	  _proto.filter = function filter(field, condition) {
	    var filters = this.get('filters') || {};
	    filters[field] = condition;
	    this.set('filters', filters); // 如果已经render过，则再重新触发一次change

	    if (this.get('rendered')) {
	      this.emit(_const.EVENT_AFTER_DATA_CHANGE, this.get('data'));
	    }
	  }
	  /**
	   * render the chart
	   * @chainable
	   * @return {Chart} return the chart instance
	   */
	  ;

	  _proto.render = function render() {
	    var rendered = this.get('rendered');
	    var canvas = this.get('canvas');
	    var geoms = this.get('geoms');

	    if (!rendered) {
	      this.init();
	      this.set('rendered', true);
	    }

	    this.emit(_const.EVENT_BEFORE_RENDER);
	    Chart.plugins.notify(this, 'beforeGeomDraw');

	    this._renderAxis();

	    var middlePlot = this.get('middlePlot');

	    if (this.get('limitInPlot') && !middlePlot.attr('clip')) {
	      var coord = this.get('coord');
	      var clip = helper.getClip(coord);
	      clip.set('canvas', middlePlot.get('canvas'));
	      middlePlot.attr('clip', clip);
	    }

	    for (var i = 0, length = geoms.length; i < length; i++) {
	      var geom = geoms[i];
	      geom.paint();
	    }

	    Chart.plugins.notify(this, 'afterGeomDraw');
	    canvas.sort();
	    this.get('frontPlot').sort();
	    Chart.plugins.notify(this, 'beforeCanvasDraw');
	    canvas.draw();
	    this.emit(_const.EVENT_AFTER_RENDER);
	    return this;
	  }
	  /**
	   * clear the chart, include geometris and all the shapes
	   * @chainable
	   * @return {Chart} return the chart
	   */
	  ;

	  _proto.clear = function clear() {
	    Chart.plugins.notify(this, 'clear');

	    this._clearInner();

	    this._removeGeoms();

	    this._clearScaleController();

	    this.set('legendItems', null);
	    this.set('filters', null);
	    this.set('isUpdate', false);
	    this.set('_padding', null);
	    this.set('rendered', false);
	    var canvas = this.get('canvas');
	    canvas.draw();
	    return this;
	  };

	  _proto.repaint = function repaint() {
	    // 如果在没有render之前就repaint的，就直接return退出
	    var rendered = this.get('rendered');

	    if (!rendered) {
	      return;
	    }

	    this.set('isUpdate', true);
	    this.set('legendItems', null);
	    Chart.plugins.notify(this, 'repaint');

	    this._clearInner();

	    this.render();
	  };

	  _proto.changeData = function changeData(data) {
	    this.emit(_const.EVENT_BEFORE_DATA_CHANGE, data);
	    this.set('data', data);
	    Chart.plugins.notify(this, 'changeData');
	    this.emit(_const.EVENT_AFTER_DATA_CHANGE, data);
	    this.set('_padding', null);
	    this.repaint();
	  };

	  _proto.changeSize = function changeSize(width, height) {
	    if (width) {
	      this.set('width', width);
	    } else {
	      width = this.get('width');
	    }

	    if (height) {
	      this.set('height', height);
	    } else {
	      height = this.get('height');
	    }

	    var canvas = this.get('canvas');
	    canvas.changeSize(width, height);
	    this.emit(_const.EVENT_AFTER_SIZE_CHANGE, {
	      width: width,
	      height: height
	    });
	    this.repaint();
	    return this;
	  };

	  _proto.destroy = function destroy() {
	    this.clear();
	    var canvas = this.get('canvas');
	    canvas.destroy();
	    Chart.plugins.notify(this, 'afterCanvasDestroyed');

	    if (this._interactions) {
	      common.each(this._interactions, function (interaction) {
	        interaction.destroy();
	      });
	    }

	    _Base.prototype.destroy.call(this);
	  }
	  /**
	   * calculate dataset's position on canvas
	   * @param  {Object} record the dataset
	   * @return {Object} return the position
	   */
	  ;

	  _proto.getPosition = function getPosition(record) {
	    var self = this;
	    var coord = self.get('coord');
	    var xScale = self.getXScale();
	    var yScale = self.getYScales()[0];
	    var xField = xScale.field;
	    var x = xScale.scale(record[xField]);
	    var yField = yScale.field;
	    var y = yScale.scale(record[yField]);
	    return coord.convertPoint({
	      x: x,
	      y: y
	    });
	  }
	  /**
	   * get the data item of the point
	   * @param  {Object} point canvas position
	   * @return {Object} return the data item
	   */
	  ;

	  _proto.getRecord = function getRecord(point) {
	    var self = this;
	    var coord = self.get('coord');
	    var xScale = self.getXScale();
	    var yScale = self.getYScales()[0];
	    var invertPoint = coord.invertPoint(point);
	    var record = {};
	    record[xScale.field] = xScale.invert(invertPoint.x);
	    record[yScale.field] = yScale.invert(invertPoint.y);
	    return record;
	  }
	  /**
	   * get the dataset of the point
	   * @param  {Object} point canvas position
	   * @return {Array} return the dataset
	  **/
	  ;

	  _proto.getSnapRecords = function getSnapRecords(point) {
	    var geom = this.get('geoms')[0];
	    var data = [];

	    if (geom) {
	      // need to judge
	      data = geom.getSnapRecords(point);
	    }

	    return data;
	  }
	  /**
	   * creat scale instances
	   * @param  {String} field field name of data
	   * @return {Scale} return the scale
	   */
	  ;

	  _proto.createScale = function createScale(field) {
	    var data = this._getScaleData(field);

	    var scaleController = this.get('scaleController');
	    return scaleController.createScale(field, data);
	  }
	  /**
	   * @protected
	   * add geometry instance to geoms
	   * @param {Geom} geom geometry instance
	   */
	  ;

	  _proto.addGeom = function addGeom(geom) {
	    var rendered = this.get('rendered');
	    var geoms = this.get('geoms');
	    geoms.push(geom); // 如果图表已经渲染过了，则直接初始化geom

	    if (rendered) {
	      this._initGeom(geom);
	    }
	  }
	  /**
	   * get the scale of x axis
	   * @return {Scale} return the scale
	   */
	  ;

	  _proto.getXScale = function getXScale() {
	    var self = this;
	    var geoms = self.get('geoms');
	    var xScale = geoms[0].getXScale();
	    return xScale;
	  }
	  /**
	   * get the scale of y axis
	   * @return {Array} return the scale
	   */
	  ;

	  _proto.getYScales = function getYScales() {
	    var geoms = this.get('geoms');
	    var rst = [];
	    common.each(geoms, function (geom) {
	      var yScale = geom.getYScale();

	      if (rst.indexOf(yScale) === -1) {
	        rst.push(yScale);
	      }
	    });
	    return rst;
	  };

	  _proto.getLegendItems = function getLegendItems() {
	    if (this.get('legendItems')) {
	      return this.get('legendItems');
	    }

	    var legendItems = {};
	    var scales = [];
	    var geoms = this.get('geoms');
	    common.each(geoms, function (geom) {
	      var colorAttr = geom.getAttr('color');

	      if (colorAttr) {
	        var scale = colorAttr.getScale('color'); // 只支持分类图例

	        if (scale.isCategory && !_isScaleExist(scales, scale)) {
	          scales.push(scale);
	          var field = scale.field;
	          var ticks = scale.getTicks();
	          var items = [];
	          common.each(ticks, function (tick) {
	            var text = tick.text;
	            var name = text;
	            var scaleValue = tick.value;
	            var value = scale.invert(scaleValue);
	            var color = colorAttr.mapping(value).join('') || global.defaultColor;
	            var marker = {
	              fill: color,
	              radius: 3,
	              symbol: 'circle',
	              stroke: '#fff'
	            };
	            items.push({
	              name: name,
	              // for display
	              dataValue: value,
	              // the origin value
	              checked: true,
	              marker: marker
	            });
	          });
	          legendItems[field] = items;
	        }
	      }
	    });
	    this.set('legendItems', legendItems);
	    return legendItems;
	  } // register the plugins
	  ;

	  _proto.registerPlugins = function registerPlugins(plugins) {
	    var self = this;
	    var chartPlugins = self.get('plugins') || [];

	    if (!common.isArray(chartPlugins)) {
	      chartPlugins = [chartPlugins];
	    }

	    [].concat(plugins).forEach(function (plugin) {
	      if (chartPlugins.indexOf(plugin) === -1) {
	        plugin.init && plugin.init(self); // init

	        chartPlugins.push(plugin);
	      }
	    });
	    Chart.plugins._cacheId++;
	    self.set('plugins', chartPlugins);
	  };

	  _proto._renderAxis = function _renderAxis() {
	    var axisController = this.get('axisController');
	    var xScale = this.getXScale();
	    var yScales = this.getYScales();
	    var coord = this.get('coord');
	    Chart.plugins.notify(this, 'beforeRenderAxis');
	    axisController.createAxis(coord, xScale, yScales);
	  };

	  _proto._isAutoPadding = function _isAutoPadding() {
	    if (this.get('_padding')) {
	      return false;
	    }

	    var padding = this.get('padding');

	    if (common.isArray(padding)) {
	      return padding.indexOf('auto') !== -1;
	    }

	    return padding === 'auto';
	  };

	  _proto._updateLayout = function _updateLayout(padding) {
	    var width = this.get('width');
	    var height = this.get('height');
	    var start = {
	      x: padding[3],
	      y: padding[0]
	    };
	    var end = {
	      x: width - padding[1],
	      y: height - padding[2]
	    };
	    var plot = this.get('plot');
	    var coord = this.get('coord');
	    plot.reset(start, end);
	    coord.reset(plot);
	  };

	  return Chart;
	}(base);

	Chart.plugins = Chart.initPlugins();
	var chart = Chart;

	var Core = {};



	Core.Global = global;
	Core.version = global.version;
	Core.Chart = chart;
	Core.Shape = shape$1;
	Core.G = graphic;
	Core.Util = common;
	Core.Helper = helper; // Core.track = function(enable) {
	//   Global.trackable = enable;
	// };
	// require('./track');
	// 2018-12-27 关闭打点

	Core.track = function () {
	  return null;
	};

	var core = Core;

	var requestAnimationFrame$3 = requestAnimationFrame$1.requestAnimationFrame;

	var clock = typeof performance === 'object' && performance.now ? performance : Date;

	var Timeline = /*#__PURE__*/function () {
	  function Timeline() {
	    this.anims = [];
	    this.time = null;
	    this.playing = false;
	    this.canvas = [];
	  }

	  var _proto = Timeline.prototype;

	  _proto.play = function play() {
	    var self = this;
	    self.time = clock.now();
	    self.playing = true;

	    function step() {
	      if (self.playing) {
	        requestAnimationFrame$3(step);
	        self.update();
	      }
	    }

	    requestAnimationFrame$3(step);
	  };

	  _proto.stop = function stop() {
	    this.playing = false;
	    this.time = null;
	    this.canvas = [];
	  };

	  _proto.update = function update() {
	    var currentTime = clock.now();
	    this.canvas = [];

	    for (var i = 0; i < this.anims.length; i++) {
	      var propertyAnim = this.anims[i];

	      if (currentTime < propertyAnim.startTime || propertyAnim.hasEnded) {
	        continue;
	      }

	      var shape = propertyAnim.shape; // shape

	      if (shape.get('destroyed')) {
	        this.anims.splice(i, 1);
	        i--;
	        continue;
	      }

	      var startState = propertyAnim.startState,
	          endState = propertyAnim.endState,
	          interpolate = propertyAnim.interpolate,
	          duration = propertyAnim.duration;

	      if (currentTime >= propertyAnim.startTime && !propertyAnim.hasStarted) {
	        propertyAnim.hasStarted = true;

	        if (propertyAnim.onStart) {
	          propertyAnim.onStart();
	        }
	      }

	      var t = (currentTime - propertyAnim.startTime) / duration;
	      t = Math.max(0, Math.min(t, 1));
	      t = propertyAnim.easing(t);

	      if (propertyAnim.onFrame) {
	        propertyAnim.onFrame(t);
	      } else {
	        for (var key in interpolate) {
	          var diff = interpolate[key];
	          var value = diff(t);
	          var newValue = void 0;

	          if (key === 'points') {
	            newValue = [];
	            var aLen = Math.max(startState.points.length, endState.points.length);

	            for (var j = 0; j < aLen; j += 2) {
	              newValue.push({
	                x: value[j],
	                y: value[j + 1]
	              });
	            }
	          } else {
	            newValue = value;
	          }

	          shape._attrs.attrs[key] = newValue;
	          shape._attrs.bbox = null; // should clear calculated bbox
	        }
	      }

	      var canvas = shape.get('canvas');

	      if (this.canvas.indexOf(canvas) === -1) {
	        this.canvas.push(canvas);
	      }

	      if (propertyAnim.onUpdate) {
	        propertyAnim.onUpdate(t);
	      }

	      if (currentTime >= propertyAnim.endTime && !propertyAnim.hasEnded) {
	        propertyAnim.hasEnded = true;

	        if (propertyAnim.onEnd) {
	          propertyAnim.onEnd();
	        }
	      }

	      if (t === 1) {
	        // end
	        this.anims.splice(i, 1);
	        i--;
	      }
	    }

	    this.canvas.map(function (c) {
	      c.draw();
	      return c;
	    });
	    this.time = clock.now();
	  };

	  return Timeline;
	}();

	var timeline = Timeline;

	var Easing = {
	  linear: function linear(k) {
	    return k;
	  },
	  quadraticIn: function quadraticIn(k) {
	    return k * k;
	  },
	  quadraticOut: function quadraticOut(k) {
	    return k * (2 - k);
	  },
	  quadraticInOut: function quadraticInOut(k) {
	    if ((k *= 2) < 1) {
	      return 0.5 * k * k;
	    }

	    return -0.5 * (--k * (k - 2) - 1);
	  },
	  cubicIn: function cubicIn(k) {
	    return k * k * k;
	  },
	  cubicOut: function cubicOut(k) {
	    return --k * k * k + 1;
	  },
	  cubicInOut: function cubicInOut(k) {
	    if ((k *= 2) < 1) {
	      return 0.5 * k * k * k;
	    }

	    return 0.5 * ((k -= 2) * k * k + 2);
	  },
	  elasticIn: function elasticIn(k) {
	    var s;
	    var a = 0.1;
	    var p = 0.4;
	    if (k === 0) return 0;
	    if (k === 1) return 1;

	    if (!a || a < 1) {
	      a = 1;
	      s = p / 4;
	    } else {
	      s = p / (2 * Math.PI) * Math.asin(1 / a);
	    }

	    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	  },
	  elasticOut: function elasticOut(k) {
	    var s;
	    var a = 0.1;
	    var p = 0.4;
	    if (k === 0) return 0;
	    if (k === 1) return 1;

	    if (!a || a < 1) {
	      a = 1;
	      s = p / 4;
	    } else {
	      s = p / (2 * Math.PI) * Math.asin(1 / a);
	    }

	    return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
	  },
	  elasticInOut: function elasticInOut(k) {
	    var s;
	    var a = 0.1;
	    var p = 0.4;
	    if (k === 0) return 0;
	    if (k === 1) return 1;

	    if (!a || a < 1) {
	      a = 1;
	      s = p / 4;
	    } else {
	      s = p / (2 * Math.PI) * Math.asin(1 / a);
	    }

	    if ((k *= 2) < 1) {
	      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
	    }

	    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
	  },
	  backIn: function backIn(k) {
	    var s = 1.70158;
	    return k * k * ((s + 1) * k - s);
	  },
	  backOut: function backOut(k) {
	    var s = 1.70158;
	    return (k = k - 1) * k * ((s + 1) * k + s) + 1;
	  },
	  backInOut: function backInOut(k) {
	    var s = 1.70158 * 1.525;

	    if ((k *= 2) < 1) {
	      return 0.5 * (k * k * ((s + 1) * k - s));
	    }

	    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
	  },
	  bounceIn: function bounceIn(k) {
	    return 1 - Easing.bounceOut(1 - k);
	  },
	  bounceOut: function bounceOut(k) {
	    if ((k /= 1) < 1 / 2.75) {
	      return 7.5625 * k * k;
	    } else if (k < 2 / 2.75) {
	      return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
	    } else if (k < 2.5 / 2.75) {
	      return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
	    }

	    return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
	  },
	  bounceInOut: function bounceInOut(k) {
	    if (k < 0.5) {
	      return Easing.bounceIn(k * 2) * 0.5;
	    }

	    return Easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
	  }
	};
	var easing = Easing;

	function plainArray(arr) {
	  var result = [];

	  for (var i = 0, len = arr.length; i < len; i++) {
	    if (arr[i]) {
	      result.push(arr[i].x);
	      result.push(arr[i].y);
	    }
	  }

	  return result;
	}

	function interpolateNumber(a, b) {
	  a = +a;
	  b -= a;
	  return function (t) {
	    return a + b * t;
	  };
	}

	function interpolateArray(a, b) {
	  var nb = b ? b.length : 0;
	  var na = a ? Math.min(nb, a.length) : 0;
	  var x = new Array(na);
	  var c = new Array(nb);
	  var i;

	  for (i = 0; i < na; ++i) {
	    x[i] = interpolateNumber(a[i], b[i]);
	  }

	  for (; i < nb; ++i) {
	    c[i] = b[i];
	  }

	  return function (t) {
	    for (i = 0; i < na; ++i) {
	      c[i] = x[i](t);
	    }

	    return c;
	  };
	}

	var Animator = /*#__PURE__*/function () {
	  function Animator(shape, source, timeline) {
	    this.hasStarted = false;
	    this.hasEnded = false;
	    this.shape = shape;
	    this.source = source;
	    this.timeline = timeline;
	    this.animate = null;
	  } // delay, attrs, duration, easing


	  var _proto = Animator.prototype;

	  _proto.to = function to(cfg) {
	    if (cfg === void 0) {
	      cfg = {};
	    }

	    var delay = cfg.delay || 0;
	    var attrs = cfg.attrs || {};
	    var duration = cfg.duration || 1000;
	    var easing$1; // 缓动函数

	    if (typeof cfg.easing === 'function') {
	      easing$1 = cfg.easing;
	    } else {
	      easing$1 = easing[cfg.easing] || easing.linear;
	    }

	    var animInfo = {
	      shape: this.shape,
	      startTime: this.timeline.time + delay,
	      duration: duration,
	      easing: easing$1
	    };
	    var interpolate = {}; // 差值函数

	    for (var attrName in attrs) {
	      var startValue = this.source[attrName];
	      var endValue = attrs[attrName];

	      if (attrName === 'points') {
	        startValue = plainArray(startValue);
	        endValue = plainArray(endValue);
	        interpolate.points = interpolateArray(startValue, endValue);
	        this.source.points = startValue;
	        attrs.points = endValue;
	      } else if (attrName === 'matrix') {
	        interpolate.matrix = interpolateArray(startValue, endValue);
	      } else {
	        interpolate[attrName] = interpolateNumber(startValue, endValue);
	      }
	    }

	    animInfo.interpolate = interpolate;
	    animInfo.startState = this.source;
	    animInfo.endState = attrs;
	    animInfo.endTime = animInfo.startTime + duration;
	    this.timeline.anims.push(animInfo);
	    this.animate = animInfo;
	    return this;
	  };

	  _proto.onFrame = function onFrame(callback) {
	    // 自定义每一帧动画的动作
	    if (this.animate) {
	      this.animate.onFrame = function (frame) {
	        callback(frame);
	      };
	    }

	    return this;
	  };

	  _proto.onStart = function onStart(callback) {
	    if (this.animate) {
	      this.animate.onStart = function () {
	        callback();
	      };
	    }

	    return this;
	  };

	  _proto.onUpdate = function onUpdate(callback) {
	    if (this.animate) {
	      this.animate.onUpdate = function (frame) {
	        callback(frame);
	      };
	    }

	    return this;
	  };

	  _proto.onEnd = function onEnd(callback) {
	    if (this.animate) {
	      this.animate.onEnd = function () {
	        callback();
	      };
	    }

	    return this;
	  };

	  return Animator;
	}();

	var animator = Animator;

	/**
	 * Animate configuration and register
	 * @author sima.zhang1990@gmail.com
	 */


	var defaultAnimationCfg = {
	  appear: {
	    duration: 450,
	    easing: 'quadraticOut'
	  },
	  // 'appear' animation options
	  update: {
	    duration: 300,
	    easing: 'quadraticOut'
	  },
	  // 'update' animation options
	  enter: {
	    duration: 300,
	    easing: 'quadraticOut'
	  },
	  // 'enter' animation options
	  leave: {
	    duration: 350,
	    easing: 'quadraticIn'
	  } // 'leave' animation options

	};
	var Animate = {
	  defaultCfg: {},
	  Action: {},
	  getAnimation: function getAnimation(geomType, coord, animationType) {
	    var geomAnimateCfg = this.defaultCfg[geomType];

	    if (geomAnimateCfg) {
	      var animation = geomAnimateCfg[animationType];

	      if (common.isFunction(animation)) {
	        return animation(coord);
	      }
	    }

	    return false;
	  },
	  getAnimateCfg: function getAnimateCfg(geomType, animationType) {
	    var defaultCfg = defaultAnimationCfg[animationType];
	    var geomConfig = this.defaultCfg[geomType];

	    if (geomConfig && geomConfig.cfg && geomConfig.cfg[animationType]) {
	      return common.deepMix({}, defaultCfg, geomConfig.cfg[animationType]);
	    }

	    return defaultCfg;
	  },
	  registerAnimation: function registerAnimation(animationName, animationFun) {
	    if (!this.Action) {
	      this.Action = {};
	    }

	    this.Action[animationName] = animationFun;
	  }
	};
	var animate = Animate;

	/**
	 * Utility
	 * @author sima.zhang1990@gmail.com
	 */
	var Matrix$1 = graphic.Matrix;



	var Helpers = {
	  getCoordInfo: function getCoordInfo(coord) {
	    var start = coord.start;
	    var end = coord.end;
	    return {
	      start: start,
	      end: end,
	      width: end.x - start.x,
	      height: Math.abs(end.y - start.y)
	    };
	  },
	  getScaledMatrix: function getScaledMatrix(shape, v, direct) {
	    var scaledMatrix;
	    shape.apply(v);
	    var x = v[0];
	    var y = v[1];

	    if (direct === 'x') {
	      shape.transform([['t', x, y], ['s', 0.01, 1], ['t', -x, -y]]);
	      var matrix = shape.getMatrix();
	      scaledMatrix = Matrix$1.transform(matrix, [['t', x, y], ['s', 100, 1], ['t', -x, -y]]);
	    } else if (direct === 'y') {
	      shape.transform([['t', x, y], ['s', 1, 0.01], ['t', -x, -y]]);

	      var _matrix = shape.getMatrix();

	      scaledMatrix = Matrix$1.transform(_matrix, [['t', x, y], ['s', 1, 100], ['t', -x, -y]]);
	    } else if (direct === 'xy') {
	      shape.transform([['t', x, y], ['s', 0.01, 0.01], ['t', -x, -y]]);

	      var _matrix2 = shape.getMatrix();

	      scaledMatrix = Matrix$1.transform(_matrix2, [['t', x, y], ['s', 100, 100], ['t', -x, -y]]);
	    }

	    return scaledMatrix;
	  },
	  getAnimateParam: function getAnimateParam(animateCfg, index, id) {
	    var result = {};

	    if (animateCfg.delay) {
	      result.delay = common.isFunction(animateCfg.delay) ? animateCfg.delay(index, id) : animateCfg.delay;
	    }

	    result.easing = animateCfg.easing;
	    result.duration = animateCfg.duration;
	    result.delay = animateCfg.delay;
	    return result;
	  },
	  doAnimation: function doAnimation(shape, endState, animateCfg, callback) {
	    var id = shape._id;
	    var index = shape.get('index');

	    var _Helpers$getAnimatePa = Helpers.getAnimateParam(animateCfg, index, id),
	        easing = _Helpers$getAnimatePa.easing,
	        delay = _Helpers$getAnimatePa.delay,
	        duration = _Helpers$getAnimatePa.duration;

	    var anim = shape.animate().to({
	      attrs: endState,
	      duration: duration,
	      delay: delay,
	      easing: easing
	    });

	    if (callback) {
	      anim.onEnd(function () {
	        callback();
	      });
	    }
	  }
	};
	var util$1 = Helpers;

	/**
	 * Animation functions for shape
	 * @author sima.zhang1990@gmail.com
	 */



	/*
	function waveIn(shape, animateCfg, coord) {
	  const clip = Helpers.getClip(coord);
	  clip.set('canvas', shape.get('canvas'));
	  shape.attr('clip', clip);
	  const onEnd = function() {
	    shape.attr('clip', null);
	    clip.remove(true);
	  };
	  Helpers.doAnimation(clip, clip.endState, animateCfg, onEnd);
	}

	function scaleInX(shape, animateCfg) {
	  const box = shape.getBBox();
	  const points = shape.get('origin').points;
	  let x;
	  const y = (box.minY + box.maxY) / 2;

	  if (points[0].y - points[1].y > 0) { // 当顶点在零点之下
	    x = box.maxX;
	  } else {
	    x = box.minX;
	  }
	  const scaledMatrix = Helpers.getScaledMatrix(shape, [ x, y ], 'x');
	  Helpers.doAnimation(shape, { matrix: scaledMatrix }, animateCfg);
	}

	function scaleInY(shape, animateCfg) {
	  const box = shape.getBBox();
	  const points = shape.get('origin').points;
	  const x = (box.minX + box.maxX) / 2;
	  let y;

	  if (points[0].y - points[1].y <= 0) { // 当顶点在零点之下
	    y = box.maxY;
	  } else {
	    y = box.minY;
	  }
	  const scaledMatrix = Helpers.getScaledMatrix(shape, [ x, y ], 'x');
	  Helpers.doAnimation(shape, { matrix: scaledMatrix }, animateCfg);
	}
	*/


	function fadeIn(shape, animateCfg) {
	  var fillOpacity = common.isNil(shape.attr('fillOpacity')) ? 1 : shape.attr('fillOpacity');
	  var strokeOpacity = common.isNil(shape.attr('strokeOpacity')) ? 1 : shape.attr('strokeOpacity');
	  shape.attr('fillOpacity', 0);
	  shape.attr('strokeOpacity', 0);
	  var endState = {
	    fillOpacity: fillOpacity,
	    strokeOpacity: strokeOpacity
	  };
	  util$1.doAnimation(shape, endState, animateCfg);
	}

	var shapeAction = {
	  // waveIn,
	  // scaleInX,
	  // scaleInY,
	  fadeIn: fadeIn
	};

	/**
	 * Group animate functions
	 * @author sima.zhang1990@gmail.com
	 */




	var Shape$3 = graphic.Shape;

	function _groupScaleIn(container, animateCfg, coord, zeroY, type) {
	  var _Util$getCoordInfo = util$1.getCoordInfo(coord),
	      start = _Util$getCoordInfo.start,
	      end = _Util$getCoordInfo.end,
	      width = _Util$getCoordInfo.width,
	      height = _Util$getCoordInfo.height;

	  var x;
	  var y;
	  var clip = new Shape$3.Rect({
	    attrs: {
	      x: start.x,
	      y: end.y,
	      width: width,
	      height: height
	    }
	  });

	  if (type === 'y') {
	    x = start.x + width / 2;
	    y = zeroY.y < start.y ? zeroY.y : start.y;
	  } else if (type === 'x') {
	    x = zeroY.x > start.x ? zeroY.x : start.x;
	    y = start.y + height / 2;
	  } else if (type === 'xy') {
	    if (coord.isPolar) {
	      x = coord.center.x;
	      y = coord.center.y;
	    } else {
	      x = (start.x + end.x) / 2;
	      y = (start.y + end.y) / 2;
	    }
	  }

	  var endMatrix = util$1.getScaledMatrix(clip, [x, y], type);
	  clip.isClip = true;
	  clip.endState = {
	    matrix: endMatrix
	  };
	  clip.set('canvas', container.get('canvas'));
	  container.attr('clip', clip);

	  var onEnd = function onEnd() {
	    container.attr('clip', null);
	    clip.remove(true);
	  };

	  util$1.doAnimation(clip, clip.endState, animateCfg, onEnd);
	}

	function _shapeScale(container, animateCfg, type) {
	  var shapes = container.get('children');
	  var x;
	  var y;
	  var endMatrix;

	  for (var i = 0, len = shapes.length; i < len; i++) {
	    var shape = shapes[i];
	    var box = shape.getBBox();
	    x = (box.minX + box.maxX) / 2;
	    y = (box.minY + box.maxY) / 2;
	    endMatrix = util$1.getScaledMatrix(shape, [x, y], type);
	    util$1.doAnimation(shape, {
	      matrix: endMatrix
	    }, animateCfg);
	  }
	}

	function groupScaleInX(container, animateCfg, coord, zeroY) {
	  _groupScaleIn(container, animateCfg, coord, zeroY, 'x');
	}

	function groupScaleInY(container, animateCfg, coord, zeroY) {
	  _groupScaleIn(container, animateCfg, coord, zeroY, 'y');
	}

	function groupScaleInXY(container, animateCfg, coord, zeroY) {
	  _groupScaleIn(container, animateCfg, coord, zeroY, 'xy');
	}

	function shapesScaleInX(container, animateCfg) {
	  _shapeScale(container, animateCfg, 'x');
	}

	function shapesScaleInY(container, animateCfg) {
	  _shapeScale(container, animateCfg, 'y');
	}

	function shapesScaleInXY(container, animateCfg) {
	  _shapeScale(container, animateCfg, 'xy');
	}

	function groupWaveIn(container, animateCfg, coord) {
	  var clip = helper.getClip(coord);
	  clip.set('canvas', container.get('canvas'));
	  container.attr('clip', clip);

	  var onEnd = function onEnd() {
	    container.attr('clip', null);
	    clip.remove(true);
	  };

	  var endState = {};

	  if (coord.isPolar) {
	    var startAngle = coord.startAngle,
	        endAngle = coord.endAngle;
	    endState.endAngle = endAngle;
	    clip.attr('endAngle', startAngle);
	  } else {
	    var start = coord.start,
	        end = coord.end;
	    var width = Math.abs(start.x - end.x);
	    var height = Math.abs(start.y - end.y);

	    if (coord.isTransposed) {
	      clip.attr('height', 0);
	      endState.height = height;
	    } else {
	      clip.attr('width', 0);
	      endState.width = width;
	    }
	  }

	  util$1.doAnimation(clip, endState, animateCfg, onEnd);
	}

	var groupAction = {
	  groupWaveIn: groupWaveIn,
	  groupScaleInX: groupScaleInX,
	  groupScaleInY: groupScaleInY,
	  groupScaleInXY: groupScaleInXY,
	  shapesScaleInX: shapesScaleInX,
	  shapesScaleInY: shapesScaleInY,
	  shapesScaleInXY: shapesScaleInXY
	};

	/**
	 * Handle the detail animations
	 * @author sima.zhang1990@gmail.com
	 */
















	var timeline$1;

	element.prototype.animate = function () {
	  var attrs = common.mix({}, this.get('attrs'));
	  return new animator(this, attrs, timeline$1);
	};

	chart.prototype.animate = function (cfg) {
	  this.set('animate', cfg);
	  return this;
	};

	animate.Action = shapeAction;
	animate.defaultCfg = {
	  interval: {
	    enter: function enter(coord) {
	      if (coord.isPolar && coord.transposed) {
	        // for pie chart
	        return function (shape) {
	          shape.set('zIndex', -1);
	          var container = shape.get('parent');
	          container.sort();
	        };
	      }

	      return shapeAction.fadeIn;
	    }
	  },
	  area: {
	    enter: function enter(coord) {
	      if (coord.isPolar) return null;
	      return shapeAction.fadeIn;
	    }
	  },
	  line: {
	    enter: function enter(coord) {
	      if (coord.isPolar) return null;
	      return shapeAction.fadeIn;
	    }
	  },
	  path: {
	    enter: function enter(coord) {
	      if (coord.isPolar) return null;
	      return shapeAction.fadeIn;
	    }
	  }
	};
	var GROUP_ANIMATION = {
	  line: function line(coord) {
	    if (coord.isPolar) {
	      return groupAction.groupScaleInXY;
	    }

	    return groupAction.groupWaveIn;
	  },
	  area: function area(coord) {
	    if (coord.isPolar) {
	      return groupAction.groupScaleInXY;
	    }

	    return groupAction.groupWaveIn;
	  },
	  path: function path(coord) {
	    if (coord.isPolar) {
	      return groupAction.groupScaleInXY;
	    }

	    return groupAction.groupWaveIn;
	  },
	  point: function point() {
	    return groupAction.shapesScaleInXY;
	  },
	  interval: function interval(coord) {
	    var result;

	    if (coord.isPolar) {
	      // polar coodinate
	      result = groupAction.groupScaleInXY;

	      if (coord.transposed) {
	        // pie chart
	        result = groupAction.groupWaveIn;
	      }
	    } else {
	      result = coord.transposed ? groupAction.groupScaleInX : groupAction.groupScaleInY;
	    }

	    return result;
	  },
	  schema: function schema() {
	    return groupAction.groupWaveIn;
	  }
	};

	function diff(fromAttrs, toAttrs) {
	  var endState = {};

	  for (var k in toAttrs) {
	    if (common.isNumber(fromAttrs[k]) && fromAttrs[k] !== toAttrs[k]) {
	      endState[k] = toAttrs[k];
	    } else if (common.isArray(fromAttrs[k]) && JSON.stringify(fromAttrs[k]) !== JSON.stringify(toAttrs[k])) {
	      endState[k] = toAttrs[k];
	    }
	  }

	  return endState;
	} // Add a unique id identifier to each shape


	function _getShapeId(geom, dataObj, geomIdx) {
	  var type = geom.get('type');
	  var id = 'geom' + geomIdx + '-' + type;
	  var xScale = geom.getXScale();
	  var yScale = geom.getYScale();
	  var xField = xScale.field || 'x';
	  var yField = yScale.field || 'y';
	  var yVal = dataObj[yField];
	  var xVal;

	  if (xScale.isIdentity) {
	    xVal = xScale.value;
	  } else {
	    xVal = dataObj[xField];
	  }

	  if (type === 'interval' || type === 'schema') {
	    id += '-' + xVal;
	  } else if (type === 'line' || type === 'area' || type === 'path') {
	    id += '-' + type;
	  } else {
	    id += xScale.isCategory ? '-' + xVal : '-' + xVal + '-' + yVal;
	  }

	  var groupScales = geom._getGroupScales();

	  common.each(groupScales, function (groupScale) {
	    var field = groupScale.field;

	    if (groupScale.type !== 'identity') {
	      id += '-' + dataObj[field];
	    }
	  });
	  return id;
	} // get geometry's shapes


	function getShapes(geoms, chart, coord) {
	  var shapes = [];
	  common.each(geoms, function (geom, geomIdx) {
	    var geomContainer = geom.get('container');
	    var geomShapes = geomContainer.get('children');
	    var type = geom.get('type');
	    var animateCfg = common.isNil(geom.get('animateCfg')) ? _getAnimateCfgByShapeType(type, chart) : geom.get('animateCfg');

	    if (animateCfg !== false) {
	      common.each(geomShapes, function (shape, index) {
	        if (shape.get('className') === type) {
	          shape._id = _getShapeId(geom, shape.get('origin')._origin, geomIdx);
	          shape.set('coord', coord);
	          shape.set('animateCfg', animateCfg);
	          shape.set('index', index);
	          shapes.push(shape);
	        }
	      });
	    }

	    geom.set('shapes', geomShapes);
	  });
	  return shapes;
	}

	function cache(shapes) {
	  var rst = {};

	  for (var i = 0, len = shapes.length; i < len; i++) {
	    var shape = shapes[i];
	    if (!shape._id || shape.isClip) continue;
	    var id = shape._id;
	    rst[id] = {
	      _id: id,
	      type: shape.get('type'),
	      // the type of shape
	      attrs: common.mix({}, shape._attrs.attrs),
	      // the graphics attributes of shape
	      className: shape.get('className'),
	      geomType: shape.get('className'),
	      index: shape.get('index'),
	      coord: shape.get('coord'),
	      animateCfg: shape.get('animateCfg')
	    };
	  }

	  return rst;
	}

	function getAnimate(geomType, coord, animationType, animationName) {
	  var result;

	  if (common.isFunction(animationName)) {
	    result = animationName;
	  } else if (common.isString(animationName)) {
	    result = animate.Action[animationName];
	  } else {
	    result = animate.getAnimation(geomType, coord, animationType);
	  }

	  return result;
	}

	function getAnimateCfg(geomType, animationType, animateCfg) {
	  if (animateCfg === false || common.isObject(animateCfg) && animateCfg[animationType] === false) {
	    return false;
	  }

	  var defaultCfg = animate.getAnimateCfg(geomType, animationType);

	  if (animateCfg && animateCfg[animationType]) {
	    return common.deepMix({}, defaultCfg, animateCfg[animationType]);
	  }

	  return defaultCfg;
	}

	function addAnimate(cache, shapes, canvas) {
	  var animate;
	  var animateCfg; // the order of animation: leave -> update -> enter

	  var updateShapes = [];
	  var newShapes = [];
	  common.each(shapes, function (shape) {
	    var result = cache[shape._id];

	    if (!result) {
	      newShapes.push(shape);
	    } else {
	      shape.set('cacheShape', result);
	      updateShapes.push(shape);
	      delete cache[shape._id];
	    }
	  }); // first do the leave animation

	  common.each(cache, function (deletedShape) {
	    var className = deletedShape.className,
	        coord = deletedShape.coord,
	        _id = deletedShape._id,
	        attrs = deletedShape.attrs,
	        index = deletedShape.index,
	        type = deletedShape.type;
	    animateCfg = getAnimateCfg(className, 'leave', deletedShape.animateCfg);
	    if (animateCfg === false) return true;
	    animate = getAnimate(className, coord, 'leave', animateCfg.animation);

	    if (common.isFunction(animate)) {
	      var tempShape = canvas.addShape(type, {
	        attrs: attrs,
	        index: index,
	        canvas: canvas,
	        className: className
	      });
	      tempShape._id = _id;
	      animate(tempShape, animateCfg, coord);
	    }
	  }); // then do the update animation

	  common.each(updateShapes, function (updateShape) {
	    var className = updateShape.get('className');
	    animateCfg = getAnimateCfg(className, 'update', updateShape.get('animateCfg'));
	    if (animateCfg === false) return true;
	    var coord = updateShape.get('coord');
	    var cacheAttrs = updateShape.get('cacheShape').attrs;
	    var endState = diff(cacheAttrs, updateShape._attrs.attrs); // 判断如果属性相同的话就不进行变换

	    if (Object.keys(endState).length) {
	      animate = getAnimate(className, coord, 'update', animateCfg.animation);

	      if (common.isFunction(animate)) {
	        animate(updateShape, animateCfg, coord);
	      } else {
	        updateShape.attr(cacheAttrs);
	        updateShape.animate().to({
	          attrs: endState,
	          duration: animateCfg.duration,
	          easing: animateCfg.easing,
	          delay: animateCfg.delay
	        }).onEnd(function () {
	          updateShape.set('cacheShape', null);
	        });
	      }
	    }
	  }); // last, enter animation

	  common.each(newShapes, function (newShape) {
	    // 新图形元素的进场元素
	    var className = newShape.get('className');
	    var coord = newShape.get('coord');
	    animateCfg = getAnimateCfg(className, 'enter', newShape.get('animateCfg'));
	    if (animateCfg === false) return true;
	    animate = getAnimate(className, coord, 'enter', animateCfg.animation);

	    if (common.isFunction(animate)) {
	      if (className === 'interval' && coord.isPolar && coord.transposed) {
	        var index = newShape.get('index');
	        var lastShape = updateShapes[index - 1];
	        animate(newShape, animateCfg, lastShape);
	      } else {
	        animate(newShape, animateCfg, coord);
	      }
	    }
	  });
	}

	function _getAnimateCfgByShapeType(type, chart) {
	  if (!type) {
	    return null;
	  }

	  var animateCfg = chart.get('animate');

	  if (type.indexOf('guide-tag') > -1) {
	    type = 'guide-tag';
	  }

	  if (common.isObject(animateCfg)) {
	    return animateCfg[type];
	  }

	  if (animateCfg === false) {
	    return false;
	  }

	  return null;
	}

	var detail = {
	  afterCanvasInit: function afterCanvasInit()
	  /* chart */
	  {
	    timeline$1 = new timeline();
	    timeline$1.play();
	  },
	  beforeCanvasDraw: function beforeCanvasDraw(chart) {
	    if (chart.get('animate') === false) {
	      return;
	    }

	    var isUpdate = chart.get('isUpdate');
	    var canvas = chart.get('canvas');
	    var coord = chart.get('coord');
	    var geoms = chart.get('geoms');
	    var caches = canvas.get('caches') || [];

	    if (caches.length === 0) {
	      isUpdate = false;
	    }

	    var cacheShapes = getShapes(geoms, chart, coord);

	    var _chart$get = chart.get('axisController'),
	        frontPlot = _chart$get.frontPlot,
	        backPlot = _chart$get.backPlot;

	    var axisShapes = frontPlot.get('children').concat(backPlot.get('children'));
	    var guideShapes = [];

	    if (chart.get('guideController')) {
	      guideShapes = chart.get('guideController').guideShapes;
	    }

	    var componentShapes = [];
	    axisShapes.concat(guideShapes).forEach(function (s) {
	      var className = s.get('className');

	      var animateCfg = _getAnimateCfgByShapeType(className, chart);

	      s.set('coord', coord);
	      s.set('animateCfg', animateCfg);
	      componentShapes.push(s);
	      cacheShapes.push(s);
	    });
	    canvas.set('caches', cache(cacheShapes));

	    if (isUpdate) {
	      addAnimate(caches, cacheShapes, canvas);
	    } else {
	      // do the appear animation
	      var animateCfg;
	      var animate$1;
	      common.each(geoms, function (geom) {
	        var type = geom.get('type');
	        var geomCfg = common.isNil(geom.get('animateCfg')) ? _getAnimateCfgByShapeType(type, chart) : geom.get('animateCfg');

	        if (geomCfg !== false) {
	          animateCfg = getAnimateCfg(type, 'appear', geomCfg);
	          animate$1 = getAnimate(type, coord, 'appear', animateCfg.animation);

	          if (common.isFunction(animate$1)) {
	            var shapes = geom.get('shapes');
	            common.each(shapes, function (shape) {
	              animate$1(shape, animateCfg, coord);
	            });
	          } else if (GROUP_ANIMATION[type]) {
	            // do the default animation
	            animate$1 = groupAction[animateCfg.animation] || GROUP_ANIMATION[type](coord);
	            var yScale = geom.getYScale();
	            var zeroY = coord.convertPoint({
	              x: 0,
	              y: yScale.scale(geom.getYMinValue())
	            });
	            var container = geom.get('container');
	            animate$1 && animate$1(container, animateCfg, coord, zeroY);
	          }
	        }
	      }); // do the animation of components

	      common.each(componentShapes, function (shape) {
	        var animateCfg = shape.get('animateCfg');
	        var className = shape.get('className');

	        if (animateCfg && animateCfg.appear) {
	          // if user configure
	          var defaultCfg = animate.getAnimateCfg(className, 'appear');
	          var appearCfg = common.deepMix({}, defaultCfg, animateCfg.appear);

	          var _animate = getAnimate(className, coord, 'appear', appearCfg.animation);

	          if (common.isFunction(_animate)) {
	            _animate(shape, appearCfg, coord);
	          }
	        }
	      });
	    }
	  },
	  afterCanvasDestroyed: function afterCanvasDestroyed()
	  /* chart */
	  {
	    timeline$1.stop();
	  }
	};

	var _possibleConstructorReturn2$h = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$h = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$h = interopRequireDefault(inheritsLoose);

	/**
	 * marker shapes，used for tooltip and legend
	 */


	var Shape$4 = graphic.Shape;

	var SYMBOLS = {
	  circle: function circle(x, y, r, ctx) {
	    ctx.arc(x, y, r, 0, Math.PI * 2, false);
	  },
	  square: function square(x, y, r, ctx) {
	    ctx.moveTo(x - r, y - r);
	    ctx.lineTo(x + r, y - r);
	    ctx.lineTo(x + r, y + r);
	    ctx.lineTo(x - r, y + r);
	    ctx.closePath();
	  }
	};

	var Marker = /*#__PURE__*/function (_Shape) {
	  (0, _inheritsLoose2$h["default"])(Marker, _Shape);

	  function Marker() {
	    return _Shape.apply(this, arguments) || this;
	  }

	  var _proto = Marker.prototype;

	  _proto._initProperties = function _initProperties() {
	    _Shape.prototype._initProperties.call(this);

	    this._attrs.canFill = true;
	    this._attrs.canStroke = true;
	    this._attrs.type = 'marker';
	  };

	  _proto.getDefaultAttrs = function getDefaultAttrs() {
	    return {
	      x: 0,
	      y: 0,
	      lineWidth: 0
	    };
	  };

	  _proto.createPath = function createPath(context) {
	    var attrs = this.get('attrs');
	    var x = attrs.x,
	        y = attrs.y,
	        radius = attrs.radius;
	    var symbol = attrs.symbol || 'circle';
	    var method;

	    if (common.isFunction(symbol)) {
	      method = symbol;
	    } else {
	      method = SYMBOLS[symbol];
	    }

	    context.beginPath();
	    method(x, y, radius, context, this);
	  };

	  _proto.calculateBox = function calculateBox() {
	    var attrs = this.get('attrs');
	    var x = attrs.x,
	        y = attrs.y,
	        radius = attrs.radius;
	    return {
	      minX: x - radius,
	      minY: y - radius,
	      maxX: x + radius,
	      maxY: y + radius
	    };
	  };

	  return Marker;
	}(Shape$4);

	var marker = Marker;

	var Group$1 = graphic.Group;



	var MARKER_RADIUS = 3;

	var List = /*#__PURE__*/function () {
	  var _proto = List.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    return {
	      showTitle: false,

	      /**
	       * title string
	       * @type {?String}
	       */
	      title: null,

	      /**
	       * items array
	       * @type {?Array}
	       */
	      items: null,

	      /**
	       * offset between title and items
	       * @type {Number}
	       */
	      titleGap: 12,

	      /**
	       * offset between each item
	       * @type {Number}
	       */
	      itemGap: 10,

	      /**
	       * the offset between each item in vertical direaction
	       * @type {Number}
	       */
	      itemMarginBottom: 12,

	      /**
	       * the formatter for item text
	       * @type {[type]}
	       */
	      itemFormatter: null,
	      itemWidth: null,

	      /**
	       * offset between marker and text
	       * @type {Number}
	       */
	      wordSpace: 6,
	      x: 0,
	      y: 0,
	      layout: 'horizontal',

	      /**
	       * the join string of `name` and `value`
	       * @type {String}
	       */
	      joinString: ': '
	    };
	  };

	  function List(cfg) {
	    common.deepMix(this, this.getDefaultCfg(), cfg);

	    this._init();

	    this._renderTitle();

	    this._renderItems();
	  }

	  _proto._init = function _init() {
	    var container = new Group$1({
	      zIndex: this.zIndex || 0
	    });
	    this.container = container;
	    var wrapper = container.addGroup();
	    this.wrapper = wrapper;
	    var itemsGroup = wrapper.addGroup({
	      className: 'itemsGroup'
	    });
	    this.itemsGroup = itemsGroup;

	    if (this.parent) {
	      this.parent.add(container);
	    }
	  };

	  _proto._renderTitle = function _renderTitle(title) {
	    title = title || this.title;
	    var titleShape = this.titleShape;
	    var titleHeight = 0;

	    if (this.showTitle && title) {
	      if (titleShape && !titleShape.get('destroyed')) {
	        titleShape.attr('text', title);
	      } else {
	        var wrapper = this.wrapper,
	            titleStyle = this.titleStyle;
	        titleShape = wrapper.addShape('text', {
	          className: 'title',
	          attrs: common.mix({
	            x: 0,
	            y: 0,
	            text: title
	          }, titleStyle)
	        });
	        this.titleShape = titleShape;
	      }

	      titleHeight = titleShape.getBBox().height + this.titleGap;
	    }

	    this._titleHeight = titleHeight;
	  };

	  _proto._renderItems = function _renderItems(items) {
	    var self = this;
	    items = items || self.items;

	    if (!items) {
	      return;
	    }

	    if (self.reversed) {
	      items.reverse();
	    }

	    common.each(items, function (item, index) {
	      self._addItem(item, index);
	    });

	    if (items.length > 1) {
	      this._adjustItems();
	    }

	    this._renderBackground();
	  };

	  _proto._renderBackground = function _renderBackground() {
	    var background = this.background;

	    if (background) {
	      var container = this.container;
	      var wrapper = this.wrapper;

	      var _wrapper$getBBox = wrapper.getBBox(),
	          minX = _wrapper$getBBox.minX,
	          minY = _wrapper$getBBox.minY,
	          width = _wrapper$getBBox.width,
	          height = _wrapper$getBBox.height;

	      var padding = background.padding || [0, 0, 0, 0];
	      padding = common.parsePadding(padding);
	      var attrs = common.mix({
	        x: minX - padding[3],
	        y: minY - padding[0],
	        width: width + padding[1] + padding[3],
	        height: height + padding[0] + padding[2]
	      }, background);
	      var backShape = this.backShape;

	      if (backShape) {
	        backShape.attr(attrs);
	      } else {
	        backShape = container.addShape('Rect', {
	          zIndex: -1,
	          attrs: attrs
	        });
	      }

	      this.backShape = backShape;
	      container.sort();
	    }
	  };

	  _proto._addItem = function _addItem(item) {
	    var itemsGroup = this.itemsGroup;
	    var itemGroup = itemsGroup.addGroup({
	      name: item.name,
	      value: item.value,
	      dataValue: item.dataValue,
	      checked: item.checked
	    });
	    var unCheckStyle = this.unCheckStyle,
	        unCheckColor = this.unCheckColor,
	        nameStyle = this.nameStyle,
	        valueStyle = this.valueStyle,
	        wordSpace = this.wordSpace;
	    var marker$1 = item.marker,
	        value = item.value;
	    var startX = 0;

	    if (unCheckColor) {
	      unCheckStyle.fill = unCheckColor;
	    }

	    if (marker$1) {
	      var radius = marker$1.radius || MARKER_RADIUS;
	      var markerAttrs = common.mix({
	        x: radius,
	        y: this._titleHeight
	      }, marker$1);

	      if (item.checked === false) {
	        common.mix(markerAttrs, unCheckStyle);
	      }

	      var markerShape = new marker({
	        className: 'item-marker',
	        attrs: markerAttrs
	      });
	      itemGroup.add(markerShape);
	      startX += markerShape.getBBox().width + wordSpace;
	    }

	    var nameText;
	    var name = item.name;

	    if (name) {
	      var joinString = this.joinString || '';
	      name = value ? name + joinString : name;
	      nameText = itemGroup.addShape('text', {
	        className: 'name',
	        attrs: common.mix({
	          x: startX,
	          y: this._titleHeight,
	          text: this._formatItemValue(name)
	        }, nameStyle, item.checked === false ? unCheckStyle : null)
	      });
	    }

	    if (value) {
	      var valueX = startX;

	      if (nameText) {
	        valueX += nameText.getBBox().width;
	      }

	      itemGroup.addShape('text', {
	        className: 'value',
	        attrs: common.mix({
	          x: valueX,
	          y: this._titleHeight,
	          text: value
	        }, valueStyle, item.checked === false ? unCheckStyle : null)
	      });
	    }

	    return itemGroup;
	  };

	  _proto._formatItemValue = function _formatItemValue(value) {
	    var formatter = this.itemFormatter;

	    if (formatter) {
	      value = formatter.call(this, value);
	    }

	    return value;
	  };

	  _proto._getMaxItemWidth = function _getMaxItemWidth() {
	    var width;
	    var itemWidth = this.itemWidth;

	    if (common.isNumber(itemWidth) || common.isNil(itemWidth)) {
	      return itemWidth;
	    }

	    if (itemWidth === 'auto') {
	      var itemsGroup = this.itemsGroup;
	      var children = itemsGroup.get('children');
	      var count = children.length;
	      var maxItemWidth = 0;

	      for (var i = 0; i < count; i++) {
	        var _children$i$getBBox = children[i].getBBox(),
	            _width = _children$i$getBBox.width;

	        maxItemWidth = Math.max(maxItemWidth, _width);
	      }

	      var maxLength = this.maxLength;
	      var itemGap = this.itemGap;
	      var twoAvgWidth = (maxLength - itemGap) / 2;
	      var threeAvgWidth = (maxLength - itemGap * 2) / 3;

	      if (count === 2) {
	        width = Math.max(maxItemWidth, twoAvgWidth);
	      } else {
	        // 1. max <= 3Avg, 3Avg
	        // 2. 3Avg < max && max < 2avg, 2avg
	        // 3. max > 2avg, max, one column
	        if (maxItemWidth <= threeAvgWidth) {
	          width = threeAvgWidth;
	        } else if (maxItemWidth <= twoAvgWidth) {
	          width = twoAvgWidth;
	        } else {
	          width = maxItemWidth;
	        }
	      }

	      return width;
	    }
	  };

	  _proto._adjustHorizontal = function _adjustHorizontal() {
	    var maxLength = this.maxLength,
	        itemsGroup = this.itemsGroup;
	    var children = itemsGroup.get('children');
	    var itemGap = this.itemGap,
	        itemMarginBottom = this.itemMarginBottom;
	    var titleHeight = this._titleHeight;
	    var row = 0;
	    var rowWidth = 0;
	    var width;
	    var height;

	    var itemWidth = this._getMaxItemWidth();

	    var legendHitBoxes = [];

	    for (var i = 0, len = children.length; i < len; i++) {
	      var child = children[i];
	      var box = child.getBBox();
	      var childHeight = box.height;
	      var childWidth = box.width;
	      width = itemWidth || childWidth;
	      height = childHeight + itemMarginBottom;

	      if (width - (maxLength - rowWidth) > 0.0001) {
	        row++;
	        rowWidth = 0;
	      }

	      child.moveTo(rowWidth, row * height);
	      legendHitBoxes.push({
	        x: rowWidth,
	        y: row * height + titleHeight - childHeight / 2,
	        width: childWidth * 1.375,
	        height: childHeight * 1.375
	      });
	      rowWidth += width + itemGap;
	    }

	    this.legendHitBoxes = legendHitBoxes;
	    return;
	  };

	  _proto._adjustVertical = function _adjustVertical() {
	    var maxLength = this.maxLength,
	        itemsGroup = this.itemsGroup;
	    var itemGap = this.itemGap,
	        itemMarginBottom = this.itemMarginBottom,
	        itemWidth = this.itemWidth;
	    var titleHeight = this._titleHeight;
	    var children = itemsGroup.get('children');
	    var colHeight = 0;
	    var width;
	    var height;
	    var maxItemWidth = 0;
	    var totalWidth = 0;
	    var legendHitBoxes = [];

	    for (var i = 0, length = children.length; i < length; i++) {
	      var child = children[i];
	      var bbox = child.getBBox();
	      width = bbox.width;
	      height = bbox.height;

	      if (common.isNumber(itemWidth)) {
	        maxItemWidth = itemWidth + itemGap;
	      } else if (width > maxItemWidth) {
	        maxItemWidth = width + itemGap;
	      }

	      if (maxLength - colHeight < height) {
	        colHeight = 0;
	        totalWidth += maxItemWidth;
	        child.moveTo(totalWidth, 0);
	        legendHitBoxes.push({
	          x: totalWidth,
	          y: titleHeight - height / 2,
	          width: width * 1.375,
	          height: height * 1.375
	        });
	      } else {
	        child.moveTo(totalWidth, colHeight);
	        legendHitBoxes.push({
	          x: totalWidth,
	          y: colHeight - height / 2 + titleHeight,
	          width: width * 1.375,
	          height: height * 1.375
	        });
	      }

	      colHeight += height + itemMarginBottom;
	    }

	    this.legendHitBoxes = legendHitBoxes;
	    return;
	  };

	  _proto._adjustItems = function _adjustItems() {
	    var layout = this.layout;

	    if (layout === 'horizontal') {
	      this._adjustHorizontal();
	    } else {
	      this._adjustVertical();
	    }
	  };

	  _proto.moveTo = function moveTo(x, y) {
	    this.x = x;
	    this.y = y;
	    var container = this.container;
	    container && container.moveTo(x, y);
	    return this;
	  };

	  _proto.setItems = function setItems(items) {
	    this.clearItems();

	    this._renderItems(items);
	  };

	  _proto.setTitle = function setTitle(title) {
	    this._renderTitle(title);
	  };

	  _proto.clearItems = function clearItems() {
	    var itemsGroup = this.itemsGroup;
	    itemsGroup.clear();
	  };

	  _proto.getWidth = function getWidth() {
	    var container = this.container;
	    var bbox = container.getBBox();
	    return bbox.width;
	  };

	  _proto.getHeight = function getHeight() {
	    var container = this.container;
	    var bbox = container.getBBox();
	    return bbox.height;
	  };

	  _proto.show = function show() {
	    var container = this.container;
	    container.show();
	  };

	  _proto.hide = function hide() {
	    var container = this.container;
	    container.hide();
	  };

	  _proto.clear = function clear() {
	    var container = this.container;
	    container.clear();
	    container.remove(true);
	  };

	  return List;
	}();

	var list = List;

	var Group$2 = graphic.Group;

	var TextBox = /*#__PURE__*/function () {
	  var _proto = TextBox.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    return {
	      x: 0,
	      y: 0,
	      content: '',
	      textStyle: {
	        fontSize: 12,
	        fill: '#fff',
	        textAlign: 'center',
	        textBaseline: 'middle'
	      },
	      background: {
	        radius: 1,
	        fill: 'rgba(0, 0, 0, 0.65)',
	        padding: [3, 5]
	      },
	      width: 0,
	      height: 0,
	      className: ''
	    };
	  };

	  function TextBox(cfg) {
	    common.deepMix(this, this.getDefaultCfg(), cfg);

	    this._init();

	    var content = this.content,
	        x = this.x,
	        y = this.y;

	    if (!common.isNil(content)) {
	      this.updateContent(content);
	    }

	    this.updatePosition(x, y);
	  }

	  _proto._init = function _init() {
	    var content = this.content,
	        textStyle = this.textStyle,
	        background = this.background,
	        className = this.className,
	        visible = this.visible;
	    var container = new Group$2({
	      className: className,
	      zIndex: 0,
	      visible: visible
	    });
	    var text = container.addShape('Text', {
	      className: className + '-text',
	      zIndex: 1,
	      attrs: common.mix({
	        text: content,
	        x: 0,
	        y: 0
	      }, textStyle)
	    });
	    var backgroundShape = container.addShape('Rect', {
	      className: className + '-bg',
	      zIndex: -1,
	      attrs: common.mix({
	        x: 0,
	        y: 0,
	        width: 0,
	        height: 0
	      }, background)
	    });
	    container.sort();
	    this.container = container;
	    this.textShape = text;
	    this.backgroundShape = backgroundShape;
	  };

	  _proto._getBBox = function _getBBox() {
	    var textShape = this.textShape;
	    var background = this.background;
	    var textBBox = textShape.getBBox();
	    var padding = common.parsePadding(background.padding);
	    var width = textBBox.width + padding[1] + padding[3];
	    var height = textBBox.height + padding[0] + padding[2];
	    var x = textBBox.minX - padding[3];
	    var y = textBBox.minY - padding[0];
	    return {
	      x: x,
	      y: y,
	      width: width,
	      height: height
	    };
	  };

	  _proto.updateContent = function updateContent(text) {
	    var textShape = this.textShape,
	        backgroundShape = this.backgroundShape;

	    if (!common.isNil(text)) {
	      if (!common.isObject(text)) {
	        text = {
	          text: text
	        };
	      }

	      textShape.attr(text); // update box shape

	      var _this$_getBBox = this._getBBox(),
	          x = _this$_getBBox.x,
	          y = _this$_getBBox.y,
	          tipWidth = _this$_getBBox.width,
	          tipHeight = _this$_getBBox.height;

	      var width = this.width || tipWidth;
	      var height = this.height || tipHeight;
	      backgroundShape.attr({
	        x: x,
	        y: y,
	        width: width,
	        height: height
	      });
	      this._width = width;
	      this._height = height;
	      this.content = text.text;
	    }
	  };

	  _proto.updatePosition = function updatePosition(x, y) {
	    var container = this.container;

	    var _this$_getBBox2 = this._getBBox(),
	        xMin = _this$_getBBox2.x,
	        yMin = _this$_getBBox2.y;

	    container.moveTo(x - xMin, y - yMin);
	    this.x = x - xMin;
	    this.y = y - yMin;
	  };

	  _proto.getWidth = function getWidth() {
	    return this._width;
	  };

	  _proto.getHeight = function getHeight() {
	    return this._height;
	  };

	  _proto.show = function show() {
	    this.container.show();
	  };

	  _proto.hide = function hide() {
	    this.container.hide();
	  };

	  _proto.clear = function clear() {
	    var container = this.container;
	    container.clear();
	    container.remove(true);
	    this.container = null;
	    this.textShape = null;
	    this.backgroundShape = null;
	  };

	  return TextBox;
	}();

	var textBox = TextBox;

	var GAP = 4;
	/**
	 * TODOList：
	 * 1. 移除 fixed 参数
	 */

	var Tooltip = /*#__PURE__*/function () {
	  var _proto = Tooltip.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    return {
	      /**
	       * wether show the crosshairs
	       * @type {Object}
	       */
	      showCrosshairs: false,

	      /**
	       * the style for crosshairs
	       * @type {Object}
	       */
	      crosshairsStyle: {
	        stroke: 'rgba(0, 0, 0, 0.25)',
	        lineWidth: 1
	      },

	      /**
	       * the type of crosshairs, optional value is 'x', 'y' or 'xy', default is 'y'
	       */
	      crosshairsType: 'y',

	      /**
	       * show or hide the x axis tip
	       */
	      showXTip: false,

	      /**
	       * show or hide the y axis tip
	       */
	      showYTip: false,
	      xTip: null,
	      xTipBackground: {
	        radius: 1,
	        fill: 'rgba(0, 0, 0, 0.65)',
	        padding: [3, 5]
	      },
	      yTip: null,
	      yTipBackground: {
	        radius: 1,
	        fill: 'rgba(0, 0, 0, 0.65)',
	        padding: [3, 5]
	      },

	      /**
	       * the style for tooltip container's background
	       * @type {Object}
	       */
	      background: null,

	      /**
	       * layout, can be horizontal or vertical
	       * @type {String}
	       */
	      layout: 'horizontal',
	      offsetX: 0,
	      offsetY: 0
	    };
	  };

	  function Tooltip(cfg) {
	    common.deepMix(this, this.getDefaultCfg(), cfg);
	    var frontPlot = this.frontPlot,
	        custom = this.custom;

	    if (!custom) {
	      // custom means user do customize
	      var container = new list(common.mix({
	        parent: frontPlot,
	        zIndex: 3
	      }, cfg));
	      this.container = container;
	      var fixed = this.fixed,
	          background = this.background;

	      if (!fixed) {
	        this.tooltipArrow = frontPlot.addShape('Polygon', {
	          className: 'tooltip-arrow',
	          visible: false,
	          zIndex: 2,
	          attrs: common.mix({
	            points: []
	          }, background)
	        });
	      }
	    }

	    if (this.showXTip) {
	      var xTipBackground = this.xTipBackground;
	      var xTipBox = new textBox({
	        className: 'xTip',
	        background: xTipBackground,
	        visible: false
	      });
	      frontPlot.add(xTipBox.container);
	      this.xTipBox = xTipBox;
	    }

	    if (this.showYTip) {
	      var yTipBackground = this.yTipBackground;
	      var yTipBox = new textBox({
	        className: 'yTip',
	        background: yTipBackground,
	        visible: false
	      });
	      frontPlot.add(yTipBox.container);
	      this.yTipBox = yTipBox;
	    }

	    if (this.showCrosshairs) {
	      this._renderCrosshairs();
	    }

	    frontPlot.sort();
	  }

	  _proto.setContent = function setContent(title, items) {
	    this.title = title;
	    this.items = items;

	    if (!this.custom) {
	      var container = this.container;
	      container.setTitle(title);
	      container.setItems(items);
	    }
	  };

	  _proto.setYTipContent = function setYTipContent(val) {
	    var yTip = this.yTip;

	    if (common.isFunction(yTip)) {
	      val = yTip(val);
	    } else {
	      val = common.mix({
	        text: val
	      }, yTip);
	    }

	    this.yTipBox && this.yTipBox.updateContent(val);
	  };

	  _proto.setYTipPosition = function setYTipPosition(pos) {
	    var plotRange = this.plotRange;
	    var crosshairsShapeX = this.crosshairsShapeX;

	    if (this.showYTip) {
	      var yTipBox = this.yTipBox;
	      var yTipHeight = yTipBox.getHeight();
	      var yTipWidth = yTipBox.getWidth();
	      var posX = plotRange.tl.x - yTipWidth;
	      var posY = pos - yTipHeight / 2;

	      if (posY <= plotRange.tl.y) {
	        posY = plotRange.tl.y;
	      }

	      if (posY + yTipHeight >= plotRange.br.y) {
	        posY = plotRange.br.y - yTipHeight;
	      }

	      if (posX < 0) {
	        posX = plotRange.tl.x;
	        crosshairsShapeX && crosshairsShapeX.attr('x1', plotRange.tl.x + yTipWidth);
	      }

	      yTipBox.updatePosition(posX, posY);
	    }
	  };

	  _proto.setXTipContent = function setXTipContent(val) {
	    var xTip = this.xTip;

	    if (common.isFunction(xTip)) {
	      val = xTip(val);
	    } else {
	      val = common.mix({
	        text: val
	      }, xTip);
	    }

	    this.xTipBox && this.xTipBox.updateContent(val);
	  };

	  _proto.setXTipPosition = function setXTipPosition(pos) {
	    var showXTip = this.showXTip,
	        canvas = this.canvas,
	        plotRange = this.plotRange,
	        xTipBox = this.xTipBox,
	        crosshairsShapeY = this.crosshairsShapeY;

	    if (showXTip) {
	      // const el = canvas.get('el');
	      // const canvasHeight = Util.getHeight(el);
	      var canvasHeight = canvas.get('height');
	      var xTipWidth = xTipBox.getWidth();
	      var xTipHeight = xTipBox.getHeight();
	      var posX = pos - xTipWidth / 2;
	      var posY = plotRange.br.y;

	      if (posX <= plotRange.tl.x) {
	        posX = plotRange.tl.x;
	      }

	      if (posX + xTipWidth >= plotRange.tr.x) {
	        posX = plotRange.tr.x - xTipWidth;
	      }

	      if (canvasHeight - posY < xTipHeight) {
	        posY -= xTipHeight;
	      }

	      xTipBox.updatePosition(posX, posY);
	      crosshairsShapeY && crosshairsShapeY.attr('y1', posY);
	    }
	  };

	  _proto.setXCrosshairPosition = function setXCrosshairPosition(pos) {
	    this.crosshairsShapeX && this.crosshairsShapeX.moveTo(0, pos);
	  };

	  _proto.setYCrosshairPosition = function setYCrosshairPosition(pos) {
	    this.crosshairsShapeY && this.crosshairsShapeY.moveTo(pos, 0);
	  };

	  _proto.setPosition = function setPosition(items) {
	    var container = this.container,
	        plotRange = this.plotRange,
	        offsetX = this.offsetX,
	        offsetY = this.offsetY,
	        fixed = this.fixed,
	        tooltipArrow = this.tooltipArrow;

	    if (!container) {
	      return;
	    }

	    var containerBBox = container.container.getBBox();
	    var minX = containerBBox.minX,
	        minY = containerBBox.minY,
	        width = containerBBox.width,
	        height = containerBBox.height;
	    var tl = plotRange.tl,
	        tr = plotRange.tr;
	    var posX = 0;
	    var posY = tl.y - height - GAP + offsetY;

	    if (fixed) {
	      var x = (tl.x + tr.x) / 2;
	      posX = x - width / 2 + offsetX;
	    } else {
	      var _x;

	      if (items.length > 1) {
	        _x = (items[0].x + items[items.length - 1].x) / 2;
	      } else {
	        _x = items[0].x;
	      }

	      posX = _x - width / 2 + offsetX;

	      if (posX < tl.x) {
	        posX = tl.x;
	      }

	      if (posX + width > tr.x) {
	        posX = tr.x - width;
	      }

	      if (tooltipArrow) {
	        tooltipArrow.attr('points', [{
	          x: _x - 3,
	          y: tl.y - GAP + offsetY
	        }, {
	          x: _x + 3,
	          y: tl.y - GAP + offsetY
	        }, {
	          x: _x,
	          y: tl.y + offsetY
	        }]);
	        var backShape = container.backShape;
	        var radius = common.parsePadding(backShape.attr('radius'));

	        if (_x === tl.x) {
	          radius[3] = 0;
	          tooltipArrow.attr('points', [{
	            x: tl.x,
	            y: tl.y + offsetY
	          }, {
	            x: tl.x,
	            y: tl.y - GAP + offsetY
	          }, {
	            x: tl.x + GAP,
	            y: tl.y - GAP + offsetY
	          }]);
	        } else if (_x === tr.x) {
	          radius[2] = 0;
	          tooltipArrow.attr('points', [{
	            x: tr.x,
	            y: tl.y + offsetY
	          }, {
	            x: tr.x - GAP,
	            y: tl.y - GAP + offsetY
	          }, {
	            x: tr.x,
	            y: tl.y - GAP + offsetY
	          }]);
	        }

	        backShape.attr('radius', radius);
	      }
	    }

	    container.moveTo(posX - minX, posY - minY);
	  };

	  _proto.setMarkers = function setMarkers(cfg) {
	    if (cfg === void 0) {
	      cfg = {};
	    }

	    var self = this;
	    var _cfg = cfg,
	        items = _cfg.items,
	        style = _cfg.style,
	        type = _cfg.type;

	    var markerGroup = self._getMarkerGroup(type);

	    if (type === 'circle') {
	      for (var i = 0, length = items.length; i < length; i++) {
	        var item = items[i];
	        var marker$1 = new marker({
	          className: 'tooltip-circle-marker',
	          attrs: common.mix({
	            x: item.x,
	            y: item.y,
	            stroke: item.color
	          }, style)
	        });
	        markerGroup.add(marker$1);
	      }
	    } else {
	      markerGroup.addShape('rect', {
	        className: 'tooltip-rect-marker',
	        attrs: style
	      });
	    }
	  };

	  _proto.clearMarkers = function clearMarkers() {
	    var markerGroup = this.markerGroup;
	    markerGroup && markerGroup.clear();
	  };

	  _proto.show = function show() {
	    var crosshairsShapeX = this.crosshairsShapeX;
	    var crosshairsShapeY = this.crosshairsShapeY;
	    var markerGroup = this.markerGroup;
	    var container = this.container;
	    var tooltipArrow = this.tooltipArrow;
	    var xTipBox = this.xTipBox;
	    var yTipBox = this.yTipBox;
	    var canvas = this.canvas;
	    crosshairsShapeX && crosshairsShapeX.show();
	    crosshairsShapeY && crosshairsShapeY.show();
	    markerGroup && markerGroup.show();
	    container && container.show();
	    tooltipArrow && tooltipArrow.show();
	    xTipBox && xTipBox.show();
	    yTipBox && yTipBox.show();
	    canvas.draw();
	  };

	  _proto.hide = function hide() {
	    var crosshairsShapeX = this.crosshairsShapeX;
	    var crosshairsShapeY = this.crosshairsShapeY;
	    var markerGroup = this.markerGroup;
	    var container = this.container;
	    var tooltipArrow = this.tooltipArrow;
	    var xTipBox = this.xTipBox;
	    var yTipBox = this.yTipBox;
	    crosshairsShapeX && crosshairsShapeX.hide();
	    crosshairsShapeY && crosshairsShapeY.hide();
	    markerGroup && markerGroup.hide();
	    container && container.hide();
	    tooltipArrow && tooltipArrow.hide();
	    xTipBox && xTipBox.hide();
	    yTipBox && yTipBox.hide();
	  };

	  _proto.destroy = function destroy() {
	    var crosshairsShapeX = this.crosshairsShapeX;
	    var crosshairsShapeY = this.crosshairsShapeY;
	    var markerGroup = this.markerGroup;
	    var container = this.container;
	    var tooltipArrow = this.tooltipArrow;
	    var xTipBox = this.xTipBox;
	    var yTipBox = this.yTipBox;
	    crosshairsShapeX && crosshairsShapeX.remove(true);
	    crosshairsShapeY && crosshairsShapeY.remove(true);
	    markerGroup && markerGroup.remove(true);
	    tooltipArrow && tooltipArrow.remove(true);
	    container && container.clear();
	    xTipBox && xTipBox.clear();
	    yTipBox && yTipBox.clear();
	    this.destroyed = true;
	  };

	  _proto._getMarkerGroup = function _getMarkerGroup(type) {
	    var markerGroup = this.markerGroup;

	    if (!markerGroup) {
	      if (type === 'circle') {
	        markerGroup = this.frontPlot.addGroup({
	          zIndex: 1
	        });
	        this.frontPlot.sort();
	      } else {
	        markerGroup = this.backPlot.addGroup();
	      }

	      this.markerGroup = markerGroup;
	    } else {
	      markerGroup.clear();
	    }

	    return markerGroup;
	  };

	  _proto._renderCrosshairs = function _renderCrosshairs() {
	    var crosshairsType = this.crosshairsType,
	        crosshairsStyle = this.crosshairsStyle,
	        frontPlot = this.frontPlot,
	        plotRange = this.plotRange;
	    var tl = plotRange.tl,
	        br = plotRange.br;

	    if (common.directionEnabled(crosshairsType, 'x')) {
	      this.crosshairsShapeX = frontPlot.addShape('Line', {
	        className: 'tooltip-crosshairs-x',
	        zIndex: 0,
	        visible: false,
	        attrs: common.mix({
	          x1: tl.x,
	          y1: 0,
	          x2: br.x,
	          y2: 0
	        }, crosshairsStyle)
	      });
	    }

	    if (common.directionEnabled(crosshairsType, 'y')) {
	      this.crosshairsShapeY = frontPlot.addShape('Line', {
	        className: 'tooltip-crosshairs-y',
	        zIndex: 0,
	        visible: false,
	        attrs: common.mix({
	          x1: 0,
	          y1: br.y,
	          x2: 0,
	          y2: tl.y
	        }, crosshairsStyle)
	      });
	    }
	  };

	  return Tooltip;
	}();

	var tooltip = Tooltip;

	// Register the default configuration for Tooltip


	global.tooltip = common.deepMix({
	  triggerOn: 'press',
	  triggerOff: 'pressend',
	  alwaysShow: false,
	  showTitle: false,
	  showCrosshairs: false,
	  crosshairsStyle: {
	    stroke: 'rgba(0, 0, 0, 0.25)',
	    lineWidth: 1
	  },
	  showTooltipMarker: true,
	  background: {
	    radius: 1,
	    fill: 'rgba(0, 0, 0, 0.65)',
	    padding: [3, 5]
	  },
	  titleStyle: {
	    fontSize: 12,
	    fill: '#fff',
	    textAlign: 'start',
	    textBaseline: 'top'
	  },
	  nameStyle: {
	    fontSize: 12,
	    fill: 'rgba(255, 255, 255, 0.65)',
	    textAlign: 'start',
	    textBaseline: 'middle'
	  },
	  valueStyle: {
	    fontSize: 12,
	    fill: '#fff',
	    textAlign: 'start',
	    textBaseline: 'middle'
	  },
	  showItemMarker: true,
	  itemMarkerStyle: {
	    radius: 3,
	    symbol: 'circle',
	    lineWidth: 1,
	    stroke: '#fff'
	  },
	  layout: 'horizontal',
	  snap: false
	}, global.tooltip || {});

	function _getTooltipValueScale(geom) {
	  var colorAttr = geom.getAttr('color');

	  if (colorAttr) {
	    var colorScale = colorAttr.getScale(colorAttr.type);

	    if (colorScale.isLinear) {
	      return colorScale;
	    }
	  }

	  var xScale = geom.getXScale();
	  var yScale = geom.getYScale();

	  if (yScale) {
	    return yScale;
	  }

	  return xScale;
	}

	function getTooltipName(geom, origin) {
	  var name;
	  var nameScale;

	  var groupScales = geom._getGroupScales();

	  if (groupScales.length) {
	    common.each(groupScales, function (scale) {
	      nameScale = scale;
	      return false;
	    });
	  }

	  if (nameScale) {
	    var field = nameScale.field;
	    name = nameScale.getText(origin[field]);
	  } else {
	    var valueScale = _getTooltipValueScale(geom);

	    name = valueScale.alias || valueScale.field;
	  }

	  return name;
	}

	function getTooltipValue(geom, origin) {
	  var scale = _getTooltipValueScale(geom);

	  return scale.getText(origin[scale.field]);
	}

	function getTooltipTitle(geom, origin) {
	  var position = geom.getAttr('position');
	  var field = position.getFields()[0];
	  var scale = geom.get('scales')[field];
	  return scale.getText(origin[scale.field]);
	}

	function _indexOfArray(items, item) {
	  var rst = -1;
	  common.each(items, function (sub, index) {
	    if (sub.title === item.title && sub.name === item.name && sub.value === item.value && sub.color === item.color) {
	      rst = index;
	      return false;
	    }
	  });
	  return rst;
	}

	function _uniqItems(items) {
	  var tmp = [];
	  common.each(items, function (item) {
	    var index = _indexOfArray(tmp, item);

	    if (index === -1) {
	      tmp.push(item);
	    } else {
	      tmp[index] = item;
	    }
	  });
	  return tmp;
	}

	function isEqual$1(arr1, arr2) {
	  return JSON.stringify(arr1) === JSON.stringify(arr2);
	}

	var TooltipController = /*#__PURE__*/function () {
	  function TooltipController(cfg) {
	    var _this = this;

	    this.handleShowEvent = function (ev) {
	      var chart = _this.chart;
	      if (!_this.enable) return;
	      var plot = chart.get('plotRange');
	      var point = common.createEvent(ev, chart);

	      if (!helper.isPointInPlot(point, plot) && !_this._tooltipCfg.alwaysShow) {
	        // not in chart plot
	        _this.hideTooltip();

	        return;
	      }

	      var lastTimeStamp = _this.timeStamp;
	      var timeStamp = +new Date();

	      if (timeStamp - lastTimeStamp > 16) {
	        _this.showTooltip(point);

	        _this.timeStamp = timeStamp;
	      }
	    };

	    this.handleHideEvent = function () {
	      if (!_this.enable) return;

	      _this.hideTooltip();
	    };

	    this.enable = true;
	    this.cfg = {};
	    this.tooltip = null;
	    this.chart = null;
	    this.timeStamp = 0;
	    common.mix(this, cfg);
	    var _chart = this.chart;

	    var canvas = _chart.get('canvas');

	    this.canvas = canvas;
	    this.canvasDom = canvas.get('el');
	  }

	  var _proto = TooltipController.prototype;

	  _proto._setCrosshairsCfg = function _setCrosshairsCfg() {
	    var self = this;
	    var chart = self.chart;
	    var defaultCfg = common.mix({}, global.tooltip);
	    var geoms = chart.get('geoms');
	    var shapes = [];
	    common.each(geoms, function (geom) {
	      var type = geom.get('type');

	      if (shapes.indexOf(type) === -1) {
	        shapes.push(type);
	      }
	    });
	    var coordType = chart.get('coord').type;

	    if (geoms.length && (coordType === 'cartesian' || coordType === 'rect')) {
	      if (shapes.length === 1 && ['line', 'area', 'path', 'point'].indexOf(shapes[0]) !== -1) {
	        common.mix(defaultCfg, {
	          showCrosshairs: true
	        });
	      }
	    }

	    return defaultCfg;
	  };

	  _proto._getMaxLength = function _getMaxLength(cfg) {
	    if (cfg === void 0) {
	      cfg = {};
	    }

	    var _cfg = cfg,
	        layout = _cfg.layout,
	        plotRange = _cfg.plotRange;
	    return layout === 'horizontal' ? plotRange.br.x - plotRange.bl.x : plotRange.bl.y - plotRange.tr.y;
	  };

	  _proto.render = function render() {
	    var self = this;

	    if (self.tooltip) {
	      return;
	    }

	    var chart = self.chart;
	    var canvas = chart.get('canvas');
	    var frontPlot = chart.get('frontPlot').addGroup({
	      className: 'tooltipContainer',
	      zIndex: 10
	    });
	    var backPlot = chart.get('backPlot').addGroup({
	      className: 'tooltipContainer'
	    });
	    var plotRange = chart.get('plotRange');
	    var coord = chart.get('coord');

	    var defaultCfg = self._setCrosshairsCfg();

	    var cfg = self.cfg; // 通过 chart.tooltip() 接口传入的 tooltip 配置项

	    var tooltipCfg = common.deepMix({
	      plotRange: plotRange,
	      frontPlot: frontPlot,
	      backPlot: backPlot,
	      canvas: canvas,
	      fixed: coord.transposed || coord.isPolar
	    }, defaultCfg, cfg); // 创建 tooltip 实例需要的配置，不应该修改 this.cfg，即用户传入的配置

	    tooltipCfg.maxLength = self._getMaxLength(tooltipCfg);
	    this._tooltipCfg = tooltipCfg;
	    var tooltip$1 = new tooltip(tooltipCfg);
	    self.tooltip = tooltip$1;
	    self.bindEvents();
	  };

	  _proto.clear = function clear() {
	    var tooltip = this.tooltip;

	    if (tooltip) {
	      tooltip.destroy();
	      this.unBindEvents();
	    }

	    this.tooltip = null;
	    this.prePoint = null;
	    this._lastActive = null;
	  };

	  _proto._getTooltipMarkerStyle = function _getTooltipMarkerStyle(cfg) {
	    if (cfg === void 0) {
	      cfg = {};
	    }

	    var _cfg2 = cfg,
	        type = _cfg2.type,
	        items = _cfg2.items;
	    var tooltipCfg = this._tooltipCfg;

	    if (type === 'rect') {
	      var x;
	      var y;
	      var width;
	      var height;
	      var chart = this.chart;

	      var _chart$get = chart.get('plotRange'),
	          tl = _chart$get.tl,
	          br = _chart$get.br;

	      var coord = chart.get('coord');
	      var firstItem = items[0];
	      var lastItem = items[items.length - 1];
	      var intervalWidth = firstItem.width;

	      if (coord.transposed) {
	        x = tl.x;
	        y = lastItem.y - intervalWidth * 0.75;
	        width = br.x - tl.x;
	        height = firstItem.y - lastItem.y + 1.5 * intervalWidth;
	      } else {
	        x = firstItem.x - intervalWidth * 0.75;
	        y = tl.y;
	        width = lastItem.x - firstItem.x + 1.5 * intervalWidth;
	        height = br.y - tl.y;
	      }

	      cfg.style = common.mix({
	        x: x,
	        y: y,
	        width: width,
	        height: height,
	        fill: '#CCD6EC',
	        opacity: 0.3
	      }, tooltipCfg.tooltipMarkerStyle);
	    } else {
	      cfg.style = common.mix({
	        radius: 4,
	        fill: '#fff',
	        lineWidth: 2
	      }, tooltipCfg.tooltipMarkerStyle);
	    }

	    return cfg;
	  };

	  _proto._setTooltip = function _setTooltip(point, items, tooltipMarkerCfg) {
	    if (tooltipMarkerCfg === void 0) {
	      tooltipMarkerCfg = {};
	    }

	    var lastActive = this._lastActive;
	    var tooltip = this.tooltip;
	    var cfg = this._tooltipCfg;
	    items = _uniqItems(items);
	    var chart = this.chart;
	    var coord = chart.get('coord');
	    var yScale = chart.getYScales()[0];
	    var snap = cfg.snap;

	    if (snap === false && yScale.isLinear) {
	      var invertPoint = coord.invertPoint(point);
	      var plot = chart.get('plotRange');
	      var tip;
	      var pos;

	      if (helper.isPointInPlot(point, plot)) {
	        if (coord.transposed) {
	          tip = yScale.invert(invertPoint.x);
	          pos = point.x;
	          tooltip.setXTipContent(tip);
	          tooltip.setXTipPosition(pos);
	          tooltip.setYCrosshairPosition(pos);
	        } else {
	          tip = yScale.invert(invertPoint.y);
	          pos = point.y;
	          tooltip.setYTipContent(tip);
	          tooltip.setYTipPosition(pos);
	          tooltip.setXCrosshairPosition(pos);
	        }
	      }
	    }

	    if (cfg.onShow) {
	      cfg.onShow({
	        x: point.x,
	        y: point.y,
	        tooltip: tooltip,
	        items: items,
	        tooltipMarkerCfg: tooltipMarkerCfg
	      });
	    }

	    if (isEqual$1(lastActive, items)) {
	      if (snap === false && (common.directionEnabled(cfg.crosshairsType, 'y') || cfg.showYTip)) {
	        var canvas = this.chart.get('canvas');
	        canvas.draw();
	      }

	      return;
	    }

	    this._lastActive = items;
	    var onChange = cfg.onChange;

	    if (onChange) {
	      onChange({
	        x: point.x,
	        y: point.y,
	        tooltip: tooltip,
	        items: items,
	        tooltipMarkerCfg: tooltipMarkerCfg
	      });
	    }

	    var first = items[0];
	    var title = first.title || first.name;
	    var xTipPosX = first.x;

	    if (items.length > 1) {
	      xTipPosX = (items[0].x + items[items.length - 1].x) / 2;
	    }

	    tooltip.setContent(title, items, coord.transposed);
	    tooltip.setPosition(items, point);

	    if (coord.transposed) {
	      var yTipPosY = first.y;

	      if (items.length > 1) {
	        yTipPosY = (items[0].y + items[items.length - 1].y) / 2;
	      }

	      tooltip.setYTipContent(title);
	      tooltip.setYTipPosition(yTipPosY);
	      tooltip.setXCrosshairPosition(yTipPosY);

	      if (snap) {
	        tooltip.setXTipContent(first.value);
	        tooltip.setXTipPosition(xTipPosX);
	        tooltip.setYCrosshairPosition(xTipPosX);
	      }
	    } else {
	      tooltip.setXTipContent(title);
	      tooltip.setXTipPosition(xTipPosX);
	      tooltip.setYCrosshairPosition(xTipPosX);

	      if (snap) {
	        tooltip.setYTipContent(first.value);
	        tooltip.setYTipPosition(first.y);
	        tooltip.setXCrosshairPosition(first.y);
	      }
	    }

	    var markerItems = tooltipMarkerCfg.items;

	    if (cfg.showTooltipMarker && markerItems.length) {
	      tooltipMarkerCfg = this._getTooltipMarkerStyle(tooltipMarkerCfg);
	      tooltip.setMarkers(tooltipMarkerCfg);
	    } else {
	      tooltip.clearMarkers();
	    }

	    tooltip.show();
	  };

	  _proto.showTooltip = function showTooltip(point) {
	    var self = this;
	    var chart = self.chart;
	    var tooltipMarkerType;
	    var tooltipMarkerItems = [];
	    var items = [];
	    var cfg = self._tooltipCfg;
	    var marker;

	    if (cfg.showItemMarker) {
	      marker = cfg.itemMarkerStyle;
	    }

	    var geoms = chart.get('geoms');
	    var coord = chart.get('coord');
	    common.each(geoms, function (geom) {
	      if (geom.get('visible')) {
	        var type = geom.get('type');
	        var records = geom.getSnapRecords(point);
	        var adjust = geom.get('adjust'); // 漏斗图和金子塔图tooltip位置有问题，暂时不开放显示

	        if (type === 'interval' && adjust && adjust.type === 'symmetric') {
	          return;
	        }

	        common.each(records, function (record) {
	          if (record.x && record.y) {
	            var x = record.x,
	                y = record.y,
	                _origin = record._origin,
	                color = record.color;
	            var tooltipItem = {
	              x: x,
	              y: common.isArray(y) ? y[1] : y,
	              color: color || global.defaultColor,
	              origin: _origin,
	              name: getTooltipName(geom, _origin),
	              value: getTooltipValue(geom, _origin),
	              title: getTooltipTitle(geom, _origin)
	            };

	            if (marker) {
	              tooltipItem.marker = common.mix({
	                fill: color || global.defaultColor
	              }, marker);
	            }

	            items.push(tooltipItem);

	            if (['line', 'area', 'path'].indexOf(type) !== -1) {
	              tooltipMarkerType = 'circle';
	              tooltipMarkerItems.push(tooltipItem);
	            } else if (type === 'interval' && (coord.type === 'cartesian' || coord.type === 'rect')) {
	              tooltipMarkerType = 'rect';
	              tooltipItem.width = geom.getSize(record._origin);
	              tooltipMarkerItems.push(tooltipItem);
	            }
	          }
	        });
	      }
	    });

	    if (items.length) {
	      var tooltipMarkerCfg = {
	        items: tooltipMarkerItems,
	        type: tooltipMarkerType
	      };

	      self._setTooltip(point, items, tooltipMarkerCfg);
	    } else {
	      self.hideTooltip();
	    }
	  };

	  _proto.hideTooltip = function hideTooltip() {
	    var cfg = this._tooltipCfg;
	    this._lastActive = null;
	    var tooltip = this.tooltip;

	    if (tooltip) {
	      tooltip.hide();

	      if (cfg.onHide) {
	        cfg.onHide({
	          tooltip: tooltip
	        });
	      }

	      var canvas = this.chart.get('canvas');
	      canvas.draw();
	    }
	  };

	  _proto._handleEvent = function _handleEvent(methodName, method, action) {
	    var canvas = this.canvas;
	    common.each([].concat(methodName), function (aMethod) {
	      if (action === 'bind') {
	        canvas.on(aMethod, method);
	      } else {
	        canvas.off(aMethod, method);
	      }
	    });
	  };

	  _proto.bindEvents = function bindEvents() {
	    var cfg = this._tooltipCfg;
	    var triggerOn = cfg.triggerOn,
	        triggerOff = cfg.triggerOff,
	        alwaysShow = cfg.alwaysShow;
	    triggerOn && this._handleEvent(triggerOn, this.handleShowEvent, 'bind'); // 如果 !alwaysShow, 则在手势离开后就隐藏

	    if (!alwaysShow) {
	      this._handleEvent(triggerOff, this.handleHideEvent, 'bind');
	    }
	  };

	  _proto.unBindEvents = function unBindEvents() {
	    var cfg = this._tooltipCfg;
	    var triggerOn = cfg.triggerOn,
	        triggerOff = cfg.triggerOff,
	        alwaysShow = cfg.alwaysShow;
	    triggerOn && this._handleEvent(triggerOn, this.handleShowEvent, 'unBind');

	    if (!alwaysShow) {
	      this._handleEvent(triggerOff, this.handleHideEvent, 'unBind');
	    }
	  };

	  return TooltipController;
	}();

	var tooltip$1 = {
	  init: function init(chart) {
	    var tooltipController = new TooltipController({
	      chart: chart
	    });
	    chart.set('tooltipController', tooltipController);

	    chart.tooltip = function (enable, cfg) {
	      if (common.isObject(enable)) {
	        cfg = enable;
	        enable = true;
	      }

	      tooltipController.enable = enable;

	      if (cfg) {
	        tooltipController.cfg = cfg;
	      }

	      return this;
	    };
	  },
	  afterGeomDraw: function afterGeomDraw(chart) {
	    var tooltipController = chart.get('tooltipController');
	    tooltipController.render();

	    chart.showTooltip = function (point) {
	      tooltipController.showTooltip(point);
	      return this;
	    };

	    chart.hideTooltip = function () {
	      tooltipController.hideTooltip();
	      return this;
	    };
	  },
	  clearInner: function clearInner(chart) {
	    var tooltipController = chart.get('tooltipController');
	    tooltipController.clear();
	  }
	};

	var LEGEND_GAP = 12;
	var MARKER_SIZE = 3;
	var DEFAULT_CFG = {
	  itemMarginBottom: 12,
	  itemGap: 10,
	  showTitle: false,
	  titleStyle: {
	    fontSize: 12,
	    fill: '#808080',
	    textAlign: 'start',
	    textBaseline: 'top'
	  },
	  nameStyle: {
	    fill: '#808080',
	    fontSize: 12,
	    textAlign: 'start',
	    textBaseline: 'middle'
	  },
	  valueStyle: {
	    fill: '#000000',
	    fontSize: 12,
	    textAlign: 'start',
	    textBaseline: 'middle'
	  },
	  unCheckStyle: {
	    fill: '#bfbfbf'
	  },
	  itemWidth: 'auto',
	  wordSpace: 6,
	  selectedMode: 'multiple' // 'multiple' or 'single'

	}; // Register the default configuration for Legend

	global.legend = common.deepMix({
	  common: DEFAULT_CFG,
	  // common legend configuration
	  right: common.mix({
	    position: 'right',
	    layout: 'vertical'
	  }, DEFAULT_CFG),
	  left: common.mix({
	    position: 'left',
	    layout: 'vertical'
	  }, DEFAULT_CFG),
	  top: common.mix({
	    position: 'top',
	    layout: 'horizontal'
	  }, DEFAULT_CFG),
	  bottom: common.mix({
	    position: 'bottom',
	    layout: 'horizontal'
	  }, DEFAULT_CFG)
	}, global.legend || {});

	function getPaddingByPos(pos, appendPadding) {
	  var padding = 0;
	  appendPadding = common.parsePadding(appendPadding);

	  switch (pos) {
	    case 'top':
	      padding = appendPadding[0];
	      break;

	    case 'right':
	      padding = appendPadding[1];
	      break;

	    case 'bottom':
	      padding = appendPadding[2];
	      break;

	    case 'left':
	      padding = appendPadding[3];
	      break;
	  }

	  return padding;
	}

	var LegendController = /*#__PURE__*/function () {
	  function LegendController(cfg) {
	    var _this = this;

	    this.handleEvent = function (ev) {
	      var self = _this;

	      function findItem(x, y) {
	        var result = null;
	        var legends = self.legends;
	        common.each(legends, function (legendItems) {
	          common.each(legendItems, function (legend) {
	            var itemsGroup = legend.itemsGroup,
	                legendHitBoxes = legend.legendHitBoxes;
	            var children = itemsGroup.get('children');

	            if (children.length) {
	              var legendPosX = legend.x;
	              var legendPosY = legend.y;
	              common.each(legendHitBoxes, function (box, index) {
	                if (x >= box.x + legendPosX && x <= box.x + box.width + legendPosX && y >= box.y + legendPosY && y <= box.height + box.y + legendPosY) {
	                  // inbox
	                  result = {
	                    clickedItem: children[index],
	                    clickedLegend: legend
	                  };
	                  return false;
	                }
	              });
	            }
	          });
	        });
	        return result;
	      }

	      var chart = self.chart;

	      var _Util$createEvent = common.createEvent(ev, chart),
	          x = _Util$createEvent.x,
	          y = _Util$createEvent.y;

	      var clicked = findItem(x, y);

	      if (clicked && clicked.clickedLegend.clickable !== false) {
	        var clickedItem = clicked.clickedItem,
	            clickedLegend = clicked.clickedLegend;

	        if (clickedLegend.onClick) {
	          ev.clickedItem = clickedItem;
	          clickedLegend.onClick(ev);
	        } else if (!clickedLegend.custom) {
	          var checked = clickedItem.get('checked');
	          var value = clickedItem.get('dataValue');
	          var filteredVals = clickedLegend.filteredVals,
	              field = clickedLegend.field,
	              selectedMode = clickedLegend.selectedMode;
	          var isSingeSelected = selectedMode === 'single';

	          if (isSingeSelected) {
	            chart.filter(field, function (val) {
	              return val === value;
	            });
	          } else {
	            if (checked) {
	              filteredVals.push(value);
	            } else {
	              common.Array.remove(filteredVals, value);
	            }

	            chart.filter(field, function (val) {
	              return filteredVals.indexOf(val) === -1;
	            });
	          }

	          chart.repaint();
	        }
	      }
	    };

	    this.legendCfg = {};
	    this.enable = true;
	    this.position = 'top';
	    common.mix(this, cfg);
	    var _chart = this.chart;
	    this.canvasDom = _chart.get('canvas').get('el');
	    this.clear();
	  }

	  var _proto = LegendController.prototype;

	  _proto.addLegend = function addLegend(scale, items, filteredVals) {
	    var self = this;
	    var legendCfg = self.legendCfg;
	    var field = scale.field;
	    var fieldCfg = legendCfg[field];

	    if (fieldCfg === false) {
	      return null;
	    }

	    if (fieldCfg && fieldCfg.custom) {
	      self.addCustomLegend(field);
	    } else {
	      var position = legendCfg.position || self.position;

	      if (fieldCfg && fieldCfg.position) {
	        position = fieldCfg.position;
	      }

	      if (scale.isCategory) {
	        self._addCategoryLegend(scale, items, position, filteredVals);
	      }
	    }
	  };

	  _proto.addCustomLegend = function addCustomLegend(field) {
	    var self = this;
	    var legendCfg = self.legendCfg;

	    if (field && legendCfg[field]) {
	      legendCfg = legendCfg[field];
	    }

	    var position = legendCfg.position || self.position;
	    var legends = self.legends;
	    legends[position] = legends[position] || [];
	    var items = legendCfg.items;

	    if (!items) {
	      return null;
	    }

	    var container = self.container;
	    common.each(items, function (item) {
	      if (!common.isPlainObject(item.marker)) {
	        item.marker = {
	          symbol: item.marker || 'circle',
	          fill: item.fill,
	          radius: MARKER_SIZE
	        };
	      } else {
	        item.marker.radius = item.marker.radius || MARKER_SIZE;
	      }

	      item.checked = common.isNil(item.checked) ? true : item.checked;
	      item.name = item.name || item.value;
	    });
	    var legend = new list(common.deepMix({}, global.legend[position], legendCfg, {
	      maxLength: self._getMaxLength(position),
	      items: items,
	      parent: container
	    }));
	    legends[position].push(legend);
	  };

	  _proto.clear = function clear() {
	    var legends = this.legends;
	    common.each(legends, function (legendItems) {
	      common.each(legendItems, function (legend) {
	        legend.clear();
	      });
	    });
	    this.legends = {};
	    this.unBindEvents();
	  };

	  _proto._isFiltered = function _isFiltered(scale, values, value) {
	    var rst = false;
	    common.each(values, function (val) {
	      rst = rst || scale.getText(val) === scale.getText(value);

	      if (rst) {
	        return false;
	      }
	    });
	    return rst;
	  };

	  _proto._getMaxLength = function _getMaxLength(position) {
	    var chart = this.chart;
	    var appendPadding = common.parsePadding(chart.get('appendPadding'));
	    return position === 'right' || position === 'left' ? chart.get('height') - (appendPadding[0] + appendPadding[2]) : chart.get('width') - (appendPadding[1] + appendPadding[3]);
	  };

	  _proto._addCategoryLegend = function _addCategoryLegend(scale, items, position, filteredVals) {
	    var self = this;
	    var legendCfg = self.legendCfg,
	        legends = self.legends,
	        container = self.container,
	        chart = self.chart;
	    var field = scale.field;
	    legends[position] = legends[position] || [];
	    var symbol = 'circle';

	    if (legendCfg[field] && legendCfg[field].marker) {
	      symbol = legendCfg[field].marker;
	    } else if (legendCfg.marker) {
	      symbol = legendCfg.marker;
	    }

	    common.each(items, function (item) {
	      if (common.isPlainObject(symbol)) {
	        common.mix(item.marker, symbol);
	      } else {
	        item.marker.symbol = symbol;
	      }

	      if (filteredVals) {
	        item.checked = !self._isFiltered(scale, filteredVals, item.dataValue);
	      }
	    });
	    var legendItems = chart.get('legendItems');
	    legendItems[field] = items;
	    var lastCfg = common.deepMix({}, global.legend[position], legendCfg[field] || legendCfg, {
	      maxLength: self._getMaxLength(position),
	      items: items,
	      field: field,
	      filteredVals: filteredVals,
	      parent: container
	    });

	    if (lastCfg.showTitle) {
	      common.deepMix(lastCfg, {
	        title: scale.alias || scale.field
	      });
	    }

	    var legend = new list(lastCfg);
	    legends[position].push(legend);
	    return legend;
	  };

	  _proto._alignLegend = function _alignLegend(legend, pre, position) {
	    var self = this;
	    var _self$plotRange = self.plotRange,
	        tl = _self$plotRange.tl,
	        bl = _self$plotRange.bl;
	    var chart = self.chart;
	    var offsetX = legend.offsetX || 0;
	    var offsetY = legend.offsetY || 0;
	    var chartWidth = chart.get('width');
	    var chartHeight = chart.get('height');
	    var appendPadding = common.parsePadding(chart.get('appendPadding'));
	    var legendHeight = legend.getHeight();
	    var legendWidth = legend.getWidth();
	    var x = 0;
	    var y = 0;

	    if (position === 'left' || position === 'right') {
	      var verticalAlign = legend.verticalAlign || 'middle';
	      var height = Math.abs(tl.y - bl.y);
	      x = position === 'left' ? appendPadding[3] : chartWidth - legendWidth - appendPadding[1];
	      y = (height - legendHeight) / 2 + tl.y;

	      if (verticalAlign === 'top') {
	        y = tl.y;
	      } else if (verticalAlign === 'bottom') {
	        y = bl.y - legendHeight;
	      }

	      if (pre) {
	        y = pre.get('y') - legendHeight - LEGEND_GAP;
	      }
	    } else {
	      var align = legend.align || 'left';
	      x = appendPadding[3];

	      if (align === 'center') {
	        x = chartWidth / 2 - legendWidth / 2;
	      } else if (align === 'right') {
	        x = chartWidth - (legendWidth + appendPadding[1]);
	      }

	      y = position === 'top' ? appendPadding[0] + Math.abs(legend.container.getBBox().minY) : chartHeight - legendHeight;

	      if (pre) {
	        var preWidth = pre.getWidth();
	        x = pre.x + preWidth + LEGEND_GAP;
	      }
	    }

	    if (position === 'bottom' && offsetY > 0) {
	      offsetY = 0;
	    }

	    if (position === 'right' && offsetX > 0) {
	      offsetX = 0;
	    }

	    legend.moveTo(x + offsetX, y + offsetY);
	  };

	  _proto.alignLegends = function alignLegends() {
	    var self = this;
	    var legends = self.legends;
	    common.each(legends, function (legendItems, position) {
	      common.each(legendItems, function (legend, index) {
	        var pre = legendItems[index - 1];

	        self._alignLegend(legend, pre, position);
	      });
	    });
	    return self;
	  };

	  _proto.bindEvents = function bindEvents() {
	    var legendCfg = this.legendCfg;
	    var triggerOn = legendCfg.triggerOn || 'touchstart';
	    common.addEventListener(this.canvasDom, triggerOn, this.handleEvent);
	  };

	  _proto.unBindEvents = function unBindEvents() {
	    var legendCfg = this.legendCfg;
	    var triggerOn = legendCfg.triggerOn || 'touchstart';
	    common.removeEventListener(this.canvasDom, triggerOn, this.handleEvent);
	  };

	  return LegendController;
	}();

	var legend = {
	  init: function init(chart) {
	    var legendController = new LegendController({
	      container: chart.get('backPlot'),
	      plotRange: chart.get('plotRange'),
	      chart: chart
	    });
	    chart.set('legendController', legendController);

	    chart.legend = function (field, cfg) {
	      var legendCfg = legendController.legendCfg;
	      legendController.enable = true;

	      if (common.isBoolean(field)) {
	        legendController.enable = field;
	        legendCfg = cfg || {};
	      } else if (common.isObject(field)) {
	        legendCfg = field;
	      } else {
	        legendCfg[field] = cfg;
	      }

	      legendController.legendCfg = legendCfg;
	      return this;
	    };
	  },
	  beforeGeomDraw: function beforeGeomDraw(chart) {
	    var legendController = chart.get('legendController');
	    if (!legendController.enable) return null; // legend is not displayed

	    var legendCfg = legendController.legendCfg;

	    if (legendCfg && legendCfg.custom) {
	      legendController.addCustomLegend();
	    } else {
	      var legendItems = chart.getLegendItems();
	      var scales = chart.get('scales');
	      var filters = chart.get('filters');
	      common.each(legendItems, function (items, field) {
	        var scale = scales[field];
	        var values = scale.values;
	        var filteredVals;

	        if (filters && filters[field]) {
	          filteredVals = values.filter(function (v) {
	            return !filters[field](v);
	          });
	        } else {
	          filteredVals = [];
	        }

	        legendController.addLegend(scale, items, filteredVals);
	      });
	    }

	    if (legendCfg && legendCfg.clickable !== false) {
	      legendController.bindEvents();
	    }

	    var legends = legendController.legends;
	    var legendRange = {
	      top: 0,
	      right: 0,
	      bottom: 0,
	      left: 0
	    };
	    common.each(legends, function (legendItems, position) {
	      var padding = 0;
	      common.each(legendItems, function (legend) {
	        var width = legend.getWidth();
	        var height = legend.getHeight();

	        if (position === 'top' || position === 'bottom') {
	          padding = Math.max(padding, height);

	          if (legend.offsetY > 0) {
	            padding += legend.offsetY;
	          }
	        } else {
	          padding = Math.max(padding, width);

	          if (legend.offsetX > 0) {
	            padding += legend.offsetX;
	          }
	        }
	      });
	      legendRange[position] = padding + getPaddingByPos(position, chart.get('appendPadding'));
	    });
	    chart.set('legendRange', legendRange);
	  },
	  afterGeomDraw: function afterGeomDraw(chart) {
	    var legendController = chart.get('legendController');
	    legendController.alignLegends();
	  },
	  clearInner: function clearInner(chart) {
	    var legendController = chart.get('legendController');
	    legendController.clear();
	    chart.set('legendRange', null);
	  }
	};

	var isDate$1 = function isDate(value) {
	  return isType_1(value, 'Date');
	};

	var isDate_1 = isDate$1;

	/**
	 * @fileOverview 提取公共代码到util方法
	 * @author dxq613@gmail.com
	 */




	var timeUtil = {
	  toTimeStamp: function toTimeStamp(value) {
	    if (isString_1(value)) {
	      if (value.indexOf('T') > 0) {
	        value = new Date(value).getTime();
	      } else {
	        value = new Date(value.replace(/-/ig, '/')).getTime();
	      }
	    }

	    if (isDate_1(value)) {
	      value = value.getTime();
	    }

	    return value;
	  }
	};

	var helper$1 = {
	  getColDef: function getColDef(chart, field) {
	    var colDef;

	    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
	      colDef = chart.get('colDefs')[field];
	    }

	    return colDef;
	  },
	  getScale: function getScale(chart, field) {
	    var scales = chart.get('scales');
	    return scales[field];
	  },
	  getFieldRange: function getFieldRange(scale, limitRange, type) {
	    if (!scale) return [0, 1];
	    var minRatio = 0;
	    var maxRatio = 0;

	    if (type === 'linear') {
	      var min = limitRange.min,
	          max = limitRange.max;
	      minRatio = (scale.min - min) / (max - min);
	      maxRatio = (scale.max - min) / (max - min);
	    } else {
	      var originValues = limitRange;
	      var values = scale.values || [];
	      var firstIndex = originValues.indexOf(values[0]);
	      var lastIndex = originValues.indexOf(values[values.length - 1]);
	      minRatio = firstIndex / (originValues.length - 1);
	      maxRatio = lastIndex / (originValues.length - 1);
	    }

	    return [minRatio, maxRatio];
	  },
	  getLimitRange: function getLimitRange(data, scale) {
	    var result;
	    var field = scale.field,
	        type = scale.type;
	    var values = common.Array.values(data, field);

	    if (type === 'linear') {
	      result = common.Array.getRange(values);

	      if (scale.min < result.min) {
	        result.min = scale.min;
	      }

	      if (scale.max > result.max) {
	        result.max = scale.max;
	      }
	    } else if (type === 'timeCat') {
	      common.each(values, function (v, i) {
	        values[i] = timeUtil.toTimeStamp(v);
	      });
	      values.sort(function (v1, v2) {
	        return v1 - v2;
	      });
	      result = values;
	    } else {
	      result = values;
	    }

	    return result;
	  }
	};

	var DEFAULT_CFG$1 = {
	  mode: 'x',
	  xStyle: {
	    backgroundColor: 'rgba(202, 215, 239, .2)',
	    fillerColor: 'rgba(202, 215, 239, .5)',
	    size: 4,
	    lineCap: 'round',
	    offsetX: 0,
	    offsetY: 8
	  },
	  yStyle: {
	    backgroundColor: 'rgba(202, 215, 239, .2)',
	    fillerColor: 'rgba(202, 215, 239, .5)',
	    size: 4,
	    lineCap: 'round',
	    offsetX: 8,
	    offsetY: 0
	  }
	};
	var scrollBar = {
	  init: function init(chart) {
	    chart.set('_limitRange', {});

	    chart.scrollBar = function (cfg) {
	      if (cfg === true) {
	        cfg = DEFAULT_CFG$1;
	      } else if (common.isObject(cfg)) {
	        cfg = common.deepMix({}, DEFAULT_CFG$1, cfg);
	      }

	      this.set('_scrollBarCfg', cfg);
	    };
	  },
	  clear: function clear(chart) {
	    chart.set('_limitRange', {});
	  },
	  changeData: function changeData(chart) {
	    chart.set('_limitRange', {});
	  },
	  clearInner: function clearInner(chart) {
	    var hBar = chart.get('_horizontalBar');
	    var vBar = chart.get('_verticalBar');
	    hBar && hBar.remove(true);
	    vBar && vBar.remove(true);
	    chart.set('_horizontalBar', null);
	    chart.set('_verticalBar', null);
	  },
	  afterGeomDraw: function afterGeomDraw(chart) {
	    var scrollBarCfg = chart.get('_scrollBarCfg');
	    if (!scrollBarCfg) return;
	    var data = chart.get('data');
	    var plotRange = chart.get('plotRange');
	    var backPlot = chart.get('backPlot');
	    var canvas = chart.get('canvas');
	    var canvasHeight = canvas.get('height');
	    var limitRange = chart.get('_limitRange');
	    var mode = scrollBarCfg.mode;

	    if (common.directionEnabled(mode, 'x')) {
	      var _scrollBarCfg$xStyle = scrollBarCfg.xStyle,
	          offsetX = _scrollBarCfg$xStyle.offsetX,
	          offsetY = _scrollBarCfg$xStyle.offsetY,
	          lineCap = _scrollBarCfg$xStyle.lineCap,
	          backgroundColor = _scrollBarCfg$xStyle.backgroundColor,
	          fillerColor = _scrollBarCfg$xStyle.fillerColor,
	          size = _scrollBarCfg$xStyle.size;
	      var xScale = chart.getXScale();
	      var xLimitRange = limitRange[xScale.field];

	      if (!xLimitRange) {
	        xLimitRange = helper$1.getLimitRange(data, xScale);
	        limitRange[xScale.field] = xLimitRange;
	      }

	      var currentRange = helper$1.getFieldRange(xScale, xLimitRange, xScale.type);
	      var horizontalBar = chart.get('_horizontalBar');
	      var yPos = canvasHeight - size / 2 + offsetY;

	      if (horizontalBar) {
	        var progressLine = horizontalBar.get('children')[1];
	        progressLine.attr({
	          x1: Math.max(plotRange.bl.x + plotRange.width * currentRange[0] + offsetX, plotRange.bl.x),
	          x2: Math.min(plotRange.bl.x + plotRange.width * currentRange[1] + offsetX, plotRange.br.x)
	        });
	      } else {
	        horizontalBar = backPlot.addGroup({
	          className: 'horizontalBar'
	        });
	        horizontalBar.addShape('line', {
	          attrs: {
	            x1: plotRange.bl.x + offsetX,
	            y1: yPos,
	            x2: plotRange.br.x + offsetX,
	            y2: yPos,
	            lineWidth: size,
	            stroke: backgroundColor,
	            lineCap: lineCap
	          }
	        });
	        horizontalBar.addShape('line', {
	          attrs: {
	            x1: Math.max(plotRange.bl.x + plotRange.width * currentRange[0] + offsetX, plotRange.bl.x),
	            y1: yPos,
	            x2: Math.min(plotRange.bl.x + plotRange.width * currentRange[1] + offsetX, plotRange.br.x),
	            y2: yPos,
	            lineWidth: size,
	            stroke: fillerColor,
	            lineCap: lineCap
	          }
	        });
	        chart.set('_horizontalBar', horizontalBar);
	      }
	    }

	    if (common.directionEnabled(mode, 'y')) {
	      var _scrollBarCfg$yStyle = scrollBarCfg.yStyle,
	          _offsetX = _scrollBarCfg$yStyle.offsetX,
	          _offsetY = _scrollBarCfg$yStyle.offsetY,
	          _lineCap = _scrollBarCfg$yStyle.lineCap,
	          _backgroundColor = _scrollBarCfg$yStyle.backgroundColor,
	          _fillerColor = _scrollBarCfg$yStyle.fillerColor,
	          _size = _scrollBarCfg$yStyle.size;
	      var yScale = chart.getYScales()[0];
	      var yLimitRange = limitRange[yScale.field];

	      if (!yLimitRange) {
	        yLimitRange = helper$1.getLimitRange(data, yScale);
	        limitRange[yScale.field] = yLimitRange;
	      }

	      var _currentRange = helper$1.getFieldRange(yScale, yLimitRange, yScale.type);

	      var verticalBar = chart.get('_verticalBar');
	      var xPos = _size / 2 + _offsetX;

	      if (verticalBar) {
	        var _progressLine = verticalBar.get('children')[1];

	        _progressLine.attr({
	          y1: Math.max(plotRange.tl.y + plotRange.height * _currentRange[0] + _offsetY, plotRange.tl.y),
	          y2: Math.min(plotRange.tl.y + plotRange.height * _currentRange[1] + _offsetY, plotRange.bl.y)
	        });
	      } else {
	        verticalBar = backPlot.addGroup({
	          className: 'verticalBar'
	        });
	        verticalBar.addShape('line', {
	          attrs: {
	            x1: xPos,
	            y1: plotRange.tl.y + _offsetY,
	            x2: xPos,
	            y2: plotRange.bl.y + _offsetY,
	            lineWidth: _size,
	            stroke: _backgroundColor,
	            lineCap: _lineCap
	          }
	        });
	        verticalBar.addShape('line', {
	          attrs: {
	            x1: xPos,
	            y1: Math.max(plotRange.tl.y + plotRange.height * _currentRange[0] + _offsetY, plotRange.tl.y),
	            x2: xPos,
	            y2: Math.min(plotRange.tl.y + plotRange.height * _currentRange[1] + _offsetY, plotRange.bl.y),
	            lineWidth: _size,
	            stroke: _fillerColor,
	            lineCap: _lineCap
	          }
	        });
	        chart.set('_verticalBar', verticalBar);
	      }
	    }
	  }
	};

	/**
	 * @fileOverview shape util
	 * @author dxq613@gmail.com
	 */


	var ShapeUtil = {
	  splitPoints: function splitPoints(obj) {
	    var points = [];
	    var x = obj.x;
	    var y = obj.y;
	    y = common.isArray(y) ? y : [y];
	    y.forEach(function (yItem, index) {
	      var point = {
	        x: common.isArray(x) ? x[index] : x,
	        y: yItem
	      };
	      points.push(point);
	    });
	    return points;
	  },
	  splitArray: function splitArray(data, yField, connectNulls) {
	    if (!data.length) return [];
	    var arr = [];
	    var tmp = [];
	    var yValue;
	    common.each(data, function (obj) {
	      yValue = obj._origin ? obj._origin[yField] : obj[yField];

	      if (connectNulls) {
	        if (!common.isNil(yValue)) {
	          tmp.push(obj);
	        }
	      } else {
	        if (common.isArray(yValue) && common.isNil(yValue[0]) || common.isNil(yValue)) {
	          if (tmp.length) {
	            arr.push(tmp);
	            tmp = [];
	          }
	        } else {
	          tmp.push(obj);
	        }
	      }
	    });

	    if (tmp.length) {
	      arr.push(tmp);
	    }

	    return arr;
	  }
	};
	var util$2 = ShapeUtil;

	// register line geom


	var Line$2 = shape$1.registerFactory('line', {
	  defaultShapeType: 'line'
	});

	function getStyle(cfg) {
	  var style = {
	    strokeStyle: cfg.color
	  };

	  if (cfg.size >= 0) {
	    style.lineWidth = cfg.size;
	  }

	  common.mix(style, cfg.style);
	  return common.mix({}, global.shape.line, style);
	}

	function drawLines(cfg, container, style, smooth) {
	  var points = cfg.points;

	  if (points.length && common.isArray(points[0].y)) {
	    var topPoints = [];
	    var bottomPoints = [];

	    for (var i = 0, len = points.length; i < len; i++) {
	      var point = points[i];
	      var tmp = util$2.splitPoints(point);
	      bottomPoints.push(tmp[0]);
	      topPoints.push(tmp[1]);
	    }

	    if (cfg.isInCircle) {
	      topPoints.push(topPoints[0]);
	      bottomPoints.push(bottomPoints[0]);
	    }

	    if (cfg.isStack) {
	      return container.addShape('Polyline', {
	        className: 'line',
	        attrs: common.mix({
	          points: topPoints,
	          smooth: smooth
	        }, style)
	      });
	    }

	    var topShape = container.addShape('Polyline', {
	      className: 'line',
	      attrs: common.mix({
	        points: topPoints,
	        smooth: smooth
	      }, style)
	    });
	    var bottomShape = container.addShape('Polyline', {
	      className: 'line',
	      attrs: common.mix({
	        points: bottomPoints,
	        smooth: smooth
	      }, style)
	    });
	    return [topShape, bottomShape];
	  }

	  if (cfg.isInCircle) {
	    points.push(points[0]);
	  }

	  return container.addShape('Polyline', {
	    className: 'line',
	    attrs: common.mix({
	      points: points,
	      smooth: smooth
	    }, style)
	  });
	}

	var SHAPES = ['line', 'smooth', 'dash'];
	common.each(SHAPES, function (shapeType) {
	  shape$1.registerShape('line', shapeType, {
	    draw: function draw(cfg, container) {
	      var smooth = shapeType === 'smooth';
	      var style = getStyle(cfg);

	      if (shapeType === 'dash') {
	        style.lineDash = global.lineDash;
	      }

	      return drawLines(cfg, container, style, smooth);
	    }
	  });
	});

	var _possibleConstructorReturn2$i = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$i = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$i = interopRequireDefault(inheritsLoose);









	var Path = /*#__PURE__*/function (_Geom) {
	  (0, _inheritsLoose2$i["default"])(Path, _Geom);

	  function Path() {
	    return _Geom.apply(this, arguments) || this;
	  }

	  var _proto = Path.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    var cfg = _Geom.prototype.getDefaultCfg.call(this);

	    cfg.type = 'path';
	    cfg.shapeType = 'line';
	    return cfg;
	  };

	  _proto.getDrawCfg = function getDrawCfg(obj) {
	    var cfg = _Geom.prototype.getDrawCfg.call(this, obj);

	    cfg.isStack = this.hasAdjust('stack');
	    return cfg;
	  };

	  _proto.draw = function draw(data, shapeFactory) {
	    var self = this;
	    var container = self.get('container');
	    var yScale = self.getYScale();
	    var connectNulls = self.get('connectNulls');
	    var splitArray = util$2.splitArray(data, yScale.field, connectNulls);
	    var cfg = this.getDrawCfg(data[0]);
	    cfg.origin = data;
	    common.each(splitArray, function (subData, splitedIndex) {
	      cfg.splitedIndex = splitedIndex;
	      cfg.points = subData;
	      self.drawShape(cfg.shape, data[0], cfg, container, shapeFactory);
	    });
	  };

	  return Path;
	}(base$4);

	base$4.Path = Path;
	var path = Path;

	var _possibleConstructorReturn2$j = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$j = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$j = interopRequireDefault(inheritsLoose);







	var Line$3 = /*#__PURE__*/function (_Path) {
	  (0, _inheritsLoose2$j["default"])(Line, _Path);

	  function Line() {
	    return _Path.apply(this, arguments) || this;
	  }

	  var _proto = Line.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    var cfg = _Path.prototype.getDefaultCfg.call(this);

	    cfg.type = 'line';
	    cfg.sortable = true;
	    return cfg;
	  };

	  return Line;
	}(path);

	base$4.Line = Line$3;

	/**
	 * @fileOverview Utility for calculate the with ratui in x axis
	 * @author sima.zhang1990@gmail.com
	 * @author dxq613@gmail.com
	 */




	var SizeMixin = {
	  initEvent: function initEvent() {
	    var _this = this;

	    var chart = this.get('chart');

	    if (!chart) {
	      return;
	    }

	    chart.on(_const.EVENT_AFTER_SIZE_CHANGE, function () {
	      _this.set('_width', null);
	    });
	  },
	  getDefalutSize: function getDefalutSize() {
	    var defaultSize = this.get('defaultSize');

	    if (!defaultSize) {
	      var coord = this.get('coord');
	      var xScale = this.getXScale();
	      var dataArray = this.get('dataArray');
	      var values = common.uniq(xScale.values);
	      var count = values.length;
	      var range = xScale.range;
	      var normalizeSize = 1 / count;
	      var widthRatio = 1;

	      if (coord && coord.isPolar) {
	        if (coord.transposed && count > 1) {
	          widthRatio = global.widthRatio.multiplePie;
	        } else {
	          widthRatio = global.widthRatio.rose;
	        }
	      } else {
	        if (xScale.isLinear) {
	          normalizeSize *= range[1] - range[0];
	        }

	        widthRatio = global.widthRatio.column;
	      }

	      normalizeSize *= widthRatio;

	      if (this.hasAdjust('dodge')) {
	        normalizeSize = normalizeSize / dataArray.length;
	      }

	      defaultSize = normalizeSize;
	      this.set('defaultSize', defaultSize);
	    }

	    return defaultSize;
	  },
	  getDimWidth: function getDimWidth(dimName) {
	    var coord = this.get('coord');
	    var start = coord.convertPoint({
	      x: 0,
	      y: 0
	    });
	    var end = coord.convertPoint({
	      x: dimName === 'x' ? 1 : 0,
	      y: dimName === 'x' ? 0 : 1
	    });
	    var width = 0;

	    if (start && end) {
	      width = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
	    }

	    return width;
	  },
	  _getWidth: function _getWidth() {
	    var width = this.get('_width');

	    if (!width) {
	      var coord = this.get('coord');

	      if (coord && coord.isPolar && !coord.transposed) {
	        width = (coord.endAngle - coord.startAngle) * coord.circleRadius;
	      } else {
	        width = this.getDimWidth('x');
	      }

	      this.set('_width', width);
	    }

	    return width;
	  },
	  _toNormalizedSize: function _toNormalizedSize(size) {
	    var width = this._getWidth();

	    return size / width;
	  },
	  _toCoordSize: function _toCoordSize(normalizeSize) {
	    var width = this._getWidth();

	    return width * normalizeSize;
	  },
	  getNormalizedSize: function getNormalizedSize(obj) {
	    var size = this.getAttrValue('size', obj);

	    if (common.isNil(size)) {
	      size = this.getDefalutSize();
	    } else {
	      size = this._toNormalizedSize(size);
	    }

	    return size;
	  },
	  getSize: function getSize(obj) {
	    var size = this.getAttrValue('size', obj);

	    if (common.isNil(size)) {
	      var normalizeSize = this.getDefalutSize();
	      size = this._toCoordSize(normalizeSize);
	    }

	    return size;
	  }
	};
	var size$2 = SizeMixin;

	function getRectPoints(cfg) {
	  var x = cfg.x,
	      y = cfg.y,
	      y0 = cfg.y0,
	      size = cfg.size;
	  var ymin = y0;
	  var ymax = y;

	  if (common.isArray(y)) {
	    ymax = y[1];
	    ymin = y[0];
	  }

	  var xmin;
	  var xmax;

	  if (common.isArray(x)) {
	    xmin = x[0];
	    xmax = x[1];
	  } else {
	    xmin = x - size / 2;
	    xmax = x + size / 2;
	  }

	  return [{
	    x: xmin,
	    y: ymin
	  }, {
	    x: xmin,
	    y: ymax
	  }, {
	    x: xmax,
	    y: ymax
	  }, {
	    x: xmax,
	    y: ymin
	  }];
	}

	function getRectRange(points) {
	  var xValues = [];
	  var yValues = [];

	  for (var i = 0, len = points.length; i < len; i++) {
	    var point = points[i];
	    xValues.push(point.x);
	    yValues.push(point.y);
	  }

	  var xMin = Math.min.apply(null, xValues);
	  var yMin = Math.min.apply(null, yValues);
	  var xMax = Math.max.apply(null, xValues);
	  var yMax = Math.max.apply(null, yValues);
	  return {
	    x: xMin,
	    y: yMin,
	    width: xMax - xMin,
	    height: yMax - yMin
	  };
	}

	function getMiddlePoint(a, b) {
	  var x = (a.x - b.x) / 2 + b.x;
	  var y = (a.y - b.y) / 2 + b.y;
	  return {
	    x: x,
	    y: y
	  };
	}

	var Interval = shape$1.registerFactory('interval', {
	  defaultShapeType: 'rect',
	  getDefaultPoints: function getDefaultPoints(cfg) {
	    return getRectPoints(cfg);
	  }
	});
	shape$1.registerShape('interval', 'rect', {
	  draw: function draw(cfg, container) {
	    var points = this.parsePoints(cfg.points);
	    var style = common.mix({
	      fill: cfg.color
	    }, global.shape.interval, cfg.style);

	    if (cfg.isInCircle) {
	      var newPoints = points.slice(0);

	      if (this._coord.transposed) {
	        newPoints = [points[0], points[3], points[2], points[1]];
	      }

	      var _cfg$center = cfg.center,
	          x = _cfg$center.x,
	          y = _cfg$center.y;
	      var v = [1, 0];
	      var v0 = [newPoints[0].x - x, newPoints[0].y - y];
	      var v1 = [newPoints[1].x - x, newPoints[1].y - y];
	      var v2 = [newPoints[2].x - x, newPoints[2].y - y];
	      var startAngle = vector2.angleTo(v, v1);
	      var endAngle = vector2.angleTo(v, v2);
	      var r0 = vector2.length(v0);
	      var r = vector2.length(v1);

	      if (startAngle >= 1.5 * Math.PI) {
	        startAngle = startAngle - 2 * Math.PI;
	      }

	      if (endAngle >= 1.5 * Math.PI) {
	        endAngle = endAngle - 2 * Math.PI;
	      }

	      return container.addShape('Sector', {
	        className: 'interval',
	        attrs: common.mix({
	          x: x,
	          y: y,
	          r: r,
	          r0: r0,
	          startAngle: startAngle,
	          endAngle: endAngle
	        }, style)
	      });
	    }

	    var rectCfg = getRectRange(points);
	    return container.addShape('rect', {
	      className: 'interval',
	      attrs: common.mix(rectCfg, style)
	    });
	  }
	}); // 金字塔 和 漏斗图

	['pyramid', 'funnel'].forEach(function (shapeType) {
	  shape$1.registerShape('interval', shapeType, {
	    getPoints: function getPoints(cfg) {
	      cfg.size = cfg.size * 2; // 漏斗图的 size 是柱状图的两倍

	      return getRectPoints(cfg);
	    },
	    draw: function draw(cfg, container) {
	      var points = this.parsePoints(cfg.points);
	      var nextPoints = this.parsePoints(cfg.nextPoints);
	      var polygonPoints = null;

	      if (nextPoints) {
	        polygonPoints = [points[0], points[1], nextPoints[1], nextPoints[0]];
	      } else {
	        polygonPoints = [points[0], points[1]]; // pyramid 顶部是三角形，所以取中心点就好了，funnel顶部是长方形

	        if (shapeType === 'pyramid') {
	          polygonPoints.push(getMiddlePoint(points[2], points[3]));
	        } else {
	          polygonPoints.push(points[2], points[3]);
	        }
	      }

	      var attrs = common.mix({
	        fill: cfg.color,
	        points: polygonPoints
	      }, global.shape.interval, cfg.style);
	      return container.addShape('polygon', {
	        className: 'interval',
	        attrs: attrs
	      });
	    }
	  });
	});

	var _assertThisInitialized2$1 = interopRequireDefault(assertThisInitialized);

	var _possibleConstructorReturn2$k = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$k = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$k = interopRequireDefault(inheritsLoose);









	var Interval$1 = /*#__PURE__*/function (_Geom) {
	  (0, _inheritsLoose2$k["default"])(Interval, _Geom);

	  var _proto = Interval.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    var cfg = _Geom.prototype.getDefaultCfg.call(this);

	    cfg.type = 'interval';
	    cfg.shapeType = 'interval';
	    cfg.generatePoints = true;
	    return cfg;
	  };

	  function Interval(cfg) {
	    var _this;

	    _this = _Geom.call(this, cfg) || this;
	    common.mix((0, _assertThisInitialized2$1["default"])(_this), size$2);
	    return _this;
	  }

	  _proto.init = function init() {
	    _Geom.prototype.init.call(this); // 绑定事件


	    this.initEvent();
	  };

	  _proto.createShapePointsCfg = function createShapePointsCfg(obj) {
	    var cfg = _Geom.prototype.createShapePointsCfg.call(this, obj);

	    cfg.size = this.getNormalizedSize(obj);
	    return cfg;
	  };

	  _proto.clearInner = function clearInner() {
	    _Geom.prototype.clearInner.call(this);

	    this.set('defaultSize', null);
	  };

	  return Interval;
	}(base$4);

	base$4.Interval = Interval$1;

	var Polygon$1 = shape$1.registerFactory('polygon', {
	  defaultShapeType: 'polygon',
	  getDefaultPoints: function getDefaultPoints(pointInfo) {
	    var points = [];
	    var x = pointInfo.x,
	        y = pointInfo.y;

	    for (var i = 0, len = x.length; i < len; i++) {
	      points.push({
	        x: x[i],
	        y: y[i]
	      });
	    }

	    return points;
	  }
	});
	shape$1.registerShape('polygon', 'polygon', {
	  draw: function draw(cfg, container) {
	    var points = this.parsePoints(cfg.points);
	    var style = common.mix({
	      fill: cfg.color,
	      points: points
	    }, cfg.style);
	    return container.addShape('Polygon', {
	      className: 'polygon',
	      attrs: style
	    });
	  }
	});

	var _possibleConstructorReturn2$l = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$l = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$l = interopRequireDefault(inheritsLoose);







	var Polygon$2 = /*#__PURE__*/function (_Geom) {
	  (0, _inheritsLoose2$l["default"])(Polygon, _Geom);

	  function Polygon() {
	    return _Geom.apply(this, arguments) || this;
	  }

	  var _proto = Polygon.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    var cfg = _Geom.prototype.getDefaultCfg.call(this);

	    cfg.type = 'polygon';
	    cfg.shapeType = 'polygon';
	    cfg.generatePoints = true;
	    return cfg;
	  };

	  _proto.createShapePointsCfg = function createShapePointsCfg(obj) {
	    var cfg = _Geom.prototype.createShapePointsCfg.call(this, obj);

	    var self = this;
	    var x = cfg.x;
	    var y = cfg.y;
	    var temp;

	    if (!(common.isArray(x) && common.isArray(y))) {
	      var xScale = self.getXScale();
	      var yScale = self.getYScale();
	      var xCount = xScale.values ? xScale.values.length : xScale.ticks.length;
	      var yCount = yScale.values ? yScale.values.length : yScale.ticks.length;
	      var xOffset = 0.5 * 1 / xCount;
	      var yOffset = 0.5 * 1 / yCount;

	      if (xScale.isCategory && yScale.isCategory) {
	        x = [x - xOffset, x - xOffset, x + xOffset, x + xOffset];
	        y = [y - yOffset, y + yOffset, y + yOffset, y - yOffset];
	      } else if (common.isArray(x)) {
	        temp = x;
	        x = [temp[0], temp[0], temp[1], temp[1]];
	        y = [y - yOffset / 2, y + yOffset / 2, y + yOffset / 2, y - yOffset / 2];
	      } else if (common.isArray(y)) {
	        temp = y;
	        y = [temp[0], temp[1], temp[1], temp[0]];
	        x = [x - xOffset / 2, x - xOffset / 2, x + xOffset / 2, x + xOffset / 2];
	      }

	      cfg.x = x;
	      cfg.y = y;
	    }

	    return cfg;
	  };

	  return Polygon;
	}(base$4);

	base$4.Polygon = Polygon$2;

	var _possibleConstructorReturn2$m = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$m = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$m = interopRequireDefault(inheritsLoose);







	var Polar = /*#__PURE__*/function (_Base) {
	  (0, _inheritsLoose2$m["default"])(Polar, _Base);

	  function Polar() {
	    return _Base.apply(this, arguments) || this;
	  }

	  var _proto = Polar.prototype;

	  _proto._initDefaultCfg = function _initDefaultCfg() {
	    this.type = 'polar';
	    this.startAngle = -Math.PI / 2;
	    this.endAngle = Math.PI * 3 / 2;
	    this.inner = 0;
	    this.innerRadius = 0; // alias

	    this.isPolar = true;
	    this.transposed = false;
	    this.center = null;
	    this.radius = null; // relative, 0 ~ 1
	  };

	  _proto.init = function init(start, end) {
	    _Base.prototype.init.call(this, start, end);

	    var self = this;
	    var inner = self.inner || self.innerRadius;
	    var width = Math.abs(end.x - start.x);
	    var height = Math.abs(end.y - start.y);
	    var maxRadius;
	    var center;

	    if (self.startAngle === -Math.PI && self.endAngle === 0) {
	      maxRadius = Math.min(width / 2, height);
	      center = {
	        x: (start.x + end.x) / 2,
	        y: start.y
	      };
	    } else {
	      maxRadius = Math.min(width, height) / 2;
	      center = {
	        x: (start.x + end.x) / 2,
	        y: (start.y + end.y) / 2
	      };
	    }

	    var radius = self.radius;

	    if (radius > 0 && radius <= 1) {
	      maxRadius = maxRadius * radius;
	    }

	    this.x = {
	      start: self.startAngle,
	      end: self.endAngle
	    };
	    this.y = {
	      start: maxRadius * inner,
	      end: maxRadius
	    };
	    this.center = center;
	    this.circleRadius = maxRadius; // the radius value in px
	  };

	  _proto._convertPoint = function _convertPoint(point) {
	    var self = this;
	    var center = self.center;
	    var transposed = self.transposed;
	    var xDim = transposed ? 'y' : 'x';
	    var yDim = transposed ? 'x' : 'y';
	    var x = self.x;
	    var y = self.y;
	    var angle = x.start + (x.end - x.start) * point[xDim];
	    var radius = y.start + (y.end - y.start) * point[yDim];
	    return {
	      x: center.x + Math.cos(angle) * radius,
	      y: center.y + Math.sin(angle) * radius
	    };
	  };

	  _proto._invertPoint = function _invertPoint(point) {
	    var self = this;
	    var center = self.center,
	        transposed = self.transposed,
	        x = self.x,
	        y = self.y;
	    var xDim = transposed ? 'y' : 'x';
	    var yDim = transposed ? 'x' : 'y';
	    var m = [1, 0, 0, 1, 0, 0];
	    matrix.rotate(m, m, x.start);
	    var startV = [1, 0];
	    vector2.transformMat2d(startV, startV, m);
	    startV = [startV[0], startV[1]];
	    var pointV = [point.x - center.x, point.y - center.y];

	    if (vector2.zero(pointV)) {
	      return {
	        x: 0,
	        y: 0
	      };
	    }

	    var theta = vector2.angleTo(startV, pointV, x.end < x.start);

	    if (Math.abs(theta - Math.PI * 2) < 0.001) {
	      theta = 0;
	    }

	    var l = vector2.length(pointV);
	    var percentX = theta / (x.end - x.start);
	    percentX = x.end - x.start > 0 ? percentX : -percentX;
	    var percentY = (l - y.start) / (y.end - y.start);
	    var rst = {};
	    rst[xDim] = percentX;
	    rst[yDim] = percentY;
	    return rst;
	  };

	  return Polar;
	}(base$1);

	base$1.Polar = Polar;

	var _possibleConstructorReturn2$n = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$n = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$n = interopRequireDefault(inheritsLoose);





	var Circle$1 = /*#__PURE__*/function (_Abstract) {
	  (0, _inheritsLoose2$n["default"])(Circle, _Abstract);

	  function Circle() {
	    return _Abstract.apply(this, arguments) || this;
	  }

	  var _proto = Circle.prototype;

	  _proto._initDefaultCfg = function _initDefaultCfg() {
	    _Abstract.prototype._initDefaultCfg.call(this);

	    this.startAngle = -Math.PI / 2; // start angle，in radian

	    this.endAngle = Math.PI * 3 / 2; // end angle, in radian

	    this.radius = null; // radius

	    this.center = null; // center
	  };

	  _proto.getOffsetPoint = function getOffsetPoint(value) {
	    var startAngle = this.startAngle,
	        endAngle = this.endAngle;
	    var angle = startAngle + (endAngle - startAngle) * value;
	    return this._getCirclePoint(angle);
	  };

	  _proto._getCirclePoint = function _getCirclePoint(angle, radius) {
	    var self = this;
	    var center = self.center;
	    radius = radius || self.radius;
	    return {
	      x: center.x + Math.cos(angle) * radius,
	      y: center.y + Math.sin(angle) * radius
	    };
	  };

	  _proto.getTextAlignInfo = function getTextAlignInfo(point, offset) {
	    var self = this;
	    var offsetVector = self.getOffsetVector(point, offset);
	    var align;
	    var baseLine = 'middle';

	    if (offsetVector[0] > 0) {
	      align = 'left';
	    } else if (offsetVector[0] < 0) {
	      align = 'right';
	    } else {
	      align = 'center';

	      if (offsetVector[1] > 0) {
	        baseLine = 'top';
	      } else if (offsetVector[1] < 0) {
	        baseLine = 'bottom';
	      }
	    }

	    return {
	      textAlign: align,
	      textBaseline: baseLine
	    };
	  };

	  _proto.getAxisVector = function getAxisVector(point) {
	    var center = this.center;
	    var factor = this.offsetFactor;
	    return [(point.y - center.y) * factor, (point.x - center.x) * -1 * factor];
	  };

	  _proto.drawLine = function drawLine(lineCfg) {
	    var center = this.center,
	        radius = this.radius,
	        startAngle = this.startAngle,
	        endAngle = this.endAngle;
	    var container = this.getContainer(lineCfg.top);
	    container.addShape('arc', {
	      className: 'axis-line',
	      attrs: common.mix({
	        x: center.x,
	        y: center.y,
	        r: radius,
	        startAngle: startAngle,
	        endAngle: endAngle
	      }, lineCfg)
	    });
	  };

	  return Circle;
	}(abstract_1);

	abstract_1.Circle = Circle$1;

	var register = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports["default"] = void 0;





	chart._Interactions = {};

	chart.registerInteraction = function (type, constructor) {
	  chart._Interactions[type] = constructor;
	};

	chart.getInteraction = function (type) {
	  return chart._Interactions[type];
	};

	chart.prototype.interaction = function (type, cfg) {
	  var interactions = this._interactions || {};

	  if (interactions[type]) {
	    // if reprated, destroy last
	    interactions[type].destroy();
	  }

	  var Ctor = chart.getInteraction(type);
	  var interact = new Ctor(cfg, this);
	  interactions[type] = interact;
	  this._interactions = interactions;
	  return this;
	};

	chart.prototype.clearInteraction = function (type) {
	  var interactions = this._interactions;
	  if (!interactions) return;

	  if (type) {
	    interactions[type] && interactions[type].destroy();
	    delete interactions[type];
	  } else {
	    (0, common.each)(interactions, function (interaction, key) {
	      interaction.destroy();
	      delete interactions[key];
	    });
	  }

	  return this;
	};

	var _default = chart;
	exports["default"] = _default;
	});

	unwrapExports(register);

	var hammer = createCommonjsModule(function (module) {
	/*! Hammer.JS - v2.0.7 - 2016-04-22
	 * http://hammerjs.github.io/
	 *
	 * Copyright (c) 2016 Jorik Tangelder;
	 * Licensed under the MIT license */
	(function(window, document, exportName, undefined$1) {

	var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
	var TEST_ELEMENT = document.createElement('div');

	var TYPE_FUNCTION = 'function';

	var round = Math.round;
	var abs = Math.abs;
	var now = Date.now;

	/**
	 * set a timeout with a given scope
	 * @param {Function} fn
	 * @param {Number} timeout
	 * @param {Object} context
	 * @returns {number}
	 */
	function setTimeoutContext(fn, timeout, context) {
	    return setTimeout(bindFn(fn, context), timeout);
	}

	/**
	 * if the argument is an array, we want to execute the fn on each entry
	 * if it aint an array we don't want to do a thing.
	 * this is used by all the methods that accept a single and array argument.
	 * @param {*|Array} arg
	 * @param {String} fn
	 * @param {Object} [context]
	 * @returns {Boolean}
	 */
	function invokeArrayArg(arg, fn, context) {
	    if (Array.isArray(arg)) {
	        each(arg, context[fn], context);
	        return true;
	    }
	    return false;
	}

	/**
	 * walk objects and arrays
	 * @param {Object} obj
	 * @param {Function} iterator
	 * @param {Object} context
	 */
	function each(obj, iterator, context) {
	    var i;

	    if (!obj) {
	        return;
	    }

	    if (obj.forEach) {
	        obj.forEach(iterator, context);
	    } else if (obj.length !== undefined$1) {
	        i = 0;
	        while (i < obj.length) {
	            iterator.call(context, obj[i], i, obj);
	            i++;
	        }
	    } else {
	        for (i in obj) {
	            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
	        }
	    }
	}

	/**
	 * wrap a method with a deprecation warning and stack trace
	 * @param {Function} method
	 * @param {String} name
	 * @param {String} message
	 * @returns {Function} A new function wrapping the supplied method.
	 */
	function deprecate(method, name, message) {
	    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
	    return function() {
	        var e = new Error('get-stack-trace');
	        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
	            .replace(/^\s+at\s+/gm, '')
	            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

	        var log = window.console && (window.console.warn || window.console.log);
	        if (log) {
	            log.call(window.console, deprecationMessage, stack);
	        }
	        return method.apply(this, arguments);
	    };
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} target
	 * @param {...Object} objects_to_assign
	 * @returns {Object} target
	 */
	var assign;
	if (typeof Object.assign !== 'function') {
	    assign = function assign(target) {
	        if (target === undefined$1 || target === null) {
	            throw new TypeError('Cannot convert undefined or null to object');
	        }

	        var output = Object(target);
	        for (var index = 1; index < arguments.length; index++) {
	            var source = arguments[index];
	            if (source !== undefined$1 && source !== null) {
	                for (var nextKey in source) {
	                    if (source.hasOwnProperty(nextKey)) {
	                        output[nextKey] = source[nextKey];
	                    }
	                }
	            }
	        }
	        return output;
	    };
	} else {
	    assign = Object.assign;
	}

	/**
	 * extend object.
	 * means that properties in dest will be overwritten by the ones in src.
	 * @param {Object} dest
	 * @param {Object} src
	 * @param {Boolean} [merge=false]
	 * @returns {Object} dest
	 */
	var extend = deprecate(function extend(dest, src, merge) {
	    var keys = Object.keys(src);
	    var i = 0;
	    while (i < keys.length) {
	        if (!merge || (merge && dest[keys[i]] === undefined$1)) {
	            dest[keys[i]] = src[keys[i]];
	        }
	        i++;
	    }
	    return dest;
	}, 'extend', 'Use `assign`.');

	/**
	 * merge the values from src in the dest.
	 * means that properties that exist in dest will not be overwritten by src
	 * @param {Object} dest
	 * @param {Object} src
	 * @returns {Object} dest
	 */
	var merge = deprecate(function merge(dest, src) {
	    return extend(dest, src, true);
	}, 'merge', 'Use `assign`.');

	/**
	 * simple class inheritance
	 * @param {Function} child
	 * @param {Function} base
	 * @param {Object} [properties]
	 */
	function inherit(child, base, properties) {
	    var baseP = base.prototype,
	        childP;

	    childP = child.prototype = Object.create(baseP);
	    childP.constructor = child;
	    childP._super = baseP;

	    if (properties) {
	        assign(childP, properties);
	    }
	}

	/**
	 * simple function bind
	 * @param {Function} fn
	 * @param {Object} context
	 * @returns {Function}
	 */
	function bindFn(fn, context) {
	    return function boundFn() {
	        return fn.apply(context, arguments);
	    };
	}

	/**
	 * let a boolean value also be a function that must return a boolean
	 * this first item in args will be used as the context
	 * @param {Boolean|Function} val
	 * @param {Array} [args]
	 * @returns {Boolean}
	 */
	function boolOrFn(val, args) {
	    if (typeof val == TYPE_FUNCTION) {
	        return val.apply(args ? args[0] || undefined$1 : undefined$1, args);
	    }
	    return val;
	}

	/**
	 * use the val2 when val1 is undefined
	 * @param {*} val1
	 * @param {*} val2
	 * @returns {*}
	 */
	function ifUndefined(val1, val2) {
	    return (val1 === undefined$1) ? val2 : val1;
	}

	/**
	 * addEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function addEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.addEventListener(type, handler, false);
	    });
	}

	/**
	 * removeEventListener with multiple events at once
	 * @param {EventTarget} target
	 * @param {String} types
	 * @param {Function} handler
	 */
	function removeEventListeners(target, types, handler) {
	    each(splitStr(types), function(type) {
	        target.removeEventListener(type, handler, false);
	    });
	}

	/**
	 * find if a node is in the given parent
	 * @method hasParent
	 * @param {HTMLElement} node
	 * @param {HTMLElement} parent
	 * @return {Boolean} found
	 */
	function hasParent(node, parent) {
	    while (node) {
	        if (node == parent) {
	            return true;
	        }
	        node = node.parentNode;
	    }
	    return false;
	}

	/**
	 * small indexOf wrapper
	 * @param {String} str
	 * @param {String} find
	 * @returns {Boolean} found
	 */
	function inStr(str, find) {
	    return str.indexOf(find) > -1;
	}

	/**
	 * split string on whitespace
	 * @param {String} str
	 * @returns {Array} words
	 */
	function splitStr(str) {
	    return str.trim().split(/\s+/g);
	}

	/**
	 * find if a array contains the object using indexOf or a simple polyFill
	 * @param {Array} src
	 * @param {String} find
	 * @param {String} [findByKey]
	 * @return {Boolean|Number} false when not found, or the index
	 */
	function inArray(src, find, findByKey) {
	    if (src.indexOf && !findByKey) {
	        return src.indexOf(find);
	    } else {
	        var i = 0;
	        while (i < src.length) {
	            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
	                return i;
	            }
	            i++;
	        }
	        return -1;
	    }
	}

	/**
	 * convert array-like objects to real arrays
	 * @param {Object} obj
	 * @returns {Array}
	 */
	function toArray(obj) {
	    return Array.prototype.slice.call(obj, 0);
	}

	/**
	 * unique array with objects based on a key (like 'id') or just by the array's value
	 * @param {Array} src [{id:1},{id:2},{id:1}]
	 * @param {String} [key]
	 * @param {Boolean} [sort=False]
	 * @returns {Array} [{id:1},{id:2}]
	 */
	function uniqueArray(src, key, sort) {
	    var results = [];
	    var values = [];
	    var i = 0;

	    while (i < src.length) {
	        var val = key ? src[i][key] : src[i];
	        if (inArray(values, val) < 0) {
	            results.push(src[i]);
	        }
	        values[i] = val;
	        i++;
	    }

	    if (sort) {
	        if (!key) {
	            results = results.sort();
	        } else {
	            results = results.sort(function sortUniqueArray(a, b) {
	                return a[key] > b[key];
	            });
	        }
	    }

	    return results;
	}

	/**
	 * get the prefixed property
	 * @param {Object} obj
	 * @param {String} property
	 * @returns {String|Undefined} prefixed
	 */
	function prefixed(obj, property) {
	    var prefix, prop;
	    var camelProp = property[0].toUpperCase() + property.slice(1);

	    var i = 0;
	    while (i < VENDOR_PREFIXES.length) {
	        prefix = VENDOR_PREFIXES[i];
	        prop = (prefix) ? prefix + camelProp : property;

	        if (prop in obj) {
	            return prop;
	        }
	        i++;
	    }
	    return undefined$1;
	}

	/**
	 * get a unique id
	 * @returns {number} uniqueId
	 */
	var _uniqueId = 1;
	function uniqueId() {
	    return _uniqueId++;
	}

	/**
	 * get the window object of an element
	 * @param {HTMLElement} element
	 * @returns {DocumentView|Window}
	 */
	function getWindowForElement(element) {
	    var doc = element.ownerDocument || element;
	    return (doc.defaultView || doc.parentWindow || window);
	}

	var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

	var SUPPORT_TOUCH = ('ontouchstart' in window);
	var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined$1;
	var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

	var INPUT_TYPE_TOUCH = 'touch';
	var INPUT_TYPE_PEN = 'pen';
	var INPUT_TYPE_MOUSE = 'mouse';
	var INPUT_TYPE_KINECT = 'kinect';

	var COMPUTE_INTERVAL = 25;

	var INPUT_START = 1;
	var INPUT_MOVE = 2;
	var INPUT_END = 4;
	var INPUT_CANCEL = 8;

	var DIRECTION_NONE = 1;
	var DIRECTION_LEFT = 2;
	var DIRECTION_RIGHT = 4;
	var DIRECTION_UP = 8;
	var DIRECTION_DOWN = 16;

	var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
	var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
	var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

	var PROPS_XY = ['x', 'y'];
	var PROPS_CLIENT_XY = ['clientX', 'clientY'];

	/**
	 * create new input type manager
	 * @param {Manager} manager
	 * @param {Function} callback
	 * @returns {Input}
	 * @constructor
	 */
	function Input(manager, callback) {
	    var self = this;
	    this.manager = manager;
	    this.callback = callback;
	    this.element = manager.element;
	    this.target = manager.options.inputTarget;

	    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
	    // so when disabled the input events are completely bypassed.
	    this.domHandler = function(ev) {
	        if (boolOrFn(manager.options.enable, [manager])) {
	            self.handler(ev);
	        }
	    };

	    this.init();

	}

	Input.prototype = {
	    /**
	     * should handle the inputEvent data and trigger the callback
	     * @virtual
	     */
	    handler: function() { },

	    /**
	     * bind the events
	     */
	    init: function() {
	        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    },

	    /**
	     * unbind the events
	     */
	    destroy: function() {
	        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
	        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
	        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
	    }
	};

	/**
	 * create new input type manager
	 * called by the Manager constructor
	 * @param {Hammer} manager
	 * @returns {Input}
	 */
	function createInputInstance(manager) {
	    var Type;
	    var inputClass = manager.options.inputClass;

	    if (inputClass) {
	        Type = inputClass;
	    } else if (SUPPORT_POINTER_EVENTS) {
	        Type = PointerEventInput;
	    } else if (SUPPORT_ONLY_TOUCH) {
	        Type = TouchInput;
	    } else if (!SUPPORT_TOUCH) {
	        Type = MouseInput;
	    } else {
	        Type = TouchMouseInput;
	    }
	    return new (Type)(manager, inputHandler);
	}

	/**
	 * handle input events
	 * @param {Manager} manager
	 * @param {String} eventType
	 * @param {Object} input
	 */
	function inputHandler(manager, eventType, input) {
	    var pointersLen = input.pointers.length;
	    var changedPointersLen = input.changedPointers.length;
	    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
	    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

	    input.isFirst = !!isFirst;
	    input.isFinal = !!isFinal;

	    if (isFirst) {
	        manager.session = {};
	    }

	    // source event is the normalized value of the domEvents
	    // like 'touchstart, mouseup, pointerdown'
	    input.eventType = eventType;

	    // compute scale, rotation etc
	    computeInputData(manager, input);

	    // emit secret event
	    manager.emit('hammer.input', input);

	    manager.recognize(input);
	    manager.session.prevInput = input;
	}

	/**
	 * extend the data with some usable properties like scale, rotate, velocity etc
	 * @param {Object} manager
	 * @param {Object} input
	 */
	function computeInputData(manager, input) {
	    var session = manager.session;
	    var pointers = input.pointers;
	    var pointersLength = pointers.length;

	    // store the first input to calculate the distance and direction
	    if (!session.firstInput) {
	        session.firstInput = simpleCloneInputData(input);
	    }

	    // to compute scale and rotation we need to store the multiple touches
	    if (pointersLength > 1 && !session.firstMultiple) {
	        session.firstMultiple = simpleCloneInputData(input);
	    } else if (pointersLength === 1) {
	        session.firstMultiple = false;
	    }

	    var firstInput = session.firstInput;
	    var firstMultiple = session.firstMultiple;
	    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

	    var center = input.center = getCenter(pointers);
	    input.timeStamp = now();
	    input.deltaTime = input.timeStamp - firstInput.timeStamp;

	    input.angle = getAngle(offsetCenter, center);
	    input.distance = getDistance(offsetCenter, center);

	    computeDeltaXY(session, input);
	    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

	    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
	    input.overallVelocityX = overallVelocity.x;
	    input.overallVelocityY = overallVelocity.y;
	    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

	    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
	    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

	    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
	        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

	    computeIntervalInputData(session, input);

	    // find the correct target
	    var target = manager.element;
	    if (hasParent(input.srcEvent.target, target)) {
	        target = input.srcEvent.target;
	    }
	    input.target = target;
	}

	function computeDeltaXY(session, input) {
	    var center = input.center;
	    var offset = session.offsetDelta || {};
	    var prevDelta = session.prevDelta || {};
	    var prevInput = session.prevInput || {};

	    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
	        prevDelta = session.prevDelta = {
	            x: prevInput.deltaX || 0,
	            y: prevInput.deltaY || 0
	        };

	        offset = session.offsetDelta = {
	            x: center.x,
	            y: center.y
	        };
	    }

	    input.deltaX = prevDelta.x + (center.x - offset.x);
	    input.deltaY = prevDelta.y + (center.y - offset.y);
	}

	/**
	 * velocity is calculated every x ms
	 * @param {Object} session
	 * @param {Object} input
	 */
	function computeIntervalInputData(session, input) {
	    var last = session.lastInterval || input,
	        deltaTime = input.timeStamp - last.timeStamp,
	        velocity, velocityX, velocityY, direction;

	    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined$1)) {
	        var deltaX = input.deltaX - last.deltaX;
	        var deltaY = input.deltaY - last.deltaY;

	        var v = getVelocity(deltaTime, deltaX, deltaY);
	        velocityX = v.x;
	        velocityY = v.y;
	        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
	        direction = getDirection(deltaX, deltaY);

	        session.lastInterval = input;
	    } else {
	        // use latest velocity info if it doesn't overtake a minimum period
	        velocity = last.velocity;
	        velocityX = last.velocityX;
	        velocityY = last.velocityY;
	        direction = last.direction;
	    }

	    input.velocity = velocity;
	    input.velocityX = velocityX;
	    input.velocityY = velocityY;
	    input.direction = direction;
	}

	/**
	 * create a simple clone from the input used for storage of firstInput and firstMultiple
	 * @param {Object} input
	 * @returns {Object} clonedInputData
	 */
	function simpleCloneInputData(input) {
	    // make a simple copy of the pointers because we will get a reference if we don't
	    // we only need clientXY for the calculations
	    var pointers = [];
	    var i = 0;
	    while (i < input.pointers.length) {
	        pointers[i] = {
	            clientX: round(input.pointers[i].clientX),
	            clientY: round(input.pointers[i].clientY)
	        };
	        i++;
	    }

	    return {
	        timeStamp: now(),
	        pointers: pointers,
	        center: getCenter(pointers),
	        deltaX: input.deltaX,
	        deltaY: input.deltaY
	    };
	}

	/**
	 * get the center of all the pointers
	 * @param {Array} pointers
	 * @return {Object} center contains `x` and `y` properties
	 */
	function getCenter(pointers) {
	    var pointersLength = pointers.length;

	    // no need to loop when only one touch
	    if (pointersLength === 1) {
	        return {
	            x: round(pointers[0].clientX),
	            y: round(pointers[0].clientY)
	        };
	    }

	    var x = 0, y = 0, i = 0;
	    while (i < pointersLength) {
	        x += pointers[i].clientX;
	        y += pointers[i].clientY;
	        i++;
	    }

	    return {
	        x: round(x / pointersLength),
	        y: round(y / pointersLength)
	    };
	}

	/**
	 * calculate the velocity between two points. unit is in px per ms.
	 * @param {Number} deltaTime
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Object} velocity `x` and `y`
	 */
	function getVelocity(deltaTime, x, y) {
	    return {
	        x: x / deltaTime || 0,
	        y: y / deltaTime || 0
	    };
	}

	/**
	 * get the direction between two points
	 * @param {Number} x
	 * @param {Number} y
	 * @return {Number} direction
	 */
	function getDirection(x, y) {
	    if (x === y) {
	        return DIRECTION_NONE;
	    }

	    if (abs(x) >= abs(y)) {
	        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }
	    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
	}

	/**
	 * calculate the absolute distance between two points
	 * @param {Object} p1 {x, y}
	 * @param {Object} p2 {x, y}
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} distance
	 */
	function getDistance(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];

	    return Math.sqrt((x * x) + (y * y));
	}

	/**
	 * calculate the angle between two coordinates
	 * @param {Object} p1
	 * @param {Object} p2
	 * @param {Array} [props] containing x and y keys
	 * @return {Number} angle
	 */
	function getAngle(p1, p2, props) {
	    if (!props) {
	        props = PROPS_XY;
	    }
	    var x = p2[props[0]] - p1[props[0]],
	        y = p2[props[1]] - p1[props[1]];
	    return Math.atan2(y, x) * 180 / Math.PI;
	}

	/**
	 * calculate the rotation degrees between two pointersets
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} rotation
	 */
	function getRotation(start, end) {
	    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
	}

	/**
	 * calculate the scale factor between two pointersets
	 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
	 * @param {Array} start array of pointers
	 * @param {Array} end array of pointers
	 * @return {Number} scale
	 */
	function getScale(start, end) {
	    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
	}

	var MOUSE_INPUT_MAP = {
	    mousedown: INPUT_START,
	    mousemove: INPUT_MOVE,
	    mouseup: INPUT_END
	};

	var MOUSE_ELEMENT_EVENTS = 'mousedown';
	var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

	/**
	 * Mouse events input
	 * @constructor
	 * @extends Input
	 */
	function MouseInput() {
	    this.evEl = MOUSE_ELEMENT_EVENTS;
	    this.evWin = MOUSE_WINDOW_EVENTS;

	    this.pressed = false; // mousedown state

	    Input.apply(this, arguments);
	}

	inherit(MouseInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function MEhandler(ev) {
	        var eventType = MOUSE_INPUT_MAP[ev.type];

	        // on start we want to have the left mouse button down
	        if (eventType & INPUT_START && ev.button === 0) {
	            this.pressed = true;
	        }

	        if (eventType & INPUT_MOVE && ev.which !== 1) {
	            eventType = INPUT_END;
	        }

	        // mouse must be down
	        if (!this.pressed) {
	            return;
	        }

	        if (eventType & INPUT_END) {
	            this.pressed = false;
	        }

	        this.callback(this.manager, eventType, {
	            pointers: [ev],
	            changedPointers: [ev],
	            pointerType: INPUT_TYPE_MOUSE,
	            srcEvent: ev
	        });
	    }
	});

	var POINTER_INPUT_MAP = {
	    pointerdown: INPUT_START,
	    pointermove: INPUT_MOVE,
	    pointerup: INPUT_END,
	    pointercancel: INPUT_CANCEL,
	    pointerout: INPUT_CANCEL
	};

	// in IE10 the pointer types is defined as an enum
	var IE10_POINTER_TYPE_ENUM = {
	    2: INPUT_TYPE_TOUCH,
	    3: INPUT_TYPE_PEN,
	    4: INPUT_TYPE_MOUSE,
	    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
	};

	var POINTER_ELEMENT_EVENTS = 'pointerdown';
	var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

	// IE10 has prefixed support, and case-sensitive
	if (window.MSPointerEvent && !window.PointerEvent) {
	    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
	    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
	}

	/**
	 * Pointer events input
	 * @constructor
	 * @extends Input
	 */
	function PointerEventInput() {
	    this.evEl = POINTER_ELEMENT_EVENTS;
	    this.evWin = POINTER_WINDOW_EVENTS;

	    Input.apply(this, arguments);

	    this.store = (this.manager.session.pointerEvents = []);
	}

	inherit(PointerEventInput, Input, {
	    /**
	     * handle mouse events
	     * @param {Object} ev
	     */
	    handler: function PEhandler(ev) {
	        var store = this.store;
	        var removePointer = false;

	        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
	        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
	        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

	        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

	        // get index of the event in the store
	        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

	        // start and mouse must be down
	        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
	            if (storeIndex < 0) {
	                store.push(ev);
	                storeIndex = store.length - 1;
	            }
	        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	            removePointer = true;
	        }

	        // it not found, so the pointer hasn't been down (so it's probably a hover)
	        if (storeIndex < 0) {
	            return;
	        }

	        // update the event in the store
	        store[storeIndex] = ev;

	        this.callback(this.manager, eventType, {
	            pointers: store,
	            changedPointers: [ev],
	            pointerType: pointerType,
	            srcEvent: ev
	        });

	        if (removePointer) {
	            // remove from the store
	            store.splice(storeIndex, 1);
	        }
	    }
	});

	var SINGLE_TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};

	var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
	var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Touch events input
	 * @constructor
	 * @extends Input
	 */
	function SingleTouchInput() {
	    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
	    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
	    this.started = false;

	    Input.apply(this, arguments);
	}

	inherit(SingleTouchInput, Input, {
	    handler: function TEhandler(ev) {
	        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

	        // should we handle the touch events?
	        if (type === INPUT_START) {
	            this.started = true;
	        }

	        if (!this.started) {
	            return;
	        }

	        var touches = normalizeSingleTouches.call(this, ev, type);

	        // when done, reset the started state
	        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
	            this.started = false;
	        }

	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function normalizeSingleTouches(ev, type) {
	    var all = toArray(ev.touches);
	    var changed = toArray(ev.changedTouches);

	    if (type & (INPUT_END | INPUT_CANCEL)) {
	        all = uniqueArray(all.concat(changed), 'identifier', true);
	    }

	    return [all, changed];
	}

	var TOUCH_INPUT_MAP = {
	    touchstart: INPUT_START,
	    touchmove: INPUT_MOVE,
	    touchend: INPUT_END,
	    touchcancel: INPUT_CANCEL
	};

	var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

	/**
	 * Multi-user touch events input
	 * @constructor
	 * @extends Input
	 */
	function TouchInput() {
	    this.evTarget = TOUCH_TARGET_EVENTS;
	    this.targetIds = {};

	    Input.apply(this, arguments);
	}

	inherit(TouchInput, Input, {
	    handler: function MTEhandler(ev) {
	        var type = TOUCH_INPUT_MAP[ev.type];
	        var touches = getTouches.call(this, ev, type);
	        if (!touches) {
	            return;
	        }

	        this.callback(this.manager, type, {
	            pointers: touches[0],
	            changedPointers: touches[1],
	            pointerType: INPUT_TYPE_TOUCH,
	            srcEvent: ev
	        });
	    }
	});

	/**
	 * @this {TouchInput}
	 * @param {Object} ev
	 * @param {Number} type flag
	 * @returns {undefined|Array} [all, changed]
	 */
	function getTouches(ev, type) {
	    var allTouches = toArray(ev.touches);
	    var targetIds = this.targetIds;

	    // when there is only one touch, the process can be simplified
	    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
	        targetIds[allTouches[0].identifier] = true;
	        return [allTouches, allTouches];
	    }

	    var i,
	        targetTouches,
	        changedTouches = toArray(ev.changedTouches),
	        changedTargetTouches = [],
	        target = this.target;

	    // get target touches from touches
	    targetTouches = allTouches.filter(function(touch) {
	        return hasParent(touch.target, target);
	    });

	    // collect touches
	    if (type === INPUT_START) {
	        i = 0;
	        while (i < targetTouches.length) {
	            targetIds[targetTouches[i].identifier] = true;
	            i++;
	        }
	    }

	    // filter changed touches to only contain touches that exist in the collected target ids
	    i = 0;
	    while (i < changedTouches.length) {
	        if (targetIds[changedTouches[i].identifier]) {
	            changedTargetTouches.push(changedTouches[i]);
	        }

	        // cleanup removed touches
	        if (type & (INPUT_END | INPUT_CANCEL)) {
	            delete targetIds[changedTouches[i].identifier];
	        }
	        i++;
	    }

	    if (!changedTargetTouches.length) {
	        return;
	    }

	    return [
	        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
	        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
	        changedTargetTouches
	    ];
	}

	/**
	 * Combined touch and mouse input
	 *
	 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
	 * This because touch devices also emit mouse events while doing a touch.
	 *
	 * @constructor
	 * @extends Input
	 */

	var DEDUP_TIMEOUT = 2500;
	var DEDUP_DISTANCE = 25;

	function TouchMouseInput() {
	    Input.apply(this, arguments);

	    var handler = bindFn(this.handler, this);
	    this.touch = new TouchInput(this.manager, handler);
	    this.mouse = new MouseInput(this.manager, handler);

	    this.primaryTouch = null;
	    this.lastTouches = [];
	}

	inherit(TouchMouseInput, Input, {
	    /**
	     * handle mouse and touch events
	     * @param {Hammer} manager
	     * @param {String} inputEvent
	     * @param {Object} inputData
	     */
	    handler: function TMEhandler(manager, inputEvent, inputData) {
	        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
	            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

	        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
	            return;
	        }

	        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
	        if (isTouch) {
	            recordTouches.call(this, inputEvent, inputData);
	        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
	            return;
	        }

	        this.callback(manager, inputEvent, inputData);
	    },

	    /**
	     * remove the event listeners
	     */
	    destroy: function destroy() {
	        this.touch.destroy();
	        this.mouse.destroy();
	    }
	});

	function recordTouches(eventType, eventData) {
	    if (eventType & INPUT_START) {
	        this.primaryTouch = eventData.changedPointers[0].identifier;
	        setLastTouch.call(this, eventData);
	    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
	        setLastTouch.call(this, eventData);
	    }
	}

	function setLastTouch(eventData) {
	    var touch = eventData.changedPointers[0];

	    if (touch.identifier === this.primaryTouch) {
	        var lastTouch = {x: touch.clientX, y: touch.clientY};
	        this.lastTouches.push(lastTouch);
	        var lts = this.lastTouches;
	        var removeLastTouch = function() {
	            var i = lts.indexOf(lastTouch);
	            if (i > -1) {
	                lts.splice(i, 1);
	            }
	        };
	        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
	    }
	}

	function isSyntheticEvent(eventData) {
	    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
	    for (var i = 0; i < this.lastTouches.length; i++) {
	        var t = this.lastTouches[i];
	        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
	        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
	            return true;
	        }
	    }
	    return false;
	}

	var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
	var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined$1;

	// magical touchAction value
	var TOUCH_ACTION_COMPUTE = 'compute';
	var TOUCH_ACTION_AUTO = 'auto';
	var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
	var TOUCH_ACTION_NONE = 'none';
	var TOUCH_ACTION_PAN_X = 'pan-x';
	var TOUCH_ACTION_PAN_Y = 'pan-y';
	var TOUCH_ACTION_MAP = getTouchActionProps();

	/**
	 * Touch Action
	 * sets the touchAction property or uses the js alternative
	 * @param {Manager} manager
	 * @param {String} value
	 * @constructor
	 */
	function TouchAction(manager, value) {
	    this.manager = manager;
	    this.set(value);
	}

	TouchAction.prototype = {
	    /**
	     * set the touchAction value on the element or enable the polyfill
	     * @param {String} value
	     */
	    set: function(value) {
	        // find out the touch-action by the event handlers
	        if (value == TOUCH_ACTION_COMPUTE) {
	            value = this.compute();
	        }

	        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
	            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
	        }
	        this.actions = value.toLowerCase().trim();
	    },

	    /**
	     * just re-set the touchAction value
	     */
	    update: function() {
	        this.set(this.manager.options.touchAction);
	    },

	    /**
	     * compute the value for the touchAction property based on the recognizer's settings
	     * @returns {String} value
	     */
	    compute: function() {
	        var actions = [];
	        each(this.manager.recognizers, function(recognizer) {
	            if (boolOrFn(recognizer.options.enable, [recognizer])) {
	                actions = actions.concat(recognizer.getTouchAction());
	            }
	        });
	        return cleanTouchActions(actions.join(' '));
	    },

	    /**
	     * this method is called on each input cycle and provides the preventing of the browser behavior
	     * @param {Object} input
	     */
	    preventDefaults: function(input) {
	        var srcEvent = input.srcEvent;
	        var direction = input.offsetDirection;

	        // if the touch action did prevented once this session
	        if (this.manager.session.prevented) {
	            srcEvent.preventDefault();
	            return;
	        }

	        var actions = this.actions;
	        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
	        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
	        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

	        if (hasNone) {
	            //do not prevent defaults if this is a tap gesture

	            var isTapPointer = input.pointers.length === 1;
	            var isTapMovement = input.distance < 2;
	            var isTapTouchTime = input.deltaTime < 250;

	            if (isTapPointer && isTapMovement && isTapTouchTime) {
	                return;
	            }
	        }

	        if (hasPanX && hasPanY) {
	            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
	            return;
	        }

	        if (hasNone ||
	            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
	            (hasPanX && direction & DIRECTION_VERTICAL)) {
	            return this.preventSrc(srcEvent);
	        }
	    },

	    /**
	     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
	     * @param {Object} srcEvent
	     */
	    preventSrc: function(srcEvent) {
	        this.manager.session.prevented = true;
	        srcEvent.preventDefault();
	    }
	};

	/**
	 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
	 * @param {String} actions
	 * @returns {*}
	 */
	function cleanTouchActions(actions) {
	    // none
	    if (inStr(actions, TOUCH_ACTION_NONE)) {
	        return TOUCH_ACTION_NONE;
	    }

	    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
	    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

	    // if both pan-x and pan-y are set (different recognizers
	    // for different directions, e.g. horizontal pan but vertical swipe?)
	    // we need none (as otherwise with pan-x pan-y combined none of these
	    // recognizers will work, since the browser would handle all panning
	    if (hasPanX && hasPanY) {
	        return TOUCH_ACTION_NONE;
	    }

	    // pan-x OR pan-y
	    if (hasPanX || hasPanY) {
	        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
	    }

	    // manipulation
	    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
	        return TOUCH_ACTION_MANIPULATION;
	    }

	    return TOUCH_ACTION_AUTO;
	}

	function getTouchActionProps() {
	    if (!NATIVE_TOUCH_ACTION) {
	        return false;
	    }
	    var touchMap = {};
	    var cssSupports = window.CSS && window.CSS.supports;
	    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

	        // If css.supports is not supported but there is native touch-action assume it supports
	        // all values. This is the case for IE 10 and 11.
	        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
	    });
	    return touchMap;
	}

	/**
	 * Recognizer flow explained; *
	 * All recognizers have the initial state of POSSIBLE when a input session starts.
	 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
	 * Example session for mouse-input: mousedown -> mousemove -> mouseup
	 *
	 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
	 * which determines with state it should be.
	 *
	 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
	 * POSSIBLE to give it another change on the next cycle.
	 *
	 *               Possible
	 *                  |
	 *            +-----+---------------+
	 *            |                     |
	 *      +-----+-----+               |
	 *      |           |               |
	 *   Failed      Cancelled          |
	 *                          +-------+------+
	 *                          |              |
	 *                      Recognized       Began
	 *                                         |
	 *                                      Changed
	 *                                         |
	 *                                  Ended/Recognized
	 */
	var STATE_POSSIBLE = 1;
	var STATE_BEGAN = 2;
	var STATE_CHANGED = 4;
	var STATE_ENDED = 8;
	var STATE_RECOGNIZED = STATE_ENDED;
	var STATE_CANCELLED = 16;
	var STATE_FAILED = 32;

	/**
	 * Recognizer
	 * Every recognizer needs to extend from this class.
	 * @constructor
	 * @param {Object} options
	 */
	function Recognizer(options) {
	    this.options = assign({}, this.defaults, options || {});

	    this.id = uniqueId();

	    this.manager = null;

	    // default is enable true
	    this.options.enable = ifUndefined(this.options.enable, true);

	    this.state = STATE_POSSIBLE;

	    this.simultaneous = {};
	    this.requireFail = [];
	}

	Recognizer.prototype = {
	    /**
	     * @virtual
	     * @type {Object}
	     */
	    defaults: {},

	    /**
	     * set options
	     * @param {Object} options
	     * @return {Recognizer}
	     */
	    set: function(options) {
	        assign(this.options, options);

	        // also update the touchAction, in case something changed about the directions/enabled state
	        this.manager && this.manager.touchAction.update();
	        return this;
	    },

	    /**
	     * recognize simultaneous with an other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    recognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
	            return this;
	        }

	        var simultaneous = this.simultaneous;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (!simultaneous[otherRecognizer.id]) {
	            simultaneous[otherRecognizer.id] = otherRecognizer;
	            otherRecognizer.recognizeWith(this);
	        }
	        return this;
	    },

	    /**
	     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRecognizeWith: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
	            return this;
	        }

	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        delete this.simultaneous[otherRecognizer.id];
	        return this;
	    },

	    /**
	     * recognizer can only run when an other is failing
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    requireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
	            return this;
	        }

	        var requireFail = this.requireFail;
	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        if (inArray(requireFail, otherRecognizer) === -1) {
	            requireFail.push(otherRecognizer);
	            otherRecognizer.requireFailure(this);
	        }
	        return this;
	    },

	    /**
	     * drop the requireFailure link. it does not remove the link on the other recognizer.
	     * @param {Recognizer} otherRecognizer
	     * @returns {Recognizer} this
	     */
	    dropRequireFailure: function(otherRecognizer) {
	        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
	            return this;
	        }

	        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
	        var index = inArray(this.requireFail, otherRecognizer);
	        if (index > -1) {
	            this.requireFail.splice(index, 1);
	        }
	        return this;
	    },

	    /**
	     * has require failures boolean
	     * @returns {boolean}
	     */
	    hasRequireFailures: function() {
	        return this.requireFail.length > 0;
	    },

	    /**
	     * if the recognizer can recognize simultaneous with an other recognizer
	     * @param {Recognizer} otherRecognizer
	     * @returns {Boolean}
	     */
	    canRecognizeWith: function(otherRecognizer) {
	        return !!this.simultaneous[otherRecognizer.id];
	    },

	    /**
	     * You should use `tryEmit` instead of `emit` directly to check
	     * that all the needed recognizers has failed before emitting.
	     * @param {Object} input
	     */
	    emit: function(input) {
	        var self = this;
	        var state = this.state;

	        function emit(event) {
	            self.manager.emit(event, input);
	        }

	        // 'panstart' and 'panmove'
	        if (state < STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }

	        emit(self.options.event); // simple 'eventName' events

	        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
	            emit(input.additionalEvent);
	        }

	        // panend and pancancel
	        if (state >= STATE_ENDED) {
	            emit(self.options.event + stateStr(state));
	        }
	    },

	    /**
	     * Check that all the require failure recognizers has failed,
	     * if true, it emits a gesture event,
	     * otherwise, setup the state to FAILED.
	     * @param {Object} input
	     */
	    tryEmit: function(input) {
	        if (this.canEmit()) {
	            return this.emit(input);
	        }
	        // it's failing anyway
	        this.state = STATE_FAILED;
	    },

	    /**
	     * can we emit?
	     * @returns {boolean}
	     */
	    canEmit: function() {
	        var i = 0;
	        while (i < this.requireFail.length) {
	            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
	                return false;
	            }
	            i++;
	        }
	        return true;
	    },

	    /**
	     * update the recognizer
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        // make a new copy of the inputData
	        // so we can change the inputData without messing up the other recognizers
	        var inputDataClone = assign({}, inputData);

	        // is is enabled and allow recognizing?
	        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
	            this.reset();
	            this.state = STATE_FAILED;
	            return;
	        }

	        // reset when we've reached the end
	        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
	            this.state = STATE_POSSIBLE;
	        }

	        this.state = this.process(inputDataClone);

	        // the recognizer has recognized a gesture
	        // so trigger an event
	        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
	            this.tryEmit(inputDataClone);
	        }
	    },

	    /**
	     * return the state of the recognizer
	     * the actual recognizing happens in this method
	     * @virtual
	     * @param {Object} inputData
	     * @returns {Const} STATE
	     */
	    process: function(inputData) { }, // jshint ignore:line

	    /**
	     * return the preferred touch-action
	     * @virtual
	     * @returns {Array}
	     */
	    getTouchAction: function() { },

	    /**
	     * called when the gesture isn't allowed to recognize
	     * like when another is being recognized or it is disabled
	     * @virtual
	     */
	    reset: function() { }
	};

	/**
	 * get a usable string, used as event postfix
	 * @param {Const} state
	 * @returns {String} state
	 */
	function stateStr(state) {
	    if (state & STATE_CANCELLED) {
	        return 'cancel';
	    } else if (state & STATE_ENDED) {
	        return 'end';
	    } else if (state & STATE_CHANGED) {
	        return 'move';
	    } else if (state & STATE_BEGAN) {
	        return 'start';
	    }
	    return '';
	}

	/**
	 * direction cons to string
	 * @param {Const} direction
	 * @returns {String}
	 */
	function directionStr(direction) {
	    if (direction == DIRECTION_DOWN) {
	        return 'down';
	    } else if (direction == DIRECTION_UP) {
	        return 'up';
	    } else if (direction == DIRECTION_LEFT) {
	        return 'left';
	    } else if (direction == DIRECTION_RIGHT) {
	        return 'right';
	    }
	    return '';
	}

	/**
	 * get a recognizer by name if it is bound to a manager
	 * @param {Recognizer|String} otherRecognizer
	 * @param {Recognizer} recognizer
	 * @returns {Recognizer}
	 */
	function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
	    var manager = recognizer.manager;
	    if (manager) {
	        return manager.get(otherRecognizer);
	    }
	    return otherRecognizer;
	}

	/**
	 * This recognizer is just used as a base for the simple attribute recognizers.
	 * @constructor
	 * @extends Recognizer
	 */
	function AttrRecognizer() {
	    Recognizer.apply(this, arguments);
	}

	inherit(AttrRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof AttrRecognizer
	     */
	    defaults: {
	        /**
	         * @type {Number}
	         * @default 1
	         */
	        pointers: 1
	    },

	    /**
	     * Used to check if it the recognizer receives valid input, like input.distance > 10.
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {Boolean} recognized
	     */
	    attrTest: function(input) {
	        var optionPointers = this.options.pointers;
	        return optionPointers === 0 || input.pointers.length === optionPointers;
	    },

	    /**
	     * Process the input and return the state for the recognizer
	     * @memberof AttrRecognizer
	     * @param {Object} input
	     * @returns {*} State
	     */
	    process: function(input) {
	        var state = this.state;
	        var eventType = input.eventType;

	        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
	        var isValid = this.attrTest(input);

	        // on cancel input and we've recognized before, return STATE_CANCELLED
	        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
	            return state | STATE_CANCELLED;
	        } else if (isRecognized || isValid) {
	            if (eventType & INPUT_END) {
	                return state | STATE_ENDED;
	            } else if (!(state & STATE_BEGAN)) {
	                return STATE_BEGAN;
	            }
	            return state | STATE_CHANGED;
	        }
	        return STATE_FAILED;
	    }
	});

	/**
	 * Pan
	 * Recognized when the pointer is down and moved in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PanRecognizer() {
	    AttrRecognizer.apply(this, arguments);

	    this.pX = null;
	    this.pY = null;
	}

	inherit(PanRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PanRecognizer
	     */
	    defaults: {
	        event: 'pan',
	        threshold: 10,
	        pointers: 1,
	        direction: DIRECTION_ALL
	    },

	    getTouchAction: function() {
	        var direction = this.options.direction;
	        var actions = [];
	        if (direction & DIRECTION_HORIZONTAL) {
	            actions.push(TOUCH_ACTION_PAN_Y);
	        }
	        if (direction & DIRECTION_VERTICAL) {
	            actions.push(TOUCH_ACTION_PAN_X);
	        }
	        return actions;
	    },

	    directionTest: function(input) {
	        var options = this.options;
	        var hasMoved = true;
	        var distance = input.distance;
	        var direction = input.direction;
	        var x = input.deltaX;
	        var y = input.deltaY;

	        // lock to axis?
	        if (!(direction & options.direction)) {
	            if (options.direction & DIRECTION_HORIZONTAL) {
	                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
	                hasMoved = x != this.pX;
	                distance = Math.abs(input.deltaX);
	            } else {
	                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
	                hasMoved = y != this.pY;
	                distance = Math.abs(input.deltaY);
	            }
	        }
	        input.direction = direction;
	        return hasMoved && distance > options.threshold && direction & options.direction;
	    },

	    attrTest: function(input) {
	        return AttrRecognizer.prototype.attrTest.call(this, input) &&
	            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
	    },

	    emit: function(input) {

	        this.pX = input.deltaX;
	        this.pY = input.deltaY;

	        var direction = directionStr(input.direction);

	        if (direction) {
	            input.additionalEvent = this.options.event + direction;
	        }
	        this._super.emit.call(this, input);
	    }
	});

	/**
	 * Pinch
	 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function PinchRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(PinchRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'pinch',
	        threshold: 0,
	        pointers: 2
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },

	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
	    },

	    emit: function(input) {
	        if (input.scale !== 1) {
	            var inOut = input.scale < 1 ? 'in' : 'out';
	            input.additionalEvent = this.options.event + inOut;
	        }
	        this._super.emit.call(this, input);
	    }
	});

	/**
	 * Press
	 * Recognized when the pointer is down for x ms without any movement.
	 * @constructor
	 * @extends Recognizer
	 */
	function PressRecognizer() {
	    Recognizer.apply(this, arguments);

	    this._timer = null;
	    this._input = null;
	}

	inherit(PressRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PressRecognizer
	     */
	    defaults: {
	        event: 'press',
	        pointers: 1,
	        time: 251, // minimal time of the pointer to be pressed
	        threshold: 9 // a minimal movement is ok, but keep it low
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_AUTO];
	    },

	    process: function(input) {
	        var options = this.options;
	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTime = input.deltaTime > options.time;

	        this._input = input;

	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
	            this.reset();
	        } else if (input.eventType & INPUT_START) {
	            this.reset();
	            this._timer = setTimeoutContext(function() {
	                this.state = STATE_RECOGNIZED;
	                this.tryEmit();
	            }, options.time, this);
	        } else if (input.eventType & INPUT_END) {
	            return STATE_RECOGNIZED;
	        }
	        return STATE_FAILED;
	    },

	    reset: function() {
	        clearTimeout(this._timer);
	    },

	    emit: function(input) {
	        if (this.state !== STATE_RECOGNIZED) {
	            return;
	        }

	        if (input && (input.eventType & INPUT_END)) {
	            this.manager.emit(this.options.event + 'up', input);
	        } else {
	            this._input.timeStamp = now();
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});

	/**
	 * Rotate
	 * Recognized when two or more pointer are moving in a circular motion.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function RotateRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(RotateRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof RotateRecognizer
	     */
	    defaults: {
	        event: 'rotate',
	        threshold: 0,
	        pointers: 2
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_NONE];
	    },

	    attrTest: function(input) {
	        return this._super.attrTest.call(this, input) &&
	            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
	    }
	});

	/**
	 * Swipe
	 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
	 * @constructor
	 * @extends AttrRecognizer
	 */
	function SwipeRecognizer() {
	    AttrRecognizer.apply(this, arguments);
	}

	inherit(SwipeRecognizer, AttrRecognizer, {
	    /**
	     * @namespace
	     * @memberof SwipeRecognizer
	     */
	    defaults: {
	        event: 'swipe',
	        threshold: 10,
	        velocity: 0.3,
	        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
	        pointers: 1
	    },

	    getTouchAction: function() {
	        return PanRecognizer.prototype.getTouchAction.call(this);
	    },

	    attrTest: function(input) {
	        var direction = this.options.direction;
	        var velocity;

	        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
	            velocity = input.overallVelocity;
	        } else if (direction & DIRECTION_HORIZONTAL) {
	            velocity = input.overallVelocityX;
	        } else if (direction & DIRECTION_VERTICAL) {
	            velocity = input.overallVelocityY;
	        }

	        return this._super.attrTest.call(this, input) &&
	            direction & input.offsetDirection &&
	            input.distance > this.options.threshold &&
	            input.maxPointers == this.options.pointers &&
	            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
	    },

	    emit: function(input) {
	        var direction = directionStr(input.offsetDirection);
	        if (direction) {
	            this.manager.emit(this.options.event + direction, input);
	        }

	        this.manager.emit(this.options.event, input);
	    }
	});

	/**
	 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
	 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
	 * a single tap.
	 *
	 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
	 * multi-taps being recognized.
	 * @constructor
	 * @extends Recognizer
	 */
	function TapRecognizer() {
	    Recognizer.apply(this, arguments);

	    // previous time and center,
	    // used for tap counting
	    this.pTime = false;
	    this.pCenter = false;

	    this._timer = null;
	    this._input = null;
	    this.count = 0;
	}

	inherit(TapRecognizer, Recognizer, {
	    /**
	     * @namespace
	     * @memberof PinchRecognizer
	     */
	    defaults: {
	        event: 'tap',
	        pointers: 1,
	        taps: 1,
	        interval: 300, // max time between the multi-tap taps
	        time: 250, // max time of the pointer to be down (like finger on the screen)
	        threshold: 9, // a minimal movement is ok, but keep it low
	        posThreshold: 10 // a multi-tap can be a bit off the initial position
	    },

	    getTouchAction: function() {
	        return [TOUCH_ACTION_MANIPULATION];
	    },

	    process: function(input) {
	        var options = this.options;

	        var validPointers = input.pointers.length === options.pointers;
	        var validMovement = input.distance < options.threshold;
	        var validTouchTime = input.deltaTime < options.time;

	        this.reset();

	        if ((input.eventType & INPUT_START) && (this.count === 0)) {
	            return this.failTimeout();
	        }

	        // we only allow little movement
	        // and we've reached an end event, so a tap is possible
	        if (validMovement && validTouchTime && validPointers) {
	            if (input.eventType != INPUT_END) {
	                return this.failTimeout();
	            }

	            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
	            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

	            this.pTime = input.timeStamp;
	            this.pCenter = input.center;

	            if (!validMultiTap || !validInterval) {
	                this.count = 1;
	            } else {
	                this.count += 1;
	            }

	            this._input = input;

	            // if tap count matches we have recognized it,
	            // else it has began recognizing...
	            var tapCount = this.count % options.taps;
	            if (tapCount === 0) {
	                // no failing requirements, immediately trigger the tap event
	                // or wait as long as the multitap interval to trigger
	                if (!this.hasRequireFailures()) {
	                    return STATE_RECOGNIZED;
	                } else {
	                    this._timer = setTimeoutContext(function() {
	                        this.state = STATE_RECOGNIZED;
	                        this.tryEmit();
	                    }, options.interval, this);
	                    return STATE_BEGAN;
	                }
	            }
	        }
	        return STATE_FAILED;
	    },

	    failTimeout: function() {
	        this._timer = setTimeoutContext(function() {
	            this.state = STATE_FAILED;
	        }, this.options.interval, this);
	        return STATE_FAILED;
	    },

	    reset: function() {
	        clearTimeout(this._timer);
	    },

	    emit: function() {
	        if (this.state == STATE_RECOGNIZED) {
	            this._input.tapCount = this.count;
	            this.manager.emit(this.options.event, this._input);
	        }
	    }
	});

	/**
	 * Simple way to create a manager with a default set of recognizers.
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Hammer(element, options) {
	    options = options || {};
	    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
	    return new Manager(element, options);
	}

	/**
	 * @const {string}
	 */
	Hammer.VERSION = '2.0.7';

	/**
	 * default settings
	 * @namespace
	 */
	Hammer.defaults = {
	    /**
	     * set if DOM events are being triggered.
	     * But this is slower and unused by simple implementations, so disabled by default.
	     * @type {Boolean}
	     * @default false
	     */
	    domEvents: false,

	    /**
	     * The value for the touchAction property/fallback.
	     * When set to `compute` it will magically set the correct value based on the added recognizers.
	     * @type {String}
	     * @default compute
	     */
	    touchAction: TOUCH_ACTION_COMPUTE,

	    /**
	     * @type {Boolean}
	     * @default true
	     */
	    enable: true,

	    /**
	     * EXPERIMENTAL FEATURE -- can be removed/changed
	     * Change the parent input target element.
	     * If Null, then it is being set the to main element.
	     * @type {Null|EventTarget}
	     * @default null
	     */
	    inputTarget: null,

	    /**
	     * force an input class
	     * @type {Null|Function}
	     * @default null
	     */
	    inputClass: null,

	    /**
	     * Default recognizer setup when calling `Hammer()`
	     * When creating a new Manager these will be skipped.
	     * @type {Array}
	     */
	    preset: [
	        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
	        [RotateRecognizer, {enable: false}],
	        [PinchRecognizer, {enable: false}, ['rotate']],
	        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
	        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
	        [TapRecognizer],
	        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
	        [PressRecognizer]
	    ],

	    /**
	     * Some CSS properties can be used to improve the working of Hammer.
	     * Add them to this method and they will be set when creating a new Manager.
	     * @namespace
	     */
	    cssProps: {
	        /**
	         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userSelect: 'none',

	        /**
	         * Disable the Windows Phone grippers when pressing an element.
	         * @type {String}
	         * @default 'none'
	         */
	        touchSelect: 'none',

	        /**
	         * Disables the default callout shown when you touch and hold a touch target.
	         * On iOS, when you touch and hold a touch target such as a link, Safari displays
	         * a callout containing information about the link. This property allows you to disable that callout.
	         * @type {String}
	         * @default 'none'
	         */
	        touchCallout: 'none',

	        /**
	         * Specifies whether zooming is enabled. Used by IE10>
	         * @type {String}
	         * @default 'none'
	         */
	        contentZooming: 'none',

	        /**
	         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
	         * @type {String}
	         * @default 'none'
	         */
	        userDrag: 'none',

	        /**
	         * Overrides the highlight color shown when the user taps a link or a JavaScript
	         * clickable element in iOS. This property obeys the alpha value, if specified.
	         * @type {String}
	         * @default 'rgba(0,0,0,0)'
	         */
	        tapHighlightColor: 'rgba(0,0,0,0)'
	    }
	};

	var STOP = 1;
	var FORCED_STOP = 2;

	/**
	 * Manager
	 * @param {HTMLElement} element
	 * @param {Object} [options]
	 * @constructor
	 */
	function Manager(element, options) {
	    this.options = assign({}, Hammer.defaults, options || {});

	    this.options.inputTarget = this.options.inputTarget || element;

	    this.handlers = {};
	    this.session = {};
	    this.recognizers = [];
	    this.oldCssProps = {};

	    this.element = element;
	    this.input = createInputInstance(this);
	    this.touchAction = new TouchAction(this, this.options.touchAction);

	    toggleCssProps(this, true);

	    each(this.options.recognizers, function(item) {
	        var recognizer = this.add(new (item[0])(item[1]));
	        item[2] && recognizer.recognizeWith(item[2]);
	        item[3] && recognizer.requireFailure(item[3]);
	    }, this);
	}

	Manager.prototype = {
	    /**
	     * set options
	     * @param {Object} options
	     * @returns {Manager}
	     */
	    set: function(options) {
	        assign(this.options, options);

	        // Options that need a little more setup
	        if (options.touchAction) {
	            this.touchAction.update();
	        }
	        if (options.inputTarget) {
	            // Clean up existing event listeners and reinitialize
	            this.input.destroy();
	            this.input.target = options.inputTarget;
	            this.input.init();
	        }
	        return this;
	    },

	    /**
	     * stop recognizing for this session.
	     * This session will be discarded, when a new [input]start event is fired.
	     * When forced, the recognizer cycle is stopped immediately.
	     * @param {Boolean} [force]
	     */
	    stop: function(force) {
	        this.session.stopped = force ? FORCED_STOP : STOP;
	    },

	    /**
	     * run the recognizers!
	     * called by the inputHandler function on every movement of the pointers (touches)
	     * it walks through all the recognizers and tries to detect the gesture that is being made
	     * @param {Object} inputData
	     */
	    recognize: function(inputData) {
	        var session = this.session;
	        if (session.stopped) {
	            return;
	        }

	        // run the touch-action polyfill
	        this.touchAction.preventDefaults(inputData);

	        var recognizer;
	        var recognizers = this.recognizers;

	        // this holds the recognizer that is being recognized.
	        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
	        // if no recognizer is detecting a thing, it is set to `null`
	        var curRecognizer = session.curRecognizer;

	        // reset when the last recognizer is recognized
	        // or when we're in a new session
	        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
	            curRecognizer = session.curRecognizer = null;
	        }

	        var i = 0;
	        while (i < recognizers.length) {
	            recognizer = recognizers[i];

	            // find out if we are allowed try to recognize the input for this one.
	            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
	            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
	            //      that is being recognized.
	            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
	            //      this can be setup with the `recognizeWith()` method on the recognizer.
	            if (session.stopped !== FORCED_STOP && ( // 1
	                    !curRecognizer || recognizer == curRecognizer || // 2
	                    recognizer.canRecognizeWith(curRecognizer))) { // 3
	                recognizer.recognize(inputData);
	            } else {
	                recognizer.reset();
	            }

	            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
	            // current active recognizer. but only if we don't already have an active recognizer
	            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
	                curRecognizer = session.curRecognizer = recognizer;
	            }
	            i++;
	        }
	    },

	    /**
	     * get a recognizer by its event name.
	     * @param {Recognizer|String} recognizer
	     * @returns {Recognizer|Null}
	     */
	    get: function(recognizer) {
	        if (recognizer instanceof Recognizer) {
	            return recognizer;
	        }

	        var recognizers = this.recognizers;
	        for (var i = 0; i < recognizers.length; i++) {
	            if (recognizers[i].options.event == recognizer) {
	                return recognizers[i];
	            }
	        }
	        return null;
	    },

	    /**
	     * add a recognizer to the manager
	     * existing recognizers with the same event name will be removed
	     * @param {Recognizer} recognizer
	     * @returns {Recognizer|Manager}
	     */
	    add: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'add', this)) {
	            return this;
	        }

	        // remove existing
	        var existing = this.get(recognizer.options.event);
	        if (existing) {
	            this.remove(existing);
	        }

	        this.recognizers.push(recognizer);
	        recognizer.manager = this;

	        this.touchAction.update();
	        return recognizer;
	    },

	    /**
	     * remove a recognizer by name or instance
	     * @param {Recognizer|String} recognizer
	     * @returns {Manager}
	     */
	    remove: function(recognizer) {
	        if (invokeArrayArg(recognizer, 'remove', this)) {
	            return this;
	        }

	        recognizer = this.get(recognizer);

	        // let's make sure this recognizer exists
	        if (recognizer) {
	            var recognizers = this.recognizers;
	            var index = inArray(recognizers, recognizer);

	            if (index !== -1) {
	                recognizers.splice(index, 1);
	                this.touchAction.update();
	            }
	        }

	        return this;
	    },

	    /**
	     * bind event
	     * @param {String} events
	     * @param {Function} handler
	     * @returns {EventEmitter} this
	     */
	    on: function(events, handler) {
	        if (events === undefined$1) {
	            return;
	        }
	        if (handler === undefined$1) {
	            return;
	        }

	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            handlers[event] = handlers[event] || [];
	            handlers[event].push(handler);
	        });
	        return this;
	    },

	    /**
	     * unbind event, leave emit blank to remove all handlers
	     * @param {String} events
	     * @param {Function} [handler]
	     * @returns {EventEmitter} this
	     */
	    off: function(events, handler) {
	        if (events === undefined$1) {
	            return;
	        }

	        var handlers = this.handlers;
	        each(splitStr(events), function(event) {
	            if (!handler) {
	                delete handlers[event];
	            } else {
	                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
	            }
	        });
	        return this;
	    },

	    /**
	     * emit event to the listeners
	     * @param {String} event
	     * @param {Object} data
	     */
	    emit: function(event, data) {
	        // we also want to trigger dom events
	        if (this.options.domEvents) {
	            triggerDomEvent(event, data);
	        }

	        // no handlers, so skip it all
	        var handlers = this.handlers[event] && this.handlers[event].slice();
	        if (!handlers || !handlers.length) {
	            return;
	        }

	        data.type = event;
	        data.preventDefault = function() {
	            data.srcEvent.preventDefault();
	        };

	        var i = 0;
	        while (i < handlers.length) {
	            handlers[i](data);
	            i++;
	        }
	    },

	    /**
	     * destroy the manager and unbinds all events
	     * it doesn't unbind dom events, that is the user own responsibility
	     */
	    destroy: function() {
	        this.element && toggleCssProps(this, false);

	        this.handlers = {};
	        this.session = {};
	        this.input.destroy();
	        this.element = null;
	    }
	};

	/**
	 * add/remove the css properties as defined in manager.options.cssProps
	 * @param {Manager} manager
	 * @param {Boolean} add
	 */
	function toggleCssProps(manager, add) {
	    var element = manager.element;
	    if (!element.style) {
	        return;
	    }
	    var prop;
	    each(manager.options.cssProps, function(value, name) {
	        prop = prefixed(element.style, name);
	        if (add) {
	            manager.oldCssProps[prop] = element.style[prop];
	            element.style[prop] = value;
	        } else {
	            element.style[prop] = manager.oldCssProps[prop] || '';
	        }
	    });
	    if (!add) {
	        manager.oldCssProps = {};
	    }
	}

	/**
	 * trigger dom event
	 * @param {String} event
	 * @param {Object} data
	 */
	function triggerDomEvent(event, data) {
	    var gestureEvent = document.createEvent('Event');
	    gestureEvent.initEvent(event, true, true);
	    gestureEvent.gesture = data;
	    data.target.dispatchEvent(gestureEvent);
	}

	assign(Hammer, {
	    INPUT_START: INPUT_START,
	    INPUT_MOVE: INPUT_MOVE,
	    INPUT_END: INPUT_END,
	    INPUT_CANCEL: INPUT_CANCEL,

	    STATE_POSSIBLE: STATE_POSSIBLE,
	    STATE_BEGAN: STATE_BEGAN,
	    STATE_CHANGED: STATE_CHANGED,
	    STATE_ENDED: STATE_ENDED,
	    STATE_RECOGNIZED: STATE_RECOGNIZED,
	    STATE_CANCELLED: STATE_CANCELLED,
	    STATE_FAILED: STATE_FAILED,

	    DIRECTION_NONE: DIRECTION_NONE,
	    DIRECTION_LEFT: DIRECTION_LEFT,
	    DIRECTION_RIGHT: DIRECTION_RIGHT,
	    DIRECTION_UP: DIRECTION_UP,
	    DIRECTION_DOWN: DIRECTION_DOWN,
	    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
	    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
	    DIRECTION_ALL: DIRECTION_ALL,

	    Manager: Manager,
	    Input: Input,
	    TouchAction: TouchAction,

	    TouchInput: TouchInput,
	    MouseInput: MouseInput,
	    PointerEventInput: PointerEventInput,
	    TouchMouseInput: TouchMouseInput,
	    SingleTouchInput: SingleTouchInput,

	    Recognizer: Recognizer,
	    AttrRecognizer: AttrRecognizer,
	    Tap: TapRecognizer,
	    Pan: PanRecognizer,
	    Swipe: SwipeRecognizer,
	    Pinch: PinchRecognizer,
	    Rotate: RotateRecognizer,
	    Press: PressRecognizer,

	    on: addEventListeners,
	    off: removeEventListeners,
	    each: each,
	    merge: merge,
	    extend: extend,
	    assign: assign,
	    inherit: inherit,
	    bindFn: bindFn,
	    prefixed: prefixed
	});

	// this prevents errors when Hammer is loaded in the presence of an AMD
	//  style loader but by script tag, not by the loader.
	var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
	freeGlobal.Hammer = Hammer;

	if (typeof undefined$1 === 'function' && undefined$1.amd) {
	    undefined$1(function() {
	        return Hammer;
	    });
	} else if ( module.exports) {
	    module.exports = Hammer;
	} else {
	    window[exportName] = Hammer;
	}

	})(window, document, 'Hammer');
	});

	/**
	 * The parent class of interaction
	 * @author sima.zhang1990@gmail.com
	 */


	var Hammer;

	if (!common.isWx && !common.isMy) {
	  Hammer = hammer;
	}

	var TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend'];

	var Interaction = /*#__PURE__*/function () {
	  var _proto = Interaction.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    return {
	      startEvent: TOUCH_EVENTS[0],
	      processEvent: TOUCH_EVENTS[1],
	      endEvent: TOUCH_EVENTS[2],
	      resetEvent: null
	    };
	  };

	  // override
	  _proto.start = function start() {} // override
	  ;

	  _proto.process = function process() {} // override
	  ;

	  _proto.end = function end() {} // override
	  ;

	  _proto.reset = function reset() {};

	  function Interaction(cfg, chart) {
	    var _this = this;

	    this._start = function (ev) {
	      _this.preStart && _this.preStart(ev);

	      _this.start(ev);

	      _this.onStart && _this.onStart(ev);
	    };

	    this._process = function (ev) {
	      _this.preProcess && _this.preProcess(ev);

	      _this.process(ev);

	      _this.onProcess && _this.onProcess(ev);
	    };

	    this._end = function (ev) {
	      _this.preEnd && _this.preEnd(ev);

	      _this.end(ev);

	      _this.onEnd && _this.onEnd(ev);
	    };

	    this._reset = function (ev) {
	      _this.preReset && _this.preReset(ev);

	      _this.reset(ev);

	      _this.onReset && _this.onReset(ev);
	    };

	    var defaultCfg = this.getDefaultCfg();
	    common.deepMix(this, defaultCfg, cfg);
	    this.chart = chart;
	    this.canvas = chart.get('canvas');
	    this.el = chart.get('canvas').get('el');

	    this._bindEvents();
	  }

	  _proto._bindEvents = function _bindEvents() {
	    this._clearEvents(); // clear events


	    var startEvent = this.startEvent,
	        processEvent = this.processEvent,
	        endEvent = this.endEvent,
	        resetEvent = this.resetEvent,
	        el = this.el;

	    if (Hammer) {
	      this.hammer = new Hammer(el);
	    }

	    this._bindEvent(startEvent, this._start);

	    this._bindEvent(processEvent, this._process);

	    this._bindEvent(endEvent, this._end);

	    this._bindEvent(resetEvent, this._reset);
	  };

	  _proto._clearEvents = function _clearEvents() {
	    var startEvent = this.startEvent,
	        processEvent = this.processEvent,
	        endEvent = this.endEvent,
	        resetEvent = this.resetEvent;

	    if (this.hammer) {
	      this.hammer.destroy();
	      this.hammer = null;
	    }

	    this._clearTouchEvent(startEvent, this._start);

	    this._clearTouchEvent(processEvent, this._process);

	    this._clearTouchEvent(endEvent, this._end);

	    this._clearTouchEvent(resetEvent, this._reset);
	  };

	  _proto._bindEvent = function _bindEvent(eventName, method) {
	    var el = this.el;

	    if (eventName) {
	      if (TOUCH_EVENTS.indexOf(eventName) !== -1) {
	        common.addEventListener(el, eventName, method);
	      } else if (this.hammer) {
	        this.hammer.on(eventName, method);
	      }
	    }
	  };

	  _proto._clearTouchEvent = function _clearTouchEvent(eventName, method) {
	    var el = this.el;

	    if (eventName && TOUCH_EVENTS.indexOf(eventName) !== -1) {
	      common.removeEventListener(el, eventName, method);
	    }
	  };

	  _proto.destroy = function destroy() {
	    this._clearEvents();
	  };

	  return Interaction;
	}();

	var base$6 = Interaction;

	var _possibleConstructorReturn2$o = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$o = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$o = interopRequireDefault(inheritsLoose);









	var IntervalSelect = /*#__PURE__*/function (_Interaction) {
	  (0, _inheritsLoose2$o["default"])(IntervalSelect, _Interaction);

	  var _proto = IntervalSelect.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    var defaultCfg = _Interaction.prototype.getDefaultCfg.call(this);

	    defaultCfg = common.mix({}, defaultCfg, {
	      startEvent: 'tap',
	      processEvent: null,
	      selectAxis: true,
	      selectAxisStyle: {
	        fontWeight: 'bold'
	      },
	      mode: 'shape',
	      selectStyle: {
	        fillOpacity: 1
	      },
	      unSelectStyle: {
	        fillOpacity: 0.4
	      },
	      cancelable: true,
	      defaultSelected: null // set the default selected shape

	    });

	    if (common.isWx || common.isMy) {
	      // 小程序
	      defaultCfg.startEvent = 'touchstart';
	      defaultCfg.endEvent = 'touchend';
	    }

	    return defaultCfg;
	  };

	  function IntervalSelect(cfg, chart) {
	    var _this;

	    _this = _Interaction.call(this, cfg, chart) || this;
	    var defaultSelected = _this.defaultSelected;

	    if (common.isObject(defaultSelected)) {
	      var _this$_selectShapesBy = _this._selectShapesByData(defaultSelected),
	          selectedShape = _this$_selectShapesBy.selectedShape,
	          unSelectedShapes = _this$_selectShapesBy.unSelectedShapes;

	      selectedShape && _this._selectShapes(selectedShape, unSelectedShapes);
	      _this.selectedShape = selectedShape;
	    }

	    return _this;
	  }

	  _proto._getIntervalShapes = function _getIntervalShapes() {
	    var children = [];
	    var chart = this.chart;
	    var geoms = chart.get('geoms');
	    geoms.forEach(function (geom) {
	      if (geom.get('type') === 'interval') {
	        // only works for Interval geometry type
	        var container = geom.get('container');
	        children = children.concat(container.get('children'));
	      }
	    });
	    return children;
	  };

	  _proto._resetShape = function _resetShape(shape) {
	    var originAttrs = shape.get('_originAttrs');

	    if (originAttrs) {
	      shape._attrs.attrs = originAttrs;
	      shape.set('_originAttrs', null);
	    }
	  };

	  _proto._setEventData = function _setEventData(ev) {
	    var selectedShape = this.selectedShape;

	    if (selectedShape && !selectedShape.get('destroyed')) {
	      ev.data = selectedShape.get('origin')._origin;
	      ev.shapeInfo = selectedShape.get('origin');
	      ev.shape = selectedShape;
	      ev.selected = !!selectedShape.get('_selected');
	    }
	  };

	  _proto._selectShapesByData = function _selectShapesByData(data) {
	    var children = this._getIntervalShapes();

	    var selectedShape = null;
	    var unSelectedShapes = [];
	    common.each(children, function (child) {
	      if (child.get('isShape') && child.get('className') === 'interval') {
	        // get geometry's shape
	        var shapeData = child.get('origin')._origin;

	        if (common.isObjectValueEqual(shapeData, data)) {
	          selectedShape = child;
	        } else {
	          unSelectedShapes.push(child);
	        }
	      }
	    });
	    return {
	      selectedShape: selectedShape,
	      unSelectedShapes: unSelectedShapes
	    };
	  };

	  _proto._selectShapes = function _selectShapes(selectedShape, unSelectedShapes) {
	    var selectStyle = this.selectStyle,
	        unSelectStyle = this.unSelectStyle,
	        selectAxisStyle = this.selectAxisStyle,
	        chart = this.chart;

	    if (!selectedShape.get('_originAttrs')) {
	      var originAttrs = Object.assign({}, selectedShape.attr());
	      selectedShape.set('_originAttrs', originAttrs);
	    }

	    selectedShape.attr(selectStyle);
	    common.each(unSelectedShapes, function (child) {
	      if (!child.get('_originAttrs')) {
	        var _originAttrs = Object.assign({}, child.attr());

	        child.set('_originAttrs', _originAttrs);
	      } else {
	        child.attr(child.get('_originAttrs'));
	      }

	      child.set('_selected', false);
	      unSelectStyle && child.attr(unSelectStyle);
	    });
	    selectedShape.set('_selected', true);

	    if (this.selectAxis) {
	      if (this.selectedAxisShape) {
	        this._resetShape(this.selectedAxisShape);
	      }

	      var xScale = chart.getXScale();

	      var origin = selectedShape.get('origin')._origin;

	      var _chart$get = chart.get('axisController'),
	          frontPlot = _chart$get.frontPlot,
	          backPlot = _chart$get.backPlot;

	      var axisShape;
	      common.each(frontPlot.get('children').concat(backPlot.get('children')), function (s) {
	        if (s.get('value') === xScale.scale(origin[xScale.field])) {
	          axisShape = s;
	          return false;
	        }
	      });
	      this.selectedAxisShape = axisShape;
	      axisShape.set('_originAttrs', Object.assign({}, axisShape.attr()));
	      axisShape.attr(selectAxisStyle);
	    }

	    this.canvas.draw();
	  };

	  _proto.reset = function reset() {
	    var self = this;

	    if (!self.selectedShape) {
	      return;
	    }

	    var children = self._getIntervalShapes();

	    common.each(children, function (child) {
	      self._resetShape(child);

	      child.set('_selected', false);
	    });

	    if (self.selectedAxisShape) {
	      self._resetShape(self.selectedAxisShape);
	    }

	    self.canvas.draw();
	    self.selectedShape = null;
	    self.selectedAxisShape = null;
	  };

	  _proto.start = function start(ev) {
	    var chart = this.chart;

	    if (ev.type === 'tap') {
	      ev.clientX = ev.center.x;
	      ev.clientY = ev.center.y;
	    }

	    var _Util$createEvent = common.createEvent(ev, chart),
	        x = _Util$createEvent.x,
	        y = _Util$createEvent.y;

	    var mode = this.mode;

	    var children = this._getIntervalShapes();

	    var selectedShape;
	    var unSelectedShapes = [];

	    if (mode === 'shape') {
	      var plot = chart.get('plotRange');

	      if (!helper.isPointInPlot({
	        x: x,
	        y: y
	      }, plot)) {
	        this.reset();
	        return;
	      }

	      common.each(children, function (child) {
	        var box = child.getBBox();

	        if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.height + box.y) {
	          // inbox
	          selectedShape = child;
	        } else {
	          unSelectedShapes.push(child);
	        }
	      });
	    } else if (mode === 'range') {
	      var records = chart.getSnapRecords({
	        x: x,
	        y: y
	      });

	      if (!records.length) {
	        this.reset();
	        return;
	      }

	      var data = records[0]._origin;

	      var result = this._selectShapesByData(data);

	      selectedShape = result.selectedShape;
	      unSelectedShapes = result.unSelectedShapes;
	    }

	    if (selectedShape) {
	      this.selectedShape = selectedShape;

	      if (selectedShape.get('_selected')) {
	        if (!this.cancelable) {
	          this._setEventData(ev);

	          return;
	        }

	        this.reset();
	      } else {
	        this._selectShapes(selectedShape, unSelectedShapes);
	      }
	    } else {
	      this.reset();
	    }

	    this._setEventData(ev);
	  };

	  _proto.end = function end(ev) {
	    this._setEventData(ev);
	  };

	  return IntervalSelect;
	}(base$6);

	chart.registerInteraction('interval-select', IntervalSelect);

	/**
	 * filter the data out of scale' range
	 */




	var filter$1 = {
	  beforeGeomInit: function beforeGeomInit(chart) {
	    chart.set('limitInPlot', true);
	    var data = chart.get('filteredData');
	    var colDefs = chart.get('colDefs');
	    if (!colDefs) return data;
	    var geoms = chart.get('geoms');
	    var isSpecialGeom = false; // TODO

	    common.each(geoms, function (geom) {
	      if (['area', 'line', 'path'].indexOf(geom.get('type')) !== -1) {
	        isSpecialGeom = true;
	        return false;
	      }
	    });
	    var fields = [];
	    common.each(colDefs, function (def, key) {
	      if (!isSpecialGeom && def && (def.values || def.min || def.max)) {
	        fields.push(key);
	      }
	    });

	    if (fields.length === 0) {
	      return data;
	    }

	    var geomData = [];
	    common.each(data, function (obj) {
	      var flag = true;
	      common.each(fields, function (field) {
	        var value = obj[field];

	        if (value) {
	          var colDef = colDefs[field];

	          if (colDef.type === 'timeCat') {
	            var values = colDef.values;

	            if (common.isNumber(values[0])) {
	              value = timeUtil.toTimeStamp(value);
	            }
	          }

	          if (colDef.values && colDef.values.indexOf(value) === -1 || colDef.min && value < colDef.min || colDef.max && value > colDef.max) {
	            flag = false;
	          }
	        }
	      });

	      if (flag) {
	        geomData.push(obj);
	      }
	    });
	    chart.set('filteredData', geomData);
	  }
	};

	var TOUCH_EVENTS$1 = ['touchstart', 'touchmove', 'touchend', 'touchStart', 'touchMove', 'touchEnd'];
	var DAY_TIMESTAMPS = 86400000;
	var move = {
	  _handleMove: function _handleMove(e) {
	    if (e.type === 'swipe' && e.deltaTime > 350) {
	      // 区分 pan 操作和 swipe 操作
	      return null;
	    }

	    var currentDeltaX = this.currentDeltaX,
	        currentDeltaY = this.currentDeltaY,
	        lastPoint = this.lastPoint;
	    var deltaX;
	    var deltaY;

	    if (TOUCH_EVENTS$1.indexOf(e.type) !== -1) {
	      // support touch and miniprogram
	      var currentPoint = e.touches[0];
	      deltaX = currentPoint.x - lastPoint.x;
	      deltaY = currentPoint.y - lastPoint.y;
	      this.lastPoint = currentPoint;
	    } else if (currentDeltaX !== null && currentDeltaY !== null) {
	      deltaX = e.deltaX - currentDeltaX;
	      deltaY = e.deltaY - currentDeltaY;
	      this.currentDeltaX = e.deltaX;
	      this.currentDeltaY = e.deltaY;
	    }

	    if (Math.abs(deltaX) > 0 || Math.abs(deltaY) > 0) {
	      var lastTimestamp = this._timestamp;
	      var now = +new Date();

	      if (now - lastTimestamp > 16) {
	        this._doMove(deltaX, deltaY);

	        this._timestamp = now;
	      }
	    }
	  },
	  _doMove: function _doMove(deltaX, deltaY) {
	    var self = this;
	    var mode = self.mode,
	        chart = self.chart,
	        limitRange = self.limitRange;
	    var coord = chart.get('coord');
	    var start = coord.start,
	        end = coord.end;
	    var data = chart.get('data');

	    if (common.directionEnabled(mode, 'x') && deltaX !== 0) {
	      var xScale = chart.getXScale();
	      var xField = xScale.field;

	      if (!limitRange[xField]) {
	        limitRange[xField] = helper$1.getLimitRange(data, xScale);
	      }

	      var coordWidth = end.x - start.x;

	      if (xScale.isCategory) {
	        self._handleCatScale(xScale, deltaX, coordWidth);
	      } else if (xScale.isLinear) {
	        self._handleLinearScale(xScale, deltaX, coordWidth, 'x');
	      }

	      self.xRange = helper$1.getFieldRange(xScale, limitRange[xField], xScale.type);
	    }

	    if (common.directionEnabled(mode, 'y') && deltaY !== 0) {
	      var coordHeight = start.y - end.y;
	      var yScales = chart.getYScales();
	      common.each(yScales, function (yScale) {
	        var yField = yScale.field;

	        if (!limitRange[yField]) {
	          limitRange[yField] = helper$1.getLimitRange(data, yScale);
	        }

	        yScale.isLinear && self._handleLinearScale(yScale, deltaY, coordHeight, 'y');
	      });
	      var scale = yScales[0];
	      self.yRange = helper$1.getFieldRange(scale, limitRange[scale.field], scale.type);
	    }

	    chart.repaint();
	  },
	  _handleLinearScale: function _handleLinearScale(scale, delta, range, flag) {
	    var field = scale.field,
	        min = scale.min,
	        max = scale.max;
	    var limitRange = this.limitRange;
	    if (min === limitRange[field].min && max === limitRange[field].max) return;
	    var ratio = delta / range;
	    var panValue = ratio * (max - min);
	    var newMax = flag === 'x' ? max - panValue : max + panValue;
	    var newMin = flag === 'x' ? min - panValue : min + panValue;

	    if (limitRange[field] && !common.isNil(limitRange[field].min) && newMin <= limitRange[field].min) {
	      newMin = limitRange[field].min;
	      newMax = max - min + newMin;
	    }

	    if (limitRange[field] && !common.isNil(limitRange[field].max) && newMax >= limitRange[field].max) {
	      newMax = limitRange[field].max;
	      newMin = newMax - (max - min);
	    }

	    this.updateLinearScale(field, newMin, newMax);
	  },
	  _handleCatScale: function _handleCatScale(scale, delta, range) {
	    var type = scale.type,
	        field = scale.field,
	        values = scale.values,
	        ticks = scale.ticks;
	    var duplicateRemovalValues = common.uniq(values);
	    var originValues = this.limitRange[field];
	    var lastValueIndex = originValues.length - 1;
	    var currentLength = duplicateRemovalValues.length;
	    var speed = this.speed || 1;
	    var step = range / (currentLength * speed);
	    var firstIndex = originValues.indexOf(duplicateRemovalValues[0]);
	    var lastIndex = originValues.indexOf(duplicateRemovalValues[currentLength - 1]);
	    var minIndex = firstIndex;
	    var maxIndex = lastIndex;
	    var ratio = Math.abs(delta / range);
	    var panStep = this.step || Math.max(1, parseInt(ratio * currentLength));
	    this._panCumulativeDelta += delta;
	    minIndex = this._panCumulativeDelta > step ? Math.max(0, minIndex - panStep) : this._panCumulativeDelta < -step ? Math.min(lastValueIndex - currentLength + 1, minIndex + panStep) : minIndex;
	    maxIndex = Math.min(lastValueIndex, minIndex + currentLength - 1);

	    if (minIndex === firstIndex && maxIndex === lastIndex) {
	      return null;
	    }

	    var newValues = originValues.slice(minIndex, maxIndex + 1);
	    var newTicks = null;

	    if (type === 'timeCat') {
	      var tickGap = ticks.length > 2 ? ticks[1] - ticks[0] : DAY_TIMESTAMPS;

	      if (this._panCumulativeDelta > step) {
	        for (var i = ticks[0] - tickGap; i >= newValues[0]; i -= tickGap) {
	          ticks.unshift(i);
	        }
	      } else if (this._panCumulativeDelta < -step) {
	        for (var _i = ticks[ticks.length - 1] + tickGap; _i <= newValues[newValues.length - 1]; _i += tickGap) {
	          ticks.push(_i);
	        }
	      }

	      newTicks = ticks;
	    } else {
	      // 保留之前的ticks
	      newTicks = ticks;
	    }

	    this.updateCatScale(field, newValues, newTicks, originValues, minIndex, maxIndex);
	    this._panCumulativeDelta = minIndex !== firstIndex ? 0 : this._panCumulativeDelta;
	  }
	};

	var updateScale = {
	  updateLinearScale: function updateLinearScale(field, min, max) {
	    var chart = this.chart;
	    var scale = helper$1.getScale(chart, field); // const colDef = Helper.getColDef(chart, field);
	    // chart.scale(field, Util.mix({}, colDef, {
	    //   min,
	    //   max,
	    //   nice: false
	    // }));

	    scale.change({
	      min: min,
	      max: max,
	      nice: false
	    });
	  },
	  updateCatScale: function updateCatScale(field, newValues, ticks, values, minIndex, maxIndex) {
	    var chart = this.chart; // const colDef = Helper.getColDef(chart, field);

	    var scale = helper$1.getScale(chart, field);
	    scale.change({
	      values: newValues,
	      ticks: ticks,
	      scale: function scale(value) {
	        if (this.type === 'timeCat') {
	          value = this._toTimeStamp(value);
	        }

	        var rangeMin = this.rangeMin();
	        var rangeMax = this.rangeMax();
	        var range = rangeMax - rangeMin;
	        var min;
	        var max;
	        var percent;
	        var currentIndex = values.indexOf(value); // 在完整数据集中的索引值

	        if (currentIndex >= 0 && currentIndex < minIndex) {
	          // 不在范围内，左侧数据
	          max = rangeMin > 0 ? -0.1 : rangeMin - 0.1;
	          min = max - range;
	          percent = currentIndex / minIndex;
	        } else if (currentIndex >= 0 && currentIndex > maxIndex) {
	          // 不在范围内，右侧数据
	          min = rangeMax < 1 ? 1.1 : rangeMax + 0.1;
	          max = min + range;
	          percent = (currentIndex - maxIndex - 1) / (values.length - 1 - maxIndex);
	        } else {
	          // 数值在当前 this.values 范围内
	          var index = this.translate(value);

	          if (this.values.length === 1) {
	            percent = index;
	          } else {
	            percent = index / (this.values.length - 1);
	          }

	          min = rangeMin;
	          max = rangeMax;
	        }

	        return min + percent * (max - min);
	      },
	      getTicks: function getTicks() {
	        var self = this;
	        var ticks = this.ticks;
	        var rst = [];
	        common.each(ticks, function (tick) {
	          var obj;

	          if (common.isObject(tick)) {
	            obj = tick;
	          } else {
	            var value = self.scale(tick);
	            value = value >= 0 && value <= 1 ? value : NaN;
	            obj = {
	              text: common.isString(tick) ? tick : self.getText(tick),
	              value: value,
	              tickValue: tick // 用于坐标轴上文本动画时确定前后帧的对应关系

	            };
	          }

	          rst.push(obj);
	        });
	        return rst;
	      }
	    });
	  }
	};

	var _assertThisInitialized2$2 = interopRequireDefault(assertThisInitialized);

	var _possibleConstructorReturn2$p = interopRequireDefault(possibleConstructorReturn);

	var _getPrototypeOf2$p = interopRequireDefault(getPrototypeOf);

	var _inheritsLoose2$p = interopRequireDefault(inheritsLoose);









	 // const PressTooltipMixin = require('./mixin/press-tooltip');




	var Pan = /*#__PURE__*/function (_Interaction) {
	  (0, _inheritsLoose2$p["default"])(Pan, _Interaction);

	  var _proto = Pan.prototype;

	  _proto.getDefaultCfg = function getDefaultCfg() {
	    var defaultCfg = _Interaction.prototype.getDefaultCfg.call(this);

	    defaultCfg = common.mix({}, defaultCfg, {
	      startEvent: 'panstart',
	      processEvent: 'panmove',
	      endEvent: 'panend',
	      resetEvent: 'touchend',
	      mode: 'x',
	      panThreshold: 10,
	      // Minimal pan distance required before recognizing
	      pressThreshold: 9,
	      // Minimal movement that is allowed while pressing
	      pressTime: 251,
	      // Minimal press time in ms
	      currentDeltaX: null,
	      currentDeltaY: null,
	      limitRange: {},
	      _timestamp: 0,
	      lastPoint: null,
	      _panCumulativeDelta: 0,
	      speed: 5
	    });

	    if (common.isWx || common.isMy) {
	      // 小程序
	      defaultCfg.startEvent = 'touchstart';
	      defaultCfg.processEvent = 'touchmove';
	      defaultCfg.endEvent = 'touchend';
	    }

	    return defaultCfg;
	  };

	  function Pan(cfg, chart) {
	    var _this;

	    _this = _Interaction.call(this, cfg, chart) || this;
	    var self = (0, _assertThisInitialized2$2["default"])(_this);
	    var hammer = self.hammer,
	        panThreshold = self.panThreshold;

	    if (hammer) {
	      hammer.get('pan').set({
	        threshold: panThreshold
	      }); // 为了兼容hammer的pan 和 tooltips里的press, 后面去hammerjs的时候需要去掉

	      chart.get('canvas').on('pan', function () {});
	    }

	    chart.registerPlugins([filter$1, {
	      changeData: function changeData() {
	        self.limitRange = {};
	      },
	      clear: function clear() {
	        self.limitRange = {};
	      }
	    }]);
	    common.mix((0, _assertThisInitialized2$2["default"])(_this), updateScale, move);
	    return _this;
	  }

	  _proto.start = function start(e) {
	    if (this.pressed) return;
	    this.currentDeltaX = 0;
	    this.currentDeltaY = 0;

	    if (e.type === 'touchstart' || e.type === 'touchStart') {
	      this.lastPoint = e.touches[0];
	    }

	    this._handleMove(e);
	  };

	  _proto.process = function process(e) {
	    if (this.pressed) return;

	    this._handleMove(e);
	  };

	  _proto.end = function end() {
	    if (this.pressed) return;
	    this.currentDeltaX = null;
	    this.currentDeltaY = null;
	    this.lastPoint = null;
	    this._panCumulativeDelta = 0;
	  };

	  return Pan;
	}(base$6);

	chart.registerInteraction('pan', Pan);

	core.Chart.plugins.register(detail);

	core.Chart.plugins.register(tooltip$1);

	core.Chart.plugins.register(legend);

	core.Chart.plugins.register(scrollBar);
	 // 只加载折线图
	 // 只加载柱状图
	 // 只加载色块图
	 // 极坐标
	 // 弧长坐标轴（用于极坐标）
	 // 只引入 interval-select 柱状图选中交互
	 // 只引入 pan 图表平移交互

	function wrapEvent(e) {
	  if (!e) return;
	  if (!e.preventDefault) {
	    e.preventDefault = function() {};
	  }
	  return e;
	}

	Component({
	  /**
	   * 组件的属性列表
	   */
	  properties: {
	    onInit: {
	      type: 'Function',
	      value: () => {}
	    }
	  },

	  /**
	   * 组件的初始数据
	   */
	  data: {

	  },

	  ready() {
	    const query = wx.createSelectorQuery().in(this);
	    query.select('.f2-canvas')
	      .fields({
	        node: true,
	        size: true
	      })
	      .exec(res => {
	        const { node, width, height } = res[0];
	        const context = node.getContext('2d');
	        const pixelRatio = wx.getSystemInfoSync().pixelRatio;
	        // 高清设置
	        node.width = width * pixelRatio;
	        node.height = height * pixelRatio;
	        const config = { context, width, height, pixelRatio };
	        const chart = this.data.onInit(core, config);
	        if (chart) {
	          this.chart = chart;
	          this.canvasEl = chart.get('el');
	        }
	      });
	  },

	  /**
	   * 组件的方法列表
	   */
	  methods: {
	    touchStart(e) {
	      const canvasEl = this.canvasEl;
	      if (!canvasEl) {
	        return;
	      }
	      canvasEl.dispatchEvent('touchstart', wrapEvent(e));
	    },
	    touchMove(e) {
	      const canvasEl = this.canvasEl;
	      if (!canvasEl) {
	        return;
	      }
	      canvasEl.dispatchEvent('touchmove', wrapEvent(e));
	    },
	    touchEnd(e) {
	      const canvasEl = this.canvasEl;
	      if (!canvasEl) {
	        return;
	      }
	      canvasEl.dispatchEvent('touchend', wrapEvent(e));
	    }
	  }
	});

})));
