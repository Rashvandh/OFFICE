import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import { orderService } from '../services/orderService.js';
import { PrimaryButton, SecondaryButton } from '../components/common/Buttons.jsx';
import ProductGrid from '../components/products/ProductGrid.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Login from './Login.jsx';

export default function Account() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const initialTab = pathname.includes('orders')
    ? 'orders'
    : pathname.includes('wishlist')
    ? 'wishlist'
    : pathname.includes('addresses')
    ? 'addresses'
    : 'profile';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileMessage, setProfileMessage] = useState('');

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'orders') {
      setOrdersLoading(true);
      orderService
        .getMyOrders()
        .then((data) => setOrders(Array.isArray(data) ? data : data?.orders || []))
        .catch(() => setOrders([]))
        .finally(() => setOrdersLoading(false));
    }
  }, [isAuthenticated, activeTab]);

  if (!isAuthenticated) {
    return <Login />;
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User, to: '/account/profile' },
    { id: 'orders', label: 'Order History', icon: Package, to: '/account/orders' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, to: '/account/wishlist' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, to: '/account' },
  ];

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const res = await updateProfile({ name: profileName });
    setProfileMessage(res.success ? 'Profile updated.' : res.message);
  };

  return (
    <main className="py-12 sm:py-16">
      <div className="container-gramiyam">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-softgrey pb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark">
              Welcome Back
            </p>
            <h1 className="mt-1 font-serif text-4xl font-medium text-forest">
              {user?.name || 'Gramiyam Member'}
            </h1>
          </div>
          <SecondaryButton
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </SecondaryButton>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-3 space-y-2">
            {tabs.map(({ id, label, icon: Icon, to }) => (
              <Link
                key={id}
                to={to}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 rounded-sm border px-4 py-3 text-xs font-semibold uppercase tracking-wider transition ${
                  activeTab === id
                    ? 'border-forest bg-forest text-ivory'
                    : 'border-softgrey bg-white text-charcoal hover:border-forest'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </aside>

          <section className="lg:col-span-9">
            {activeTab === 'profile' && (
              <div className="rounded-sm border border-softgrey bg-white p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-medium text-forest">
                  Profile Management
                </h2>
                <form onSubmit={handleSaveProfile} className="mt-5 max-w-md space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full rounded-sm border border-softgrey px-4 py-2.5 text-sm focus:border-forest focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                      Email
                    </label>
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      className="w-full rounded-sm border border-softgrey bg-cream/60 px-4 py-2.5 text-sm text-charcoal/70"
                    />
                  </div>
                  {profileMessage && (
                    <p className="text-xs text-botanical">{profileMessage}</p>
                  )}
                  <PrimaryButton type="submit">Save Changes</PrimaryButton>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="rounded-sm border border-softgrey bg-white p-6 sm:p-8">
                <h2 className="mb-4 font-serif text-2xl font-medium text-forest">
                  Order History
                </h2>
                {ordersLoading ? (
                  <p className="text-sm text-charcoal/70">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <EmptyState
                    icon={Package}
                    title="No orders found"
                    description="Your completed Gramiyam orders will appear here."
                    actionLabel="Explore Formulations"
                    actionTo="/products"
                  />
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order._id || order.orderId}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-softgrey p-4 text-sm"
                      >
                        <div>
                          <p className="font-semibold text-forest">
                            Order #{order.orderId || order._id}
                          </p>
                          <p className="text-xs text-charcoal/65">
                            Status: {order.status || 'Processing'}
                          </p>
                        </div>
                        <Link
                          to="/track-order"
                          className="text-xs font-semibold uppercase tracking-wider text-gold-dark hover:text-forest"
                        >
                          Track Order
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 className="mb-5 font-serif text-2xl font-medium text-forest">
                  Saved Wishlist ({wishlistItems.length})
                </h2>
                <ProductGrid
                  products={wishlistItems}
                  columns={3}
                  emptyTitle="Your wishlist is empty"
                  emptyDescription="Tap the heart icon on any formulation to save it here."
                />
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="rounded-sm border border-softgrey bg-white p-6 sm:p-8">
                <h2 className="font-serif text-2xl font-medium text-forest">
                  Address Management
                </h2>
                <p className="mt-2 text-sm text-charcoal/75">
                  Saved shipping addresses will sync automatically once connected to the backend `/api/auth/addresses` endpoints.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
