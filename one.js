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
