const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(cors());

const post = {};

app.get('/post', (req, res, next) => {
  res.send(post);
});

app.post('/events', (req, res, next) => {
  console.log('event received: ', req.body.type);
  const { type, data } = req.body;
  if (type === 'PostCreated') {
    const { postId, title } = data;
    if (!post[postId])
      post[postId] = {
        postId,
        title,
        comments: [],
      };
  }
  if (type === 'CommentCreated') {
    const { postId, commentId, content } = data;
    post[postId]['comments'][post[postId]['comments'].length] = {
      commentId,
      content,
    };
  }

  console.log('post in query: ', post);
  res.send({});
});

app.listen(4002, () => console.log('server listening on port: 4002'));
