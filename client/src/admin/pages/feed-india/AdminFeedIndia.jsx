import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Edit, X } from 'lucide-react';
import {
  PageHeader,
  StatusBadge,
  ApiBoundaryBanner,
  ImageUploader,
  PermissionGuard,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatDate } from '../../../utils/formatters.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminFeedIndia() {
  const { showToast } = useToast();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [images, setImages] = useState([]);

  const { register, handleSubmit, reset } = useForm();

  const load = () => {
    setLoading(true);
    adminApi.getFeedIndia().then((res) => {
      setCampaigns(res.data || []);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const openModal = (item = null) => {
    setEditing(item);
    reset(
      item || {
        title: '',
        location: '',
        campaignDate: '',
        description: '',
        mealsServed: '',
        placesVisited: '',
        donationsMade: '',
        partnerOrganisations: 'Vaithiyar Poova Foundation, The Rotary Foundation',
        status: 'draft',
      }
    );
    setImages(item?.image ? [item.image] : []);
    setModalOpen(true);
  };

  const onSubmit = async (values) => {
    const res = await adminApi.saveFeedIndia(editing?._id, {
      ...values,
      image: images[0]?.url || images[0] || '',
    });
    showToast(res.message, res.ok ? 'success' : 'info');
    setModalOpen(false);
    if (res.ok) load();
  };

  const columns = [
    { key: 'title', label: 'Campaign Title', sortable: true },
    { key: 'location', label: 'Location' },
    { key: 'campaignDate', label: 'Date', render: (r) => formatDate(r.campaignDate) },
    { key: 'mealsServed', label: 'Verified Meals' },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status || 'draft'} /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <PermissionGuard permission="feed_india.manage">
          <button
            type="button"
            onClick={() => openModal(r)}
            className="inline-flex items-center gap-1 rounded-sm border border-[#E9E1D5] px-2.5 py-1 text-[11px] font-semibold hover:border-[#B93627] hover:text-[#B93627]"
          >
            <Edit className="h-3.5 w-3.5" />
            Edit
          </button>
        </PermissionGuard>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Feed India Management"
        description="Manage social-impact campaigns and verified impact metrics only."
        breadcrumbs={[{ label: 'Feed India' }]}
        actions={
          <PermissionGuard permission="feed_india.manage">
            <button
              type="button"
              onClick={() => openModal()}
              className="inline-flex items-center gap-1.5 rounded-sm bg-[#B93627] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
            >
              <Plus className="h-4 w-4" />
              Create Campaign
            </button>
          </PermissionGuard>
        }
      />

      <ApiBoundaryBanner endpoint="/api/admin/feed-india" unavailable={unavailable} />

      <DataTable
        columns={columns}
        data={campaigns}
        loading={loading}
        emptyTitle="No Feed India campaigns"
        emptyDescription="Verified Feed India campaigns will appear here once /api/admin/feed-india is connected."
      />

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md border border-[#E9E1D5] bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-[#34332C]">
                {editing ? 'Edit Campaign' : 'Create Campaign'}
              </h2>
              <button type="button" onClick={() => setModalOpen(false)}>
                <X className="h-4 w-4 text-[#77736B]" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Campaign Title *</span>
                  <input type="text" required className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm" {...register('title', { required: true })} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Location</span>
                  <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm" {...register('location')} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Campaign Date</span>
                  <input type="date" className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm" {...register('campaignDate')} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Meals Served (Verified)</span>
                  <input type="number" min={0} className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm" {...register('mealsServed')} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Places Visited (Verified)</span>
                  <input type="number" min={0} className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm" {...register('placesVisited')} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Donations Made (Verified)</span>
                  <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm" {...register('donationsMade')} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Status</span>
                  <select className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm" {...register('status')}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </label>
              </div>
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Partner Organisations</span>
                <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm" {...register('partnerOrganisations')} />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Description</span>
                <textarea rows={3} className="w-full rounded-sm border border-[#E9E1D5] px-3 py-2 text-sm" {...register('description')} />
              </label>
              <ImageUploader label="Campaign Photographs" images={images} onChange={setImages} />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="rounded-sm border border-[#E9E1D5] px-4 py-2 text-xs font-semibold">
                  Cancel
                </button>
                <button type="submit" className="rounded-sm bg-[#B93627] px-5 py-2 text-xs font-semibold text-white hover:bg-[#8F2A1D]">
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
