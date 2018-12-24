let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let CommentSchema = new Schema({
  // Relate Type - House, Post
  relate_type: {type: String, enum: ["House"], required: true},
  // Relate ID
  relate_id: {type: ObjectId, required: true},
  // Comment From - User ID
  from: {type: ObjectId, ref: 'User', required: true},
  rating: {
    type: Number,
    min: [0, "Rating must be 0 to 5"],
    max: [5, "Rating must be 0 to 5"],
    required: true,
  },
  comment: {type: String, required: true},
  last_update_at: {type: Date, default: Date.now()},
  create_at: {type: Date, default: Date.now()},
});

mongoose.model('Comment', CommentSchema);
