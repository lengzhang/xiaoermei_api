import { gql } from 'apollo-server-express';

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

let Schemas = "", Queries = "", Mutations = "";

// console.log("items", items);

items.map(async (item) => {
  if (item.Schema) Schemas = `${Schemas}${item.Schema}`;
  if (item.Query) Queries = `${Queries}${item.Query}`;
  if (item.Mutation) Mutations = `${Mutations}${item.Mutation}`;
})

const typeDefs = gql`

  type _result {
    success: Boolean!
    message: String
  }

  ${Schemas}

  type Query {${Queries}}

  type Mutation {${Mutations}}
`;

export default typeDefs
