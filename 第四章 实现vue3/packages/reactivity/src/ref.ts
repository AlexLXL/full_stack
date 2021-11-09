import {hasChange, isArray, isObject} from "@vue/shared";
import {reactive} from "./reactive";
import {track, trigger} from "./effect";

export function ref(value) {
    return createRef(value, false)
}

export function shallowRef(value) {
    return createRef(value, true)
}

function createRef(value, isShallow = false) {
    return new RefImpl(value, isShallow)
}

const convert = val => isObject(val) ? reactive(val) : val
class RefImpl {
    private _value
    constructor(private rawValue, public isShallow) {
        this._value = isShallow ? rawValue : convert(rawValue)
    }
    get value() {
        track(this, 'get', 'value')
        return this._value
    }
    set value(newValue) {
        if (hasChange(newValue, this.rawValue)) {
            this.rawValue = newValue
            this._value = this.isShallow ? newValue : convert(newValue)
            trigger(this, 'value', newValue, 'set')
        }
    }
}


export function toRef(target, key) {
    return new ObjectRefImpl(target, key)
}
class ObjectRefImpl {
    constructor(public target, public key) {}
    get value() {
        track(this, 'get', 'value')
        return this.target[this.key]
    }
    set value(newValue) {
        this.target[this.key] = newValue
        trigger(this, 'value', newValue, 'set')
    }
}

export function toRefs(object) {
    let ret = isArray(object) ? Array(object.length) : {}
    for (let key in object) {
        ret[key] = toRef(object, key)
    }
    return ret
}