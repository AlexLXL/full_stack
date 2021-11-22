let Application = require('./application')
let Router = require('../Router')
function createApplication() {
    return new Application()
}

module.exports = createApplication
createApplication.Router = Router