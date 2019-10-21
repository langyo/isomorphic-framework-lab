const mongoose = require('mongoose');

let db = mongoose.createConnection('mongodb://localhost/morning_check');

db.on('error', e => (console.error(e), process.exit()));

db.once('open', () => {
  console.log('Database has been connected.');
});

module.exports = db.model("Log", mongoose.Schema({
  date: Date,
  grade: Number,
  classId: Number,
  reports: [{
    name: String,
    sex: {
      type: String,
      enum: ["boy", "girl"]
    },
    reason: String
  }]
}));
