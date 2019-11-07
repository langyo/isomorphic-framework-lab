const { services } = require('./actionLoader');
const context = require('../server/context');

module.exports = server => {
  for (let path of Object.keys(services)) {
    server.use(path, (req, res) => services[path](context)(req, res));
  }
}