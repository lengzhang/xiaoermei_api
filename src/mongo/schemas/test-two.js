let mongoose = require('mongoose');

let TestTwoSchema = new mongoose.Schema({
  context: {type: String, trim: true, required: true},
  create_at: {type: Date, expires: "60", default: Date.now()},
});

mongoose.model('TestTwo', TestTwoSchema);
