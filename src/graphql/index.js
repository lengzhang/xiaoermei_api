import { ApolloServer, ApolloError } from 'apollo-server-express';
import { debug, jwt_secret, jwt_expires } from '../../config';
import checkToken from '../global/check_token';

import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res, connection}) => {
    return {
      user: req.user,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
      jwtTokenSecret: jwt_secret,
    };
  },
  playground: debug,
  formatError: (error) => {
    console.log(`<error>\n${error}`);
    delete error.extensions.exception;
    return error;
  },
});

/**
 * Start graphql
 * @param  {Object} app - express' app
 */
module.exports = (app) => {
  app.use(async(req, res, next)=>{
    // console.log(req.headers);
    let token = req.headers.access_token || null;
    // Check request contain access token or not
    if (!token) return next();
    // Get user information by token
    let user = await checkToken({token, secretKey: jwt_secret});
    // Does not exist user information, token is invalid
    if (!user) {
      res.send({
        errors: [{
          message: 'invalid token'
        }]
      })
    }
    else {
      // Attach user information to request
      // console.log("user", user);
      req.user = user;
      next();
    }
  });

  server.applyMiddleware({ app, path: '/graphql'});
}
