import { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Download } from 'lucide-react';
import {
  PageHeader,
  ChartCard,
  FilterDropdown,
  ApiBoundaryBanner,
} from '../../components/common/AdminUIComponents.jsx';
import { adminApi } from '../../services/adminApi.js';

const REPORT_TYPES = [
  'Sales Report',
  'Orders Report',
  'Product Performance',
  'Inventory Report',
  'Customer Report',
  'Payment Report',
  'Franchise Report',
  'Website Content Report',
];

const DATE_PRESETS = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: 'month', label: 'This Month' },
  { value: 'prev_month', label: 'Previous Month' },
  { value: 'custom', label: 'Custom Range' },
];

export default function AdminReports() {
  const [reportType, setReportType] = useState('Sales Report');
  const [dateRange, setDateRange] = useState('30d');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [reportData, setReportData] = useState(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    adminApi
      .getReports({ reportType, dateRange, customStart, customEnd })
      .then((res) => {
        setReportData(res.data);
        setUnavailable(res.unavailable);
      });
  }, [reportType, dateRange, customStart, customEnd]);

  const series = reportData?.series || [];

  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        description="Generate operational reports from verified backend records."
        breadcrumbs={[{ label: 'Reports' }]}
        actions={
          <button
            type="button"
            disabled={!series.length}
            onClick={() => {
              const csv = [['Label', 'Value']]
                .concat(series.map((s) => [s.label, s.value]))
                .map((r) => r.join(','))
                .join('\n');
              const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `gramiyam-${reportType.toLowerCase().replace(/\s+/g, '-')}.csv`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center gap-1.5 rounded-sm border border-[#E9E1D5] bg-white px-4 py-2.5 text-xs font-semibold text-[#34332C] disabled:opacity-40"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        }
      />

      <ApiBoundaryBanner endpoint="/api/admin/reports" unavailable={unavailable} />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <FilterDropdown
          label="Report Type"
          value={reportType}
          onChange={setReportType}
          options={REPORT_TYPES}
        />
        <FilterDropdown
          label="Date Range"
          value={dateRange}
          onChange={setDateRange}
          options={DATE_PRESETS}
        />
        {dateRange === 'custom' && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="rounded-sm border border-[#E9E1D5] bg-white px-3 py-1.5 text-xs"
            />
            <span className="text-xs text-[#77736B]">to</span>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="rounded-sm border border-[#E9E1D5] bg-white px-3 py-1.5 text-xs"
            />
          </div>
        )}
      </div>

      <ChartCard title={reportType} subtitle={`Timeframe: ${dateRange}`}>
        {series.length === 0 ? (
          <div className="flex h-72 items-center justify-center text-xs text-[#77736B]">
            No analytics data returned from /api/admin/reports for this selection.
          </div>
        ) : (
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={series}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9E1D5" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#77736B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#77736B' }} />
                <Tooltip />
                <Bar dataKey="value" fill="#B93627" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </ChartCard>
    </div>
  );
}
