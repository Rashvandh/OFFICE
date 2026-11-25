import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Boxes,
  ShoppingCart,
  CreditCard,
  Users,
  Building2,
  MapPin,
  Briefcase,
  Newspaper,
  BookOpen,
  HeartHandshake,
  MessageSquareQuote,
  Mail,
  FileEdit,
  BarChart3,
  ShieldCheck,
  History,
  Settings,
  Menu,
  X,
  Bell,
  HelpCircle,
  LogOut,
  User,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';

const NAV_GROUPS = [
  {
    group: 'Overview',
    items: [
      { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard, permission: 'dashboard.view' },
    ],
  },
  {
    group: 'Catalogue',
    items: [
      { label: 'Products', to: '/admin/products', icon: Package, permission: 'products.view' },
      { label: 'Categories', to: '/admin/categories', icon: FolderTree, permission: 'categories.view' },
      { label: 'Inventory', to: '/admin/inventory', icon: Boxes, permission: 'inventory.view' },
    ],
  },
  {
    group: 'Sales & Customers',
    items: [
      { label: 'Orders', to: '/admin/orders', icon: ShoppingCart, permission: 'orders.view' },
      { label: 'Payments', to: '/admin/payments', icon: CreditCard, permission: 'payments.view' },
      { label: 'Customers', to: '/admin/customers', icon: Users, permission: 'customers.view' },
      { label: 'Reviews', to: '/admin/reviews', icon: MessageSquareQuote, permission: 'reviews.view' },
    ],
  },
  {
    group: 'Expansion & Community',
    items: [
      { label: 'Franchise Enquiries', to: '/admin/franchise', icon: Building2, permission: 'franchise.view' },
      { label: 'Store Locator', to: '/admin/stores', icon: MapPin, permission: 'stores.view' },
      { label: 'Careers', to: '/admin/careers', icon: Briefcase, permission: 'careers.view' },
      { label: 'Feed India', to: '/admin/feed-india', icon: HeartHandshake, permission: 'feed_india.view' },
    ],
  },
  {
    group: 'Content & Marketing',
    items: [
      { label: 'News & Media', to: '/admin/news', icon: Newspaper, permission: 'news.view' },
      { label: 'Blogs', to: '/admin/blogs', icon: BookOpen, permission: 'blogs.view' },
      { label: 'Newsletter', to: '/admin/newsletter', icon: Mail, permission: 'newsletter.view' },
      { label: 'Website Content', to: '/admin/content', icon: FileEdit, permission: 'content.view' },
    ],
  },
  {
    group: 'Governance & System',
    items: [
      { label: 'Reports', to: '/admin/reports', icon: BarChart3, permission: 'reports.view' },
      { label: 'Admin Users', to: '/admin/users', icon: ShieldCheck, permission: 'users.manage' },
      { label: 'Activity Logs', to: '/admin/activity-logs', icon: History, permission: 'activity_logs.view' },
      { label: 'Settings', to: '/admin/settings', icon: Settings, permission: 'settings.manage' },
    ],
  },
];

