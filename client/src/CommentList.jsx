import React from 'react';

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content = comment.content;
    if(comment.status === 'rejected') content = 'comment rejected';
    if(comment.status === 'pending') content = 'waiting moderation';
    return <li key={comment.commentId}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
