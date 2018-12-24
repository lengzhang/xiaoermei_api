exports.Schema = `
  type _house_bedrooms {
    _id: ID
    house: ID
    king: Int
    queen: Int
    double: Int
    single: Int
    sofa_bed: Int
    couch: Int
    air_mattress: Int
    bunk_bed: Int
    floor_mattress: Int
    roddler_bed: Int
    crib: Int
    water_bed: Int
    hammock: Int
    total: Int
    create_at: String
  }
`

exports.Query = ``

exports.Mutation = `
  addBedroom(owner: ID, house: ID!, king: Int, queen: Int, double: Int, single: Int, sofa_bed: Int, couch: Int, air_mattress: Int, bunk_bed: Int, floor_mattress: Int, roddler_bed: Int, crib: Int, water_bed: Int, hammock: Int): _result!

  removeBedroom(_id: [ID]!): [_result!]!

  updateBedroom(_id: ID!, king: Int, queen: Int, double: Int, single: Int, sofa_bed: Int, couch: Int, air_mattress: Int, bunk_bed: Int, floor_mattress: Int, roddler_bed: Int, crib: Int, water_bed: Int, hammock: Int): _result!
`
