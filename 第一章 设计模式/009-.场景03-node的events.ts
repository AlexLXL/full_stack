let EventEmmiter = require("events")
let subject = new EventEmmiter()
subject.on("click", (name, age) => {
    console.log(1, name, age)
})
subject.on("click", (name, age) => {
    console.log(2, name, age)
})
subject.emit("click", "alex", 18)