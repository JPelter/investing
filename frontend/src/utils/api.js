const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  return fetch(url, {
    ...options,
    credentials: 'include',
  });
};

export default apiCall;