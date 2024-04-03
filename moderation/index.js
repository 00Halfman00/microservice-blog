const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());

app.post('/events', async (req, res, next) => {
  const { data, type } = req.body;
  if (type === 'CommentCreated') {
    data.status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data,
    });
  }
  res.send({});
});

app.listen(4003, () => console.log('server is running on port: 4003'));
