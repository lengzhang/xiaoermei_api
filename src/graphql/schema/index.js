import { gql } from 'apollo-server-express';

import TestOne from './test-one';
import TestTwo from './test-two';
import Test from './test';

import User from './user';
import WeappUser from './weapp-user';
import Account from './account';

import House from './house';

const typeDefs = gql`

  type _result {
    success: Boolean!
    message: String
  }

  ${Test.Schema}
  ${TestOne.Schema}
  ${TestTwo.Schema}

  ${User.Schema}
  ${WeappUser.Schema}
  ${Account.Schema}

  ${House.Schema}

  type Query {
    ${Test.Query}
    ${TestOne.Query}
    ${TestTwo.Query}

    ${User.Query}
    ${WeappUser.Query}
    ${Account.Query}

    ${House.Query}
  }

  type Mutation {
    ${Test.Mutation}
    ${TestOne.Mutation}
    ${TestTwo.Mutation}

    ${User.Mutation}
    ${WeappUser.Mutation}
    ${Account.Mutation}

    ${House.Mutation}
  }
`;

export default typeDefs
