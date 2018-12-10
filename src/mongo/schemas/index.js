let config = require('../../../config');
let mongoose = require('mongoose');

// connect to server
mongoose.connect(config.db_url, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

// https://github.com/Automattic/mongoose/issues/6890
// (node:6652) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
// (node:6618) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
// adding { useNewUrlParser: true } and mongoose.set('useCreateIndex', true);

let db = mongoose.connection;

db.on('connected', () => {
  console.log(`Mongoose connection open to ${config.db_url}`);
})

db.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
})

db.on('disconnected', () => {
  console.log(`Mongoose connection disconnected`);
})

// Schema
// require('./user');
require('./test-one');
require('./test-two');

require('./user');
require('./weapp-user')
require('./account');
require('./token');
require('./email');
require('./phone');

require('./house');
require('./bedroom');

exports.TestOne = mongoose.model('TestOne');
exports.TestTwo = mongoose.model('TestTwo');

exports.User = mongoose.model('User');
exports.WeappUser = mongoose.model('WeappUser');
exports.Account = mongoose.model('Account');
exports.Token = mongoose.model('Token');
exports.Email = mongoose.model('Email');
exports.Phone = mongoose.model('Phone');

exports.House = mongoose.model('House');
exports.Bedroom = mongoose.model('Bedroom');
