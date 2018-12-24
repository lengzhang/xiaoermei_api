let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let PhotoSchema = new Schema({
  // House
  house: {type: ObjectId, ref: 'House', required: true},
  // AWS S3 keys
  key: {type: String, required: true},
  create_at: {type: Date, default: Date.now()},
});

mongoose.model('Photo', PhotoSchema);
