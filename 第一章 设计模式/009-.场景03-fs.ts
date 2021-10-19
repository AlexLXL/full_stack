let fs = require("fs")
let rs = fs.createReadStream("./100.test.txt", { highWaterMark: 3 })
rs.on("data", (data) => {
    console.log(data.toString())
})
rs.on("end", () => {
    console.log("end")
})
