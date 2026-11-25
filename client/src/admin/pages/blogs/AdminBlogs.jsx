import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  PageHeader,
  StatusBadge,
  ApiBoundaryBanner,
  ImageUploader,
  RichTextEditor,
  ConfirmDialog,
  PermissionGuard,
} from '../../components/common/AdminUIComponents.jsx';
import DataTable from '../../components/tables/DataTable.jsx';
import { adminApi } from '../../services/adminApi.js';
import { formatDate, slugify } from '../../../utils/formatters.js';
import { useToast } from '../../../context/ToastContext.jsx';

export default function AdminBlogs() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isForm = pathname.endsWith('/add') || pathname.endsWith('/edit');
  const isEdit = Boolean(id);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: { category: 'Ancient Wisdom', status: 'draft' },
  });

  const titleVal = watch('title');
  useEffect(() => {
    if (!isEdit && titleVal) setValue('slug', slugify(titleVal));
  }, [titleVal, isEdit, setValue]);

  const load = () => {
    setLoading(true);
    adminApi.getBlogs().then((res) => {
      setPosts(res.data || []);
      setUnavailable(res.unavailable);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (isForm && isEdit) {
      adminApi.getBlogItem(id).then((res) => {
        if (res.data) {
          reset(res.data);
          setContent(res.data.content || '');
          if (res.data.featuredImage) setImages([res.data.featuredImage]);
        }
        setUnavailable(res.unavailable);
        setLoading(false);
      });
    } else if (!isForm) {
      load();
    } else {
      setLoading(false);
    }
  }, [id, isEdit, isForm, reset]);

  if (isForm) {
    const onSubmit = async (values) => {
      const res = await adminApi.saveBlog(id, {
        ...values,
        content,
        featuredImage: images[0]?.url || images[0] || '',
      });
      showToast(res.message, res.ok ? 'success' : 'info');
      if (res.ok) navigate('/admin/blogs');
    };

    return (
      <div>
        <PageHeader
          title={isEdit ? 'Edit Blog Post' : 'Write Blog Post'}
          description="Editorial writing interface for Ancient Wisdom & Natural Wellness."
          breadcrumbs={[
            { label: 'Blogs', to: '/admin/blogs' },
            { label: isEdit ? 'Edit' : 'Write Post' },
          ]}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Title *</span>
              <input type="text" required className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('title', { required: true })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Slug *</span>
              <input type="text" required className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('slug', { required: true })} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Category</span>
              <select className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('category')}>
                <option value="Ancient Wisdom">Ancient Wisdom</option>
                <option value="How to Use">How to Use</option>
                <option value="Natural Wellness">Natural Wellness</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Author</span>
              <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('author')} />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Tags (comma separated)</span>
              <input type="text" className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('tags')} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Excerpt</span>
            <textarea rows={2} className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('excerpt')} />
          </label>
          <RichTextEditor label="Article Body" value={content} onChange={setContent} rows={8} />
          <ImageUploader label="Featured Image" images={images} onChange={setImages} />
          <label className="block">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">Publication Status</span>
            <select className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm" {...register('status')}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="rounded-sm bg-[#B93627] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]">
              Save Blog Post
            </button>
            <Link to="/admin/blogs" className="rounded-sm border border-[#E9E1D5] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#34332C]">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const res = await adminApi.deleteBlog(deleteTarget._id);
    showToast(res.message, res.ok ? 'success' : 'info');
    setDeleteTarget(null);
    if (res.ok) load();
  };

  const columns = [
    { key: 'title', label: 'Blog Title', sortable: true },
    { key: 'category', label: 'Category' },
    { key: 'author', label: 'Author' },
    { key: 'createdAt', label: 'Date', render: (r) => formatDate(r.createdAt) },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status || 'draft'} /> },
    {
      key: 'actions',
      label: 'Actions',
      render: (r) => (
        <PermissionGuard permission="blogs.manage">
          <div className="flex items-center gap-2">
            <Link to={`/admin/blogs/${r._id}/edit`} className="rounded p-1.5 text-[#77736B] hover:text-[#B93627]">
              <Edit className="h-4 w-4" />
            </Link>
            <button type="button" onClick={() => setDeleteTarget(r)} className="rounded p-1.5 text-[#77736B] hover:text-[#B93627]">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </PermissionGuard>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Blog Management"
        description="Manage Ancient Wisdom, How to Use, and Natural Wellness editorial articles."
        breadcrumbs={[{ label: 'Blogs' }]}
        actions={
          <PermissionGuard permission="blogs.manage">
            <Link
              to="/admin/blogs/add"
              className="inline-flex items-center gap-1.5 rounded-sm bg-[#B93627] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
            >
              <Plus className="h-4 w-4" />
              Add Blog
            </Link>
          </PermissionGuard>
        }
      />
      <ApiBoundaryBanner endpoint="/api/admin/blogs" unavailable={unavailable} />
      <DataTable columns={columns} data={posts} loading={loading} emptyTitle="No blog posts" />
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Blog Post"
        message={`Delete "${deleteTarget?.title}"?`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
