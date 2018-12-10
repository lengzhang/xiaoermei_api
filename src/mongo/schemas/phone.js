let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let PhoneSchema = new Schema({
  // User
  user: {type: ObjectId, ref: 'User', unique: true, required: true},
  // Phone Number
  country_code: {
    type: String,
    default: '',
    match: [/^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)$/, 'Incorrect country code'],
  },
  phone: {
    type: String,
    default: '',
    unique: true,
    match: [/^\d{1,14}$/, 'Incorrect phone number'],
  },
  create_at: {type: Date, default: Date.now()},
});

mongoose.model('Phone', PhoneSchema);
