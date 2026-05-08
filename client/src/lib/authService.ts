const BASE_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (name: string, email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
};

export const loginWithGithub = () => {
  window.location.href = `${BASE_URL}/github`;
};

export const saveToken = (token: string) => {
  localStorage.setItem('sentio_token', token);
  window.dispatchEvent(new Event("auth-change"));
};
export const saveUser = (user: object) => {
  localStorage.setItem('sentio_user', JSON.stringify(user));
  window.dispatchEvent(new Event("auth-change"));
};
export const getToken = () => localStorage.getItem('sentio_token');
export const getUser = () => {
  const u = localStorage.getItem('sentio_user');
  return u ? JSON.parse(u) : null;
};
export const removeAuth = () => {
  localStorage.removeItem('sentio_token');
  localStorage.removeItem('sentio_user');
  window.dispatchEvent(new Event("auth-change"));
};
export const isLoggedIn = () => !!getToken();
