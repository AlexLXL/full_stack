import {patchClass} from "./modules/class";
import {patchStyle} from "./modules/style";
import {patchEvent} from "./modules/event";
import {patchAttr} from "./modules/attr";

export function patchProp(el, key, oldValue, newValue) {
    switch (key) {
        case 'class':
            patchClass(el, newValue)
            break;
        case 'style':
            patchStyle(el, oldValue, newValue)
            break;
        default:
            if (/^on[a-z]/.test(key)) {
                patchEvent(el, key, newValue)
            }else {
                patchAttr(el, key, newValue)
            }
    }
}