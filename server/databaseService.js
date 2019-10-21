const logger = require('./databaseDriver');

module.exports = server => {
  server.use('/api/getLatestList', (req, res) => {
    console.log("getLatestList has been fetched.");
    res.send('Hello World\n');
  });

  server.use('/api/submit', (req, res) => {
    console.log("submit has been fetched, ", req.body);
  })
};