let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let OrderSchema = new Schema({
  // User
  user: {type: ObjectId, ref: 'User', required: true},
  // House
  house: {type: ObjectId, ref: 'House', required: true},
  // Price in USD
  price: {
    type: Number,
    min: [1, 'price must larger than 0'],
    required: [true, 'price is required'],
  },
  // Date
  from: {type: Date, required: true},
  to: {type: Date, required: true},
  message: {type: String, default: ''},
  // Deposit
  deposit: {
    type: Number,
    min: [0, 'deposit must larger than 0'],
    default: 0,
  },
  deposit_received: {type: Boolean, default: false},
  // Rate of deposit in %, default 0%
  discount_rate: {
    type: Number,
    min: [0, 'discount rate must larger than 0'],
    max: [100, 'discount rate must less than 100'],
    default: 0,
  },
  confirm: {type: Boolean, default: false},
  confirm_at: {type: Date},
  create_at: {type: Date, default: Date.now()},
});

mongoose.model('Order', OrderSchema);
