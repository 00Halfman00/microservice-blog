import React from 'react';
import CreatePost from './PostCreate';
import PostList from './PostList';

const App = () => {
  return (
    <div
      className="container"
      style={{
        marginTop: '2rem',
      }}
    >
      <div
        className="card"
        style={{
          padding: '1rem',
          border: 'none',
          boxShadow: '0 5px 8px rgba(0, 0, 0, 0.26)',
          borderRadius: '0.35em',
          marginBottom:'1rem'
        }}
      >
        <h1>Create Post</h1>
        <CreatePost />
      </div>
      <div className='card'
        style={{
          padding: '1rem',
          border: 'none',
          boxShadow: '0 5px 8px rgba(0, 0, 0, 0.26)',
          borderRadius: '0.35em',
        }}
      >
        <h1>Post List</h1>
        <PostList/>
      </div>
    </div>
  );
};

export default App;
