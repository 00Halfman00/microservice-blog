const express = require('express');
const app = express();
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const comments = {};

app.get('/post/:id/comments', (req, res, next) => {
  res.send(comments[req.params.id] || []);
});

app.post('/post/:id/comments', async (req, res, next) => {
  try {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comment = { commentId, content };
    if (!comments[req.params.id]) comments[req.params.id] = [];
    comments[req.params.id][comments[req.params.id].length] = comment;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        commentId,
        content,
        postId: req.params.id,
      },
    });

    res.status(201).send(comment);
  } catch (err) {
    console.log(err);
  }
});

app.post('/events', (req, res, next) => {
  console.log('Event received in comments server and type is: ', req.body.type);
  res.send({});
})

app.listen(4001, () => console.log('listening on port 4001'));
