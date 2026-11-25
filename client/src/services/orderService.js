import api from './api.js';

export const orderService = {
  async createPaymentOrder(payload) {
    const { data } = await api.post('/payments/create-order', payload);
    return data;
  },

  async verifyPayment(payload) {
    const { data } = await api.post('/payments/verify', payload);
    return data;
  },

  async getMyOrders() {
    const { data } = await api.get('/orders/my-orders');
    return data;
  },

  async trackOrder({ orderId, verification }) {
    const { data } = await api.get('/orders/track', {
      params: { orderId, verification },
    });
    return data;
  },

  async submitFranchiseEnquiry(payload) {
    const { data } = await api.post('/franchise/enquiries', payload);
    return data;
  },

  async submitCareerApplication(formData) {
    const { data } = await api.post('/careers/apply', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async getOpenPositions() {
    const { data } = await api.get('/careers/positions');
    return data;
  },

  async getStores(params = {}) {
    const { data } = await api.get('/stores', { params });
    return data;
  },

  async subscribeNewsletter(email) {
    const { data } = await api.post('/newsletter/subscribe', { email });
    return data;
  },

  async submitContactForm(payload) {
    const { data } = await api.post('/contact', payload);
    return data;
  },

  async submitDonationInterest(payload) {
    const { data } = await api.post('/donations/pledge', payload);
    return data;
  },
};
