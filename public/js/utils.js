// Utility functions for Alpine.js components

// API Helper
const api = {
  async request(url, options = {}) {
    const token = localStorage.getItem('accessToken');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  get(url, options = {}) {
    return this.request(url, { ...options, method: 'GET' });
  },

  post(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  patch(url, body, options = {}) {
    return this.request(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  delete(url, options = {}) {
    return this.request(url, { ...options, method: 'DELETE' });
  },
};

// Authentication Helper
const auth = {
  setToken(token) {
    localStorage.setItem('accessToken', token);
  },

  getToken() {
    return localStorage.getItem('accessToken');
  },

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};

// Form Validation Helper
const validation = {
  isEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  isStrongPassword(password) {
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[@$!%*?&]/.test(password);

    return hasLength && hasUpper && hasLower && hasNumber && hasSpecial;
  },

  getPasswordStrength(password) {
    const checks = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[@$!%*?&]/.test(password),
    };

    const passed = Object.values(checks).filter(v => v).length;
    return passed > 3 ? 'strong' : passed > 2 ? 'medium' : 'weak';
  },

  isPhoneValid(phone) {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s/g, ''));
  },
};

// Date Helper
const dateUtils = {
  format(date, format = 'MMM dd, yyyy') {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return date.toLocaleDateString('en-US', options);
  },

  relative(date) {
    if (typeof date === 'string') {
      date = new Date(date);
    }

    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
  },
};

// Storage Helper
const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

// UI Helper
const ui = {
  showLoader() {
    const loader = document.getElementById('global-loader');
    if (loader) loader.style.display = 'flex';
  },

  hideLoader() {
    const loader = document.getElementById('global-loader');
    if (loader) loader.style.display = 'none';
  },

  toast(message, type = 'info') {
    // Create toast element if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-4 right-4 space-y-2 z-50';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    const bgColor = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
    }[type] || 'bg-blue-500';

    toast.className = `${bgColor} text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  },

  scrollTo(element) {
    element?.scrollIntoView({ behavior: 'smooth' });
  },
};

// Common Alpine.js data factories
function createAuthState() {
  return {
    user: auth.getUser(),
    isAuthenticated: auth.isAuthenticated(),

    logout() {
      auth.logout();
      window.location.href = '/auth/login';
    },
  };
}

function createLoadingState() {
  return {
    loading: false,
    error: '',
    success: false,

    resetMessages() {
      this.error = '';
      this.success = false;
    },
  };
}
