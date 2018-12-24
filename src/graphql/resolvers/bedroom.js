import { House, Bedroom } from '../../mongo/models';
import { verifyUser, verifyOwner, verifyHouse} from '../../global/verify';
let [ query, mutation, resolvers ] =[{}, {}, {}];

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

// Query

// Mutation
// Bedroom
mutation.addBedroom = async (root, args, context, schema) => {
  // Verify User
  let userInfo = await verifyUser({userId: context.user, customer: false, landlord: true, admin: true});
  // Verify Owner
  let owner = await verifyOwner({userId: context.user, ownerId: args.owner});
  // Verify House
  let house = await verifyHouse({userId: args.owner, houseId: args.house});

  delete args.owner;
  delete args.house;
  // Calculate total number of beds in the room
  let total = 0;
  for (let v in args) {
    // console.log(`[${v}]\t`, args[`${v}`]);
    total += args[`${v}`];
  }
  args.total = total;
  args.house = house._id;
  console.log('args', args);

  // Create new bedroom record
  return await Bedroom.save({data: args})
  .then(async (doc) => {
    return await House.updateOne({
      query: {_id: house._id},
      update: { $push: { bedrooms: doc._id } },
      options: {runValidators: true}})
    .then((res) => {
      return {success: true};
    })
  })
}

mutation.removeBedroom = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, customer: false, landlord: true, admin: true});
  // Processing delete bedroom
  return args._id.map(async (_id) => {
    // Verify Bedroom
    return await Bedroom.findOne({query: {_id}, select: {'_id': 1, 'house': 1}})
    .then(async (bedroom) => {
      if (!bedroom) return {success: false, message: 'bedroom does not exist'};
      // Verify House
      let house;
      try {
        house = await verifyHouse({userId: user._id, houseId: bedroom.house});
      }
      catch({message}) {
        return {success: false, message};
      }
      // Remove Bedroom Record
      return await Bedroom.deleteOne({query: {_id}})
      .then(async (res) => {
        return await House.updateOne({
          query: {_id: house._id},
          update: {$pull: {bedrooms: _id}}
        })
        .then((res) => {
          return {success: true};
        })
      })
    })
  })
}

mutation.updateBedroom = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, customer: false, landlord: true, admin: true});
  // Verify Bedroom
  let { _id } = args;
  return await Bedroom.findOne({query: {_id}, select: {'create_at': 0, '_id': 0, '__v': 0}})
  .then(async (bedroom) => {
    if (!bedroom) return false;
    // Verify House
    let house = await verifyHouse({userId: user._id, houseId: bedroom.house, select: {'bedrooms': 1}});

    // Calculate total number of beds in the room
    delete args._id;
    let total = bedroom.total;
    for (let v in args) {
      // console.log(`[${v}]\t`, args[`${v}`]);
      total -= bedroom[`${v}`] - args[`${v}`];
    }
    args.total = total;
    return await Bedroom.updateOne({
      query: {_id},
      update: args,
      options: {runValidators: true}})
    .then((res) => {
      return {success: true};
    })
  })
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
