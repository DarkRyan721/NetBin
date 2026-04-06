import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/env';

export function useApi() {
  const { token, logout } = useAuth();
  const base = API_BASE_URL;

  const request = async (method, path, body) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${base}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (res.status === 401) {
      logout();
      throw new Error('Sesión expirada');
    }

    if (!res.ok) throw new Error(`Error ${res.status}`);

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  };

  return {
    get: (path) => request('GET', path),
    post: (path, body) => request('POST', path, body),
    put: (path, body) => request('PUT', path, body),
    del: (path) => request('DELETE', path),
  };
}
