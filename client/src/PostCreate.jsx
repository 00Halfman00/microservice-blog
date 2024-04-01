import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const onSubmitPost = async (event) => {
    event.preventDefault();
    await axios.post('http://localhost:4000/post', { title });
    setTitle('');
  };
  return (
    <div style={{ marginBottom: '1rem' }}>
      <form onSubmit={onSubmitPost}>
        <div className="form-group">
          <label>Title</label>
          <input
            style={{
              backgroundColor: 'whiteSmoke',
              marginBottom: '1rem',
              border: 'none',
              boxShadow: '0 5px 8px rgba(0, 0, 0, 0.26)',
              borderRadius: '0.35em',
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button
          className="btn btn-primary"
          style={{
            border: 'none',
            boxShadow: '0 5px 8px rgba(0, 0, 0, 0.26)',
            borderRadius: '0.35em',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