export default function AdminLayout({ children }) {
  const { admin, roleLabel, can, logout } = useAdminAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState(() =>
    Object.fromEntries(NAV_GROUPS.map((g) => [g.group, true]))
  );
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [globalQuery, setGlobalQuery] = useState('');

  const visibleGroups = NAV_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((item) => can(item.permission)),
  })).filter((g) => g.items.length > 0);

  const toggleGroup = (name) => {
    setOpenGroups((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    const q = globalQuery.trim().toLowerCase();
    if (!q) return;
    if (q.includes('order')) navigate('/admin/orders');
    else if (q.includes('product')) navigate('/admin/products');
    else if (q.includes('customer')) navigate('/admin/customers');
    else if (q.includes('franchise')) navigate('/admin/franchise');
    else navigate(`/admin/products?search=${encodeURIComponent(globalQuery.trim())}`);
  };

  const breadcrumbLabel = pathname
    .replace('/admin/', '')
    .split('/')
    .filter(Boolean)
    .map((s) => s.replace(/-/g, ' '))
    .join(' / ');

  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex h-full flex-col bg-white border-r border-[#E9E1D5]">
      <div className="flex h-16 items-center justify-between border-b border-[#E9E1D5] px-4">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <img
            src="/logo/gramiyam-logo.jpg"
            alt="GRAMIYAM"
            className="h-9 w-auto shrink-0 object-contain"
          />
          {(!collapsed || isMobile) && (
            <div className="leading-none">
              <span className="block font-serif text-base font-bold tracking-wider text-[#B93627]">
                GRAMIYAM
              </span>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-[#77736B]">
                Admin Portal
              </span>
            </div>
          )}
        </Link>
        {isMobile ? (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="rounded p-1.5 text-[#34332C] hover:bg-[#FFF9F1]"
          >
            <X className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="hidden rounded p-1.5 text-[#77736B] hover:bg-[#FFF9F1] hover:text-[#B93627] lg:inline-flex"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5" aria-label="Admin Sidebar">
        {visibleGroups.map((group) => (
          <div key={group.group}>
            {(!collapsed || isMobile) && (
              <button
                type="button"
                onClick={() => toggleGroup(group.group)}
                className="mb-1.5 flex w-full items-center justify-between px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#77736B] hover:text-[#34332C]"
              >
                <span>{group.group}</span>
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${
                    openGroups[group.group] ? '' : '-rotate-90'
                  }`}
                />
              </button>
            )}
            {(collapsed && !isMobile ? true : openGroups[group.group]) && (
              <ul className="space-y-0.5">
                {group.items.map(({ label, to, icon: Icon }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      title={collapsed && !isMobile ? label : undefined}
                      onClick={() => isMobile && setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-sm px-3 py-2 text-xs font-medium transition ${
                          isActive
                            ? 'bg-[#B93627] text-white shadow-sm'
                            : 'text-[#34332C] hover:bg-[#FFF9F1] hover:text-[#B93627]'
                        }`
                      }
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {(!collapsed || isMobile) && <span className="truncate">{label}</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>

      {(!collapsed || isMobile) && (
        <div className="border-t border-[#E9E1D5] bg-[#FFF9F1] px-4 py-3 text-[11px] text-[#77736B]">
          <p className="font-semibold text-[#34332C] truncate">{admin?.name}</p>
          <p className="text-[10px] uppercase tracking-wider text-[#B93627]">
            {roleLabel}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#FFF9F1] text-[#34332C]">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden shrink-0 transition-all duration-200 lg:block ${
          collapsed ? 'w-[74px]' : 'w-64'
        }`}
      >
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/45"
          />
          <aside className="relative z-10 h-full w-72 max-w-[85vw]">
            <SidebarContent isMobile />
          </aside>
        </div>
      )}

      {/* Main Column */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[#E9E1D5] bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open admin menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-[#E9E1D5] text-[#34332C] lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <div className="hidden sm:block truncate text-xs capitalize text-[#77736B]">
              Admin / <span className="font-medium text-[#34332C]">{breadcrumbLabel || 'Dashboard'}</span>
            </div>
          </div>

          <form onSubmit={handleGlobalSearch} className="hidden md:block w-72">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#77736B]" />
              <input
                type="search"
                value={globalQuery}
                onChange={(e) => setGlobalQuery(e.target.value)}
                placeholder="Quick jump (products, orders...)"
                className="w-full rounded-sm border border-[#E9E1D5] bg-[#FFF9F1] py-1.5 pl-8 pr-3 text-xs focus:border-[#B93627] focus:outline-none"
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            {admin?.isDevPreview && (
              <span className="hidden rounded-sm border border-[#E9D8C5] bg-[#FFF9F1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#B93627] xl:inline-block">
                UI Preview Mode
              </span>
            )}

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNotifOpen((o) => !o);
                  setProfileOpen(false);
                }}
                aria-label="Notifications"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E9E1D5] bg-[#FFF9F1] text-[#34332C] hover:border-[#B93627] hover:text-[#B93627]"
              >
                <Bell className="h-4 w-4" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-md border border-[#E9E1D5] bg-white p-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-[#E9E1D5] pb-2">
                    <span className="text-xs font-semibold text-[#34332C]">Notifications</span>
                    <Link
                      to="/admin/notifications"
                      onClick={() => setNotifOpen(false)}
                      className="text-[11px] font-semibold text-[#B93627] hover:underline"
                    >
                      View All
                    </Link>
                  </div>
                  <p className="py-4 text-center text-xs text-[#77736B]">
                    Live notifications will appear here once backend events are connected.
                  </p>
                </div>
              )}
            </div>

            <Link
              to="/admin/profile"
              aria-label="Admin Help & Profile"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-[#E9E1D5] bg-[#FFF9F1] text-[#34332C] hover:border-[#B93627] hover:text-[#B93627] sm:inline-flex"
            >
              <HelpCircle className="h-4 w-4" />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((o) => !o);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 rounded-sm border border-[#E9E1D5] bg-[#FFF9F1] px-2.5 py-1.5 text-left hover:border-[#B93627]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#B93627] text-xs font-bold text-white">
                  {(admin?.name || 'A')[0]}
                </div>
                <div className="hidden sm:block leading-tight">
                  <p className="max-w-[120px] truncate text-xs font-semibold text-[#34332C]">
                    {admin?.name}
                  </p>
                  <p className="text-[10px] text-[#B93627]">{roleLabel}</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-[#77736B]" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-md border border-[#E9E1D5] bg-white py-1.5 shadow-xl text-xs">
                  <Link
                    to="/admin/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[#34332C] hover:bg-[#FFF9F1] hover:text-[#B93627]"
                  >
                    <User className="h-3.5 w-3.5" />
                    My Profile
                  </Link>
                  <Link
                    to="/"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[#34332C] hover:bg-[#FFF9F1] hover:text-[#B93627]"
                  >
                    View Storefront
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      navigate('/admin/login');
                    }}
                    className="flex w-full items-center gap-2 border-t border-[#E9E1D5] px-4 py-2 text-left text-[#B93627] hover:bg-red-50"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
