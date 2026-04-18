import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatePostForm } from './posts';

function CreatePostPage() {
  const navigate = useNavigate();

  const handlePostCreated = () => {
    // Redirect back to home page after post is created
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h1>Create a New Post</h1>
      <CreatePostForm onPostCreated={handlePostCreated} />
    </div>
  );
}

export default CreatePostPage;
