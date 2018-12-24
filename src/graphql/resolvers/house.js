import { House, User, Bedroom, Photo } from '../../mongo/models';
import { verifyUser, verifyOwner, verifyHouse} from '../../global/verify';
let [ query, mutation, resolvers ] =[{}, {}, {}];
import {createError} from '../errors';

resolvers._house = {
  _id: ({_id}) => _id.toString(),
  owner: async ({owner}) => await User.findOne({query: {_id: owner}}),
  title: ({title}) => title,
  type: ({type}) => type,
  rental_type: ({rental_type}) => rental_type,
  guest_only: ({guest_only}) => guest_only,
  price: ({price}) => price,
  deposit_rate: ({deposit_rate}) => deposit_rate,
  address: ({address}) => address,
  bedrooms: ({bedrooms}) => bedrooms.map(async (bedroom) => await Bedroom.findOne({query: {_id: bedroom}})),
  bedrooms_count: ({bedrooms_count}) => bedrooms_count,
  amenities: ({amenities}) => amenities,
  safe_facilities: ({safe_facilities}) => safe_facilities,
  rule: ({rule}) => rule,
  acknowledge: ({acknowledge}) => acknowledge,
  cover: async ({cover}) => await Photo.findOne({query: {_id: cover}}),
  photos: ({photos}) => photos.map(async (photo) => await Photo.findOne({query: {_id: photo}})),
  brief: ({brief}) => brief,
  comment: ({comment}) => comment,
  comment_count: ({comment_count}) => comment_count,
  view_count: ({view_count}) => view_count,
  follow_count: ({follow_count}) => follow_count,
  like_count: ({like_count}) => like_count,
  publish: ({publish}) => publish,
  deleted: ({deleted}) => deleted,
  verify: ({verify}) => verify,
  recommend: ({recommend}) => recommend,
  create_at: ({create_at}) => create_at,
  last_update_at: ({last_update_at}) => last_update_at,
}

resolvers._house_address = {
  street: ({street}) => street,
  apt: ({apt}) => apt,
  city: ({city}) => city,
  state: ({state}) => state,
  zip_code: ({zip_code}) => zip_code,
  latitude: ({latitude}) => latitude,
  longitude: ({longitude}) => longitude,
}

resolvers._house_bedrooms = {
  _id: ({_id}) => _id.toString(),
  house: ({house}) => house.toString(),
  king: ({king}) => king,
  queen: ({queen}) => queen,
  double: ({double}) => double,
  single: ({single}) => single,
  sofa_bed: ({sofa_bed}) => sofa_bed,
  couch: ({couch}) => couch,
  air_mattress: ({air_mattress}) => air_mattress,
  bunk_bed: ({bunk_bed}) => bunk_bed,
  floor_mattress: ({floor_mattress}) => floor_mattress,
  roddler_bed: ({roddler_bed}) => roddler_bed,
  crib: ({crib}) => crib,
  water_bed: ({water_bed}) => water_bed,
  hammock: ({hammock}) => hammock,
  total: ({total}) => total,
  create_at: ({create_at}) => create_at,
}

resolvers._house_amenities = {
  esentials: ({esentials}) => esentials,
  wifi: ({wifi}) => wifi,
  shampoo: ({shampoo}) => shampoo,
  tv: ({tv}) => tv,
  hot_water: ({hot_water}) => hot_water,
  heating: ({heating}) => heating,
  air_condition: ({air_condition}) => air_condition,
  hair_dryer: ({hair_dryer}) => hair_dryer,
  breakfast: ({breakfast}) => breakfast,
  workspace: ({workspace}) => workspace,
  indoor_fireplace: ({indoor_fireplace}) => indoor_fireplace,
  pool: ({pool}) => pool,
  kitchen: ({kitchen}) => kitchen,
  washer: ({washer}) => washer,
  dryer: ({dryer}) => dryer,
  parking: ({parking}) => parking,
  elevator: ({elevator}) => elevator,
  hot_tub: ({hot_tub}) => hot_tub,
  gym: ({gym}) => gym,
}

resolvers._house_safe_facilities = {
  smoke_detector: ({smoke_detector}) => smoke_detector,
  carbon_monoxide_detector: ({carbon_monoxide_detector}) => carbon_monoxide_detector,
  first_aid_kit: ({first_aid_kit}) => first_aid_kit,
  fire_extinguisher: ({fire_extinguisher}) => fire_extinguisher,
  private_entrance: ({private_entrance}) => private_entrance,
  lock_on_bedroom_door: ({lock_on_bedroom_door}) => lock_on_bedroom_door,
  private_living_room: ({private_living_room}) => private_living_room,
}

resolvers._house_rule = {
  children: ({children}) => children,
  infants: ({infants}) => infants,
  pets: ({pets}) => pets,
  smoking: ({smoking}) => smoking,
  parties: ({parties}) => parties,
  addition: ({addition}) => addition,
}

