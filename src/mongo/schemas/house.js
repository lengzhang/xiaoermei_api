let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let HouseSchema = new Schema({
  // Owner
  owner: {type: ObjectId, ref: 'User', required: true},
  // Title
  title: {
    type: String,
    minlength: [3, 'title too short'],
    maxlength: [50, 'title too long'],
    trim: true,
    match: [/^\w+(\s(\w)+)*$/, 'Incorrect title format'],
    required: [true, 'title is required'],
  },
  // Property Type
  type: {
    type: String,
    enum: ['apartment', 'house', 'condominium'],
    required: [true, 'property type is required'],
  },
  // Rental Type
  // Entire Property, Private Room, Shared Room
  rental_type: {
    type: String,
    enum: ['entire', 'private', 'shared'],
    required: [true, 'rental type is required'],
  },
  // For Guest Only
  // Is this space only for guest, owner would not use
  guest_only: {
    type: Boolean,
    required: [true, 'guest only option is required'],
  },
  // Price in USD
  price: {
    type: Number,
    min: [1, 'price must larger than 0'],
    required: [true, 'price is required'],
  },
  // Rate of deposit in %, default 0%
  deposit_rate: {
    type: Number,
    min: [0, 'deposit rate must larger than 0'],
    default: 0,
  },
  // Rate of discount in %, default 0%
  discount_rate: {
    type: Number,
    min: [0, 'discount rate must larger than 0'],
    max: [100, 'discount rate must less than 100'],
    default: 0,
  },
  // Address
  address: {
    street: {type: String, default: ''},
    // apt, suite, etc.
    apt: {type: String, default: ''},
    city: {type: String, default: ''},
    state: {type: String, default: ''},
    zip_code: {
      type: String,
      match: [/(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Incorrect zip code format'],
      default: ''
    },
    latitude: {
      type: Number,
      min: [-90, 'latitude out of range'],
      max: [90, 'latitude out of range']
    },
    longitude: {
      type: Number,
      min: [-90, 'longitude out of range'],
      max: [90, 'longitude out of range']
    },
  },
  // Bedroom
  bedrooms: [{type: ObjectId, ref: 'Bedroom'}],
  // Bedroom Count
  bedrooms_count: {type: Number, min: 0, default: 0},
  // Amenities 便利设施
  amenities: {
    esentials: {type: Boolean, default: false},
    wifi: {type: Boolean, default: false},
    shampoo: {type: Boolean, default: false},
    tv: {type: Boolean, default: false},
    hot_water: {type: Boolean, default: false},
    heating: {type: Boolean, default: false},
    air_condition: {type: Boolean, default: false},
    hair_dryer: {type: Boolean, default: false},
    breakfast: {type: Boolean, default: false},
    workspace: {type: Boolean, default: false},
    indoor_fireplace: {type: Boolean, default: false},
    pool: {type: Boolean, default: false},
    kitchen: {type: Boolean, default: false},
    washer: {type: Boolean, default: false},
    dryer: {type: Boolean, default: false},
    parking: {type: Boolean, default: false},
    elevator: {type: Boolean, default: false},
    hot_tub: {type: Boolean, default: false},
    gym: {type: Boolean, default: false},
  },
  // Safe Facilities 安全设施
  safe_facilities: {
    smoke_detector: {type: Boolean, default: false},
    carbon_monoxide_detector: {type: Boolean, default: false},
    first_aid_kit: {type: Boolean, default: false},
    fire_extinguisher: {type: Boolean, default: false},
    private_entrance: {type: Boolean, default: false},
    lock_on_bedroom_door: {type: Boolean, default: false},
    private_living_room: {type: Boolean, default: false},
  },
  // Rule
  rule: {
    // Suitable for children (2-12)
    children: {type: Boolean, default: false},
    // Suitable for infants (under 2)
    infants: {type: Boolean, default: false},
    // Suitable for pets
    pets: {type: Boolean, default: false},
    // Smoking Allowed
    smoking: {type: Boolean, default: false},
    // Enents or parties allowed
    parties: {type: Boolean, default: false},
    // Addition Rule
    addition: {type: String, default: ''},
  },
  // Customer must know before booking
  acknowledge: {
    // Must climb stairs
    climb_stairs: {type: Boolean, default: false},
    climb_stairs_brief: {
      type: String,
      minlength: 0,
      maxlength: [150, 'climb stairs brief too long'],
      default: ''
    },
    // Potential for noise
    potential_noise: {type: Boolean, default: false},
    potential_noise_brief: {
      type: String,
      minlength: 0,
      maxlength: [150, 'potential noise brief too long'],
      default: ''
    },
    // Pet(s) live on property
    pets: {type: Boolean, default: false},
    pets_brief: {
      type: String,
      minlength: 0,
      maxlength: [150, 'pets brief too long'],
      default: ''
    },
    // No parking on property
    no_parking: {type: Boolean, default: false},
    no_parking_brief: {
      type: String,
      minlength: 0,
      maxlength: [150, 'no parking brief too long'],
      default: ''
    },
    // Some spaces are shared
    spaces_shared: {type: Boolean, default: false},
    spaces_shared_brief: {
      type: String,
      minlength: 0,
      maxlength: [150, 'spaces shared brief too long'],
      default: ''
    },
    // Amenity limitations
    amenity_limit: {type: Boolean, default: false},
    amenity_limit_brief: {
      type: String,
      minlength: 0,
      maxlength: [150, 'amenity limittations brief too long'],
      default: ''
    },
    // Surveillance or recording devices on property
    recording: {type: Boolean, default: false},
    recording_brief: {
      type: String,
      minlength: 0,
      maxlength: [150, 'recording brief too long'],
      default: ''
    },
    // Weapons on property
    weapons: {type: Boolean, default: false},
    weapons_brief: {
      type: String,
      minlength: 0,
      maxlength: [150, 'weapons brief too long'],
      default: ''
    },
    // Dangerous animals on property
    dangerous: {type: Boolean, default: false},
    dangerous_brief: {
      type: String,
      minlength: 0,
      maxlength: [150, 'dangerous brief too long'],
      default: ''
    },
  },
  brief: {type: String, default: ''},
  // Photos
  cover: {type: ObjectId, ref: 'Photo'},
  photos: [{type: ObjectId, ref: 'Photo'}],
  // List of comment id
  // comment: [{ type: ObjectId, ref: 'Comment' }],
  // comment: [{ type: ObjectId }],
  // Comment Counter
  // comment_count: { type: Number, default: 0 },
  // View Counter
  view_count: { type: Number, default: 0 },
  // Following Counter
  follow_count: { type: Number, default: 0 },
  // Like Counter
  like_count: { type: Number, default: 0 },
  // Publish - customer can see the house or not
  publish: {type: Boolean, default: false},
  // Delete
  deleted: {type: Boolean, default: false},
  // Verify
  verify: {type: Boolean, default: false},
  // Recommend
  recommend: {type: Boolean, default: false},
  create_at: {type: Date, default: Date.now()},
  last_update_at: {type: Date, default: Date.now()},
});

// HouseSchema.post(/^update/, true, function(res, next) {
//   console.log("post update", this._conditions);
//   next();
// })

mongoose.model('House', HouseSchema);
