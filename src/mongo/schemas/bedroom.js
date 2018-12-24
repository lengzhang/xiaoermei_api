let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let BedroomSchema = new Schema({
  // House
  house: {type: ObjectId, ref: 'House', required: true},
  // Type of Bed
  king: {type: Number, min: 0, default: 0},
  queen: {type: Number, min: 0, default: 0},
  double: {type: Number, min: 0, default: 0},
  single: {type: Number, min: 0, default: 0},
  sofa_bed: {type: Number, min: 0, default: 0},
  couch: {type: Number, min: 0, default: 0},
  air_mattress: {type: Number, min: 0, default: 0},
  bunk_bed: {type: Number, min: 0, default: 0},
  floor_mattress: {type: Number, min: 0, default: 0},
  roddler_bed: {type: Number, min: 0, default: 0},
  crib: {type: Number, min: 0, default: 0},
  water_bed: {type: Number, min: 0, default: 0},
  hammock: {type: Number, min: 0, default: 0},
  // Total number of beds
  total: {type: Number, min: 0, default: 0},
  create_at: {type: Date, default: Date.now()},
});

mongoose.model('Bedroom', BedroomSchema);
