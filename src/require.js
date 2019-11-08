const client = require('./require.client');
const server = require('./require.server');

module.exports = typeof window !== "undefined" && this === window ? client : server;