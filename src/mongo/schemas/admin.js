let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let AdminSchema = new Schema({

  // Rate of deposit in %, default 5%
  deposit_rate: {
    type: Number,
    min: [0, 'deposit rate must larger than 0'],
    default: 5,
  },
  last_update_at: {type: Date, default: Date.now()},
  create_at: {type: Date, default: Date.now()},
});

mongoose.model('Admin', AdminSchema);
