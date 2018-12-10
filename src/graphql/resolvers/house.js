import { House, User, Bedroom } from '../../mongo/models';
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
  address: ({address}) => address,
  bedrooms: ({bedrooms}) => bedrooms.map(async (bedroom) => await Bedroom.findOne({query: {_id: bedroom}})),
  bedrooms_count: ({bedrooms_count}) => bedrooms_count,
  amenities: ({amenities}) => amenities,
  safe_facilities: ({safe_facilities}) => safe_facilities,
  rule: ({rule}) => rule,
  acknowledge: ({acknowledge}) => acknowledge,
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
  return await House.findOne({query: {_id}});
}

query.getHouses = async (root, args, context, schema) => {
  return await House.find({query: args});
}

// Mutation
// const verifyUser = async ({userId, ownerId}) => {
//   // Check access token
//   if (!userId) throw createError({message: 'Access token is required'});
//   // Check user role
//   return await User.findOne({query: {_id: userId}, select: {'_id': 1, 'role': 1}})
//   .then(async (userInfo) => {
//     // console.log("userInfo", userInfo);
//     if (userInfo.role === 'customer') throw createError({message: 'user role cannot be customer'});
//     else if (userInfo.role === 'admin' && !ownerId) throw createError({message: 'owner id is required'});
//     else if (userInfo.role === 'landlord') ownerId = userId;
//
//     // Verify owner
//     return await User.findOne({query: {_id: ownerId}, select: {'_id': 1, 'role': 1}})
//     .then((ownerInfo) => {
//       // console.log("ownerInfo",ownerInfo);
//       if (!ownerInfo || ownerInfo.role != 'landlord') throw createError({message: 'owner verification fail'});
//       return ownerInfo;
//     })
//   })
// }
const verifyUser = async ({userId}) => {
  // Check access token
  if (!userId) throw createError({message: 'Access token is required'});
  // Check user role
  return await User.findOne({query: {_id: userId}, select: {'_id': 1, 'role': 1}})
  .then(async (userInfo) => {
    // console.log("userInfo", userInfo);
    if (userInfo.role === 'customer') throw createError({message: 'user role cannot be customer'});
    return userInfo;
  })
}

const verifyOwner = async ({userId, ownerId}) => {
  let userInfo = await verifyUser({userId});
  // Check user role
  if (userInfo.role === 'admin' && !ownerId) throw createError({message: 'owner id is required'});
  else if (userInfo.role === 'landlord') ownerId = userId;

  // Verify owner
  return await User.findOne({query: {_id: ownerId}, select: {'_id': 1, 'role': 1}})
  .then((ownerInfo) => {
    // console.log("ownerInfo",ownerInfo);
    if (!ownerInfo || ownerInfo.role != 'landlord') throw createError({message: 'owner verification fail'});
    return ownerInfo;
  })
}

mutation.addHouse = async (root, args, context, schema) => {
  // Verify User
  let owner = await verifyOwner({userId: context.user, ownerId: args.owner});
  // Create new house record
  // console.log("owner", owner);
  args.owner = owner._id;
  // console.log("args", args);
  await House.save({data: args});
  return true;
}

mutation.addBedroom = async (root, args, context, schema) => {
  // console.log("args", args);
  // console.log("context", context);
  // Verify User
  let userId = context.user
  let owner = await verifyOwner({userId: context.user, ownerId: args.owner});
  // Verify House
  let houseId = args.house;
  await House.findOne({query: {_id: houseId}, select: {'_id': 1, 'owner': 1, 'deleted': 1}})
  .then((houseInfo) => {
    // console.log('houseInfo', houseInfo);
    if (!houseInfo) throw createError({message: 'house does not exist'});
    else if (owner.role === 'landlord' && owner._id.toString() != houseInfo.owner.toString()) throw createError({message: 'You do not have permission'});
    else if (houseInfo.deleted) throw createError({message: 'House already been deleted'});
  })

  delete args.owner;
  delete args.house;
  // Calculate total number of beds in the room
  args.total = 0;
  for (let v in args) {
    // console.log(`[${v}]\t`, args[`${v}`]);
    args.total += args[`${v}`];
  }
  args.house = houseId;

  // Create new bedroom record
  return await Bedroom.save({data: args})
  .then(async (doc) => {
    return await House.updateOne({
      query: {_id: houseId},
      update: { $push: { bedrooms: doc._id } },
      options: {runValidators: true}})
    .then((res) => {
      return true;
    })
  })
}

mutation.updateBedroom = async (root, args, context, schema) => {
  // Verify User
  let userInfo = await verifyUser({userId: context.user});
  // Verify Bedroom
  let { _id } = args;
  return await Bedroom.findOne({query: {_id}, select: {'_id': 1, 'house': 1}})
  .then(async (bedroomInfo) => {
    if (!bedroomInfo) return {success: false, message: 'bedroom does not exist'};
    // Verify House
    return await House.findOne({query: {_id: bedroomInfo.house}, select: {'_id': 1, 'owner': 1, 'deleted': 1, 'bedrooms': 1}})
    .then(async (houseInfo) => {
      console.log('houseInfo', houseInfo);
      if (!houseInfo) return {success: false, message: 'house does not exist'};
      else if (userInfo.role === 'landlord' && userInfo._id != houseInfo.owner) return {success: false, message: 'You do not have permission'};
      else if (houseInfo.deleted) return {success: false, message: 'House already been deleted'};
    })
  })
}

