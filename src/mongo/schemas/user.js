let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let UserSchema = new Schema({
  nickname: {type: String, trim: true, required: true},
  nickname_reset_at: {type: Date, default: Date.now()},
  create_at: {type: Date, default: Date.now()},
  last_login_at: {type: Date, default: Date.now()},
  // user role
  role: {type: String, enum: ["admin", "customer", "landlord"], required: true},
  avatar: {type: String, default: ''},
  // 0 - unknow, 1 - male, 2 - female
  gender: {
    type: Number,
    default: 0,
    validate: {
      validator: function(v) {
        return v === 0 || v === 1 || v === 2;
      },
      message: props => `${props.value} is not one of 0, 1, and 2!`
    }
  },
  brief: {type: String, maxlength: [70, 'brief too long'], default: ''},
  country: {type: String, default: ''},
  province: {type: String, default: ''},
  city: {type: String, default: ''},
  // following house
  follow_house: [{type: ObjectId, ref: 'House'}],
  // Email
  email: {type: ObjectId, ref: 'Email', default: null},
  // Phone Number
  phone: {type: ObjectId, ref: 'Phone', default: null},
});

mongoose.model('User', UserSchema);
