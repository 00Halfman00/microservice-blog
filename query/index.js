const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors());

const post = {};

const eventHandler = (type, data) => {
  if (type === 'PostCreated') {
    const { postId, title } = data;
    if (!post[postId])
      post[postId] = {
        postId,
        title,
        comments: [],
      };
  } else {
    const { postId, commentId, content, status } = data;
    if (type === 'CommentCreated') {
      post[postId]['comments'][post[postId]['comments'].length] = {
        commentId,
        content,
        status,
      };
    }
    if (type === 'CommentUpdated') {
      const { comments } = post[postId];
      const comment = comments.find((c) => c.commentId === commentId);
      comment.status = status;
      comment.content = content;
    }
  }
};

app.get('/post', (req, res, next) => {
  res.send(post);
});

app.post('/events', (req, res, next) => {
  const { type, data } = req.body;
  eventHandler(type, data)
  res.send({});
});

app.listen(4002, async() => {
  console.log('server listening on port: 4002');
  try {
    const {data} = await axios.get('http://localhost:4005/events');
    console.log('get all bus events: ', data)
    data.forEach(e => eventHandler(e.type, e.data));

  } catch(err){
    console.log(err)
  }
});
