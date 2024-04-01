const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.post('/events', (req, res, next) => {
  try {
    const event = req.body;
    axios.post('http://localhost:4000/events', event); // /post server
    axios.post('http://localhost:4001/events', event); // /post/:id/comment server
    axios.post('http://localhost:4002/events', event); // query server
    res.send({ status: 'ok' });
  } catch (err) {
    console.log('ERROR IN /EVENT SERVER: ', err);
  }
});

app.listen(4005, () => console.log('listening on port 4005'));
