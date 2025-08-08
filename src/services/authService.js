// Authentication service for connecting to FastAPI backend
const API_BASE_URL = 'http://localhost:8000';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  // Register a new user
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      const data = await response.json();
      
      // Store token and user data
      this.token = data.access_token;
      this.user = data.user;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      
      // Store token and user data
      this.token = data.access_token;
      this.user = data.user;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Logout user
  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get current user profile
  async getCurrentUser() {
    if (!this.token) {
      throw new Error('No authentication token');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.logout(); // Token is invalid
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to fetch user profile');
      }

      const userData = await response.json();
      this.user = userData;
      localStorage.setItem('user', JSON.stringify(this.user));
      
      return userData;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(updateData) {
    if (!this.token) {
      throw new Error('No authentication token');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.logout();
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to update profile');
      }

      const userData = await response.json();
      this.user = userData;
      localStorage.setItem('user', JSON.stringify(this.user));
      
      return userData;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  // Get current user data
  getCurrentUserData() {
    return this.user;
  }

  // Get authentication token
  getToken() {
    return this.token;
  }

  // Make authenticated API requests
  async authenticatedRequest(url, options = {}) {
    if (!this.token) {
      throw new Error('No authentication token');
    }

    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      ...defaultOptions,
    });

    if (response.status === 401) {
      this.logout();
      throw new Error('Session expired. Please login again.');
    }

    return response;
  }
}

// Create and export a single instance
const authService = new AuthService();
export default authService;
