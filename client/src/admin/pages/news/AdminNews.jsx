import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Plus, Edit } from 'lucide-react';
import {
  PageHeader,
  StatusBadge,
  ApiBoundaryBanner,
  ImageUploader,
  RichTextEditor,
  PermissionGuard,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatDate, slugify } from '../../../utils/formatters.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminNews() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isForm = pathname.endsWith('/add') || pathname.endsWith('/edit');
  const isEdit = Boolean(id);

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState('');

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: { category: 'Press Release', status: 'draft' },
  });

  const titleVal = watch('title');
  useEffect(() => {
    if (!isEdit && titleVal) setValue('slug', slugify(titleVal));
  }, [titleVal, isEdit, setValue]);

  useEffect(() => {
    setLoading(true);
    if (isForm && isEdit) {
      adminApi.getNewsItem(id).then((res) => {
        if (res.data) {
          reset(res.data);
          setContent(res.data.content || '');
          if (res.data.featuredImage) setImages([res.data.featuredImage]);
        }
        setUnavailable(res.unavailable);
        setLoading(false);
      });
    } else if (!isForm) {
      adminApi.getNews().then((res) => {
        setArticles(res.data || []);
        setUnavailable(res.unavailable);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [id, isEdit, isForm, reset]);

  if (isForm) {
    const onSubmit = async (values) => {
      const res = await adminApi.saveNews(id, {
        ...values,
        content,
        featuredImage: images[0]?.url || images[0] || '',
      });
      showToast(res.message, res.ok ? 'success' : 'info');
      if (res.ok) navigate('/admin/news');
    };

    return (
      <div>
        <PageHeader
          title={isEdit ? 'Edit News Article' : 'Add News Article'}
          description="Publish press releases, media coverage, and company updates."
          breadcrumbs={[
            { label: 'News & Media', to: '/admin/news' },
            { label: isEdit ? 'Edit' : 'Add Article' },
          ]}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Article Title *</span>
              <input type="text" required className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('title', { required: true })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Slug *</span>
              <input type="text" required className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('slug', { required: true })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Category</span>
              <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('category')} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Author</span>
              <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('author')} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Publication Date</span>
              <input type="date" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('publicationDate')} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Summary</span>
            <textarea rows={2} className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('summary')} />
          </label>
          <RichTextEditor label="Full Content" value={content} onChange={setContent} />
          <ImageUploader label="Featured Image" images={images} onChange={setImages} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">SEO Title</span>
              <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('seoTitle')} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Status</span>
              <select className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('status')}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="rounded-sm bg-[#B93627] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]">
              Save Article
            </button>
            <Link to="/admin/news" className="rounded-sm border border-[#E9E1D5] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#34332C]">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }

  const columns = [
    { key: 'title', label: 'Article Title', sortable: true },
    { key: 'category', label: 'Category' },
    { key: 'author', label: 'Author' },
    { key: 'publicationDate', label: 'Date', render: (r) => formatDate(r.publicationDate || r.createdAt) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status || 'draft'} /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <PermissionGuard permission="news.manage">
          <Link
            to={`/admin/news/${r._id}/edit`}
            className="inline-flex items-center gap-1 rounded-sm border border-[#E9E1D5] px-2.5 py-1 text-[11px] font-semibold hover:border-[#B93627] hover:text-[#B93627]"
          >
            <Edit className="h-3.5 w-3.5" />
            Edit
          </Link>
        </PermissionGuard>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="News & Media"
        description="Manage press releases, media coverage, and corporate announcements."
        breadcrumbs={[{ label: 'News & Media' }]}
        actions={
          <PermissionGuard permission="news.manage">
            <Link
              to="/admin/news/add"
              className="inline-flex items-center gap-1.5 rounded-sm bg-[#B93627] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
            >
              <Plus className="h-4 w-4" />
              Add Article
            </Link>
          </PermissionGuard>
        }
      />
      <ApiBoundaryBanner endpoint="/api/admin/news" unavailable={unavailable} />
      <DataTable columns={columns} data={articles} loading={loading} emptyTitle="No news articles" />
    </div>
  );
}
