import { House, Order, User } from '../../mongo/models';
import { verifyUser, verifyOwner, verifyHouse, checkHouse} from '../../global/verify';
let [ query, mutation, resolvers ] =[{}, {}, {}];
import {createError} from '../errors';

resolvers._order = {
  _id: ({_id}) => _id.toString(),
  user: async ({user}) => await User.findOne({query: {_id: user}}),
  house: async ({house}) => await House.findOne({query: {_id: house}}),
  price: ({price}) => price,
  from: ({from}) => from,
  to: ({to}) => to,
  message: ({message}) => message,
  deposit: ({deposit}) => deposit,
  deposit_received: ({deposit_received}) => deposit_received,
  discount_rate: ({discount_rate}) => discount_rate,
  confirm: ({confirm}) => confirm,
  confirm_at: ({confirm_at}) => confirm_at,
  create_at: ({create_at}) => create_at,
}

// Query
query.getOrder = async (root, args, context, schema) => {
  return await Order.findOne({query: args});
}

query.getOrders = async (root, args, context, schema) => {
  return Order.find({query: args});
}

// Mutation
//user: ID!, house: ID!, price: Float!, from: String!, to: String!, message: String, deposit: Float, deposit_received: Boolean, discount_rate: Int, confirm: Boolean
mutation.addOrder = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, customer: true, admin: true});
  if (user.role === 'customer' && user._id.toString() != args.user.toString()) throw createError({message: "Adding order fail"});
  // Verify Customer
  let customer = await verifyUser({userId: args.user, customer: true});
  // Check House
  let house  = await checkHouse({_id: args.house, deleted: false, select: {'publish': 1}});
  if (!house.publish) throw createError({message: "Adding order fail"});

  return await Order.save({data: args})
  .then((res) => {return {success: true};})
}

//_id: ID!, price: Float, from: String, to: String, message: String, deposit: Float, deposit_received: Boolean, discount_rate: Int, confirm: Boolean
mutation.updateOrder = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, customer: true, admin: true});
  let query = {_id: args._id};
  if (user.role === "customer") query.user = user._id;
  // Updating Order
  delete args._id
  return await Order.findOneAndUpdate({query, update: args, options: {runValidators: true}})
  .then((doc) => {
    if (!doc) throw createError({message: "Updating order fail"});
    return {success: true};
  })
}

mutation.removeOrders = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, customer: true, admin: true});
  return await args.ids.map(async (_id) => {
    let query = {_id};
    if (user.role === "customer") query.user = user._id;
    return await Order.deleteOne({query})
    .then((doc) => {
      if (doc.n == 0) return {success: false};
      return {success: true};
    })
  })
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
