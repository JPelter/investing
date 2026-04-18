import React, { useState } from 'react';
import './posts.css';
import apiCall from '../utils/api';

export async function createPost(title, url) {
  try {
    const response = await apiCall('/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        url: url,
      }),
    });

    const data = await response.json();

    if (response.status === 201) {
      return { success: true, post_id: data.post_id };
    } else {
      return { success: false, error: data.error || 'Failed to create post' };
    }
  } catch (error) {
    return { success: false, error: 'Error creating post: ' + error.message };
  }
}

export function CreatePostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const result = await createPost(title, url);

    if (result.success) {
      setSuccessMessage('Post created successfully!');
      setTitle('');
      setUrl('');
      if (onPostCreated) {
        onPostCreated();
      }
    } else {
      setErrorMessage(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="create-post-form">
      <h3>Create a Post</h3>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL:</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export function PostCard({ url, title, comments, created_at, poster_name }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-title-row">
          <a href={url} target="_blank" rel="noopener noreferrer" className="post-title-link">
            <h3 className="post-title">{title}</h3>
          </a>
          <span className="post-meta">by {poster_name}, {formatDate(created_at)}</span>
        </div>
      </div>
      <div className="post-footer">
        <span className="post-comments">{comments || 0} comments</span>
      </div>
    </div>
  );
}

export function PostsContainer({ data }) {
  if (!data || !data.posts || data.posts.length === 0) {
    return <div className="posts-container">No posts available</div>;
  }

  return (
    <div className="posts-container">
      {data.posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          url={post.url}
          comments={post.comments || 0}
          created_at={post.created_at}
          poster_name={post.poster_name}
        />
      ))}
    </div>
  );
}


