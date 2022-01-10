let d1 = {name: '', age: ''}
let d2 = {name: 'aaa', age: 'bbb'}

let p1 = new Proxy(d1, {
  get(target, p, receiver) {
    return target[p]
  },
  set(target, p, value, receiver) {
    target[p] = value
    return true
  }
})

let p2 = new Proxy(d2, {
  get(target, p, receiver) {
    return target[p]
  },
  set(target, p, value, receiver) {
    target[p] = value
    return true
  }
})

p1['name'] = p2['name']