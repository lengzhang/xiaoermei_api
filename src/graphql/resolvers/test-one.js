import { TestOne, TestTwo } from '../../mongo/models';

let [ query, mutation, resolvers ] =[{}, {}, {}];

// Resolvers
resolvers._TestOne = {
  _id: (root) => root.id,
  context: (root) => root.context,
  test_two: (root) => root.test_two.map(async (_id) => await TestTwo.findOne({query:{_id}})),
  create_at: (root) => root.create_at.toString(),
}

resolvers.addTestOne = {
  success: (root) => root.success,
}

// Query
query.testOnes = async (root, args, context, schema) => {
  // console.log('hihi');
  // console.log("root", root);
  // console.log("args", args);
  console.log("context", context);
  // console.log("schema", schema);

  let find = await TestOne.find({query: {}});
  console.log(find);
  return find;
}

// Mutation
mutation.addTestOne = async (root, args, context, schema) => {
  // console.log("root", root);
  // console.log("args", args);
  // console.log("context", context);
  // console.log("schema", schema);
  let result = await TestTwo.save({data: {context: args.subContext}})
  .then((res) => res)
  .catch((err) => err);
  console.log(result);
  result = await TestOne.save({data: {context: args.context, test_two: result._id}})
  .then((res) => res)
  .catch((err) => err);
  console.log(result);
  return {success: false};
}

mutation.addTestTwoInOne = async (root, args, context, schema) => {
  // console.log("root", root);
  // console.log("args", args);
  // console.log("context", context);
  // console.log("schema", schema);
  let find = await TestOne.findOne({query:{_id: args._id}});
  console.log('find', find);
  let save = await TestTwo.save({data: {context: args.context}});
  console.log('save', save, save.id);
  let update = await TestOne.update({
    query: { _id: find._id },
    update: { $push: { test_two: save._id } },
    options: { multi: false, overwrite: false }
  })
  console.log('update', update);

  return {success: false};
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
