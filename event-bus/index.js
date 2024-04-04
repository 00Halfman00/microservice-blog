const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser')

app.use(bodyParser.json());

const events = [];

app.post('/events', async (req, res, next) => {
  const event = req.body;
  events[events.length] = event;
  try {
    axios.post('http://localhost:4000/events', event); // /post server
    axios.post('http://localhost:4001/events', event); // /post/:id/comment server
    axios.post('http://localhost:4002/events', event).then(
      axios.interceptors.response.use(
        response => response,
        error => {
        }
      )
    )
    axios.post('http://localhost:4003/events', event); // moderation server
    res.send({ status: 'ok' });
  } catch (err) {
    console.log('ERROR IN /EVENT SERVER: ', err);
    next(err)
  }
});

app.get('/events', (req, res, next) => {
  res.send(events);
})

app.listen(4005, () => console.log('listening on port 4005'));
