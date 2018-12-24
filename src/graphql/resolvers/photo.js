import { House, Photo } from '../../mongo/models';
import { verifyUser, verifyOwner, verifyHouse, checkHouse} from '../../global/verify';
let [ query, mutation, resolvers ] =[{}, {}, {}];
import config from '../../../config';
import {createError} from '../errors';

resolvers._photo = {
  _id: ({_id}) => _id.toString(),
  house: ({house}) => house.toString(),
  key: ({key}) => key,
  url: ({key}) => `${config.aws_s3_url}${key}`,
  create_at: ({create_at}) => create_at,
}

// Query

// Mutation
// Photo
mutation.addCover = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, admin: true});
  // Verify House
  let house = await checkHouse({_id: args.house, deleted: false, select: {'cover': 1}});
  if (house.cover) throw createError({message: 'cover exist'});

  return await Photo.save({data: {house: args.house, key: args.key}})
  .then(async (doc) => {
    return await House.findOneAndUpdate({
      query: {_id: args.house},
      update: {cover: doc._id},
      options: {runValidators: true}
    }).then((res) => {
      return {success: true};
    })
  })
}

mutation.removeCover = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, admin: true});
  // Verify House
  let house = await checkHouse({_id: args.house, deleted: false, select: {'cover': 1}});
  if (!house.cover) throw createError({message: 'cover not exist'});

  return await House.findOneAndUpdate({
    query: {_id: args.house, cover: house.cover},
    update: {cover: null},
    options: {runValidators: true}
  }).then(async (doc) => {
    if (!doc) return {success: false};
    return await Photo.findOneAndDelete({query: {_id: doc.cover, house: doc._id}})
    .then((res) => {return {success: true};})
  })
}

mutation.addPhotos = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, admin: true});
  // Verify House
  let house = await checkHouse({_id: args.house, deleted: false});

  return args.keys.map(async (key) => {
    return await Photo.save({data: {house: args.house, key}})
    .then(async (doc) => {
      return await House.findOneAndUpdate({
        query: {_id: house._id},
        update: { $push: { photos: doc._id } },
        options: {runValidators: true}
      })
      .then((res) => {
        return {success: true};
      })
    })
    .catch((err) => {return {success: false}});
  })
}

mutation.removePhotos = async (root, args, context, schema) => {
  // Verify User
  let user = await verifyUser({userId: context.user, admin: true});
  // Verify House
  let house = await checkHouse({_id: args.house, deleted: false});

  return args.ids.map(async (_id) => {
    return await House.findOneAndUpdate({
      query: {_id: args.house, photos: _id},
      update: {$pull: {photos: _id}},
      options: {runValidators: true}
    })
    .then(async (doc) => {
      if (!doc) return {success: false};
      return await Photo.findOneAndDelete({query: {_id, house: args.house}})
      .then((photo) => {return {success: true};})
    })
  })
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
