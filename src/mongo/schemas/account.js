let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let AccountSchema = new Schema({
  username: {
    type: String,
    minlength: [4, 'username too long'],
    maxlength: [13, 'username too short'],
    match: [/^[a-z]+[a-z0-9]*$/, 'Incorrect username format'],
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // User Info
  user: {type: ObjectId, ref: 'User', unique: true, required: true},

  create_at: {type: Date, default: Date.now()},
});

mongoose.model('Account', AccountSchema);
