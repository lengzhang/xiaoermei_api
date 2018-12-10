
let [ query, mutation, resolvers ] =[{}, {}, {}];

// Resolvers
resolvers._test = {
  context: (root) => root.context,
  success: (root) => root.success,
}

// Query
query.test = async () => {
  console.log('hi');
  return {context: 'Hello Query', success: true};
}

// Mutation
mutation.test = async () => {
  console.log('hi');
  return {context: 'Hello Mutation', success: true};
}

exports.resolvers = resolvers;
exports.query = query;
exports.mutation = mutation;
