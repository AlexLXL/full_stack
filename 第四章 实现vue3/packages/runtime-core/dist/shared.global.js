var vueShared = (function (exports) {
	'use strict';

	const isObject = (v) => typeof v === 'object' && v !== null;
	const isArray = Array.isArray;
	const hasChange = (oldValue, newValue) => oldValue !== newValue;
	const isInteger = (key) => parseInt(key) + '' === key; // 数组的下标
	const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

	exports.hasChange = hasChange;
	exports.hasOwn = hasOwn;
	exports.isArray = isArray;
	exports.isInteger = isInteger;
	exports.isObject = isObject;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
//# sourceMappingURL=shared.global.js.map
