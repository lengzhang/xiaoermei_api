const config = require('../config');

let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');


let app = express();
let server = http.createServer(app);

let helmet = require('helmet');
app.use(helmet());

// http://www.cnblogs.com/vipstone/p/4865079.html
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cookieParser(config.cookie_secret));

const cors = require('cors');
app.use(cors())

// app.all('*', (req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//
//     if (req.method == 'OPTIONS') {
//         // 跨域并设置headers的请求，所有请求需要两步完成！
//         // 第一步：发送预请求 OPTIONS 请求。此时 服务器端需要对于OPTIONS请求作出响应 一般使用202响应即可 不用返回任何内容信息。
//         // res.status(200);
//         res.sendStatus(202);
//     } else {
//         next();
//     }
//
// });

app.get('/', (req, res) => {
  res.send('Hello World');
});

let graphql = require('./graphql');
graphql(app, bodyParser);

server.listen(config.port, () => {
    console.log(`server listening on port ${config.port}`);
});
