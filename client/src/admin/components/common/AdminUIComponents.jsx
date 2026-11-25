import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ChevronRight,
  Database,
  FileText,
  Image as ImageIcon,
  Search,
  Upload,
  X,
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext.jsx';

export function PermissionGuard({ permission, children, fallback = null }) {
  const { can } = useAdminAuth();
  if (!permission) return children;
  return can(permission) ? children : fallback;
}

export function AdminBreadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-[#77736B]">
      <Link to="/admin/dashboard" className="hover:text-[#B93627] transition-colors">
        Admin
      </Link>
      {items.map((item, idx) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          {item.to && idx < items.length - 1 ? (
            <Link to={item.to} className="hover:text-[#B93627] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-[#34332C]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageHeader({ title, description, breadcrumbs = [], actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-[#E9E1D5] pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {breadcrumbs.length > 0 && (
          <div className="mb-2">
            <AdminBreadcrumbs items={breadcrumbs} />
          </div>
        )}
        <h1 className="font-serif text-3xl font-semibold text-[#34332C] sm:text-[34px]">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-[#77736B]">{description}</p>
        )}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, sublabel, icon: Icon }) {
  return (
    <div className="rounded-md border border-[#E9E1D5] bg-white p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#77736B]">
            {label}
          </p>
          <p className="mt-2 font-serif text-3xl font-semibold text-[#34332C]">
            {value}
          </p>
          {sublabel && <p className="mt-1 text-xs text-[#77736B]">{sublabel}</p>}
        </div>
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#FFF9F1] border border-[#E9D8C5] text-[#B93627]">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}

const STATUS_STYLES = {
  active: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  published: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  approved: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  paid: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  delivered: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  completed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  in_stock: 'bg-emerald-50 text-emerald-800 border-emerald-200',

  pending: 'bg-amber-50 text-amber-800 border-amber-200',
  processing: 'bg-amber-50 text-amber-800 border-amber-200',
  under_review: 'bg-amber-50 text-amber-800 border-amber-200',
  low_stock: 'bg-amber-50 text-amber-800 border-amber-200',
  draft: 'bg-stone-100 text-stone-700 border-stone-200',
  new: 'bg-blue-50 text-blue-800 border-blue-200',
  confirmed: 'bg-blue-50 text-blue-800 border-blue-200',
  shipped: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  contacted: 'bg-indigo-50 text-indigo-800 border-indigo-200',

  inactive: 'bg-stone-100 text-stone-600 border-stone-200',
  hidden: 'bg-stone-100 text-stone-600 border-stone-200',
  unsubscribed: 'bg-stone-100 text-stone-600 border-stone-200',
  cancelled: 'bg-red-50 text-red-800 border-red-200',
  rejected: 'bg-red-50 text-red-800 border-red-200',
  failed: 'bg-red-50 text-red-800 border-red-200',
  payment_failed: 'bg-red-50 text-red-800 border-red-200',
  out_of_stock: 'bg-red-50 text-red-800 border-red-200',
};

export function StatusBadge({ status }) {
  const key = String(status || 'pending')
    .toLowerCase()
    .replace(/\s+/g, '_');
  const style = STATUS_STYLES[key] || 'bg-[#FFF9F1] text-[#34332C] border-[#E9D8C5]';
  const label = String(status || 'Pending').replace(/_/g, ' ');
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${style}`}
    >
      {label}
    </span>
  );
}

export function ApiBoundaryBanner({ endpoint, unavailable }) {
  if (!unavailable) return null;
  return (
    <div className="mb-6 flex items-start gap-3 rounded-md border border-[#E9D8C5] bg-[#FFF9F1] px-4 py-3 text-xs text-[#34332C]">
      <Database className="mt-0.5 h-4 w-4 shrink-0 text-[#B93627]" />
      <div>
        <strong className="font-semibold text-[#8F2A1D]">
          Backend Endpoint Pending ({endpoint})
        </strong>
        <p className="mt-0.5 text-[#77736B]">
          This module is wired to <code className="font-mono">{endpoint}</code>. No fabricated business records are shown; real records will appear automatically once the backend route is implemented.
        </p>
      </div>
    </div>
  );
}

export function AdminLoadingSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3 rounded-md border border-[#E9E1D5] bg-white p-5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 animate-pulse rounded bg-[#FFF9F1]" />
      ))}
    </div>
  );
}

export function AdminEmptyState({
  icon: Icon = FileText,
  title = 'No records found',
  description = 'Records from the backend API will appear here.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-[#E9E1D5] bg-white px-6 py-14 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF9F1] border border-[#E9D8C5] text-[#B93627]">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-serif text-xl font-semibold text-[#34332C]">{title}</h3>
      <p className="mt-1.5 max-w-md text-xs leading-relaxed text-[#77736B]">
        {description}
      </p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function AdminErrorState({ message = 'Unable to load records.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-red-200 bg-red-50/70 px-6 py-12 text-center">
      <AlertTriangle className="mb-2 h-6 w-6 text-[#B93627]" />
      <p className="text-sm font-medium text-[#34332C]">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-sm bg-[#B93627] px-4 py-2 text-xs font-semibold text-white hover:bg-[#8F2A1D]"
        >
          Retry
        </button>
      )}
    </div>
  );
}

export function ConfirmDialog({
  isOpen,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-md border border-[#E9E1D5] bg-white p-6 shadow-xl">
        <h3 className="font-serif text-2xl font-semibold text-[#34332C]">{title}</h3>
        <p className="mt-2 text-sm text-[#77736B]">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-sm border border-[#E9E1D5] bg-white px-4 py-2 text-xs font-semibold text-[#34332C] hover:bg-[#FFF9F1]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-sm bg-[#B93627] px-4 py-2 text-xs font-semibold text-white hover:bg-[#8F2A1D]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ChartCard({ title, subtitle, actions, children }) {
  return (
    <div className="rounded-md border border-[#E9E1D5] bg-white p-5 shadow-card">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-serif text-xl font-semibold text-[#34332C]">{title}</h3>
          {subtitle && <p className="text-xs text-[#77736B]">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </div>
  );
}

export function SearchInput({ value, onChange, placeholder = 'Search...', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#77736B]" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-sm border border-[#E9E1D5] bg-white py-2 pl-9 pr-3 text-xs text-[#34332C] placeholder:text-[#77736B]/70 focus:border-[#B93627] focus:outline-none"
      />
    </div>
  );
}

export function FilterDropdown({ label, value, onChange, options = [] }) {
  return (
    <select
      aria-label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-sm border border-[#E9E1D5] bg-white px-3 py-2 text-xs text-[#34332C] focus:border-[#B93627] focus:outline-none"
    >
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.value;
        const text = typeof opt === 'string' ? opt : opt.label;
        return (
          <option key={val} value={val}>
            {text}
          </option>
        );
      })}
    </select>
  );
}

export function ImageUploader({ label = 'Images', images = [], onChange }) {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));
    onChange([...images, ...previews]);
  };

  const removeImage = (idx) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
        {label}
      </span>
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed border-[#E9D8C5] bg-[#FFF9F1] px-4 py-6 text-center transition hover:border-[#B93627]">
        <Upload className="mb-2 h-5 w-5 text-[#B93627]" />
        <span className="text-xs font-medium text-[#34332C]">
          Click to select images for preview
        </span>
        <span className="mt-0.5 text-[11px] text-[#77736B]">
          PNG, JPG, WebP supported
        </span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="hidden"
        />
      </label>

      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {images.map((img, idx) => (
            <div
              key={img.url || img + idx}
              className="group relative aspect-square overflow-hidden rounded-sm border border-[#E9E1D5] bg-white"
            >
              <img
                src={img.url || img}
                alt={img.name || 'Preview'}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                aria-label="Remove image"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#B93627]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function RichTextEditor({ label = 'Content', value, onChange, rows = 7 }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-[#34332C]/80">
          {label}
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] text-[#77736B]">
          <ImageIcon className="h-3 w-3" />
          Markdown / Plain Text
        </span>
      </div>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-[#E9E1D5] bg-white px-4 py-3 text-sm text-[#34332C] focus:border-[#B93627] focus:outline-none"
        placeholder="Write structured content..."
      />
    </div>
  );
}
