import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import AdminRouteGuard from './components/common/AdminRouteGuard.jsx';

import AdminLogin from './pages/auth/AdminLogin.jsx';
import AdminSignup from './pages/auth/AdminSignup.jsx';
import AdminForgotPassword from './pages/auth/AdminForgotPassword.jsx';
import AdminResetPassword from './pages/auth/AdminResetPassword.jsx';
import AdminUnauthorized from './pages/auth/AdminUnauthorized.jsx';
import AdminProfile from './pages/auth/AdminProfile.jsx';

import AdminDashboard from './pages/dashboard/AdminDashboard.jsx';
import AdminProducts from './pages/products/AdminProducts.jsx';
import AdminProductForm from './pages/products/AdminProductForm.jsx';
import AdminProductDetails from './pages/products/AdminProductDetails.jsx';
import AdminCategories from './pages/categories/AdminCategories.jsx';
import AdminInventory from './pages/inventory/AdminInventory.jsx';

import AdminOrders from './pages/orders/AdminOrders.jsx';
import AdminOrderDetails from './pages/orders/AdminOrderDetails.jsx';
import AdminPayments from './pages/payments/AdminPayments.jsx';
import AdminCustomers from './pages/customers/AdminCustomers.jsx';
import AdminCustomerDetails from './pages/customers/AdminCustomerDetails.jsx';

import AdminFranchise from './pages/franchise/AdminFranchise.jsx';
import AdminStores from './pages/stores/AdminStores.jsx';
import AdminStoreForm from './pages/stores/AdminStoreForm.jsx';
import AdminCareers from './pages/careers/AdminCareers.jsx';
import AdminNews from './pages/news/AdminNews.jsx';
import AdminBlogs from './pages/blogs/AdminBlogs.jsx';
import AdminFeedIndia from './pages/feed-india/AdminFeedIndia.jsx';

import AdminReviews from './pages/reviews/AdminReviews.jsx';
import AdminNewsletter from './pages/newsletter/AdminNewsletter.jsx';
import AdminContent from './pages/content/AdminContent.jsx';
import AdminReports from './pages/reports/AdminReports.jsx';

import AdminUsers from './pages/users/AdminUsers.jsx';
import AdminActivityLogs from './pages/activity-logs/AdminActivityLogs.jsx';
import AdminNotifications from './pages/notifications/AdminNotifications.jsx';
import AdminSettings from './pages/settings/AdminSettings.jsx';

