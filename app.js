const express = require('express');
const bodyParser = require('body-parser');
// const redis = require('redis');

const todoRoutes  = require('./routes/todo');

// const client = redis.createClient();
// client.on('connect', () => console.log('Redis Connected!'));

const port = 8080;

const app = express();

app.use(bodyParser.json());

app.use('/todoredis', todoRoutes);

app.listen(port, () => console.log(`Server started on port : ${port}`));