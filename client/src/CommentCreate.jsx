import React, { useState } from 'react';
import axios from 'axios';

const CreateComment = ({ postId }) => {
  const [content, setContent] = useState('');


  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:4001/post/${postId}/comments`, {
      content,
    });
    setContent('');
  };


  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>New comment</label>
        <input
          className="form-body"
          style={{
            backgroundColor: 'whiteSmoke',
            marginBottom: '1rem',
            border: 'none',
            boxShadow: '0 5px 8px rgba(0, 0, 0, 0.26)',
            borderRadius: '0.35em',
            display:"block",
            width:"100%"
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button
        className="btn btn-secondary"
        style={{
          border: 'none',
          boxShadow: '0 5px 8px rgba(0, 0, 0, 0.26)',
          borderRadius: '0.35em',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default CreateComment;
