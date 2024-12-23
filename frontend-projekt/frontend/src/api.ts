interface ApiResponse {
  message: string;
}

const API_URL = 'http://localhost:3000';

export const register = async (username: string, password: string, email: string): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return await response.json();
};

export const login = async (username: string, password: string, email: string): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return await response.json();
};

export const logout = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Logout failed');
  }
  return await response.json();
};

export const fetchProtected = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/protected`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Unauthorized');
  }
  return await response.json();
};

export const fetchProducts = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    credentials: 'include',
  });
  return await response.json();
};

export const fetchProfile = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    credentials: 'include',
  });
  return await response.json();
};

export const fetchLoggedInHome = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/LoggedInHome`, {
    method: 'GET',
    credentials: 'include',
  });
  return await response.json();
};