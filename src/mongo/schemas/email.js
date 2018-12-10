let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let EmailSchema = new Schema({
  // User
  user: {type: ObjectId, ref: 'User', unique: true, required: true},
  // Email
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Incorrect email format'],
    // match: [/^\d$/, 'Incorrect email format'],
    lowercase: true,
    unique: true,
    default: '',
  },
  create_at: {type: Date, default: Date.now()},
});

mongoose.model('Email', EmailSchema);
