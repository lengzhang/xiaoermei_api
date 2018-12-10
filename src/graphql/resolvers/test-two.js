import { TestTwo } from '../../mongo/models';

let [ query, mutation, resolvers ] =[{}, {}, {}];

resolvers._TestTwo = {
  _id: (root) => root._id.toString(),
  context: (root) => root.context,
  create_at: (root) => root.create_at.toString(),
}

resolvers.addTestTwo = {
  success: (root) => root.success,
}

// Query
query.testTwos = async (root, args, context, schema) => {
  console.log("root", root);
  console.log("args", args);
  console.log("context", context);
  console.log("schema", schema);

  let find = await TestTwo.find({query: {}});
  console.log(find);
  return find;
}

// Mutation
mutation.addTestTwo = async (root, args, context, schema) => {
  // console.log("root", root);
  // console.log("args", args);
  // console.log("context", context);
  // console.log("schema", schema);
  let save = await TestTwo.save({data: {context: args.context}});
  console.log(save);
  return {success: false};
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
