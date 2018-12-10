const config = {
  app_id: 'wxf07b99620698c387',
  app_secret: '24d2bbe82833b925122b3330c7d7f59c',
  cookie_secret: 'cookie_secret_house',
  port: 3000,
  // db_url: 'mongodb://localhost:27017/house',
  db_url: 'mongodb+srv://admin:admin*@xiaoermei-7iwql.mongodb.net/house?retryWrites=true',

  debug: true,

  jwt_secret: 'jwt_secret_xiao_er_mei',
  jwt_expires: 60 * 5,
  seed_length: 10,
}

module.exports = config;
