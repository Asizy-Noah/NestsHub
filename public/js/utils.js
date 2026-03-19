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

// Hostel-specific utilities
const hostelUtils = {
  proximityRanges: [
    { label: '< 1 km', value: 0.5 },
    { label: '1-2 km', value: 1.5 },
    { label: '2-5 km', value: 3.5 },
    { label: '5-10 km', value: 7.5 },
    { label: '10+ km', value: 15 },
  ],

  roomTypes: ['single', 'double', 'triple', 'dormitory'],

  cookingPolicies: ['electricity', 'charcoal', 'gas', 'not_allowed'],

  amenitiesIcons: {
    security: 'fa-shield-alt',
    tvRoom: 'fa-tv',
    readingRoom: 'fa-book',
    gym: 'fa-dumbbell',
    swimmingPool: 'fa-water',
    parking: 'fa-parking',
    wifi: 'fa-wifi',
    laundry: 'fa-socks',
    generator: 'fa-bolt',
  },

  getAmenityIcon(amenity) {
    return this.amenitiesIcons[amenity] || 'fa-check';
  },

  formatVerificationStatus(status) {
    const statuses = {
      unverified: { text: 'Unverified', color: 'text-slate-600', bgColor: 'bg-slate-100', icon: 'fa-times-circle' },
      pending: { text: 'Pending', color: 'text-amber-600', bgColor: 'bg-amber-100', icon: 'fa-clock' },
      verified: { text: 'Verified', color: 'text-emerald-600', bgColor: 'bg-emerald-100', icon: 'fa-check-circle' },
      rejected: { text: 'Rejected', color: 'text-red-600', bgColor: 'bg-red-100', icon: 'fa-times-circle' },
    };
    return statuses[status] || statuses.unverified;
  },

  formatRoomType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  },

  calculateOccupancy(totalRooms, availableRooms) {
    if (totalRooms === 0) return 0;
    return Math.round(((totalRooms - availableRooms) / totalRooms) * 100);
  },
};

