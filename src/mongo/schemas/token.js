let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
import {jwt_expires} from '../../../config';

let TokenSchema = new Schema({
  // User
  user: {type: ObjectId, ref: 'User', unique: true, required: true},
  // Token
  token: {type: String, unique: true, required: true},
  // Exchange Count
  exchange_count: {type: Number, default: 0},
  // IP
  ip: {type: String, required: true},
  expires: {type: Date, default: (Date.now() + jwt_expires * 1000)},
  create_at: {type: Date, default: Date.now()},
});

mongoose.model('Token', TokenSchema);
