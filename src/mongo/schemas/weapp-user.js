let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let WeappUserSchema = new Schema({
  open_id: {type: String, unique: true, required: true},
  // User Info
  user: {type: ObjectId, ref: 'User', unique: true, required: true},
  // Token for weapp
  // skey: {type: String, required: true},
  last_login_at: {type: Date, default: Date.now()},
  create_at: {type: Date, default: Date.now()},
});

mongoose.model('WeappUser', WeappUserSchema);