export default function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="login" element={<AdminLogin />} />
        <Route path="signup" element={<AdminSignup />} />
        <Route path="forgot-password" element={<AdminForgotPassword />} />
        <Route path="reset-password" element={<AdminResetPassword />} />
        <Route path="unauthorized" element={<AdminUnauthorized />} />

        <Route
          path="dashboard"
          element={
            <AdminRouteGuard permission="dashboard.view">
              <AdminDashboard />
            </AdminRouteGuard>
          }
        />
        <Route
          path="profile"
          element={
            <AdminRouteGuard permission="profile.manage">
              <AdminProfile />
            </AdminRouteGuard>
          }
        />
        <Route
          path="notifications"
          element={
            <AdminRouteGuard permission="notifications.view">
              <AdminNotifications />
            </AdminRouteGuard>
          }
        />

        {/* Products, Categories & Inventory */}
        <Route
          path="products"
          element={
            <AdminRouteGuard permission="products.view">
              <AdminProducts />
            </AdminRouteGuard>
          }
        />
        <Route
          path="products/add"
          element={
            <AdminRouteGuard permission="products.manage">
              <AdminProductForm />
            </AdminRouteGuard>
          }
        />
        <Route
          path="products/:id"
          element={
            <AdminRouteGuard permission="products.view">
              <AdminProductDetails />
            </AdminRouteGuard>
          }
        />
        <Route
          path="products/:id/edit"
          element={
            <AdminRouteGuard permission="products.manage">
              <AdminProductForm />
            </AdminRouteGuard>
          }
        />
        <Route
          path="categories"
          element={
            <AdminRouteGuard permission="categories.view">
              <AdminCategories />
            </AdminRouteGuard>
          }
        />
        <Route
          path="inventory"
          element={
            <AdminRouteGuard permission="inventory.view">
              <AdminInventory />
            </AdminRouteGuard>
          }
        />

        {/* Orders, Payments & Customers */}
        <Route
          path="orders"
          element={
            <AdminRouteGuard permission="orders.view">
              <AdminOrders />
            </AdminRouteGuard>
          }
        />
        <Route
          path="orders/:id"
          element={
            <AdminRouteGuard permission="orders.view">
              <AdminOrderDetails />
            </AdminRouteGuard>
          }
        />
        <Route
          path="payments"
          element={
            <AdminRouteGuard permission="payments.view">
              <AdminPayments />
            </AdminRouteGuard>
          }
        />
        <Route
          path="payments/:id"
          element={
            <AdminRouteGuard permission="payments.view">
              <AdminPayments />
            </AdminRouteGuard>
          }
        />
        <Route
          path="customers"
          element={
            <AdminRouteGuard permission="customers.view">
              <AdminCustomers />
            </AdminRouteGuard>
          }
        />
        <Route
          path="customers/:id"
          element={
            <AdminRouteGuard permission="customers.view">
              <AdminCustomerDetails />
            </AdminRouteGuard>
          }
        />

        {/* Franchise, Stores, Careers, News, Blogs, Feed India */}
        <Route
          path="franchise"
          element={
            <AdminRouteGuard permission="franchise.view">
              <AdminFranchise />
            </AdminRouteGuard>
          }
        />
        <Route
          path="franchise/:id"
          element={
            <AdminRouteGuard permission="franchise.view">
              <AdminFranchise />
            </AdminRouteGuard>
          }
        />
        <Route
          path="stores"
          element={
            <AdminRouteGuard permission="stores.view">
              <AdminStores />
            </AdminRouteGuard>
          }
        />
        <Route
          path="stores/add"
          element={
            <AdminRouteGuard permission="stores.manage">
              <AdminStoreForm />
            </AdminRouteGuard>
          }
        />
        <Route
          path="stores/:id/edit"
          element={
            <AdminRouteGuard permission="stores.manage">
              <AdminStoreForm />
            </AdminRouteGuard>
          }
        />
        <Route
          path="careers"
          element={
            <AdminRouteGuard permission="careers.view">
              <AdminCareers />
            </AdminRouteGuard>
          }
        />
        <Route
          path="careers/add"
          element={
            <AdminRouteGuard permission="careers.manage">
              <AdminCareers />
            </AdminRouteGuard>
          }
        />
        <Route
          path="careers/applications"
          element={
            <AdminRouteGuard permission="careers.view">
              <AdminCareers />
            </AdminRouteGuard>
          }
        />
        <Route
          path="news"
          element={
            <AdminRouteGuard permission="news.view">
              <AdminNews />
            </AdminRouteGuard>
          }
        />
        <Route
          path="news/add"
          element={
            <AdminRouteGuard permission="news.manage">
              <AdminNews />
            </AdminRouteGuard>
          }
        />
        <Route
          path="news/:id/edit"
          element={
            <AdminRouteGuard permission="news.manage">
              <AdminNews />
            </AdminRouteGuard>
          }
        />
        <Route
          path="blogs"
          element={
            <AdminRouteGuard permission="blogs.view">
              <AdminBlogs />
            </AdminRouteGuard>
          }
        />
        <Route
          path="blogs/add"
          element={
            <AdminRouteGuard permission="blogs.manage">
              <AdminBlogs />
            </AdminRouteGuard>
          }
        />
        <Route
          path="blogs/:id/edit"
          element={
            <AdminRouteGuard permission="blogs.manage">
              <AdminBlogs />
            </AdminRouteGuard>
          }
        />
        <Route
          path="feed-india"
          element={
            <AdminRouteGuard permission="feed_india.view">
              <AdminFeedIndia />
            </AdminRouteGuard>
          }
        />

        {/* Reviews, Newsletter, Content CMS & Reports */}
        <Route
          path="reviews"
          element={
            <AdminRouteGuard permission="reviews.view">
              <AdminReviews />
            </AdminRouteGuard>
          }
        />
        <Route
          path="newsletter"
          element={
            <AdminRouteGuard permission="newsletter.view">
              <AdminNewsletter />
            </AdminRouteGuard>
          }
        />
        <Route
          path="content"
          element={
            <AdminRouteGuard permission="content.view">
              <AdminContent />
            </AdminRouteGuard>
          }
        />
        <Route
          path="content/homepage"
          element={
            <AdminRouteGuard permission="content.view">
              <AdminContent />
            </AdminRouteGuard>
          }
        />
        <Route
          path="content/about"
          element={
            <AdminRouteGuard permission="content.view">
              <AdminContent />
            </AdminRouteGuard>
          }
        />
        <Route
          path="content/research"
          element={
            <AdminRouteGuard permission="content.view">
              <AdminContent />
            </AdminRouteGuard>
          }
        />
        <Route
          path="content/footer"
          element={
            <AdminRouteGuard permission="content.view">
              <AdminContent />
            </AdminRouteGuard>
          }
        />
        <Route
          path="reports"
          element={
            <AdminRouteGuard permission="reports.view">
              <AdminReports />
            </AdminRouteGuard>
          }
        />

        {/* Admin Users, Activity Logs & Settings */}
        <Route
          path="users"
          element={
            <AdminRouteGuard permission="users.manage">
              <AdminUsers />
            </AdminRouteGuard>
          }
        />
        <Route
          path="users/add"
          element={
            <AdminRouteGuard permission="users.manage">
              <AdminUsers />
            </AdminRouteGuard>
          }
        />
        <Route
          path="users/:id/edit"
          element={
            <AdminRouteGuard permission="users.manage">
              <AdminUsers />
            </AdminRouteGuard>
          }
        />
        <Route
          path="activity-logs"
          element={
            <AdminRouteGuard permission="activity_logs.view">
              <AdminActivityLogs />
            </AdminRouteGuard>
          }
        />
        <Route
          path="settings"
          element={
            <AdminRouteGuard permission="settings.manage">
              <AdminSettings />
            </AdminRouteGuard>
          }
        />

        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}
