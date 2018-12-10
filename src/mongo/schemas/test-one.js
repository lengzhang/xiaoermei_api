let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let TestOneSchema = new Schema({
  context: {type: String, trim: true, required: true},
  test_two: [{type: ObjectId, ref: 'TestTwo'}],
  create_at: {type: Date, expires: "60", default: Date.now()},
});

mongoose.model('TestOne', TestOneSchema);
