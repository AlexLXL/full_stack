var vueReactivity = (function (exports) {
	'use strict';

	let vueShared = "vueShared";

	// import {vueShared} from "../../shared/src/index";    // 这样引入会耦合,且打包到一起
	console.log(vueShared);
	let vueReactivity = "vueReactivity";

	exports.vueReactivity = vueReactivity;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
//# sourceMappingURL=reactivity.global.js.map