// Hotel-specific utilities
const hotelUtils = {
  roomTypes: ['single', 'double', 'suite'],
  bedSizes: ['3x6', '4x6', '6x6'],
  floorLevels: Array.from({ length: 11 }, (_, i) => i),
  
  distanceOptions: [
    { value: 'on_the_road', label: 'On the road' },
    { value: 'less_500m', label: '< 500m' },
    { value: '500m_1km', label: '500m - 1km' },
    { value: '1km_5km', label: '1km - 5km' },
    { value: '5km_plus', label: '5km+' },
  ],

  wifiOptions: [
    { value: 'free', label: 'Free WiFi' },
    { value: 'extra_charge', label: 'WiFi with Extra Charge' },
    { value: 'none', label: 'No WiFi' },
  ],

  paymentMethods: [
    { value: 'cash', label: 'Cash' },
    { value: 'mobile_money', label: 'Mobile Money' },
    { value: 'visa', label: 'Visa/Card' },
  ],

  amenitiesIcons: {
    gym: 'fa-dumbbell',
    bar: 'fa-wine-glass-alt',
    restaurant: 'fa-utensils',
    parkingSpace: 'fa-parking',
    storageBuilding: 'fa-warehouse',
    supermarketNearby: 'fa-shopping-cart',
    hasBalcony: 'fa-sun',
    hasHotWater: 'fa-water',
    hasTV: 'fa-tv',
    hasDSTV: 'fa-satellite',
    hasTableChair: 'fa-chair',
  },

  getAmenityIcon(amenity) {
    return this.amenitiesIcons[amenity] || 'fa-check';
  },

  formatRoomType(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
  },

  calculateOccupancy(totalRooms, bookedRooms) {
    if (totalRooms === 0) return 0;
    return Math.round((bookedRooms / totalRooms) * 100);
  },

  getAvailableRooms(totalRooms, bookedRooms) {
    return Math.max(0, totalRooms - bookedRooms);
  },

  formatCurrency(amount) {
    return amount.toLocaleString('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    });
  },

  formatVerificationStatus(status) {
    const statuses = {
      unverified: { text: 'Unverified', color: 'text-slate-600', bgColor: 'bg-slate-100', icon: 'fa-times-circle' },
      pending: { text: 'Pending', color: 'text-amber-600', bgColor: 'bg-amber-100', icon: 'fa-clock' },
      verified: { text: 'Verified', color: 'text-emerald-600', bgColor: 'bg-emerald-100', icon: 'fa-check-circle' },
      rejected: { text: 'Rejected', color: 'text-red-600', bgColor: 'bg-red-100', icon: 'fa-times-circle' },
    };
    return statuses[status] || statuses.unverified;
  },
};

// Rental-specific utilities
const rentalUtils = {
  houseTypes: ['studio', '1-bedroom', '2-bedroom', '3-bedroom', '4-bedroom'],
  buildingStyles: ['flat_storey', 'single_level'],
  accessRoadTypes: ['tarmac', 'murram_gravel'],
  billingPayers: ['tenant', 'landlord'],

  furnitureItems: [
    'Bed',
    'Sofa',
    'Fridge',
    'Cooker',
    'Dining Table',
    'Chairs',
    'Wardrobe',
    'Desk',
    'Shelving',
    'Cabinet',
  ],

  features: [
    'isSelfContained',
    'isFenced',
    'isCompoundPaved',
    'hasAmpleParking',
    'hasOutsideWashrooms',
    'hasSecurity',
    'hasWater',
  ],

  featureLabels: {
    isSelfContained: 'Self Contained',
    isFenced: 'Fenced',
    isCompoundPaved: 'Compound Paved',
    hasAmpleParking: 'Ample Parking',
    hasOutsideWashrooms: 'Outside Washrooms',
    hasSecurity: 'Security',
    hasWater: 'Water Available',
  },

  formatHouseType(type) {
    const formatted = type.replace(/-/g, ' ');
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  },

  formatBuildingStyle(style) {
    const styles = {
      flat_storey: 'Flat/Storey',
      single_level: 'Single Level',
    };
    return styles[style] || style;
  },

  formatAccessRoadType(type) {
    const types = {
      tarmac: 'Tarmac',
      murram_gravel: 'Murram/Gravel',
    };
    return types[type] || type;
  },

  formatBillingPayer(payer) {
    return payer.charAt(0).toUpperCase() + payer.slice(1);
  },

  getPropertySummary(property) {
    const types = {
      unverified: 'Unverified',
      pending: 'Pending Verification',
      verified: 'Verified & Active',
      rejected: 'Verification Rejected',
    };

    return {
      title: property.propertyName,
      type: this.formatHouseType(property.houseType),
      location: `${property.nearestTown}, ${property.nearestCity}`,
      units: `${property.unitCount} unit${property.unitCount !== 1 ? 's' : ''}`,
      rent: property.monthlyRent ? `UGX ${property.monthlyRent.toLocaleString()}` : 'Not set',
      status: types[property.verificationStatus],
    };
  },

  isPropertyComplete(property) {
    return (
      property.propertyName &&
      property.houseType &&
      property.unitCount &&
      property.nearestCity &&
      property.nearestTown &&
      property.accessRoadType
    );
  },
};

// Admin & Staff utilities
const adminUtils = {
  accountRoles: [
    { value: 'individual', label: 'Individual' },
    { value: 'hostel_owner', label: 'Hostel Owner' },
    { value: 'hotel_owner', label: 'Hotel Owner' },
    { value: 'property_manager', label: 'Property Manager' },
    { value: 'admin', label: 'Admin' },
    { value: 'staff', label: 'Staff' },
  ],

  accountStatuses: [
    { value: 'pending_email_verification', label: 'Pending Email Verification' },
    { value: 'pending_password_set', label: 'Pending Password Set' },
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
  ],

  verificationStatuses: [
    { value: 'unverified', label: 'Unverified', color: 'text-slate-600', bgColor: 'bg-slate-100' },
    { value: 'pending', label: 'Pending', color: 'text-amber-600', bgColor: 'bg-amber-100' },
    { value: 'verified', label: 'Verified', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
    { value: 'rejected', label: 'Rejected', color: 'text-red-600', bgColor: 'bg-red-100' },
  ],

  formatRole(role) {
    return role
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },

  getRoleColor(role) {
    const colors = {
      admin: 'bg-indigo-100 text-indigo-700',
      staff: 'bg-blue-100 text-blue-700',
      hostel_owner: 'bg-purple-100 text-purple-700',
      hotel_owner: 'bg-pink-100 text-pink-700',
      property_manager: 'bg-orange-100 text-orange-700',
      individual: 'bg-slate-100 text-slate-700',
    };
    return colors[role] || 'bg-slate-100 text-slate-700';
  },

  getStatusColor(status) {
    const colors = {
      active: 'bg-emerald-100 text-emerald-700',
      suspended: 'bg-red-100 text-red-700',
      pending_email_verification: 'bg-amber-100 text-amber-700',
      pending_password_set: 'bg-amber-100 text-amber-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  },

  getVerificationColor(status) {
    const colors = {
      verified: 'bg-emerald-100 text-emerald-700',
      unverified: 'bg-slate-100 text-slate-700',
      pending: 'bg-amber-100 text-amber-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-700';
  },

  canManageAccount(userRole, targetRole) {
    if (userRole === 'admin') return true;
    return false;
  },
};

// Global toast function
function showToast(message, type = 'info') {
  const container = document.querySelector('[x-data*="toastManager"]');
  if (container && container.__x) {
    container.__x.add(message, type);
  } else {
    console.log(`[${type.toUpperCase()}] ${message}`);
  }
}