resolvers._house_acknowledge = {
  climb_stairs: ({climb_stairs}) => climb_stairs,
  climb_stairs_brief: ({climb_stairs_brief}) => climb_stairs_brief,
  potential_noise: ({potential_noise}) => potential_noise,
  potential_noise_brief: ({potential_noise_brief}) => potential_noise_brief,
  pets: ({pets}) => pets,
  pets_brief: ({pets_brief}) => pets_brief,
  no_parking: ({no_parking}) => no_parking,
  no_parking_brief: ({no_parking_brief}) => no_parking_brief,
  spaces_shared: ({spaces_shared}) => spaces_shared,
  spaces_shared_brief: ({spaces_shared_brief}) => spaces_shared_brief,
  amenity_limit: ({amenity_limit}) => amenity_limit,
  amenity_limit_brief: ({amenity_limit_brief}) => amenity_limit_brief,
  recording: ({recording}) => recording,
  recording_brief: ({recording_brief}) => recording_brief,
  weapons: ({weapons}) => weapons,
  weapons_brief: ({weapons_brief}) => weapons_brief,
  dangerous: ({dangerous}) => dangerous,
  dangerous_brief: ({dangerous_brief}) => dangerous_brief,
}

// Query
query.getHouse = async (root, {_id}, context, info) => {
  return await House.findOne({query: args});
}

query.getHouses = async (root, args, context, schema) => {
  return await House.find({query: args});
}

// Mutation
// House
mutation.addHouse = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, customer: false, landlord: true, admin: true});
  // Verify Owner
  let owner = await verifyOwner({userId: context.user, ownerId: args.owner});
  // Create new house record
  args.owner = owner._id;
  await House.save({data: args});
  return {success: true};
}

mutation.deleteHouse = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, customer: false, landlord: true, admin: true});
  // Processing delete house
  return args.ids.map(async (houseId) => {
    // Verify House
    let house;
    try {
      house = await verifyHouse({userId: user._id, houseId});
    }
    catch({message}) {
      return {success: false, message};
    }
    // Mark the house as deleted
    return await House.updateOne({query: {_id: houseId}, update: {deleted: true}, options: {runValidators: true}})
    .then((res) => {
      return {success: true, message: 'House deleted'};
    })
  })
}

mutation.removeHouses = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, customer: false, landlord: false, admin: true});
  // Processing remove house
  return args.ids.map(async (houseId) => {
    // Verify House
    return await House.findOne({query: {_id: houseId}, select: {'_id': 1, 'owner': 1, 'bedrooms': 1, 'deleted': 1}}).then(async (house) => {
      if (!house) return {success: false, message: 'house does not exist'};
      // Remove the house
      return await House.deleteOne({query: {_id: houseId}})
      .then(async (res) => {
        // Remove bedrooms
        house.bedrooms.map(async(bedroom) => {
          await Bedroom.deleteOne({query: {_id: bedroom}});
        })
        return {success: true, message: 'House removed'};
      })
    })
  })
}

const houseUpdate = async ({userId, houseId, update}) => {
  // Verify User
  let user = await verifyUser({userId, customer: false, landlord: true, admin: true});
  // Verify House
  await verifyHouse({userId: user._id, houseId});
  // Update the house
  return await House.updateOne({query: {_id: houseId}, update, options: {runValidators: true}})
  .then((res) => {
    return {success: true};
  })
}

mutation.updateHouse = async (root, args, context, schema) => {
  // Update the house
  let { _id } = args;
  delete args._id;
  return await houseUpdate({
    userId: context.user,
    houseId: _id,
    update: args
  })
}

mutation.updateHouseAddress = async (root, args, context, schema) => {
  // Update the house
  let { _id } = args;
  delete args._id;
  return await houseUpdate({
    userId: context.user,
    houseId: _id,
    update: {address: args}
  })
}

mutation.updateHouseAmenities = async (root, args, context, schema) => {
  // Update the house
  let { _id } = args;
  delete args._id;
  return await houseUpdate({
    userId: context.user,
    houseId: _id,
    update: {amenities: args}
  })
}

mutation.updateHouseSafeFacilities = async (root, args, context, schema) => {
  // Update the house
  let { _id } = args;
  delete args._id;
  return await houseUpdate({
    userId: context.user,
    houseId: _id,
    update: {safe_facilities: args}
  })
}

mutation.updateHouseRule = async (root, args, context, schema) => {
  // Update the house
  let { _id } = args;
  delete args._id;
  return await houseUpdate({
    userId: context.user,
    houseId: _id,
    update: {rule: args}
  })
}

mutation.updateHouseAcknowledge = async (root, args, context, schema) => {
  // Update the house
  let { _id } = args;
  delete args._id;
  return await houseUpdate({
    userId: context.user,
    houseId: _id,
    update: {acknowledge: args}
  })
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
