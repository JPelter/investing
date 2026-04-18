import React, { useState, useEffect } from 'react';
import './App.css';
import { PostsContainer } from './posts/posts';
import apiCall from './utils/api';

function App() {
  const [posts, setPosts] = useState({ posts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const fetchPosts = async (pageNum) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall(`/post/get?page=${pageNum}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        setError('Failed to load posts');
      }
    } catch (err) {
      setError('Error fetching posts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading posts...</div>}
      {!loading && <PostsContainer data={posts} />}
      
      <div className="pagination" style={{ textAlign: 'center', padding: '20px' }}>
        {page > 0 && (
          <button onClick={() => setPage(page - 1)}>← Previous</button>
        )}
        <span style={{ margin: '0 10px' }}>Page {page + 1}</span>
        {posts.posts && posts.posts.length === 20 && (
          <button onClick={() => setPage(page + 1)}>Next →</button>
        )}
      </div>
    </div>
  );
}

export default App;
