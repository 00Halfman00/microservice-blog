const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const post = {};

app.get('/post', (req, res, next) => {
  res.send(post);
});

app.post('/post', async (req, res, next) => {
   try {
    const postId = randomBytes(4).toString('hex');
    const { title } = req.body;
    post[postId] = {
      postId, title
    }
    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: {
        postId, title
      },
    });
    res.status(201).send(post[postId]);
   } catch(err) {
    console.log(err);
   }
});

app.post('/events', (req, res, next) => {
  console.log(req.body.type);
  res.send({});
})

app.listen(4000, () => console.log('listening on port 4000'));
