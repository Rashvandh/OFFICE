export const ADMIN_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  PRODUCT_MANAGER: 'PRODUCT_MANAGER',
  ORDER_MANAGER: 'ORDER_MANAGER',
  CONTENT_MANAGER: 'CONTENT_MANAGER',
  CUSTOMER_SUPPORT: 'CUSTOMER_SUPPORT',
};

export const ROLE_LABELS = {
  [ADMIN_ROLES.SUPER_ADMIN]: 'Super Admin',
  [ADMIN_ROLES.PRODUCT_MANAGER]: 'Product Manager',
  [ADMIN_ROLES.ORDER_MANAGER]: 'Order Manager',
  [ADMIN_ROLES.CONTENT_MANAGER]: 'Content Manager',
  [ADMIN_ROLES.CUSTOMER_SUPPORT]: 'Customer Support',
};

export const ROLE_PERMISSIONS = {
  [ADMIN_ROLES.SUPER_ADMIN]: ['*'],
  [ADMIN_ROLES.PRODUCT_MANAGER]: [
    'dashboard.view',
    'products.view',
    'products.manage',
    'categories.view',
    'categories.manage',
    'inventory.view',
    'inventory.manage',
    'reports.view',
    'notifications.view',
    'profile.manage',
  ],
  [ADMIN_ROLES.ORDER_MANAGER]: [
    'dashboard.view',
    'orders.view',
    'orders.manage',
    'payments.view',
    'customers.view',
    'inventory.view',
    'reports.view',
    'notifications.view',
    'profile.manage',
  ],
  [ADMIN_ROLES.CONTENT_MANAGER]: [
    'dashboard.view',
    'content.view',
    'content.manage',
    'stores.view',
    'stores.manage',
    'careers.view',
    'careers.manage',
    'news.view',
    'news.manage',
    'blogs.view',
    'blogs.manage',
    'feed_india.view',
    'feed_india.manage',
    'newsletter.view',
    'newsletter.manage',
    'notifications.view',
    'profile.manage',
  ],
  [ADMIN_ROLES.CUSTOMER_SUPPORT]: [
    'dashboard.view',
    'customers.view',
    'orders.view',
    'franchise.view',
    'franchise.manage',
    'reviews.view',
    'reviews.moderate',
    'notifications.view',
    'profile.manage',
  ],
};

export function hasPermission(role, permission) {
  if (!role) return false;
  if (!permission) return true;
  const perms = ROLE_PERMISSIONS[role] || [];
  if (perms.includes('*')) return true;
  return perms.includes(permission);
}
