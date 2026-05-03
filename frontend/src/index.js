import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Registration from './account/registration';
import Login from './account/login';
import CreatePostPage from './posts/CreatePostPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import apiCall from './utils/api';

const root = ReactDOM.createRoot(document.getElementById('root'));

function MainApp() {
  const [logged_in, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    apiCall('/account/check-login')
      .then((response) => {
        if (response.status === 200) {
          return response.json().then((data) => {
            setLoggedIn(true);
            if (data.name) {
              setUsername(data.name);
              console.log('Logged in as:', data.name);
            }
          });
        }
      })
  }, []);

  const handleLogout = async () => {
    try {
      await apiCall('/account/logout', { method: 'GET' });
      setLoggedIn(false);
      setUsername('');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <React.StrictMode>
      <BrowserRouter>
        <header style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo192.png" alt="App Icon" style={{ height: '32px', width: '32px' }} />
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}><b>Stacker News</b></Link>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            { logged_in ? (
              <>
                <Link to="/create-post" style={{ textDecoration: 'none' }}><button>Create Post</button></Link>
                <div>{username}</div>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/register" style={{ textDecoration: 'none' }}><button>Register</button></Link>
                <Link to="/login" style={{ textDecoration: 'none' }}><button>Login</button></Link>
              </>
            )}
          </div>
        </header>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Registration setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setUsername={setUsername} />} />
          <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
        <footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f0f0f0' }}>
          © {new Date().getFullYear()} MT Cloud
        </footer>
      </BrowserRouter>
    </React.StrictMode>
  );
}

root.render(<MainApp />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
