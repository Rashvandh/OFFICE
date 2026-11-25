import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  PageHeader,
  ApiBoundaryBanner,
  ImageUploader,
  RichTextEditor,
  PermissionGuard,
} from '../../components/common/AdminUIComponents.jsx';
import { adminApi } from '../../services/adminApi.js';
import { useToast } from '../../../context/ToastContext.jsx';

const SECTIONS = [
  { id: 'homepage', label: 'Homepage', to: '/admin/content/homepage' },
  { id: 'about', label: 'About Us', to: '/admin/content/about' },
  { id: 'research', label: 'R&D Page', to: '/admin/content/research' },
  { id: 'footer', label: 'Footer', to: '/admin/content/footer' },
];

export default function AdminContent() {
  const { pathname } = useLocation();
  const { showToast } = useToast();
  const activeSection =
    SECTIONS.find((s) => pathname.endsWith(s.id))?.id || 'homepage';

  const [unavailable, setUnavailable] = useState(false);
  const [images, setImages] = useState([]);
  const [bodyText, setBodyText] = useState('');

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    adminApi.getContentSection(activeSection).then((res) => {
      setUnavailable(res.unavailable);
      if (res.data) {
        reset(res.data);
        setBodyText(res.data.body || '');
        setImages(res.data.images || []);
      } else {
        reset({ headline: '', subheadline: '', status: 'draft' });
        setBodyText('');
        setImages([]);
      }
    });
  }, [activeSection, reset]);

  const onSave = (status) =>
    handleSubmit(async (values) => {
      const res = await adminApi.saveContentSection(activeSection, {
        ...values,
        body: bodyText,
        images: images.map((i) => i.url || i),
        status,
      });
      showToast(res.message, res.ok ? 'success' : 'info');
    });

  return (
    <div>
      <PageHeader
        title="Website Content CMS"
        description="Manage approved copy and imagery for Homepage, About Us, R&D, and Footer."
        breadcrumbs={[{ label: 'Website Content' }, { label: activeSection }]}
      />

      <ApiBoundaryBanner
        endpoint={`/api/admin/content/${activeSection}`}
        unavailable={unavailable}
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {SECTIONS.map((sec) => (
          <Link
            key={sec.id}
            to={sec.to}
            className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
              activeSection === sec.id
                ? 'bg-[#B93627] text-white'
                : 'border border-[#E9E1D5] bg-white text-[#34332C] hover:border-[#B93627]'
            }`}
          >
            {sec.label}
          </Link>
        ))}
      </div>

      <form className="max-w-4xl rounded-md border border-[#E9E1D5] bg-white p-6 shadow-card space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
              Section Headline
            </span>
            <input
              type="text"
              placeholder="Approved section heading"
              className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
              {...register('headline')}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-[#77736B]">
              Subheadline / Announcement Text
            </span>
            <input
              type="text"
              placeholder="Approved summary or announcement"
              className="w-full rounded-sm border border-[#E9E1D5] px-3.5 py-2.5 text-sm focus:border-[#B93627] focus:outline-none"
              {...register('subheadline')}
            />
          </label>
        </div>

        <RichTextEditor label="Section Body Content" value={bodyText} onChange={setBodyText} />
        <ImageUploader label="Section Banners & Media" images={images} onChange={setImages} />

        <PermissionGuard permission="content.manage">
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={onSave('published')}
              className="rounded-sm bg-[#B93627] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#8F2A1D]"
            >
              Publish Changes
            </button>
            <button
              type="button"
              onClick={onSave('draft')}
              className="rounded-sm border border-[#B93627] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#B93627] hover:bg-[#FFF9F1]"
            >
              Save Draft
            </button>
          </div>
        </PermissionGuard>
      </form>
    </div>
  );
}
