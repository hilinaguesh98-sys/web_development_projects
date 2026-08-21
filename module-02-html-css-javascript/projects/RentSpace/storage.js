const STORAGE_KEYS = {
  PROPERTIES: 'rentspace_properties',
  FAVORITES: 'rentspace_favorites',
  INQUIRIES: 'rentspace_inquiries',
  USERS: 'rentspace_users',
  CURRENT_USER: 'rentspace_current_user',
  ADMIN_SESSION: 'rentspace_admin_session',
  THEME: 'rentspace_theme'
};

const StorageLayer = {
  async initData() {
    if (!localStorage.getItem(STORAGE_KEYS.PROPERTIES)) {
      try {
        const response = await fetch('data/properties.json');
        const data = await response.json();
        localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(data));
      } catch (err) {
        console.error('Failed to seed properties data:', err);
        localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify([]));
      }
    }
    if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
    }
  },

  getProperties() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROPERTIES) || '[]');
  },

  saveProperties(properties) {
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(properties));
  },

  getPropertyById(id) {
    const properties = this.getProperties();
    return properties.find(p => p.id === parseInt(id));
  },

  getFavorites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
  },

  toggleFavorite(propertyId) {
    let favorites = this.getFavorites();
    const id = parseInt(propertyId);
    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    return favorites;
  },

  getInquiries() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES) || '[]');
  },

  addInquiry(inquiry) {
    const inquiries = this.getInquiries();
    inquiry.id = Date.now();
    inquiry.createdAt = new Date().toISOString();
    inquiry.status = 'new'; 
    inquiries.push(inquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    return inquiry;
  },

  updateInquiryStatus(id, newStatus) {
    const inquiries = this.getInquiries();
    const idx = inquiries.findIndex(i => i.id === parseInt(id));
    if (idx !== -1) {
      inquiries[idx].status = newStatus;
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    }
  },

  deleteInquiry(id) {
    let inquiries = this.getInquiries();
    inquiries = inquiries.filter(i => i.id !== parseInt(id));
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  },

  getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  },

  addUser(user) {
    const users = this.getUsers();
    user.id = Date.now();
    users.push(user);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return user;
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null');
  },

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  },

  isAdminLoggedIn() {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
  },

  setAdminLoggedIn(status) {
    if (status) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }
  },

  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  },

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }
};