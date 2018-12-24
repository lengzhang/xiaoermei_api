exports.Schema = `
  type _house {
    _id: ID
    owner: _user
    title: String
    type: String
    rental_type: String
    guest_only: Boolean
    price: Float
    deposit_rate: Int
    discount_rate: Int
    address: _house_address
    bedrooms: [_house_bedrooms]
    bedrooms_count: Int
    amenities: _house_amenities
    safe_facilities: _house_safe_facilities
    rule: _house_rule
    acknowledge: _house_acknowledge
    brief: String
    cover: _photo
    photos: [_photo]
    comment: [String]
    comment_count: Int
    view_count: Int
    follow_count: Int
    like_count: Int
    publish: Boolean
    deleted: Boolean
    verify: Boolean
    recommend: Boolean
    create_at: String
    last_update_at: String
  }

  type _house_address {
    street: String
    apt: String
    city: String
    state: String
    zip_code: String
    latitude: Float
    longitude: Float
  }

  type _house_amenities {
    esentials: Boolean
    wifi: Boolean
    shampoo: Boolean
    tv: Boolean
    hot_water: Boolean
    heating: Boolean
    air_condition: Boolean
    hair_dryer: Boolean
    breakfast: Boolean
    workspace: Boolean
    indoor_fireplace: Boolean
    pool: Boolean
    kitchen: Boolean
    washer: Boolean
    dryer: Boolean
    parking: Boolean
    elevator: Boolean
    hot_tub: Boolean
    gym: Boolean
  }

  type _house_safe_facilities {
    smoke_detector: Boolean
    carbon_monoxide_detector: Boolean
    first_aid_kit: Boolean
    fire_extinguisher: Boolean
    private_entrance: Boolean
    lock_on_bedroom_door: Boolean
    private_living_room: Boolean
  }

  type _house_rule {
    children: Boolean
    infants: Boolean
    pets: Boolean
    smoking: Boolean
    parties: Boolean
    addition: String
  }

  type _house_acknowledge {
    climb_stairs: Boolean
    climb_stairs_brief: String
    potential_noise: Boolean
    potential_noise_brief: String
    pets: Boolean
    pets_brief: String
    no_parking: Boolean
    no_parking_brief: String
    spaces_shared: Boolean
    spaces_shared_brief: String
    amenity_limit: Boolean
    amenity_limit_brief: String
    recording: Boolean
    recording_brief: String
    weapons: Boolean
    weapons_brief: String
    dangerous: Boolean
    dangerous_brief: String
  }
`

exports.Query = `
  getHouse(_id: ID!): _house
  getHouses: [_house]!
`

exports.Mutation = `
  addHouse(owner: ID, title: String!, type: String!, rental_type: String!, guest_only: Boolean!, price: Float!, deposit_rate: Int, discount_rate: Int): _result!

  deleteHouse(ids: [ID]!): [_result!]!

  removeHouses(ids: [ID]!): [_result!]!

  updateHouse(_id: ID!, title: String, type: String, rental_type: String, guest_only: Boolean, price: Float, deposit_rate: Int, discount_rate: Int, brief: String, publish: Boolean, verify: String, recommend: String): _result!

  updateHouseAddress(_id: ID!, street: String, apt: String, city: String, state: String, zip_code: String, latitude: Float, longitude: Float): _result!

  updateHouseAmenities(_id: ID!, esentials: Boolean, wifi: Boolean, shampoo: Boolean, tv: Boolean, hot_water: Boolean, heating: Boolean, air_condition: Boolean, hair_dryer: Boolean, breakfast: Boolean, workspace: Boolean, indoor_fireplace: Boolean, pool: Boolean, kitchen: Boolean, washer: Boolean, dryer: Boolean, parking: Boolean, elevator: Boolean, hot_tub: Boolean, gym: Boolean): _result!

  updateHouseSafeFacilities(_id: ID!, smoke_detector: Boolean, carbon_monoxide_detector: Boolean, first_aid_kit: Boolean, fire_extinguisher: Boolean, private_entrance: Boolean, lock_on_bedroom_door: Boolean, private_living_room: Boolean): _result!

  updateHouseRule(_id: ID!, children: Boolean, infants: Boolean, pets: Boolean, smoking: Boolean, parties: Boolean, addition: String): _result!

  updateHouseAcknowledge(_id: ID!, climb_stairs: Boolean, climb_stairs_brief: String, potential_noise: Boolean, potential_noise_brief: String, pets: Boolean, pets_brief: String, no_parking: Boolean, no_parking_brief: String, spaces_shared: Boolean, spaces_shared_brief: String, amenity_limit: Boolean, amenity_limit_brief: String, recording: Boolean, recording_brief: String, weapons: Boolean, weapons_brief: String, dangerous: Boolean, dangerous_brief: String): _result!
`
