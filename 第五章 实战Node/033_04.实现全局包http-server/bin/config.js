let config = {
    'port': {
        option: '-p,--port <n>',
        description: 'set server port',
        default: 9093,
        usage: 'lhs --port <n>'
    },
    'directory': {
        option: '-d,--directory <n>',
        description: 'set server directory',
        default: process.cwd(),
        usage: 'lhs -d D:\\aaa'
    }
}

module.exports = config