mutation.deleteHouse = async (root, args, context, schema) => {
  // console.log("root", root);
  console.log("args", args);
  console.log("context", context);
  // Verify User
  let userInfo = await verifyUser({userId: context.user});

  // Processing delete house
  return args._id.map(async (houseId) => {
    // Verify House
    return await House.findOne({query: {_id: houseId}, select: {'_id': 1, 'owner': 1, 'deleted': 1}})
    .then(async (houseInfo) => {
      console.log('houseInfo', houseInfo);
      if (!houseInfo) return {success: false, message: 'house does not exist'};
      else if (userInfo.role === 'landlord' && userInfo._id != houseInfo.owner) return {success: false, message: 'You do not have permission'};
      else if (houseInfo.deleted) return {success: false, message: 'House already been deleted'};

      // Mark the house as deleted
      return await House.updateOne({query: {_id: houseInfo._id}, update: {deleted: true}, options: {runValidators: true}})
      .then((res) => {
        console.log(res);
        return {success: true, message: 'House deleted'};
      })
    })
  })
}

mutation.removeHouse = async (root, args, context, schema) => {
  // Verify User
  let userInfo = await verifyUser({userId: context.user});

  // Processing remove house
  return args._id.map(async (houseId) => {
    // Verify House
    return await House.findOne({query: {_id: houseId}, select: {'_id': 1, 'owner': 1, 'bedrooms': 1, 'deleted': 1}}).then(async (houseInfo) => {
      console.log('houseInfo', houseInfo);
      if (!houseInfo) return {success: false, message: 'house does not exist'};
      // Remove the house
      return await House.deleteOne({query: {_id: houseId}})
      .then(async (res) => {
        // Remove bedrooms
        houseInfo.bedrooms.map(async(bedroom) => {
          console.log(bedroom);
          await Bedroom.deleteOne({query: {_id: bedroom}});
        })
        return {success: true, message: 'House removed'};
      })
    })
  })
}

mutation.removeBedroom = async (root, args, context, schema) => {
  // Verify User
  let userInfo = await verifyUser({userId: context.user});
  // Processing delete bedroom
  return args._id.map(async (_id) => {
    // Verify Bedroom
    return await Bedroom.findOne({query: {_id}, select: {'_id': 1, 'house': 1}})
    .then(async (bedroomInfo) => {
      if (!bedroomInfo) return {success: false, message: 'bedroom does not exist'};
      // Verify House
      return await House.findOne({query: {_id: bedroomInfo.house}, select: {'_id': 1, 'owner': 1, 'deleted': 1, 'bedrooms': 1}})
      .then(async (houseInfo) => {
        console.log('houseInfo', houseInfo);
        if (!houseInfo) return {success: false, message: 'house does not exist'};
        else if (userInfo.role === 'landlord' && userInfo._id != houseInfo.owner) return {success: false, message: 'You do not have permission'};
        else if (houseInfo.deleted) return {success: false, message: 'House already been deleted'};

        // Remove Bedroom Record
        return await Bedroom.deleteOne({query: {_id: bedroomInfo._id}})
        .then(async (res) => {
          console.log(res);
          return await House.updateOne({
            query: {_id: houseInfo._id},
            update: {$pull: {bedrooms: bedroomInfo._id}}
          })
          .then((res) => {
            console.log(res);
            return {success: true};
          })
        })
      })
    })
  })
}

const houseUpdate = async ({userId, houseId, update}) => {
  // Verify User
  let userInfo = await verifyUser({userId});
  console.log("userInfo", userInfo);
  // Verify House
  await House.findOne({query: {_id: houseId}, select: {'_id': 1, 'owner': 1, 'deleted': 1}})
  .then((houseInfo) => {
    console.log('houseInfo', houseInfo);
    if (!houseInfo) throw createError({message: 'house does not exist'});
    else if (userInfo.role === 'landlord' && userInfo._id.toString() != houseInfo.owner.toString()) throw createError({message: 'You do not have permission'});
    else if (houseInfo.deleted) throw createError({message: 'House already been deleted'});
  })

  // Update the house
  return await House.updateOne({query: {_id: houseId}, update, options: {runValidators: true}})
  .then((res) => {
    console.log(res);
    return true;
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
    update: args
  })
}

mutation.updateHouseAmenities = async (root, args, context, schema) => {
  // Update the house
  let { _id } = args;
  delete args._id;
  return await houseUpdate({
    userId: context.user,
    houseId: _id,
    update: args
  })
}

mutation.updateHouseSafeFacilities = async (root, args, context, schema) => {
  // Update the house
  let { _id } = args;
  delete args._id;
  return await houseUpdate({
    userId: context.user,
    houseId: _id,
    update: args
  })
}

mutation.updateHouseSafeFacilities = async (root, args, context, schema) => {
  // Update the house
  let { _id } = args;
  delete args._id;
  return await houseUpdate({
    userId: context.user,
    houseId: _id,
    update: args
  })
}

mutation.updateHouseAcknowledge = async (root, args, context, schema) => {
  // Update the house
  let { _id } = args;
  delete args._id;
  return await houseUpdate({
    userId: context.user,
    houseId: _id,
    update: args
  })
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
