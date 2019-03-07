# xiaoermei (Backend API)

## Setup

1. Install `Node.js` [required]

2. Setup mongoDB, install `mongoDB` in your server or setup `mongoDB Atlas` [mongodb.com](mongodb.com)

3. Replace `db_url` in `config/index.js` by your MongoDB connection string

4. Replace `app_id` and `app_secret` in `config/index.js` by your MiniAPP id and secret key

3. Start the server
    ```
    npm run start
    ```

4. Go to [http://127.0.0.1:3000/graphql](http://127.0.0.1:3000/graphql) to use the graphql playground