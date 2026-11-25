import axios from 'axios';

const ADMIN_SESSION_KEY = 'gramiyam_admin_session_v1';

const adminClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

adminClient.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (raw) {
      const { token } = JSON.parse(raw);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // Ignore storage read errors
  }
  return config;
});

function normalizeList(res) {
  const payload = res?.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

async function safeGetList(endpoint, params = {}) {
  try {
    const res = await adminClient.get(endpoint, { params });
    return {
      ok: true,
      data: normalizeList(res),
      pagination: res?.data?.pagination || null,
      endpoint,
      unavailable: false,
    };
  } catch (err) {
    const status = err.response?.status;
    return {
      ok: false,
      data: [],
      pagination: null,
      endpoint,
      unavailable: !status || status === 404 || status === 501,
      error: err.response?.data?.message || err.message || 'Request failed',
    };
  }
}

async function safeGetOne(endpoint) {
  try {
    const res = await adminClient.get(endpoint);
    return {
      ok: true,
      data: res?.data?.data ?? res?.data ?? null,
      endpoint,
      unavailable: false,
    };
  } catch (err) {
    const status = err.response?.status;
    return {
      ok: false,
      data: null,
      endpoint,
      unavailable: !status || status === 404 || status === 501,
      error: err.response?.data?.message || err.message || 'Request failed',
    };
  }
}

async function safeMutate(method, endpoint, body) {
  try {
    const res = await adminClient[method](endpoint, body);
    return {
      ok: true,
      data: res?.data?.data ?? res?.data,
      message: res?.data?.message || 'Saved successfully.',
    };
  } catch (err) {
    const status = err.response?.status;
    return {
      ok: false,
      unavailable: !status || status === 404 || status === 501,
      message:
        err.response?.data?.message ||
        `Backend endpoint (${method.toUpperCase()} ${endpoint}) is not yet available.`,
    };
  }
}

export const adminApi = {
  client: adminClient,
  SESSION_KEY: ADMIN_SESSION_KEY,

  // Existing backend endpoint: GET /api/products & GET /api/products/:slug
  getProducts: (params) => safeGetList('/products', params),
  getProduct: (idOrSlug) => safeGetOne(`/products/${idOrSlug}`),
  createProduct: (body) => safeMutate('post', '/admin/products', body),
  updateProduct: (id, body) => safeMutate('put', `/admin/products/${id}`, body),
  deleteProduct: (id) => safeMutate('delete', `/admin/products/${id}`),

  // Admin module endpoints (ready for backend implementation)
  getDashboard: (params) => safeGetOne('/admin/dashboard', { params }),
  getCategories: (params) => safeGetList('/admin/categories', params),
  saveCategory: (id, body) =>
    id ? safeMutate('put', `/admin/categories/${id}`, body) : safeMutate('post', '/admin/categories', body),
  deleteCategory: (id) => safeMutate('delete', `/admin/categories/${id}`),

  getInventory: (params) => safeGetList('/admin/inventory', params),
  adjustStock: (body) => safeMutate('post', '/admin/inventory/adjust', body),

  getOrders: (params) => safeGetList('/admin/orders', params),
  getOrder: (id) => safeGetOne(`/admin/orders/${id}`),
  updateOrderStatus: (id, body) => safeMutate('patch', `/admin/orders/${id}/status`, body),

  getPayments: (params) => safeGetList('/admin/payments', params),
  getPayment: (id) => safeGetOne(`/admin/payments/${id}`),

  getCustomers: (params) => safeGetList('/admin/customers', params),
  getCustomer: (id) => safeGetOne(`/admin/customers/${id}`),

  getFranchiseEnquiries: (params) => safeGetList('/admin/franchise', params),
  getFranchiseEnquiry: (id) => safeGetOne(`/admin/franchise/${id}`),
  updateFranchiseEnquiry: (id, body) => safeMutate('patch', `/admin/franchise/${id}`, body),

  getStores: (params) => safeGetList('/admin/stores', params),
  getStore: (id) => safeGetOne(`/admin/stores/${id}`),
  saveStore: (id, body) =>
    id ? safeMutate('put', `/admin/stores/${id}`, body) : safeMutate('post', '/admin/stores', body),
  deleteStore: (id) => safeMutate('delete', `/admin/stores/${id}`),

  getCareers: (params) => safeGetList('/admin/careers', params),
  saveCareer: (id, body) =>
    id ? safeMutate('put', `/admin/careers/${id}`, body) : safeMutate('post', '/admin/careers', body),
  getCareerApplications: (params) => safeGetList('/admin/careers/applications', params),

  getNews: (params) => safeGetList('/admin/news', params),
  getNewsItem: (id) => safeGetOne(`/admin/news/${id}`),
  saveNews: (id, body) =>
    id ? safeMutate('put', `/admin/news/${id}`, body) : safeMutate('post', '/admin/news', body),

  getBlogs: (params) => safeGetList('/admin/blogs', params),
  getBlogItem: (id) => safeGetOne(`/admin/blogs/${id}`),
  saveBlog: (id, body) =>
    id ? safeMutate('put', `/admin/blogs/${id}`, body) : safeMutate('post', '/admin/blogs', body),
  deleteBlog: (id) => safeMutate('delete', `/admin/blogs/${id}`),

  getFeedIndia: (params) => safeGetList('/admin/feed-india', params),
  saveFeedIndia: (id, body) =>
    id ? safeMutate('put', `/admin/feed-india/${id}`, body) : safeMutate('post', '/admin/feed-india', body),

  getReviews: (params) => safeGetList('/admin/reviews', params),
  moderateReview: (id, status) => safeMutate('patch', `/admin/reviews/${id}`, { status }),

  getNewsletterSubscribers: (params) => safeGetList('/admin/newsletter', params),
  updateSubscriberStatus: (id, status) => safeMutate('patch', `/admin/newsletter/${id}`, { status }),

  getContentSection: (section) => safeGetOne(`/admin/content/${section}`),
  saveContentSection: (section, body) => safeMutate('put', `/admin/content/${section}`, body),

  getReports: (params) => safeGetOne('/admin/reports', { params }),

  getAdminUsers: (params) => safeGetList('/admin/users', params),
  getAdminUser: (id) => safeGetOne(`/admin/users/${id}`),
  saveAdminUser: (id, body) =>
    id ? safeMutate('put', `/admin/users/${id}`, body) : safeMutate('post', '/admin/users', body),

  getActivityLogs: (params) => safeGetList('/admin/activity-logs', params),
  getSettings: () => safeGetOne('/admin/settings'),
  saveSettings: (body) => safeMutate('put', '/admin/settings', body),

  getNotifications: (params) => safeGetList('/admin/notifications', params),
  markNotificationRead: (id) => safeMutate('patch', `/admin/notifications/${id}/read`, {}),
  markAllNotificationsRead: () => safeMutate('patch', '/admin/notifications/read-all', {}),
};
