import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import HeroNavigation from './components/home/HeroNavigation.jsx';
import Footer from './components/layout/Footer.jsx';
import MobileBottomBar from './components/layout/MobileBottomBar.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import ToastNotifications from './components/common/ToastNotifications.jsx';
import EmptyState from './components/common/EmptyState.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Research from './pages/Research.jsx';
import Collections from './pages/Collections.jsx';
import Products from './pages/Products.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Account from './pages/Account.jsx';
import Wishlist from './pages/Wishlist.jsx';
import StoreLocator from './pages/StoreLocator.jsx';
import Franchise from './pages/Franchise.jsx';
import Careers from './pages/Careers.jsx';
import News from './pages/News.jsx';
import Blog from './pages/Blog.jsx';
import FeedIndia from './pages/FeedIndia.jsx';
import Contact from './pages/Contact.jsx';
import FAQ from './pages/FAQ.jsx';
import TrackOrder from './pages/TrackOrder.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';
import Returns from './pages/Returns.jsx';
import AdminRoutes from './admin/AdminRoutes.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <main className="container-gramiyam py-20">
      <EmptyState
        title="Page Not Found"
        description="The page you are looking for may have moved or does not exist."
        actionLabel="Return Home"
        actionTo="/"
      />
    </main>
  );
}

export default function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <Routes>
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
        <ToastNotifications />
      </MotionConfig>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-ivory text-charcoal">
        <HeroNavigation />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/research" element={<Research />} />
            <Route path="/collections" element={<Collections />} />

            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Account />} />
            <Route path="/account/orders" element={<Account />} />
            <Route path="/account/profile" element={<Account />} />
            <Route path="/account/wishlist" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />

            <Route path="/store-locator" element={<StoreLocator />} />
            <Route path="/stores" element={<StoreLocator />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/careers" element={<Careers />} />

            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<News />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:slug" element={<Blog />} />
            <Route path="/feed-india" element={<FeedIndia />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/returns" element={<Returns mode="returns" />} />
            <Route path="/refund-policy" element={<Returns mode="refund" />} />
            <Route path="/shipping-policy" element={<Returns mode="shipping" />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
        <MobileBottomBar />
        <CartDrawer />
        <ToastNotifications />
      </div>
    </MotionConfig>
  );
}
