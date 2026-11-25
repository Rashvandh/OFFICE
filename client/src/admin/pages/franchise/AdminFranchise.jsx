import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Eye } from 'lucide-react';
import {
  PageHeader,
  SearchInput,
  FilterDropdown,
  StatusBadge,
  ApiBoundaryBanner,
  AdminEmptyState,
  PermissionGuard,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatDate } from '../../../utils/formatters.js';
import { useToast } from '../../../context/ToastContext.jsx';

const ENQUIRY_STATUSES = ['New', 'Under Review', 'Contacted', 'Approved', 'Rejected'];

export default function AdminFranchise() {
  const { id } = useParams();
  const { showToast } = useToast();
  const [enquiries, setEnquiries] = useState([]);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [newStatus, setNewStatus] = useState('Under Review');
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  useEffect(() => {
    setLoading(true);
    if (id) {
      adminApi.getFranchiseEnquiry(id).then((res) => {
        setDetail(res.data);
        setUnavailable(res.unavailable);
        if (res.data) {
          setNewStatus(res.data.status || 'New');
          setNotes(res.data.internalNotes || '');
          setFollowUpDate(res.data.followUpDate || '');
        }
        setLoading(false);
      });
    } else {
      adminApi.getFranchiseEnquiries().then((res) => {
        setEnquiries(res.data || []);
        setUnavailable(res.unavailable);
        setLoading(false);
      });
    }
  }, [id]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enquiries.filter((e) => {
      const matchSearch =
        !q ||
        e.fullName?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.district?.toLowerCase().includes(q);
      const matchStatus =
        statusFilter === 'all' ||
        String(e.status || '').toLowerCase() === statusFilter.toLowerCase();
      return matchSearch && matchStatus;
    });
  }, [enquiries, search, statusFilter]);

  if (id) {
    const handleUpdate = async (e) => {
      e.preventDefault();
      const res = await adminApi.updateFranchiseEnquiry(id, {
        status: newStatus,
        internalNotes: notes,
        followUpDate,
      });
      showToast(res.message, res.ok ? 'success' : 'info');
    };

    return (
      <div>
        <PageHeader
          title={`Franchise Enquiry #${id}`}
          description="Review applicant details, preferred district, and follow-up status."
          breadcrumbs={[
            { label: 'Franchise Enquiries', to: '/admin/franchise' },
            { label: id },
          ]}
        />
        <ApiBoundaryBanner endpoint={`/api/admin/franchise/${id}`} unavailable={unavailable} />
        {!detail ? (
          <AdminEmptyState
            title="Enquiry record unavailable"
            description="Connect /api/admin/franchise/:id to inspect applicant submissions."
            action={
              <Link
                to="/admin/franchise"
                className="rounded-sm bg-[#B93627] px-4 py-2 text-xs font-semibold text-white"
              >
                Back to Enquiries
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card lg:col-span-7 text-sm space-y-2">
              <h2 className="font-serif text-2xl font-semibold">{detail.fullName}</h2>
              <p>{detail.email} • {detail.phone}</p>
              <p>Location: {detail.city}, {detail.district}, {detail.state}</p>
              <p>Business Background: {detail.businessExperience}</p>
              <p className="pt-2 text-[#77736B]">{detail.message}</p>
            </div>
            <PermissionGuard permission="franchise.manage">
              <form
                onSubmit={handleUpdate}
                className="rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card lg:col-span-5 space-y-4"
              >
                <h3 className="font-serif text-xl font-semibold">Update Review</h3>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm"
                >
                  {ENQUIRY_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm"
                />
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Internal notes..."
                  className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  className="w-full rounded-sm bg-[#B93627] py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
                >
                  Save Update
                </button>
              </form>
            </PermissionGuard>
          </div>
        )}
      </div>
    );
  }

  const columns = [
    { key: 'fullName', label: 'Applicant', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'district', label: 'District' },
    { key: 'state', label: 'State' },
    { key: 'createdAt', label: 'Date', render: (r) => formatDate(r.createdAt) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status || 'new'} /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <Link
          to={`/admin/franchise/${r._id}`}
          className="inline-flex items-center gap-1 rounded-sm border border-[#E9E1D5] px-2.5 py-1 text-[11px] font-semibold hover:border-[#B93627] hover:text-[#B93627]"
        >
          <Eye className="h-3.5 w-3.5" />
          Review
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Franchise Enquiries"
        description="Review and track incoming GRAMIYAM outlet franchise applications."
        breadcrumbs={[{ label: 'Franchise Enquiries' }]}
      />

      <ApiBoundaryBanner endpoint="/api/admin/franchise" unavailable={unavailable} />

      <div className="mb-5 flex flex-wrap gap-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search applicant, email, or district..."
          className="w-full sm:w-72"
        />
        <FilterDropdown
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[{ value: 'all', label: 'All Statuses' }, ...ENQUIRY_STATUSES]}
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        loading={loading}
        emptyTitle="No franchise enquiries"
        emptyDescription="Submitted franchise enquiries will appear here once /api/admin/franchise is connected."
      />
    </div>
  );
}
