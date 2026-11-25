import api from './api.js';
import { sampleProducts, productCategories } from '../data/siteData.js';

export const productService = {
  async getProducts(params = {}) {
    try {
      const { data } = await api.get('/products', { params });
      if (Array.isArray(data?.products) && data.products.length > 0) {
        return { products: data.products, source: 'api' };
      }
      if (Array.isArray(data) && data.length > 0) {
        return { products: data, source: 'api' };
      }
    } catch {
      // Fallback to clearly marked placeholder catalogue when API is offline or empty
    }
    return { products: sampleProducts, source: 'placeholder' };
  },

  async getProductBySlug(slug) {
    try {
      const { data } = await api.get(`/products/${slug}`);
      if (data?.product) return { product: data.product, source: 'api' };
      if (data?._id) return { product: data, source: 'api' };
    } catch {
      // Fallback to placeholder catalogue
    }
    const found = sampleProducts.find(
      (p) => p.slug === slug || p._id === slug
    );
    return { product: found || null, source: 'placeholder' };
  },

  async getCategories() {
    try {
      const { data } = await api.get('/categories');
      if (Array.isArray(data) && data.length > 0) return data;
    } catch {
      // Fallback to approved category list
    }
    return productCategories;
  },

  async submitReview(productId, payload) {
    const { data } = await api.post(`/products/${productId}/reviews`, payload);
    return data;
  },
};
