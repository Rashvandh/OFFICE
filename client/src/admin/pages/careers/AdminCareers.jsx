import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Plus, Users } from 'lucide-react';
import {
  PageHeader,
  StatusBadge,
  ApiBoundaryBanner,
  PermissionGuard,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatDate } from '../../../utils/formatters.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminCareers() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isAdd = pathname.endsWith('/add');
  const isApps = pathname.endsWith('/applications');

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: { employmentType: 'Full-Time', status: 'active' },
  });

  useEffect(() => {
    setLoading(true);
    if (isApps) {
      adminApi.getCareerApplications().then((res) => {
        setApplications(res.data || []);
        setUnavailable(res.unavailable);
        setLoading(false);
      });
    } else if (!isAdd) {
      adminApi.getCareers().then((res) => {
        setJobs(res.data || []);
        setUnavailable(res.unavailable);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [isAdd, isApps]);

  if (isAdd) {
    const onSubmit = async (values) => {
      const res = await adminApi.saveCareer(null, values);
      showToast(res.message, res.ok ? 'success' : 'info');
      if (res.ok) navigate('/admin/careers');
    };

    return (
      <div>
        <PageHeader
          title="Add Job Listing"
          description="Create a new career opening for the GRAMIYAM Careers page."
          breadcrumbs={[
            { label: 'Careers', to: '/admin/careers' },
            { label: 'Add Job' },
          ]}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Job Title *</span>
              <input type="text" required className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('title', { required: true })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Department *</span>
              <input type="text" required className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('department', { required: true })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Location *</span>
              <input type="text" required className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('location', { required: true })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Employment Type</span>
              <select className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('employmentType')}>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Application Deadline</span>
              <input type="date" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('deadline')} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Job Description *</span>
            <textarea rows={3} required className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('description', { required: true })} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Responsibilities</span>
            <textarea rows={2} className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('responsibilities')} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Qualifications & Skills</span>
            <textarea rows={2} className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('qualifications')} />
          </label>
          <div className="flex gap-3">
            <button type="submit" className="rounded-sm bg-[#B93627] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]">
              Publish Job
            </button>
            <Link to="/admin/careers" className="rounded-sm border border-[#E9E1D5] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#34332C]">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }

  if (isApps) {
    const appCols = [
      { key: 'fullName', label: 'Applicant Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'position', label: 'Job Applied For' },
      { key: 'createdAt', label: 'Date', render: (r) => formatDate(r.createdAt) },
      { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status || 'new'} /> },
    ];
    return (
      <div>
        <PageHeader
          title="Job Applications"
          description="Review incoming candidate applications and resumes."
          breadcrumbs={[
            { label: 'Careers', to: '/admin/careers' },
            { label: 'Applications' },
          ]}
        />
        <ApiBoundaryBanner endpoint="/api/admin/careers/applications" unavailable={unavailable} />
        <DataTable columns={appCols} data={applications} loading={loading} emptyTitle="No applications received" />
      </div>
    );
  }

  const jobCols = [
    { key: 'title', label: 'Job Title', sortable: true },
    { key: 'department', label: 'Department' },
    { key: 'location', label: 'Location' },
    { key: 'employmentType', label: 'Type' },
    { key: 'createdAt', label: 'Posted Date', render: (r) => formatDate(r.createdAt) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status || 'active'} /> },
  ];

  return (
    <div>
      <PageHeader
        title="Careers & Job Listings"
        description="Manage open positions and review candidate applications."
        breadcrumbs={[{ label: 'Careers' }]}
        actions={
          <>
            <Link
              to="/admin/careers/applications"
              className="inline-flex items-center gap-1.5 rounded-sm border border-[#E9E1D5] bg-white px-4 py-2.5 text-xs font-semibold text-[#34332C] hover:border-[#B93627]"
            >
              <Users className="h-3.5 w-3.5" />
              Applications
            </Link>
            <PermissionGuard permission="careers.manage">
              <Link
                to="/admin/careers/add"
                className="inline-flex items-center gap-1.5 rounded-sm bg-[#B93627] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
              >
                <Plus className="h-4 w-4" />
                Add Job
              </Link>
            </PermissionGuard>
          </>
        }
      />
      <ApiBoundaryBanner endpoint="/api/admin/careers" unavailable={unavailable} />
      <DataTable columns={jobCols} data={jobs} loading={loading} emptyTitle="No active job listings" />
    </div>
  );
}
