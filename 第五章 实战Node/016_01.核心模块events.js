let EventEmitter = require('events')
// let EventEmitter = require('./016_02.实现events')

let eventHelper = new EventEmitter()
// process.nextTick(() => {
//     eventHelper.emit("toHomePage", "第二次触发Home")
// })
eventHelper.on("toHomePage", (data) => {        // on
    console.log(`toHomePage_first:`, data)
})
eventHelper.on("toHomePage", (data) => {
    console.log(`toHomePage_second:`, data)
})
let thirdFn = (data) => { console.log(`toHomePage_third:`, data) }
eventHelper.on("toHomePage", thirdFn)
eventHelper.off("toHomePage", thirdFn)                  // off
eventHelper.emit("toHomePage", "第一次触发Home")     // emit


eventHelper.once("toLoginPage", (data) => {      // once
    console.log(`toLoginPage_first:`, data)
})
eventHelper.emit("toLoginPage", "第一次触发Login")
eventHelper.emit("toLoginPage", "第二次触发Login")
