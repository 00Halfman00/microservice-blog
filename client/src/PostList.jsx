import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateComment from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [postList, setPostList] = useState({});

  const fetchPost = async () => {
    const res = await axios.get('http://localhost:4002/post');
    setPostList(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const renderedPost = Object.values(postList).map((post) => {
    return (
      <div
        key={post.postId}
        className="card"
        style={{
          width: '30%',
          marginBottom: '20px',
          border: 'none',
          boxShadow: '0 5px 8px rgba(0, 0, 0, 0.26)',
          borderRadius: '0.35em',
        }}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <div
            className="card"
            style={{
              padding: '1rem',
              border: 'none',
              boxShadow: '0 5px 8px rgba(0, 0, 0, 0.26)',
              borderRadius: '0.35em',
              marginBottom:".5rem"
            }}
          >
            <CommentList comments={post.comments}/>
          </div>
          <div
            className="card"
            style={{
              padding: '1rem',
              border: 'none',
              boxShadow: '0 5px 8px rgba(0, 0, 0, 0.26)',
              borderRadius: '0.35em',
            }}
          >
            <CreateComment postId={post.postId} />
          </div>
        </div>
      </div>
    );
  });


  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPost}
    </div>
  );
};

export default PostList;
