
import Admin from './admin';

import User from './user';
import WeappUser from './weapp-user';
import Account from './account';
import Order from './order';

import House from './house';
import Bedroom from './bedroom';
import Photo from './photo';
import Comment from './comment';

const items = [Admin, User, WeappUser, Account, Order, House, Bedroom, Photo, Comment];

let Resolvers = {}, Query = {}, Mutation = {};

items.map(async (item) => {
  if (item.resolvers) Object.assign(Resolvers, item.resolvers)
  if (item.query) Object.assign(Query, item.query)
  if (item.mutation) Object.assign(Mutation, item.mutation)
})

Resolvers.Query = Query;
Resolvers.Mutation = Mutation;

Resolvers._result = {
  success: ({success}) => success,
  message: ({message}) => message,
}

export default Resolvers;
