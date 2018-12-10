import TestOne from './test-one';
import TestTwo from './test-two';
import Test from './test';

import User from './user';
import WeappUser from './weapp-user';
import Account from './account';

import House from './house';

let Query = {}
Object.assign(Query, TestOne.query)
Object.assign(Query, TestTwo.query)
Object.assign(Query, Test.query)

Object.assign(Query, User.query)
Object.assign(Query, WeappUser.query)
Object.assign(Query, Account.query)

Object.assign(Query, House.query)

let Mutation = {}
Object.assign(Mutation, TestOne.mutation)
Object.assign(Mutation, TestTwo.mutation)
Object.assign(Mutation, Test.mutation)

Object.assign(Mutation, User.mutation)
Object.assign(Mutation, WeappUser.mutation)
Object.assign(Mutation, Account.mutation)

Object.assign(Mutation, House.mutation)

const Resolvers = {
  Query,
  Mutation
}

Resolvers._result = {
  success: ({success}) => success,
  message: ({message}) => message,
}

Object.assign(Resolvers, TestOne.resolvers);
Object.assign(Resolvers, TestTwo.resolvers);
Object.assign(Resolvers, Test.resolvers)

Object.assign(Resolvers, User.resolvers)
Object.assign(Resolvers, WeappUser.resolvers)
Object.assign(Resolvers, Account.resolvers)

Object.assign(Resolvers, House.resolvers)

export default Resolvers;
