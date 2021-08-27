const dev = require('./dev')
const prod = require('./prod')

const keys = (host) => {
    return host.includes('dev') ?
        dev :
        host.includes('local') ?
            localhost :
            prod
}

module.exports = { keys };
